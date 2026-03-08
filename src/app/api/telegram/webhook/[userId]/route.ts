import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { decrypt } from '@/services/security/encryption';
import TelegramBot from 'node-telegram-bot-api';
import { telegramService } from '@/services/telegram';

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321', // Fallback for build time
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
    );

    const { userId } = params;
    const body = await req.json();

    if (!body.message || !body.message.text) {
      return new NextResponse('OK', { status: 200 }); // Ignore non-text
    }

    const chatId = body.message.chat.id;
    const text = body.message.text;

    // Get user's Telegram Token
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('encrypted_key')
      .eq('user_id', userId)
      .eq('provider', 'telegram')
      .single();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenRecord = keyData as any;
    
    if (!tokenRecord || !tokenRecord.encrypted_key) {
      console.error('No telegram token for user', userId);
      return new NextResponse('Not Configured', { status: 400 });
    }

    const token = decrypt(tokenRecord.encrypted_key);
    
    // Process the message and get AI response
    const responseText = await telegramService.handleMessage(userId, chatId, text);
    
    // Send response back via Telegram API
    const bot = new TelegramBot(token, { polling: false });
    await bot.sendMessage(chatId, responseText);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Telegram Webhook Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
