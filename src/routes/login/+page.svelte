<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>
		Successfully logged in! Welcome back,
		{JSON.stringify(data.user)}
	</p>
{/if}

<div class="container relative mx-auto grid h-screen w-[90%] max-w-xl items-center">
	<form method="POST" action="?/login" class=" mb-16 flex flex-col">
		<h1 class="text-4xl">Welcome Back</h1>

		<label for="email" class="mb-2 mt-8">Email</label>
		{#if form?.mail_missing}<p class="text-sm text-red-600">The email field is required</p>{/if}
		{#if form?.incorrect}<p class="text-sm text-red-600">Wrong email or password</p>{/if}
		<input
			type="text"
			name="email"
			id="email"
			placeholder="example@mail.com"
			value={form?.email ?? ''}
			class="rounded-md border-2 border-gray-200 p-2 outline-none focus:border-blue-500"
		/>

		<label for="password" class="mb-2 mt-6">Password</label>
		{#if form?.password_missing}<p class="text-sm text-red-600">
				The password field is required
			</p>{/if}
		<input
			type="password"
			name="password"
			id="password"
			placeholder="password"
			class="rounded-md border-2 border-gray-200 p-2 outline-none focus:border-blue-500"
		/>

		<div class="mt-4 flex justify-between">
			<a
				href="/"
				class="rounded-md bg-gray-200 px-3 py-2 transition hover:bg-gray-400 hover:text-white"
			>
				Back Home
			</a>
			<button type="submit" class="rounded-md bg-blue-500 px-3 py-2 transition hover:bg-blue-400"
				>Log In</button
			>
		</div>
	</form>
</div>
