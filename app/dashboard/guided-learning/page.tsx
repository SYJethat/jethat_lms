'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Search,
  Bookmark,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

interface StudyModuleItem {
  id: string;
  moduleNumber: number;
  titleHindi: string;
  titleEng: string;
  pages: number;
  fileSize: string;
  author: string;
}

const GUIDED_STUDY_MODULES: StudyModuleItem[] = [
  {
    id: 'mod_1',
    moduleNumber: 1,
    titleHindi: 'वर्णमाला एवं देवनागरी लिपि परिचय (Devanagari Alphabets & Script)',
    titleEng: 'Introduction to Devanagari Script, Vowels & Phonetic Rules',
    pages: 42,
    fileSize: '4.2 MB',
    author: 'National Faculty • LMS & Kendriya Hindi Sansthan'
  },
  {
    id: 'mod_2',
    moduleNumber: 2,
    titleHindi: 'हिंदी व्याकरण एवं पद परिचय (Hindi Grammar & SOV Structure)',
    titleEng: 'SOV Sentence Order, Nouns, Pronouns, Verbs & Tenses',
    pages: 58,
    fileSize: '5.8 MB',
    author: 'Samskrit & Hindi Promotion Foundation'
  },
  {
    id: 'mod_3',
    moduleNumber: 3,
    titleHindi: 'दैनिक व्यावहारिक शब्दावली (Everyday Vocabulary & Dialogues)',
    titleEng: 'High-Frequency Vocabulary, Expressions & Polite Dialogues',
    pages: 36,
    fileSize: '3.6 MB',
    author: 'Central Institute of Indian Languages (CIIL)'
  },
  {
    id: 'mod_4',
    moduleNumber: 4,
    titleHindi: 'लेखन अभ्यास एवं वर्तनी शुद्धि (Writing Practice & Spelling Rules)',
    titleEng: 'Devanagari Handwriting Drills & Common Spelling Corrections',
    pages: 48,
    fileSize: '4.9 MB',
    author: 'National Curriculum Expert Committee'
  },
  {
    id: 'mod_5',
    moduleNumber: 5,
    titleHindi: 'श्रवण व मौखिक परीक्षा मार्गदर्शिका (Listening & Speaking Exam Guide)',
    titleEng: 'Audio Comprehension Drills & Oral Speaking Evaluation Guide',
    pages: 32,
    fileSize: '3.1 MB',
    author: 'AI & Educational Technology Board'
  },
  {
    id: 'mod_6',
    moduleNumber: 6,
    titleHindi: 'क्षेत्रीय भाषाओं से तुलनात्मक पुल (Cognate Vocabulary Bridge Guide)',
    titleEng: 'Dravidian & Indo-Aryan Vocabulary Comparison Tables',
    pages: 64,
    fileSize: '6.5 MB',
    author: 'Bhasha Sangam & Rastriya Bhasha Samiti'
  },
  {
    id: 'mod_7',
    moduleNumber: 7,
    titleHindi: 'माध्यमिक एवं उच्चतर माध्यमिक मॉडल (Class 10/12 Model Exam Papers)',
    titleEng: 'LMS Class 10 & 12 Previous Year Solved Model Question Papers',
    pages: 80,
    fileSize: '8.2 MB',
    author: 'Board of Secondary & Higher Secondary Education'
  },
  {
    id: 'mod_8',
    moduleNumber: 8,
    titleHindi: 'साहित्यिक निबंध व पत्र लेखन (Official Essays & Correspondence)',
    titleEng: 'Formal Letter Formats, Essay Outlines & Administrative Hindi',
    pages: 50,
    fileSize: '5.1 MB',
    author: 'Department of Official Language (Rajbhasha)'
  }
];

export default function DashboardGuidedLearningPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadMaterial = (module: StudyModuleItem) => {
    setDownloadingId(module.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`📥 Study Material Module ${module.moduleNumber} ("${module.titleEng}") downloaded successfully!`);
    }, 1200);
  };

  const filteredModules = GUIDED_STUDY_MODULES.filter((m) => {
    return (
      m.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">
            GUIDED STUDY MATERIALS & OFFICIAL INFOGRAPHICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            गाइडेड लर्निंग एवं अध्ययन सामग्री पुस्तकालय
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive course notes, presentations, infographics, and research papers curated by national faculty.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search study materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Main Layout: Left Sidebar Poster Card & Right Modules List (Exact match to screenshot UI!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Feature Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-center border border-slate-800 relative overflow-hidden">
            {/* LMS Logo Badge */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white p-2 flex items-center justify-center shadow-md">
              <div className="text-center">
                <span className="font-black text-blue-900 text-xl block leading-none">LMS</span>
                <span className="text-[8px] font-bold text-slate-600 block uppercase mt-0.5">National Institute</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">
                DIGITAL LEARNING MODULE
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                HINDI & INDIAN LANGUAGES <br /> DIGITAL STUDY LIBRARY
              </h2>
              <span className="text-[10px] text-slate-400 uppercase font-bold block pt-1">
                PREPARED BY: SAMSKRIT & HINDI PROMOTION FOUNDATION
              </span>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-left">
              <h3 className="text-base font-black text-white text-center">Study Material Library</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed text-center font-medium">
                ACCESS COMPREHENSIVE COURSE NOTES, PRESENTATIONS, AND RESEARCH PAPERS CURATED BY NATIONAL FACULTY.
              </p>
            </div>
          </div>

          {/* Reading Guide Bottom Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">READING GUIDE & SYLLABUS</h4>
              <p className="text-[11px] text-slate-400 font-medium">Click any module to download high-resolution PDF</p>
            </div>
          </div>
        </div>

        {/* Right Side Modules Cards (Exact Screenshot Match!) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredModules.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition">
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    MODULE {item.moduleNumber}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                    {item.titleHindi}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{item.titleEng}</p>
                  <span className="text-[10px] text-slate-400 block pt-0.5">{item.author} • {item.pages} Pages ({item.fileSize})</span>
                </div>
              </div>

              {/* Green Download Pill Button (Matches Screenshot!) */}
              <button
                onClick={() => handleDownloadMaterial(item)}
                disabled={downloadingId === item.id}
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 flex items-center gap-2 transition hover:scale-105 shrink-0 self-end sm:self-center disabled:opacity-50"
              >
                {downloadingId === item.id ? (
                  'Downloading...'
                ) : (
                  <>
                    STUDY MATERIAL <Download className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
