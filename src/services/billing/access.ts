import { dbService } from '../database';
import { PRICING_PLANS, PlanId } from './plans';

export const billingAccess = {
  /**
   * Checks if the user has an active Pro subscription
   */
  isProUser: async (userId: string): Promise<boolean> => {
    try {
      const subscription = await dbService.getUserSubscription(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = subscription as any;
      return sub?.plan === 'pro' && sub?.status === 'active';
    } catch {
      console.error('Error checking pro status');
      return false;
    }
  },

  /**
   * Returns the current plan ID for the user
   */
  getCurrentPlanId: async (userId: string): Promise<PlanId> => {
    try {
      const subscription = await dbService.getUserSubscription(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = subscription as any;
      
      // If no subscription or inactive, they are on free plan
      if (!sub || sub.status !== 'active') {
        return 'free';
      }
      
      return sub.plan as PlanId;
    } catch {
      return 'free';
    }
  },

  /**
   * Universal check if a user can access a specific feature based on their plan
   */
  canAccessFeature: async (userId: string, feature: keyof typeof PRICING_PLANS['pro']['features']): Promise<boolean> => {
    const planId = await billingAccess.getCurrentPlanId(userId);
    const plan = PRICING_PLANS[planId];
    
    // Check if the feature evaluates to a truthy value (e.g. true for boolean, or a number/string limit)
    // Note: If the feature involves a limit (like maxUsers), this just checks if the limit > 0 or 'unlimited'
    // For strict limit checking, you'd need a separate method
    return !!plan.features[feature];
  }
};
