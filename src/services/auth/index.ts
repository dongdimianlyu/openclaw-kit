import { createClient } from '../database/supabase-client'

export interface User {
  id: string;
  email: string;
  name?: string | null;
  is_admin?: boolean;
}

export const authService = {
  login: async (email: string, password?: string) => {
    const supabase = createClient()
    if (!password) throw new Error('Password is required')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  signup: async (email: string, password?: string, name?: string) => {
    const supabase = createClient()
    if (!password) throw new Error('Password is required')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    })
    
    if (error) throw error
    return data
  },

  loginWithGoogle: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (error) throw error
    return data
  },

  logout: async (): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getCurrentUser: async (): Promise<User | null> => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) return null

    // Get user details from public.users table
    const { data: userRecord } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    // Use unknown then cast to our expected structure
    const userData = userRecord as unknown as { name?: string; is_admin?: boolean };

    return {
      id: session.user.id,
      email: session.user.email!,
      name: userData?.name || session.user.user_metadata?.name,
      is_admin: userData?.is_admin || false
    }
  }
};
