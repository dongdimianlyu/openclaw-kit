export type PlanId = 'free' | 'pro';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  stripePriceId?: string; // Empty for free plan
  features: {
    maxUsers: number | 'unlimited';
    advancedAnalytics: boolean;
    prioritySupport: boolean;
    customDomain: boolean;
  };
}

export const PRICING_PLANS: Record<PlanId, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for indie hackers and small projects.',
    price: 0,
    features: {
      maxUsers: 100,
      advancedAnalytics: false,
      prioritySupport: false,
      customDomain: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For scaling startups and businesses.',
    price: 49,
    // Add this to your environment variables once created in Stripe
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_placeholder',
    features: {
      maxUsers: 'unlimited',
      advancedAnalytics: true,
      prioritySupport: true,
      customDomain: true,
    },
  },
};
