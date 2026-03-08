import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(req: Request) {
  try {
    const { githubUsername } = await req.json();

    if (!githubUsername) {
      return new NextResponse('GitHub username is required', { status: 400 });
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;

    if (!priceId) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PRO_PRICE_ID environment variable');
      return new NextResponse('Server configuration error', { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // 'payment' for one-time, 'subscription' if price is recurring
      success_url: `${baseUrl}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      metadata: {
        github_username: githubUsername,
        type: 'boilerplate_purchase'
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
