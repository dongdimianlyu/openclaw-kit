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
                  Skip the setup.<br/>
                  <span className="landing-text-gradient">Start building your AI App today.</span>
                </h1>
                <p className="mt-6 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto mb-10">
                  Get full source code access to a production-ready Next.js boilerplate complete with Authentication, Stripe Billing, AI Provider routing, and Telegram Bot integration.
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
