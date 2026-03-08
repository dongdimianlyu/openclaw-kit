import OpenAI from 'openai';
import { AIProvider, AIProviderResponse } from '../types';

export const openAIProvider: AIProvider = {
  name: 'OpenAI',
  id: 'openai',
  
  sendMessage: async (apiKey: string, model: string, prompt: string): Promise<AIProviderResponse> => {
    const client = new OpenAI({ apiKey });
    
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      model,
      response_text: response.choices[0]?.message?.content || '',
      token_usage: response.usage?.total_tokens || 0,
      provider: 'openai',
    };
  },

  listModels: () => [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  ],
};
