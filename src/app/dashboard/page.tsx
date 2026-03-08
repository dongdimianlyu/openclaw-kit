'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, CreditCard, Key, Activity, Calendar, Send, Loader2 } from 'lucide-react';
import { authService, User } from '@/services/auth';
import { dbService } from '@/services/database';

interface SubscriptionData {
  plan: string;
  status: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // AI Interface State
  const [prompt, setPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    text: string;
    model: string;
    tokens: number;
    error?: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const sub = await dbService.getUserSubscription(currentUser.id);
          if (sub) {
            setSubscription(sub as unknown as SubscriptionData);
          }
        }
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setAiResponse({
        text: data.response_text,
        model: data.model,
        tokens: data.token_usage,
      });
      setPrompt('');
    } catch (error: unknown) {
      setAiResponse({
        text: '',
        model: '',
        tokens: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user?.name || user?.email}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account Details</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium truncate" title={user?.email}>{user?.email}</div>
            <p className="text-xs text-slate-500 mt-1">Logged in via Supabase</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold capitalize">{subscription?.plan || 'Free'} Plan</div>
            <p className="text-xs text-slate-500 capitalize">
              Status: {subscription?.status || 'Active'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account ID</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xs font-mono break-all bg-slate-50 p-1 rounded border">
              {user?.id}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* AI Interface */}
        <Card className="col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              AI Assistant Playground
            </CardTitle>
            <CardDescription>
              Test your configured API keys and models here. Make sure you set a default model in Settings first.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {aiResponse && (
              <div className="mb-6 space-y-4">
                {aiResponse.error ? (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    <p className="font-semibold mb-1">Error</p>
                    {aiResponse.error}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="p-4 bg-slate-50 rounded-lg border text-sm whitespace-pre-wrap">
                      {aiResponse.text}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 px-1">
                      <span><strong>Model:</strong> {aiResponse.model}</span>
                      <span><strong>Tokens used:</strong> {aiResponse.tokens}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!aiResponse && !isAiLoading && (
              <div className="h-32 flex items-center justify-center text-slate-400 text-sm border-2 border-dashed rounded-lg">
                Enter a prompt below to see the AI response.
              </div>
            )}
            
            {isAiLoading && (
              <div className="h-32 flex flex-col items-center justify-center text-slate-400 space-y-3 border-2 border-dashed rounded-lg bg-slate-50">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-sm">Generating response...</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <form onSubmit={handleSendPrompt} className="flex w-full gap-2">
              <Input 
                placeholder="Ask the AI something..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isAiLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isAiLoading || !prompt.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/dashboard/settings'}>
              <Key className="mr-2 h-4 w-4" /> Configure API Keys
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Zap className="mr-2 h-4 w-4" /> View Usage Docs
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/dashboard/settings'}>
              <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
