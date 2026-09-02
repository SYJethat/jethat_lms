'use client';

import React, { useState } from 'react';
import {
  Headphones,
  Volume2,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Globe,
  Languages,
  Award,
  Sparkles,
  Sliders,
  Check,
  X,
  FileText,
  HelpCircle,
  BarChart3,
  ArrowRight
} from 'lucide-react';

interface ListeningTrack {
  id: string;
  title: string;
  category: string;
  level: string;
  mode: 'indian-to-hindi' | 'foreign-to-indian';
  nativeLang: string;
  targetLang: string;
  targetLangCode: string;
  audioScriptText: string;
  transliterationNative: string;
  englishMeaning: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const LISTENING_DATABASE: ListeningTrack[] = [
  // 🇮🇳 INDIAN LANGUAGES TO HINDI LISTENING TRACKS
  {
    id: 'lst_in_1',
    title: 'Railway Station Announcement (रेलवे स्टेशन सूचना)',
    category: 'Public Travel Announcement',
    level: 'L1: Starter',
    mode: 'indian-to-hindi',
    nativeLang: 'Tamil / Telugu / Malayalam / Kannada',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    audioScriptText: 'कृपया ध्यान दें! नई दिल्ली से मुंबई जाने वाली राजधानी एक्सप्रेस प्लेटफ़ॉर्म नंबर 3 पर आ रही है।',
    transliterationNative: 'கவனியுங்கள்! புது தில்லியில் இருந்து மும்பை செல்லும் ராஜ்தானி எக்ஸ்பிரஸ் பிளாட்பாரம் எண் 3ல் வருகிறது.',
    englishMeaning: 'Attention please! The Rajdhani Express from New Delhi to Mumbai is arriving on Platform Number 3.',
    question: 'राजधानी एक्सप्रेस किस प्लेटफ़ॉर्म पर आ रही है? (Which platform is the train arriving on?)',
    options: ['प्लेटफ़ॉर्म नंबर 1 (Platform 1)', 'प्लेटफ़ॉर्म नंबर 2 (Platform 2)', 'प्लेटफ़ॉर्म नंबर 3 (Platform 3)', 'प्लेटफ़ॉर्म नंबर 4 (Platform 4)'],
    correctIdx: 2,
    explanation: 'The announcement explicitly mentions "प्लेटफ़ॉर्म नंबर 3 पर आ रही है" (arriving on Platform 3).'
  },
  {
    id: 'lst_in_2',
    title: 'Market Shopping & Price Quote (सब्ज़ी मंडी संवाद)',
    category: 'Daily Market Dialogue',
    level: 'L1: Starter',
    mode: 'indian-to-hindi',
    nativeLang: 'Bengali / Marathi / Gujarati / Odia',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    audioScriptText: 'भैया, ताज़ा सेब चालीस रुपये प्रति किलो हैं और आम साठ रुपये प्रति किलो हैं।',
    transliterationNative: 'ভাই, তাজা আপেল ৪০ টাকা কেজি এবং আম ৬০ টাকা কেজি।',
    englishMeaning: 'Brother, fresh apples are 40 rupees per kg and mangoes are 60 rupees per kg.',
    question: 'सेब का मूल्य प्रति किलो कितना है? (What is the price of apples per kg?)',
    options: ['तीस रुपये (30 Rupees)', 'चालीस रुपये (40 Rupees)', 'पचास रुपये (50 Rupees)', 'साठ रुपये (60 Rupees)'],
    correctIdx: 1,
    explanation: 'The seller states "चालीस रुपये प्रति किलो" (40 rupees per kilogram) for apples.'
  },
  {
    id: 'lst_in_3',
    title: 'Rajbhasha Official Seminar Notice (राजभाषा संगोष्ठी)',
    category: 'Administrative & News',
    level: 'L3: Advanced',
    mode: 'indian-to-hindi',
    nativeLang: 'All Regional Indian Officers',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    audioScriptText: 'राजभाषा विभाग द्वारा आयोजित राष्ट्रीय हिंदी कार्यशाला आगामी शुक्रवार को मुख्य सभागार में प्रातः 10 बजे प्रारंभ होगी।',
    transliterationNative: 'அதிகாரப்பூர்வ மொழித் துறை நடத்தும் தேசிய இந்திப் பட்டறை வரும் வெள்ளிக்கிழமை காலை 10 மணிக்குத் தொடங்கும்.',
    englishMeaning: 'The National Hindi Workshop organized by Rajbhasha Department will commence next Friday at 10 AM in the main auditorium.',
    question: 'राष्ट्रीय हिंदी कार्यशाला का समय क्या है? (What is the time for the Hindi workshop?)',
    options: ['प्रातः 9 बजे (9:00 AM)', 'प्रातः 10 बजे (10:00 AM)', 'अपराह्न 2 बजे (2:00 PM)', 'सायंकाल 5 बजे (5:00 PM)'],
    correctIdx: 1,
    explanation: 'The notice confirms "प्रातः 10 बजे प्रारंभ होगी" (will commence at 10 AM).'
  },

  // 🌍 FOREIGN LANGUAGES TO INDIAN / HINDI LISTENING TRACKS
  {
    id: 'lst_for_1',
    title: 'Airport Gate Announcement (हवाई अड्डा सूचना)',
    category: 'International Travel',
    level: 'L1: Starter',
    mode: 'foreign-to-indian',
    nativeLang: 'English / French / Spanish / German',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    audioScriptText: 'उड़ान संख्या AI-101 का अंतिम बोर्डिंग कॉल गेट नंबर 12 से दिया जा रहा है।',
    transliterationNative: 'Udaan sankhya AI-101 ka antim boarding call Gate Number 12 se diya ja raha hai.',
    englishMeaning: 'Final boarding call for Flight AI-101 is being made from Gate Number 12.',
    question: 'गेट नंबर क्या है? (What is the Gate Number for boarding?)',
    options: ['गेट नंबर 5 (Gate 5)', 'गेट नंबर 10 (Gate 10)', 'गेट नंबर 12 (Gate 12)', 'गेट नंबर 15 (Gate 15)'],
    correctIdx: 2,
    explanation: 'The announcement clearly states "गेट नंबर 12 से दिया जा रहा है" (Gate Number 12).'
  },
  {
    id: 'lst_for_2',
    title: 'Tamil Cultural Greeting (தமிழ் வாழ்த்து)',
    category: 'Foreign to Tamil Bridge',
    level: 'L2: Intermediate',
    mode: 'foreign-to-indian',
    nativeLang: 'Japanese / Mandarin / Arabic / Russian',
    targetLang: 'Tamil (தமிழ்)',
    targetLangCode: 'ta-IN',
    audioScriptText: 'வணக்கம்! சென்னை சென்ட்ரல் ரயில் நிலையம் அருகிலுள்ளது.',
    transliterationNative: 'Vanakkam! Chennai Central railway nilayam arugilullathu.',
    englishMeaning: 'Hello! Chennai Central Railway Station is nearby.',
    question: 'அருகில் உள்ள இடம் எது? (Which place is nearby?)',
    options: ['சென்னை எக்ஸ்பிரஸ் (Chennai Express)', 'சென்னை சென்ட்ரல் ரயில் நிலையம் (Chennai Central Railway Station)', 'விமான நிலையம் (Airport)', 'பேருந்து நிலையம் (Bus Station)'],
    correctIdx: 1,
    explanation: 'The Tamil passage specifies "சென்னை சென்ட்ரல் ரயில் நிலையம் அருகிலுள்ளது" (Chennai Central Railway Station is nearby).'
  }
];

export default function DashboardListeningTestPage() {
  const [trackMode, setTrackMode] = useState<'indian-to-hindi' | 'foreign-to-indian'>('indian-to-hindi');
  const [selectedTrackIdx, setSelectedTrackIdx] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Filter tracks by mode
  const currentTracks = LISTENING_DATABASE.filter((t) => t.mode === trackMode);
  const currentTrack = currentTracks[selectedTrackIdx] || currentTracks[0];

  const playAudioPrompt = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(currentTrack.audioScriptText);
      u.lang = currentTrack.targetLangCode || 'hi-IN';
      u.rate = playbackSpeed;
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(u);
    } else {
      alert(`[Synthesized Audio Playing]: "${currentTrack.audioScriptText}"`);
    }
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5 text-purple-600" /> ACOUSTIC AI LISTENING EVALUATOR
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              AI Multi-Language Listening Comprehension Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl">
              Evaluates acoustic listening comprehension, accent recognition, and dialogue understanding for <strong>All Indian Languages to Hindi</strong> and <strong>All Foreign Languages to Indian Languages</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 font-extrabold text-xs shrink-0">
            <button
              onClick={() => {
                setTrackMode('indian-to-hindi');
                setSelectedTrackIdx(0);
                setSelectedOpt(null);
                setSubmitted(false);
                setShowTranscript(false);
              }}
              className={`px-4 py-2.5 rounded-xl transition ${
                trackMode === 'indian-to-hindi'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇮🇳 All Indian → Hindi Track
            </button>
            <button
              onClick={() => {
                setTrackMode('foreign-to-indian');
                setSelectedTrackIdx(0);
                setSelectedOpt(null);
                setSubmitted(false);
                setShowTranscript(false);
              }}
              className={`px-4 py-2.5 rounded-xl transition ${
                trackMode === 'foreign-to-indian'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌍 All Foreign → Indian Track
            </button>
          </div>
        </div>

        {/* Track Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {currentTracks.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTrackIdx(idx);
                setSelectedOpt(null);
                setSubmitted(false);
                setShowTranscript(false);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedTrackIdx === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{t.title}</span>
              <span className="text-[10px] opacity-75 font-normal">({t.level})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Assessment Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Acoustic Player & Question Card (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-left">
            {/* Header Info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-black uppercase">
                    {currentTrack.level}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{currentTrack.category}</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{currentTrack.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Speed:</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-black transition ${
                      playbackSpeed === spd ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Acoustic Audio Console Box */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white space-y-6 text-center shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-400/30 inline-block">
                  Acoustic Audio Broadcast ({currentTrack.targetLang})
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-200">
                  Click Play button to listen to native audio clip
                </h2>
              </div>

              <div className="relative z-10 py-2">
                <button
                  onClick={isPlaying ? stopAudio : playAudioPrompt}
                  className={`w-24 h-24 rounded-full font-black flex flex-col items-center justify-center mx-auto shadow-2xl transition duration-300 ${
                    isPlaying
                      ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-300/50 scale-105'
                      : 'bg-purple-600 hover:bg-purple-500 text-white ring-8 ring-purple-300/30 hover:scale-105'
                  }`}
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white ml-1" />}
                  <span className="text-[10px] uppercase font-black tracking-wider mt-1">
                    {isPlaying ? 'Pause' : 'Listen'}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3 relative z-10">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-cyan-300 hover:underline font-bold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {showTranscript ? 'Hide Audio Transcript' : 'Show Audio Transcript & Transliteration'}
                </button>
                <span>Voice Engine: Native {currentTrack.targetLang} TTS</span>
              </div>

              {/* Transcript Reveal Box */}
              {showTranscript && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 animate-in fade-in">
                  <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider block">
                    AUDIO TRANSCRIPT ({currentTrack.targetLang}):
                  </span>
                  <p className="text-sm font-bold text-white font-sans">{currentTrack.audioScriptText}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block pt-1">
                    Transliteration ({currentTrack.nativeLang}):
                  </span>
                  <p className="text-xs font-semibold text-cyan-300 font-mono">{currentTrack.transliterationNative}</p>
                  <p className="text-xs text-slate-300 italic">"{currentTrack.englishMeaning}"</p>
                </div>
              )}
            </div>

            {/* Multiple Choice Comprehension Question */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider block">
                  STEP 2: COMPREHENSION TEST QUESTION
                </span>
                <h3 className="text-base font-extrabold text-slate-900">{currentTrack.question}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTrack.options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOpt(idx);
                        setSubmitted(false);
                      }}
                      className={`p-4 rounded-2xl border text-xs font-extrabold text-left transition shadow-2xs ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-101'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedOpt !== null && !submitted && (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition"
                >
                  Submit Answer for AI Review →
                </button>
              )}

              {/* Assessment Feedback Banner */}
              {submitted && (
                <div
                  className={`p-5 rounded-2xl border space-y-2 text-xs font-bold animate-in fade-in ${
                    selectedOpt === currentTrack.correctIdx
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedOpt === currentTrack.correctIdx ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <X className="w-5 h-5 text-rose-600" />
                    )}
                    <span className="text-sm font-black">
                      {selectedOpt === currentTrack.correctIdx
                        ? '✓ Correct! Acoustic comprehension score: 100%'
                        : '✗ Incorrect Answer'}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium pl-7">{currentTrack.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Listening Tracks Directory (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Listening Tracks Directory</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {currentTracks.length} Audio Tracks in {trackMode === 'indian-to-hindi' ? 'Indian Track' : 'Foreign Track'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs">
                AI Evaluator
              </span>
            </div>

            {/* Tracks List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {currentTracks.map((t, idx) => {
                const isActive = selectedTrackIdx === idx;

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedTrackIdx(idx);
                      setSelectedOpt(null);
                      setSubmitted(false);
                      setShowTranscript(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-400/60'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-extrabold">
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white uppercase">{t.level}</span>
                      <span className="text-slate-400">{t.category}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{t.title}</h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">{t.nativeLang} → {t.targetLang}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1 border-t border-slate-100">
                      <span>Acoustic Audio Broadcast</span>
                      {isActive && <span className="text-purple-600 font-bold">SELECTED</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
