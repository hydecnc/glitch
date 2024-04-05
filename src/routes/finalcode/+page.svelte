<script>
	import { goto } from '$app/navigation';
	import Terminal from '$lib/Terminal.svelte';
	import Timer from '$lib/Timer.svelte';
	import { ip } from '$lib/store.js';
	import { onMount } from 'svelte';

	export let data;
	// console.log(data.bannedIps);

	ip.set(data.ip);
</script>

<div>
	<h1>Final Code</h1>
	<Timer />
	<Terminal />
</div>

<style>
	/* Add global styles if needed */
</style>
