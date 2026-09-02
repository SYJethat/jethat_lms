'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Video,
  Play,
  Pause,
  Globe,
  Languages,
  Award,
  MessageSquare,
  Send,
  UserCheck,
  Smile,
  Sliders,
  CheckCircle2,
  Zap,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AvatarTeacher {
  id: string;
  nameEng: string;
  nameHindi: string;
  roleTitle: string;
  avatarUrl: string;
  specialization: string;
  supportedTracks: string[];
  greetingSpeech: string;
  transliteration: string;
  englishMeaning: string;
  langCode: string;
}

const DIGITAL_AVATAR_TEACHERS: AvatarTeacher[] = [
  {
    id: 'av_1',
    nameEng: 'Prof. Priya Sharma',
    nameHindi: 'प्रोफ़ेसर प्रिया शर्मा',
    roleTitle: 'Chief Devanagari Phonetics Avatar',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    specialization: 'Dravidian to Hindi Phonetic Bridge (Tamil, Telugu, Malayalam, Kannada)',
    supportedTracks: ['🇮🇳 Indian Regional → Hindi', '🌍 English → Hindi'],
    greetingSpeech: 'नमस्ते! मैं आपकी एआई डिजिटल शिक्षिका हूँ। आज हम देवनागरी स्वर एवं व्यंजन उच्चारण सीखेंगे।',
    transliteration: 'Namaste! Main aapki AI Digital Shikshika hoon. Aaj hum Devanagari swar evam vyanjan uccharan seekhenge.',
    englishMeaning: 'Hello! I am your AI Digital Teacher. Today we will learn Devanagari vowel and consonant pronunciation.',
    langCode: 'hi-IN'
  },
  {
    id: 'av_2',
    nameEng: 'Dr. Rajesh Varma',
    nameHindi: 'डॉ. राजेश वर्मा',
    roleTitle: 'Rajbhasha Administrative Drafting Avatar',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    specialization: 'Central Govt Secretariat Correspondence & Legal Hindi',
    supportedTracks: ['🇮🇳 Regional Officers → Rajbhasha Official'],
    greetingSpeech: 'नमस्कार! राजभाषा अनुभाग में आपका स्वागत है। हम शासकीय टिप्पण और आलेखन का अभ्यास करेंगे।',
    transliteration: 'Namaskar! Rajbhasha anubhag mein aapka swagatam hai. Hum shaskiya tippan aur aalekhan ka abhyas karenge.',
    englishMeaning: 'Welcome to the Official Language Section. We will practice administrative note-making and drafting.',
    langCode: 'hi-IN'
  },
  {
    id: 'av_3',
    nameEng: 'Madame Sophie Laurent',
    nameHindi: 'सोफी लोरां (एआई शिक्षक)',
    roleTitle: 'European Languages & Global Learner Avatar',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    specialization: 'French, Spanish, German & English to Hindi/Tamil Bridge',
    supportedTracks: ['🌍 Foreign Languages → Indian Languages'],
    greetingSpeech: 'Bonjour! Welcome to the AI Avatar studio. Learning Hindi syntax for global speakers is simple and enjoyable.',
    transliteration: 'Bonjour! Welcome to the AI Avatar studio.',
    englishMeaning: 'Hello! Welcome to the AI Avatar studio. Learning Hindi syntax for global speakers is simple and enjoyable.',
    langCode: 'hi-IN'
  },
  {
    id: 'av_4',
    nameEng: 'Dr. Ananya Roy',
    nameHindi: 'डॉ. अनन्या रॉय',
    roleTitle: 'Eastern Indian Languages & Script Avatar',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    specialization: 'Bengali, Assamese, Odia to Devanagari Script Synthesis',
    supportedTracks: ['🇮🇳 Eastern Languages → Hindi'],
    greetingSpeech: 'নমস্কার! ভারতীয় ভাষাসমূহের তুলনামূলক ব্যাকরণ পাঠে আপনাকে স্বাগতম।',
    transliteration: 'Nomoshkar! Bharatiya bhasasamuher tulanamulak byakoron pathe apnake swagatom.',
    englishMeaning: 'Greetings! Welcome to the comparative grammar lesson of Indian languages.',
    langCode: 'hi-IN'
  }
];

