'use client';

import React, { useState } from 'react';
import { Trophy, Flame, Zap, Award, Globe, Medal } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<'Global' | 'Country' | 'Institute'>('Global');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Global Hindi <span className="gradient-text-saffron">Leaderboard & Standings</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Top Hindi learners ranked by XP, consecutive streaks, speaking accuracy, and examination scores.
        </p>
      </div>

      {/* Filter Options */}
      <div className="flex justify-center gap-2">
        {['Global', 'Country', 'Institute'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-5 py-2 rounded-xl text-xs font-bold border transition ${
              filter === f
                ? 'bg-hindi-saffron text-slate-950 border-hindi-saffron'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {f} Leaderboard
          </button>
        ))}
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end pt-4">
        {/* Rank 2 */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-3 order-2 md:order-1">
          <Medal className="w-8 h-8 text-slate-300 mx-auto" />
          <img src={MOCK_LEADERBOARD[1].avatar} alt="" className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-slate-400" />
          <div>
            <h3 className="text-base font-bold text-white">{MOCK_LEADERBOARD[1].name}</h3>
            <span className="text-xs text-slate-400 block">{MOCK_LEADERBOARD[1].country}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 font-bold text-xs text-slate-300">
            {MOCK_LEADERBOARD[1].xp} XP
          </div>
        </div>

        {/* Rank 1 (Tallest Podium) */}
        <div className="glass-card p-6 rounded-2xl border border-hindi-saffron text-center space-y-3 order-1 md:order-2 bg-slate-900/90 shadow-xl shadow-hindi-saffron/10">
          <Trophy className="w-10 h-10 text-amber-400 fill-amber-400 mx-auto animate-bounce" />
          <img src={MOCK_LEADERBOARD[0].avatar} alt="" className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-hindi-saffron" />
          <div>
            <h3 className="text-lg font-bold text-white">{MOCK_LEADERBOARD[0].name}</h3>
            <span className="text-xs text-hindi-saffron font-bold block">{MOCK_LEADERBOARD[0].country}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-hindi-saffron text-slate-950 font-black text-sm">
            🥇 {MOCK_LEADERBOARD[0].xp} XP
          </div>
        </div>

        {/* Rank 3 */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-3 order-3">
          <Medal className="w-8 h-8 text-amber-600 mx-auto" />
          <img src={MOCK_LEADERBOARD[2].avatar} alt="" className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-amber-600" />
          <div>
            <h3 className="text-base font-bold text-white">{MOCK_LEADERBOARD[2].name}</h3>
            <span className="text-xs text-slate-400 block">{MOCK_LEADERBOARD[2].country}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 font-bold text-xs text-amber-500">
            {MOCK_LEADERBOARD[2].xp} XP
          </div>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden max-w-4xl mx-auto">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between text-xs font-bold text-slate-400">
          <span>Rank & Learner</span>
          <span>Country & Institute</span>
          <span>XP & Streak</span>
        </div>

        <div className="divide-y divide-slate-800">
          {MOCK_LEADERBOARD.map((usr) => (
            <div key={usr.id} className="p-4 flex items-center justify-between hover:bg-slate-900/60 transition">
              <div className="flex items-center gap-3">
                <span className="w-7 text-center font-bold text-sm text-slate-400">#{usr.rank}</span>
                <img src={usr.avatar} alt="" className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700" />
                <div>
                  <h4 className="text-sm font-bold text-white">{usr.name}</h4>
                  <span className="text-xs text-slate-400">Speaking Accuracy: {usr.speakingScore}%</span>
                </div>
              </div>

              <div className="text-center hidden sm:block">
                <span className="text-xs font-semibold text-slate-300 block">{usr.country}</span>
                <span className="text-[11px] text-slate-400">{usr.institute}</span>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-hindi-saffron block flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-hindi-saffron" /> {usr.xp} XP
                </span>
                <span className="text-xs text-amber-400 flex items-center justify-end gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> {usr.streak} Days
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
