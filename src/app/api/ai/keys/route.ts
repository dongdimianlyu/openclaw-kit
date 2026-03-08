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
    const { data } = await supabase
      .from('api_keys')
      .select('provider')
      .eq('user_id', user.id);

    const keysData = data as unknown as { provider: string }[];
    const connectedProviders = keysData?.map(d => d.provider) || [];
    
    return NextResponse.json({ connectedProviders });
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const { provider, key } = await req.json();
    if (!provider || !key) return new NextResponse('Missing fields', { status: 400 });

    const encryptedKey = encrypt(key);
    const supabase = createClient();

    const insertData: Database['public']['Tables']['api_keys']['Insert'] = {
      user_id: user.id,
      provider,
      encrypted_key: encryptedKey
    };

    const { error } = await supabase
      .from('api_keys')
      // @ts-expect-error Types mismatch due to supabase generation
      .upsert(insertData, { onConflict: 'user_id,provider' });

    if (error) throw error;

    return new NextResponse('Key saved successfully', { status: 200 });
  } catch (error) {
    console.error('Error saving key', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
