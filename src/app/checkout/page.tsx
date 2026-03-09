'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const githubUsername = searchParams.get('github');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      const res = await fetch('/api/purchase/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUsername }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from Paddle');
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

  return (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-300">Product</span>
            <span className="font-medium text-white">OpenClaw Dev Kit</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-300">GitHub Account</span>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-white">{githubUsername}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg text-slate-300">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">$129</span>
              <p className="text-sm text-slate-500">one-time payment</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full py-4 px-8 rounded-full text-lg font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Preparing Checkout...
          </>
        ) : (
          'Complete Purchase'
        )}
      </button>

      <p className="text-center text-sm text-slate-500">
        Secure payment powered by Paddle
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            OpenClaw Dev Kit Checkout
          </h1>
          <p className="text-slate-400">
            You&apos;re one step away from full access.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </div>
      
      {/* Background with gradient and texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-ultra z-0 opacity-20"></div>
        <div className="particle-bg z-0 opacity-30"></div>
      </div>
    </div>
  );
}
