import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const load = async ({ params }) => {
	return {
		community: await client.community.findFirst({
			where: {
				id: Number(params.communityID)
			}
		})
	};
};
