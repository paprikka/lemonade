<script lang="ts">
	import type { Community } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import CommunityDetail from '../components/community-detail.svelte';
	import CommunitySearchItemPlaceholder from '../components/community-search-item-placeholder.svelte';
	import CommunitySearchItem from '../components/community-search-item.svelte';
	import Footer from '../components/footer.svelte';
	import FormItem from '../components/form-item.svelte';
	import MainSection from '../components/main-section.svelte';
	import headerIMG from './header-bg.webp';
	import { debounced } from '../utils/debounced';
	import Search from '../components/search.svelte';

	export let data;

	let selectedCommunity: Community | null = null;
	let searchResults: Community[] = [];
	let searchStatus: 'active' | 'done' | 'error' | 'empty' = 'empty';
</script>

<div class="page-container">
	<header>
		<img alt="Lemmy" src={headerIMG} />
		<Search
			on:results={(e) => (searchResults = e.detail)}
			on:status={(e) => (searchStatus = e.detail)}
			class="search"
		/>
	</header>
	<main>
		{#if searchStatus === 'active'}
			<ul class="search-results">
				{#each Array(10) as _}
					<li>
						<CommunitySearchItemPlaceholder />
					</li>
				{/each}
			</ul>
		{/if}
		{#if searchResults.length}
			<ul class="search-results">
				{#each searchResults as community (community.id)}
					<li>
						<CommunitySearchItem
							on:select={() => {
								selectedCommunity = community;
							}}
							{community}
						/>
					</li>
				{/each}
			</ul>
		{:else if searchStatus === 'done'}
			<div class="no-search-placeholder" in:fade>No results</div>
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
									selectedCommunity = community;
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
									selectedCommunity = community;
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
	<CommunityDetail community={selectedCommunity} on:close={() => (selectedCommunity = null)} />
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

	header > img {
		max-width: 10rem;
		align-self: center;
		height: auto;
		margin: 2rem 0 3rem;
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
		gap: 1rem;
	}

	@media (min-width: 400px) {
		.search-results {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.search-results > li {
		margin: 0;
	}

	.no-search-placeholder {
		z-index: 2;
		position: relative;
		padding: 1rem;
		text-align: center;
		border: 0.1rem solid var(--color-accent-1);
		border-radius: 0.5rem;
		background-color: var(--color-accent-1-20);
	}
</style>
