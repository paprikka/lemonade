<slot />
<svelte:head>
	<script
		async
		defer
		data-website-id="f45c804c-4d21-4f3c-bf66-040f234be3cd"
		data-domains="lemmy.sonnet.io,lemonade.sonnet.io"
		src="https://sonnet-events.vercel.app/umami.js"
	></script>
</svelte:head>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		font-size: clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.6944)), 1.25rem);
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		line-height: 1.5;

		--font-size-hero: 3.052rem;
		--font-size-xxxl: 2.441rem;
		--font-size-xxl: 1.953rem;
		--font-size-xl: 1.563rem;
		--font-size-l: 1.25rem;
		--font-size-m: 1rem;
		--font-size-s: 0.8rem;
		--font-size-xs: 0.64rem;
		--font-size-xxs: 0.512rem;

		--color-text: #222222;
		--color-text-inverted: #ffffff;
		--color-bg: #fff;
		--color-accent-1: rgb(249, 57, 13);
		--color-accent-1-20: rgba(249, 57, 13, 0.2);
		--color-accent-2: #f4d184;
		--color-accent-2-20: rgba(242, 207, 132, 0.2);
		--color-link: var(--color-accent-1);

		--border-radius: 1rem;
		accent-color: var(--color-accent-1);
	}

	:global(body) {
		background-color: var(--color-bg);
		color: var(--color-text);
	}

	:global(a) {
		color: var(--color-link);
		font-weight: 500;
	}
</style>
