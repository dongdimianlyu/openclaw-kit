import { NextResponse } from 'next/server';

// Stripe checkout disabled; returning 410 to signal removal.
export async function POST() {
  return new NextResponse('Stripe checkout removed. Paddle integration pending.', { status: 410 });
}
