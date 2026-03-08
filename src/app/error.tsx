'use client'

import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-lg p-8 shadow-2xl text-center space-y-4">
        <div className="text-sm font-medium text-slate-400">Something went wrong</div>
        <h1 className="text-2xl font-semibold">We hit a snag loading this page.</h1>
        <p className="text-slate-300 text-sm leading-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-[#0a0a0a] hover:bg-slate-100 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white hover:border-white/40 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
