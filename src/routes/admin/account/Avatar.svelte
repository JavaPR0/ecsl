<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			url = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(url, file);

			if (error) {
				throw error;
			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	<label class="block" for="single">
		{#if avatarUrl}
			<img
				src={avatarUrl}
				alt={avatarUrl ? 'Avatar' : 'No image'}
				class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
			/>
		{:else}
			<img
				class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
				src="https://th.bing.com/th/id/R.c9041f3f144a80786ab805a59db61c89?rik=MtC%2b%2fRF3LOb6vA&pid=ImgRaw&r=0"
				alt=""
			/>
		{/if}
	</label>
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
