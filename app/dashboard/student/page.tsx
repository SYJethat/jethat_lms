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
  Headphones,
  Globe,
  Compass,
  Video,
  Bookmark,
  Calendar,
  Shield,
  Trophy,
  BarChart3,
  Building2,
  GraduationCap
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { MOCK_LEVELS, User } from '@/lib/mockData';

// Import sub-views
import DashboardIndianLanguagesPage from '../indian-languages/page';
import DashboardForeignLanguagesPage from '../foreign-languages/page';
import DashboardFreeVideosPage from '../free-videos/page';
import DashboardFreeAudioPage from '../free-audio/page';
import DashboardGuidedLearningPage from '../guided-learning/page';
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
import DashboardAccountDetailsPage from '../account-details/page';
import DashboardExamPage from '../exam/page';

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  // Render specific tab view on the right pane if selected
  if (activeTab === 'indian-languages') return <DashboardIndianLanguagesPage />;
  if (activeTab === 'foreign-languages') return <DashboardForeignLanguagesPage />;
  if (activeTab === 'free-videos') return <DashboardFreeVideosPage />;
  if (activeTab === 'free-audio') return <DashboardFreeAudioPage />;
  if (activeTab === 'guided-learning') return <DashboardGuidedLearningPage />;
  if (activeTab === 'account-details') return <DashboardAccountDetailsPage />;
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

  // Default Overview Dashboard View (Enhanced Student Hub with Logo Colors)
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* 1. Hero Welcome & Goal Banner (Logo Matched Gradient: Saffron Orange & Dark Slate) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Banner (Left 8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-orange-500/30">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center shrink-0 shadow-md border border-white/20">
              <Target className="w-8 h-8 text-amber-300" />
            </div>
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black tracking-widest uppercase border border-amber-400/30">
                  🔥 {user?.streak || 14} DAY STREAK ACTIVE
                </span>
                <span className="text-slate-300 text-xs font-semibold">Level 4 Scholar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Welcome back, {user?.name || 'Aarav Sharma'}! <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
                  Ready to master your next lesson?
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                You are 2 lessons away from unlocking your next Accredited Level Diploma.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/student?tab=indian-languages"
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition shadow-lg hover:scale-105"
          >
            RESUME LEARNING <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AI Tutor Online Card (Right 4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">AI Shikshak (AI Tutor)</h4>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Online 24/7
                </span>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <div>
            <p className="text-xs text-slate-600 italic font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
              &quot;Namaste Aarav! Ready for a 5-minute SOV Grammar and Spoken Conversation practice today?&quot;
            </p>
          </div>

          <Link
            href="/dashboard/student?tab=chatbot"
            className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block transition shadow-md"
          >
            Start AI Voice/Chat Session →
          </Link>
        </div>
      </div>

      {/* 2. Quick Launcher Feature Grid (All Key Student Tabs) */}
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" /> Quick Access Hub
          </h3>
          <span className="text-xs text-slate-500 font-semibold">Select any module to start learning</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/dashboard/student?tab=indian-languages"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-orange-600 transition">22 Indian Languages</h4>
              <span className="text-[10px] text-slate-500 font-medium block">All Scheduled Dialects</span>
            </div>
          </Link>

          <Link
            href="/dashboard/student?tab=foreign-languages"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-cyan-600 transition">Foreign Languages</h4>
              <span className="text-[10px] text-slate-500 font-medium block">15 Global Languages</span>
            </div>
          </Link>

          <Link
            href="/dashboard/student?tab=free-videos"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-rose-600 transition">Free Videos</h4>
              <span className="text-[10px] text-slate-500 font-medium block">HD Masterclasses</span>
            </div>
          </Link>

          <Link
            href="/dashboard/student?tab=free-audio"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-teal-600 transition">Free Audio</h4>
              <span className="text-[10px] text-slate-500 font-medium block">Native Podcasts</span>
            </div>
          </Link>

          <Link
            href="/dashboard/student?tab=guided-learning"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-600 transition">Guided Study</h4>
              <span className="text-[10px] text-slate-500 font-medium block">NIOS Study PDFs</span>
            </div>
          </Link>

          <Link
            href="/dashboard/student?tab=certificates"
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition text-left space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-amber-600 transition">My Certificates</h4>
              <span className="text-[10px] text-slate-500 font-medium block">Verified Diplomas</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. 4 Academic Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-extrabold uppercase">Total XP</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{user?.xp || 1420} XP</p>
          <span className="text-[10px] text-emerald-600 font-bold">+150 XP today</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-extrabold uppercase">Current Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{user?.streak || 14} Days</p>
          <span className="text-[10px] text-orange-600 font-bold">Personal best streak!</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-extrabold uppercase">Completed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">28 / 35</p>
          <span className="text-[10px] text-slate-500 font-medium">80% Level 4 completed</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-extrabold uppercase">Diplomas Earned</span>
            <Award className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">3 Verified</p>
          <span className="text-[10px] text-cyan-600 font-bold">KHS & CIIL Accredited</span>
        </div>
      </div>

      {/* 4. Active Pathway Track Progress Cards */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">LEVEL 4 CURRICULUM</span>
            <h3 className="text-lg font-black text-slate-900">Active Devanagari & Grammar Pathway</h3>
          </div>
          <Link
            href="/dashboard/student?tab=levels"
            className="text-xs font-black text-orange-600 hover:underline inline-flex items-center gap-1"
          >
            View Full 7 Levels Pathway →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_LEVELS.slice(0, 2).map((lvl) => (
            <div key={lvl.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 font-black text-[10px]">
                  LEVEL {lvl.id}
                </span>
                <span className="text-xs font-bold text-slate-500">{lvl.totalLessons} Lessons</span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{lvl.titleHindi}</h4>
                <p className="text-xs text-slate-600 font-medium">{lvl.titleEng}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Progress</span>
                  <span className="text-orange-600">80% Complete</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
