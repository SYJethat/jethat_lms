'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Bot,
  Play,
  ArrowRight,
  Target,
  Flame,
  Zap,
  BookOpen,
  Mic,
  FileEdit,
  Headphones
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { MOCK_LEVELS, User } from '@/lib/mockData';

// Import sub-views
import DashboardLibraryPage from '../library/page';
import DashboardLevelsPage from '../levels/page';
import DashboardChatbotPage from '../chatbot/page';
import DashboardAvatarPage from '../avatar/page';
import DashboardSpeakingTestPage from '../speaking-test/page';
import DashboardWritingTestPage from '../writing-test/page';
import DashboardListeningTestPage from '../listening-test/page';
import DashboardCompetitionsPage from '../competitions/page';
import DashboardLeaderboardPage from '../leaderboard/page';
import DashboardLiveClassesPage from '../classes/live/page';
import DashboardPhysicalClassesPage from '../classes/physical/page';
import DashboardInstitutesPage from '../institutes/page';
import DashboardCertificatesPage from '../certificates/page';
import DashboardExamPage from '../exam/page';

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  // Render specific tab view on the right pane if selected
  if (activeTab === 'exam') return <DashboardExamPage />;
  if (activeTab === 'levels') return <DashboardLevelsPage />;

  if (activeTab === 'classes') return <DashboardLiveClassesPage />;
  if (activeTab === 'competitions') return <DashboardCompetitionsPage />;
  if (activeTab === 'leaderboard') return <DashboardLeaderboardPage />;
  if (activeTab === 'institutes') return <DashboardInstitutesPage />;
  if (activeTab === 'library') return <DashboardLibraryPage />;
  if (activeTab === 'chatbot') return <DashboardChatbotPage />;
  if (activeTab === 'avatar') return <DashboardAvatarPage />;
  if (activeTab === 'speaking-test') return <DashboardSpeakingTestPage />;
  if (activeTab === 'writing-test') return <DashboardWritingTestPage />;
  if (activeTab === 'listening-test') return <DashboardListeningTestPage />;
  if (activeTab === 'physical') return <DashboardPhysicalClassesPage />;
  if (activeTab === 'certificates') return <DashboardCertificatesPage />;

  // Default Overview Dashboard View (NIOS LMS Format)
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Top Banners Row Matching NIOS LMS Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Goal Active Banner (Left 8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-xs">
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-8 h-8 text-blue-200" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-black tracking-widest text-blue-600 uppercase block">
                WEEKLY GOAL ACTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Finish 3 Lessons this <br className="hidden sm:inline" />
                week to reach <span className="text-blue-600">Silver Tier.</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                You have completed 65% of your target. Keep going!
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/student?tab=levels"
            className="px-6 py-3 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition shadow-sm"
          >
            RESUME LESSON <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AI Tutor Online Card (Right 4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-extrabold tracking-wider uppercase">
              AI TUTOR ONLINE
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-600 italic font-medium leading-relaxed">
              &quot;You spent 2 hours on Hindi Grammar yesterday. Ready for a quick recap session?&quot;
            </p>
          </div>

          <Link
            href="/dashboard/student?tab=chatbot"
            className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wider text-center block transition"
          >
            START RECAP SESSION
          </Link>
        </div>
      </div>

      {/* 2. 4 Stat Cards Grid Matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Overall Progress */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs clean-card-hover">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block">72%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OVERALL PROGRESS</span>
          </div>
        </div>

        {/* Card 2: Course Completed */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs clean-card-hover">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block">04</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">COURSE COMPLETED</span>
          </div>
        </div>

        {/* Card 3: Study Hours */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs clean-card-hover">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block">128h</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">STUDY HOURS</span>
          </div>
        </div>

        {/* Card 4: Achievements */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs clean-card-hover">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block">12</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ACHIEVEMENTS</span>
          </div>
        </div>
      </div>

      {/* 3. AI Hub Assessment Cards & Learning Pathway Node */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" /> Active Learning Pathway (Level 1-7)
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                80% Completed
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600">Level 2 — Basic Sentence Structure</span>
                <h4 className="text-base font-bold text-slate-900">सर्वनाम और क्रिया (Pronouns & Verbs)</h4>
                <p className="text-xs text-slate-500 mt-0.5">Lesson 1 of 10 • Devanagari Script & Audio</p>
              </div>
              <Link
                href="/dashboard/student?tab=levels"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" /> Continue
              </Link>
            </div>
          </div>

          {/* Quick AI Launchers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/dashboard/student?tab=speaking-test"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 flex items-center gap-3 shadow-xs transition"
            >
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">AI Speaking</h5>
                <span className="text-[11px] text-slate-500">Score: 88%</span>
              </div>
            </Link>

            <Link
              href="/dashboard/student?tab=writing-test"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 flex items-center gap-3 shadow-xs transition"
            >
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <FileEdit className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">AI Writing</h5>
                <span className="text-[11px] text-slate-500">Score: 76%</span>
              </div>
            </Link>

            <Link
              href="/dashboard/student?tab=listening-test"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 flex items-center gap-3 shadow-xs transition"
            >
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">AI Listening</h5>
                <span className="text-[11px] text-slate-500">Score: 65%</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Achievements & Badges */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> My Badges
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {user?.badges.map((b) => (
                <div key={b.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-2xl block">{b.icon}</span>
                  <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
