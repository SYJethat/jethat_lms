'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Flame,
  Zap,
  Search,
  User as UserIcon,
  Globe,
  ChevronDown,
  Sparkles,
  Award,
  BookOpen,
  Trophy,
  Bot,
  Video,
  Building2,
  Shield,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Menu,
  X,
  LogIn
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import SearchModal from './SearchModal';
import { getStoredUser, getActiveRole, loginUserByRole, User } from '@/lib/lmsStore';

const ROLES_SELECTION: { id: User['role']; label: string; desc: string; icon: any; color: string }[] = [
  { id: 'student', label: 'Student', desc: 'Pathway, AI Chatbot, Avatars & Speech Tests', icon: UserIcon, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'teacher', label: 'Teacher', desc: 'Live Classes, Roster & Assignments Evaluation', icon: BookOpen, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { id: 'creator', label: 'Course Creator', desc: 'Curriculum Builder & Publishing Queue', icon: Sparkles, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { id: 'tester', label: 'Quality Tester', desc: 'Devanagari Font & Audio QA Audit', icon: Shield, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'institute', label: 'Institute Admin', desc: 'Centers, Batches & Certificate Issues', icon: Building2, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { id: 'accounting', label: 'Accounting', desc: 'Revenue Ledgers, IAP Breakdown & Invoices', icon: DollarSign, color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { id: 'admin', label: 'Super Admin', desc: 'Full System RBAC & AI Gateway Setup', icon: BarChart3, color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<User['role']>('student');
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setActiveRole(getActiveRole());
  }, [pathname]);

  // Only display global Navbar on public landing page ('/')
  if (pathname !== '/') return null;




  const handleSelectRoleAndLogin = (roleId: User['role']) => {
    loginUserByRole(roleId);
    setPortalModalOpen(false);
    router.push(`/dashboard/${roleId}`);
  };

  const navLinks = [
    { href: '/', label: 'मुख्य पृष्ठ (Home)' },
    { href: '/learn/levels', label: 'हिंदी स्तर (Pathway)' },
    { href: '/ai-hub/chatbot', label: 'AI शिक्षक (AI Hub)' },
    { href: '/competitions', label: 'प्रतियोगिता (Battles)' },
    { href: '/leaderboard', label: 'लीडरबोर्ड (Ranks)' },
    { href: '/classes/live', label: 'लाइव क्लास (Live)' },
    { href: '/institutes', label: 'संस्थान (Institutes)' },
    { href: '/library', label: 'पुस्तकालय (Library)' },
  ];

  return (
    <>
      {/* Navbar Container */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-1">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:scale-105"
            />
          </Link>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              title="Search platform"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <NotificationCenter />

            {/* PROMINENT LMS PORTAL MULTI-ROLE BUTTON MATCHING USER REQUEST */}
            <button
              onClick={() => setPortalModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition hover:scale-105"
            >
              <LogIn className="w-4 h-4" /> LMS Portal Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Global LMS Portal Role Selection Modal */}
      {portalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                  AI-POWERED HINDI LMS PORTAL
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Select Role to Access Dashboard
                </h2>
              </div>
              <button
                onClick={() => setPortalModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Choose your user role below to log in and access your dedicated console and custom sidebar tabs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {ROLES_SELECTION.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectRoleAndLogin(r.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 hover:scale-102 hover:shadow-md ${r.color}`}
                >
                  <div className="p-2.5 rounded-xl bg-white shadow-xs shrink-0">
                    <r.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{r.label}</h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5 line-clamp-2">{r.desc}</p>
                    <span className="text-[10px] text-blue-600 font-bold mt-2 inline-flex items-center gap-1">
                      Login as {r.label} →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-500 border-t border-slate-100">
              <span>Centralized RBAC Session Control</span>
              <Link
                href="/login"
                onClick={() => setPortalModalOpen(false)}
                className="font-bold text-blue-600 hover:underline"
              >
                Open Full Login Page →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
