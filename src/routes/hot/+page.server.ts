import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const load = async (event) => {
	const where = {
		AND: [
			{
				countUsersActiveMonth: { gt: 1 }
			},
			{
				countSubscribers: { gt: 1 }
			},
			{ nsfw: false }
		]
	};

	const communities = client.community.findMany({
		where,
		orderBy: { countUsersActiveDay: 'desc' }
	});

	return {
		deferred: {
			communities
		}
	};
};
