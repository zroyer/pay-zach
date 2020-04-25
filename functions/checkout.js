const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FEE_PERCENTAGE = 0.03;

exports.handler = async (event) => {
    const { payment } = JSON.parse(event.body);

    const paymentAmount = payment * 100;
    const feesAmount = paymentAmount * FEE_PERCENTAGE;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      success_url: `${process.env.URL}/thanks`,
      cancel_url: `${process.env.URL}/error`,
      line_items: [
        {
            name: 'Payment',
            amount: paymentAmount,
            currency: 'usd',
            quantity: 1,
        },
        {
            name: 'Fees',
            amount: feesAmount,
            currency: 'usd',
            quantity: 1,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      }),
    };
  };