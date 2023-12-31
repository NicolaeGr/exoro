<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const logout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
	};
</script>

<header class="flex w-screen justify-between overflow-x-clip bg-slate-400">
	<p>Successfully logged in! Welcome back, {data.user.firstName}!</p>

	<button on:click={logout}>Log Out</button>
</header>
<slot />
