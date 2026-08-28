'use client';

import React, { useState } from 'react';
import { MOCK_TEACHERS } from '@/lib/mockData';
import { Bot, Volume2, Sparkles, MessageSquare, Play, CheckCircle2 } from 'lucide-react';

export default function DigitalAvatarPage() {
  const [activeTeacher, setActiveTeacher] = useState(MOCK_TEACHERS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const speakAudio = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.9;
      u.onstart = () => setIsPlaying(true);
      u.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Digital Avatars & <span className="gradient-text-saffron">Virtual Teachers</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Select an AI avatar teacher matching your learning style — from classical grammar masters to conversational coaches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Teacher Selection Cards */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Available Digital Teachers</h3>
          {MOCK_TEACHERS.map((t) => (
            <div
              key={t.id}
              onClick={() => setActiveTeacher(t)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                activeTeacher.id === t.id
                  ? 'bg-slate-900 border-hindi-saffron shadow-lg shadow-hindi-saffron/10 ring-1 ring-hindi-saffron'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <img src={t.avatarUrl} alt={t.nameEng} className="w-14 h-14 rounded-xl object-cover ring-2 ring-hindi-saffron/40" />
              <div>
                <h4 className="text-sm font-bold text-white">{t.nameHindi}</h4>
                <p className="text-xs text-hindi-saffron font-medium">{t.nameEng}</p>
                <span className="text-[11px] text-slate-400 block line-clamp-1">{t.roleTitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 2 Columns: Active Teacher Stage View */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-center relative overflow-hidden bg-slate-950/90">
          <div className="relative inline-block">
            <img
              src={activeTeacher.avatarUrl}
              alt={activeTeacher.nameEng}
              className={`w-36 h-36 rounded-full object-cover mx-auto ring-4 ring-hindi-saffron shadow-2xl transition duration-300 ${
                isPlaying ? 'scale-105 ring-emerald-400 animate-pulse' : ''
              }`}
            />
            {isPlaying && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold animate-bounce">
                Speaking...
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">{activeTeacher.nameHindi}</h2>
            <h3 className="text-xs text-hindi-saffron font-bold uppercase tracking-wider">{activeTeacher.roleTitle}</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">{activeTeacher.personality}</p>
          </div>

          {/* Sample Voice Demonstration Box */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-xl mx-auto space-y-2">
            <span className="text-xs text-slate-400 font-bold block uppercase">Live Voice Output Test</span>
            <p className="text-sm font-semibold text-white italic">&quot;{activeTeacher.audioSampleText}&quot;</p>
            <button
              onClick={() => speakAudio(activeTeacher.audioSampleText)}
              className="mt-2 px-5 py-2 rounded-xl bg-hindi-saffron hover:bg-amber-600 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition"
            >
              <Volume2 className="w-4 h-4" /> Listen to Voice Synthesis
            </button>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => speakAudio(`नमस्कार! मैं ${activeTeacher.nameHindi} हूँ। चलिए पाठ शुरू करते हैं।`)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" /> Start Avatar Classroom Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