const AVATAR_LESSON_TOPICS = [
  { id: 'top_1', title: 'Lesson 1: Devanagari Script & Consonants (स्वर और व्यंजन)', duration: '12 Mins' },
  { id: 'top_2', title: 'Lesson 2: Subject-Object-Verb (SOV) Sentence Construction (वाक्य रचना)', duration: '15 Mins' },
  { id: 'top_3', title: 'Lesson 3: Official Rajbhasha Terminology (शासकीय शब्दावली)', duration: '18 Mins' },
  { id: 'top_4', title: 'Lesson 4: Spoken Fluency & Conversation Drills (बातचीत अभ्यास)', duration: '20 Mins' }
];

export default function DashboardAvatarPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarTeacher>(DIGITAL_AVATAR_TEACHERS[0]);
  const [selectedTopic, setSelectedTopic] = useState<string>(AVATAR_LESSON_TOPICS[0].id);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [avatarResponse, setAvatarResponse] = useState<string | null>(null);

  const speakText = (text: string, langCode: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = langCode || 'hi-IN';
      u.rate = playbackSpeed;
      u.onend = () => setIsPlayingSpeech(false);
      u.onerror = () => setIsPlayingSpeech(false);
      setIsPlayingSpeech(true);
      window.speechSynthesis.speak(u);
    } else {
      alert(`[AI Avatar Speaking Aloud]: "${text}"`);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    }
  };

  const handleAskAvatar = () => {
    if (!customQuestion.trim()) return;
    const answer = `[${selectedAvatar.nameEng} Answers]: "${customQuestion.trim()}" is an excellent question! In ${selectedAvatar.specialization}, we structure this using clear SOV sentence order and proper Devanagari matras.`;
    setAvatarResponse(answer);
    speakText(answer, selectedAvatar.langCode);
    setCustomQuestion('');
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-blue-600" /> 3D PHOTOREALISTIC AI DIGITAL TEACHERS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Interactive AI Avatar Multi-Language Classroom
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl">
              Photorealistic 3D Digital Teachers offering guided lip-synced video lectures for <strong>All Indian Languages to Hindi</strong> and <strong>All Foreign Languages to Indian Languages</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-200 text-blue-900 font-extrabold text-xs shrink-0">
            <Zap className="w-4 h-4 text-blue-600" /> Lip-Synced AI Voice Engine
          </div>
        </div>

        {/* Avatar Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DIGITAL_AVATAR_TEACHERS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => {
                setSelectedAvatar(avatar);
                setAvatarResponse(null);
                stopSpeech();
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-2 ${
                selectedAvatar.id === avatar.id
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={avatar.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
              <span>{avatar.nameEng}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Avatar Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 3D Photorealistic Avatar Stage (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-left">
            {/* Header Stage Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">ACTIVE AI TEACHER STAGE</span>
                <h3 className="font-extrabold text-base text-slate-900">{selectedAvatar.nameEng} ({selectedAvatar.nameHindi})</h3>
                <span className="text-xs text-slate-500 font-semibold">{selectedAvatar.roleTitle}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Speed:</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-black transition ${
                      playbackSpeed === spd ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Video Stage Display Container */}
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-2xl border border-slate-800">
              <img
                src={selectedAvatar.avatarUrl}
                alt={selectedAvatar.nameEng}
                className={`w-full h-full object-cover transition duration-700 ${isPlayingSpeech ? 'scale-105 opacity-100' : 'opacity-85'}`}
              />

              {/* Animated Speaking Wave overlay */}
              {isPlayingSpeech && (
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-blue-600/90 text-white font-black text-xs uppercase flex items-center gap-2 backdrop-blur-md animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  AI Teacher Speaking Aloud...
                </div>
              )}

              {/* Bottom Subtitle Overlay Box */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md text-white text-xs space-y-2 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-sm text-amber-300">{selectedAvatar.nameEng}</h4>
                    <span className="text-[10px] text-blue-400 font-semibold">{selectedAvatar.specialization}</span>
                  </div>

                  <button
                    onClick={isPlayingSpeech ? stopSpeech : () => speakText(selectedAvatar.greetingSpeech, selectedAvatar.langCode)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition ${
                      isPlayingSpeech ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isPlayingSpeech ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isPlayingSpeech ? 'Pause Speech' : 'Play Avatar Voice'}
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-xs sm:text-sm text-white leading-relaxed">{selectedAvatar.greetingSpeech}</p>
                  <p className="text-[11px] font-mono text-cyan-300">{selectedAvatar.transliteration}</p>
                  <p className="text-[11px] text-slate-300 italic">"{selectedAvatar.englishMeaning}"</p>
                </div>
              </div>
            </div>

            {/* Interactive Q&A Input with Avatar Teacher */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">INTERACTIVE LIVE Q&A WITH AVATAR TEACHER</span>
                <h4 className="text-sm font-extrabold text-slate-900">Ask {selectedAvatar.nameEng} Any Language Question:</h4>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAvatar()}
                  placeholder={`Ask ${selectedAvatar.nameEng} about Devanagari, SOV rules, or Tamil phrases...`}
                  className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 shadow-2xs"
                />
                <button
                  onClick={handleAskAvatar}
                  disabled={!customQuestion.trim()}
                  className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition shrink-0"
                >
                  <Send className="w-4 h-4" /> Ask Teacher
                </button>
              </div>

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Explain Devanagari Matras', 'What is SOV Word Order?', 'Give 3 Common Greetings', 'How to write Official Letter?'].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCustomQuestion(q);
                    }}
                    className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-[11px] font-bold hover:bg-slate-100 transition"
                  >
                    💬 "{q}"
                  </button>
                ))}
              </div>

              {/* Avatar Response Output Card */}
              {avatarResponse && (
                <div className="p-4 rounded-2xl bg-blue-100/70 border border-blue-300 text-slate-900 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-900 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-blue-600" /> {selectedAvatar.nameEng} AI Response:
                    </span>
                    <button
                      onClick={() => speakText(avatarResponse, selectedAvatar.langCode)}
                      className="text-[11px] font-extrabold text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Replay Speech
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-900">{avatarResponse}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Teacher Avatars Directory & Lessons (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Teachers Directory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Select AI Avatar Teacher</h3>
                <span className="text-[11px] font-semibold text-slate-500">{DIGITAL_AVATAR_TEACHERS.length} 3D Photorealistic Avatars</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                Active Studio
              </span>
            </div>

            <div className="space-y-3">
              {DIGITAL_AVATAR_TEACHERS.map((t) => {
                const isActive = selectedAvatar.id === t.id;

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedAvatar(t);
                      setAvatarResponse(null);
                      stopSpeech();
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center gap-3.5 shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-400/60'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <img src={t.avatarUrl} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500 shrink-0" />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 truncate">{t.nameEng}</h4>
                      <p className="text-xs text-blue-700 font-bold line-clamp-1">{t.roleTitle}</p>
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{t.specialization}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guided Video Lessons Directory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-left">
            <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-3">Avatar Guided Video Lessons</h3>
            <div className="space-y-2.5">
              {AVATAR_LESSON_TOPICS.map((top) => (
                <div
                  key={top.id}
                  onClick={() => setSelectedTopic(top.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between text-xs font-bold ${
                    selectedTopic === top.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="line-clamp-1">{top.title}</span>
                  <span className={selectedTopic === top.id ? 'text-blue-300' : 'text-slate-400'}>{top.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
