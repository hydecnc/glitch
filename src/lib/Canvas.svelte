<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let canvas2: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let ctx2: CanvasRenderingContext2D | null;

	onMount(() => {
		ctx = canvas.getContext('2d');
		ctx2 = canvas.getContext('2d');

		if (ctx && ctx2) {
			let width = window.innerWidth;
			let height = window.innerHeight;
			const backgroundColor = '#080d07'
			let animationFrameId: number;

			canvas.width = width;
			canvas.height = height;
			canvas2.width = width;
			canvas2.height = height;
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, width, height);

			const charArr = [
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z'
			];
			const fontSize = 10;
			let numCols = width / fontSize;
			const randInt = (min: number, max: number) => {
				// return random integer from min (inclusive) to max (exclusive)
				return Math.floor(Math.random() * (max - min) + min);
			};
			const randFloat = (min: number, max: number) => {
				// return random float from min (inclusive) to max (exclusive)
				return Math.random() * (max - min) + min;
			};

			class Point {
				private speed: number;
				private value: string;

				constructor(
					public x: number,
					public y: number
				) {
					this.speed = randFloat(2, 5);
					this.value = charArr[randInt(0, charArr.length - 1)];
				}

				public draw(ctx: CanvasRenderingContext2D): void {
					this.value = charArr[randInt(0, charArr.length - 1)];


					ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
					ctx.font = fontSize + 'px san-serif';
					ctx.fillText(this.value, this.x, this.y);

					ctx.fillStyle = 'rgba(65, 255, 0, 0.8)';
					ctx.font = fontSize + 'px san-serif';
					ctx.fillText(this.value, this.x, this.y);

					this.y += this.speed;

					if (this.y > height) {
						this.y = randFloat(-100, 0);
						this.speed = randFloat(2, 5);
					}
				}
			}

			let fallingCharArr = Array();

			for (var i = 0; i < numCols; i++) {
				fallingCharArr.push(new Point(i * fontSize, randFloat(-500, 0)));
			}

			const update = () => {
				if (!ctx || !ctx2) return; // Null check
				
				ctx.fillStyle = 'rgba(0,0,0,0.05)';
				ctx.fillRect(0, 0, width, height);

				// ctx2.clearRect(0, 0, width, height);
				
				var i = fallingCharArr.length;
				
				while (i--) {
					fallingCharArr[i].draw(ctx);
					var v = fallingCharArr[i];
				}
				animationFrameId = requestAnimationFrame(update);
			};
			
			const handleResize = () => {
				if (!ctx || !ctx2) return; // Null check

				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
					animationFrameId = 0;
				}
				cancelAnimationFrame(animationFrameId);

				width = window.innerWidth;
				height = window.innerHeight;
				ctx.canvas.width = width;
				ctx.canvas.height = height;

				ctx.clearRect(0, 0, width, height);
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, width, height);

				let numCols = width / fontSize;
				fallingCharArr = Array();

				for (var i = 0; i < numCols; i++) {
					fallingCharArr.push(new Point(i * fontSize, randFloat(-500, 0)));
				}

				update();
				console.log('resized');
			};

			let timerId: number | null | undefined = null;
			window.addEventListener('resize', () => {
				if (timerId) {
					clearTimeout(timerId);
					timerId = undefined;
				}

				timerId = setTimeout(() => {
					timerId = undefined;
					handleResize();
				}, 1500);
			});

			update();
		}
	});
</script>

<canvas bind:this={canvas}></canvas>
<canvas bind:this={canvas2}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
