<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	const profiles = data.profiles as [ProfileType];

	type ProfileType = {
		[key: string]: {
			value: any;
		};
	};
</script>

<h1>Hello! Let's take a look at our latest profiles</h1>
<h3>Are you an owner? <a class="text-blue-500" href="/login">Log In</a></h3>

<br /><br />

{#each profiles as profile}
	<hr />
	{#each Object.entries(profile) as [name, { value }]}
		{#if name === 'handle'}
			<span style="text-transform: capitalize;">
				{name}:
				<a href="/profile/{profile.handle}" class="text-blue-500"> {profile.handle}</a>
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
