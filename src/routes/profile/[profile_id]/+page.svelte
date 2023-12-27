<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	type ProfileType = {
		[key: string]: {
			value: any;
		};
	};

	const profile = data.profile as [ProfileType];
</script>

<a href="/" class="text-blue-500">Back Home</a>
<br />

{JSON.stringify(profile)}
