<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	onMount(() => {
		ctx = canvas.getContext('2d');
		let mousePos = { x: 0, y: 0 };

		if (ctx) {
			let width = window.innerWidth;
			let height = window.innerHeight;
			const backgroundColor = '#FAFAFA';
			let animationFrameId: number;

			canvas.width = width;
			canvas.height = height;
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, width, height);

			const math_symbols = [
				'∑',
				'∫',
				'√',
				'≠',
				'≤',
				'≥',
				'∞',
				'∆',
				'π',
				'α',
				'β',
				'γ',
				'θ',
				'ϕ',
				'Σ',
				'Π'
			];

			const fontSize = 14;

			const characterLifeSpan = () => {
				return Math.floor(Math.random() * 60 + 80);
			};

            const getRandomChar = () => {
                return math_symbols[Math.floor(Math.random() * math_symbols.length)];
            }

            const init = () => {
                
                window.requestAnimationFrame(draw);
            }

            const draw = () => {
                ctx?.strokeText(getRandomChar(), mousePos.x, mousePos.y)
                ctx?.save();
                window.requestAnimationFrame(draw);
            }

            init();
		}
		const addListeners = () => {
			canvas.addEventListener('mousemove', (event) => {
				mousePos = { x: event.offsetX, y: event.offsetY };
			});
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
