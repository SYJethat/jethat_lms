'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Bot,
  Award,
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  ShieldCheck,
  Video,
  Building2,
  Mic,
  FileEdit,
  Headphones,
  CheckCircle2,
  Users,
  Globe,
  LogIn,
  User as UserIcon,
  DollarSign,
  BarChart3,
  Shield,
  MapPin,
  HelpCircle,
  FileText,
  CreditCard,
  GraduationCap
} from 'lucide-react';
import { MOCK_LEVELS, MOCK_TEACHERS, MOCK_INSTITUTES, MOCK_COMPETITIONS, User } from '@/lib/mockData';
import { loginUserByRole } from '@/lib/lmsStore';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const handleRoleQuickLogin = (roleId: User['role']) => {
    loginUserByRole(roleId);
    router.push(`/dashboard/${roleId}`);
  };

  const ROLES_QUICK_CARDS: { id: User['role']; title: string; desc: string; icon: any; color: string }[] = [
    { id: 'student', title: 'Student Portal', desc: '7-Level Gamified Pathway, AI Speech Tests, Battles & Library', icon: UserIcon, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'teacher', title: 'Teacher Console', desc: 'Live Video Classes, Roster & Online Assignment Evaluations', icon: BookOpen, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { id: 'creator', title: 'Course Creator Studio', desc: 'Devanagari Module Builder, Quizzes & 6-Stage Publishing Queue', icon: Sparkles, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
    { id: 'tester', title: 'Quality Testing Hub', desc: 'Devanagari Font Inspector, Audio TTS Test & QA Approval Portal', icon: Shield, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'institute', title: 'Institute Admin', desc: 'Physical Center Batches, Seating & University Certificate Issuance', icon: Building2, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { id: 'accounting', title: 'Accounting & Finance', desc: 'Revenue Ledgers, IAP & Play Store Gateways, GST Invoices', icon: DollarSign, color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { id: 'admin', title: 'Super Admin', desc: 'System RBAC Permission Matrix, AI Gateway & Audit Logs', icon: BarChart3, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  ];

  const FEATURE_CHECKLIST = [
    { num: '01', title: '1. Gamified 7-Level Pathway', desc: 'Progress from Devanagari script (A1.1) to Rajbhasha Fluency (C2) with XP & unlocks.', href: '/dashboard/student?tab=levels', icon: BookOpen },
    { num: '02', title: '2. Country & Global Competitions', desc: 'Live multiplayer spelling bees & Olympiads with country-wise filters.', href: '/dashboard/student?tab=competitions', icon: Trophy },
    { num: '03', title: '3. Leader Dashboard & Ranks', desc: 'International standings, daily XP ranks, and streak badges.', href: '/dashboard/student?tab=leaderboard', icon: BarChart3 },
    { num: '04', title: '4. Progress Level Tracking', desc: '72% overall progress bar, weekly goals, and course completion metrics.', href: '/dashboard/student', icon: GraduationCap },
    { num: '05', title: '5. IAP & Multi-Gateway Compliance', desc: 'Apple IAP, Google Play Billing, Razorpay & Stripe GST compliance.', href: '/dashboard/accounting?tab=gateways', icon: CreditCard },
    { num: '06', title: '6. AI Hindi Chatbot (शिक्षक)', desc: 'Real-time conversational Devanagari tutor with TTS speech playback.', href: '/dashboard/student?tab=chatbot', icon: Bot },
    { num: '07', title: '7. 3D Digital Avatars', desc: 'Photorealistic lip-synced AI virtual teachers for guided video lessons.', href: '/dashboard/student?tab=avatar', icon: Sparkles },
    { num: '08', title: '8. Study Materials & Worksheets', desc: 'Grammar reference guides, PDF worksheets, and Devanagari charts.', href: '/dashboard/student?tab=library', icon: FileText },
    { num: '09', title: '9. Live Interactive Classes', desc: 'Scheduled video classrooms with certified university Hindi professors.', href: '/dashboard/student?tab=classes', icon: Video },
    { num: '10', title: '10. Virtual Teachers Directory', desc: 'Acharya Aarav Shastri, Dr. Ananya Sharma & Prof. Kabir Verma.', href: '/dashboard/student?tab=avatar', icon: UserIcon },
    { num: '11', title: '11. Physical Centers Registration', desc: 'Region-wise offline campus registration in Agra, Delhi, Jaipur & Varanasi.', href: '/dashboard/student?tab=physical', icon: MapPin },
    { num: '12', title: '12. Online Classes Registration', desc: '1-click seat booking for live interactive online sessions.', href: '/dashboard/student?tab=classes', icon: CheckCircle2 },
    { num: '13', title: '13. Multiple Indian Institutes', desc: 'Kendriya Hindi Sansthan, BHU, Delhi University accredited diplomas.', href: '/dashboard/student?tab=institutes', icon: Building2 },
    { num: '14', title: '14. Online Assignments Queue', desc: 'Student essay submission with AI scoring & teacher grade override.', href: '/dashboard/teacher?tab=assignments', icon: FileEdit },
    { num: '15', title: '15. AI Listening, Writing & Speaking', desc: 'Speech phonetics, Devanagari grammar review, and listening tests by AI.', href: '/dashboard/student?tab=speaking-test', icon: Mic },
    { num: '16', title: '16. Digital Libraries & Novels', desc: 'Premchand novels (Godaan), audiobooks, and daily Hindi news digests.', href: '/dashboard/student?tab=library', icon: BookOpen },
    { num: '17', title: '17. Online Exam Engine', desc: 'Timed online exam engine with instant scoring & QR certificate issuance.', href: '/exam/ex_101', icon: HelpCircle },
  ];

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      {/* HERO SECTION WITH WHITE BACKGROUND & COMPLIANCE BADGES */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          {/* Government Compliance Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>केंद्रीय हिंदी संस्थान • Ministry of Education Compliant</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>NEP 2020 & Rajbhasha Standard</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold shadow-xs">
              <CreditCard className="w-4 h-4 text-rose-600" />
              <span>Apple IAP & Google Play Billing Compliant</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto">
            Autonomous AI-Powered <br />
            <span className="text-blue-600">Hindi Language LMS Portal</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Gamified 7-level pathway, real-time AI speech evaluation, accredited university diplomas, live interactive classrooms, and 7 role-based dashboards.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 flex items-center gap-2 hover:scale-105 transition"
            >
              <LogIn className="w-4 h-4" /> Open LMS Portal & Select Role
            </button>
            <Link
              href="/dashboard/student?tab=levels"
              className="px-8 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              Explore 7-Level Pathway <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 17 CORE FEATURE HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest">
            COMPLETE FEATURE MATRIX (17 CORE MODULES)
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            All 17 Features Implemented & Dashboard Ready
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-2xl mx-auto">
            Click any feature below to launch directly inside the dashboard workspace:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURE_CHECKLIST.map((feat) => (
            <Link
              key={feat.num}
              href={feat.href}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 space-y-3 shadow-xs clean-card-hover flex items-start gap-4 transition"
            >
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <feat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  FEATURE {feat.num}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MULTI-ROLE LOGGING PORTAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest">
            AUTHENTICATION & DASHBOARD ACCESS
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            LMS Portal Role Login & Workspaces
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-xl mx-auto">
            Select who is logging in to launch their specific single-dashboard environment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES_QUICK_CARDS.map((r) => (
            <div
              key={r.id}
              onClick={() => handleRoleQuickLogin(r.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition flex items-start gap-4 hover:scale-102 hover:shadow-md bg-white ${r.color}`}
            >
              <div className="p-3 rounded-2xl bg-white shadow-xs shrink-0">
                <r.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">{r.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.desc}</p>
                <span className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-1 pt-1">
                  Launch {r.title} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LMS PORTAL ROLE SELECTOR MODAL */}
      {roleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                  LMS PORTAL MULTI-ROLE SYSTEM
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Who is Logging In?
                </h2>
              </div>
              <button onClick={() => setRoleModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {ROLES_QUICK_CARDS.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    setRoleModalOpen(false);
                    handleRoleQuickLogin(r.id);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 hover:scale-102 ${r.color}`}
                >
                  <div className="p-2.5 rounded-xl bg-white shadow-xs shrink-0">
                    <r.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{r.title}</h3>
                    <p className="text-[11px] text-slate-600 font-medium">{r.desc}</p>
                    <span className="text-[10px] text-blue-600 font-bold mt-1 inline-block">
                      Sign In as {r.title} →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
