import { PrismaClient } from '@prisma/client';
import { makeLogger } from '../../utils/log';

const log = makeLogger('Wipe DB');

const main = async () => {
	const prisma = new PrismaClient();

	log('Removing old entries...');

	await prisma.instance.deleteMany({});
	await prisma.community.deleteMany({});

	log(`Communities: ${await prisma.community.count()}`);
	log(`Instances: ${await prisma.instance.count()}`);
};

main();
