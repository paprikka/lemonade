import { PrismaClient } from '@prisma/client';
import { v4 as getUUID } from 'uuid';
import { makeLogger } from '../../utils/log';
import { getAPICommunities, getAPIInstances } from './fedi-api';
const log = makeLogger('update-db');

const urlToDomain = (url: string) => new URL(url).host;

const main = async () => {
	const prisma = new PrismaClient();

	log('Removing old entries...');

	await prisma.instance.deleteMany({});
	await prisma.community.deleteMany({});

	console.assert((await prisma.community.count()) === 0);
	console.assert((await prisma.instance.count()) === 0);

	log('Fetching instances...');
	const apiInstances = await getAPIInstances();

	// I'm treating domains as the unique key here
	// Perhaps I should revisit that in the future, but
	// I can't think of any reason why multiple instances
	// would share the same domain.
	// OK, I need to get a paid job instead of working on this.
	const usedDomains = new Set<string>();

	const uniqueInstances = apiInstances.filter((instance) => {
		const domain = urlToDomain(instance.site_view.site.actor_id);
		if (usedDomains.has(domain)) return false;

		usedDomains.add(domain);
		return true;
	});

	log('Inserting the new instance list...');

	const instancesToAdd = uniqueInstances.map((fediEntry) => ({
		id: getUUID(),
		domain: urlToDomain(fediEntry.site_view.site.actor_id),
		name: fediEntry.site_view.site.name,
		icon: fediEntry.site_view.site.icon,
		banner: fediEntry.site_view.site.banner
	}));

	await prisma.instance.createMany({ data: instancesToAdd });

	log('Fetching the current list of communities...');
	const apiCommunities = await getAPICommunities();

	const instanceIDsByDomain = instancesToAdd.reduce((acc, instance) => {
		acc.set(instance.domain, instance.id);
		return acc;
	}, new Map<string, string>());

	log('Inserting the new community list...');
	const communitiesToAdd = apiCommunities.map((fediEntry) => {
		return {
			id: getUUID(),
			name: fediEntry.community.name,
			title: fediEntry.community.title,
			description: fediEntry.community.description,
			nsfw: fediEntry.community.nsfw,
			icon: fediEntry.community.icon || null,
			banner: fediEntry.community.banner || null,
			countSubscribers: fediEntry.counts.subscribers,
			countPosts: fediEntry.counts.posts,
			countComments: fediEntry.counts.comments,
			countUsersActiveDay: fediEntry.counts.users_active_day,
			countUsersActiveMonth: fediEntry.counts.users_active_day,
			fullURL: fediEntry.community.actor_id,
			instanceId: instanceIDsByDomain.get(urlToDomain(fediEntry.community.actor_id)) || null
		};
	});

	await prisma.community.createMany({ data: communitiesToAdd });
};

main();
