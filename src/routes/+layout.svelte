<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		font-size: clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.6944)), 1.5rem);
		font-family: Avenir Next, Avenir, Helvetica, sans-serif;
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
		--color-bg: #fffbdd;
		--color-accent-1: #e5d876;
		--color-accent-1-20: #e5d87636;
		--color-accent-2: #ffa580;
		--color-link: var(--color-accent-2);

		--border-radius: 1rem;
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
