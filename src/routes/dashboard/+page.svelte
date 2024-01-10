<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<a href="/" class="text-blue-600">Go Home</a>

	<br /><br />
	<hr />
	<br />
	<span>
		{JSON.stringify(data.user, null, '\t')}
	</span>

	<br /><br />

	<span>Profiles: {JSON.stringify(data.profileIds)}</span>
	<br />
	<span>Links: {JSON.stringify(data.linkIds)}</span>
	<br />
	<span>Cards: {JSON.stringify(data.cardIds)}</span>
</main>
