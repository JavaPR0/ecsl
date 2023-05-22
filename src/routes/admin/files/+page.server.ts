import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const { data: bucketList } = await supabase.storage.from('avatars').list();

	return { bucketList };
}) satisfies PageServerLoad;
