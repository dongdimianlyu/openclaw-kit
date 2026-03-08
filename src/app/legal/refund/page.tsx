import { Navbar } from '@/components/layout/Navbar';
import { appConfig } from '@/lib/config';
import { Shovel } from 'lucide-react';
import Link from 'next/link';

export default function RefundPage() {
  const primaryColor = appConfig.theme.primaryColor;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate prose-a:text-blue-600">
          <h1>Refund Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <h2>1. Digital Product Delivery</h2>
          <p>
            {appConfig.name} is a digital software product. Upon successful purchase, you immediately receive access to the private GitHub repository containing the complete source code.
          </p>

          <h2>2. No Refunds</h2>
          <p>
            Because the product is a digital asset and delivered instantly upon purchase, <strong>we generally do not offer refunds</strong>. Once you have access to the repository, you have full access to the source code, which cannot be returned.
          </p>

          <h2>3. Exceptions</h2>
          <p>
            We may grant exceptions to this no-refund policy at our sole discretion in the following circumstances:
          </p>
          <ul>
            <li><strong>Duplicate Purchases:</strong> If you accidentally purchase the product more than once.</li>
            <li><strong>Technical Delivery Failures:</strong> If a system error prevents us from granting you access to the repository and our support team is unable to resolve the issue within a reasonable timeframe.</li>
          </ul>

          <h2>4. Contact for Support</h2>
          <p>
            If you experience any issues receiving your repository invitation after purchase, please ensure you check the email address associated with your GitHub account (including spam/junk folders). If you still need help, please contact our support team.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Shovel className={`h-5 w-5 text-${primaryColor}-600`} />
              <span className="font-semibold text-slate-900">{appConfig.name}</span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-500 mb-4 sm:mb-0">
              <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
              <Link href="/legal/terms" className="hover:text-slate-900">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-slate-900">Privacy</Link>
              <Link href="/legal/refund" className="hover:text-slate-900">Refunds</Link>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {appConfig.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
