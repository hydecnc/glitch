<script lang="ts">
	import Timer from '$lib/Timer.svelte';
	import { onMount } from 'svelte';

	let intialMsg = 'Welcome to the final stage.';
	intialMsg = `Welcome to the final stage.
You will be given three chances to input the Final Code.
If you fail to crack the Final Code in 5 minutes, the website will shut down.
Good luck.`;
	let msg = '';
	let cursorPosition = { x: 0, y: 0 };
	let lineHeight = 1.1;
	let lineCounter = 0;
	let promptFinalCode = false;

	onMount(async () => {
		for (let i = 0; i < intialMsg.length; i++) {
			await new Promise((r) => setTimeout(r, 40));
			msg = intialMsg.slice(0, i + 1);
			if (intialMsg[i] == '\n') {
				cursorPosition.x = 0;
				cursorPosition.y += 1;
				lineCounter = 0;
				continue;
			}
			lineCounter += 1;
			cursorPosition.x = lineCounter;
		}

        promptFinalCode = true;
	});
    
</script>

<div id="header">
	<h1>Final Code</h1>
	<Timer />
</div>

<p style="--line-height:{lineHeight};">
	{msg}
	<span
		class="cursor"
		style={`left: ${cursorPosition.x}ch; top: ${cursorPosition.y * lineHeight}em`}
	></span>
</p>
{#if promptFinalCode}
	<div id="prompt-text">Enter your code:</div>
	<input type="text" id="finalcode"/>
{/if}

<style>
	#header {
		font-family: 'Courier New', Courier, monospace;
		color: rgb(var(--primary-color));
		text-shadow: rgb(var(--primary-color)) 0.5px 0 10px;
		display: flex;
	}

	h1 {
		font-size: 3rem;
	}

	p {
		white-space: pre-wrap;
		position: relative;
		display: inline-block;
		font-size: 1em;
		font-family: 'Courier New', Courier, monospace;
		line-height: calc(var(--line-height) * 1em);
	}

	.cursor {
		position: absolute;
		top: 0;
		left: 3px;
		height: 1em; /* Adjust this based on your font size */
		width: 0.5ch; /* Adjust this based on your font size */
		background-color: rgb(0, 255, 0); /* Change cursor color as needed */
		/* animation: blink 1.5s infinite; */
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

    #prompt-text {
        font-family: 'Courier New', Courier, monospace;
    }

    #finalcode {
        border: 3px solid rgb(var(--primary-color));
        border-radius: 3px;
        background: none;
    }
</style>
