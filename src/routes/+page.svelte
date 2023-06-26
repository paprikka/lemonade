<script>
	import CommunitySearchItem from '../components/community-search-item.svelte';

	export let form;
	export let data;
</script>

<div class="page-container">
	<header>
		<form action="?/search" method="post">
			<input
				type="search"
				name="query"
				placeholder="e.g. Handsome priests or #dogs"
				value={form?.query ?? ''}
			/>
		</form>
	</header>
	<main>
		{JSON.stringify(data.topCommunities.map((c) => c.name))}
		{#if form?.communities?.length}
			<ul class="search-results">
				{#each form.communities as community}
					<li><CommunitySearchItem {community} /></li>
				{/each}
			</ul>
		{:else}
			<p>Search for a community</p>
		{/if}
	</main>
	<footer>footer</footer>
</div>

<style>
	.page-container {
		max-width: 50rem;
		margin: 0 auto;

		--padding: 1rem;
	}

	header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		padding: var(--padding);
		z-index: 1;
	}

	header form {
		width: 100%;
		display: flex;
		justify-content: stretch;
		background-color: #fff;
	}

	main {
		padding: var(--padding);
	}

	footer {
		padding: var(--padding);
	}

	form input[type='search'] {
		flex: 1;
		display: block;
		background-color: var(--color-accent-1);
		border: none;
		border-radius: 0.5rem;
		font-size: var(--font-size-m);
		line-height: 3;
		padding: 0 1rem;
	}

	form input[type='search']:focus {
		outline: 0.1rem solid var(--color-text);
	}

	form input[type='search']::placeholder {
		mix-blend-mode: multiply;
		opacity: 0.5;
	}

	.search-results {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		width: 100%;
		overflow: hidden;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.search-results > li {
		margin: 0;
	}
</style>
