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
          <p className="text-slate-500">Last updated: March 8, 2026</p>

          <h2>1. Introduction</h2>
          <p>Welcome to OpenClaw Dev Kit ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our Product.</p>
          <p>OpenClaw Dev Kit is a developer starter kit that provides source code for launching software products.</p>
          <p>We are committed to protecting your privacy and handling your data transparently.</p>
          <p>By using our website or purchasing the Product, you agree to the practices described in this Privacy Policy.</p>
          <p>If you do not agree with this Privacy Policy, please do not use the website or purchase the Product.</p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>When you purchase OpenClaw Dev Kit, we collect only the information necessary to process your purchase and deliver the Product.</p>
          <p>This may include:</p>
          <p>Email address<br />Used to send purchase confirmations and product access instructions.</p>
          <p>Name<br />If provided during checkout.</p>
          <p>GitHub username<br />Used to send you an invitation to the private repository containing the Product.</p>
          <p>Payment information<br />Payment details are processed securely by Paddle.<br />We do not have access to your full credit card number or payment credentials.</p>

          <h3>2.2 Information Collected Automatically</h3>
          <p>When you visit our website, basic technical information may be collected automatically through server logs or analytics tools, such as:</p>
          <ul>
            <li>IP address</li>
            <li>browser type</li>
            <li>operating system</li>
            <li>pages visited</li>
            <li>referring website</li>
            <li>date and time of access</li>
          </ul>
          <p>This information helps us understand how visitors use the website and improve the service.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To process and deliver your purchase</li>
            <li>To send repository access instructions</li>
            <li>To send purchase confirmations</li>
            <li>To provide product updates or important notices</li>
            <li>To respond to customer inquiries or support requests</li>
            <li>To maintain and improve the website</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties.</p>
          <p>We do not send marketing emails unless you explicitly opt in.</p>

          <h2>4. Payment Processing</h2>
          <p>All payments for OpenClaw Dev Kit are processed by Paddle.</p>
          <p>When you purchase the Product, your payment information is handled entirely by Paddle’s secure payment infrastructure.</p>
          <p>We do not store or have access to your full credit card details.</p>
          <p>Your use of Paddle’s payment services is governed by Paddle’s own privacy policy and terms.</p>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>We may share your information only in the following situations:</p>
          <p><strong>Payment Processing</strong><br />Information necessary to complete a transaction is shared with Paddle.</p>
          <p><strong>Repository Access</strong><br />Your GitHub username may be used to send an invitation through the GitHub API so that you can access the Product repository.</p>
          <p><strong>Legal Requirements</strong><br />We may disclose information if required by law or in response to valid legal requests from authorities.</p>
          <p><strong>Business Transfers</strong><br />If the business operating OpenClaw Dev Kit is sold, merged, or otherwise transferred, your information may be transferred as part of that transaction.</p>

          <h2>6. Data Retention</h2>
          <h3>6.1 Retention</h3>
          <p>We retain purchase records and contact information for as long as necessary to:</p>
          <ul>
            <li>deliver product access</li>
            <li>provide updates</li>
            <li>respond to support requests</li>
            <li>comply with legal obligations</li>
          </ul>
          <h3>6.2 Deletion Requests</h3>
          <p>You may request deletion of your personal data by contacting us at:</p>
          <p>jiarenlyu@gmail.com</p>
          <p>We will make reasonable efforts to delete your personal information from active systems within a reasonable timeframe, except where we are required to retain it for legal or accounting purposes.</p>
          <p>Deleting your data does not revoke your license to use the Product you purchased.</p>

          <h2>7. Cookies</h2>
          <p>Our website may use cookies or similar technologies for basic functionality and analytics.</p>
          <p>Cookies are small files stored on your device that help websites remember user preferences and understand how visitors interact with the site.</p>
          <p>You can disable cookies through your browser settings, though some features of the website may not function properly.</p>

          <h2>8. Products Built Using OpenClaw Dev Kit</h2>
          <p>OpenClaw Dev Kit is a software starter kit that you may use to build your own applications.</p>
          <p>When you deploy products built with the Dev Kit, your own users’ data will be handled by the services you configure.</p>
          <p>These may include services such as:</p>
          <ul>
            <li>databases and authentication providers</li>
            <li>payment processors</li>
            <li>hosting platforms</li>
            <li>messaging or API providers</li>
          </ul>
          <p>We do not have access to your users’ data.</p>
          <p>You are solely responsible for:</p>
          <ul>
            <li>managing your users’ data</li>
            <li>complying with applicable privacy laws</li>
            <li>creating your own privacy policy for your end product</li>
          </ul>

          <h2>9. Your Data Protection Rights</h2>
          <p>Depending on your jurisdiction, you may have certain rights regarding your personal data.</p>
          <p>These may include the right to:</p>
          <ul>
            <li>request access to your personal data</li>
            <li>request correction of inaccurate information</li>
            <li>request deletion of your personal data</li>
            <li>request restriction of data processing</li>
            <li>object to data processing</li>
            <li>request transfer of your data</li>
          </ul>
          <p>To exercise these rights, contact:</p>
          <p>jiarenlyu@gmail.com</p>

          <h2>10. Security</h2>
          <p>We implement reasonable technical and organizational measures to protect your information.</p>
          <p>However, no method of transmitting or storing data on the internet can be guaranteed to be completely secure.</p>
          <p>Therefore, we cannot guarantee absolute security.</p>

          <h2>11. Children's Privacy</h2>
          <p>OpenClaw Dev Kit is not intended for individuals under the age of 18.</p>
          <p>We do not knowingly collect personal information from children.</p>
          <p>If you believe we have collected personal data from a minor, please contact us and we will remove the information.</p>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>Changes take effect when they are posted on this page.</p>
          <p>We encourage you to review this policy periodically.</p>

          <h2>13. Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact:</p>
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
