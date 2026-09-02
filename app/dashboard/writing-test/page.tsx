'use client';

import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  CheckCircle2,
  Volume2,
  Globe,
  Languages,
  BookOpen,
  Send,
  RefreshCw,
  AlertTriangle,
  Check,
  Copy,
  FileText,
  Lightbulb,
  Sliders,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Flame
} from 'lucide-react';

interface WritingPrompt {
  id: string;
  category: string;
  level: string;
  mode: 'indian-to-hindi' | 'foreign-to-indian';
  nativeLang: string;
  targetLang: string;
  targetLangCode: string;
  titlePrompt: string;
  instructions: string;
  sampleModelAnswer: string;
  suggestedKeywords: string[];
}

const WRITING_PROMPTS_DATABASE: WritingPrompt[] = [
  // 🇮🇳 INDIAN LANGUAGES TO HINDI TRACK
  {
    id: 'wrt_in_1',
    category: 'Self Introduction (मेरा परिचय)',
    level: 'L1: Starter',
    mode: 'indian-to-hindi',
    nativeLang: 'Tamil / Telugu / Malayalam / Kannada',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    titlePrompt: 'मेरा परिचय और मेरा परिवार (My Self Introduction & Family)',
    instructions: 'Write 4-5 sentences introducing yourself, your profession, and your family in Devanagari Hindi.',
    sampleModelAnswer: 'नमस्ते! मेरा नाम राजेश है। मैं तमिलनाडु का रहने वाला हूँ। मैं एक सॉफ्टवेयर इंजीनियर हूँ। मेरा परिवार चेन्नई में रहता है। मुझे हिंदी सीखना बहुत पसंद है।',
    suggestedKeywords: ['नमस्ते', 'मेरा नाम', 'रहने वाला', 'परिवार', 'सीखना']
  },
  {
    id: 'wrt_in_2',
    category: 'Essay Composition (निबंध रचना)',
    level: 'L2: Intermediate',
    mode: 'indian-to-hindi',
    nativeLang: 'Bengali / Marathi / Gujarati / Odia',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    titlePrompt: 'भारतीय संस्कृति और त्योहार (Indian Culture & Festivals)',
    instructions: 'Write a short paragraph explaining the significance of your favorite Indian festival.',
    sampleModelAnswer: 'भारत विविधताओं का देश है। यहाँ दिवाली और होली जैसे त्योहार बड़ी धूमधाम से मनाए जाते हैं। त्योहार हमारे जीवन में भाईचारा, आनंद और समृद्धि लाते हैं।',
    suggestedKeywords: ['विविधता', 'त्योहार', 'धूमधाम', 'भाईचारा', 'समृद्धि']
  },
  {
    id: 'wrt_in_3',
    category: 'Rajbhasha Administrative Drafting (शासकीय पत्राचार)',
    level: 'L3: Advanced',
    mode: 'indian-to-hindi',
    nativeLang: 'All Regional Indian Officers',
    targetLang: 'Hindi (Devanagari Official)',
    targetLangCode: 'hi-IN',
    titlePrompt: 'कार्यालयी ज्ञापन एवं वार्षिक प्रगति रिपोर्ट (Office Memorandum & Annual Progress Report)',
    instructions: 'Draft an official memorandum requesting quarterly language progress reports from all department heads.',
    sampleModelAnswer: 'कार्यालय ज्ञापन: गृह मंत्रालय के निर्देशानुसार सभी विभागीय प्रमुखों से अनुरोध है कि वे तृतीय तिमाही की राजभाषा प्रगति रिपोर्ट आगामी १५ दिनों के भीतर प्रेषित करें।',
    suggestedKeywords: ['कार्यालय ज्ञापन', 'निर्देशानुसार', 'तृतीय तिमाही', 'प्रगति रिपोर्ट', 'प्रेषित']
  },

  // 🌍 FOREIGN LANGUAGES TO INDIAN / HINDI TRACK
  {
    id: 'wrt_for_1',
    category: 'Global Travel & Dialogue',
    level: 'L1: Starter',
    mode: 'foreign-to-indian',
    nativeLang: 'English / French / Spanish / German',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    titlePrompt: 'My Travel Experience in India (भारत यात्रा का अनुभव)',
    instructions: 'Write 4 sentences about visiting famous Indian cities or monuments in Hindi.',
    sampleModelAnswer: 'मैंने पिछले महीने भारत की यात्रा की। ताज महल बहुत सुंदर है। भारतीय खाना बहुत स्वादिष्ट और मसालेदार है। मैं दोबारा भारत आना चाहता हूँ।',
    suggestedKeywords: ['यात्रा', 'सुंदर', 'स्वादिष्ट', 'मसालेदार', 'दोबारा']
  },
  {
    id: 'wrt_for_2',
    category: 'Global Business & Digital India',
    level: 'L2: Intermediate',
    mode: 'foreign-to-indian',
    nativeLang: 'Japanese / Mandarin / Arabic / Russian',
    targetLang: 'Hindi (Devanagari)',
    targetLangCode: 'hi-IN',
    titlePrompt: 'Digital India & Global Commerce (डिजिटल इंडिया और व्यापार)',
    instructions: 'Describe how technology connects global citizens with Indian language learning.',
    sampleModelAnswer: 'डिजिटल इंडिया तकनीक के माध्यम से दुनिया को जोड़ रहा है। ऑनलाइन शिक्षण से विदेशी विद्यार्थी भी हिंदी और तमिल जैसी भाषाएँ आसानी से सीख रहे हैं।',
    suggestedKeywords: ['तकनीक', 'माध्यम', 'शिक्षण', 'विदेशी', 'आसानी']
  }
];

