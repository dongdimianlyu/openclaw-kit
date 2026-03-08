import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse('Checkout coming soon', { status: 501 });
}
