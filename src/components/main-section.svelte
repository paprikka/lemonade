<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let isSticky = false;

	let stickRef: HTMLElement;
	let isPinned = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => {
				isPinned = e.intersectionRatio < 1;
			},
			{ threshold: [1] }
		);
		observer.observe(stickRef);

		return () => observer.disconnect();
	});
</script>

<section>
	<h2 bind:this={stickRef} class:is-pinned={isPinned} class:is-sticky={isSticky}>
		{title}<slot name="header" />
	</h2>
	<slot />
</section>

<style>
	section {
		margin-block: 1rem;
	}

	h2 {
		font-size: var(--font-size-l);
		margin-block: 1rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}

	h2.is-sticky {
		position: sticky;
		top: -1px;
		margin-block-start: calc(1rem + 1px);
		z-index: 1;
		background-color: var(--color-bg);
	}

	h2.is-pinned {
		font-size: var(--font-size-m);
		padding-block: calc(var(--font-size-l) - var(--font-size-m));
	}

	h2.is-pinned::after {
		content: '';
		height: 2rem;
		position: absolute;
		bottom: -2rem;
		left: 0;
		right: 0;
		background-image: linear-gradient(var(--color-bg), transparent);
	}

	section:not(:first-of-type) {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	section:first-of-type {
		margin-block-start: 0;
	}
	section:first-of-type h2 {
		margin-block-start: 0;
	}
</style>
