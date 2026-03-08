import Link from 'next/link';
import { appConfig } from '@/lib/config';

export function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-transparent relative z-20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-medium text-white">{appConfig.name}</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
}
