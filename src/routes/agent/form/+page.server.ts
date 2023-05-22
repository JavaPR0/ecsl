import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const districtId = formData.get('district-id') as string;
		const totalVotes = formData.get('total-votes') as string;
		const politicalPartyId = formData.get('political-party-id') as string;

		const session = await getSession();

		const { error } = await supabase.from('results').insert({
			agent_id: session?.user.id,
			district_id: districtId,
			total_votes: totalVotes,
			political_party_id: politicalPartyId
		});

		if (error) {
			return fail(500);
		}

		throw redirect(302, '/agent/dashboard');
	}
} satisfies Actions;
