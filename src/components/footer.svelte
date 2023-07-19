<footer>
	<p><a href="/about">about</a></p>
	<p>
		Made by 🐐 and <a href="https://sonnet.io" target="_blank">Rafal Pastuszak</a>, data from
		<a href="https://browse.feddit.de" target="_blank">feddit</a>.
	</p>
</footer>

<style>
	footer {
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
		font-size: var(--font-size-xs);
		border-top: 0.1rem solid var(--color-text);
		margin-inline: 0rem;
		margin-block-start: 2rem;
		position: sticky;
		bottom: 0;
		background-color: var(--color-bg);
	}

	@media (min-width: 440px) {
		footer {
			margin: 2rem auto 0;
			max-width: 40rem;
		}
	}

	p {
		margin: 0;
	}
</style>
