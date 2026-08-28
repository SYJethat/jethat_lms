'use client';

import React, { useState } from 'react';
import { Trophy, Globe, Building2, Users, Calendar, Award, ArrowRight, ShieldAlert } from 'lucide-react';
import { MOCK_COMPETITIONS } from '@/lib/mockData';

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Country' | 'Global' | 'Institute'>('All');

  const filtered = activeTab === 'All'
    ? MOCK_COMPETITIONS
    : MOCK_COMPETITIONS.filter((c) => c.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Hindi Language <span className="gradient-text-saffron">Competitions & Battle Arena</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Compete globally, represent your country, or participate in institute-level Hindi battles. Win certificates, badges, and XP pools.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {['All', 'Global', 'Country', 'Institute'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeTab === tab
                ? 'bg-hindi-saffron text-slate-950 border-hindi-saffron shadow-lg'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {tab === 'Country' && '🇮🇳 Country vs Country'}
            {tab === 'Global' && '🌐 Global Olympiad'}
            {tab === 'Institute' && '🏫 Inter-Institute'}
            {tab === 'All' && 'All Competitions'}
          </button>
        ))}
      </div>

      {/* Competition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((comp) => (
          <div key={comp.id} className="glass-card glass-card-hover rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden">
              <img src={comp.bannerUrl} alt={comp.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-hindi-saffron border border-hindi-saffron/40 backdrop-blur-md">
                {comp.type} Battle
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{comp.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-hindi-saffron" /> {comp.startDate}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-400" /> {comp.participantsCount} Joined</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-400 font-bold flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" /> Prize: {comp.prizePool}
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-hindi-saffron to-amber-500 hover:from-amber-600 hover:to-hindi-saffron text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md">
                Enter Competition Arena →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
