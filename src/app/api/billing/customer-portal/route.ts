import { NextResponse } from 'next/server';
import { authService } from '@/services/auth';
import { dbService } from '@/services/database';
import { billingService } from '@/services/billing';

export async function POST(request: Request) {
  try {
    const user = await authService.getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const subscription = await dbService.getUserSubscription(user.id);
    const subData = subscription as unknown as { stripe_customer_id?: string };
    
    if (!subData?.stripe_customer_id) {
      return new NextResponse('No active billing account found', { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${origin}/dashboard/settings`;

    const { url } = await billingService.createCustomerPortal({
      customerId: subData.stripe_customer_id,
      returnUrl,
    });

    return NextResponse.json({ url });
  } catch (error: unknown) {
    console.error('Error creating customer portal session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(errorMessage, { status: 500 });
  }
}
