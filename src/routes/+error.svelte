<script lang="ts">
	import imgMelon from './404.webp';
</script>

<div class="container">
	<h1>:(</h1>
	<img src={imgMelon} alt="404 (a melon)" />
</div>

<style>
	.container {
		height: 100vh;
		width: 100vw;
		display: grid;

		place-content: center;
		place-items: center;
	}
	img {
		max-width: 10rem;
	}
</style>
