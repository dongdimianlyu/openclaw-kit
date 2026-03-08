import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
// import { githubService } from '@/services/github';

export async function POST() {
  return new NextResponse('Webhook disabled', { status: 501 });

  /* 
  // TODO: Implement with Paddle
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
  );

  const githubUsername = '...'; // Get from Paddle webhook
  const sessionId = '...'; // Get from Paddle webhook

  try {
    // 1. Log the purchase initially as pending
    await supabase.from('purchases').insert([{
      github_username: githubUsername,
      stripe_session_id: sessionId, // TODO: change to paddle_session_id
      invite_status: 'pending'
    }]);

    // 2. Call GitHub API to invite the user
    await githubService.inviteUserToRepo(githubUsername);

    // 3. Update status to sent
    await supabase.from('purchases')
      .update({ invite_status: 'sent' })
      .eq('stripe_session_id', sessionId); // TODO: change to paddle_session_id
      
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send invite';
    console.error('Failed to process purchase delivery:', errorMsg);
    
    await supabase.from('purchases')
      .update({ 
        invite_status: 'failed',
        error_message: errorMsg 
      })
      .eq('stripe_session_id', sessionId); // TODO: change to paddle_session_id
  }
  */
}
