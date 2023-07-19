<script lang="ts">
	import type { Community } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import CommunitySearchItem from './community-search-item.svelte';
	import { createEventDispatcher } from 'svelte';
	import CommunitySearchItemPlaceholder from './community-search-item-placeholder.svelte';

	const dispatch = createEventDispatcher<{ select: Community }>();

	export let communities: Community[] = [];
	export let enableTransitions = true;
	export let isLoading = false;
	export let numberOfPlaceholders = 6;
</script>

<div class="search-results" transition:fade={enableTransitions ? { duration: 200 } : undefined}>
	{#if isLoading || (!isLoading && communities.length === 0)}
		<div class="search-results-placeholder grid">
			{#each Array(numberOfPlaceholders) as _}
				<li>
					<CommunitySearchItemPlaceholder active={isLoading} />
				</li>
			{/each}

			{#if !isLoading && communities.length === 0}
				<span class="no-search-label" transition:fade={{ duration: 200 }}
					>No communities found.</span
				>
			{/if}
		</div>
	{:else}
		<ul class="grid">
			{#each communities as community}
				<li transition:fade>
					<CommunitySearchItem on:select={() => dispatch('select', community)} {community} />
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.grid {
		display: grid;
		width: 100%;
		overflow: hidden;
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}
	@media (min-width: 440px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}
	.search-results ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.search-results ul > li {
		margin: 0;
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
