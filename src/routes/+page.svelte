<script lang="ts">
	import type { Community } from '@prisma/client';
	import CommunityDetail from '../components/community-detail.svelte';
	import CommunitySearchItemPlaceholder from '../components/community-search-item-placeholder.svelte';
	import CommunitySearchItem from '../components/community-search-item.svelte';
	import Footer from '../components/footer.svelte';
	import FormItem from '../components/form-item.svelte';
	import MainSection from '../components/main-section.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	let selectedCommunity: Community | null = null;

	let searchResults: Community[] = [];
	let searchSettings = {
		query: ''
	};

	const search = (query: string) => {
		isSearchActive = true;
		const params = new URLSearchParams();
		params.append('query', query);

		fetch('/api/search?' + params.toString())
			.then((res) => res.json() as Promise<{ communities: Community[] }>)
			.then((res) => {
				searchResults = res.communities;
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				isSearchActive = false;
			});
	};

	const debounced = <T>(fn: (a: T) => void, delay: number) => {
		let timer: NodeJS.Timeout;
		return (a: T) => {
			clearTimeout(timer);
			timer = setTimeout(() => fn(a), delay);
		};
	};

	let isSearchActive = false;
	const handleSearchInput = debounced((e: Event) => {
		searchSettings.query = (e.target as HTMLInputElement).value;
		if (!searchSettings.query) {
			searchResults = [];
			return;
		}

		search(searchSettings.query);
	}, 300);
</script>

<div class="page-container">
	<header>
		<form>
			<input
				type="search"
				name="query"
				placeholder="e.g. Handsome priests"
				value={searchSettings.query}
				on:input={handleSearchInput}
			/>

			<div class="settings" hidden>
				<FormItem label="Include NSFW">
					<input type="checkbox" name="nsfw" checked={false} />
				</FormItem>
			</div>
		</form>
	</header>
	<main>
		{#if isSearchActive}
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
		max-width: 50rem;
		margin: 0 auto;

		--padding: 1rem;
	}

	header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		padding: var(--padding);
		z-index: 1;
	}

	header form {
		width: 100%;
		display: flex;
		justify-content: stretch;
		flex-direction: column;
		gap: 1rem;
	}

	.settings {
		background-color: white;
		padding: 1rem;
		font-size: var(--font-size-xs);
		border-radius: 0.5rem;
	}

	main {
		padding: var(--padding);
	}

	form input[type='search'] {
		flex: 1;
		display: block;
		background-color: var(--color-accent-1);
		border: none;
		border-radius: 0.5rem;
		font-size: var(--font-size-m);
		line-height: 3;
		padding: 0 1rem;
	}

	form input[type='search']:focus {
		outline: 0.1rem solid var(--color-text);
	}

	form input[type='search']::placeholder {
		mix-blend-mode: multiply;
		opacity: 0.5;
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
</style>
