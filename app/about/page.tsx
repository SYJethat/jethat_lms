'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Bot,
  Trophy,
  ArrowRight,
  User as UserIcon,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 space-y-16">
      {/* Page Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-orange-400/40 inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-orange-400" /> ABOUT OUR NATIONAL LMS PLATFORM
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            भारत का राष्ट्रीय हिंदी एवं २२ अनुसूचित भाषा अध्ययन पोर्टल
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Autonomous Language Learning Management System designed under the National Education Policy (NEP 2020) and Official Language guidelines. Empowering learners worldwide through 24/7 AI tutoring, live video classrooms, and accredited university diplomas.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-left">
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider">
              OUR MISSION & VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Preserving Indian Linguistic Heritage with AI Innovation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Our mission is to make learning Hindi and all 22 Eighth Schedule Indian languages accessible, engaging, and 100% free of cost to every student, scholar, and non-native speaker across India and globally.
            </p>
            <div className="space-y-2 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Tuition Subsidies under NEP 2020 (Coupon: BHASHA2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 AI Video Call Teacher with live student webcam stream access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cryptographically QR-Verified Central University Diplomas</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-950 to-orange-950 text-white shadow-xl space-y-6 text-left border border-orange-500/30">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider">
              GOVERNMENT COMPLIANCE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Ministry of Education & Rajbhasha Accreditation
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Diplomas and certificates issued on our portal are accredited by Kendriya Hindi Sansthan Agra, Central Institute of Indian Languages (CIIL) Mysuru, BHU Varanasi, and Delhi University.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                <span className="text-2xl font-black text-amber-300 block">22</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Languages</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                <span className="text-2xl font-black text-emerald-400 block">8</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Universities</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                <span className="text-2xl font-black text-cyan-400 block">100%</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Subsidy</span>
              </div>
            </div>
          </div>
        </div>

        {/* 22 Scheduled Indian Languages Grid */}
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200">
              CONSTITUTIONAL COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              22 Eighth Schedule Indian Languages Supported
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-left">
            {[
              { name: 'हिंदी (Hindi)', code: 'HI', tag: 'Official' },
              { name: 'தமிழ் (Tamil)', code: 'TA', tag: 'Dravidian' },
              { name: 'తెలుగు (Telugu)', code: 'TE', tag: 'Dravidian' },
              { name: 'বাংলা (Bengali)', code: 'BN', tag: 'Eastern' },
              { name: 'मराठी (Marathi)', code: 'MR', tag: 'Devanagari' },
              { name: 'கன்னட (Kannada)', code: 'KN', tag: 'Dravidian' },
              { name: 'മലയാളം (Malayalam)', code: 'ML', tag: 'Southern' },
              { name: 'ગુજરાતી (Gujarati)', code: 'GU', tag: 'Western' },
              { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'PA', tag: 'Gurmukhi' },
              { name: 'ଓଡ଼ିଆ (Odia)', code: 'OR', tag: 'Eastern' },
              { name: 'اردو (Urdu)', code: 'UR', tag: 'Nasta\'liq' },
              { name: 'অসমীয়া (Assamese)', code: 'AS', tag: 'North-East' },
            ].map((lang, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">{lang.name}</h4>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{lang.tag}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-black text-[9px]">
                  {lang.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Launch Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-slate-950 text-white p-8 sm:p-12 text-center shadow-xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Start Learning Today with 100% Govt Subsidy
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Use scholarship coupon code <code className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-mono">BHASHA2026</code> to enroll in accredited diploma courses for free.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/student"
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition"
            >
              🚀 Launch Student Console Portal →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
