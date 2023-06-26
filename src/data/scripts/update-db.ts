import { PrismaClient } from '@prisma/client';
import { makeLogger } from '../../utils/log';
import type {
	CommunityEntry,
	FediAPICommunityEntry,
	FediAPIInstance,
	InstanceEntry
} from '../types';
const log = makeLogger('update-db');

const getFediAPIEntries = async <T>(url: string) => {
	const res = await fetch(url);
	const entries = (await res.json()) as T;

	return entries;
};

const main = async () => {
	const prisma = new PrismaClient();

	log('Fetching instances...');

	const apiInstances = await getFediAPIEntries<FediAPIInstance[]>(
		'https://lemmymap.feddit.de/instances.json'
	);

	prisma.instance.deleteMany({});

	// I'm treating domains as the unique key here
	// Perhaps I should revisit that in the future, but
	// I can't think of any reason why multiple instances
	// would share the same domain.
	// OK, I need to get a paid job instead of working on this.
	const usedDomains = new Set<string>();
	const uniqueInstances = apiInstances.filter((instance) => {
		const domain = new URL(instance.site_view.site.actor_id).host;
		if (usedDomains.has(domain)) return false;

		usedDomains.add(domain);
		return true;
	});

	log('Inserting the new instance list...');
	await Promise.all(
		uniqueInstances.map((fediEntry) => {
			const payload = {
				domain: new URL(fediEntry.site_view.site.actor_id).host,
				name: fediEntry.site_view.site.name,
				icon: fediEntry.site_view.site.icon,
				banner: fediEntry.site_view.site.banner
			};
			return prisma.instance.upsert({
				create: payload,
				update: payload,
				where: {
					domain: payload.domain
				}
			});
		})
	);

	log('Fetching the current list of communities...');
	const getCacheTS = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayMidnight = today.getTime();

		return todayMidnight;
	};

	const communityURL = `https://browse.feddit.de/communities.json?nocache=${getCacheTS()}`;

	const apiCommunities = await getFediAPIEntries<FediAPICommunityEntry[]>(communityURL);

	log('Removing all communities from the database...');
	await prisma.community.deleteMany({});

	log('Inserting the new community list...');
	await Promise.all(
		apiCommunities.map((fediEntry) => {
			return prisma.community.create({
				data: {
					name: fediEntry.community.name,
					title: fediEntry.community.title,
					description: fediEntry.community.description,
					nsfw: fediEntry.community.nsfw,
					icon: fediEntry.community.icon || null,
					banner: fediEntry.community.banner || null,
					countSubscribers: fediEntry.counts.subscribers,
					countPosts: fediEntry.counts.posts,
					countComments: fediEntry.counts.comments,
					countUsersActiveDay: fediEntry.counts.users_active_day
				}
			});
		})
	);
};

main();
