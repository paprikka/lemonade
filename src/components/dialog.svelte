<!-- TODO: check if I can use the dialog element natively -->

<script lang="ts">
	import IconButton from './icon-button.svelte';
	import backIcon from './icon-back.svg';
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	const dispatch = createEventDispatcher();
</script>

{#if isOpen}
	<div class="container">
		<div class="content">
			<header>
				<nav>
					<IconButton icon={backIcon} label="Go back" on:click={() => dispatch('close')} />
				</nav>
			</header>

			<section class="content">
				<slot />
			</section>
		</div>
	</div>
{/if}

<style>
	.container {
		position: fixed;
		z-index: 1000;
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
		overflow-y: auto;
	}

	header {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	nav {
		align-self: stretch;
		position: relative;
		z-index: 1;
	}
</style>
