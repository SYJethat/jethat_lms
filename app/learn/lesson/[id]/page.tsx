'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Zap,
  Award,
  Sparkles,
  HelpCircle,
  Mic,
  RotateCcw,
  BookOpen,
  Check,
  Play,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { findLessonById } from '@/lib/mockData';
import { addXpToUser } from '@/lib/lmsStore';

export default function LessonPlayerPage({ params }: { params: { id: string } }) {
  const { lesson, level, prevLesson, nextLesson } = findLessonById(params.id);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz'>('learn');

  // Mic Speaking Practice Simulator State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ accuracy: number; fluency: number } | null>(null);

  // Audio Speech Synthesis
  const speakHindi = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizSubmit = (optIdx: number) => {
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === lesson.content.quizQuestions?.[0]?.correctAnswer;

    if (isCorrect) {
      addXpToUser(lesson.xpReward);
      setEarnedXp(lesson.xpReward);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDone(false);
    setScoreResult(null);

    setTimeout(() => {
      setIsRecording(false);
      setRecordingDone(true);
      const acc = Math.floor(Math.random() * 12) + 88; // 88 - 99%
      const flu = Math.floor(Math.random() * 10) + 90; // 90 - 99%
      setScoreResult({ accuracy: acc, fluency: flu });
      addXpToUser(15);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/learn/levels"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-hindi-saffron/40 transition"
          >
            <ArrowLeft className="w-4 h-4 text-hindi-saffron" /> Levels Map
          </Link>
          <Link
            href="/dashboard/levels"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-blue-500/40 transition"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" /> Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            {level?.titleHindi} ({level?.cefr})
          </span>
          <span className="px-3 py-1 rounded-full bg-hindi-saffron/20 text-hindi-saffron text-xs font-bold border border-hindi-saffron/30 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-hindi-saffron" /> +{lesson.xpReward} XP
          </span>
        </div>
      </div>

      {/* Main Lesson Player Container */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Lesson Title Header */}
        <div className="border-b border-slate-800/80 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-hindi-saffron/10 text-hindi-saffron border border-hindi-saffron/20">
              {lesson.type} LESSON
            </span>
            <span className="text-xs text-slate-400 font-medium">Duration: ~{lesson.durationMins} Mins</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            {lesson.titleHindi}
          </h1>
          <h2 className="text-sm font-semibold text-slate-400">{lesson.titleEng}</h2>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 leading-relaxed mt-4">
            <span className="font-bold text-hindi-saffron block mb-1">📘 Lesson Overview:</span>
            {lesson.content.introduction}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 max-w-md">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'learn'
                ? 'bg-hindi-saffron text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Vocabulary & Rules
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'practice'
                ? 'bg-hindi-saffron text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4" /> Speaking Practice
          </button>
          {lesson.content.quizQuestions && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                activeTab === 'quiz'
                  ? 'bg-hindi-saffron text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> Quiz Check
            </button>
          )}
        </div>

        {/* TAB 1: LEARN (Vocabulary & Rules) */}
        {activeTab === 'learn' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Grammar Rules Section */}
            {lesson.content.rules && lesson.content.rules.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Essential Grammar Rules
                </h3>
                <ul className="space-y-2">
                  {lesson.content.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vocabulary Grid */}
            {lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-hindi-saffron" /> Devanagari Vocabulary (Click Speaker to Listen)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {lesson.content.vocabulary.length} Items
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {lesson.content.vocabulary.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => speakHindi(v.hindi)}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-hindi-saffron/60 transition cursor-pointer text-center space-y-2 group shadow-sm hover:shadow-hindi-saffron/10"
                    >
                      <div className="text-3xl font-black text-hindi-saffron group-hover:scale-110 transition duration-200">
                        {v.hindi}
                      </div>
                      <div className="text-xs font-bold text-white">{v.transliteration}</div>
                      <div className="text-[11px] text-slate-400">{v.english}</div>
                      <button className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold text-hindi-saffron bg-hindi-saffron/10 px-2.5 py-1 rounded-full group-hover:bg-hindi-saffron group-hover:text-slate-950 transition">
                        <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversational Sample Sentences */}
            {lesson.content.sampleSentences && lesson.content.sampleSentences.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conversational Sentences</h3>
                <div className="space-y-3">
                  {lesson.content.sampleSentences.map((s, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition"
                    >
                      <div className="space-y-1">
                        <p className="text-base font-bold text-white">{s.hindi}</p>
                        <p className="text-xs text-slate-400 font-medium">{s.english}</p>
                      </div>
                      <button
                        onClick={() => speakHindi(s.hindi)}
                        className="p-3 rounded-xl bg-slate-800 hover:bg-hindi-saffron hover:text-slate-950 text-hindi-saffron transition shrink-0 shadow-sm"
                        title="Pronounce Sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SPEAKING PRACTICE (Interactive Mic Simulator) */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-hindi-saffron/10 text-hindi-saffron mb-1">
                <Mic className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-white">AI Voice Pronunciation Trainer</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Listen to the Hindi phrase below, click the microphone button, and pronounce it out loud for instant AI acoustic accuracy feedback!
              </p>

              {/* Targeted Phrase */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">Target Phrase:</span>
                <p className="text-2xl font-black text-hindi-saffron">
                  {lesson.content.sampleSentences?.[0]?.hindi || lesson.content.vocabulary?.[0]?.hindi || 'नमस्ते!'}
                </p>
                <button
                  onClick={() => speakHindi(lesson.content.sampleSentences?.[0]?.hindi || lesson.content.vocabulary?.[0]?.hindi || 'नमस्ते!')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen Native Speaker Audio
                </button>
              </div>

              {/* Recording Controls */}
              <div className="pt-4 flex flex-col items-center gap-3">
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse scale-110 shadow-rose-600/50'
                      : 'bg-hindi-saffron hover:bg-amber-500 text-slate-950 shadow-hindi-saffron/30 hover:scale-105'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
                <span className="text-xs font-bold text-slate-300">
                  {isRecording ? 'Listening... Speak now!' : recordingDone ? 'Recording complete!' : 'Tap Mic to Start Recording'}
                </span>
              </div>

              {/* Soundwave Simulation while recording */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1.5 h-8 pt-2">
                  <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-8 bg-rose-400 rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce delay-200" />
                  <span className="w-1.5 h-7 bg-rose-400 rounded-full animate-bounce delay-150" />
                </div>
              )}

              {/* Score Results */}
              {scoreResult && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 max-w-md mx-auto space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> AI Fluency Evaluation:
                    </span>
                    <span className="text-hindi-saffron bg-hindi-saffron/20 px-2 py-0.5 rounded">
                      +15 Bonus XP Earned
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">PRONUNCIATION</span>
                      <span className="text-xl font-black text-emerald-400">{scoreResult.accuracy}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">SPEECH FLUENCY</span>
                      <span className="text-xl font-black text-amber-400">{scoreResult.fluency}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ CHECK */}
        {activeTab === 'quiz' && lesson.content.quizQuestions && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" /> Interactive Knowledge Check
                </h3>
                <span className="text-xs font-bold text-hindi-saffron">Reward: +{lesson.xpReward} XP</span>
              </div>

              <p className="text-base font-extrabold text-white">
                {lesson.content.quizQuestions[0].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.content.quizQuestions[0].options.map((opt, i) => {
                  const isCorrect = i === lesson.content.quizQuestions?.[0].correctAnswer;
                  const isSelected = selectedOption === i;

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleQuizSubmit(i)}
                      className={`p-4 rounded-xl text-left font-bold text-sm transition border ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                          : 'bg-slate-950 text-white border-slate-800 hover:border-hindi-saffron/50'
                      }`}
                    >
                      <span className="text-xs text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Explanation: {lesson.content.quizQuestions[0].explanation}
                  </p>
                  {earnedXp && (
                    <div className="p-2.5 rounded-lg bg-hindi-saffron/20 text-hindi-saffron text-xs font-extrabold flex items-center gap-2 border border-hindi-saffron/30">
                      <Zap className="w-4 h-4 fill-hindi-saffron" /> Excellent! You earned +{earnedXp} XP!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lesson Bottom Navigation Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/learn/lesson/${prevLesson.id}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-hindi-saffron/40 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4 text-hindi-saffron" /> Previous: {prevLesson.titleHindi}
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/learn/lesson/${nextLesson.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-hindi-saffron hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-hindi-saffron/20"
            >
              Next Lesson: {nextLesson.titleHindi} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/learn/levels"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" /> Level Complete — Back to Pathway
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
