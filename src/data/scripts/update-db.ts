import { PrismaClient } from '@prisma/client';
import { makeLogger } from '../../utils/log';
import type { FediAPICommunityEntry, FediAPIInstance } from '../types';
const log = makeLogger('update-db');

const getFediAPIEntries = async <T>(url: string) => {
	const res = await fetch(url);
	const entries = (await res.json()) as T;

	return entries;
};

const main = async () => {
	const prisma = new PrismaClient();

	log('Removing old entries...');

	await prisma.instance.deleteMany({});
	await prisma.community.deleteMany({});

	log('Fetching instances...');

	const apiInstances = await getFediAPIEntries<FediAPIInstance[]>(
		'https://lemmymap.feddit.de/instances.json'
	);

	// I'm treating domains as the unique key here
	// Perhaps I should revisit that in the future, but
	// I can't think of any reason why multiple instances
	// would share the same domain.
	// OK, I need to get a paid job instead of working on this.
	const usedDomains = new Set<string>();

	const urlToDomain = (url: string) => new URL(url).host;
	const uniqueInstances = apiInstances.filter((instance) => {
		const domain = urlToDomain(instance.site_view.site.actor_id);
		if (usedDomains.has(domain)) return false;

		usedDomains.add(domain);
		return true;
	});

	log('Inserting the new instance list...');

	await Promise.all(
		uniqueInstances.map((fediEntry) => {
			const payload = {
				domain: urlToDomain(fediEntry.site_view.site.actor_id),
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

	log('Inserting the new community list...');

	console.dir(apiCommunities[0], { depth: null });

	// Some communities point to instances that are not in the instance list.
	const missedDomains = new Set<string>();
	await Promise.all(
		apiCommunities.map((fediEntry) => {
			const domain = urlToDomain(fediEntry.community.actor_id);
			return prisma.community
				.create({
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
						countUsersActiveDay: fediEntry.counts.users_active_day,
						instance: {
							connect: {
								domain: fediEntry.url
							}
						}
					}
				})
				.catch((error) => {
					log(`Error inserting ${domain}: ${error}`);
					missedDomains.add(domain);
				});
		})
	);

	if (missedDomains.size == 0) {
		log('All communities inserted successfully (no mismatched domains)');
	} else {
		log('Some communities were not inserted due to mismatched domains:');
		console.log(missedDomains);
	}
};

main();
