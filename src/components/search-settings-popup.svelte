<script context="module" lang="ts">
	export type SearchSettings = {
		query: string;
		nsfw: boolean;
		skipEmpty: boolean;
		sortBy: 'activity' | 'subscribers' | 'posts' | 'comments';
	};
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import FormItem from './form-item.svelte';
	export let isOpen = false;
	export let value: SearchSettings;
</script>

{#if isOpen}
	<div class="settings" in:fade={{ duration: 300 }}>
		<FormItem>
			<select bind:value={value.sortBy}>
				<option value="activity">Activity</option>
				<option value="subscribers"># of subscribers</option>
				<option value="posts"># of posts</option>
				<option value="comments"># of comments</option>
			</select>
		</FormItem>
		<FormItem label="Include NSFW">
			<input type="checkbox" name="nsfw" bind:checked={value.nsfw} />
		</FormItem>
		<FormItem
			label="Skip empty communities"
			secondaryLabel="Skip communities with no users or recent activity"
		>
			<input type="checkbox" name="nsfw" bind:checked={value.skipEmpty} />
		</FormItem>
	</div>
{/if}

<style>
	.settings {
		background-color: var(--color-accent-2-20);
		padding: 1rem;
		font-size: var(--font-size-xs);
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, auto);
		gap: 1rem;
	}

	@media (min-width: 440px) {
		.settings {
			grid-template-columns: auto auto auto;
			grid-template-rows: auto;
		}
	}
</style>
