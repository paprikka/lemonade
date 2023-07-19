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
	let hasfocusedAtLeastOnce = false;

	const scrollToInput = () => {
		if (!isMobile) return;

		hasfocusedAtLeastOnce = true;
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
	<header bind:this={headerElement}>
		<div class="img-wrapper" style:display={hasfocusedAtLeastOnce ? 'none' : ''}>
			<img alt="Lemmy" src={headerIMG} />
			<h1>Lemonade</h1>
			<h2>The <span class="fruity">fruitiest</span> way to browse Lemmy communities</h2>
		</div>
		<Search
			on:results={(e) => (searchResults = e.detail)}
			on:status={(e) => (searchStatus = e.detail)}
			on:focus={() => {
				track('search:focus');
				scrollToInput();
			}}
			class="search"
		/>
	</header>
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
	<Footer />
</PageContainer>

{#if selectedCommunity}
	<CommunityDetail
		community={selectedCommunity}
		on:close={clearCommunitySelection}
		on:visit={handleOnVisit}
	/>
{/if}

<style>
	header {
		position: relative;
		padding: 1rem;
		z-index: 1;

		background-color: var(--color-bg);
		display: flex;
		flex-direction: column;
	}

	header::after {
		content: '';
		height: 2rem;
		position: absolute;
		bottom: -2rem;
		left: 0;
		right: 0;
		background-image: linear-gradient(var(--color-bg), transparent);
	}

	.img-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
		max-width: 20rem;
	}

	.img-wrapper h1 {
		margin: 0;
		font-size: var(--font-size-hero);
		line-height: 1;
	}

	.fruity {
		background: linear-gradient(
			to right,
			#000 0%,
			#000 20%,
			yellow,
			lime,
			orange,
			tomato,
			yellow,
			orange,
			#000 80%,
			#000 100%
		);

		background-size: 600%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;

		animation: fruity-enter 3s ease-in-out both;
	}

	@keyframes fruity-enter {
		from {
			background-position: 0;
		}
		to {
			background-position: 100%;
		}
	}

	.img-wrapper h2 {
		margin: 0;
		line-height: 1;
		font-size: var(--font-size-s);
		font-weight: normal;
	}

	.img-wrapper > img {
		max-width: 10rem;
		align-self: center;
		height: auto;
		margin: 2rem 0 -2rem;
		aspect-ratio: 700/606;
	}

	header :global(.search) {
		position: sticky;
		top: 1rem;
	}

	main {
		padding: 1rem;
	}
</style>
