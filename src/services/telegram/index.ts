import TelegramBot from 'node-telegram-bot-api';
import { createClient } from '@supabase/supabase-js';
import { decrypt } from '../security/encryption';
import { getProvider } from '../ai';

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);

export const telegramService = {
  processWebhook: async (token: string, body: unknown) => {
    // In a real production scenario, we'd want to cache the decrypted token or use it here
    const bot = new TelegramBot(token);
    bot.processUpdate(body as TelegramBot.Update);
  },

  handleMessage: async (userId: string, chatId: string, text: string) => {
    const supabase = getSupabase();
    try {
      // 1. Log incoming message
      await supabase.from('telegram_messages').insert({
        user_id: userId,
        chat_id: chatId.toString(),
        is_bot: false,
      } as unknown as { user_id: string; chat_id: string; is_bot: boolean });

      // 2. Fetch User Preferences and API Keys
      const { data: prefData } = await supabase
        .from('user_preferences')
        .select('preferred_model, telegram_open_dm')
        .eq('user_id', userId)
        .single();
        
      const pref = prefData as unknown as { preferred_model: string | null; telegram_open_dm: boolean };
      if (!pref?.telegram_open_dm) {
        return "DM mode is currently disabled in your ClawKit dashboard.";
      }

      const modelId = pref?.preferred_model;
      if (!modelId) return "Please set a default AI model in your dashboard.";

      // 3. Find correct provider
      const { data: keysData } = await supabase
        .from('api_keys')
        .select('provider, encrypted_key')
        .eq('user_id', userId);
        
      if (!keysData || keysData.length === 0) return "No API keys configured.";
      
      // Determine provider from model (basic matching)
      let providerName = '';
      if (modelId.includes('gpt')) providerName = 'openai';
      if (modelId.includes('claude')) providerName = 'anthropic';

      const keyRecord = keysData.find(k => k.provider === providerName) as unknown as { provider: string; encrypted_key: string };
      if (!keyRecord) return `No API key found for provider: ${providerName}`;

      const apiKey = decrypt(keyRecord.encrypted_key);
      const aiProvider = getProvider(providerName);

      // 4. Send to AI
      const aiResponse = await aiProvider.sendMessage(apiKey, modelId, text);

      // 5. Log outgoing AI usage and Telegram message
      await supabase.from('ai_usage').insert({
        user_id: userId,
        provider: aiResponse.provider,
        model: aiResponse.model,
        tokens_used: aiResponse.token_usage,
      } as unknown as { user_id: string; provider: string; model: string; tokens_used: number });

      await supabase.from('telegram_messages').insert({
        user_id: userId,
        chat_id: chatId.toString(),
        is_bot: true,
      } as unknown as { user_id: string; chat_id: string; is_bot: boolean });

      return aiResponse.response_text;
    } catch (error: unknown) {
      console.error('Telegram Handle Error', error);
      return "An error occurred while processing your request.";
    }
  }
};
