<script lang="ts">
	import type { Community } from '@prisma/client';
	import CommunityDetail from '../../components/community-detail.svelte';
	import Footer from '../../components/footer.svelte';
	import Header from '../../components/header.svelte';
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

	let headerElement: HTMLElement;
</script>

<PageContainer>
	<Header bind:headerElement />
	<MainSection
		isSticky
		title={isLoading ? 'All hot communities' : `All hot communities (${loadedCommunities.length})`}
	>
		<a href="/" slot="header">Back</a>
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

<style>
	a[href='/'] {
		font-size: var(--font-size-m);
	}
	/* TODO: remove duplicated styles with /about */
	a[href='/'] {
		position: relative;
		padding-inline-start: 1em;
	}
	a[href='/']::before {
		content: '←';
		position: absolute;
		left: 0;
	}
</style>
