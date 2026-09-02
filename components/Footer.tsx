'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState('');

  // Hide Footer on dashboard and exam pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/exam')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-orange-500 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Quick Access & Subscription Banner */}
      <div className="max-w-7xl mx-auto mb-10 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-wider border border-orange-500/30">
            OFFICIAL RAJBHASHA NOTIFICATIONS
          </span>
          <h3 className="text-base font-black text-white">Subscribe to National LMS Circulars & Exam Dates</h3>
          <p className="text-xs text-slate-400 font-medium">Get real-time alerts for NEP 2020 scholarships, university exam timetables, and AI updates.</p>
        </div>
        {subscribed ? (
          <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> You are subscribed to official portal circulars!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your official email..."
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 font-medium w-full sm:w-64"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        {/* Col 1: Brand Info & Government Compliance */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <Link href="/" className="inline-block group py-1">
            <img
              src="/logo.png"
              alt="JetHat Cyber Security & Language LMS Logo"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:scale-105"
            />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md font-medium">
            National Autonomous Hindi & 22 Scheduled Indian Languages LMS Portal under the National Education Policy (NEP 2020) and Official Language guidelines. Empowering learners worldwide with 24/7 AI Video tutoring, live video classrooms, and accredited university diplomas.
          </p>

          {/* Compliance & Regulation Badges */}
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-orange-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> Ministry of Education Compliant
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> NEP 2020 Aligned
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> 100% Free Govt Subsidy (BHASHA2026)
            </span>
          </div>
        </div>

        {/* Col 2: Public Main Navigation & Pages */}
        <div className="text-left">
          <h4 className="text-xs font-black uppercase tracking-wider text-orange-400 mb-4">Quick Navigation</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/" className="hover:text-orange-400 transition">🏠 LMS Home Portal</Link></li>
            <li><Link href="/about" className="hover:text-orange-400 transition">🏛️ About Us & Mission</Link></li>
            <li><Link href="/resources" className="hover:text-orange-400 transition">🎁 Free Resources Hub</Link></li>
            <li><Link href="/how-to-use" className="hover:text-orange-400 transition">📖 How to Use User Guide</Link></li>
            <li><Link href="/#indian-languages" className="hover:text-orange-400 transition">🇮🇳 22 Scheduled Languages</Link></li>
            <li><Link href="/#universities" className="hover:text-orange-400 transition">📜 Accredited Central Universities</Link></li>
          </ul>
        </div>

        {/* Col 3: AI & Learning Features */}
        <div className="text-left">
          <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-4">AI & Learning Features</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/dashboard/student?tab=chatbot" className="hover:text-cyan-400 transition">🤖 1v1 AI Video Call Teacher</Link></li>
            <li><Link href="/dashboard/student?tab=classes" className="hover:text-cyan-400 transition">📹 HD Live Video Classroom</Link></li>
            <li><Link href="/dashboard/student?tab=competitions" className="hover:text-cyan-400 transition">🏆 1v1 Multiplayer Quiz Battles</Link></li>
            <li><Link href="/dashboard/student?tab=speaking-test" className="hover:text-cyan-400 transition">🎙️ AI Speech & Writing QA</Link></li>
            <li><Link href="/dashboard/student?tab=physical" className="hover:text-cyan-400 transition">🏫 Region Physical Campus Pass</Link></li>
            <li><Link href="/exam/ex_101" className="hover:text-cyan-400 transition">📝 Online Anti-Cheating Exam</Link></li>
          </ul>
        </div>

        {/* Col 4: Role Dashboards */}
        <div className="text-left">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-4">Console Workspaces</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/dashboard/student" className="hover:text-amber-400 transition">🎓 Student Console Portal</Link></li>
            <li><Link href="/dashboard/teacher" className="hover:text-amber-400 transition">👨‍🏫 Faculty Teacher Console</Link></li>
            <li><Link href="/dashboard/creator" className="hover:text-amber-400 transition">✍️ Course Creator Studio</Link></li>
            <li><Link href="/dashboard/tester" className="hover:text-amber-400 transition">🛡️ Quality Testing Hub</Link></li>
            <li><Link href="/dashboard/institute" className="hover:text-amber-400 transition">🏛️ Institute Campus Admin</Link></li>
            <li><Link href="/dashboard/admin" className="hover:text-amber-400 transition">⚡ Super Admin System RBAC</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <p className="flex items-center gap-1 text-slate-400">
          Designed for Hindi & Indian language scholars worldwide. © 2026 Kendriya Hindi LMS Portal. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-orange-400 font-bold">
            <Globe className="w-3.5 h-3.5" /> Official Rajbhasha & NEP 2020 Compliant
          </span>
        </div>
      </div>
    </footer>
  );
}
