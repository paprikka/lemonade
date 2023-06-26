<!-- TODO: check if I can use the dialog element natively -->

<script lang="ts">
	import type { Community } from '@prisma/client';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import backIcon from './icon-back.svg';
	import IconButton from './icon-button.svelte';
	import Md from './md.svelte';

	export let community: Community;
	$: bannerBg = community.banner ? `url(${community.banner})` : undefined;

	const dispatch = createEventDispatcher();

	onMount(() => (document.body.style.overflow = 'hidden'));
	onDestroy(() => (document.body.style.overflow = ''));

	$: instanceName = new URL(community.fullURL).hostname;
</script>

<div class="container">
	<div class="content">
		<header style:--bgImg={bannerBg}>
			<nav>
				<IconButton icon={backIcon} label="Go back" on:click={() => dispatch('close')} />
			</nav>
			<div class="thumbnail">
				{#if community.icon}
					<img src={community.icon} alt={community.name} />
				{/if}
			</div>
			<h4 class="instance-url">{instanceName}</h4>
			<h2 class="title">
				<a href={community.fullURL} target="_blank">{community.title}</a>
			</h2>

			<h4 class="name">{community.name}</h4>
			<ul class="stats">
				<li>
					<strong>People</strong>
					{community.countSubscribers}
				</li>
				<li>
					<strong>Posts</strong>
					{community.countPosts}
				</li>
				<li>
					<strong>Comments</strong>
					{community.countComments}
				</li>
			</ul>
		</header>

		<section class="description">
			<h1>Description</h1>
			<Md content={community.description || 'no description'} />
		</section>

		<footer>
			<button
				on:click={() => {
					window.open(community.fullURL, '_blank');
				}}>Visit</button
			>
		</footer>
	</div>
</div>

<style>
	.container {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-content: center;
		place-items: center;
		backdrop-filter: blur(1rem);
		-webkit-backdrop-filter: blur(1rem);
	}

	.content {
		position: absolute;
		inset: 1rem;
		border-radius: 1rem;
		background-color: var(--color-bg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		scroll-behavior: smooth;
	}

	@media (min-width: 400px) {
		.content {
			position: fixed;
			margin: 1rem auto 0;
			max-width: 40rem;
		}
	}

	header {
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.025);
		border-radius: 1rem 1rem 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
			var(--bgImg);

		background-size: cover;
	}

	.instance-url {
		opacity: 0.5;
		font-size: var(--font-size-xs);
		font-weight: 400;
		margin: 0;
	}
	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: 2rem;
		text-align: center;
	}

	.title a {
		text-decoration: none;
		color: var(--color-text);
	}

	.title a:hover {
		text-decoration: underline;
	}
	.name {
		margin: 0 0 0.5rem;
		font-size: var(--font-size-s);
		font-weight: 400;
	}
	.description {
		margin: 0;
		padding: 1rem;
		font-size: var(--font-size-s);
		flex: 1;
		overflow: auto;
	}

	.description h1 {
		margin: 0 0 1rem;
		font-size: var(--font-size-m);
		font-weight: 400;
	}

	.description :global(.md-content :is(h1, h2)) {
		font-size: var(--font-size-l);
		font-weight: 600;
	}

	.description :global(.md-content) {
		font-size: var(--font-size-s);
	}

	.description :global(.md-content :is(ol, ul)) {
		margin: 0;
		padding: 0 0 0 1em;
	}

	.description :global(.md-content strong) {
		font-weight: 600;
	}

	.thumbnail {
		margin-block-end: 1rem;
		--img-w: 4rem;
	}

	.thumbnail:empty {
		background: rgba(0, 0, 0, 0.1);
		width: var(--img-w);
		aspect-ratio: 1;
		display: flex;
		place-content: center;
		place-items: center;
		padding: 1rem;
		overflow: hidden;
		border-radius: 0.75rem;
	}

	.thumbnail:empty::after {
		content: 'no image';
		display: block;
		text-align: center;
		opacity: 0.5;
		font-size: var(--font-size-xs);
	}

	.thumbnail img {
		width: var(--img-w);
		height: auto;
		vertical-align: bottom;
		overflow: hidden;
		border-radius: 0.75rem;
	}

	nav {
		align-self: stretch;
		position: absolute;
	}

	footer {
		display: flex;
		align-items: stretch;
		align-content: stretch;
		padding: 1rem;
	}

	footer button {
		flex: 1;
		appearance: none;
		border: none;
		border-radius: 0.75rem;
		font-size: var(--font-size-l);
		line-height: 3rem;
		background-color: var(--color-text);
		color: var(--color-bg);
		font-family: var(--font-family-body);
		font-weight: bold;
		cursor: pointer;
	}

	@media (hover: hover) {
		footer button:hover {
			opacity: 0.9;
		}
	}

	.stats {
		width: 100%;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: var(--font-size-xs);
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
	}

	.stats li {
		display: inline;
	}
</style>
