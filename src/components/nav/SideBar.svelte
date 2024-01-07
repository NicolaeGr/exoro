<script lang="ts">
	import { onMount } from 'svelte';

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { twMerge } from 'tailwind-merge';
	import {
		SidebarIcon,
		HomeIcon,
		UserPlusIcon,
		UsersIcon,
		CompassIcon,
		SettingsIcon,
		LogOutIcon
	} from 'svelte-feather-icons';

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
			name: 'New Profile',
			path: '/dashboard/profiles/new',
			icon: UserPlusIcon
		},
		{
			name: 'My Profiles',
			path: '/dashboard/profiles',
			icon: UsersIcon
		},
		{
			name: 'Templates',
			path: '/dashboard/templates',
			icon: CompassIcon
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

	const unselectLink = () => {
		activeLink = null;
	};

	const logout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
	};

	$: assideStyle = twMerge(
		'flex  min-w-[40px] flex-col justify-between transition-all',
		isSidebarOpen ? 'w-[280px]' : 'p-2 w-[50px]',
		isSidebarOpen ? 'p-4' : 'p-1 pt-4 pb-4'
	);
</script>

<aside class={assideStyle}>
	<div class="flex h-10 justify-between" class:self-center={!isSidebarOpen}>
		{#if isSidebarOpen}
			<div class="h-10 w-10 rounded-lg bg-slate-200" />
		{/if}
		<button class="text-gray-600" type="button" on:click={() => (isSidebarOpen = !isSidebarOpen)}>
			<SidebarIcon size="1.5x" strokeWidth={2} />
		</button>
	</div>

	<nav class="flex flex-col gap-1" class:self-center={!isSidebarOpen}>
		{#each links as link}
			<button
				class="flex items-center space-x-0.5 rounded p-1"
				class:bg-blue-200={activeLink === link}
				class:hover:bg-gray-100={activeLink !== link}
				class:hover:bg-blue-300={activeLink === link}
				class:w-max={!isSidebarOpen}
				class:w-full={isSidebarOpen}
				on:click={() => handleLinkClick(link)}
				type="button"
			>
				<span class="flex h-6 w-6 items-center justify-center">
					<svelte:component this={link.icon} size="1.0x" />
				</span>
				{#if isSidebarOpen}
					<span class="text-sm">{link.name}</span>
				{/if}
			</button>
		{/each}
	</nav>

	<div class:self-center={!isSidebarOpen}>
		<!-- settings and log out like links but without colored background and big padding -->
		<button
			class="flex w-full items-center space-x-0.5 rounded p-1 transition-all hover:text-gray-500"
			on:click={() => {
				goto('/dashboard/settings');
				unselectLink();
			}}
			type="button"
		>
			<span class="flex h-6 w-6 items-center justify-center">
				<svelte:component this={SettingsIcon} size="1x" />
			</span>
			{#if isSidebarOpen}
				<span>Settings</span>
			{/if}
		</button>
		<button
			class="flex w-full items-center space-x-0.5 rounded p-1 transition-all hover:text-gray-500"
			on:click={() => logout()}
			type="button"
		>
			<span class="flex h-6 w-6 items-center justify-center">
				<svelte:component this={LogOutIcon} size="1x" />
			</span>
			{#if isSidebarOpen}
				<span>Logout</span>
			{/if}
		</button>
	</div>
</aside>
