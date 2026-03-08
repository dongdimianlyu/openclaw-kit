import { NextResponse } from 'next/server';
import { stripe } from '@/services/billing/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    console.error('Webhook signature verification failed', errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Use service role key for webhooks to bypass RLS, fallback to anon key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.metadata?.userId && session.metadata?.planId) {
          // Retrieve the subscription to get the exact end date
          const subResponse = await stripe.subscriptions.retrieve(session.subscription as string);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentPeriodEnd = (subResponse as any).current_period_end;
          
          await supabase.from('subscriptions').upsert({
            user_id: session.metadata.userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            status: subResponse.status,
            plan: session.metadata.planId,
            current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
          }, { onConflict: 'user_id' });
        }
        break;
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subscriptionObj = event.data.object as any;
        const status = subscriptionObj.status;
        const currentPeriodEnd = subscriptionObj.current_period_end;
        const customer = subscriptionObj.customer;
        
        // Find user by stripe customer ID
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customer as string)
          .single();

        if (existingSub) {
          await supabase.from('subscriptions').update({
            status: status,
            current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
          }).eq('stripe_customer_id', customer as string);
        }
        break;
      }
    }

    return new NextResponse('Webhook handled successfully', { status: 200 });
  } catch (error: unknown) {
    console.error('Error handling webhook', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
