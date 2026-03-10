import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Only instantiate Stripe when the secret key is provided to avoid build-time failures.
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      // @ts-expect-error Stripe API versions vary depending on installed types. Bypassing strictly typed versions here.
      apiVersion: '2023-10-16',
      appInfo: {
        name: 'ClawKit',
        version: '0.1.0',
      },
    })
  : null;
