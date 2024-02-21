<script lang="ts">
	import { onMount } from "svelte";

	interface TerminalOutput {
		type: 'input' | 'output';
		text: string;
	}
	let input = '';
	let output: TerminalOutput[] = [];
    let userInput: HTMLInputElement;

	const handleInput = () => {
		const command = input.trim().toLowerCase();
		output = [...output, { type: 'input', text: input }];

		if (command === 'yes') {
			simulateTyping('\nEnter final code:');
		} else {
			simulateTyping(`Command not recognized: ${input}`);
		}

		input = '';
	};

    const simulateTyping = async (text: string) => {
        unfocusInput(userInput);
		const characters = text.split('');

        let curOutput = output;
		for (let index = 0; index < characters.length; index++) {
			await new Promise(resolve => setTimeout(resolve, 50));
			output = [...curOutput, { type: 'output', text: text.slice(0, index + 1) }];
		}

		focusInput(userInput);
	};

    
    const focusInput = (el: HTMLInputElement) => {
        el.focus();
    }

    const unfocusInput = (el: HTMLInputElement) => {
        el.blur();
    }
    
    onMount(() => {
        simulateTyping(`Welcome to the final stage.
You will be given three chances to input the Final Code.
If you fail to crack the Final Code in 5 minutes, the website will shut down and you will not be able to restore the database.
Good luck.

If you wish to proceed type in "yes"`)
    })
</script>

<div class="terminal">
	{#each output as { type, text }}
		{#if type === 'input'}
			<div class="input">{text}</div>
		{/if}
		{#if type === 'output'}
			<div class="output">{text}</div>
		{/if}
	{/each}

	<input id="terminal-input" bind:value={input} on:keydown={(e) => e.key === 'Enter' && handleInput()} bind:this={userInput} />
</div>

<style>
	/* Add your custom styles for the terminal here */
    .terminal {
        font-family: 'Courier New', Courier, monospace;
        color: #fbfbfb;
        font-size: 1em;
    }

	.input, .output {
		overflow: hidden;
        white-space: pre-wrap;
	}

    #terminal-input {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
        padding: 0;
        width: 100%;
        background: none;
        border: none;
        outline: none;
        color: #fbfbfb;
    }
</style>
