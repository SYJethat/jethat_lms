'use client';

import React from 'react';
import { Trophy, Calendar, Award, Zap, Flame, Users } from 'lucide-react';
import { MOCK_COMPETITIONS } from '@/lib/mockData';

export default function DashboardCompetitionsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase">
          Battle Arena & Olympiads
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Global Hindi Competitions</h1>
        <p className="text-xs text-slate-500 font-medium">Participate in live multiplayer Hindi spelling bees, Devanagari essay contests, and speed quizzes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_COMPETITIONS.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-600 border border-amber-200">
                  {c.type} Level
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {c.participantsCount} Joined
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{c.title}</h3>
              <div className="text-xs text-slate-500 space-y-1 font-medium">
                <p className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {c.startDate} - {c.endDate}</p>
                <p className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-500" /> Prize: {c.prizePool}</p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider text-center block transition shadow-sm">
              Register Battle Entry
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
