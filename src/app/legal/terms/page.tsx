import { Navbar } from '@/components/layout/Navbar';
import { appConfig } from '@/lib/config';
import { Shovel } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const primaryColor = appConfig.theme.primaryColor;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate prose-a:text-blue-600">
          <h1>Terms of Service</h1>
          <p className="text-slate-500">Last updated: March 8, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By purchasing, downloading, or using OpenClaw Dev Kit ("Product"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, do not purchase or use the Product.</p>
          <p>These Terms of Service constitute a legally binding agreement between you and the seller of OpenClaw Dev Kit ("we," "us," or "our").</p>

          <h2>2. Description of the Product</h2>
          <p>Please read before purchasing.</p>
          <p>OpenClaw Dev Kit is a developer starter kit and SaaS boilerplate that provides source code intended to help developers launch software products faster.</p>
          <p>It is not a finished product or hosted service.</p>
          <p>The Product is provided “as is” and may require setup, configuration, debugging, and customization to function in your environment.</p>
          <p>By purchasing the Product, you acknowledge that the software may require technical knowledge to deploy and operate.</p>
          <p>The Product includes:</p>
          <ul>
            <li>Full source code built with Next.js, TypeScript, and Tailwind CSS</li>
            <li>Google OAuth authentication via Supabase with session management</li>
            <li>Stripe billing integration including subscriptions and webhooks</li>
            <li>Admin dashboard with user management</li>
            <li>Supabase database integration with PostgreSQL</li>
            <li>Deployment configuration for cloud environments</li>
            <li>AI integration support (e.g., OpenAI and Anthropic APIs)</li>
            <li>Telegram bot integration</li>
            <li>Environment-variable based configuration</li>
            <li>Setup scripts and documentation for deployment and customization</li>
          </ul>
          <p>We reserve the right to modify, update, or improve the Product at any time.</p>
          <p>Updates may be provided at our discretion and are not guaranteed on any schedule.</p>

          <h2>3. What the Product Does NOT Include</h2>
          <p>To avoid misunderstanding, OpenClaw Dev Kit does not include:</p>
          <ul>
            <li>Hosting or infrastructure services</li>
            <li>Cloud accounts or third-party service subscriptions</li>
            <li>A fully configured or production-ready application out of the box</li>
            <li>Custom development, consulting, or technical support</li>
            <li>Guarantees of revenue, profit, or business success</li>
          </ul>
          <p>You must provide your own accounts for services such as hosting, databases, payment processors, APIs, domains, and any other infrastructure required to run your application.</p>

          <h2>4. Developer Responsibility</h2>
          <p>OpenClaw Dev Kit is intended for developers or technical users.</p>
          <p>By purchasing the Product, you acknowledge that you have the technical ability to use it, or that you will work with someone who does.</p>
          <p>You are solely responsible for:</p>
          <ul>
            <li>Configuring required third-party services</li>
            <li>Deploying and maintaining your application</li>
            <li>Securing your infrastructure and code</li>
            <li>Keeping dependencies updated</li>
            <li>Ensuring compliance with applicable laws and regulations</li>
            <li>Creating legal documents for your own product (such as Terms of Service and Privacy Policies)</li>
            <li>Managing and supporting your own users or customers</li>
          </ul>
          <p>We are not responsible for the operation, security, or legal compliance of applications built using the Product.</p>

          <h2>5. Payment and Billing</h2>
          <h3>5.1 Payment Processing</h3>
          <p>Payments for OpenClaw Dev Kit are processed by a third-party payment processor. By making a purchase, you agree to provide accurate payment information and comply with the payment provider’s terms and policies.</p>
          <p>We do not store full credit card details.</p>
          <h3>5.2 Pricing</h3>
          <p>OpenClaw Dev Kit is sold as a one-time purchase.</p>
          <p>We reserve the right to change pricing at any time. Price changes will not affect purchases already completed.</p>
          <p>Promotions or discounts may be offered at our discretion.</p>

          <h2>6. Refund Policy — All Sales Are Final</h2>
          <p>Due to the nature of digital products, all sales are final.</p>
          <p>Upon purchase, you receive access to the Product’s source code repository. Because digital code cannot be returned once delivered, refunds are generally not provided.</p>
          <p>Refunds may be considered only in cases of billing errors, such as duplicate charges.</p>
          <p>If this occurs, please contact:</p>
          <p>jiarenlyu@gmail.com</p>

          <h2>7. No Guarantee of Results</h2>
          <p>Purchasing OpenClaw Dev Kit does not guarantee business success, revenue, or profitability.</p>
          <p>The outcome of any product built using this software depends entirely on factors outside our control, including execution, marketing, competition, and market conditions.</p>
          <p>You accept full responsibility for any business decisions made using the Product.</p>

          <h2>8. Third-Party Services</h2>
          <p>The Product may integrate with third-party services such as:</p>
          <ul>
            <li>Supabase</li>
            <li>Stripe or other payment providers</li>
            <li>Cloud hosting providers</li>
            <li>AI API providers (such as OpenAI or Anthropic)</li>
            <li>Messaging platforms such as Telegram</li>
          </ul>
          <p>Your use of these services is governed by their own terms and policies.</p>
          <p>We are not responsible for the availability, pricing, or behavior of third-party services.</p>
          <p>Changes to these services may affect the Product’s functionality.</p>

          <h2>9. Updates and Maintenance</h2>
          <p>We may release updates, improvements, or bug fixes to the Product.</p>
          <p>However, we are not obligated to provide updates on any schedule or maintain the Product indefinitely.</p>
          <p>Updates are provided “as is.”</p>
          <p>You are responsible for integrating updates into your own codebase.</p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>THE PRODUCT IS PROVIDED “AS IS” AND “AS AVAILABLE.”</p>
          <p>WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
          <ul>
            <li>MERCHANTABILITY</li>
            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>NON-INFRINGEMENT</li>
          </ul>
          <p>We do not guarantee that the Product will:</p>
          <ul>
            <li>meet your requirements</li>
            <li>be error-free</li>
            <li>operate without interruption</li>
            <li>be compatible with your specific environment</li>
          </ul>

          <h2>11. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          <p>This includes, but is not limited to:</p>
          <ul>
            <li>loss of profits</li>
            <li>loss of data</li>
            <li>business interruption</li>
            <li>security vulnerabilities</li>
            <li>issues caused by third-party services</li>
          </ul>
          <p>In no event shall our total liability exceed the amount you paid for the Product.</p>

          <h2>12. Indemnification</h2>
          <p>You agree to defend and indemnify us against any claims, damages, liabilities, or expenses arising from:</p>
          <ul>
            <li>your use of the Product</li>
            <li>products or services you build using the Product</li>
            <li>violations of these Terms</li>
            <li>violations of applicable laws</li>
          </ul>

          <h2>13. Termination</h2>
          <p>We may terminate your license to use the Product if you violate these Terms.</p>
          <p>If termination occurs, you must stop distributing or sharing the Product’s source code.</p>
          <p>Applications you have already deployed to your own users are not affected.</p>

          <h2>14. Governing Law</h2>
          <p>These Terms shall be governed by and interpreted in accordance with applicable laws in the jurisdiction where the seller operates, without regard to conflict of law principles.</p>

          <h2>15. Severability</h2>
          <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>

          <h2>16. Changes to These Terms</h2>
          <p>We may update these Terms of Service from time to time.</p>
          <p>Changes become effective when posted on this page.</p>
          <p>Your continued use of the Product after updates constitutes acceptance of the revised Terms.</p>

          <h2>17. Entire Agreement</h2>
          <p>These Terms of Service, together with the Privacy Policy and any applicable license terms, constitute the entire agreement between you and us regarding OpenClaw Dev Kit.</p>

          <h2>18. Contact</h2>
          <p>If you have questions about these Terms, contact:</p>
          <p>Email: jiarenlyu@gmail.com</p>
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
