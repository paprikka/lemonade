<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let icon: string;

	export let size: 'hero' | 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' = 'm';

	export let variant: 'default' | 'filled' = 'default';

	const dispatcher = createEventDispatcher();
</script>

<button
	on:click={() => dispatcher('click')}
	aria-label={label}
	style:--bg={`url(${icon})`}
	style={`--size: var(--font-size-${size})`}
	class:is-filled={variant === 'filled'}
	class:is-default={variant === 'default'}
/>

<style>
	button {
		appearance: none;
		border: none;
		border-radius: 100rem;

		margin: 0;
		padding: 1em;
		width: var(--size);
		height: var(--size);
		display: inline-block;
		flex-shrink: 1;

		background-color: var(--color-accent-fade-50);
		background-size: var(--size);
		background: var(--bg) center no-repeat;

		cursor: pointer;

		font-size: var(--size);
		line-height: var(--size);

		vertical-align: bottom;
	}

	.is-filled {
		background-color: var(--color-bg);
		opacity: 0.9;
		box-shadow: var(--dialog-shadow);
	}

	@media (hover: hover) {
		.is-default:hover {
			opacity: 0.7;
			background-color: rgba(0, 0, 0, 0.1);
		}

		.is-filled:hover {
			opacity: 1;
		}
	}

	button:active {
		opacity: 1;
		scale: 0.97;
	}
</style>
