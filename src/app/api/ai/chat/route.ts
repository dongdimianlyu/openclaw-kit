import { NextResponse } from 'next/server';
import { authService } from '@/services/auth';
import { createClient } from '@/services/database/supabase';
import { getProvider, getAllModels } from '@/services/ai';
import { decrypt } from '@/services/security/encryption';
import { billingAccess } from '@/services/billing/access';
import { Database } from '@/types/database';

export async function POST(req: Request) {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const { prompt, modelId } = await req.json();
    if (!prompt) return new NextResponse('Missing prompt', { status: 400 });

    const supabase = createClient();
    
    // 1. Determine model to use
    let targetModelId = modelId;
    if (!targetModelId) {
      const { data: prefData } = await supabase
        .from('user_preferences')
        .select('preferred_model')
        .eq('user_id', user.id)
        .single();
      const pref = prefData as unknown as { preferred_model: string | null };
      targetModelId = pref?.preferred_model;
    }

    if (!targetModelId) {
      return new NextResponse('No model selected', { status: 400 });
    }

    // 2. Find provider for this model
    const allModels = getAllModels();
    const modelConfig = allModels.find(m => m.id === targetModelId);
    
    if (!modelConfig) {
      return new NextResponse('Invalid model selected', { status: 400 });
    }

    // 3. Billing checks
    // E.g., limit gpt-4o and opus to pro plan
    if (targetModelId.includes('gpt-4') || targetModelId.includes('opus')) {
      const isPro = await billingAccess.isProUser(user.id);
      if (!isPro) {
        return NextResponse.json({ 
          error: 'This model requires a Pro subscription.' 
        }, { status: 403 });
      }
    }

    // 4. Retrieve API key
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('encrypted_key')
      .eq('user_id', user.id)
      .eq('provider', modelConfig.provider)
      .single();

    const keyRecord = keyData as unknown as { encrypted_key?: string };

    if (!keyRecord || !keyRecord.encrypted_key) {
      return NextResponse.json({ 
        error: `No API key configured for ${modelConfig.provider}` 
      }, { status: 400 });
    }

    const apiKey = decrypt(keyRecord.encrypted_key);

    // 5. Route to provider
    const aiProvider = getProvider(modelConfig.provider);
    const response = await aiProvider.sendMessage(apiKey, modelConfig.id, prompt);

    // 6. Log usage
    const insertData: Database['public']['Tables']['ai_usage']['Insert'] = {
      user_id: user.id,
      provider: response.provider,
      model: response.model,
      tokens_used: response.token_usage,
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await supabase.from('ai_usage').insert(insertData as any);

    return NextResponse.json(response);

  } catch (error: unknown) {
    console.error('AI Chat Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
