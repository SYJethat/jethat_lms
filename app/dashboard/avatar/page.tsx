'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, Video } from 'lucide-react';
import { MOCK_TEACHERS } from '@/lib/mockData';

export default function DashboardAvatarPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(MOCK_TEACHERS[0]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Virtual Avatars
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">3D Photorealistic Digital Teachers (Sec 2)</h1>
        <p className="text-xs text-slate-500 font-medium">Interactive lip-synced AI teachers offering guided Devanagari video lessons.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img src={selectedAvatar.avatarUrl} alt="" className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-medium flex items-center justify-between">
              <div>
                <h4 className="font-bold">{selectedAvatar.nameHindi}</h4>
                <span className="text-[11px] text-blue-400 font-semibold">{selectedAvatar.roleTitle}</span>
              </div>
              <button
                onClick={() => speakText(`नमस्ते! मैं ${selectedAvatar.nameHindi} हूँ।`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" /> Start Audio Speech
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Select Digital Avatar Teacher</h3>
          <div className="space-y-3">
            {MOCK_TEACHERS.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedAvatar(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                  selectedAvatar.id === t.id ? 'bg-blue-50 border-blue-600 font-bold' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <img src={t.avatarUrl} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.nameHindi}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">{t.roleTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
