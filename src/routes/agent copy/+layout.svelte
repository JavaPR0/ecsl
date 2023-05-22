<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import SupabaseImage from '$lib/SupabaseImage.svelte';
	import { page } from '$app/stores';

	export let data;

	$: ({ supabase, session, profile } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div>
	<!-- Static sidebar for desktop -->
	<div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
			<div class="flex h-16 shrink-0 items-center">
				<img
					class="h-8 w-auto"
					src="https://th.bing.com/th/id/R.0113072a65bfc57d81ff01cc4be0c49f?rik=235B%2fzDtKVgJ4A&pid=ImgRaw&r=0"
					alt="Your Company"
				/>
			</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							<li>
								<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
								<a
									href="/agent/dashboard"
									class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                  {$page.url.pathname === '/agent/dashboard'
										? 'bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800'
										: ''}
                  "
								>
									<svg
										class="h-6 w-6 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
										/>
									</svg>
									Dashboard
								</a>
							</li>
							<li>
								<a
									href="/agent/form"
									class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                  {$page.url.pathname === '/agent/form'
										? 'bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800'
										: ''}
                  "
								>
									<svg
										class="h-6 w-6 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
										/>
									</svg>
									District Result
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div class="xl:pl-72">
		<main class="p-12">
			<slot />
		</main>
	</div>
</div>
