'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService, User } from '@/services/auth';
import { dbService } from '@/services/database';
import { PRICING_PLANS } from '@/services/billing/plans';
import { Loader2, ExternalLink, CheckCircle2, Key, MessageCircle } from 'lucide-react';

interface SubscriptionData {
  plan: string;
  status: string;
  current_period_end: string | null;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  // AI State
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const [isKeysLoading, setIsKeysLoading] = useState(false);
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  // Telegram State
  const [telegramToken, setTelegramToken] = useState('');
  const [hasTelegramKey, setHasTelegramKey] = useState(false);
  const [telegramOpenDm, setTelegramOpenDm] = useState(false);
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);

  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
    async function loadData() {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const sub = await dbService.getUserSubscription(currentUser.id);
          if (sub) {
            setSubscription(sub as unknown as SubscriptionData);
          }
          
          await Promise.all([loadAIConfig(), loadTelegramConfig()]);
        }
      } catch (error) {
        console.error('Failed to load settings data', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  const loadAIConfig = async () => {
    try {
      const keysRes = await fetch('/api/ai/keys');
      if (keysRes.ok) {
        const keysData = await keysRes.json();
        setConnectedProviders(keysData.connectedProviders || []);
      }

      const modelsRes = await fetch('/api/ai/models');
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        setModels(modelsData.models || []);
        setSelectedModel(modelsData.preferredModel || '');
      }
    } catch (e) {
      console.error('Failed to load AI config', e);
    }
  };

  const loadTelegramConfig = async () => {
    try {
      const res = await fetch('/api/telegram/keys');
      if (res.ok) {
        const data = await res.json();
        setHasTelegramKey(data.hasTelegramKey);
        setTelegramOpenDm(data.telegramOpenDm);
      }
    } catch (e) {
      console.error('Failed to load Telegram config', e);
    }
  };

  const handleUpgrade = async () => {
    setIsBillingLoading(true);
    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: 'pro' }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Failed to start checkout', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsBillingLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsBillingLoading(true);
    try {
      const response = await fetch('/api/billing/customer-portal', { method: 'POST' });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error('No portal URL returned');
    } catch (error) {
      console.error('Failed to open customer portal', error);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setIsBillingLoading(false);
    }
  };

  const saveKey = async (provider: string, key: string) => {
    if (!key) return;
    setIsKeysLoading(true);
    try {
      const res = await fetch('/api/ai/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, key }),
      });
      
      if (res.ok) {
        setConnectedProviders(prev => Array.from(new Set([...prev, provider])));
        if (provider === 'openai') setOpenAIKey('');
        if (provider === 'anthropic') setAnthropicKey('');
        alert('Key saved successfully!');
        await loadAIConfig();
      } else {
        throw new Error('Failed to save key');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving API key');
    } finally {
      setIsKeysLoading(false);
    }
  };

  const saveModelPreference = async (modelId: string) => {
    setSelectedModel(modelId);
    try {
      await fetch('/api/ai/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId }),
      });
    } catch (e) {
      console.error('Failed to save model preference', e);
    }
  };

  const saveTelegramConfig = async () => {
    setIsTelegramLoading(true);
    try {
      const payload: Record<string, string | boolean> = { openDm: telegramOpenDm };
      if (telegramToken !== '') {
        payload.token = telegramToken;
      }

      const res = await fetch('/api/telegram/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Telegram settings saved!');
        if (telegramToken !== '') {
          setTelegramToken('');
        }
        await loadTelegramConfig();
      } else {
        throw new Error('Failed to save Telegram settings');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving Telegram settings');
    } finally {
      setIsTelegramLoading(false);
    }
  };

  const disconnectTelegram = async () => {
    setIsTelegramLoading(true);
    try {
      await fetch('/api/telegram/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: '' }),
      });
      alert('Telegram bot disconnected');
      await loadTelegramConfig();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTelegramLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  const currentPlanId = subscription?.status === 'active' ? subscription.plan : 'free';
  const currentPlan = PRICING_PLANS[currentPlanId as keyof typeof PRICING_PLANS];
  const isPro = currentPlanId === 'pro';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account settings, billing, and integrations.</p>
      </div>

      <div className="grid gap-6">
        {/* Billing Section */}
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50/50 rounded-t-xl border-b border-blue-50">
            <CardTitle>Subscription & Billing</CardTitle>
            <CardDescription>
              Manage your plan and payment methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-slate-50">
              <div>
                <p className="font-semibold text-slate-900">Current Plan: {currentPlan.name}</p>
                <p className="text-sm text-slate-500">
                  {isPro 
                    ? `Your plan automatically renews. Thank you for your support!`
                    : `You are currently on the free tier.`}
                </p>
                {subscription?.current_period_end && isPro && (
                  <p className="text-xs text-slate-400 mt-1">
                    Current period ends: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="shrink-0">
                {isPro ? (
                  <Button onClick={handleManageBilling} disabled={isBillingLoading} variant="outline">
                    {isBillingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                    Manage Billing
                  </Button>
                ) : (
                  <Button onClick={handleUpgrade} disabled={isBillingLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isBillingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Upgrade to Pro
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Telegram Integration Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
              Telegram Bot Integration
            </CardTitle>
            <CardDescription>
              Connect your own Telegram Bot via BotFather to interact with your AI models directly from Telegram.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="telegram-token" className="font-semibold">Bot Token (from @BotFather)</Label>
                {hasTelegramKey && (
                  <span className="flex items-center text-xs text-green-600 font-medium">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  id="telegram-token" 
                  type="password" 
                  placeholder={hasTelegramKey ? "••••••••••••••••••••••••" : "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"}
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                />
              </div>

              {hasTelegramKey && user && (
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm">
                  <p className="font-semibold text-blue-900 mb-2">Webhook URL Setup</p>
                  <p className="text-blue-800 mb-2">To complete setup, run this URL once in your browser to tell Telegram where to send messages:</p>
                  <code className="block p-2 bg-white rounded border border-blue-200 text-xs break-all text-slate-600">
                    https://api.telegram.org/bot[YOUR_TOKEN]/setWebhook?url={baseUrl}/api/telegram/webhook/{user.id}
                  </code>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2 border-t">
                <input
                  type="checkbox"
                  id="open-dm"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  checked={telegramOpenDm}
                  onChange={(e) => setTelegramOpenDm(e.target.checked)}
                />
                <Label htmlFor="open-dm" className="font-normal cursor-pointer">
                  Enable AI responses in Direct Messages with the bot
                </Label>
              </div>

              <div className="flex justify-between pt-2">
                {hasTelegramKey ? (
                  <Button variant="destructive" onClick={disconnectTelegram} disabled={isTelegramLoading}>
                    Disconnect Bot
                  </Button>
                ) : <div/>}
                <Button onClick={saveTelegramConfig} disabled={isTelegramLoading}>
                  {isTelegramLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Telegram Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Integrations Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2 h-5 w-5 text-slate-500" />
              AI Integrations
            </CardTitle>
            <CardDescription>
              Connect your own API keys to use AI features. Keys are encrypted at rest.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* OpenAI Key */}
            <div className="space-y-2 pb-4 border-b">
              <div className="flex items-center justify-between">
                <Label htmlFor="openai-key" className="font-semibold">OpenAI API Key</Label>
                {connectedProviders.includes('openai') && (
                  <span className="flex items-center text-xs text-green-600 font-medium">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  id="openai-key" 
                  type="password" 
                  placeholder={connectedProviders.includes('openai') ? "••••••••••••••••••••••••" : "sk-..."}
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                />
                <Button 
                  onClick={() => saveKey('openai', openAIKey)} 
                  disabled={!openAIKey || isKeysLoading}
                  variant="secondary"
                >
                  Save
                </Button>
              </div>
            </div>

            {/* Anthropic Key */}
            <div className="space-y-2 pb-4 border-b">
              <div className="flex items-center justify-between">
                <Label htmlFor="anthropic-key" className="font-semibold">Anthropic API Key</Label>
                {connectedProviders.includes('anthropic') && (
                  <span className="flex items-center text-xs text-green-600 font-medium">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  id="anthropic-key" 
                  type="password" 
                  placeholder={connectedProviders.includes('anthropic') ? "••••••••••••••••••••••••" : "sk-ant-..."}
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                />
                <Button 
                  onClick={() => saveKey('anthropic', anthropicKey)} 
                  disabled={!anthropicKey || isKeysLoading}
                  variant="secondary"
                >
                  Save
                </Button>
              </div>
            </div>

            {/* Default Model Selection */}
            {models.length > 0 ? (
              <div className="space-y-2">
                <Label htmlFor="default-model" className="font-semibold">Default AI Model</Label>
                <select 
                  id="default-model"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50"
                  value={selectedModel}
                  onChange={(e) => saveModelPreference(e.target.value)}
                >
                  <option value="" disabled>Select a default model</option>
                  {models.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">This model will be used by default in your dashboard and Telegram bot.</p>
              </div>
            ) : (
              <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded border">
                Connect an API key above to select your default AI model.
              </div>
            )}

          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
