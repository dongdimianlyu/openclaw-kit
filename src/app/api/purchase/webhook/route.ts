import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { inviteToGithubRepo } from '@/services/github';
import { createClient } from '@supabase/supabase-js';

// Verify Paddle webhook signature
function verifySignature(req: Request, rawBody: string): boolean {
  const signature = req.headers.get('paddle-signature');
  if (!signature) return false;

  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('PADDLE_WEBHOOK_SECRET is not set');
    return false;
  }

  // Parse the paddle-signature header
  // Format: ts=1234567890;h1=abcd...
  const parts = signature.split(';');
  let ts = '';
  let h1 = '';

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 'ts') ts = value;
    if (key === 'h1') h1 = value;
  }

  if (!ts || !h1) return false;

  const payload = `${ts}:${rawBody}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const computedSignature = hmac.digest('hex');

  return computedSignature === h1;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    
    // Verify signature
    if (!verifySignature(req, rawBody)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle transaction.completed event
    if (event.event_type === 'transaction.completed') {
      const transaction = event.data;
      const githubUsername = transaction.custom_data?.github_username;
      const transactionId = transaction.id;
      
      if (!githubUsername) {
        console.error('No github_username found in transaction custom_data');
        return NextResponse.json({ error: 'No github_username found' }, { status: 400 });
      }

      console.log(`Processing successful payment for GitHub user: ${githubUsername}`);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      let supabase = null;
      if (supabaseUrl && supabaseKey) {
        supabase = createClient(supabaseUrl, supabaseKey);
      } else {
        console.warn('Supabase credentials missing, skipping purchase logging');
      }

      if (supabase) {
        try {
          await supabase.from('purchases').insert([{
            github_username: githubUsername,
            paddle_transaction_id: transactionId,
            invite_status: 'pending',
            purchase_timestamp: new Date().toISOString()
          }]);
        } catch (dbError) {
          console.error('Failed to log purchase:', dbError);
        }
      }

      try {
        await inviteToGithubRepo(githubUsername);
        console.log(`Successfully invited ${githubUsername} to repo`);
        
        if (supabase) {
          await supabase.from('purchases')
            .update({ invite_status: 'sent' })
            .eq('paddle_transaction_id', transactionId);
        }
      } catch (error) {
        console.error('Failed to invite to GitHub:', error);
        
        if (supabase) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          await supabase.from('purchases')
            .update({ 
              invite_status: 'failed',
              error_message: errorMsg
            })
            .eq('paddle_transaction_id', transactionId);
        }
        
        // Note: Even if GitHub invite fails, we return 200 to Paddle so it doesn't retry infinitely
        // In a production system, we'd log this to DB to retry later
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
