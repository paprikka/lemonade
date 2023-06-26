import { fail, type Actions } from '@sveltejs/kit';
import { wait } from '../utils/wait.js';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const actions: Actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const query = data.get('query')?.toString() || '';
		if (!query) return fail(400, { ok: false, message: 'No query provided' });
		await wait(300);

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
			}
		});

		return { ok: true, query, communities };
	}
};

export const load = async (event) => {
	return {
		topCommunities: await client.community.findMany({
			orderBy: {
				countSubscribers: 'desc'
			},
			take: 5
		})
	};
};
