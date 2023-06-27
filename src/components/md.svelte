<script lang="ts">
	export let content: string;
	import { marked } from 'marked';
</script>

<div class="md-content">
	{@html marked.parse(content)}
</div>

<style>
	.md-content {
		max-width: 100%;
		word-break: break-word;
		hyphens: auto;
	}

	:global(.md-content > *) {
		max-width: 100%;
	}

	.md-content :global(img) {
		max-width: 100%;
		height: auto;
	}

	.md-content :global(hr) {
		border: none;
		border: 1px solid var(--color-text);
		margin: 1rem 0;
		opacity: 0.3;
	}
</style>
