<script lang="ts">
	import SocialMeta from '../components/social-meta.svelte';
</script>

<slot />
<svelte:head>
	<script
		async
		defer
		data-website-id="f45c804c-4d21-4f3c-bf66-040f234be3cd"
		data-domains="lemmy.sonnet.io,lemonade.sonnet.io"
		src="https://sonnet-events.vercel.app/umami.js"
	></script>

	<SocialMeta
		title="Lemonade"
		url="https://lemonade.sonnet.io/"
		socialImage={{
			absoluteUrl: 'https://lemonade.sonnet.io/social.png',
			height: 506,
			width: 1012
		}}
		description="Browse and discover Lemmy communities the fruity way."
		siteConfig={{
			name: 'Lemonade',
			twitterCreator: '@rafalpast',
			twitterSite: '@rafalpast'
		}}
	/>
</svelte:head>

<style>
	:global(:root) {
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
		--color-bg: #ffffff;
		--color-accent-1: rgb(249, 57, 13);
		--color-accent-1-20: rgba(249, 57, 13, 0.2);
		--color-accent-2: #f4d184;
		--color-accent-2-20: rgba(242, 207, 132, 0.2);
		--color-accent-2-40: rgba(242, 207, 132, 0.4);
		--color-link: var(--color-accent-1);

		--border-radius: 1rem;

		--dialog-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.05), 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1),
			0 0.1rem 0.1rem rgba(0, 0, 0, 0.07);
	}

	:global(::selection) {
		background-color: var(--color-accent-2-40);
	}

	:global(::backdrop) {
		/* ! backdrop can't use CSS vars *
		/* https://stackoverflow.com/questions/58818299/css-variables-not-working-in-dialogbackdrop/ */
		background-color: rgba(242, 207, 132, 0.2);
	}

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
