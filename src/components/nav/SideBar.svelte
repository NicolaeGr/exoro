<script lang="ts">
	import { onMount } from 'svelte';

	import { goto, invalidateAll } from '$app/navigation';
	import { navigating, page } from '$app/stores';

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

	export let isSidebarOpen: boolean;

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

	let activeLink: Link | undefined = undefined;

	onMount(() => {
		activeLink = links.find((link) => link.path === $page.url.pathname);
	});

	$: if ($navigating) {
		activeLink = links.find((link) => link.path === $page.url.pathname);
	}

	const handleLinkClick = (link: any) => {
		if (link.path) {
			goto(link.path);
		}
		link.action?.();
		activeLink = link;
	};

	const unselectLink = () => {
		activeLink = undefined;
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
		'flex flex-col justify-between transition-all bg-slate-100',
		isSidebarOpen ? 'w-[280px] min-w-[200px]' : 'p-2 w-[50px] min-w-[50px]',
		isSidebarOpen ? 'p-4' : 'p-1 pt-4 pb-4'
	);
</script>

<aside class={assideStyle}>
	<div class="flex h-10 justify-between" class:self-center={!isSidebarOpen}>
		<button
			class={`h-10 w-10 rounded-lg bg-slate-200 ${!isSidebarOpen && 'h-8 w-8'}`}
			on:click={() => (isSidebarOpen = true)}
		/>

		{#if isSidebarOpen}
			<button class="text-gray-600" type="button" on:click={() => (isSidebarOpen = !isSidebarOpen)}>
				<SidebarIcon size="1.5x" strokeWidth={2} />
			</button>
		{/if}
	</div>

	<nav class="flex flex-col gap-1" class:self-center={!isSidebarOpen}>
		{#each links as link}
			<button
				class={`flex w-full items-center space-x-0.5 rounded p-1 ${
					activeLink === link ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-gray-100'
				}`}
				on:click={() => handleLinkClick(link)}
				type="button"
			>
				<span class="flex h-6 w-6 items-center justify-center">
					<svelte:component this={link.icon} size="1.0x" />
				</span>
				{#if isSidebarOpen}
					<span class="mt-1.5 text-sm">{link.name}</span>
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
				<span class="mt-1">Settings</span>
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
				<span class="mt-1">Logout</span>
			{/if}
		</button>
	</div>
</aside>
