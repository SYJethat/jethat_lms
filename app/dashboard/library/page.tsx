'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Download, Star, Eye, Headphones, FileText, X } from 'lucide-react';
import { MOCK_LIBRARY, LibraryItem } from '@/lib/mockData';

export default function DashboardLibraryPage() {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [previewItem, setPreviewItem] = useState<LibraryItem | null>(null);

  const categories = ['All', 'Hindi Books', 'Grammar Guides', 'Audiobooks', 'Newspapers'];

  const filtered = MOCK_LIBRARY.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesQuery = item.titleHindi.toLowerCase().includes(query.toLowerCase()) || item.titleEng.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
            Resource Center
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Digital Hindi Library & Study Hub</h1>
          <p className="text-xs text-slate-500 font-medium">Access classics like Premchand Godaan, Devanagari grammar guides, and audiobooks.</p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hindi books..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
              selectedCat === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((book) => (
          <div key={book.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs clean-card-hover">
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 text-blue-700 text-[10px] font-extrabold border border-slate-200 shadow-xs">
                {book.fileFormat}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{book.category}</span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{book.titleHindi}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                  <span>{book.pagesOrDuration}</span> • <span className="text-emerald-600 font-bold">{book.difficulty}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setPreviewItem(book)}
                  className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 border border-slate-200 transition"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition" title="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl text-left">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-blue-600 font-bold uppercase">{previewItem.category}</span>
                <h2 className="text-xl font-bold text-slate-900">{previewItem.titleHindi}</h2>
                <p className="text-xs text-slate-500">{previewItem.author}</p>
              </div>
              <button onClick={() => setPreviewItem(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed space-y-2">
              <p className="font-bold text-slate-900">Interactive Digital Reader Snippet:</p>
              <p className="italic">
                &quot;होरी महतो ने दोनों बैलों को सानी-पानी देकर अपनी स्त्री धनिया से कहा — गोदान करने की लालसा लेकर हर गृहस्थ जीवन जीता है...&quot;
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setPreviewItem(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Close</button>
              <button className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">Open Full Reader</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
