'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { DollarSign, BarChart3, Shield, Zap, FileEdit } from 'lucide-react';

import AccountingRevenuePage from './revenue/page';
import AccountingGatewaysPage from './gateways/page';
import AccountingSubscriptionsPage from './subscriptions/page';
import AccountingRefundsPage from './refunds/page';
import DashboardInstitutesPage from '../institutes/page';

export default function AccountingDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'revenue') return <AccountingRevenuePage />;
  if (activeTab === 'gateways') return <AccountingGatewaysPage />;
  if (activeTab === 'subscriptions') return <AccountingSubscriptionsPage />;
  if (activeTab === 'refunds') return <AccountingRefundsPage />;
  if (activeTab === 'institutes') return <DashboardInstitutesPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
            Financial Controller
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Platform Revenue & Financial Ledgers</h1>
          <p className="text-xs text-slate-500 font-medium">Track course revenue, Razorpay/Stripe/IAP payment gateway breakdowns, and pro subscriptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Gross Platform Revenue</span>
          <span className="text-3xl font-black text-slate-900 block">₹14.4 Lakhs</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Payment Gateways</span>
          <span className="text-xl font-black text-rose-600 block">Razorpay, Stripe, IAP</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Pro Subscriptions</span>
          <span className="text-3xl font-black text-blue-600 block">1,240 Users</span>
        </div>
      </div>
    </div>
  );
}
