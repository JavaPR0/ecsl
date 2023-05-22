<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="flex min-h-full">
	<div
		class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img
					class="h-10 w-auto"
					src="https://th.bing.com/th/id/R.0113072a65bfc57d81ff01cc4be0c49f?rik=235B%2fzDtKVgJ4A&pid=ImgRaw&r=0"
					alt="Your Company"
				/>
				<h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
					Log in to your account
				</h2>
			</div>

			<div class="mt-10">
				<div>
					<Auth
						supabaseClient={data.supabase}
						view="magic_link"
						redirectTo={`${data.url}/logging-in?redirect=/`}
						showLinks={false}
						appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://th.bing.com/th/id/OIP.UDPkHUE8kPSCnbqXME75mgHaKe?pid=ImgDet&rs=1"
			alt="ecsl"
		/>
	</div>
</div>
