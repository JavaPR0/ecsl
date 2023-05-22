<script lang="ts">
	export let data;
</script>

<form class="form-widget" method="post" action="?/create">
	<div class="space-y-10 divide-y divide-gray-900/10">
		<div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
			<div class="px-4 sm:px-0">
				<h2 class="text-base font-semibold leading-7 text-gray-200">Users</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">Create a new agent or observer</p>
			</div>

			<div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
				<div class="px-4 py-6 sm:p-8">
					<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-3">
							<label for="full-name" class="block text-sm font-medium leading-6 text-gray-900"
								>Full Name</label
							>
							<div class="mt-2">
								<input
									type="text"
									name="full-name"
									id="full-name"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div class="sm:col-span-3">
							<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
								>Email</label
							>
							<div class="mt-2">
								<input
									type="email"
									name="email"
									id="email"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div class="sm:col-span-6">
							<label for="role" class="block text-sm font-medium leading-6 text-gray-900"
								>User Role </label
							>
							<div class="mt-2">
								<select
									id="role"
									name="role"
									class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option value="admin">admin</option>
									<option value="observer">observer</option>
									<option value="agent">agent</option>
								</select>
							</div>
						</div>







						<div class="sm:col-span-6">
							<label for="political-party" class="block text-sm font-medium leading-6 text-gray-900"
								>Political Party</label
							>
							<div class="mt-2">
								<select
									id="political-party"
									name="political-party"
									class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									{#each data.politicalParties as party}
										<!-- content here -->
										<option value={party.id}>{party.party_name}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="sm:col-span-6">
							<label for="district" class="block text-sm font-medium leading-6 text-gray-900"
								>District</label
							>
							<div class="mt-2">
								<select
									id="district"
									name="district"
									class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									{#each data.districts as district}
										<!-- content here -->
										<option value={district.id}>{district.district_name}</option>
									{/each}
								</select>
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
