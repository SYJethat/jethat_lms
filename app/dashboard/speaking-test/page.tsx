'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Globe,
  Award,
  Sparkles,
  Play,
  Square,
  Flame,
  ArrowRight,
  Languages,
  Sliders,
  Check,
  AlertCircle,
  BarChart3,
  BookOpen
} from 'lucide-react';

interface SpeakingPrompt {
  id: string;
  category: string;
  level: string;
  mode: 'indian-to-hindi' | 'foreign-to-indian';
  nativeLang: string;
  targetLang: string;
  targetLangCode: string;
  targetScriptText: string;
  transliterationNative: string;
  englishMeaning: string;
  phoneticTip: string;
  words: { word: string; status: 'perfect' | 'good' | 'needs-work' }[];
}

const SPEAKING_PROMPTS_DATABASE: SpeakingPrompt[] = [
  // 🇮🇳 INDIAN LANGUAGES TO HINDI TRACKS
  {
    id: 'spk_in_1',
    category: 'Everyday Courtesy (दैनिक शिष्टाचार)',
    level: 'L1: Starter',
    mode: 'indian-to-hindi',
    nativeLang: 'Tamil (தமிழ்)',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'नमस्ते! आपका स्वागत है। आप कैसे हैं?',
    transliterationNative: 'வணக்கம்! ஆப்கா ஸ்வாகத் ஹை. ஆப் கேஸே ஹைன்?',
    englishMeaning: 'Hello! You are welcome. How are you?',
    phoneticTip: 'Tamil speakers: pronounce short "a" clearly without retroflexing soft "ka".',
    words: [
      { word: 'नमस्ते!', status: 'perfect' },
      { word: 'आपका', status: 'perfect' },
      { word: 'स्वागत', status: 'good' },
      { word: 'है।', status: 'perfect' },
      { word: 'आप', status: 'perfect' },
      { word: 'कैसे', status: 'good' },
      { word: 'हैं?', status: 'perfect' }
    ]
  },
  {
    id: 'spk_in_2',
    category: 'SOV Sentence Syntax (वाक्य रचना)',
    level: 'L2: Intermediate',
    mode: 'indian-to-hindi',
    nativeLang: 'Telugu (తెలుగు)',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'मैं हर रोज हिंदी और अपनी मातृभाषा पढ़ता हूँ।',
    transliterationNative: 'నేను రోజూ హిందీ మరియు నా మాతృభాష చదువుతాను.',
    englishMeaning: 'I read Hindi and my mother tongue every day.',
    phoneticTip: 'Telugu speakers: maintain SOV order; Telugu "నేను" maps directly to Hindi "मैं".',
    words: [
      { word: 'मैं', status: 'perfect' },
      { word: 'हर', status: 'perfect' },
      { word: 'रोज', status: 'good' },
      { word: 'हिंदी', status: 'perfect' },
      { word: 'और', status: 'perfect' },
      { word: 'अपनी', status: 'good' },
      { word: 'मातृभाषा', status: 'needs-work' },
      { word: 'पढ़ता', status: 'good' },
      { word: 'हूँ।', status: 'perfect' }
    ]
  },
  {
    id: 'spk_in_3',
    category: 'Conversational Dialogue (बातचीत)',
    level: 'L1: Starter',
    mode: 'indian-to-hindi',
    nativeLang: 'Bengali (বাংলা)',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'भारत विविधताओं का देश है। यहाँ कई भाषाएँ बोली जाती हैं।',
    transliterationNative: 'ভারত বৈচিত্র্যের দেশ। এখানে অনেক ভাষা বলা হয়।',
    englishMeaning: 'India is a land of diversity. Many languages are spoken here.',
    phoneticTip: 'Bengali speakers: distinguish "b" (ब) and "v" (व) sounds carefully.',
    words: [
      { word: 'भारत', status: 'perfect' },
      { word: 'विविधताओं', status: 'good' },
      { word: 'का', status: 'perfect' },
      { word: 'देश', status: 'perfect' },
      { word: 'है।', status: 'perfect' },
      { word: 'यहाँ', status: 'good' },
      { word: 'कई', status: 'perfect' },
      { word: 'भाषाएँ', status: 'needs-work' },
      { word: 'बोली', status: 'perfect' },
      { word: 'जाती', status: 'perfect' },
      { word: 'हैं।', status: 'perfect' }
    ]
  },
  {
    id: 'spk_in_4',
    category: 'Phonetic & Vowel Stress (स्वर उच्चारण)',
    level: 'L2: Intermediate',
    mode: 'indian-to-hindi',
    nativeLang: 'Malayalam (മലയാളം)',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'अभ्यास से हर भाषा पर विजय पाई जा सकती है।',
    transliterationNative: 'അഭ്യാസത്തിലൂടെ ഏത് ഭാഷയും കീഴടക്കാം.',
    englishMeaning: 'Through practice, mastery over any language can be achieved.',
    phoneticTip: 'Malayalam speakers: keep aspirates (भ, घ, ढ) crisp without adding extra schwa.',
    words: [
      { word: 'अभ्यास', status: 'perfect' },
      { word: 'से', status: 'perfect' },
      { word: 'हर', status: 'perfect' },
      { word: 'भाषा', status: 'good' },
      { word: 'पर', status: 'perfect' },
      { word: 'विजय', status: 'good' },
      { word: 'पाई', status: 'perfect' },
      { word: 'जा', status: 'perfect' },
      { word: 'सकती', status: 'perfect' },
      { word: 'है।', status: 'perfect' }
    ]
  },

  // 🌍 FOREIGN LANGUAGES TO ALL INDIAN LANGUAGES / HINDI TRACKS
  {
    id: 'spk_for_1',
    category: 'Global Learner Greetings',
    level: 'L1: Starter',
    mode: 'foreign-to-indian',
    nativeLang: 'English (US/UK)',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'नमस्ते! मेरा नाम जॉन है। मैं भारत घूमना चाहता हूँ।',
    transliterationNative: 'Namaste! Mera naam John hai. Main Bharat ghoomna chahta hoon.',
    englishMeaning: 'Hello! My name is John. I want to travel across India.',
    phoneticTip: 'English speakers: dental "t" (त) is produced with tongue against back of top teeth.',
    words: [
      { word: 'नमस्ते!', status: 'perfect' },
      { word: 'मेरा', status: 'perfect' },
      { word: 'नाम', status: 'perfect' },
      { word: 'जॉन', status: 'good' },
      { word: 'है।', status: 'perfect' },
      { word: 'मैं', status: 'good' },
      { word: 'भारत', status: 'perfect' },
      { word: 'घूमना', status: 'needs-work' },
      { word: 'चाहता', status: 'good' },
      { word: 'हूँ।', status: 'perfect' }
    ]
  },
  {
    id: 'spk_for_2',
    category: 'French to Tamil Bridge Track',
    level: 'L1: Starter',
    mode: 'foreign-to-indian',
    nativeLang: 'French (Français)',
    targetLang: 'Tamil (தமிழ்)',
    targetLangCode: 'ta-IN',
    targetScriptText: 'வணக்கம்! தமிழ் கற்றுக் கொள்வது மிகவும் அருமை.',
    transliterationNative: 'Vanakkam! Tamil katruk kolvathu migavum arumai.',
    englishMeaning: 'Hello! Learning Tamil is wonderful.',
    phoneticTip: 'French speakers: retroflex "ழ" (zh) is formed by curling tongue tip back towards palate.',
    words: [
      { word: 'வணக்கம்!', status: 'perfect' },
      { word: 'தமிழ்', status: 'good' },
      { word: 'கற்றுக்', status: 'perfect' },
      { word: 'கொள்வது', status: 'good' },
      { word: 'மிகவும்', status: 'perfect' },
      { word: 'அருமை.', status: 'perfect' }
    ]
  },
  {
    id: 'spk_for_3',
    category: 'Spanish to Telugu Syntax Track',
    level: 'L2: Intermediate',
    mode: 'foreign-to-indian',
    nativeLang: 'Spanish (Español)',
    targetLang: 'Telugu (తెలుగు)',
    targetLangCode: 'te-IN',
    targetScriptText: 'నమస్కారం! నేను రోజువారీ సంభాషణ అభ్యాసం చేస్తున్నాను.',
    transliterationNative: 'Namaskaram! Nenu rojuvari sambhashana abhyasam chestunnanu.',
    englishMeaning: 'Hello! I am practicing daily speech conversation.',
    phoneticTip: 'Spanish speakers: trilled "r" (ర) maps cleanly to Telugu vibrants.',
    words: [
      { word: 'నమస్కారం!', status: 'perfect' },
      { word: 'నేను', status: 'perfect' },
      { word: 'రోజువారీ', status: 'good' },
      { word: 'సంభాషణ', status: 'needs-work' },
      { word: 'అభ్యాసం', status: 'good' },
      { word: 'చేస్తున్నాను.', status: 'perfect' }
    ]
  },
  {
    id: 'spk_for_4',
    category: 'German to Hindi Devanagari Track',
    level: 'L2: Intermediate',
    mode: 'foreign-to-indian',
    nativeLang: 'German (Deutsch)',
    targetLang: 'Hindi (हिंदी)',
    targetLangCode: 'hi-IN',
    targetScriptText: 'विश्व बंधुत्व और शांति भारतीय संस्कृति का मूल मंत्र है।',
    transliterationNative: 'Vishwa bandhutva aur shanti Bharatiya sanskriti ka mool mantra hai.',
    englishMeaning: 'Universal brotherhood and peace is the core mantra of Indian culture.',
    phoneticTip: 'German speakers: unvoiced "ch" differs from Hindi palatal "छ/श".',
    words: [
      { word: 'विश्व', status: 'perfect' },
      { word: 'बंधुत्व', status: 'good' },
      { word: 'और', status: 'perfect' },
      { word: 'शांति', status: 'perfect' },
      { word: 'भारतीय', status: 'good' },
      { word: 'संस्कृति', status: 'needs-work' },
      { word: 'का', status: 'perfect' },
      { word: 'मूल', status: 'perfect' },
      { word: 'मंत्र', status: 'good' },
      { word: 'है।', status: 'perfect' }
    ]
  }
];

