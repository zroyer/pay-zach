<script>
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import Spinner from 'svelte-spinner';

  let stripeLoaded = false;
  let payment = null;
  let isLoading = false;
  $: fees = payment * 0.03;
  $: total = payment + fees;

  const handleSubmit = async () => {
    isLoading = true;
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
  <form>
    <input
      bind:value={payment}
      placeholder='$'
      type=number
      min=1
      step=1
      inputmode=numeric />
    {#if payment && payment > 0}
      <div class='info' transition:slide='{{delay: 250, duration: 500, easing: quintOut }}'>
        <div class='row'>
          <span>Fees: </span>
          <span>${Number.parseFloat(fees).toFixed(2)}</span>
        </div>
        <div class='row'>
          <span>Total: </span>
          <span>${Number.parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    {/if}
    <button
      on:click|preventDefault={handleSubmit}
      disabled={!stripeLoaded || (!payment || payment < 1) || isLoading}
    >
      {#if isLoading}
        <Spinner
          size='22'
          speed='1000'
          color='#999999'
          thickness='2'
          gap='30' />
      {:else}
        Pay
      {/if}
    </button>
  </form>
</main>

<style>
  h2 {
    margin-block-start: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
  }

  input, button {
    font-size: 1.1em;
    width: 100%;
    height: 2.25rem;
  }

  button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    cursor: not-allowed;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .row {
    width: 100%;
    margin: 0 0 1rem 0;
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
</style>

<svelte:head>
  <script src='https://js.stripe.com/v3/' on:load={() => stripeLoaded = true}></script>
</svelte:head>