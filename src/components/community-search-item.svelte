<script lang="ts">
	import type { Community } from '@prisma/client';

	export let community: Community;

	//format number with k and m, e.g. 1.2k for 1212 and 1.2m for 1212121
	const formatNumber = (n: number) => {
		if (n < 1000) return n;
		if (n < 1000000) return (n / 1000).toFixed(1) + 'k';
		return (n / 1000000).toFixed(1) + 'm';
	};

	import { createEventDispatcher } from 'svelte';
	import Image from './image.svelte';

	const dispatch = createEventDispatcher();

	$: instanceName = new URL(community.fullURL).hostname;
</script>

<button class="container" on:click={() => dispatch('select', community)}>
	<article>
		<div class="thumbnail">
			{#if community.icon}
				<Image src={community.icon} alt={community.name} class="thumbnail-img" />
			{/if}
		</div>
		<div class="meta">
			<h3 class="name">{instanceName}/c/{community.name}</h3>
			<h2 class="title">{community.title}</h2>

			<ul class="stats">
				<li>
					<span class="stat">{formatNumber(community.countUsersActiveDay)}</span>
					<span class="label">active today</span>
				</li>
				<li>
					<span class="stat">{formatNumber(community.countComments)}</span>
					<span class="label">comments</span>
				</li>
				<li>
					<span class="stat">{formatNumber(community.countPosts)}</span>
					<span class="label">posts</span>
				</li>
				<li>
					<span class="stat">{formatNumber(community.countSubscribers)}</span>
					<span class="label">subscribers</span>
				</li>
			</ul>
		</div>
	</article>
</button>

<style>
	.container {
		border: none;
		appearance: none;
		width: 100%;
		padding: 0;
		text-align: start;
		background: none;
		color: var(--color-text);
		--border-radius: 0.5rem;
	}

	@media (min-width: 440px) {
		.container {
			--border-radius: 1rem;
		}
	}

	.container:focus-visible {
		outline: none;
	}
	.container:focus-visible article {
		background-color: var(--color-accent-1-20);
		box-shadow: inset 0 0 0 0.2rem var(--color-accent-1-20);
	}

	.container article {
		padding: 0.25rem;
		border-radius: var(--border-radius);
		display: flex;
		cursor: pointer;
		transition: scale 0.2s;
	}

	@media (min-width: 440px) {
		.container article {
			padding: 0.5rem;
		}
	}

	@media (hover: hover) {
		.container:hover article {
			background-color: var(--color-accent-2-20);
		}
	}

	.container:active article {
		background-color: var(--color-accent-2-20);
	}

	@media (min-width: 440px) {
		.container:active article {
			background-color: var(--color-accent-2);
			scale: 0.95;
		}
	}

	.thumbnail {
		width: 4rem;
		height: 4rem;
		margin-right: 0.75rem;
		overflow: hidden;
		border-radius: calc(var(--border-radius) * 0.8);
		flex-shrink: 0;
	}

	@media (min-width: 440px) {
		.thumbnail {
			width: 5rem;
			height: 5rem;
			margin-right: 1rem;
		}
	}

	.thumbnail:empty {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.thumbnail :global(.thumbnail-img) {
		width: 100%;
		height: 100%;
		object-fit: cover;

		vertical-align: bottom;
	}

	.name {
		margin: 0;
		font-size: var(--font-size-xs);
		font-weight: normal;
		opacity: 0.5;
	}
	.title {
		margin: 0.25rem 0 0.5rem;
		font-size: var(--font-size-m);
		font-weight: 600;
		line-height: 1rem;
	}

	.stats {
		display: grid;
		list-style: none;
		padding: 0;
		margin: 0;
		grid-template-columns: repeat(2, 1fr);
		gap: 0 0.5rem;
		font-size: var(--font-size-xs);
		opacity: 0.7;
	}

	.stats .stat {
		font-weight: 600;
	}
</style>
