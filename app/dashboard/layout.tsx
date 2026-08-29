'use client';

import React, { useEffect, useState, Suspense } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import NotificationCenter from '@/components/NotificationCenter';
import SearchModal from '@/components/SearchModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Calendar, Globe, Flame, Zap, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { getActiveRole, getStoredUser, setActiveRoleInStore, User } from '@/lib/lmsStore';

const ROLES_LIST: { id: User['role']; label: string }[] = [
  { id: 'student', label: 'Student' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'creator', label: 'Course Creator' },
  { id: 'tester', label: 'Quality Tester' },
  { id: 'institute', label: 'Institute Admin' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'admin', label: 'Super Admin' },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    setRole(getActiveRole());
    setUser(getStoredUser());
  }, [pathname]);

  const handleSwitchRole = (newRole: User['role']) => {
    setRole(newRole);
    setActiveRoleInStore(newRole);
    setRoleDropdownOpen(false);
    router.push(`/dashboard/${newRole}`);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-800 antialiased">
      {/* 1. Dedicated Left Sidebar */}
      <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200 h-screen shrink-0" />}>
        <DashboardSidebar />
      </Suspense>

      {/* 2. Main Workspace Right Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Console Bar Matching Screenshot */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs">
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">Academic Console</h1>
            <p className="text-xs font-medium text-slate-500">
              {user?.name || 'Arjun Sharma'} • Welcome back • {role.toUpperCase()} Stream
            </p>
          </div>

          {/* Center Search Input & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 text-xs w-48 sm:w-64 transition"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search courses, modules...</span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Calendar</span>
            </button>

            {/* Notification Center */}
            <NotificationCenter />

            {/* Language Selector */}
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Hindi</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Streak Counter Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{user?.streak || 12} Day Streak</span>
            </div>

            {/* Role Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-blue-400/50 hover:scale-105 transition"
              >
                {user?.name?.[0] || 'A'}
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 divide-y divide-slate-100 text-xs">
                  <div className="p-2">
                    <p className="font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-blue-600 font-semibold uppercase">{role} Role Active</p>
                  </div>

                  <div className="py-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1 block">Switch User Role</span>
                    {ROLES_LIST.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleSwitchRole(r.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition flex items-center justify-between ${
                          role === r.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{r.label}</span>
                        {role === r.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <Link
                      href="/login"
                      onClick={() => setRoleDropdownOpen(false)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout / Multi-Role Portal
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
