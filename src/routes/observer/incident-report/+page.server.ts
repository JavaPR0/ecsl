import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const districtId = formData.get('district-id') as string;
		const report = formData.get('report') as string;
		const politicalPartyId = formData.get('political-party-id') as string;
		console.log(formData);
		const session = await getSession();

		const { error } = await supabase.from('report').insert({
			agent_id: session?.user.id,
			district_id: districtId,
			report: report,
			political_party_id: politicalPartyId
		});

		if (error) {
			console.log(error);
			return fail(500);
		}

		throw redirect(302, '/observer/dashboard');
	}
} satisfies Actions;
