import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, AIProviderResponse } from '../types';

export const anthropicProvider: AIProvider = {
  name: 'Anthropic',
  id: 'anthropic',
  
  sendMessage: async (apiKey: string, model: string, prompt: string): Promise<AIProviderResponse> => {
    const client = new Anthropic({ apiKey });
    
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return {
      model,
      response_text: responseText,
      token_usage: response.usage.input_tokens + response.usage.output_tokens,
      provider: 'anthropic',
    };
  },

  listModels: () => [
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
    { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
  ],
};
