import { PrismaClient } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url }) => {
	const params = new URLSearchParams(url.search);

	const query = params.get('query');
	if (!query) throw error(400, 'Missing query parameter');

	const communities = await prisma.community.findMany({
		where: {
			OR: [
				{ title: { contains: query } },
				{ name: { contains: query } },
				{ description: { contains: query } }
			]
		},
		orderBy: { countSubscribers: 'desc' },
		take: 20
	});

	return json({ communities });
};
