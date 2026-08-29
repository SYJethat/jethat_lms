'use client';

import React, { useEffect, useState, Suspense } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import NotificationCenter from '@/components/NotificationCenter';
import SearchModal from '@/components/SearchModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Calendar,
  Globe,
  Flame,
  Zap,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Shield,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';
import { getActiveRole, getStoredUser, setActiveRoleInStore, User } from '@/lib/lmsStore';

const ROLES_LIST: { id: User['role']; label: string; desc: string }[] = [
  { id: 'student', label: 'Student Console', desc: 'Learner & Exam Candidate' },
  { id: 'teacher', label: 'Teacher Console', desc: 'Faculty & Roster Evaluator' },
  { id: 'creator', label: 'Course Creator', desc: 'Curriculum & Quiz Author' },
  { id: 'tester', label: 'Quality Auditor', desc: 'QA Content Auditor' },
  { id: 'institute', label: 'Institute Admin', desc: 'Batches & Center Manager' },
  { id: 'accounting', label: 'Finance Controller', desc: 'Revenue & Fee Ledgers' },
  { id: 'admin', label: 'Super Admin', desc: 'System RBAC & Config' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<User['role']>('student');
  const [user, setUser] = useState<User | null>(null);
  
  // Interactive Modal & Dropdown States
  const [searchOpen, setSearchOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setRole(getActiveRole());
    setUser(getStoredUser());

    const handleUpdate = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('userStateUpdated', handleUpdate);
    return () => window.removeEventListener('userStateUpdated', handleUpdate);
  }, [pathname]);

  const handleSwitchRole = (newRole: User['role']) => {
    setRole(newRole);
    setActiveRoleInStore(newRole);
    setProfileOpen(false);
    router.push(`/dashboard/${newRole}`);
  };

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-800 antialiased font-sans">
      {/* 1. Left Sidebar */}
      <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200 h-screen shrink-0" />}>
        <DashboardSidebar />
      </Suspense>

      {/* 2. Main Workspace Right Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ENHANCED TOP DASHBOARD NAVIGATION BAR */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-xs">
          {/* Left Console Title & Welcome Message */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Academic Console
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black uppercase">
                  {role} Stream
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden sm:block">
                Welcome back, <strong className="text-slate-800">{user?.name || 'Aarav Sharma'}</strong> • National LMS Learning Portal
              </p>
            </div>
          </div>

          {/* Right Header Controls (Search, Calendar, Notifications, Streak, Profile) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 text-xs w-36 sm:w-60 transition"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Search courses, modules...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-500 rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* 📅 Interactive Calendar Widget & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                  setStreakOpen(false);
                  setProfileOpen(false);
                }}
                className={`px-3 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition ${
                  calendarOpen
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Calendar className={`w-4 h-4 ${calendarOpen ? 'text-white' : 'text-indigo-600'}`} />
                <span className="hidden md:inline">{getFormattedDate()}</span>
              </button>

              {calendarOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-5 space-y-4 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <h4 className="font-extrabold text-sm text-slate-900">Academic Schedule</h4>
                    </div>
                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      TODAY: {getFormattedDate()}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      UPCOMING TODAY & TOMORROW
                    </span>

                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-amber-950">
                        <span>📹 Live Practice Class</span>
                        <span className="text-[10px] font-black text-amber-800">18:00 PM</span>
                      </div>
                      <p className="text-[11px] text-amber-900 font-medium">SOV Grammar & Sentence Construction with Dr. Devendra</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-emerald-950">
                        <span>📝 Assignment Due</span>
                        <span className="text-[10px] font-black text-emerald-800">23:59 PM</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 font-medium">Devanagari Written Practice Exercise Submission</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCalendarOpen(false);
                      router.push(`/dashboard/${role}?tab=classes`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition text-center block"
                  >
                    View Complete Class Calendar →
                  </button>
                </div>
              )}
            </div>

            {/* 🔔 Notification Center */}
            <NotificationCenter />

            {/* 🔥 Interactive Streak Counter Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setStreakOpen(!streakOpen);
                  setCalendarOpen(false);
                  setProfileOpen(false);
                }}
                className={`px-3 py-2 rounded-2xl border text-xs font-black flex items-center gap-1.5 transition ${
                  streakOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                    : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{user?.streak || 14} Days</span>
              </button>

              {streakOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-5 space-y-4 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h4 className="font-extrabold text-sm text-slate-900">Daily Learning Streak</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                      🔥 {user?.streak || 14} DAYS
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 space-y-2 shadow-md">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span>STREAK GOAL STATUS</span>
                      <span>14 / 30 DAYS</span>
                    </div>
                    <div className="w-full bg-slate-950/20 rounded-full h-2">
                      <div className="bg-slate-950 h-2 rounded-full w-1/2" />
                    </div>
                    <span className="text-[11px] font-bold block pt-1">
                      🎉 +150 XP Earned Today! Complete 1 more lesson tomorrow.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      WEEKLY STREAK ACTIVITY
                    </span>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl border font-black text-xs ${
                            idx < 5
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'bg-amber-100 border-amber-300 text-amber-900'
                          }`}
                        >
                          <span className="block text-[9px] text-slate-400">{day}</span>
                          ✓
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-indigo-600" /> Streak Freeze Shield:
                    </span>
                    <span className="font-black text-emerald-600">Active (1 Left)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 👤 Enhanced User Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setCalendarOpen(false);
                  setStreakOpen(false);
                }}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                    {user?.name?.[0] || 'A'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-3 divide-y divide-slate-100 text-xs text-left animate-in fade-in zoom-in-95 duration-150">
                  {/* User Login Info Header */}
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-md shrink-0">
                        {user?.name?.[0] || 'A'}
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">{user?.name || 'Aarav Sharma'}</h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate">{user?.email || 'aarav.sharma@lms.edu.in'}</p>
                        <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          Student • Level 4 Scholar
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Total Academic XP:</span>
                      <span className="text-amber-600 font-black">2,450 XP ⚡</span>
                    </div>
                  </div>

                  {/* Profile Actions & Logout */}
                  <div className="pt-2 space-y-1">
                    <Link
                      href={`/dashboard/${role}?tab=overview`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition"
                    >
                      <UserIcon className="w-4 h-4 text-indigo-600" /> Account Profile Details
                    </Link>

                    <Link
                      href={`/dashboard/${role}?tab=certificates`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition"
                    >
                      <Award className="w-4 h-4 text-amber-500" /> My Accredited Certificates
                    </Link>

                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out / Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content Window */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Suspense fallback={<div className="p-8 font-bold text-slate-400">Loading Console...</div>}>
            {children}
          </Suspense>
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
