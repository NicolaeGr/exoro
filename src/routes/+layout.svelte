<script async script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	const refreshToken = async () => {
		const response = await fetch('/api/tokenRefresh', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
	};

	onMount(() => {
		const tokenRefreshInterval = setInterval(refreshToken, 5 * 1000);

		return () => {
			clearInterval(tokenRefreshInterval);
		};
	});
</script>

<slot />
