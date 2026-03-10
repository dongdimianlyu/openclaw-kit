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
    <section className="py-12 sm:py-20 bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient and texture */}
      <div className="absolute inset-0 bg-ultra z-0 opacity-50"></div>
      <div className="particle-bg z-0 opacity-50"></div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="mx-auto max-w-xl rounded-[1.5rem] bg-black border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 text-center border-b border-white/5 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <p className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-3">ONE-TIME PAYMENT</p>
            <div className="flex items-center justify-center gap-x-3">
              <span className="text-3xl font-semibold tracking-tight text-slate-500 line-through">$299</span>
              <span className="text-5xl font-bold tracking-tight text-white">$129</span>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 text-left">
            <ul role="list" className="grid grid-cols-1 gap-3 text-sm leading-5 text-slate-300">
              {features.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-start">
                  <Check className="h-4 w-4 flex-none text-red-500 mt-0.5" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
              <form onSubmit={handlePurchase} className="space-y-3">
                <div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Github className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </div>
                    <Input
                      id="github-username"
                      type="text"
                      placeholder="Enter your GitHub username..."
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-full focus:ring-blue-500 focus:border-blue-500"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
                
                <button
                  type="submit"
                  className="mt-4 w-full px-6 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center ultra-button"
                >
                  Get ClawKit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
