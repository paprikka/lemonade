<script lang="ts">
	import headerIMG from '../routes/header-bg.webp';

	export let headerElement: HTMLElement;
	export let hideLogo = false;
</script>

<header bind:this={headerElement}>
	<div class="img-wrapper" style:display={hideLogo ? 'none' : ''}>
		<img alt="Lemmy" src={headerIMG} />
		<h1>Lemonade</h1>
		<h2>The <span class="fruity">fruitiest</span> way to browse Lemmy communities</h2>
	</div>
	<slot />
</header>

<style>
	header {
		position: relative;
		padding: 0 0 1rem;
		margin-block-end: 1rem;
		z-index: 1;

		background-color: var(--color-bg);
		display: flex;
		flex-direction: column;
	}

	header::after {
		content: '';
		height: 2rem;
		position: absolute;
		bottom: -2rem;
		left: 0;
		right: 0;
		background-image: linear-gradient(var(--color-bg), transparent);
		pointer-events: none;
	}

	.img-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
		max-width: 20rem;
	}

	.img-wrapper h1 {
		margin: 0;
		font-size: var(--font-size-hero);
		line-height: 1;
	}

	.fruity {
		background: linear-gradient(
			to right,
			#000 0%,
			#000 20%,
			yellow,
			lime,
			orange,
			tomato,
			yellow,
			orange,
			#000 80%,
			#000 100%
		);

		background-size: 600%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;

		animation: fruity-enter 3s ease-in-out both;
	}

	@keyframes fruity-enter {
		from {
			background-position: 0;
		}
		to {
			background-position: 100%;
		}
	}

	.img-wrapper h2 {
		margin: 0;
		line-height: 1;
		font-size: var(--font-size-s);
		font-weight: normal;
	}

	.img-wrapper > img {
		max-width: 10rem;
		align-self: center;
		height: auto;
		margin: 2rem 0 -2rem;
		aspect-ratio: 700/606;
	}

	header :global(.search) {
		position: sticky;
		top: 1rem;
	}
</style>
