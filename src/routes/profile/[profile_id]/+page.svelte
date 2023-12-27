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

{JSON.stringify(profile)}
