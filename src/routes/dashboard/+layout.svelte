<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import SideBar from '$components/nav/SideBar.svelte';
	import { onMount } from 'svelte';
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

	let isSidebarOpen: boolean = false;

	onMount(() => {
		if (window.innerWidth > 1024) {
			isSidebarOpen = true;
			console.log(window.innerWidth);
		}
	});
</script>

<div class="flex h-screen w-screen overflow-hidden">
	<SideBar bind:isSidebarOpen />
	<div class="relative min-w-[calc(100dvw-50px)] sm:w-full sm:min-w-[unset]">
		<header class="w-full bg-blue-100">
			<span>
				Welcome back, {data.user.firstName}!
			</span>
			<br />
			<span>you are now on page {$page.url.pathname.slice(10) || '/'}</span>
		</header>

		<slot />
	</div>
</div>
