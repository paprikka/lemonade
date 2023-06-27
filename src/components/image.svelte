<script lang="ts">
	export let src: string;
	export let alt: string;

	let status: 'loading' | 'loaded' | 'error' = 'loading';
</script>

{#if status !== 'error'}
	<img
		{src}
		{alt}
		on:load={() => (status = 'loaded')}
		on:error={() => (status = 'error')}
		class:is-loading={status === 'loading'}
		class={$$props.class}
		loading="lazy"
	/>
{/if}

<style>
	img {
		transition: opacity 0.4s ease-out;
	}
	.is-loading {
		opacity: 0;
	}
</style>
