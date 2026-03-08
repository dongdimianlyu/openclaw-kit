import { openAIProvider } from './providers/openai';
import { anthropicProvider } from './providers/anthropic';
import { AIProvider } from './types';

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: openAIProvider,
  anthropic: anthropicProvider,
};

export const getProvider = (providerId: string): AIProvider => {
  const provider = AI_PROVIDERS[providerId];
  if (!provider) {
    throw new Error(`Provider ${providerId} not found`);
  }
  return provider;
};

export const getAllModels = () => {
  const models: Array<{ provider: string; id: string; name: string }> = [];
  
  Object.values(AI_PROVIDERS).forEach(provider => {
    provider.listModels().forEach(model => {
      models.push({
        provider: provider.id,
        id: model.id,
        name: `${provider.name} - ${model.name}`
      });
    });
  });
  
  return models;
};
