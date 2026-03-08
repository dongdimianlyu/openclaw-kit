export interface AIProviderResponse {
  model: string;
  response_text: string;
  token_usage: number;
  provider: string;
}

export interface AIProvider {
  name: string;
  id: string;
  sendMessage: (apiKey: string, model: string, prompt: string) => Promise<AIProviderResponse>;
  listModels: () => { id: string; name: string }[];
}
