import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const [{ data: districts }, { data: politicalParties }] = await Promise.all([
		supabase.from('districts').select(`*`),
		supabase.from('political_parties').select(`*`)
	]);

	return { session, districts, politicalParties };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();

		const districtId = formData.get('district') as string;
		const fullName = formData.get('full-name') as string;
		const politicalPartyId = formData.get('political-party') as string;
		const email = formData.get('email') as string;
		const role = formData.get('role') as string;

		const { data, error } = await supabase.auth.admin.createUser({
			email,
			password: '123456',
			user_metadata: {
				district_id: districtId,
				full_name: fullName,
				political_party_id: politicalPartyId,
				user_role: role ?? 'agent'
			}
		});

		if (error) {
			return fail(500);
		}

		throw redirect(302, '/admin/users');
	}
} satisfies Actions;
