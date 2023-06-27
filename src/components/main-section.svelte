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
		border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
	}
</style>
