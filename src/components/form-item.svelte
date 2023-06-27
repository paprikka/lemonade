<script lang="ts">
	export let label: string;
</script>

<label>
	<slot />
	<span>{label}</span>
</label>

<style>
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	@media (hover: hover) {
		label:hover {
			text-decoration: underline;
		}
	}
</style>
