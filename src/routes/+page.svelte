<script lang="ts">
	import Canvas from "$lib/Canvas.svelte";

	const date = new Date('2024-05-28T12:00:00');
	let binary = true;
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	const normalDate = `${year}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
	let binaryDate = `${year.toString(2)}.${(month + 1).toString(2)}.${day.toString(2)}`;

	let dateString = binaryDate;

	const toggleBinaryDate = () => {
		binary = !binary;
		if (binary) {
			dateString = binaryDate;
		} else {
			dateString = normalDate;
		}
	};
</script>

<Canvas />
<div id="glitch">
	<div id="glitch-lines" class="glitch-filter"></div>
	<!-- <div id="glitch-shadow" class="glitch-filter"></div> -->

	<h2 class="glitch-text">Presented by THOTH</h2>
	<h1 class="glitch-text">The Glitch</h1>
	<button class="glitch-text" on:click={toggleBinaryDate}>{dateString}</button>
</div>

<style>
	h1 {
		font-size: 6rem;
		margin-top: 0;
		margin-bottom: 0;
	}

	button {
		background: none;
		font-size: 1.2rem;
		border-color: rgb(var(--primary-color));
	}

	@keyframes pan-lines {
		from {
			background-position: 0% 0%;
		}

		to {
			background-position: 0% -100%;
		}
	}

	#glitch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 2;
		/* background-color: rgb(var(--darker-rgb)); */
		/* backdrop-filter: blur(1rem); */
	}

	.glitch-text {
		display: flex;
		font-family: 'Courier New', Courier, monospace;
		color: rgb(var(--primary-color));
		text-shadow: rgb(var(--primary-color)) 1px 0 10px;
		background-size: 100% 7px;
		text-align: center;
	}

	.glitch-filter {
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0%;
		top: 0%;
		pointer-events: none;
	}

	/* #glitch-shadow {
		background: radial-gradient(rgb(var(--theme-rgb) / 1%) 20%, rgb(var(--darker-rgb) / 80%) 70%);
		z-index: 3;
	} */

	#glitch-lines {
		background: linear-gradient(
			rgb(var(--darker-rgb) / 15%) 0%,
			rgb(var(--darker-rgb) / 75%) 28%,
			rgb(var(--darker-rgb) / 15%) 56%,
			rgb(var(--darker-rgb) / 5%) 56%,
			rgb(var(--darker-rgb) / 5%) 100%
		);
		background-size: 100% 7px;
		z-index: 5;
		opacity: 0.75;
		/* animation: pan-lines 360s infinite linear; */
	}
</style>
