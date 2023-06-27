<script lang="ts">
	export let label: string = '';
	export let secondaryLabel: string = '';
	export let block: boolean = false;
</script>

<label class:is-block={block}>
	<slot />
	<div class="labels">
		{#if label} <span>{label}</span> {/if}
		{#if secondaryLabel}
			<span class="secondary">{secondaryLabel}</span>
		{/if}
	</div>
</label>

<style>
	label {
		cursor: pointer;
		display: flex;
		align-items: flex-start;
		line-height: inherit;
		font-weight: bold;
		font-size: var(--font-size-s);
		width: 100%;
	}

	.is-block {
		flex-direction: column-reverse;
		align-items: stretch;
		align-content: stretch;
	}

	.labels {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.secondary {
		font-weight: 400;
		opacity: 0.7;
		font-size: var(--font-size-xs);
	}

	label :global(input[type='checkbox']) {
		line-height: inherit;
		margin: 0.2em 0.5em 0 0;
	}

	label :global(select) {
		width: 100%;
	}
</style>
