'use client';

import React, { useState } from 'react';
import { FileEdit, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AIWritingTestPage() {
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const promptTitle = 'मेरे प्रिय शहर का वर्णन (Describe Your Favorite City)';

  const handleEvaluate = async () => {
    if (!essay.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'writing', textInput: essay, promptTitle }),
      });
      const data = await res.json();
      setReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <FileEdit className="w-8 h-8 text-emerald-400" /> AI Hindi Writing & Grammar Assessment
        </h1>
        <p className="text-xs text-slate-400">Write paragraph essays in Hindi to evaluate vocabulary richness, spelling, and sentence coherence.</p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 bg-slate-950/90">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold text-emerald-400 uppercase block">Essay Writing Topic</span>
          <h2 className="text-lg font-bold text-white mt-0.5">{promptTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">Target Word Count: 50–150 words in Devanagari script.</p>
        </div>

        <textarea
          rows={6}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="यहाँ हिंदी में अपना निबंध लिखें... (e.g., मेरा शहर दिल्ली भारत की राजधानी है। यहाँ अनेक ऐतिहासिक स्थल हैं...)"
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-medium"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Word count: {essay.trim() ? essay.trim().split(/\s+/).length : 0} words
          </span>
          <button
            onClick={handleEvaluate}
            disabled={loading || !essay.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" /> Evaluate with AI Engine
          </button>
        </div>

        {report && (
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-emerald-400 block">{report.overallScore}%</span>
                <span className="text-xs text-slate-400">Writing Proficiency</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-cyan-400 block">{report.grammarScore}%</span>
                <span className="text-xs text-slate-400">Grammar Accuracy</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-amber-400 block">{report.vocabularyScore}%</span>
                <span className="text-xs text-slate-400">Vocabulary Variety</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-300">Detailed Feedback</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {report.feedback?.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
