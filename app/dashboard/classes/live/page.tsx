'use client';

import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  UserCheck,
  Users,
  Mic,
  MicOff,
  VideoOff,
  Hand,
  MessageSquare,
  Send,
  X,
  Play,
  CheckCircle2,
  Sparkles,
  Share2,
  Bookmark,
  Bell,
  Radio,
  FileText
} from 'lucide-react';

interface LiveClassItem {
  id: string;
  titleHindi: string;
  titleEng: string;
  facultyName: string;
  facultyTitle: string;
  universityName: string;
  timeLabel: string;
  status: '🔴 LIVE NOW' | 'UPCOMING TODAY' | 'SCHEDULED' | 'RECORDED REPLAY';
  attendeesCount: number;
  bannerGradient: string;
  avatarUrl: string;
  agenda: string[];
}

const MOCK_LIVE_CLASSES: LiveClassItem[] = [
  {
    id: 'class_1',
    titleHindi: 'उच्च स्तरीय देवनागरी वाक्य रचना व क्रिया रूप',
    titleEng: 'SOV Sentence Structure & Advanced Verb Conjugations',
    facultyName: 'Dr. Devendra Sharma',
    facultyTitle: 'Senior Professor of Hindi Grammar',
    universityName: 'Kendriya Hindi Sansthan, Agra',
    timeLabel: 'LIVE NOW • Started 15m ago',
    status: '🔴 LIVE NOW',
    attendeesCount: 248,
    bannerGradient: 'from-red-600 via-indigo-900 to-slate-900',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    agenda: ['SOV Word Order Rules', 'Transitive vs Intransitive Verbs', 'Live Q&A & Pronunciation Practice']
  },
  {
    id: 'class_2',
    titleHindi: 'द्रविड़ भाषा सेतु व शब्दावली अभ्यास',
    titleEng: 'Dravidian Phonetic Bridge & Vocabulary Masterclass',
    facultyName: 'Prof. Ananya Sen',
    facultyTitle: 'Head of Language Harmony',
    universityName: 'Central Institute of Indian Languages (CIIL), Mysuru',
    timeLabel: 'Today, 18:00 PM IST',
    status: 'UPCOMING TODAY',
    attendeesCount: 185,
    bannerGradient: 'from-amber-600 to-red-800',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    agenda: ['Tamil-Hindi Cognates', 'Telugu Prefix Systems', 'Interactive Dictation']
  },
  {
    id: 'class_3',
    titleHindi: 'मुंशी प्रेमचंद का गोदान एवं आधुनिक हिंदी कथा',
    titleEng: 'Munshi Premchand Literature & Story Recitation',
    facultyName: 'Prof. Ramesh Sharma',
    facultyTitle: 'Dean of Hindi Literature',
    universityName: 'Banaras Hindu University (BHU), Varanasi',
    timeLabel: 'Tomorrow, 11:00 AM IST',
    status: 'SCHEDULED',
    attendeesCount: 310,
    bannerGradient: 'from-blue-700 to-indigo-950',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    agenda: ['Godan Chapter Analysis', 'Character Breakdown', 'Essay Writing Guidance']
  },
  {
    id: 'class_4',
    titleHindi: 'देवनागरी वर्णमाला, स्वर व व्यंजन मूलभूत कक्षा',
    titleEng: 'Devanagari Alphabet & Phonetics Foundation Replay',
    facultyName: 'Dr. Sunita Verma',
    facultyTitle: 'Faculty of Linguistics',
    universityName: 'University of Delhi (DU)',
    timeLabel: 'Recorded Lecture • Available 24/7',
    status: 'RECORDED REPLAY',
    attendeesCount: 1420,
    bannerGradient: 'from-emerald-700 to-teal-900',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    agenda: ['Vowels & Consonants (Swar & Vyanjan)', 'Ligatures (Sanyukt Akshar)', 'HD Video Replay']
  }
];

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSelf?: boolean;
}