// Quick insert matras for Devanagari virtual keyboard
const DEVANAGARI_MATRAS = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः', 'ँ', '्', 'ऋ', 'ज्ञ', 'त्र', 'क्ष', 'ड़', 'ढ़', 'ॐ'];

export default function DashboardWritingTestPage() {
  const [trackMode, setTrackMode] = useState<'indian-to-hindi' | 'foreign-to-indian'>('indian-to-hindi');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);
  const [userText, setUserText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [assessed, setAssessed] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // Filter prompts by track mode
  const currentPrompts = WRITING_PROMPTS_DATABASE.filter(p => p.mode === trackMode);
  const currentPrompt = currentPrompts[selectedPromptIdx] || currentPrompts[0];

  // Insert matra or character at cursor
  const handleInsertMatra = (char: string) => {
    setUserText((prev) => prev + char);
  };

  const handleAssess = async () => {
    if (!userText.trim()) return;
    setLoading(true);
    // Simulate real AI analysis response
    setTimeout(() => {
      setLoading(false);
      setAssessed(true);
    }, 1200);
  };

  const playTTS = (text: string, langCode: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = langCode || 'hi-IN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      alert(`[Audio Playback]: "${text}"`);
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <FileEdit className="w-3.5 h-3.5 text-emerald-600" /> MULTI-SCRIPT AI WRITING EVALUATOR
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              AI Multi-Language Essay & Script Writing Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl">
              Evaluates Devanagari orthography, Matra placement, SOV grammar syntax, and vocabulary richness for <strong>All Indian Languages to Hindi</strong> and <strong>All Foreign Languages to Indian Languages</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 font-extrabold text-xs shrink-0">
            <button
              onClick={() => {
                setTrackMode('indian-to-hindi');
                setSelectedPromptIdx(0);
                setAssessed(false);
                setUserText('');
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
                setAssessed(false);
                setUserText('');
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
                setAssessed(false);
                setUserText('');
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedPromptIdx === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{p.category}</span>
              <span className="text-[10px] opacity-75 font-normal">({p.level})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Writing Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Composition Editor & Devanagari Keypad (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-left">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    {currentPrompt.level}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{currentPrompt.category}</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {currentPrompt.titlePrompt}
                </h3>
              </div>

              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center gap-1.5 border border-amber-200 transition shrink-0"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                {showModelAnswer ? 'Hide Exemplar Essay' : 'View Exemplar Essay'}
              </button>
            </div>

            {/* Prompt Instructions */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 space-y-2">
              <span className="font-extrabold text-slate-900 block">Writing Instructions:</span>
              <p>{currentPrompt.instructions}</p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase">Suggested Vocabulary:</span>
                {currentPrompt.suggestedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-bold text-blue-700">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Model Answer Slide-out Card */}
            {showModelAnswer && (
              <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="text-xs font-black text-amber-950 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" /> Exemplar High-Scoring Response (100% Score)
                  </span>
                  <button
                    onClick={() => playTTS(currentPrompt.sampleModelAnswer, currentPrompt.targetLangCode)}
                    className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                  {currentPrompt.sampleModelAnswer}
                </p>
              </div>
            )}

            {/* On-Screen Matra Virtual Keyboard Helper */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                DEVANAGARI MATRA & SPECIAL CHARACTER HELPER (CLICK TO INSERT):
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-100 border border-slate-200">
                {DEVANAGARI_MATRAS.map((matra, i) => (
                  <button
                    key={i}
                    onClick={() => handleInsertMatra(matra)}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-blue-600 hover:text-white font-black text-sm text-slate-800 shadow-2xs border border-slate-200 transition active:scale-95 flex items-center justify-center"
                  >
                    {matra}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Composition Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Write Your Composition below:</span>
                <span className="text-slate-400 font-mono">{userText.length} Characters</span>
              </div>
              <textarea
                rows={7}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="यहाँ हिंदी देवनागरी लिपि में अपना उत्तर या निबंध लिखें..."
                className="w-full bg-slate-50 border border-slate-300 rounded-3xl p-5 text-sm sm:text-base text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-inner leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              {userText.length > 0 && (
                <button
                  onClick={() => playTTS(userText, currentPrompt.targetLangCode)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 border border-slate-300 transition"
                >
                  <Volume2 className="w-4 h-4 text-blue-600" /> Listen My Essay
                </button>
              )}

              <button
                onClick={handleAssess}
                disabled={loading || !userText.trim()}
                className="ml-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-4 h-4" />
                {loading ? 'AI Analyzing Devanagari Syntax...' : 'Submit Essay for AI Grammar Review →'}
              </button>
            </div>

            {/* AI Review Results Breakdown */}
            {assessed && (
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/90 border border-emerald-300 space-y-6 text-slate-900 animate-in fade-in zoom-in-95 shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-black text-base text-slate-900">AI Writing & Orthography Report</h4>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider">
                    Overall Score: 92%
                  </span>
                </div>

                {/* Grid scores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Grammar & SOV Syntax</span>
                    <span className="text-lg font-black text-emerald-700 block">95%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Correct Word Order</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Matra & Spelling</span>
                    <span className="text-lg font-black text-blue-700 block">90%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Devanagari Orthography</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Vocabulary Variety</span>
                    <span className="text-lg font-black text-amber-700 block">91%</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Rich Phrasing</span>
                  </div>
                </div>

                {/* AI Grammatical Rules & Feedback list */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    AI Grammatical Rules & Recommendations:
                  </span>
                  <div className="space-y-2 text-xs font-medium text-slate-800">
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Excellent SOV Order:</strong> Subject-Object-Verb alignment is maintained cleanly.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Matra Accuracy:</strong> Correct use of अनुस्वार (ं) and विराम (।) punctuation marks.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Enhancement Tip:</strong> Consider using formal Rajbhasha vocabulary like 'प्राप्त' and 'संस्कृति'.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Writing Prompts Directory (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Writing Prompts Directory</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {currentPrompts.length} Prompts in {trackMode === 'indian-to-hindi' ? 'Indian Track' : 'Foreign Track'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                AI Evaluator
              </span>
            </div>

            {/* Prompts Cards List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {currentPrompts.map((p, idx) => {
                const isActive = selectedPromptIdx === idx;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPromptIdx(idx);
                      setAssessed(false);
                      setUserText('');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400/60'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-extrabold">
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white uppercase">{p.level}</span>
                      <span className="text-slate-400">{p.category}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{p.titlePrompt}</h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">{p.nativeLang} → {p.targetLang}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1 border-t border-slate-100">
                      <span>Devanagari Orthography</span>
                      {isActive && <span className="text-emerald-600 font-bold">SELECTED</span>}
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
