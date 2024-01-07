<script>
	import { goto } from '$app/navigation';
	import { SearchIcon } from 'svelte-feather-icons';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex w-auto flex-col items-center justify-center p-6 md:p-0">
		<div class="mb-8 flex w-full items-center">
			<div class="flex flex-none items-center justify-center rounded-full bg-white p-4">
				<SearchIcon size="30" />
			</div>
			<div class="mx-6 h-20 w-px bg-white" />
			<div class="text-lg font-medium">Opps! The page you're looking for doesn't exist.</div>
		</div>
		<a
			href="/dashboard"
			on:click={() => {
				goto('/dashboard');
			}}
			data-sveltekit-prefetch
			class="w-full bg-white/90 p-3 text-center text-sm font-medium uppercase text-black hover:bg-white/100"
		>
			Return Home
		</a>
	</div>
</div>
