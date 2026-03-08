import { NextResponse } from 'next/server';
import { authService } from '@/services/auth';
import { billingService } from '@/services/billing';
import { PlanId } from '@/services/billing/plans';

export async function POST(request: Request) {
  try {
    const user = await authService.getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { planId } = await request.json() as { planId: PlanId };
    
    if (!planId) {
      return new NextResponse('Plan ID is required', { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${origin}/dashboard`;

    const { url } = await billingService.createCheckoutSession({
      userId: user.id,
      email: user.email,
      planId,
      returnUrl,
    });

    return NextResponse.json({ url });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(errorMessage, { status: 500 });
  }
}
