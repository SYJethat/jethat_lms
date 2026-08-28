'use client';

import React, { useState } from 'react';
import { Headphones, Volume2, CheckCircle2 } from 'lucide-react';

export default function DashboardListeningTestPage() {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const audioPrompt = 'कृपया ध्यान दें, गाज़ियाबाद जाने वाली ट्रेन प्लेटफ़ॉर्म नंबर 3 पर आ रही है।';
  const options = ['प्लेटफ़ॉर्म नंबर 1', 'प्लेटफ़ॉर्म नंबर 2', 'प्लेटफ़ॉर्म नंबर 3', 'प्लेटफ़ॉर्म नंबर 4'];
  const correctIdx = 2;

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
          Acoustic Listening Comprehension
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">AI Hindi Listening Assessment</h1>
        <p className="text-xs text-slate-500 font-medium">Listen to synthesized Hindi audio announcements and answer comprehension questions.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Step 1: Listen to Audio Prompt</span>
          <button
            onClick={() => speakText(audioPrompt)}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
          >
            <Volume2 className="w-5 h-5" /> Play Hindi Announcement
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Question: ट्रेन किस प्लेटफ़ॉर्म पर आ रही है? (Which platform is the train arriving on?)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOpt(idx)}
                className={`p-4 rounded-2xl border text-xs font-bold text-left transition ${
                  selectedOpt === idx ? 'bg-purple-50 border-purple-600 text-purple-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {selectedOpt !== null && (
          <button
            onClick={() => setSubmitted(true)}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm"
          >
            Submit Answer
          </button>
        )}

        {submitted && (
          <div className={`p-4 rounded-2xl border text-xs font-bold ${
            selectedOpt === correctIdx ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {selectedOpt === correctIdx ? '✓ Correct! You identified Platform 3 accurately.' : '✗ Incorrect. Listen to the announcement again.'}
          </div>
        )}
      </div>
    </div>
  );
}
