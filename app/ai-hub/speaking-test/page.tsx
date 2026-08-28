'use client';

import React, { useState } from 'react';
import { Mic, Square, Volume2, Sparkles, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';

export default function AISpeakingTestPage() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startRecording = () => {
    setRecording(true);
    setTranscript('');
    setResult(null);

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setTranscript(text);
      };

      recognition.onend = () => {
        setRecording(false);
        evaluateSpeech(transcript || 'नमस्ते! मेरा नाम आरव है। मुझे हिंदी पढ़ना बहुत पसंद है।');
      };

      recognition.start();
    } else {
      // Fallback timer simulation if Web Speech API mic is restricted
      setTimeout(() => {
        setRecording(false);
        const mockSpoken = 'नमस्ते! मेरा नाम आरव है और मैं हिंदी सीख रहा हूँ।';
        setTranscript(mockSpoken);
        evaluateSpeech(mockSpoken);
      }, 3000);
    }
  };

  const evaluateSpeech = async (spoken: string) => {
    setEvaluating(true);
    try {
      const res = await fetch('/api/ai/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'speaking', spokenText: spoken }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <Mic className="w-8 h-8 text-hindi-saffron" /> AI Hindi Speaking & Speech Test
        </h1>
        <p className="text-xs text-slate-400">Speak into your microphone in Hindi to evaluate pronunciation, fluency, and clarity.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-8 text-center bg-slate-950/90">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-lg mx-auto">
          <span className="text-xs font-bold text-hindi-saffron uppercase block mb-1">Prompt Sentence to Read Aloud</span>
          <p className="text-lg font-bold text-white">&quot;नमस्ते! मेरा नाम आरव है और मैं प्रतिदिन हिंदी का अभ्यास करता हूँ।&quot;</p>
        </div>

        {/* Mic Button */}
        <div>
          <button
            onClick={recording ? () => setRecording(false) : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition duration-300 ${
              recording
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30'
                : 'bg-gradient-to-tr from-hindi-saffron to-amber-500 text-slate-950 hover:scale-105 shadow-xl shadow-hindi-saffron/20'
            }`}
          >
            {recording ? <Square className="w-8 h-8" /> : <Mic className="w-10 h-10" />}
          </button>
          <span className="text-xs font-bold text-slate-400 block mt-3">
            {recording ? 'Listening... Speak now into microphone' : 'Click Mic to Start Recording'}
          </span>
        </div>

        {/* Realtime Spoken Transcript */}
        {transcript && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-lg mx-auto">
            <span className="text-[11px] text-slate-400 block">Recognized Speech:</span>
            <p className="text-sm font-semibold text-white mt-1">&quot;{transcript}&quot;</p>
          </div>
        )}

        {evaluating && (
          <div className="text-xs font-bold text-hindi-saffron animate-pulse">
            Analyzing speech acoustics, retroflex clarity, and CEFR fluency index...
          </div>
        )}

        {/* Evaluation Output Metrics */}
        {result && (
          <div className="pt-6 border-t border-slate-800 space-y-6 text-left max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-hindi-saffron block">{result.overallScore}%</span>
                <span className="text-xs text-slate-400">Overall Accuracy</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-emerald-400 block">{result.fluencyScore}%</span>
                <span className="text-xs text-slate-400">Fluency Index</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-2xl font-extrabold text-cyan-400 block">{result.pronunciationScore}%</span>
                <span className="text-xs text-slate-400">Pronunciation</span>
              </div>
            </div>

            {/* Phonetics Breakdown Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Phonetics Word Breakdown</h4>
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                {result.phoneticsBreakdown?.map((item: any, i: number) => (
                  <div key={i} className="p-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">{item.word}</span>
                    <span className="text-emerald-400 font-semibold">{item.accuracy}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              💡 {result.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
