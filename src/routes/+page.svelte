<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const profiles = data.profiles;
</script>

<svelte:head>
	<title>Exoro | Home Page</title>
</svelte:head>

<nav>
	<h1>Hello! Let's take a look at our latest profiles</h1>
	<span>Are you an owner? <a class="text-blue-600" href="/login">Log In</a></span>
</nav>
<br /><br />

<main>
	{#each profiles as profile}
		<hr />
		{#each Object.entries(profile) as [name, { value }]}
			{#if name === 'handle'}
				<span style="text-transform: capitalize;">
					{name}:
					<a href="/profile/{profile.handle}" class="text-blue-600"> {profile.handle}</a>
				</span>
				<br />
			{:else if name === 'profile_image'}
				<img src={value.image.url} alt="" width="80px" />
			{:else}
				<span style="text-transform: capitalize;">{name}: {value}</span><br />
			{/if}
		{/each}
		<br />
	{/each}
</main>
