'use client';

import { Navbar } from '@/components/layout/Navbar';
import { BuiltWith } from '@/components/BuiltWith';
import { PricingSection } from '@/components/pricing/PricingSection';
import { Database, CreditCard, Rocket, Lock, MessageCircle, Zap } from 'lucide-react';
import { appConfig } from '@/lib/config';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020617] text-white font-sans relative overflow-hidden">
      {/* Background with offset gradient and better noise texture */}
      <div className="absolute inset-0 bg-ultra z-0"></div>
      <div className="particle-bg z-0 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 sm:py-32 lg:pb-32 xl:pb-36 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="mx-auto max-w-3xl lg:max-w-4xl">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-white/80 bg-white/5 ring-1 ring-inset ring-white/10 mb-8 backdrop-blur-sm">
                  🚀 The Ultimate AI SaaS Starter Kit
                </div>
                <h1 className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl mb-6">
                  Skip the setup<br/>
                  <span className="landing-text-gradient">Build Your ClawKit Wrapper 3x Faster</span>
                </h1>
                <p className="mt-6 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto mb-10">
                  Don’t waste time building OAuth, payments, and deployment from ground up. Get a ClawKit that lets you launch and monetize immediately.
                </p>
                
                <Link href="#pricing">
                  <button className="ultra-button px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </section>

          <BuiltWith />

          {/* Comparison Section */}
          <section className="py-20 sm:py-32 bg-black/40 backdrop-blur-md border-y border-white/5 relative z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center mb-16">
                <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Launch a ClawKit Wrapper Without Weeks of Setup
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Starting a ClawKit wrapper business normally requires building the entire SaaS foundation yourself — authentication, payments, deployment infrastructure, and integrations.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-300 font-medium">
                  ClawKit gives you the entire foundation ready to customize and launch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {/* Without Dev Kit */}
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">If You Build Everything Yourself</h3>
                  </div>
                  <p className="text-sm font-medium text-red-400 mb-8">Expect several weeks of development</p>
                  
                  <ul className="space-y-4">
                    {[
                      'Initialize a Next.js + TypeScript + Tailwind project and configure the architecture',
                      'Implement Google OAuth authentication and persistent user sessions',
                      'Integrate subscription billing with Stripe or Lemon Squeezy, including checkout flows and webhooks',
                      'Develop an admin dashboard for monitoring users and platform activity',
                      'Set up Supabase authentication, database schema, and row-level security',
                      'Configure cloud hosting and automated deployment infrastructure',
                      'Handle SSL certificates and HTTPS configuration',
                      'Add AI model integrations such as OpenAI and Anthropic',
                      'Build Telegram bot functionality for user interaction',
                      'Implement secure storage and encryption for API keys',
                      'Write documentation, setup scripts, and onboarding instructions'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-300">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                        <span className="text-sm leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* With Dev Kit */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">With ClawKit</h3>
                  </div>
                  <p className="text-sm font-medium text-emerald-400 mb-8">Go from idea to launch in days</p>
                  
                  <ul className="space-y-4 mb-10">
                    {[
                      'Clone the repository and configure your environment variables',
                      'Connect your preferred billing provider along with your Supabase and Fly.io accounts',
                      'Run the setup script and deploy your wrapper'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-200">
                        <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-sm leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-emerald-500/20 pt-8">
                    <h4 className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-6">What You Get After Setup</h4>
                    <ul className="space-y-4">
                      {[
                        'A fully deployed ClawKit wrapper SaaS capable of accepting payments',
                        'A built-in admin dashboard to manage users and platform data',
                        'Complete source code ownership with no vendor lock-in',
                        'A production-ready stack with automatic HTTPS, SEO support, and health monitoring',
                        'Pre-built integrations for AI models, authentication, payments, and infrastructure'
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-200">
                          <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                          <span className="text-sm leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  <span className="landing-text-gradient">Everything inside the box</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Stop wasting weeks wiring up external APIs. The repository includes everything you need to launch a paid AI tool this weekend.
                </p>
              </div>
              
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <Database className="h-6 w-6 flex-none text-blue-400" />
                      Auth & Database
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Fully configured Supabase integration with Row Level Security, user dashboards, and admin panels.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <CreditCard className="h-6 w-6 flex-none text-blue-400" />
                      Stripe Billing
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Accept payments immediately with pre-built Checkout and Customer Portal webhook handlers.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <Rocket className="h-6 w-6 flex-none text-blue-400" />
                      AI Provider Routing
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Unified interfaces for OpenAI and Anthropic, including usage tracking and model selection.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <Lock className="h-6 w-6 flex-none text-blue-400" />
                      Bring Your Own Key
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Secure encryption pipeline allowing your end-users to input their own API keys safely.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <MessageCircle className="h-6 w-6 flex-none text-blue-400" />
                      Telegram Bots
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Give every user their own AI chatbot. Built-in webhooks handle Telegram message routing automatically.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                      <Zap className="h-6 w-6 flex-none text-blue-400" />
                      1-Click Deploy
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">Included scripts automatically generate Dockerfiles and deploy your full stack to Fly.io.</p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <div id="pricing">
            <PricingSection />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 bg-black/20 backdrop-blur-sm mt-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <span className="font-semibold text-white text-lg">{appConfig.name}</span>
              </div>
              <div className="flex space-x-6 text-sm text-slate-400 mb-4 sm:mb-0">
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/legal/refund" className="hover:text-white transition-colors">Refunds</Link>
              </div>
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} {appConfig.companyName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