export default function DashboardLiveClassesPage() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | '🔴 LIVE NOW' | 'UPCOMING TODAY' | 'SCHEDULED' | 'RECORDED REPLAY'>('All');
  const [activeClassroom, setActiveClassroom] = useState<LiveClassItem | null>(null);

  // Classroom Player Controls State
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'c1', sender: 'Aarav Sharma', text: 'Namaste Professor! Excited for today\'s SOV lesson.', time: '18:02', isSelf: true },
    { id: 'c2', sender: 'Dr. Devendra Sharma', text: 'Welcome Aarav! Today we cover verb conjugations.', time: '18:03' },
    { id: 'c3', sender: 'Priya Sundaram', text: 'Can we ask questions during the live slide review?', time: '18:04' },
    { id: 'c4', sender: 'Dr. Devendra Sharma', text: 'Yes Priya, feel free to raise your hand anytime!', time: '18:05' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: 'c_' + Date.now(),
      sender: 'Aarav Sharma',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const filteredClasses = MOCK_LIVE_CLASSES.filter((c) => {
    if (selectedFilter === 'All') return true;
    return c.status === selectedFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider border border-red-200 flex items-center gap-1.5 w-fit">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" /> LIVE INTERACTIVE CLASSROOM STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              प्रत्यक्ष ऑनलाइन कक्षाएं (Live Online Classrooms)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Attend real-time video lectures by accredited professors from top Indian universities. Participate in Q&A, raise your hand, and download slide handbooks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" /> 248 Students Online
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {['All', '🔴 LIVE NOW', 'UPCOMING TODAY', 'SCHEDULED', 'RECORDED REPLAY'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as any)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition ${
                selectedFilter === filter
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter === 'All' ? '🌟 All Sessions (4)' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* LIVE CLASSES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`p-6 bg-gradient-to-r ${c.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white font-black text-xs flex items-center gap-1.5">
                    {c.status === '🔴 LIVE NOW' && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                    {c.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-[11px] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {c.attendeesCount} Attending
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-black text-white">{c.titleHindi}</h3>
                  <p className="text-xs text-white/80 font-medium">{c.titleEng}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatarUrl}
                    alt={c.facultyName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{c.facultyName}</h4>
                    <p className="text-xs text-indigo-600 font-bold">{c.facultyTitle}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{c.universityName}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    SESSION AGENDA:
                  </span>
                  <ul className="space-y-1 text-slate-800 font-semibold">
                    {c.agenda.map((ag, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
              <span className="text-xs font-black text-indigo-700">{c.timeLabel}</span>

              {c.status === '🔴 LIVE NOW' ? (
                <button
                  onClick={() => setActiveClassroom(c)}
                  className="px-6 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-2 transition animate-pulse"
                >
                  <Video className="w-4 h-4" /> Join Live Classroom Studio →
                </button>
              ) : c.status === 'RECORDED REPLAY' ? (
                <button
                  onClick={() => setActiveClassroom(c)}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Replay Video
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const token = 'ONLINE-STUDIO-2026-' + Math.floor(100000 + Math.random() * 900000);
                      alert(`✅ ONLINE CLASS BATCH REGISTERED!\n\nClassroom Token: ${token}\nFaculty: ${c.facultyName}\nTime: ${c.timeLabel}\n\nA calendar invite & Webinar Studio link have been dispatched to your email!`);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Register Online Batch
                  </button>
                  <button
                    onClick={() => alert(`🔔 Live Class Reminder set for ${c.titleHindi}!`)}
                    className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Set Reminder"
                  >
                    <Bell className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FULL-SCREEN LIVE CLASSROOM INTERACTIVE STUDIO MODAL */}
      {activeClassroom && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-4 text-left">
            {/* Studio Top Control Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE STUDIO
                </span>
                <div>
                  <h3 className="font-black text-sm text-white">{activeClassroom.titleHindi}</h3>
                  <p className="text-xs text-slate-400 font-medium">{activeClassroom.facultyName} • {activeClassroom.universityName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> {activeClassroom.attendeesCount} Students
                </span>
                <button
                  onClick={() => setActiveClassroom(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Studio Main Body: Left Video Stream & Right Group Chat */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Video Stream & Slide Canvas (8 cols) */}
              <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between space-y-4 border-r border-slate-800 min-h-[420px]">
                {/* Simulated Live Video Canvas */}
                <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner group">
                  {isVideoOn ? (
                    <div className="text-center space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={activeClassroom.avatarUrl}
                          alt=""
                          className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-500 shadow-2xl mx-auto"
                        />
                        <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-white">{activeClassroom.facultyName}</h4>
                        <span className="text-xs text-indigo-400 font-bold">Presenting Slide 4: SOV Grammar Order</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 text-slate-500">
                      <VideoOff className="w-12 h-12 mx-auto" />
                      <p className="text-xs font-bold">Camera Turned Off</p>
                    </div>
                  )}

                  {/* Hand Raised Badge Alert */}
                  {handRaised && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
                      <Hand className="w-4 h-4 fill-slate-950" /> Hand Raised! Professor Notified.
                    </div>
                  )}
                </div>

                {/* Studio Bottom Toolbar (Mic, Video, Hand, Screen Share) */}
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isMicOn ? 'Mic On' : 'Muted'}</span>
                    </button>

                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        isVideoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isVideoOn ? 'Cam On' : 'Cam Off'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHandRaised(!handRaised)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition ${
                        handRaised ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <Hand className="w-4 h-4" /> Raise Hand
                    </button>

                    <button
                      onClick={() => alert('📄 Lecture Slides & PDF Notes downloaded!')}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 transition shadow-sm"
                    >
                      <FileText className="w-4 h-4" /> Download Slides
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Student Chat & Q&A (4 cols) */}
              <div className="lg:col-span-4 p-4 bg-slate-900 flex flex-col justify-between space-y-4 min-h-[420px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-white font-extrabold text-xs">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Live Classroom Q&A
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Public Chat</span>
                </div>

                {/* Messages Log */}
                <div className="flex-1 overflow-y-auto max-h-72 space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-2xl space-y-1 ${
                        msg.isSelf
                          ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-100 ml-4'
                          : 'bg-slate-800/80 border border-slate-700 text-slate-200 mr-4'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span className={msg.isSelf ? 'text-indigo-300' : 'text-amber-400'}>{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-xs leading-snug">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask a question or type in Devanagari..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
