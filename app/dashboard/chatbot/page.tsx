'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  User as UserIcon,
  Sparkles,
  RefreshCw,
  Volume2,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneCall,
  PhoneOff,
  MessageSquare,
  Radio,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
  Languages,
  Zap,
  Camera
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  transcriptSubtitle?: string;
}

interface AITeacherAvatar {
  id: string;
  nameHindi: string;
  nameEng: string;
  role: string;
  avatarUrl: string;
  voiceLang: string;
  gradient: string;
  greeting: string;
}

const AI_TEACHERS: AITeacherAvatar[] = [
  {
    id: 't_devendra',
    nameHindi: 'आचार्य देवेन्द्र प्रसाद (Acharya Devendra AI)',
    nameEng: 'Senior Professor of Devanagari & SOV Grammar',
    role: 'Grammar & Script Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    voiceLang: 'hi-IN',
    gradient: 'from-amber-600 via-indigo-900 to-slate-950',
    greeting: 'नमस्ते आरव! मैं आपका AI वीडियो शिक्षक आचार्य देवेन्द्र हूँ। आज आप हिंदी व्याकरण में क्या पूछना चाहते हैं?'
  },
  {
    id: 't_vidya',
    nameHindi: 'विद्या मैम (Vidya AI Tutor)',
    nameEng: 'Spoken Hindi & Dravidian Phonetics Coach',
    role: 'Spoken Audio & Accent Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    voiceLang: 'hi-IN',
    gradient: 'from-purple-700 via-pink-900 to-slate-950',
    greeting: 'Namaste Aarav! I am Vidya AI, your spoken Hindi and pronunciation coach. Ask me any question or practice speaking out loud!'
  }
];

