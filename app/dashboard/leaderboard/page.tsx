'use client';

import React from 'react';
import { BarChart3, Trophy, Award, Flame } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

export default function DashboardLeaderboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Global Rankings
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">International Learner Leaderboard</h1>
        <p className="text-xs text-slate-500 font-medium">Rankings updated daily based on lesson XP, AI speech scores, and competition standings.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-500">
          <span>Rank & Student</span>
          <span>Country & Institute</span>
          <span>XP Score</span>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_LEADERBOARD.map((usr) => (
            <div key={usr.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition text-xs">
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                  usr.rank === 1 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400' :
                  usr.rank === 2 ? 'bg-slate-200 text-slate-700' :
                  usr.rank === 3 ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  #{usr.rank}
                </span>
                <img src={usr.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500" />
                <div>
                  <h4 className="font-bold text-slate-900">{usr.name}</h4>
                  <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-500" /> {usr.streak} Day Streak
                  </span>
                </div>
              </div>

              <div className="text-slate-600 font-medium">{usr.country} • {usr.institute}</div>
              <div className="font-black text-blue-600 text-sm">{usr.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
