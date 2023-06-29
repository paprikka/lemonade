<script lang="ts">
	import type { Community } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import CommunityDetail from '../components/community-detail.svelte';
	import CommunitySearchItemPlaceholder from '../components/community-search-item-placeholder.svelte';
	import CommunitySearchItem from '../components/community-search-item.svelte';
	import Footer from '../components/footer.svelte';
	import MainSection from '../components/main-section.svelte';
	import Search from '../components/search.svelte';
	import headerIMG from './header-bg.webp';
	import { onMount } from 'svelte';
	import { track } from '../utils/track';

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

<div class="page-container">
	<header bind:this={headerElement}>
		<div class="img-wrapper" style:display={hasfocusedAtLeastOnce ? 'none' : ''}>
			<img alt="Lemmy" src={headerIMG} />
			<h1>Lemonade</h1>
			<h2>The fruitiest way to browse Lemmy communities</h2>
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
				{#if searchStatus === 'active' || (searchStatus === 'done' && searchResults.length === 0)}
					<div class="search-results-placeholder">
						<ul class="search-results">
							{#each Array(isMobile ? 3 : 6) as _}
								<li>
									<CommunitySearchItemPlaceholder active={searchStatus === 'active'} />
								</li>
							{/each}
						</ul>
						{#if searchStatus === 'done'}
							<span class="no-search-label" transition:fade={{ duration: 200 }}
								>No communities found.</span
							>
						{/if}
					</div>
				{/if}
				{#if searchResults.length && searchStatus === 'done'}
					<ul class="search-results">
						{#each searchResults as community (community.id)}
							<li>
								<CommunitySearchItem
									on:select={() => {
										selectCommunity(community, 'search');
									}}
									{community}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			</MainSection>
		{/if}

		<MainSection title="Hot communities">
			{#await data.deferred.hotCommunities}
				<ul class="search-results" transition:fade>
					{#each Array(6) as _}
						<li>
							<CommunitySearchItemPlaceholder />
						</li>
					{/each}
				</ul>
			{:then hotCommunities}
				<ul class="search-results" transition:fade>
					{#each hotCommunities as community}
						<li>
							<CommunitySearchItem
								on:select={() => {
									selectCommunity(community, 'hot');
								}}
								{community}
							/>
						</li>
					{/each}
				</ul>
			{/await}
		</MainSection>

		<MainSection title="Top communities">
			{#await data.deferred.topCommunities}
				<ul class="search-results">
					{#each Array(6) as _}
						<li>
							<CommunitySearchItemPlaceholder />
						</li>
					{/each}
				</ul>
			{:then topCommunities}
				<ul class="search-results" transition:fade>
					{#each topCommunities as community}
						<li transition:fade>
							<CommunitySearchItem
								on:select={() => {
									selectCommunity(community, 'top');
								}}
								{community}
							/>
						</li>
					{/each}
				</ul>
			{/await}
		</MainSection>
	</main>
	<Footer />
</div>

{#if selectedCommunity}
	<CommunityDetail
		community={selectedCommunity}
		on:close={clearCommunitySelection}
		on:visit={handleOnVisit}
	/>
{/if}

<style>
	.page-container {
		max-width: 40rem;
		margin: 0 auto;

		--padding: 1rem;
	}

	header {
		position: relative;
		padding: var(--padding);
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
	}

	header :global(.search) {
		position: sticky;
		top: 1rem;
	}

	main {
		padding: var(--padding);
	}

	.search-results {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		width: 100%;
		overflow: hidden;
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}

	@media (min-width: 440px) {
		.search-results {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}

	.search-results > li {
		margin: 0;
	}

	.search-results-placeholder {
		position: relative;
	}

	.search-results-placeholder .no-search-label {
		position: absolute;
		z-index: 2;
		inset: 0;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 0.5rem;
		text-align: center;
		font-size: var(--font-size-s);
		opacity: 0.7;
		display: grid;
		place-content: center;
	}
</style>
