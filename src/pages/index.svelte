<script>
	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let stripeLoaded = false;
	let payment = null;

	$: fees = payment * 0.03;
	$: total = payment + fees;
	$: isValid = payment && payment > 0;

	const handleSubmit = async () => {
		const response = await fetch('/.netlify/functions/checkout', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({payment: payment}),
		}).then((res) => res.json());

		const stripe = Stripe(response.publishableKey);
		const { error } = await stripe.redirectToCheckout({
			sessionId: response.sessionId,
		});

		if (error) {
			console.error(error);
		}
	};
</script>

<main>
	<h2><i>Pay Zach</i></h2>
	<input
		bind:value={payment}
		placeholder='$'
		type=number
		min=1
		step=1
		inputmode=numeric />
	{#if payment > 0}
		<form class='info' onSubmit={handleSubmit} transition:slide="{{delay: 250, duration: 500, easing: quintOut }}">
			<div class='row' >
				<span>Fees: </span>
				<span>${Number.parseFloat(fees).toFixed(2)}</span>
			</div>
			<div class='row' >
				<span>Total: </span>
				<span>${Number.parseFloat(total).toFixed(2)}</span>
			</div>
		</form>
	{/if}
	<button
		on:click={handleSubmit}
		disabled={!stripeLoaded || !isValid}
	>Pay</button>
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h2 {
		margin-block-start: 0;
	}

	input, button {
		width: 12rem;
		font-size: 1.1em;
	}

	.info {
		width: 12rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		width: 100%;
		margin: 0 0 1rem 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>

<svelte:head>
	<script src="https://js.stripe.com/v3/" on:load={() => stripeLoaded = true}></script>
</svelte:head>