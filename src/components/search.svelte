<script context="module">
</script>

<script lang="ts">
	import type { Community } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { debounced } from '../utils/debounced';
	import settingsIMG from './icon-options.svg';
	import SearchSettingsPopup, { type SearchSettings } from './search-settings-popup.svelte';
	import { writable } from 'svelte/store';

	const searchSettings = writable<SearchSettings>({
		query: '',
		nsfw: false,
		skipEmpty: true,
		sortBy: 'subscribers'
	});

	const dispatch = createEventDispatcher();

	const search = (settings: SearchSettings) => {
		dispatch('status', 'active');
		const params = new URLSearchParams();
		params.append('query', settings.query);
		params.append('nsfw', settings.nsfw.toString());
		params.append('skipEmpty', settings.skipEmpty.toString());
		params.append('sortBy', settings.sortBy);

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
		$searchSettings.query = (e.target as HTMLInputElement).value;
	}, 300);

	let isSettingsOpen = false;
	let isInputFocused = false;

	searchSettings.subscribe((settings) => {
		if (!settings.query) {
			dispatch('status', 'empty');
			dispatch('results', []);
			return;
		}

		search(settings);
	});

	let inputElement: HTMLInputElement;
	// $: {
	// 	if (isInputFocused) {
	// 		const scrollY = inputElement.getBoundingClientRect().top - 20;
	// 		window.scrollTo({ top: scrollY, behavior: 'smooth' });
	// 	}
	// }
</script>

<form class={$$props.class}>
	<div class="input-wrapper" class:is-focused={isInputFocused}>
		<input
			bind:this={inputElement}
			type="search"
			name="query"
			autocomplete="off"
			placeholder="e.g. 'baking' or 'hot priests'"
			value={$searchSettings.query}
			on:input={handleSearchInput}
			on:focus={() => (isInputFocused = true)}
			on:blur={() => (isInputFocused = false)}
		/>
		<button
			class="show-settings"
			style:--bg={`url(${settingsIMG})`}
			class:is-active={isSettingsOpen}
			on:click={() => (isSettingsOpen = !isSettingsOpen)}
		/>
	</div>
	<SearchSettingsPopup bind:value={$searchSettings} bind:isOpen={isSettingsOpen} />
</form>

<style>
	form {
		width: 100%;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 1rem;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		border: 0.1rem solid var(--color-text);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.input-wrapper.is-focused {
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
		margin: 0.25rem;
		border: none;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--bg) transparent;
		background-size: 1.5rem;
		background-position: center;
		background-repeat: no-repeat;

		opacity: 0.7;
		cursor: pointer;
		transition: 0.2s opacity;
		border-radius: 0.3rem;
	}

	.show-settings.is-active {
		background-color: var(--color-accent-2);
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
		left: -0.45rem;
		top: 0.25rem;
	}

	form input[type='search']:focus-visible {
		outline: none;
	}

	form input[type='search']::placeholder {
		mix-blend-mode: multiply;
		opacity: 0.5;
	}
</style>
