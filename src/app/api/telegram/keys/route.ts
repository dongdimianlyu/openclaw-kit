import { NextResponse } from 'next/server';
import { authService } from '@/services/auth';
import { createClient } from '@/services/database/supabase';
import { encrypt } from '@/services/security/encryption';
import { Database } from '@/types/database';

export async function GET() {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const supabase = createClient();
    
    const [keysResponse, prefResponse] = await Promise.all([
      supabase.from('api_keys').select('provider').eq('user_id', user.id).eq('provider', 'telegram').single(),
      supabase.from('user_preferences').select('telegram_open_dm').eq('user_id', user.id).single()
    ]);

    const prefData = prefResponse.data as unknown as { telegram_open_dm?: boolean };

    return NextResponse.json({ 
      hasTelegramKey: !!keysResponse.data,
      telegramOpenDm: prefData?.telegram_open_dm || false
    });
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const { token, openDm } = await req.json();
    const supabase = createClient();

    // Handle token update if provided
    if (token !== undefined) {
      if (token === '') {
        // Delete key
        await supabase.from('api_keys').delete().eq('user_id', user.id).eq('provider', 'telegram');
      } else {
        const encryptedKey = encrypt(token);
        
        const keyData: Database['public']['Tables']['api_keys']['Insert'] = {
          user_id: user.id,
          provider: 'telegram',
          encrypted_key: encryptedKey
        };
        
        // @ts-expect-error Types mismatch due to supabase generation
        await supabase.from('api_keys').upsert(keyData, { onConflict: 'user_id,provider' });
      }
    }

    // Handle preference update if provided
    if (openDm !== undefined) {
      const prefData: Database['public']['Tables']['user_preferences']['Insert'] = {
        user_id: user.id,
        telegram_open_dm: openDm,
        updated_at: new Date().toISOString()
      };
      
      // @ts-expect-error Types mismatch due to supabase generation
      await supabase.from('user_preferences').upsert(prefData, { onConflict: 'user_id' });
    }

    return new NextResponse('Saved successfully', { status: 200 });
  } catch (error) {
    console.error('Error saving telegram config', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
