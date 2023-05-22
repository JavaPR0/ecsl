<script lang="ts">
	export let data;
</script>

<form class="form-widget" method="post" action="?/create">
	<div class="space-y-10 divide-y divide-gray-900/10">
		<div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
			<div class="px-4 sm:px-0">
				<h2 class="text-base font-semibold leading-7 text-gray-200">District results</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">
					Enter the results for the district you are in charge of.
				</p>
			</div>

			<div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
				<div class="px-4 py-6 sm:p-8">
					<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-3">
							<label for="district" class="block text-sm font-medium leading-6 text-gray-900"
								>District</label
							>
							<div class="mt-2">
								<input
									type="text"
									disabled
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.profile?.districts.district_name}
								/>

								<input
									type="hidden"
									name="district-id"
									id="district-id"
									value={data.profile?.districts.id}
								/>
							</div>
						</div>

						<div class="sm:col-span-4">
							<label for="political-party" class="block text-sm font-medium leading-6 text-gray-900"
								>Political Party</label
							>
							<div class="mt-2">
								<input
									disabled
									type="political-party"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.profile?.political_parties.party_name}
								/>

								<input
									type="hidden"
									id="political-party-id"
									name="political-party-id"
									value={data.profile?.political_parties.id}
								/>
							</div>
						</div>

						<div class="col-span-full">
							<label for="total-votes" class="block text-sm font-medium leading-6 text-gray-900"
								>Total Votes</label
							>
							<div class="mt-2">
								<input
									type="number"
									name="total-votes"
									id="total-votes"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
				>
					<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button
					>
					<button
						type="submit"
						class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Save</button
					>
				</div>
			</div>
		</div>
	</div>
</form>
