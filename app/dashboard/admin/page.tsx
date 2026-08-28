'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, BookOpen, Bot, History, Trophy, BarChart3, Building2 } from 'lucide-react';

import AdminRBACPage from './rbac/page';
import AdminPublishingPage from './publishing/page';
import AdminAISettingsPage from './ai-settings/page';
import AdminAuditPage from './audit/page';
import DashboardLevelsPage from '../levels/page';
import DashboardCompetitionsPage from '../competitions/page';
import DashboardLeaderboardPage from '../leaderboard/page';
import DashboardInstitutesPage from '../institutes/page';
import DashboardLibraryPage from '../library/page';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'rbac') return <AdminRBACPage />;
  if (activeTab === 'publishing') return <AdminPublishingPage />;
  if (activeTab === 'ai-settings') return <AdminAISettingsPage />;
  if (activeTab === 'audit') return <AdminAuditPage />;
  if (activeTab === 'levels') return <DashboardLevelsPage />;
  if (activeTab === 'competitions') return <DashboardCompetitionsPage />;
  if (activeTab === 'leaderboard') return <DashboardLeaderboardPage />;
  if (activeTab === 'institutes') return <DashboardInstitutesPage />;
  if (activeTab === 'library') return <DashboardLibraryPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase">
            Super Admin Commander
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Super Admin System Operations</h1>
          <p className="text-xs text-slate-500 font-medium">Manage user RBAC permission matrix, final course publishing, AI model gateway, and immutable audit logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Configured User Roles</span>
          <span className="text-3xl font-black text-slate-900 block">7 Roles Active</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Active AI Provider Gateway</span>
          <span className="text-xl font-black text-orange-600 block">Gemini 1.5 Pro / Flash</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Immutable Audit Trail</span>
          <span className="text-3xl font-black text-emerald-600 block">100% Logged</span>
        </div>
      </div>
    </div>
  );
}
