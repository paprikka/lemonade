<script lang="ts">
	export let content: string;
	import { marked } from 'marked';
	marked.use({
		renderer: {
			link(href, title, text) {
				const isRemoteURL = href && href.startsWith('http');
				if (isRemoteURL) {
					return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
				}
				const maybeTitleAttr = title ? ` title="${title}"` : '';
				return `<a href="${href}"${maybeTitleAttr}>${text}</a>`;
			}
		}
	});
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
