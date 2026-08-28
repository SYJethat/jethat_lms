'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Award, Globe, ShieldCheck, Heart, CreditCard, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [certSearchId, setCertSearchId] = useState('');

  // Only display global Footer on public landing page ('/')
  if (pathname !== '/') return null;

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Col 1: Brand Info & Government Compliance */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              हि
            </div>
            <span className="text-lg font-black text-slate-900">
              केंद्रीय हिंदी <span className="text-blue-600">LMS PORTAL</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md font-medium">
            Autonomous Hindi Language Learning Management System powering global students, accredited Indian universities, AI speech assessment, live classrooms, and verified certifications.
          </p>

          {/* Compliance & Regulation Badges */}
          <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Ministry of Education
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> NEP 2020 Aligned
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-rose-600" /> IAP & Play Store Compliant
            </span>
          </div>

          {/* Certificate Quick Lookup Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 max-w-md">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-blue-600" /> Public Certificate Verification
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certSearchId}
                onChange={(e) => setCertSearchId(e.target.value)}
                placeholder="Enter Certificate ID (e.g. HLMS-2026-884920)"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
              <Link
                href={`/certificates/verify/${certSearchId || 'HLMS-2026-884920'}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shrink-0 transition shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Verify
              </Link>
            </div>
          </div>
        </div>

        {/* Col 2: 17 Core Features */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">Core Features</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/dashboard/student?tab=levels" className="hover:text-blue-600 transition">1. 7-Level Game Pathway</Link></li>
            <li><Link href="/dashboard/student?tab=competitions" className="hover:text-blue-600 transition">2. Country & Global Battles</Link></li>
            <li><Link href="/dashboard/student?tab=leaderboard" className="hover:text-blue-600 transition">3. Leader Dashboard</Link></li>
            <li><Link href="/dashboard/student" className="hover:text-blue-600 transition">4. Progress Tracking</Link></li>
            <li><Link href="/dashboard/student?tab=chatbot" className="hover:text-blue-600 transition">6. AI Hindi Chatbot</Link></li>
            <li><Link href="/dashboard/student?tab=avatar" className="hover:text-blue-600 transition">7. 3D Digital Avatars</Link></li>
            <li><Link href="/dashboard/student?tab=library" className="hover:text-blue-600 transition">8. Study Materials</Link></li>
          </ul>
        </div>

        {/* Col 3: AI Tests & Classes */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">AI Tests & Classes</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/dashboard/student?tab=classes" className="hover:text-blue-600 transition">9. Live Classes</Link></li>
            <li><Link href="/dashboard/student?tab=avatar" className="hover:text-blue-600 transition">10. Virtual Teachers</Link></li>
            <li><Link href="/dashboard/student?tab=physical" className="hover:text-blue-600 transition">11. Physical Centers</Link></li>
            <li><Link href="/dashboard/student?tab=institutes" className="hover:text-blue-600 transition">13. Indian Institutes</Link></li>
            <li><Link href="/dashboard/teacher?tab=assignments" className="hover:text-blue-600 transition">14. Online Assignments</Link></li>
            <li><Link href="/dashboard/student?tab=speaking-test" className="hover:text-blue-600 transition">15. AI Speech & Writing</Link></li>
            <li><Link href="/exam/ex_101" className="hover:text-blue-600 transition">17. Online Exam Engine</Link></li>
          </ul>
        </div>

        {/* Col 4: Role Dashboards */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">Role Dashboards</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/dashboard/student" className="hover:text-blue-600 transition">Student Console</Link></li>
            <li><Link href="/dashboard/teacher" className="hover:text-blue-600 transition">Teacher Console</Link></li>
            <li><Link href="/dashboard/creator" className="hover:text-blue-600 transition">Course Creator Studio</Link></li>
            <li><Link href="/dashboard/tester" className="hover:text-blue-600 transition">Quality Tester Hub</Link></li>
            <li><Link href="/dashboard/institute" className="hover:text-blue-600 transition">Institute Admin</Link></li>
            <li><Link href="/dashboard/accounting" className="hover:text-blue-600 transition">Accounting & Finance</Link></li>
            <li><Link href="/dashboard/admin" className="hover:text-blue-600 transition">Super Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <p className="flex items-center gap-1 text-slate-500">
          Designed for Hindi learners worldwide. © 2026 Kendriya Hindi LMS Portal. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1 text-blue-600 font-bold">
            <Globe className="w-3.5 h-3.5" /> 7 Roles & 17 Core Features Ready
          </span>
        </div>
      </div>
    </footer>
  );
}
