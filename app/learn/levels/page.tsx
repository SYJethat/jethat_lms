'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, Unlock, CheckCircle2, Star, Zap, BookOpen, ArrowRight, Trophy } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function LevelsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Gamified Hindi <span className="gradient-text-saffron">Learning Pathway</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Progress from basic Devanagari script to professional simultaneous translation. Earn XP, unlock chapters, and climb the global leaderboards.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_LEVELS.map((level) => (
          <div
            key={level.id}
            className={`glass-card p-6 sm:p-8 rounded-3xl border transition ${
              level.unlocked
                ? 'border-slate-800 hover:border-hindi-saffron/40'
                : 'border-slate-800/40 opacity-70 bg-slate-950/40'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${
                    level.unlocked
                      ? 'bg-gradient-to-tr from-hindi-saffron to-amber-500 text-slate-950 shadow-lg shadow-hindi-saffron/20'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {level.unlocked ? level.id : <Lock className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-white">{level.titleHindi}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-hindi-saffron/20 text-hindi-saffron border border-hindi-saffron/30">
                      CEFR {level.cefr}
                    </span>
                    {level.progress === 100 && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs text-hindi-saffron font-medium">{level.titleEng}</h3>
                  <p className="text-xs text-slate-300 max-w-2xl pt-1 leading-relaxed">{level.description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Lessons & XP</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-hindi-saffron" /> {level.totalLessons} Lessons • <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> {level.requiredXp} XP Req.
                  </span>
                </div>

                {level.unlocked ? (
                  <Link
                    href={`/learn/lesson/les_1_1`}
                    className="px-6 py-3 rounded-xl bg-hindi-saffron hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
                  >
                    Open Level {level.id} <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button disabled className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 font-bold text-xs flex items-center gap-2 cursor-not-allowed">
                    <Lock className="w-4 h-4" /> Locked ({level.requiredXp} XP needed)
                  </button>
                )}
              </div>
            </div>

            {/* Level Chapter Cards Preview */}
            {level.lessons.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {level.lessons.map((les) => (
                  <Link
                    key={les.id}
                    href={`/learn/lesson/${les.id}`}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-hindi-saffron/40 flex items-center justify-between group transition"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-hindi-saffron uppercase">{les.type} lesson</span>
                      <h4 className="text-sm font-bold text-white group-hover:text-hindi-saffron transition">{les.titleHindi}</h4>
                      <p className="text-xs text-slate-400">{les.titleEng}</p>
                    </div>
                    <span className="p-2 rounded-lg bg-slate-800 text-hindi-saffron font-bold text-xs">
                      +{les.xpReward} XP
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
