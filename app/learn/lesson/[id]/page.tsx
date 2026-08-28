'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Zap, Award, Sparkles, HelpCircle } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';
import { addXpToUser } from '@/lib/lmsStore';

export default function LessonPlayerPage({ params }: { params: { id: string } }) {
  const lesson = MOCK_LEVELS[0].lessons[0]; // Active lesson instance
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);

  const speakHindi = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizSubmit = (optIdx: number) => {
    setSelectedOption(optIdx);
    setIsAnswered(true);

    if (optIdx === lesson.content.quizQuestions?.[0].correctAnswer) {
      addXpToUser(lesson.xpReward);
      setEarnedXp(lesson.xpReward);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/learn/levels"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Learning Map
        </Link>
        <span className="px-3 py-1 rounded-full bg-hindi-saffron/20 text-hindi-saffron text-xs font-bold border border-hindi-saffron/30">
          Level 1 • +{lesson.xpReward} XP Reward
        </span>
      </div>

      {/* Lesson Main Card */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-hindi-saffron">Devanagari Vocab & Grammar</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">{lesson.titleHindi}</h1>
          <h2 className="text-sm text-slate-400">{lesson.titleEng}</h2>
          <p className="text-xs text-slate-300 mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
            {lesson.content.introduction}
          </p>
        </div>

        {/* Vocabulary Grid with TTS Audio */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-hindi-saffron" /> Devanagari Vocabulary (Click Speaker to Listen)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {lesson.content.vocabulary?.map((v, i) => (
              <div
                key={i}
                onClick={() => speakHindi(v.hindi)}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-hindi-saffron/50 transition cursor-pointer text-center space-y-2 group"
              >
                <div className="text-3xl font-black text-hindi-saffron group-hover:scale-110 transition">
                  {v.hindi}
                </div>
                <div className="text-xs font-semibold text-white">{v.transliteration}</div>
                <div className="text-[11px] text-slate-400">{v.english}</div>
                <button className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-hindi-saffron bg-hindi-saffron/10 px-2 py-0.5 rounded-full">
                  <Volume2 className="w-3 h-3" /> Audio
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Sentences */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conversational Examples</h3>
          <div className="space-y-2">
            {lesson.content.sampleSentences?.map((s, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{s.hindi}</p>
                  <p className="text-xs text-slate-400">{s.english}</p>
                </div>
                <button
                  onClick={() => speakHindi(s.hindi)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-hindi-saffron hover:text-slate-950 text-hindi-saffron transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Quiz Question */}
        {lesson.content.quizQuestions && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" /> Lesson Quiz Check
            </h3>

            <p className="text-sm font-semibold text-white">
              {lesson.content.quizQuestions[0].question}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {lesson.content.quizQuestions[0].options.map((opt, i) => {
                const isCorrect = i === lesson.content.quizQuestions?.[0].correctAnswer;
                const isSelected = selectedOption === i;

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => handleQuizSubmit(i)}
                    className={`p-3.5 rounded-xl text-left font-bold text-sm transition border ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                        : 'bg-slate-900 text-white border-slate-800 hover:border-hindi-saffron/40'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Explanation: {lesson.content.quizQuestions[0].explanation}
                </p>
                {earnedXp && (
                  <div className="p-2 rounded bg-hindi-saffron/20 text-hindi-saffron text-xs font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 fill-hindi-saffron" /> Congratulations! You earned +{earnedXp} XP and completed this lesson!
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
