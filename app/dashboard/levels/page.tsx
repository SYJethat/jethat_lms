'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Lock, Star, Play, Sparkles, ArrowRight, Zap, Trophy, ChevronRight } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function DashboardLevelsPage() {
  return (
    <div className="max-w-8xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-wider">
            OFFICIAL CURRICULUM PATHWAY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Gamified 7-Level Hindi Learning Pathway
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Progress from Devanagari script (A1.1) to Official Rajbhasha Fluency (C2). Select any lesson to open the Interactive Lesson Player.
          </p>
        </div>

        <Link
          href="/learn/levels"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shrink-0 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> Public Map View
        </Link>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LEVELS.map((lvl) => {
          const firstLessonId = lvl.lessons[0]?.id || 'les_1_1';

          return (
            <div
              key={lvl.id}
              className={`p-6 rounded-3xl bg-white border space-y-5 shadow-xs transition duration-200 flex flex-col justify-between ${
                lvl.unlocked ? 'border-slate-200 hover:shadow-md' : 'border-slate-100 opacity-75 bg-slate-50/50'
              }`}
            >
              <div className="space-y-4">
                {/* Level Header Info */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
                    CEFR {lvl.cefr} • Level {lvl.id}
                  </span>
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" /> {lvl.totalLessons} Lessons
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">{lvl.titleHindi}</h3>
                  <h4 className="text-xs font-bold text-blue-600">{lvl.titleEng}</h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">{lvl.description}</p>

                {/* Progress Indicator */}
                {lvl.unlocked && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500">Level Progress</span>
                      <span className="text-blue-600">{lvl.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                        style={{ width: `${lvl.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Individual Lessons List Inside Card */}
                {lvl.lessons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      Available Lessons:
                    </span>
                    <div className="space-y-1.5">
                      {lvl.lessons.map((les) => (
                        <Link
                          key={les.id}
                          href={`/dashboard/student?tab=lesson&id=${les.id}`}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 flex items-center justify-between group transition"
                        >
                          <div className="truncate pr-2">
                            <span className="text-[10px] font-extrabold text-blue-600 uppercase block">{les.type}</span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate block">
                              {les.titleHindi}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px] shrink-0">
                            +{les.xpReward} XP
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA Button */}
              {lvl.unlocked ? (
                <Link
                  href={`/dashboard/student?tab=lesson&id=${firstLessonId}`}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs text-center flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Play className="w-4 h-4 fill-white" /> Start Level {lvl.id} Player <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs text-center flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200"
                >
                  <Lock className="w-4 h-4" /> Locked ({lvl.requiredXp} XP Required)
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
