<script lang="ts">
	export let label: string = '';
	export let secondaryLabel: string = '';
	export let block: boolean = false;
</script>

<label class:is-block={block}>
	<slot />
	{#if label} <span class="primary">{label}</span> {/if}
	{#if secondaryLabel}
		<span class="secondary">{secondaryLabel}</span>
	{/if}
</label>

<style>
	label {
		--font-size-primary: var(--font-size-s);
		--font-size-secondary: var(--font-size-xs);
		cursor: pointer;
		display: grid;
		align-content: baseline;
		align-items: center;
		font-size: var(--font-size-primary);
		grid-template-columns: min-content max-content;
		margin-block-start: 0.2em;
	}

	.is-block {
		grid-template-columns: 100%;
	}

	.primary {
		font-size: var(--font-size-primary);
		font-weight: bold;
		line-height: 1;
	}

	.secondary {
		font-weight: 400;
		opacity: 0.7;
		font-size: var(--font-size-secondary);
		grid-column: 2/3;
	}

	label :global(input[type='checkbox']) {
		margin: 0 0.5em 0 0;
		vertical-align: middle;
	}

	label :global(select) {
		font-size: var(--font-size-secondary);
	}
</style>
