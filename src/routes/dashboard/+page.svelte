<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="/" class="text-blue-500">Go Home</a>

<br /><br />
<hr />
<br />
<pre>
{JSON.stringify(data.user, null, '\t')}
</pre>
