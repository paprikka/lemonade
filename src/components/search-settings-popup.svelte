<script context="module" lang="ts">
	export type SearchSettings = {
		query: string;
		nsfw: boolean;
		skipEmpty: boolean;
		sortBy: 'activity' | 'subscribers' | 'posts' | 'comments';
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Dialog from './dialog.svelte';
	import FormItem from './form-item.svelte';
	import IconButton from './icon-button.svelte';
	import backIcon from './icon-back.svg';

	export let isOpen = false;
	export let value: SearchSettings;

	let dialogElement: HTMLDialogElement;

	$: {
		if (dialogElement) {
			dialogElement.addEventListener('close', () => {});
		}
	}

	$: isOpen ? dialogElement?.showModal() : dialogElement?.close();
</script>

<Dialog bind:isOpen>
	<div class="content">
		<div class="settings" transition:fade={{ duration: 300, delay: 100 }}>
			<FormItem block label="Sort by">
				<select bind:value={value.sortBy}>
					<option value="activity">Activity</option>
					<option value="subscribers"># of subscribers</option>
					<option value="posts"># of posts</option>
					<option value="comments"># of comments</option>
				</select>
			</FormItem>
			<FormItem label="Include NSFW">
				<input type="checkbox" bind:checked={value.nsfw} />
			</FormItem>
			<FormItem
				label="Skip empty communities"
				secondaryLabel="Skip communities with no users or recent activity"
			>
				<input type="checkbox" bind:checked={value.skipEmpty} />
			</FormItem>
		</div>
		<IconButton
			variant="filled"
			icon={backIcon}
			label="Go back"
			size="l"
			on:click={() => (isOpen = false)}
		/>
	</div>
</Dialog>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;
		gap: 1rem;
	}

	.settings {
		background-color: var(--color-bg);
		padding: 1rem;
		font-size: var(--font-size-xs);
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, auto);
		gap: 1rem;
		box-shadow: var(--dialog-shadow);
	}

	/* @media (min-width: 440px) {
		.settings {
			grid-template-columns: auto auto auto;
			grid-template-rows: auto;
		}
	} */
</style>
