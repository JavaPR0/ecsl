<script lang="ts">
	export let data;
</script>

<div class="">
	<h2 class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest results</h2>
	<table class="mt-6 w-full whitespace-nowrap text-left">
		<colgroup>
			<col class="w-full sm:w-4/12" />
			<col class="lg:w-1/12" />
			<col class="lg:w-1/12" />
		</colgroup>
		<thead class="border-b border-white/10 text-sm leading-6 text-white">
			<tr>
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
				<tr>
					<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
						<div class="flex gap-x-3">
							<div class="font-mono text-sm leading-6 text-gray-400">
								{result.districts.district_name}
							</div>
							<span
								class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
								>main</span
							>
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
