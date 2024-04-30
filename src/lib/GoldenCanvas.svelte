<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let particles: Particle[] = [];
	let cursor = { x: 0, y: 0 };

	const backgroundColor = '#d4af37';
	const fontSize = 14;
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

	class Particle {
		position: { x: number; y: number };
		velocity: { x: number; y: number };
		char: string;
		initialLifeSpan: number;
		lifeSpan: number;

		constructor(x: number, y: number, char: string, lifeSpan: number) {
			this.position = { x: x, y: y };
			this.velocity = {
				x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
				y: Math.random() * 0.7 + 0.9
			};
			this.char = char;
			this.initialLifeSpan = lifeSpan;
			this.lifeSpan = lifeSpan;
		}

		update(context: CanvasRenderingContext2D) {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.lifeSpan--;

			this.velocity.y += 0.02;

			context.fillText(this.char, this.position.x, this.position.y, fontSize);
		}
	}

	// const characterLifeSpan = () => {
	// 	return Math.floor(Math.random() * 60 + 80);
	// };
	const getRandomChar = () => {
		return math_symbols[Math.floor(Math.random() * math_symbols.length)];
	};

	function addParticle() {
		particles.push(new Particle(cursor.x, cursor.y, getRandomChar(), 100));
	}

	function onMouseMove(e: MouseEvent) {
		cursor.x = e.clientX;
		cursor.y = e.clientY;
		addParticle();
	}

	
	onMount(() => {
		ctx = canvas.getContext('2d');
		
		if (ctx) {
			let width = window.innerWidth;
			let height = window.innerHeight;
			
			canvas.width = width;
			canvas.height = height;
			ctx.fillStyle = backgroundColor;
			ctx.font = `bold ${fontSize}px Arial`	
			
			function updateParticles() {
				if (particles.length == 0) {
					return;
				}
				
				ctx?.clearRect(0, 0, width, height);
				
				particles.forEach((particle) => {
					if (ctx) {
						particle.update(ctx);
					}
				});
				particles = particles.filter((particle) => {
					return particle.lifeSpan > 0;
				});
				
				if (particles.length == 0) {
					ctx?.clearRect(0, 0, width, height);
				}
			}
			
			const init = () => {
				window.requestAnimationFrame(draw);
			};
			
			const draw = () => {
				updateParticles();
				ctx?.save();
				window.requestAnimationFrame(draw);
			};
			
			init();
		}
		const addListeners = () => {
			canvas.addEventListener('mousemove', onMouseMove);
		};
		addListeners();
		onDestroy(() => {
			canvas.removeEventListener('mousemove', onMouseMove);
		});
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11;
	}
</style>
