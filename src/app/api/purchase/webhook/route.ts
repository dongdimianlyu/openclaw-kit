import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { githubService } from '@/services/github';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
    );

    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown signature error';
      console.error('Webhook signature verification failed.', errorMsg);
      return new NextResponse(`Webhook Error: ${errorMsg}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Ensure this is a boilerplate purchase
      if (session.metadata?.type !== 'boilerplate_purchase') {
        return new NextResponse('Ignored non-boilerplate purchase', { status: 200 });
      }

      const githubUsername = session.metadata.github_username;
      
      if (!githubUsername) {
        console.error('No github_username found in session metadata', session.id);
        return new NextResponse('OK', { status: 200 });
      }

      try {
        // 1. Log the purchase initially as pending
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore supabase typings might not be updated
        await supabase.from('purchases').insert([{
          github_username: githubUsername,
          stripe_session_id: session.id,
          invite_status: 'pending'
        }]);

        // 2. Call GitHub API to invite the user
        await githubService.inviteUserToRepo(githubUsername);

        // 3. Update status to sent
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore supabase typings might not be updated
        await supabase.from('purchases')
          .update({ invite_status: 'sent' })
          .eq('stripe_session_id', session.id);
          
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to send invite';
        console.error('Failed to process purchase delivery:', errorMsg);
        
        // Mark as failed in DB so admin can retry manually
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore supabase typings might not be updated
        await supabase.from('purchases')
          .update({ 
            invite_status: 'failed',
            error_message: errorMsg 
          })
          .eq('stripe_session_id', session.id);
      }
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