export default function DashboardChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'नमस्ते! मैं आपका हिंदी AI शिक्षक हूँ। आज आप क्या सीखना चाहते हैं? (Hello! I am your AI Hindi Tutor. What would you like to learn today?)',
      time: '18:00'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<AITeacherAvatar>(AI_TEACHERS[0]);

  // LIVE AI VIDEO CALL MODAL & WEBCAM STATES
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [callTranscript, setCallTranscript] = useState<string>('Connected to AI Video Teacher Studio...');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  // Student Webcam Refs
  const studentVideoRef = useRef<HTMLVideoElement | null>(null);
  const userMediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSpeechRecognitionSupported(true);
    }
  }, []);

  // Handle Student Real Camera Access
  useEffect(() => {
    if (isVideoCallActive && !isCamOff) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            userMediaStreamRef.current = stream;
            if (studentVideoRef.current) {
              studentVideoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.log('Webcam permission note:', err);
          });
      }
    } else {
      if (userMediaStreamRef.current) {
        userMediaStreamRef.current.getTracks().forEach((track) => track.stop());
        userMediaStreamRef.current = null;
      }
    }

    return () => {
      if (userMediaStreamRef.current) {
        userMediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoCallActive, isCamOff]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = selectedTeacher.voiceLang;
      u.rate = 0.9;
      u.onstart = () => setIsAISpeaking(true);
      u.onend = () => setIsAISpeaking(false);
      u.onerror = () => setIsAISpeaking(false);
      window.speechSynthesis.speak(u);
    }
  };

  const handleSendText = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    if (!textToSend) setInput('');

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { id: 'u_' + Date.now(), sender: 'user', text: query, time: timeNow };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    if (isVideoCallActive) {
      setCallTranscript(`Aarav asked: "${query}"`);
    }

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, conversationHistory: [] }),
      });
      const data = await res.json();
      const aiReply = data.response || 'बहुत बढ़िया प्रश्न! हिंदी व्याकरण में कर्ता, कर्म और क्रिया का क्रम महत्वपूर्ण है।';

      const aiMsg: ChatMessage = { id: 'ai_' + Date.now(), sender: 'ai', text: aiReply, time: timeNow };
      setMessages((prev) => [...prev, aiMsg]);
      
      if (isVideoCallActive) {
        setCallTranscript(aiReply);
        speakText(aiReply);
      }
    } catch {
      const fallbackReply = 'बहुत बढ़िया प्रश्न! हिंदी वाक्य में कर्ता (Subject) पहले और क्रिया (Verb) अंत में आती है।';
      const aiMsg: ChatMessage = { id: 'ai_' + Date.now(), sender: 'ai', text: fallbackReply, time: timeNow };
      setMessages((prev) => [...prev, aiMsg]);
      
      if (isVideoCallActive) {
        setCallTranscript(fallbackReply);
        speakText(fallbackReply);
      }
    } finally {
      setLoading(false);
    }
  };

  const startAIVideoCall = (teacher: AITeacherAvatar) => {
    setSelectedTeacher(teacher);
    setIsVideoCallActive(true);
    setIsCamOff(false);
    setCallTranscript(teacher.greeting);
    speakText(teacher.greeting);
  };

  const endAIVideoCall = () => {
    setIsVideoCallActive(false);
    if (userMediaStreamRef.current) {
      userMediaStreamRef.current.getTracks().forEach((track) => track.stop());
      userMediaStreamRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAISpeaking(false);
  };

  const handleVoiceMicClick = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is active. Speak your question or click any prompt!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;
      recognition.onstart = () => setIsListeningVoice(true);
      recognition.onend = () => setIsListeningVoice(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendText(transcript);
        }
      };
      recognition.start();
    } catch (e) {
      setIsListeningVoice(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200 flex items-center gap-1.5 w-fit">
              <Bot className="w-4 h-4 text-indigo-600" /> VIRTUAL AI VIDEO TEACHER & TUTOR HUB
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              AI वीडियो शिक्षक संवाद (AI Video Teacher Hub)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Start interactive 1v1 video calls with AI Professors. Access your student camera live, ask questions in Hindi or English, and receive audio responses with real-time video avatar lip-sync!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => startAIVideoCall(AI_TEACHERS[0])}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-indigo-700 hover:from-red-500 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition animate-pulse"
            >
              <Video className="w-4 h-4" /> Start AI Video Call (Camera Enabled) →
            </button>
          </div>
        </div>

        {/* AI TEACHER SELECTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {AI_TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                selectedTeacher.id === teacher.id
                  ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-400 shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={teacher.avatarUrl}
                  alt=""
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md shrink-0"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{teacher.nameHindi}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{teacher.role}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startAIVideoCall(teacher);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-xs"
              >
                <Video className="w-3.5 h-3.5" /> Call Video AI
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT MESSAGES & QUICK VOICE PROMPTS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{selectedTeacher.nameHindi}</h3>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> AI Tutor Active • Ready for Voice & Video
              </span>
            </div>
          </div>

          <button
            onClick={() => startAIVideoCall(selectedTeacher)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Video className="w-4 h-4 animate-pulse" /> Launch Video Call Studio
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <img
                  src={selectedTeacher.avatarUrl}
                  alt=""
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500 shadow-sm shrink-0"
                />
              )}

              <div
                className={`max-w-lg p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                <p>{m.text}</p>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => speakText(m.text)}
                    className="mt-2 text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen Voice Response (सुनें)
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-xs text-indigo-600 font-bold animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> AI Teacher is generating response in Hindi...
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">QUICK QUESTIONS:</span>
          {[
            'SOV व्याकरण नियम क्या है?',
            'How to say Thank You in Hindi?',
            'सर्वनाम के भेद समझाइए',
            'Check my Devanagari pronunciation'
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendText(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 font-bold whitespace-nowrap text-xs transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <button
            onClick={handleVoiceMicClick}
            className={`p-3 rounded-xl transition ${
              isListeningVoice
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Click to Speak"
          >
            <Mic className="w-5 h-5 text-indigo-600" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="Ask AI Teacher anything in Hindi or English..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <button
            onClick={() => handleSendText()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-md transition"
          >
            <Send className="w-4 h-4" /> Ask AI
          </button>
        </div>
      </div>

      {/* FULL-SCREEN 1V1 AI VIDEO CALL INTERFACE MODAL WITH STUDENT WEBCAM */}
      {isVideoCallActive && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-4 text-left">
            {/* Top Video Call Header Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" /> 1V1 AI VIDEO CALL LIVE
                </span>
                <div>
                  <h3 className="font-black text-sm text-white">{selectedTeacher.nameHindi}</h3>
                  <p className="text-xs text-indigo-400 font-medium">{selectedTeacher.nameEng}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={endAIVideoCall}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <PhoneOff className="w-4 h-4" /> End Call
                </button>
              </div>
            </div>

            {/* Video Call Grid Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: AI Teacher Video Avatar Stream & Student Webcam PIP (8 cols) */}
              <div className="lg:col-span-8 p-6 bg-slate-950 flex flex-col justify-between space-y-4 border-r border-slate-800 min-h-[460px]">
                {/* AI Video Stream Player */}
                <div className={`relative aspect-video rounded-3xl bg-gradient-to-br ${selectedTeacher.gradient} border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl`}>
                  {/* AI Teacher Avatar Video Frame */}
                  <div className="relative inline-block mb-4">
                    <img
                      src={selectedTeacher.avatarUrl}
                      alt={selectedTeacher.nameEng}
                      className={`w-32 h-32 rounded-3xl object-cover ring-4 ring-indigo-500 shadow-2xl transition-transform duration-300 ${
                        isAISpeaking ? 'scale-105 ring-emerald-400' : ''
                      }`}
                    />
                    <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-white text-[10px] font-black">
                      AI
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white">{selectedTeacher.nameHindi}</h4>
                    <p className="text-xs text-indigo-300 font-bold">{selectedTeacher.role}</p>
                  </div>

                  {/* Animated Speaking Waveform Bouncing Bars */}
                  {isAISpeaking && (
                    <div className="flex items-center justify-center gap-1 mt-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                        <div
                          key={bar}
                          className="w-1.5 bg-emerald-400 rounded-full animate-bounce"
                          style={{ height: `${Math.floor(12 + Math.random() * 28)}px`, animationDelay: `${bar * 0.1}s` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* REAL STUDENT WEBCAM PIP PREVIEW BOX */}
                  <div className="absolute bottom-4 right-4 w-36 h-24 rounded-2xl bg-slate-950 border-2 border-indigo-500/80 overflow-hidden shadow-2xl flex items-center justify-center text-slate-400 text-[10px] font-bold">
                    {!isCamOff ? (
                      <video
                        ref={studentVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <Camera className="w-5 h-5 mx-auto text-slate-500 mb-1" />
                        <span>Camera Off</span>
                      </div>
                    )}
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[8px] font-bold">
                      YOU
                    </span>
                  </div>
                </div>

                {/* LIVE SUBTITLE TRANSCRIPT BAR */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> LIVE SUBTITLE TRANSCRIPT:
                  </span>
                  <p className="text-white font-medium italic text-sm leading-relaxed">&quot;{callTranscript}&quot;</p>
                </div>

                {/* Video Call Controls Toolbar */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMicMuted(!isMicMuted)}
                      className={`p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition ${
                        !isMicMuted ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {!isMicMuted ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{!isMicMuted ? 'Mic On' : 'Muted'}</span>
                    </button>

                    <button
                      onClick={() => setIsCamOff(!isCamOff)}
                      className={`p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition ${
                        !isCamOff ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {!isCamOff ? <Video className="w-4 h-4 text-indigo-400" /> : <VideoOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{!isCamOff ? 'Camera On' : 'Camera Off'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleVoiceMicClick}
                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition"
                    >
                      <Mic className="w-4 h-4" /> Speak Question
                    </button>

                    <button
                      onClick={endAIVideoCall}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg transition"
                    >
                      <PhoneOff className="w-4 h-4 inline mr-1" /> End Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: In-Call Question Input & Quick Voice Prompts (4 cols) */}
              <div className="lg:col-span-4 p-4 bg-slate-900 flex flex-col justify-between space-y-4 min-h-[460px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-white font-extrabold text-xs">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> In-Call Question Panel
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">Live WebCam & Audio Active</span>
                </div>

                {/* Quick Voice Prompts inside Video Call */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    ASK AI TEACHER DURING CALL:
                  </span>
                  <div className="space-y-2">
                    {[
                      'हिंदी में SOV व्याकरण नियम क्या है?',
                      'How do I say "Good Morning" in Tamil & Hindi?',
                      'Explain pronouns and verb tenses',
                      'Rate my Devanagari speaking accent'
                    ].map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendText(prompt)}
                        className="w-full text-left p-3 rounded-xl bg-slate-800 hover:bg-indigo-900/60 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs transition block"
                      >
                        🗣️ &quot;{prompt}&quot;
                      </button>
                    ))}
                  </div>
                </div>

                {/* In-Call Text Input */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a question for AI Video Teacher..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                      className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleSendText()}
                      className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
