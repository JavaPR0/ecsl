<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Avatar from './Avatar.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;

	let profileForm: any;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form
	class="form-widget"
	method="post"
	action="?/update"
	use:enhance={handleSubmit}
	bind:this={profileForm}
>
	<div>
		<div>
			<img
				class="h-32 w-full object-cover lg:h-48"
				src="https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=920&q=80"
				alt=""
			/>
		</div>

		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
				<div class="flex">
					<Avatar
						{supabase}
						bind:url={avatarUrl}
						size={10}
						on:upload={() => {
							profileForm.requestSubmit();
						}}
					/>
				</div>
				<div
					class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
				>
					<div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
						<h2
							class="mt-2 text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
						>
							{fullName || 'Anonymous'}
						</h2>
					</div>
				</div>
				<div class="mt-5 flex lg:ml-4 lg:mt-0">
					<span class="sm:ml-3">
						<button
							class="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							type="submit"
							value={loading ? 'Loading...' : 'Update'}
							disabled={loading}
						>
							<svg
								class="-ml-0.5 mr-1.5 h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
									clip-rule="evenodd"
								/>
							</svg>
							Update
						</button>
					</span>
				</div>
			</div>

			<div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
				<h1 class="truncate text-2xl font-bold text-gray-900">{fullName || 'Anonymous'}</h1>
			</div>

			<div class="space-y-12 mt-6">
				<div class="border-b border-white/10 pb-12">
					<h2 class="text-base font-semibold leading-7 text-white">Profile</h2>
					<p class="mt-1 text-sm leading-6 text-gray-400">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-4">
							<label for="username" class="block text-sm font-medium leading-6 text-white"
								>Username</label
							>
							<div class="mt-2">
								<div
									class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
								>
									<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
										>limkokwing.net/</span
									>
									<input
										name="username"
										value={form?.username ?? username}
										type="text"
										id="username"
										autocomplete="username"
										class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="enter username here"
									/>
								</div>
							</div>
						</div>

						<div class="col-span-full">
							<label for="about" class="block text-sm font-medium leading-6 text-white">About</label
							>
							<div class="mt-2">
								<textarea
									id="about"
									name="website"
									rows="3"
									class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={form?.website ?? website}
								/>
							</div>
							<p class="mt-3 text-sm leading-6 text-gray-400">
								Write a few sentences about yourself.
							</p>
						</div>
					</div>
				</div>

				<div class="border-b border-white/10 pb-12">
					<h2 class="text-base font-semibold leading-7 text-white">Personal Information</h2>
					<p class="mt-1 text-sm leading-6 text-gray-400">
						Use a permanent address where you can receive mail.
					</p>

					<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-2">
							<label for="fullName" class="block text-sm font-medium leading-6 text-white"
								>Full name</label
							>
							<div class="mt-2">
								<input
									id="fullName"
									name="fullName"
									type="text"
									value={form?.fullName ?? fullName}
									autocomplete="given-name"
									class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div class="sm:col-span-4">
							<label for="email" class="block text-sm font-medium leading-6 text-white"
								>Email address</label
							>
							<div class="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autocomplete="email"
									class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={session.user.email}
									disabled
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-6">
				<button
					class="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					type="submit"
					value={loading ? 'Loading...' : 'Update'}
					disabled={loading}
				>
					<svg
						class="-ml-0.5 mr-1.5 h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
							clip-rule="evenodd"
						/>
					</svg>
					Update
				</button>
			</div>
		</div>
	</div>
</form>

<!-- <form method="post" action="?/signout" use:enhance={handleSignOut}>
	<div>
		<button
			class="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			disabled={loading}>Sign Out</button
		>
	</div>
</form> -->
