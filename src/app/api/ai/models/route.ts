import { NextResponse } from 'next/server';
import { authService } from '@/services/auth';
import { createClient } from '@/services/database/supabase';
import { AI_PROVIDERS } from '@/services/ai';
import { Database } from '@/types/database';

export async function GET() {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const supabase = createClient();
    
    // Get connected providers
    const { data: keysDataRaw } = await supabase
      .from('api_keys')
      .select('provider')
      .eq('user_id', user.id);
      
    const keysData = keysDataRaw as unknown as { provider: string }[];
    const connectedProviders = keysData?.map(d => d.provider) || [];
    
    // Gather available models for connected providers
    const availableModels: Array<{ id: string; name: string; provider: string }> = [];
    connectedProviders.forEach(providerId => {
      const provider = AI_PROVIDERS[providerId];
      if (provider) {
        provider.listModels().forEach(m => {
          availableModels.push({
            id: m.id,
            name: `${provider.name} - ${m.name}`,
            provider: providerId
          });
        });
      }
    });

    // Get preferred model
    const { data: prefData } = await supabase
      .from('user_preferences')
      .select('preferred_model')
      .eq('user_id', user.id)
      .single();

    const pref = prefData as unknown as { preferred_model: string | null };

    return NextResponse.json({ 
      models: availableModels,
      preferredModel: pref?.preferred_model || (availableModels.length > 0 ? availableModels[0].id : null)
    });
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const { model } = await req.json();
    if (!model) return new NextResponse('Missing model', { status: 400 });

    const supabase = createClient();
    
    const insertData: Database['public']['Tables']['user_preferences']['Insert'] = {
      user_id: user.id,
      preferred_model: model,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('user_preferences')
      // @ts-expect-error Types mismatch due to supabase generation
      .upsert(insertData, { onConflict: 'user_id' });

    if (error) throw error;

    return new NextResponse('Preference saved', { status: 200 });
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
