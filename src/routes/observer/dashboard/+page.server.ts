import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: results } = await supabase
		.from('report')
		.select(`*, profiles(full_name), political_parties(*), districts(*))`)
		.eq('agent_id', session.user.id);
console.log(results);
	return { session, results };
}) satisfies PageServerLoad;
