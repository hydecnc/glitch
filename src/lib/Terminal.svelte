<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { db, ip, startTimer, timeOut } from '$lib/store';
	import { goto } from '$app/navigation';
	import { addDoc, collection } from 'firebase/firestore';

	interface TerminalOutput {
		type: 'input' | 'output';
		text: string;
	}
	const finalCode = 'wrong';
	let input: string = '';
	let output: TerminalOutput[] = [];
	let userInput: HTMLInputElement;
	let codeAttempt: number = 3;
	let isFinalInput: boolean = false;
	let cur_ip: string = '';
	let prev_input: string = '';

	let introScreen = true;

	const handleInput = () => {
		const command = input.trim().toLowerCase();
		output = [...output, { type: 'input', text: input }];

		if (introScreen && (command === "yes" || command === "y")) {
			introScreen = false;
			finalCodeStart();
		}
		else if (introScreen) {
			simulateTyping(`Command not recognized: ${input}`);
		}
		else if (isFinalInput && command === "yes" || command === "y") {
			if (prev_input !== finalCode) {
				codeAttempt--;
				if (codeAttempt <= 0) {
					finalCodeFail();
				} else {
					if (codeAttempt == 1) {
						simulateTyping(`Wrong. You have ${codeAttempt} chance left. \nEnter Final Code: \n`);
					} else {
						simulateTyping(`Wrong. You have ${codeAttempt} chances left. \nEnter Final Code: \n`);
					}
					isFinalInput = false;
				}
			} else {
				finalCodeSuccess();
			}
		} 
		else if (isFinalInput) {
			isFinalInput = false;
			simulateTyping(`Enter Final Code: \n`);
		} else if (!isFinalInput) {
			prev_input = command;
			simulateTyping(`Are you sure? [y/n]`);
			isFinalInput = true;
		}
		
		input = '';
	};
	
	const simulateTyping = async (text: string, speed: number = 50) => {
		unfocusInput(userInput);
		const characters = text.split('');
		
		let curOutput = output;
		for (let index = 0; index <= characters.length; index++) {
			await new Promise((resolve) => setTimeout(resolve, speed));
			output = [...curOutput, { type: 'output', text: text.slice(0, index + 1) }];
		}
		
		focusInput(userInput);
	};
	
	const finalCodeSuccess = async () => {
		await simulateTyping("Final Code authorized. Restoring database in 3...2...1...")
		goto('./success')
	};
	const finalCodeFail = async () => {
		await simulateTyping("Time's up.\nWebsite shutting down in 3...2...1...");
		console.log('Banned ip: ', cur_ip);
			// await addDoc(collection(db, 'ips'), {
			// 	ip: cur_ip
			// });
			await new Promise((r) => setTimeout(r, 1000));
			goto('/blank');
			startTimer.set(false);
			timeOut.set(false);
		};
		const track_ip = ip.subscribe((value) => {
			cur_ip = value;
		});
		
		const unsubscribe = timeOut.subscribe((newValue) => {
			if (newValue) {
				finalCodeFail();
			}
		});
		
		const focusInput = (el: HTMLInputElement) => {
			el !== undefined && el.focus();
		};
		
		const unfocusInput = (el: HTMLInputElement) => {
			el !== undefined && el.blur();
		};
		
		const finalCodeStart = async () => {
			await simulateTyping(`\nGood Luck. \n`);
			let finalProblem = "What is the 5-letter word that all smart people spell wrong?";
			const stringToHex = (str: string) => {
				let hex: string = '';
				for (let i=0; i<str.length; i++ ) {
					let charHex = str.charCodeAt(i).toString(16);

					if (charHex.length < 2) {
						charHex = '0' + charHex;
					}
					hex += charHex + ' ';
				}
				return hex;
			}
			finalProblem = stringToHex(finalProblem);
			await simulateTyping(`\n${finalProblem}\n\n`);
		await simulateTyping(`Enter Final Code: \n`);
	}

	onMount(async () => {
		await simulateTyping(`Welcome to the final stage.
You will be given three chances to input the Final Code.
If you fail to crack the Final Code, the website will shut down and you will not be able to restore the database.

Would you like to proceed? [y/n]`);
		// await new Promise((r) => setTimeout(r, 5000));
		// startTimer.set(true);
	});

	onDestroy(() => {
		unsubscribe();
		track_ip();
	});
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

	<input
		id="terminal-input"
		bind:value={input}
		on:keydown={(e) => e.key === 'Enter' && handleInput()}
		bind:this={userInput}
	/>
</div>

<style>
	.terminal {
		font-family: 'Courier New', Courier, monospace;
		color: #fbfbfb;
		font-size: 1em;
		margin-right: 5em;
	}

	.input,
	.output {
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

	/* #hex-text {
		font-size: 1.5rem;
		filter: drop-shadow(0 1px 3px);
		text-shadow: 1px 0px 1px #04d9ff;
		margin-right: 5em;
		margin-bottom: 3em;
	} */
</style>
