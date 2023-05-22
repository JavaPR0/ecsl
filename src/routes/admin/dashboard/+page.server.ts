import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const [results, districts, politicalParties] = await Promise.all([
		supabase.from('results').select(`*, profiles(full_name), political_parties(*), districts(*)`),
		supabase.from('districts').select(`*`),
		supabase.from('political_parties').select(`*`)
	]);

	const stats = {
		resultsCounted: results.data?.length,
		totalVotes: results.data?.reduce((prev, curr) => prev + curr.total_votes, 0),
		totalDistricts: districts.data?.length,
		totalPoliticalParties: politicalParties.data?.length
	};
console.log('results',results);
	return {
		session,
		results: results.data,
		stats,
		chartData: {
			labels: politicalParties.data?.map((p) => p.party_name),
			datasets: districts.data?.map((d, i) => {
				return {
					label: d.district_name,
					data: politicalParties.data?.map((party) => {
						const partyResults = results.data
							?.filter((result) => result.district_id === d.id)
							.filter((result) => result.political_party_id === party.id)
							.reduce((prev, curr) => prev + curr.total_votes, 0);

						return partyResults;
					}),
					backgroundColor: randomColor()
				};
			})
		}
	};
}) satisfies PageServerLoad;

const randomColor = () => {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	return `rgb(${r}, ${g}, ${b})`;
};
