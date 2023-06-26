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
</style>
