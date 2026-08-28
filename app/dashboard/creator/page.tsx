'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, BookOpen, Shield, HelpCircle } from 'lucide-react';

import CreatorBuilderPage from './builder/page';
import CreatorLessonsPage from './lessons/page';
import CreatorQuizzesPage from './quizzes/page';
import CreatorWorkflowPage from './workflow/page';
import DashboardLevelsPage from '../levels/page';
import DashboardLibraryPage from '../library/page';

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'builder') return <CreatorBuilderPage />;
  if (activeTab === 'lessons') return <CreatorLessonsPage />;
  if (activeTab === 'quizzes') return <CreatorQuizzesPage />;
  if (activeTab === 'workflow') return <CreatorWorkflowPage />;
  if (activeTab === 'levels') return <DashboardLevelsPage />;
  if (activeTab === 'library') return <DashboardLibraryPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase">
            Course Creator Studio
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Curriculum & Content Publishing Studio</h1>
          <p className="text-xs text-slate-500 font-medium">Build Devanagari modules, write vocabulary cards, and submit to QA audit queue.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">My Authored Modules</span>
          <span className="text-3xl font-black text-slate-900 block">14 Modules</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Current Workflow Stage</span>
          <span className="text-xl font-black text-purple-600 block">Stage 3 (QA Audit Queue)</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Published Status</span>
          <span className="text-xl font-black text-emerald-600 block">12 Approved Live</span>
        </div>
      </div>
    </div>
  );
}
