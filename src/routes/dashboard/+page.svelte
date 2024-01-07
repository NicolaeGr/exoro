<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="/" class="text-blue-600">Go Home</a>

<br /><br />
<hr />
<br />
<span>
	{JSON.stringify(data.user, null, '\t')}
</span>

<br /><br />

<span>Profiles: {JSON.stringify(data.profiles)}</span>
<br />
<span>Links: {JSON.stringify(data.links)}</span>
