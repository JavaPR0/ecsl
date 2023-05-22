<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;

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

	$: if (url) downloadImage(url);
</script>

<img src={avatarUrl} alt="" class="h-8 w-8 rounded-full bg-gray-800" />
