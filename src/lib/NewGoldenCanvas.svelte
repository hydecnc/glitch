<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	class Particle {
		effect: Effect;
		x: number;
		y: number;
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		velocityModifier: number = Math.floor(Math.random() * 5 + 1);
		history: { x: number; y: number }[];
		maxLength: number;
		angle: number;
        timer: number;

		constructor(effect: Effect) {
			this.effect = effect;
			this.x = Math.floor(Math.random() * this.effect.width);
			this.y = Math.floor(Math.random() * this.effect.height);
			this.history = [{ x: this.x, y: this.y }];
			this.maxLength = Math.floor(Math.random() * 200 + 10);
			this.angle = 0;
            this.timer = this.maxLength * 2;
		}

		draw(context: CanvasRenderingContext2D) {
			context.fillRect(this.x, this.y, 10, 10);
			context.beginPath();
			context.moveTo(this.history[0].x, this.history[0].y);
			for (let i = 0; i < this.history.length; i++) {
                context.lineTo(this.history[i].x, this.history[i].y);
			}
			context.stroke();
		}

		update() {
            this.timer --;
            if (this.timer >= 1) {
                let x = Math.floor(this.x / this.effect.cellSize);
                let y = Math.floor(this.y / this.effect.cellSize);
                let index = y * this.effect.cols + x;
                this.angle = this.effect.flowField[index];
                
                this.velocity.x = Math.cos(this.angle);
                this.velocity.y = Math.sin(this.angle);
                this.x += this.velocity.x * this.velocityModifier;
                this.y += this.velocity.y * this.velocityModifier;
                
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxLength) {
                    this.history.shift();
                }
            }
            else if (this.history.length > 1) {
                this.history.shift();
            }
            else {
                this.reset();
            }
		}

        reset() {
            this.x = Math.floor(Math.random() * this.effect.width);
            this.y = Math.floor(Math.random() * this.effect.height);
            this.history = [{ x: this.x, y: this.y }];            
            this.timer = this.maxLength * 2;
        }
	}

	class Effect {
		width: number;
		height: number;
		particles: Particle[];
		numberOfParticles: number;
		cellSize: number;
		rows: number;
		cols: number;
		flowField: number[];
		curve: number;
		zoom: number;

		constructor(width: number, height: number) {
			this.width = width;
			this.height = height;
			this.particles = [];
			this.numberOfParticles = 2000;
			this.cellSize = 20;
			this.rows = Math.floor(this.height / this.cellSize);
			this.cols = Math.floor(this.width / this.cellSize);
			this.flowField = [];
			this.curve = 2;
			this.zoom = 0.05;

			this.init();
		}

		init() {
			// create flowfield
			for (let r = 0; r < this.rows; r++) {
				for (let c = 0; c < this.cols; c++) {
					let angle = (Math.cos(c * this.zoom) + Math.sin(r * this.zoom)) * this.curve;
					this.flowField.push(angle);
				}
			}

			// create particles
			for (let i = 0; i < this.numberOfParticles; i++) {
				this.particles.push(new Particle(this));
			}
		}
		render(context: CanvasRenderingContext2D) {
			this.particles.forEach((particle) => {
				particle.draw(context);
				particle.update();
			});
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (ctx) {
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 2;

			const effect = new Effect(canvas.width, canvas.height);

			const animate = () => {
				if (!ctx) return;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				effect.render(ctx);
				console.log(effect.particles[0]);
				requestAnimationFrame(animate);
			};
			animate();
		}
	});
	onDestroy(() => {});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>
