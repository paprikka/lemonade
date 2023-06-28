<script lang="ts">
	export let active = true;
</script>

<div class="container" class:is-active={active}>
	<article>
		<div class="thumbnail" />
		<div class="meta">
			<div class="placeholder-text name" style:--chars={4} />
			<div class="title">
				<span class="placeholder-text" style:--chars={6} />
				<span class="placeholder-text" style:--chars={4} />
			</div>

			<ul class="stats">
				<li class="placeholder-text" style:--chars={5} />
				<li class="placeholder-text" style:--chars={10} />
				<!-- <li class="placeholder-text" style:--chars={5} /> -->
			</ul>
		</div>
	</article>
</div>

<style>
	.placeholder-text {
		height: 1em;
		width: calc(1em * var(--chars));
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 0.25rem;
		display: inline-block;
	}

	span.placeholder-text {
		display: inline-block;
	}

	.container {
		border: none;
		appearance: none;
		background: none;
		text-align: start;
		padding: 0;
	}

	.container.is-active {
		animation: pulsate 0.5s infinite linear alternate;
	}

	@keyframes pulsate {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}

	.container article {
		padding: 0.5rem;
		border-radius: var(--border-radius);
		display: flex;
		cursor: pointer;
	}

	.thumbnail {
		width: 5rem;
		height: 5rem;
		margin-right: 1rem;
		overflow: hidden;
		border-radius: calc(var(--border-radius) * 0.8);
		flex-shrink: 0;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.name {
		margin: 0;
		font-size: var(--font-size-xxs);
		font-weight: normal;
		opacity: 0.5;
	}
	.title {
		margin: 0;
		font-size: var(--font-size-s);
		font-weight: 500;
	}

	.stats {
		display: block;
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: var(--font-size-xs);
		opacity: 0.8;
	}
</style>
