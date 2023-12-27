<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<header class="w-screen overflow-x-clip bg-slate-400">
	<p>Successfully logged in! Welcome back, {data.user.firstName}!</p>
</header>
<slot />
