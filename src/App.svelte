<script>
	let payment = 1;
	$: fees = Math.round((payment * 0.03 + Number.EPSILON) * 100) / 100;
	$: total = payment + fees;

	const handleSubmit = () => {
		console.log('submit');
	};
</script>

<main>
	<h2><i>Pay Zach</i></h2>
	<input type=number bind:value={payment} />
	<div>Fees: ${fees}</div>
	<div>Total: ${total}</div>
	<button on:click|once={handleSubmit}>Pay</button>
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	div {
		margin: 0 0 1em 0;
	}

	input, div, button {
		width: 12em;
		font-size: 1.1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>