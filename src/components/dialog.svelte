<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	export let isOpen = false;

	let dialogElement: HTMLDialogElement;

	$: {
		if (dialogElement) {
			dialogElement.addEventListener('close', () => {
				isOpen = false;
				dispatch('close');
			});
		}
	}

	$: isOpen ? dialogElement?.showModal() : dialogElement?.close();
</script>

<dialog bind:this={dialogElement}>
	{#if isOpen}
		<div class="content" transition:fade={{ duration: 300, delay: 100 }}>
			<slot />
		</div>
	{/if}
</dialog>

<style>
	dialog {
		background: transparent;
		padding: 1rem;
		border: none;
		position: fixed;
		inset: 0;
		max-width: none;
		max-height: none;
	}

	dialog:focus-visible {
		outline: none;
	}

	dialog::backdrop {
		animation: backdrop-animation 0.2s ease-out both;
	}

	@keyframes backdrop-animation {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
			backdrop-filter: blur(0.5rem);
			-webkit-backdrop-filter: blur(0.5rem);
		}
	}
</style>
