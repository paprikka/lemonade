<script lang="ts">
	import type { Community } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import CommunityDetail from '../../components/community-detail.svelte';
	import CommunitySearchItemPlaceholder from '../../components/community-search-item-placeholder.svelte';
	import Footer from '../../components/footer.svelte';
	import MainSection from '../../components/main-section.svelte';
	import PageContainer from '../../components/page-container.svelte';
	import SearchResults from '../../components/search-results.svelte';
	import {
		clearCommunitySelection,
		handleOnVisit,
		selectCommunity,
		selectedCommunity
	} from '../../selected-community';

	let loadedCommunities: Community[] = [];
	let isLoading = true;

	export let data;
	data.deferred.communities.then((_) => {
		loadedCommunities = _;
		isLoading = false;
	}); // Can't rely on #await as we want to keep the transitions smooth
</script>

<PageContainer>
	<MainSection
		title={isLoading ? 'Hot communities' : `Hot communities (${loadedCommunities.length})`}
	>
		<SearchResults
			on:select={({ detail }) => selectCommunity(detail, 'hot')}
			communities={loadedCommunities}
			numberOfPlaceholders={12}
			bind:isLoading
		/>
	</MainSection>
</PageContainer>
<Footer />

{#if $selectedCommunity}
	<CommunityDetail
		community={$selectedCommunity}
		on:close={clearCommunitySelection}
		on:visit={handleOnVisit}
	/>
{/if}
