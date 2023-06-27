import type { FediAPICommunityEntry, FediAPIInstance } from '../types';

const getFediAPIEntries = async <T>(url: string) => {
	const res = await fetch(url);
	const entries = (await res.json()) as T;

	return entries;
};

export const getAPICommunities = () => {
	const getCacheTS = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayMidnight = today.getTime();

		return todayMidnight;
	};

	const communityURL = `https://browse.feddit.de/communities.json?nocache=${getCacheTS()}`;

	return getFediAPIEntries<FediAPICommunityEntry[]>(communityURL);
};

export const getAPIInstances = () =>
	getFediAPIEntries<FediAPIInstance[]>('https://lemmymap.feddit.de/instances.json');
