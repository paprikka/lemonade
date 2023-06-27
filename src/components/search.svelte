<script context="module">
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { debounced } from '../utils/debounced';
	import type { Community } from '@prisma/client';
	import FormItem from './form-item.svelte';
	import settingsIMG from './icon-options.svg';
	let searchSettings = {
		query: ''
	};

	const dispatch = createEventDispatcher();

	const search = (query: string) => {
		dispatch('status', 'active');
		const params = new URLSearchParams();
		params.append('query', query);

		fetch('/api/search?' + params.toString())
			.then((res) => res.json() as Promise<{ communities: Community[] }>)
			.then((res) => {
				dispatch('results', res.communities);
			})
			.catch(() => {
				dispatch('status', 'error');
			})
			.finally(() => {
				dispatch('status', 'done');
			});
	};

	const handleSearchInput = debounced((e: Event) => {
		searchSettings.query = (e.target as HTMLInputElement).value;
		if (!searchSettings.query) {
			dispatch('status', 'empty');
			dispatch('results', []);
			return;
		}

		search(searchSettings.query);
	}, 300);
</script>

<form>
	<div class="input-wrapper">
		<input
			type="search"
			name="query"
			placeholder="e.g. Handsome priests"
			value={searchSettings.query}
			on:input={handleSearchInput}
		/>
		<button class="show-settings" style:--bg={`url(${settingsIMG})`} />
	</div>

	<div class="settings" hidden>
		<FormItem label="Include NSFW">
			<input type="checkbox" name="nsfw" checked={false} />
		</FormItem>
	</div>
</form>

<style>
	form {
		width: 100%;
		display: flex;
		justify-content: stretch;
		flex-direction: column;
		gap: 1rem;
	}

	.settings {
		background-color: white;
		padding: 1rem;
		font-size: var(--font-size-xs);
		border-radius: 0.5rem;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		border: 0.1rem solid var(--color-text);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.input-wrapper:focus-within {
		box-shadow: 0 0 0 0.2rem var(--color-text);
	}

	input[type='search'] {
		flex: 1;
		display: block;
		background: none transparent;
		border: none;
		border-radius: 0.5rem;
		font-size: var(--font-size-m);
		line-height: 3;
		padding: 0 1rem;
		margin: 0;
	}

	.show-settings {
		position: relative;
		border: none;
		width: 3rem;
		height: 3rem;
		background: var(--bg) transparent;
		background-size: 1.5rem;
		background-position: center;
		background-repeat: no-repeat;

		opacity: 0.7;
		cursor: pointer;
		transition: 0.2s opacity;
	}

	@media (hover: hover) {
		.show-settings:hover {
			opacity: 1;
		}
	}

	.show-settings:active {
		opacity: 1;
	}

	.show-settings::after {
		content: '';
		position: absolute;
		width: 0.2rem;
		height: 2rem;
		border-radius: 100rem;
		background-color: rgba(0, 0, 0, 0.1);
		left: -0.2rem;
		top: 0.5rem;
	}

	form input[type='search']:focus-visible {
		outline: none;
	}

	form input[type='search']::placeholder {
		mix-blend-mode: multiply;
		opacity: 0.5;
	}
</style>
