'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, MapPin, UserCheck, DollarSign } from 'lucide-react';

import InstituteBatchesPage from './batches/page';
import InstituteFeesPage from './fees/page';
import DashboardPhysicalClassesPage from '../classes/physical/page';
import DashboardInstitutesPage from '../institutes/page';
import DashboardCertificatesPage from '../certificates/page';
import DashboardLiveClassesPage from '../classes/live/page';

export default function InstituteDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'batches') return <InstituteBatchesPage />;
  if (activeTab === 'fees') return <InstituteFeesPage />;
  if (activeTab === 'physical') return <DashboardPhysicalClassesPage />;
  if (activeTab === 'institutes') return <DashboardInstitutesPage />;
  if (activeTab === 'certificates') return <DashboardCertificatesPage />;
  if (activeTab === 'classes') return <DashboardLiveClassesPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase">
            Institute Admin
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Center & Student Batches Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage physical learning centers in Agra, Delhi, Jaipur, student seating, and local certificates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Offline Centers</span>
          <span className="text-3xl font-black text-slate-900 block">3 Campuses</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Allocated Batch Seats</span>
          <span className="text-3xl font-black text-indigo-600 block">180 / 250 Seats</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Fee Collection</span>
          <span className="text-3xl font-black text-emerald-600 block">₹4,50,000</span>
        </div>
      </div>
    </div>
  );
}
