<script lang="ts">
	import CommunitySearchItemPlaceholder from './community-search-item-placeholder.svelte';

	export let count = 6;
</script>

{#each Array(count) as _}
	<CommunitySearchItemPlaceholder />
{/each}
