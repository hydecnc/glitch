<script lang="ts">
	import GoldenCanvas from '$lib/GoldenCanvas.svelte';
	import NewGoldenCanvas from '$lib/NewGoldenCanvas.svelte';
	import { fade } from 'svelte/transition';
</script>

<GoldenCanvas />
<!-- <NewGoldenCanvas /> -->
<div id="transition"></div>
<div class="main-container" in:fade={{duration: 300, delay: 400}}>
	<div id="blur">
		<h1 id="congrats">Congratulations! You have cracked the Final Code!</h1>
		<h2 id="extra-info">Report to a nearby THθTH staff</h2>
		<h2> THθTH (Mathematics & Logics Club)</h2>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	#transition {
		width: 100vw;
		height: 100vh;
		background-color: white;
		opacity: 1;
		animation: fade-out 3s linear 1s forwards;
		z-index: -1s;
		position: absolute;
	}
	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.main-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		text-align: center;
		padding: 0;
		margin: 0;
	}
	
	#blur {
		padding-right: 10px;
		padding-left: 10px;
		backdrop-filter: blur(7px);
	}
	
	#congrats {
		text-align: center;
	}
	
	#extra-info {
		font-size: 3em;
	}

	h1 {
		font-size: 4em;
		margin: 0;
	}
	h2 {
		font-size: 2em;
		margin: 0;
	}
</style>