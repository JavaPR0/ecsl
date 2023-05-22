<script lang="ts">
	import SupabaseImage from '../SupabaseImage.svelte';

	export let data;

	let { supabase, bucketList } = data;
</script>

<!-- Sticky search header -->
<div
	class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8"
>
	<button type="button" class="-m-2.5 p-2.5 text-white xl:hidden">
		<span class="sr-only">Open sidebar</span>
		<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
		<form class="flex flex-1" action="#" method="GET">
			<label for="search-field" class="sr-only">Search</label>
			<div class="relative w-full">
				<svg
					class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					id="search-field"
					class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
					placeholder="Search..."
					type="search"
					name="search"
				/>
			</div>
		</form>
	</div>
</div>

<div class="border-t border-white/10 pt-11">
	<h2 class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
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
				<th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
				<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Commit</th>
				<th
					scope="col"
					class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Status</th
				>
				<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
					>Duration</th
				>
				<th
					scope="col"
					class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
					>Deployed at</th
				>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/5">
			{#if bucketList}
				{#each bucketList as list}
					<tr>
						<td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
							<div class="flex items-center gap-x-4">
								<SupabaseImage {supabase} url={list.name} />
								<div class="truncate text-sm font-medium leading-6 text-white">
									{list.name}
								</div>
							</div>
						</td>
						<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
							<div class="flex gap-x-3">
								<div class="font-mono text-sm leading-6 text-gray-400">2d89f0c8</div>
								<span
									class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
									>main</span
								>
							</div>
						</td>
						<td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
							<div class="flex items-center justify-end gap-x-2 sm:justify-start">
								<time class="text-gray-400 sm:hidden" datetime="2023-01-23T11:00"
									>45 minutes ago</time
								>
								<div class="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
									<div class="h-1.5 w-1.5 rounded-full bg-current" />
								</div>
								<div class="hidden text-white sm:block">Completed</div>
							</div>
						</td>
						<td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"
							>25s</td
						>
						<td
							class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8"
						>
							<time datetime="2023-01-23T11:00">45 minutes ago</time>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
