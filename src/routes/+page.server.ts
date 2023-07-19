import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const load = async (event) => {
	const where = {
		AND: [
			{
				countUsersActiveMonth: {
					gt: 1
				}
			},
			{
				countSubscribers: {
					gt: 1
				}
			},
			{ nsfw: false }
		]
	};
	const topCommunities = client.community.findMany({
		where,
		orderBy: {
			countSubscribers: 'desc'
		},
		take: 6
	});

	const hotCommunities = client.community.findMany({
		where,
		orderBy: {
			countUsersActiveDay: 'desc'
		},
		take: 6
	});

	return {
		deferred: {
			topCommunities,
			hotCommunities
		}
	};
};
