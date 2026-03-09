'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const githubUsername = searchParams.get('github');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paddle, setPaddle] = useState<Paddle>();
  const [showCheckoutInline, setShowCheckoutInline] = useState(false);

  useEffect(() => {
    initializePaddle({ environment: 'production', token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '' }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      }
    );
  }, []);

  if (!githubUsername) {
    return (
      <div className="text-center">
        <p className="text-red-400 mb-6">GitHub username is missing.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
          Return to home
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (!paddle) {
        throw new Error('Paddle failed to initialize');
      }

      const res = await fetch('/api/purchase/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUsername }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      if (data.transactionId) {
        setShowCheckoutInline(true);
        setTimeout(() => {
          paddle.Checkout.open({
            transactionId: data.transactionId,
            settings: {
              displayMode: "inline",
              theme: "dark",
              frameTarget: "paddle-checkout-frame",
              frameInitialHeight: 450,
              frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none;",
              successUrl: `${window.location.origin}/purchase/success`
            }
          });
          setIsLoading(false);
        }, 100);
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout transaction received from Paddle');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setIsLoading(false);
    }
  };

  if (showCheckoutInline) {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm shadow-xl min-h-[500px]">
          <div className="paddle-checkout-frame w-full" style={{ minHeight: '500px' }}></div>
        </div>
        <button
          onClick={() => setShowCheckoutInline(false)}
          className="w-full py-3 px-6 rounded-full text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Order Summary
        </h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <div className="font-medium text-white">OpenClaw Dev Kit</div>
              <div className="text-sm text-slate-400 mt-1">Full source code access</div>
            </div>
            <span className="font-medium text-white">$129</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-300">GitHub Account</span>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Github className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-white">{githubUsername}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg text-slate-300">Total</span>
            <div className="text-right">
              <span className="text-3xl font-bold text-white tracking-tight">$129</span>
              <p className="text-sm text-slate-400">one-time payment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-200 leading-relaxed">
          You will receive an invite to the private repository at <span className="font-semibold text-blue-100">{githubUsername}</span> within minutes of completing your purchase.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="ultra-button w-full py-4 px-8 rounded-full text-lg font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Preparing Secure Checkout...
          </>
        ) : (
          <>
            Complete Purchase
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Guaranteed safe & secure checkout by <strong>Paddle</strong>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020617] text-white font-sans relative overflow-hidden">
      {/* Background matching landing page */}
      <div className="absolute inset-0 bg-ultra z-0"></div>
      <div className="particle-bg z-0 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-10">
          <div className="text-center">
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl mb-4">
              <span className="landing-text-gradient">Secure Checkout</span>
            </h1>
            <p className="text-lg text-slate-300">
              You&apos;re one step away from full access.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          }>
            <CheckoutContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
