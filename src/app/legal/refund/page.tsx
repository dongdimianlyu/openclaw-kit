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
          <p className="text-slate-500">Last updated: March 8, 2026</p>

          <h2 className="font-bold mt-6">1. Overview</h2>
          <p>ClawKit is a digital software product that provides access to a private source code repository.</p>
          <p>Because the Product is delivered digitally and access is granted immediately after purchase, refunds are limited.</p>
          <p>By purchasing ClawKit, you acknowledge and agree to the terms described in this Refund Policy.</p>

          <h2 className="font-bold mt-6">2. No Refunds for Digital Product Delivery</h2>
          <p>All purchases of ClawKit are generally final and non-refundable.</p>
          <p>After payment is completed, customers receive access to the Product’s source code repository. Since digital source code cannot be returned once access has been granted, refunds are typically not possible.</p>
          <p>Refunds will not be issued for reasons including but not limited to:</p>
          <p>Change of mind after purchase</p>
          <p>Lack of technical knowledge required to use the Product</p>
          <p>Difficulty setting up or deploying the software</p>
          <p>Incompatibility with your hosting environment or third-party services</p>
          <p>Bugs, errors, or missing features</p>
          <p>Business results, revenue expectations, or product performance</p>
          <p>ClawKit is sold as a developer starter kit, and buyers are responsible for configuring and customizing the software for their own use.</p>

          <h2 className="font-bold mt-6">3. Exceptions</h2>
          <p>Refunds may be granted in limited circumstances, such as:</p>
          <p>Duplicate Charges<br />If you were accidentally charged more than once for the same purchase.</p>
          <p>Billing Errors<br />If an incorrect amount was charged due to a technical issue with the payment processor.</p>
          <p>In these cases, please contact us with details of the issue.</p>

          <h2 className="font-bold mt-6">4. Refund Requests</h2>
          <p>If you believe you qualify for a refund under the exceptions listed above, contact us at:</p>
          <p>Email:<br />jiarenlyu@gmail.com</p>
          <p>Please include:</p>
          <p>the email address used during purchase</p>
          <p>the date of the transaction</p>
          <p>a description of the issue</p>
          <p>Refund requests are reviewed on a case-by-case basis.</p>

          <h2 className="font-bold mt-6">5. Payment Processor</h2>
          <p>Payments for ClawKit are processed through Paddle.</p>
          <p>Refunds, if approved, will be issued through Paddle using the original payment method.</p>
          <p>Processing times may vary depending on the payment provider and your financial institution.</p>

          <h2 className="font-bold mt-6">6. Chargebacks</h2>
          <p>Before initiating a chargeback through your bank or credit card provider, we encourage you to contact us directly so we can review the issue.</p>
          <p>Filing fraudulent chargebacks after receiving access to the Product may result in termination of access to the repository and future purchases being blocked.</p>

          <h2 className="font-bold mt-6">7. Changes to This Policy</h2>
          <p>We may update this Refund Policy from time to time.</p>
          <p>Changes take effect when they are posted on this page.</p>
          <p>Continued use of the Product after updates indicates acceptance of the revised policy.</p>

          <h2 className="font-bold mt-6">8. Contact</h2>
          <p>If you have questions about this Refund Policy, contact:</p>
          <p>Email:<br />jiarenlyu@gmail.com</p>
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
