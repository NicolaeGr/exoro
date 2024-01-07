<script lang="ts">
	import { onMount } from 'svelte';

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { twMerge } from 'tailwind-merge';
	import { HomeIcon, CompassIcon, SettingsIcon, LogOutIcon } from 'svelte-feather-icons';

	export let isSidebarOpen = true;

	type Link = {
		name: string;
		path?: string;
		action?: () => void | Promise<void>;
		icon: any;
	};

	const links: Link[] = [
		{
			name: 'Home',
			path: '/dashboard',
			icon: HomeIcon
		},
		{
			name: 'Templates',
			path: '/dashboard/templates',
			icon: CompassIcon
		},
		{
			name: 'Settings',
			path: '/dashboard/settings',
			icon: SettingsIcon
		},
		{
			name: 'Logout',
			action: async () => {
				const response = await fetch('/api/logout', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				});
				invalidateAll();
			},
			icon: LogOutIcon
		}
	];

	let activeLink: Link | null = null;

	onMount(() => {
		links.forEach((link) => {
			if (link.path === $page.url.pathname) {
				activeLink = link;
			}
		});
	});

	const handleLinkClick = (link: any) => {
		if (link.path) {
			goto(link.path);
		} else {
			link.action();
		}

		activeLink = link;
	};

	$: assideStyle = twMerge(
		'flex  min-w-[40px] flex-col justify-between transition-all',
		isSidebarOpen ? 'w-[280px]' : 'p-2 w-[50px]',
		isSidebarOpen ? 'p-4 pb-2' : 'p-1'
	);
</script>

<aside class={assideStyle}>
	<div>
		<button type="button" on:click={() => (isSidebarOpen = !isSidebarOpen)}>E</button>
	</div>
	<nav class="flex flex-col gap-1">
		{#each links as link}
			<button
				class="flex w-full items-center space-x-2 rounded p-1 hover:bg-gray-100"
				class:bg-blue-200={activeLink === link}
				class:hover:bg-blue-300={activeLink === link}
				on:click={() => handleLinkClick(link)}
				type="button"
			>
				<span class="flex h-8 w-8 items-center justify-center">
					<svelte:component this={link.icon} size="1.2x" />
				</span>
				{#if isSidebarOpen}
					<span>{link.name}</span>
				{/if}
			</button>
		{/each}
	</nav>
	<div>.</div>
</aside>
