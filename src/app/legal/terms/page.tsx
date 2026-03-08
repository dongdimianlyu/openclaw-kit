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
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to {appConfig.name} (the &quot;Product&quot;). The Product is a software boilerplate and source code repository sold by {appConfig.companyName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By purchasing the Product, you agree to be bound by these Terms of Service.
          </p>

          <h2>2. License and Access</h2>
          <p>
            Upon purchase, you are granted a non-exclusive, non-transferable license to use the Product. Your purchase grants you access to the private GitHub repository containing the source code.
          </p>
          <ul>
            <li>You may use the Product to build unlimited projects for personal or commercial use.</li>
            <li>You may modify the source code as needed for your projects.</li>
            <li><strong>You may NOT</strong> redistribute, resell, lease, license, or offer the source code as a competing boilerplate or starter kit.</li>
          </ul>

          <h2>3. As-Is Provided</h2>
          <p>
            The Product is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied. We do not warrant that the Product will meet your specific requirements or be uninterrupted, secure, or error-free.
          </p>

          <h2>4. Updates and Changes</h2>
          <p>
            We may update the repository over time with bug fixes, new features, or dependency updates. However, we are under no obligation to provide updates. Access to the repository grants you access to all future updates pushed to that repository.
          </p>

          <h2>5. Buyer Responsibilities</h2>
          <p>
            You are entirely responsible for the deployment, infrastructure, and ongoing operation of any applications built using the Product. We do not provide hosting, database management, or infrastructure support.
          </p>

          <h2>6. Access Revocation</h2>
          <p>
            We reserve the right to revoke your repository access without refund in cases of abuse, violation of these terms, or payment chargebacks.
          </p>

          <h2>7. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at our support channels.
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
