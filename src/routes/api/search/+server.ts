import { Prisma, PrismaClient } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { SearchSettings } from '../../../components/search-settings-popup.svelte';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url }) => {
	const params = new URLSearchParams(url.search);
	console.log(params);
	const query = params.get('query');
	const paramsDict = Object.fromEntries(params.entries());
	console.log(paramsDict);

	if (!query) throw error(400, 'Missing query parameter');

	const sortByParam = paramsDict.sortBy;
	const sortingMap: Record<
		SearchSettings['sortBy'],
		| 'countSubscribers'
		| 'countPosts'
		| 'countComments'
		| 'countUsersActiveDay'
		| 'countUsersActiveMonth'
	> = {
		activity: 'countUsersActiveDay',
		subscribers: 'countSubscribers',
		posts: 'countPosts',
		comments: 'countComments'
	};

	const orderBy = {
		[sortByParam in sortingMap
			? sortingMap[sortByParam as keyof typeof sortingMap]
			: 'countSubscribers']: 'desc'
	};

	console.log(orderBy);

	const communities = await prisma.community.findMany({
		where: {
			AND: [
				{
					OR: [
						{
							title: {
								contains: query,
								mode: 'insensitive'
							}
						},
						{
							name: {
								contains: query,
								mode: 'insensitive'
							}
						},
						{
							description: {
								contains: query,
								mode: 'insensitive'
							}
						}
					]
				},
				// TODO: we lost all the nsft communities from the dataset, might need to remove
				{
					nsfw: paramsDict.nsfw === 'true' ? true : false
				},
				...(paramsDict.skipEmpty === 'true'
					? [
							{
								countUsersActiveMonth: {
									gte: 1
								}
							},
							{
								countSubscribers: {
									gt: 1
								}
							}
					  ]
					: [])
			].filter(Boolean)
		},
		orderBy,
		take: 20
	});

	return json({ communities });
};
