<script lang="ts">
	import { onDestroy } from 'svelte';
	import { startTimer, timeOut } from '$lib/store';

	let totalSeconds = 600; // 10 minutes
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;
	let timer: number | ReturnType<typeof  setInterval>;

	const tick = () => {
		totalSeconds--;
		minutes = Math.floor(totalSeconds / 60);
		seconds = totalSeconds % 60;

		if (totalSeconds === 0) {
			clearInterval(timer);
			timeOut.set(true);
		}
	};

	function startCountdown() {
		timer = setInterval(tick, 1000);

		return () => {
			clearInterval(timer);
		};
	}

	const unsubscribe = startTimer.subscribe((newValue) => {
		// console.log('Start timer? ', newalue);
		if (newValue) {
			startCountdown();
		}
	});

	onDestroy(() => {
		clearInterval(timer);
		unsubscribe();
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
