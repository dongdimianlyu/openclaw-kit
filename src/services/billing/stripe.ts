import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // @ts-expect-error Stripe API versions vary depending on installed types. Bypassing strictly typed versions here.
  apiVersion: '2023-10-16', 
  appInfo: {
    name: 'OpenClaw Shovel',
    version: '0.1.0',
  },
});
