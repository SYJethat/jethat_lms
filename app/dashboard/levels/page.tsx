'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Lock, Star, Play, Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function DashboardLevelsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
            Curriculum Pathway
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Gamified 7-Level Hindi Learning Pathway</h1>
          <p className="text-xs text-slate-500 font-medium">Progress from Devanagari script (A1.1) to Official Rajbhasha Fluency (C2).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LEVELS.map((lvl) => (
          <div key={lvl.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs clean-card-hover flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-600 border border-blue-200">
                  CEFR {lvl.cefr} • Level {lvl.id}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{lvl.totalLessons} Lessons</span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{lvl.titleHindi}</h3>
                <h4 className="text-xs font-bold text-blue-600">{lvl.titleEng}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{lvl.description}</p>
            </div>

            <Link
              href={`/learn/lesson/les_1_1`}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center block transition shadow-sm"
            >
              Start Level {lvl.id} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
