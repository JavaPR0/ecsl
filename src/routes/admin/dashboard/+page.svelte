<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
	export let data;
</script>

<!-- Stats -->
<div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
	<div class="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
		<p class="text-sm font-medium leading-6 text-gray-400">Total number of votes</p>
		<p class="mt-2 flex items-baseline gap-x-2">
			<span class="text-4xl font-semibold tracking-tight text-white"
				>{data.stats.totalVotes.toLocaleString('en')}</span
			>
		</p>
	</div>
	<div class="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
		<p class="text-sm font-medium leading-6 text-gray-400">Number of results counted</p>
		<p class="mt-2 flex items-baseline gap-x-2">
			<span class="text-4xl font-semibold tracking-tight text-white"
				>{data.stats.resultsCounted}</span
			>
		</p>
	</div>
	<div class="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 lg:border-l">
		<p class="text-sm font-medium leading-6 text-gray-400">Number of districts</p>
		<p class="mt-2 flex items-baseline gap-x-2">
			<span class="text-4xl font-semibold tracking-tight text-white"
				>{data.stats.totalDistricts}</span
			>
		</p>
	</div>
	<div class="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
		<p class="text-sm font-medium leading-6 text-gray-400">Number of political parties</p>
		<p class="mt-2 flex items-baseline gap-x-2">
			<span class="text-4xl font-semibold tracking-tight text-white"
				>{data.stats.totalPoliticalParties}</span
			>
		</p>
	</div>
</div>

<!-- Charts -->

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<Bar
		data={data.chartData}
		options={{
			plugins: {},
			responsive: true,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			}
		}}
	/>
</div>

<!-- Activity list -->

<div class="border-t border-white/10 pt-11">
	<h2 class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest results</h2>
	<table class="mt-6 w-full whitespace-nowrap text-left">
		<colgroup>
			<col class="w-full sm:w-4/12" />
			<col class="lg:w-4/12" />
			<col class="lg:w-2/12" />
			<col class="lg:w-1/12" />
			<col class="lg:w-1/12" />
		</colgroup>
		<thead class="border-b border-white/10 text-sm leading-6 text-white">
			<tr>
				<th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Agent</th>
				<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">District</th>
				<th
					scope="col"
					class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Party</th
				>
				<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
					>Total Votes</th
				>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/5">
			{#each data?.results as result}
				<!-- content here -->
				<tr>
					<td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
						<div class="flex items-center gap-x-4">
							<div class="truncate text-sm font-medium leading-6 text-white">
								{result.profiles.full_name}
							</div>
						</div>
					</td>
					<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
						<div class="flex gap-x-3">
							<div class="font-mono text-sm leading-6 text-gray-400">
								{result.districts.district_name}
							</div>
						</div>
					</td>
					<td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
						<div class="flex items-center justify-end gap-x-2 sm:justify-start">
							<time class="text-gray-400 sm:hidden" datetime="2023-01-23T11:00">45 minutes ago</time
							>
							<div
								style="--bg-color: #{result.political_parties.party_colour}"
								class="flex-none rounded-full p-1 text-green-400 party-color"
							>
								<div class="party-color h-1.5 w-1.5 rounded-full bg-current" />
							</div>
							<div class="hidden text-white sm:block">{result.political_parties.party_name}</div>
						</div>
					</td>
					<td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
						{result.total_votes}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.party-color {
		background-color: var(--bg-color);
	}
</style>
