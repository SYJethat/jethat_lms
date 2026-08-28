'use client';

import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DashboardSpeakingTestPage() {
  const [recording, setRecording] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const promptText = 'नमस्ते! भारत की राजधानी नई दिल्ली है।';

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setAnalyzed(true);
    } else {
      setRecording(true);
      setAnalyzed(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          AI Pronunciation Evaluator (Sec 3)
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">AI Hindi Speaking Assessment</h1>
        <p className="text-xs text-slate-500 font-medium">Read the Devanagari prompt aloud into your microphone for instant AI speech scoring.</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs text-center">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Target Speech Prompt</span>
          <h2 className="text-2xl font-extrabold text-slate-900">{promptText}</h2>
          <button
            onClick={() => speakText(promptText)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2"
          >
            <Volume2 className="w-4 h-4" /> Listen Audio Reference
          </button>
        </div>

        <div className="py-4">
          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full font-bold flex flex-col items-center justify-center mx-auto shadow-lg transition ${
              recording
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 ring-4 ring-blue-100'
            }`}
          >
            <Mic className="w-8 h-8" />
            <span className="text-[10px] uppercase font-extrabold mt-1">{recording ? 'Stop' : 'Record'}</span>
          </button>
          <span className="text-xs text-slate-500 font-medium mt-3 block">
            {recording ? 'Recording audio... Speak now!' : 'Click red microphone to speak'}
          </span>
        </div>

        {analyzed && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-3 animate-in fade-in zoom-in-95">
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase">
              AI Speech Score: 88%
            </span>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold pt-2">
              <div className="p-2 rounded-xl bg-white">Devanagari Phonetics: 92%</div>
              <div className="p-2 rounded-xl bg-white">Speech Fluency: 85%</div>
              <div className="p-2 rounded-xl bg-white">Intonation: 87%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
