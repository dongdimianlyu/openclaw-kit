import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Github, Mail } from 'lucide-react';
import { appConfig } from '@/lib/config';

export default function PurchaseSuccessPage() {
  const primaryColor = appConfig.theme.primaryColor;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-slate-600 mb-8">
            Thank you for purchasing {appConfig.name}. Your repository invitation is being processed.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 text-left mb-8 space-y-4">
            <h2 className="font-semibold text-slate-900">What happens next?</h2>
            
            <div className="flex items-start gap-3">
              <Github className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Check GitHub</p>
                <p className="text-sm text-slate-500">You will receive a repository invitation at the GitHub username you provided.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Check your email</p>
                <p className="text-sm text-slate-500">GitHub will also send an invitation link to your primary email address.</p>
              </div>
            </div>
          </div>
          
          <Link href="/">
            <Button className={`w-full bg-${primaryColor}-600 hover:bg-${primaryColor}-700`}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
