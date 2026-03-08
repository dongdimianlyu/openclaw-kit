import { stripe } from './stripe';
import { PRICING_PLANS, PlanId } from './plans';

export const billingService = {
  createCheckoutSession: async ({
    userId,
    email,
    planId,
    returnUrl,
  }: {
    userId: string;
    email: string;
    planId: PlanId;
    returnUrl: string;
  }) => {
    const plan = PRICING_PLANS[planId];
    
    if (!plan.stripePriceId) {
      throw new Error(`Plan ${planId} does not have a Stripe price ID`);
    }

    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    const stripeClient = stripe;

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: email,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    });

    return { url: session.url };
  },

  createCustomerPortal: async ({
    customerId,
    returnUrl,
  }: {
    customerId: string;
    returnUrl: string;
  }) => {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    const stripeClient = stripe;

    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { url: portalSession.url };
  },
};
