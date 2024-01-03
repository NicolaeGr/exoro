<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	type ProfileType = {
		[key: string]: {
			value: any;
		};
	};

	const profile = data.profile as [ProfileType];
</script>

<a href="/" class="text-blue-500">Back Home</a>
<br />

<span class="overflow-auto">
	{JSON.stringify(profile, null, 2)}
</span>
