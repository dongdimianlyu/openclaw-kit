'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Github, Check } from 'lucide-react';

export function PricingSection() {
  const [githubUsername, setGithubUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!githubUsername) {
      setError('Please enter your GitHub username');
      return;
    }

    // Validate GitHub username format locally before redirect
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(githubUsername)) {
      setError('Invalid GitHub username format');
      return;
    }

    router.push(`/checkout?github=${encodeURIComponent(githubUsername)}`);
  };

  const features = [
    'Full Next.js + TypeScript source code (strict mode)',
    'Google OAuth login & session management',
    'Stripe or Lemon Squeezy billing (subscriptions, webhooks & portal)',
    'Admin dashboard with user & instance management',
    'Fly.io cloud deployment with automatic resource allocation',
    'Automatic HTTPS with zero configuration',
    'Postgres database with row-level security',
    'AI model selection (Anthropic & OpenAI) with per-model indicators',
    'AES-256 encryption for API keys and sensitive data at rest',
    'Telegram bot integration with open DM mode',
    'White-label branding via environment variables',
    'Setup wizard & step-by-step documentation',
    'Lifetime updates, no subscription',
    'Unlimited products, clone for each brand'
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#0a0a0a] text-white min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient and texture */}
      <div className="absolute inset-0 bg-ultra z-0 opacity-50"></div>
      <div className="particle-bg z-0 opacity-50"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-black border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-8 sm:p-12 text-center border-b border-white/5 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <p className="text-sm font-medium tracking-widest text-slate-400 uppercase mb-4">ONE-TIME PAYMENT</p>
            <div className="flex items-center justify-center gap-x-4">
              <span className="text-4xl font-semibold tracking-tight text-slate-500 line-through">$299</span>
              <span className="text-6xl font-bold tracking-tight text-white">$149</span>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 text-left">
            <ul role="list" className="grid grid-cols-1 gap-4 text-sm leading-6 text-slate-300">
              {features.map((feature) => (
                <li key={feature} className="flex gap-x-4 items-start">
                  <Check className="h-5 w-5 flex-none text-red-500 mt-0.5" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-white/5">
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Github className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <Input
                      id="github-username"
                      type="text"
                      placeholder="Enter your GitHub username..."
                      className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-full focus:ring-blue-500 focus:border-blue-500"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
                
                <button
                  type="submit"
                  className="mt-6 w-full px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center ultra-button"
                >
                  Get ClawWrapper
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
