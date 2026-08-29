'use client';

import React from 'react';
import Link from 'next/link';
import {
  Video,
  Headphones,
  FileText,
  Download,
  BookOpen,
  Play,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 space-y-16">
      {/* Page Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-cyan-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/40 inline-flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-cyan-400" /> FREE RESOURCE FACILITIES HUB
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            निःशुल्क वीडियो, ऑडियो व अध्ययन सामग्री लाइब्रेरी
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Access HD video lectures, native pronunciation audio podcasts, downloadable NIOS study PDFs, and university course prospectuses 100% free of cost.
          </p>
        </div>
      </section>

      {/* Main Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Resource Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category 1: Free Videos */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md">
                <Video className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">4K & HD TUTORIALS</span>
                <h3 className="text-xl font-black text-slate-900">🎥 Free Video Masterclasses</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                4K & HD video tutorials covering Devanagari stroke order, SOV sentence structure rules, conversational Hindi dialogue, and NIOS video lessons.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Devanagari Alphabet Handwriting Stroke Order (22 Lessons)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subject-Object-Verb (SOV) Hindi Grammar Rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily Conversational Dialogue Masterclass</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=free-videos"
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Watch Video Masterclasses →
            </Link>
          </div>

          {/* Category 2: Free Audio Podcasts */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md">
                <Headphones className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest block">NATIVE AUDIO DRILLS</span>
                <h3 className="text-xl font-black text-slate-900">🎧 Free Audio Podcasts</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Native voice recordings, Dravidian-Hindi phonetic bridge audio drills, and audiobook chapters designed for offline listening and accent perfection.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CIIL Mysuru Dravidian-Hindi Phonetic Drills (Tamil/Telugu)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Munshi Premchand Stories Native Voice Audiobook</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily Listening Comprehension Audio Podcast</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=free-audio"
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Listen Audio Podcasts →
            </Link>
          </div>

          {/* Category 3: Study PDFs */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">DOWNLOADABLE WORKSHEETS</span>
                <h3 className="text-xl font-black text-slate-900">📖 Download Study PDFs</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Downloadable NIOS textbook PDF worksheets, grammar reference books, Devanagari alphabet practice charts, and university admission prospectuses.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NIOS Secondary Hindi Coursebook PDF Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Devanagari Script Tracing & Handwriting Practice Sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kendriya Hindi Sansthan Admission Prospectus 2026</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=guided-learning"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Download Free PDFs →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
