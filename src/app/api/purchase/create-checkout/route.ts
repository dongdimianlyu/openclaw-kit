import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { githubUsername } = await req.json();

    if (!githubUsername || typeof githubUsername !== 'string') {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      );
    }

    // Validate GitHub username format
    // Alphanumeric with single hyphens, no consecutive hyphens, no leading/trailing hyphens, max 39 chars
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(githubUsername)) {
      return NextResponse.json(
        { error: 'Invalid GitHub username format' },
        { status: 400 }
      );
    }

    const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
    const PADDLE_PRICE_ID = process.env.PADDLE_PRICE_ID;

    if (!PADDLE_API_KEY || !PADDLE_PRICE_ID) {
      console.error('Missing Paddle environment variables');
      return NextResponse.json(
        { error: 'Internal server error - Payment config missing' },
        { status: 500 }
      );
    }

    // Normalize API key in case env already includes a "Bearer" prefix or surrounding quotes.
    const paddleApiKey = PADDLE_API_KEY.replace(/^Bearer\s+/i, '').replace(/^"|"$/g, '').trim();

    const priceIdPattern = /^pri_[a-z\d]{26}$/;
    if (!priceIdPattern.test(PADDLE_PRICE_ID)) {
      console.error('Paddle price ID is invalid format:', PADDLE_PRICE_ID);
      return NextResponse.json(
        { error: 'Payment configuration error: price ID is invalid. It should look like pri_ followed by 26 lowercase letters or digits.' },
        { status: 500 }
      );
    }

    // Call Paddle API to create a checkout transaction (live)
    const response = await fetch('https://api.paddle.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paddleApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Paddle-Version': '1',
      },
      body: JSON.stringify({
        items: [
          {
            price_id: PADDLE_PRICE_ID,
            quantity: 1,
          },
        ],
        custom_data: {
          github_username: githubUsername,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let firstErrorDetail = '';

      try {
        const parsed = JSON.parse(errorText);
        firstErrorDetail = parsed?.error?.errors?.[0]?.detail || parsed?.error?.detail || '';
        console.error('Paddle API error:', JSON.stringify(parsed, null, 2));
      } catch (parseErr) {
        console.error('Paddle API error (unparsed):', errorText, parseErr);
      }

      return NextResponse.json(
        { error: firstErrorDetail || 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // In Paddle Billing, automatically-collected transactions include a checkout payment link 
    // returned as checkout.url if there is a default payment link configured.
    let checkoutUrl = data?.data?.checkout?.url;

    if (!checkoutUrl) {
      // If still missing, fallback to transaction ID payment link
      const transactionId = data?.data?.id;
      if (transactionId) {
        checkoutUrl = `https://checkout.paddle.com/checkout/transactions/${transactionId}`;
      } else {
        console.error('Paddle response missing checkout URL:', JSON.stringify(data, null, 2));
        return NextResponse.json(
          { error: 'Failed to create checkout: no checkout URL returned. Ensure default payment link is set in Paddle.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
