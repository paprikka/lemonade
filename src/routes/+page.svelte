<script lang="ts">
	import type { Community } from '@prisma/client';
	import { onMount } from 'svelte';
	import CommunityDetail from '../components/community-detail.svelte';
	import Footer from '../components/footer.svelte';
	import MainSection from '../components/main-section.svelte';
	import PageContainer from '../components/page-container.svelte';
	import SearchResults from '../components/search-results.svelte';
	import Search from '../components/search.svelte';
	import { track } from '../utils/track';
	import headerIMG from './header-bg.webp';
	import Header from '../components/header.svelte';

	export let data;
	let isMobile = false;

	onMount(() => {
		isMobile = window.screen.width < 400;
	});

	let selectedCommunity: Community | null = null;
	let selectedCollectionType: string | null = null;
	let searchResults: Community[] = [];
	let searchStatus: 'active' | 'done' | 'error' | 'empty' = 'empty';

	let headerElement: HTMLElement;
	let hideLogo = false;

	const scrollToInput = () => {
		if (!isMobile) return;

		hideLogo = true;
		setTimeout(() => {
			const scrollY = headerElement.getBoundingClientRect().top - 40;
			window.scrollTo({ top: scrollY, behavior: 'smooth' });
		}, 200);
	};

	const selectCommunity = (community: Community, collectionType: string) => {
		selectedCommunity = community;
		selectedCollectionType = collectionType;
		console.log('select-community', {
			community: community.name,
			collectionType,
			instance: new URL(selectedCommunity.fullURL).hostname
		});
	};

	const clearCommunitySelection = () => {
		selectedCommunity = null;
		selectedCollectionType = null;
	};

	const handleOnVisit = () => {
		if (!selectedCommunity) return;
		if (!selectedCollectionType) return;

		track('visit-community', {
			community: selectedCommunity.name,
			instance: new URL(selectedCommunity.fullURL).hostname,
			collectionType: selectedCollectionType
		});

		clearCommunitySelection();
	};
</script>

<PageContainer>
	<Header bind:headerElement {hideLogo}>
		<Search
			on:results={(e) => (searchResults = e.detail)}
			on:status={(e) => (searchStatus = e.detail)}
			on:focus={() => {
				track('search:focus');
				scrollToInput();
			}}
			class="search"
		/>
	</Header>

	<main>
		{#if searchStatus !== 'empty'}
			<MainSection title="Search results">
				<SearchResults
					communities={searchResults}
					on:select={({ detail }) => selectCommunity(detail, 'search')}
					isLoading={searchStatus === 'active'}
					numberOfPlaceholders={isMobile ? 3 : 6}
				/>
			</MainSection>
		{/if}

		<MainSection title="Hot communities">
			<a slot="header" class="section-link" href="/hot">See all</a>
			{#await data.deferred.hotCommunities}
				<SearchResults communities={[]} isLoading={true} />
			{:then hotCommunities}
				<SearchResults
					on:select={({ detail }) => selectCommunity(detail, 'hot')}
					communities={hotCommunities}
				/>
			{/await}
		</MainSection>

		<MainSection title="Top communities">
			{#await data.deferred.topCommunities}
				<SearchResults communities={[]} isLoading={true} />
			{:then topCommunities}
				<SearchResults
					on:select={({ detail }) => selectCommunity(detail, 'top')}
					communities={topCommunities}
				/>
			{/await}
		</MainSection>
	</main>
</PageContainer>
<Footer />

{#if selectedCommunity}
	<CommunityDetail
		community={selectedCommunity}
		on:close={clearCommunitySelection}
		on:visit={handleOnVisit}
	/>
{/if}

<style>
	a.section-link {
		font-size: var(--font-size-m);
	}
</style>
