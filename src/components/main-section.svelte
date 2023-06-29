<script lang="ts">
	export let title: string;
</script>

<section>
	<h2>{title}</h2>
	<slot />
</section>

<style>
	section {
		margin-block: 1rem;
	}

	h2 {
		font-size: var(--font-size-l);
		margin-block: 1rem;
	}

	section:not(:first-of-type) {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	section:first-of-type {
		margin-block-start: 0;
	}
	section:first-of-type h2 {
		margin-block-start: 0;
	}
</style>
