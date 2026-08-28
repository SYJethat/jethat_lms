'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, FileEdit, Headphones, Award } from 'lucide-react';

import TesterQueuePage from './queue/page';
import TesterSpellingPage from './spelling/page';
import TesterAudioPage from './audio/page';
import TesterApprovalsPage from './approvals/page';
import DashboardLevelsPage from '../levels/page';
import DashboardChatbotPage from '../chatbot/page';

export default function TesterDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'queue') return <TesterQueuePage />;
  if (activeTab === 'spelling') return <TesterSpellingPage />;
  if (activeTab === 'audio') return <TesterAudioPage />;
  if (activeTab === 'approvals') return <TesterApprovalsPage />;
  if (activeTab === 'levels') return <DashboardLevelsPage />;
  if (activeTab === 'chatbot') return <DashboardChatbotPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
            Quality Testing Hub
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Content & Audio Quality Inspection</h1>
          <p className="text-xs text-slate-500 font-medium">Audit Devanagari spellings, question accuracy, TTS audio synthesis, and grant approvals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Pending QA Queue</span>
          <span className="text-3xl font-black text-amber-600 block">1 Submission</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Passed QA Audits</span>
          <span className="text-3xl font-black text-emerald-600 block">28 Modules</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Devanagari Font Accuracy</span>
          <span className="text-3xl font-black text-blue-600 block">100% Verified</span>
        </div>
      </div>
    </div>
  );
}
