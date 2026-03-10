'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  CreditCard, 
  Activity,
  Layers,
  LogOut
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { authService, User } from '@/services/auth';
import { Button } from '../ui/button';
import { appConfig } from '@/lib/config';

const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const adminNavigation = [
  { name: 'Overview', href: '/admin', icon: Activity },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
];

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const navigation = isAdmin ? adminNavigation : userNavigation;
  const [user, setUser] = useState<User | null>(null);

  const primaryColor = appConfig.theme.primaryColor;

  useEffect(() => {
    authService.getCurrentUser().then(setUser).catch(console.error);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-50">
      <div className="flex h-16 items-center px-6 border-b bg-white">
        <Link href="/" className="flex items-center space-x-2">
          <Layers className={`h-6 w-6 text-${primaryColor}-600`} />
          <span className="text-xl font-bold">{appConfig.name}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-4">
          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {isAdmin ? 'Admin Panel' : 'User Menu'}
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? `bg-${primaryColor}-50 text-${primaryColor}-700`
                    : 'text-slate-700 hover:bg-slate-100',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? `text-${primaryColor}-700` : 'text-slate-400 group-hover:text-slate-500',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full bg-${primaryColor}-100 flex items-center justify-center text-${primaryColor}-700 font-bold uppercase`}>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || (isAdmin ? 'A' : 'U')}
            </div>
            <div className="ml-3 truncate max-w-[120px]">
              <p className="text-sm font-medium text-slate-700 truncate">
                {user?.name || user?.email || 'Loading...'}
              </p>
              <p className="text-xs font-medium text-slate-500 group-hover:text-slate-700">
                {isAdmin ? 'Administrator' : 'User'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
            <LogOut className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
