<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let totalSeconds = 300; // 5 minutes
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;
	let timer: number | undefined;

	const tick = () => {
		totalSeconds--;
		minutes = Math.floor(totalSeconds / 60);
		seconds = totalSeconds % 60;

		if (totalSeconds === 0) {
			clearInterval(timer);
		}
	};

	// onMount(() => {
	// 	timer = setInterval(tick, 1000);

	// 	return () => {
	// 		clearInterval(timer);
	// 	};
	// });

	function startTimer() {
		timer = setInterval(tick, 1000);

		return () => {
			clearInterval(timer);
		};
	};

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

<style>
	div {
		font-size: 2em;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
		text-align: center;
        position: absolute;
        top: 20px;
        right: 20px;
	}
</style>
