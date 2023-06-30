<script>
	import Footer from '../../components/footer.svelte';
</script>

<article>
	<header>
		<h1>About</h1>
		<a href="/">back</a>
	</header>

	<h2>What is Lemonade?</h2>
	<p>Lemonade is a stupid simple Lemmy community browser.</p>

	<h2><em>Why</em> is Lemonade?</h2>
	<p>
		People are moving away from sites like Reddit to more open, friendlier online communities (<a
			href="https://join-lemmy.org/"
			target="_blank">lemmy</a
		>, <a href="https://kbin.pub/" target="_blank">kbin</a>).
	</p>

	<p>
		These tools are easy to use, but finding the right community can be a bit of a pain if you're
		just getting started with federated social media. I wanted to make this easier especially to the
		less techie users who might find the proces daunting.
	</p>

	<p>
		Lemonade uses the list of communities provided by <a
			href="https://browse.feddit.de/"
			target="_blank">Feddit</a
		>, polled daily, and organises it by the number of users and recent activity.
	</p>

	<h2>Why just Lemmy? Can I see the results from other platforms here?</h2>
	<p>
		Not yet, but people are <a href="https://fedidb.org" target="_blank">working on it</a>! At the
		moment getting this data for all communities is a bit fiddly. Follow me on
		<a href="https://mastodon.cloud/@raf" target="_blank">mastodon</a>
		or reach out via <a href="https://sonnet.io">my site</a> to get updates on this.
	</p>

	<h2>I have an idea how to make this site better!</h2>
	<p>
		Brilliant, then you probably want to <a href="mailto:hello@sonnet.io">click this</a>!
	</p>

	<a href="/">back</a>
</article>

<div class="footer-wrapper">
	<Footer />
</div>

<style>
	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	article {
		max-width: 40rem;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		margin-block-start: 0;
		font-size: var(--font-size-hero);
	}

	h2 {
		font-size: var(--font-size-xl);
		line-height: 2rem;
	}
	p {
		font-size: var(--font-size-m);
	}

	.footer-wrapper {
		max-width: 40rem;
		margin: 0 auto;
	}

	a[href='/'] {
		position: relative;
		padding-inline-start: 1em;
	}
	a[href='/']::before {
		content: '←';
		position: absolute;
		left: 0;
	}
</style>
