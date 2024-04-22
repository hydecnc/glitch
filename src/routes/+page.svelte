<script lang="ts">
	import Canvas from '$lib/Canvas.svelte';

	const date = new Date('2024-05-20T12:00:00');
	let binary = true;
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	let animationRunning = true;

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
		animationRunning = false;
	};
</script>

<Canvas />
<div id="glitch">
	<div id="glitch-lines" class="glitch-filter"></div>

	<h2 class="glitch-text" id="glitch-by">Presented by THOTH</h2>
	<h1 class="glitch-text">The GLITCH</h1>
	<button
		class="glitch-text glitch-date {animationRunning ? '' : 'paused'}"
		on:click={toggleBinaryDate}>{dateString}</button
	>
</div>

<div id="content">
	<a href="https://forms.gle/N9hRDH8nnXHKsRfu6" target="_blank">
		<button type="button" id="register">Click here to register!</button>
	</a>
	<div class="desc-text" id="main-desc">
		The THOTH database has been hacked by an unknown hacker group. They have put the THOTH database,
		which contains all problems the THOTH club has ever solved, at a risk of deletion. They must be
		stopped at all cost. Whoever solves the situation most deligently will be awarded
		<strong>$3000 MXN</strong>
		by the THOTH club. You have been called to save the database from the hackers and save the THOTH
		database.
		<br />
		<br />
		To save the THOTH database, you must solve each problem given in the stations and also find the
		<strong>Final Code</strong> required to stop the glitchers.
	</div>
	<div class="desc-text">
		<h2 id="station-title">Instructions</h2>
		<ul>
			<li><strong>Only ONE</strong> registration form must be submitted per team.</li>
			<li>
				You can participate as <strong>an individual</strong> or in
				<stronog>a team of maximum 3 people</stronog>.
			</li>
			<li>
				Only <strong>ASFM high school students</strong> can participate, but you may have different grade
				levels in one team.
			</li>
			<li>The registration will <strong>close on May 10th</strong> 11:59 p.m.</li>
		</ul>
		<div class="block-desc">
			* No advanced mathematics will be required for the event. Any high school student can have
			success in the event.
		</div>
		<div class="block-desc">
			For any inquiries, please contact:
			<a
				class="contact"
				href="https://www.instagram.com/th0th_asfm?igsh=eW55MWh6NjU5aHJl"
				target="_blank"
			>
				<strong> @th0th_asfm </strong>
			</a>
			or <a class="contact" href="mailto:24yoo9560@asfm.mx"><strong>24yoo9560@asfm.mx</strong></a>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

	h1 {
		font-size: 6rem;
		margin-top: 0;
		margin-bottom: 0;
	}

	strong {
		color: rgb(var(--primary-color));
		font-weight: bolder;
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
		margin-bottom: 1.5rem;
		/* background-color: rgb(var(--darker-rgb)); */
		/* backdrop-filter: blur(1rem); */
	}

	#glitch-by {
		margin-bottom: 0.5rem;
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

	.glitch-date {
		font-size: 1.4em;
		animation: blink 1s linear infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}

	.paused {
		animation: none;
		/* animation-play-state: paused; */
		opacity: 1;
	}

	#main-desc {
		font-size: 1.2em;
	}

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
		animation: pan-lines 360s infinite linear;
	}

	#content {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1em;
		animation: content-fade-in 3s ease forwards;
	}

	@keyframes content-fade-in {
		0% {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0%);
		}
	}

	.block-desc {
		flex: 1;
		font-size: 0.9rem;
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 1em;
	}

	.desc-text {
		padding: 1rem;
		/* font-family: 'Courier New', Courier, monospace; */
		font-family: 'Open Sans';
		backdrop-filter: blur(10px);
		/* padding: 5px; */
		border-radius: 20px;
		font-size: 1.1em;
		margin-left: 20px;
		margin-right: 20px;
		width: 80%;
	}

	#station-title {
		font-size: 2rem;
		padding: 0;
		margin: 0;
	}

	#register {
		color: #fbfbfb;
		font-family: 'Courier New', Courier, monospace;
		font-size: 1.5em;
		padding: 1em;
		backdrop-filter: blur(10px);
		border-radius: 20px;
		margin-bottom: 1.5em;
		/* background-color: rgb(var(--darker-rgb)); */
	}

	.contact {
		text-decoration: none;
	}
</style>
