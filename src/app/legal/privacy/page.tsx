import { Navbar } from '@/components/layout/Navbar';
import { appConfig } from '@/lib/config';
import { Shovel } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const primaryColor = appConfig.theme.primaryColor;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate prose-a:text-blue-600">
          <h1>Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <h2>1. Information We Collect</h2>
          <p>
            When you purchase the {appConfig.name} boilerplate, we may collect the following information:
          </p>
          <ul>
            <li>Your GitHub username, which is required to invite you to the private repository.</li>
            <li>Your email address, which is collected via Stripe during the checkout process.</li>
            <li>Payment information, which is processed securely by our payment provider (Stripe).</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            The information we collect is used solely for the purpose of delivering the product to you:
          </p>
          <ul>
            <li>Your GitHub username is used to send an automated repository invitation via the GitHub API.</li>
            <li>Your email address is used to send purchase receipts and occasional updates related to the repository.</li>
          </ul>

          <h2>3. Payment Processing</h2>
          <p>
            All payment data is handled securely by Stripe. We do not store or process your credit card information on our servers.
          </p>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties, except as necessary to process your payment (Stripe) and deliver the repository access (GitHub).
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact our support team.
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
