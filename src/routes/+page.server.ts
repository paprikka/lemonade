import { PrismaClient } from '@prisma/client';
import { fail, type Actions } from '@sveltejs/kit';

const client = new PrismaClient();

export const actions: Actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const query = data.get('query')?.toString() || '';
		if (!query) return fail(400, { ok: false, message: 'No query provided' });

		const communities = await client.community.findMany({
			where: {
				OR: [
					{
						title: {
							contains: query
						}
					},
					{
						name: {
							contains: query
						}
					},
					{
						description: {
							contains: query
						}
					}
				]
			},
			orderBy: {
				countSubscribers: 'desc'
			},
			take: 20
		});

		return { ok: true, query, communities };
	}
};

export const load = async (event) => {
	const topCommunities = client.community.findMany({
		orderBy: {
			countSubscribers: 'desc'
		},
		take: 6
	});

	console.log('topCommunities', topCommunities);
	return {
		deferred: {
			topCommunities,
			asyncFoo: new Promise((resolve) =>
				setTimeout(() => resolve('asyncFoo ' + Math.random()), 1000)
			)
		},
		foo: Date.now()
	};
};
