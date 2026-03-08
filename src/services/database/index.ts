import { createClient } from './supabase-client'

export const dbService = {
  // User queries
  getUserProfile: async (userId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
      
    if (error) {
      console.error('Error fetching user profile', error)
      return null
    }
    return data
  },
  
  // Subscription queries
  getUserSubscription: async (userId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()
      
    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is no rows returned, which is fine
        console.error('Error fetching subscription', error)
      }
      return null
    }
    return data
  },

  // Admin queries
  getUsers: async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      
    if (error) throw error
    return data
  },
  
  getMetrics: async () => {
    const supabase = createClient()
    
    // Total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Active subscriptions (all paid)
    const { count: activeSubs } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .eq('plan', 'pro');

    // Canceled subscriptions
    const { count: canceledSubs } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'canceled');

    // AI Usage Stats
    const { count: totalAiRequests } = await supabase
      .from('ai_usage')
      .select('*', { count: 'exact', head: true });

    const { data: usageData } = await supabase
      .from('ai_usage')
      .select('provider');

    let topProvider = 'None';
    if (usageData && usageData.length > 0) {
      const counts = usageData.reduce((acc: Record<string, number>, row: { provider: string }) => {
        acc[row.provider] = (acc[row.provider] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      topProvider = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    // Telegram & Instance Stats
    const { count: totalTelegramMsgs } = await supabase
      .from('telegram_messages')
      .select('*', { count: 'exact', head: true });

    const { count: activeInstances } = await supabase
      .from('instances')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const estimatedMrr = (activeSubs || 0) * 49; 
    
    return {
      totalUsers: totalUsers || 0,
      activeSubscriptions: activeSubs || 0,
      canceledSubscriptions: canceledSubs || 0,
      mrr: estimatedMrr,
      totalAiRequests: totalAiRequests || 0,
      topProvider,
      totalTelegramMsgs: totalTelegramMsgs || 0,
      activeInstances: activeInstances || 0
    }
  }
};
