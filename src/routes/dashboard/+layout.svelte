<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import SideBar from '$components/nav/SideBar.svelte';
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

	let isSidebarOpen = true;
</script>

<div class="flex h-screen w-screen overflow-clip">
	<SideBar bind:isSidebarOpen />
	<div class=" w-full bg-green-100">
		<header class="w-full bg-blue-100">Welcome back, {data.user.firstName}!</header>

		<slot />
	</div>
</div>