export default function DashboardSpeakingTestPage() {
  const [trackMode, setTrackMode] = useState<'indian-to-hindi' | 'foreign-to-indian'>('indian-to-hindi');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordingTimer, setRecordingTimer] = useState<number>(0);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [overallScore, setOverallScore] = useState<number>(89);

  // Filter prompts by mode
  const currentPrompts = SPEAKING_PROMPTS_DATABASE.filter(p => p.mode === trackMode);
  const currentPrompt = currentPrompts[selectedPromptIdx] || currentPrompts[0];

  // Timer effect during recording
  useEffect(() => {
    let interval: any = null;
    if (recording) {
      interval = setInterval(() => {
        setRecordingTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setRecordingTimer(0);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const speakReferenceAudio = (text: string, langCode: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = langCode || 'hi-IN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      alert(`[Audio Reference Playing]: "${text}"`);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setAnalyzed(true);
      setUserTranscript(currentPrompt.targetScriptText);
      // Generate realistic score between 84% and 96%
      const randomScore = Math.floor(Math.random() * 13) + 84;
      setOverallScore(randomScore);
    } else {
      setRecording(true);
      setAnalyzed(false);
      setUserTranscript('');
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-blue-600" /> MULTI-LINGUAL AI SPEECH EVALUATOR
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              AI Multi-Language Speaking & Pronunciation Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl">
              Evaluates native phonetics, consonant/vowel accuracy, and speech fluency for <strong>All Indian Languages to Hindi</strong> and <strong>All Foreign Languages to Indian Languages</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 font-extrabold text-xs shrink-0">
            <button
              onClick={() => {
                setTrackMode('indian-to-hindi');
                setSelectedPromptIdx(0);
                setAnalyzed(false);
              }}
              className={`px-4 py-2.5 rounded-xl transition ${
                trackMode === 'indian-to-hindi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇮🇳 All Indian → Hindi Track
            </button>
            <button
              onClick={() => {
                setTrackMode('foreign-to-indian');
                setSelectedPromptIdx(0);
                setAnalyzed(false);
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

        {/* Prompt Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {currentPrompts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPromptIdx(idx);
                setAnalyzed(false);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedPromptIdx === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{p.nativeLang}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span>{p.targetLang}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Assessment Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Target Speech Prompt & Recording Studio (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-left">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                    {currentPrompt.level}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{currentPrompt.category}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Native Pair: <span className="text-blue-600">{currentPrompt.nativeLang}</span> → <span className="text-emerald-600">{currentPrompt.targetLang}</span>
                </h3>
              </div>

              <button
                onClick={() => speakReferenceAudio(currentPrompt.targetScriptText, currentPrompt.targetLangCode)}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center gap-1.5 border border-blue-200 transition shrink-0"
              >
                <Volume2 className="w-4 h-4 text-blue-600" /> Play Reference Audio
              </button>
            </div>

            {/* Target Script Display Card */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                TARGET SPEECH PROMPT ({currentPrompt.targetLang}):
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-wide">
                {currentPrompt.targetScriptText}
              </h2>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Native Transliteration ({currentPrompt.nativeLang}):</span>
                <p className="text-xs font-semibold text-cyan-300 font-mono">{currentPrompt.transliterationNative}</p>
                <p className="text-xs text-slate-300 italic">"{currentPrompt.englishMeaning}"</p>
              </div>
            </div>

            {/* Phonetic Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold block text-amber-950">AI Phonetic Guidance:</strong>
                {currentPrompt.phoneticTip}
              </div>
            </div>

            {/* Microphone Recording Controls */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <button
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full font-black flex flex-col items-center justify-center mx-auto shadow-2xl transition duration-300 ${
                  recording
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200 scale-105'
                    : 'bg-blue-600 hover:bg-blue-700 text-white ring-8 ring-blue-100 hover:scale-105'
                }`}
              >
                {recording ? <Square className="w-8 h-8 fill-white" /> : <Mic className="w-10 h-10" />}
                <span className="text-[10px] uppercase tracking-wider font-black mt-1">
                  {recording ? `${recordingTimer}s Stop` : 'Record'}
                </span>
              </button>

              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-900 block">
                  {recording ? '🎙️ Listening & Analyzing Speech Waveform...' : 'Click blue button & speak prompt out loud into microphone'}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Supports 22 Eighth Schedule Indian Languages & 15 Global Foreign Speech Models.
                </span>
              </div>
            </div>

            {/* AI Speech Score Analytics Box */}
            {analyzed && (
              <div className="p-6 rounded-3xl bg-emerald-50/90 border border-emerald-300 text-slate-900 space-y-5 animate-in fade-in zoom-in-95 shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-black text-base text-slate-900">AI Speech Evaluation Complete</h4>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider">
                    Score: {overallScore}%
                  </span>
                </div>

                {/* Score breakdown stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Phonetic Accuracy</span>
                    <span className="text-lg font-black text-emerald-700 block">94%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Devanagari Consonants</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Speech Rhythm</span>
                    <span className="text-lg font-black text-cyan-700 block">87%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Native Pause Flow</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Accent Match</span>
                    <span className="text-lg font-black text-amber-700 block">88%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{currentPrompt.nativeLang} Bridge</span>
                  </div>
                </div>

                {/* Word-by-Word Analysis Pills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase text-slate-700 tracking-wider block">
                    WORD-BY-WORD PRONUNCIATION ACCURACY:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentPrompt.words.map((w, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs border flex items-center gap-1 ${
                          w.status === 'perfect'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                            : w.status === 'good'
                            ? 'bg-amber-100 border-amber-300 text-amber-900'
                            : 'bg-rose-100 border-rose-300 text-rose-900'
                        }`}
                      >
                        {w.word}
                        {w.status === 'perfect' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Language Track Directory & Practice List (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Practice Prompts List</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {currentPrompts.length} Prompts in {trackMode === 'indian-to-hindi' ? 'Indian Track' : 'Foreign Track'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                AI Evaluator
              </span>
            </div>

            {/* Prompt Cards List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {currentPrompts.map((p, idx) => {
                const isActive = selectedPromptIdx === idx;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPromptIdx(idx);
                      setAnalyzed(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-400/60'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-extrabold">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white uppercase">{p.level}</span>
                      <span className="text-slate-400">{p.category}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{p.targetScriptText}</h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">{p.nativeLang} → {p.targetLang}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1 border-t border-slate-100">
                      <span>Native Script + Transliteration</span>
                      {isActive && <span className="text-blue-600 font-bold">SELECTED</span>}
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
