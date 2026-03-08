'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, DollarSign, XCircle, Zap, MessageCircle, Server } from 'lucide-react';
import { dbService } from '@/services/database';

interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({ 
    totalUsers: 0, 
    activeSubscriptions: 0, 
    canceledSubscriptions: 0,
    mrr: 0,
    totalAiRequests: 0,
    topProvider: 'None',
    totalTelegramMsgs: 0,
    activeInstances: 0
  });
  const [recentUsers, setRecentUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [stats, users] = await Promise.all([
          dbService.getMetrics(),
          dbService.getUsers()
        ]);
        
        setMetrics(stats as unknown as typeof metrics);
        if (users) setRecentUsers(users as UserRecord[]);
      } catch (error) {
        console.error('Failed to load admin data', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading admin data...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Platform statistics and billing metrics.</p>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estimated MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.mrr.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Monthly Recurring Revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-slate-500">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Paid Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSubscriptions}</div>
            <p className="text-xs text-slate-500">Currently active Pro plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total AI Requests</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAiRequests}</div>
            <p className="text-xs text-slate-500">Platform-wide generations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Telegram Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTelegramMsgs}</div>
            <p className="text-xs text-slate-500">Processed by bots</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Instances</CardTitle>
            <Server className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeInstances}</div>
            <p className="text-xs text-slate-500">Running workspaces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Canceled Plans</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.canceledSubscriptions}</div>
            <p className="text-xs text-slate-500">Historical churn</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user, i) => (
                  <div key={user.id || i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-600 uppercase">
                        {(user.name || user.email || 'U').charAt(0)}
                      </div>
                      <div className="truncate max-w-[200px]">
                        <p className="text-sm font-medium truncate">{user.name || 'No name'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No users found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Provider Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-700">Most Popular Provider</h4>
                  <p className="text-sm text-slate-500 capitalize">{metrics.topProvider}</p>
                </div>
                <Zap className="h-6 w-6 text-slate-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
