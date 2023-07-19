import type { Community } from '@prisma/client';
import { writable, get } from 'svelte/store';
import { track } from './utils/track';

export const selectedCommunity = writable<Community | null>(null);
export const selectedCollectionType = writable<string | null>(null);

export const selectCommunity = (community: Community, collectionType: string) => {
	selectedCommunity.set(community);
	selectedCollectionType.set(collectionType);

	console.log('select-community', {
		community: community.name,
		collectionType,
		instance: new URL(community.fullURL).hostname
	});
};

export const clearCommunitySelection = () => {
	selectedCommunity.set(null);
	selectedCollectionType.set(null);
};

export const handleOnVisit = () => {
	const selectCommunityValue = get(selectedCommunity);
	const selectCollectionTypeValue = get(selectedCollectionType);

	if (!selectCommunityValue) return;
	if (!selectCollectionTypeValue) return;

	track('visit-community', {
		community: selectCommunityValue.name,
		instance: new URL(selectCommunityValue.fullURL).hostname,
		collectionType: selectCollectionTypeValue
	});

	clearCommunitySelection();
};
