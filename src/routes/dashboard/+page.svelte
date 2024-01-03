<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="/" class="text-blue-600">Go Home</a>

<br /><br />
<hr />
<br />
<pre>
{JSON.stringify(data.user, null, '\t')}
</pre>

<br /><br />

<span>Profiles: {JSON.stringify(data.profiles)}</span>
<br />
<span>Links: {JSON.stringify(data.links)}</span>
