'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen, Award, GraduationCap, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const mockSearchResults = [
    { type: 'course', title: 'वर्णमाला एवं देवनागरी लिपि (Hindi Script Fundamentals)', category: 'Level 1', url: '/learn/levels' },
    { type: 'course', title: 'व्याकरण भारती (Complete Hindi Grammar)', category: 'Level 3', url: '/learn/levels' },
    { type: 'teacher', title: 'आचार्य आरव शास्त्री (Senior Grammar Master)', category: 'Teacher', url: '/ai-hub/avatar' },
    { type: 'institute', title: 'केंद्रीय हिंदी संस्थान, दिल्ली (Kendriya Hindi Sansthan)', category: 'Institute', url: '/institutes' },
    { type: 'book', title: 'गोदान — मुंशी प्रेमचंद (Godaan Novel)', category: 'Library Book', url: '/library' },
    { type: 'cert', title: 'Public Certificate Verification Portal', category: 'Verification', url: '/certificates/verify/HLMS-2026-884920' },
  ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || query === '');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="w-full max-w-2xl glass-card border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
          <Search className="w-5 h-5 text-hindi-saffron shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Hindi courses, teachers, institutes, library books, certificates..."
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto divide-y divide-slate-800/60">
          {mockSearchResults.length > 0 ? (
            mockSearchResults.map((res, i) => (
              <Link
                key={i}
                href={res.url}
                onClick={onClose}
                className="py-3 px-3 flex items-center justify-between rounded-xl hover:bg-slate-800/60 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-hindi-saffron group-hover:bg-hindi-saffron group-hover:text-slate-950 transition">
                    {res.type === 'course' && <BookOpen className="w-4 h-4" />}
                    {res.type === 'teacher' && <GraduationCap className="w-4 h-4" />}
                    {res.type === 'institute' && <Building2 className="w-4 h-4" />}
                    {res.type === 'book' && <BookOpen className="w-4 h-4" />}
                    {res.type === 'cert' && <Award className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-hindi-saffron transition">
                      {res.title}
                    </h4>
                    <span className="text-xs text-slate-400">{res.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-hindi-saffron group-hover:translate-x-1 transition" />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              No results matching &quot;{query}&quot; found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Global Search Engine • 51 LMS Modules</span>
          <span className="text-[11px] text-hindi-saffron font-medium">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
