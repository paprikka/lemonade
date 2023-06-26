<script lang="ts">
	export let data;
</script>

<div class="container">
	<header>
		<div class="icon">
			{#if data.community?.icon}
				<img src={data.community?.icon} alt={data.community?.name} loading="lazy" />
			{/if}
		</div>
		<h1>{data.community?.title}</h1>
		<h2>{data.community?.name}</h2>
	</header>
	<article />
</div>

{data.community}
