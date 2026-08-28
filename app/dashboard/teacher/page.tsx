'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { BookOpen, Video, FileEdit, Users, CheckCircle2, Star, Clock } from 'lucide-react';

import TeacherAssignmentsPage from './assignments/page';
import TeacherAIReviewPage from './ai-review/page';
import TeacherRosterPage from './roster/page';
import DashboardLiveClassesPage from '../classes/live/page';
import DashboardLevelsPage from '../levels/page';
import DashboardInstitutesPage from '../institutes/page';
import DashboardLibraryPage from '../library/page';
import DashboardCompetitionsPage from '../competitions/page';

export default function TeacherDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'assignments') return <TeacherAssignmentsPage />;
  if (activeTab === 'ai-review') return <TeacherAIReviewPage />;
  if (activeTab === 'roster') return <TeacherRosterPage />;
  if (activeTab === 'classes') return <DashboardLiveClassesPage />;
  if (activeTab === 'levels') return <DashboardLevelsPage />;
  if (activeTab === 'institutes') return <DashboardInstitutesPage />;
  if (activeTab === 'library') return <DashboardLibraryPage />;
  if (activeTab === 'competitions') return <DashboardCompetitionsPage />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase">
            Teacher Console
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Faculty & Student Evaluation Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Manage upcoming live classes, grade student assignments, and inspect AI phonetics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Enrolled Students</span>
          <span className="text-3xl font-black text-slate-900 block">42 Students</span>
          <span className="text-xs text-emerald-600 font-bold">Class 10 & 12 Batches</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Pending Submissions</span>
          <span className="text-3xl font-black text-amber-600 block">5 Assignments</span>
          <span className="text-xs text-amber-600 font-bold">Requires Teacher Grading</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Upcoming Live Session</span>
          <span className="text-xl font-black text-blue-600 block">Today 4:00 PM IST</span>
          <span className="text-xs text-blue-600 font-bold">उच्च स्तरीय देवनागरी पत्राचार</span>
        </div>
      </div>
    </div>
  );
}
