'use client';

import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Pause,
  Volume2,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Download,
  Share2,
  Mic,
  RotateCcw,
  RotateCw,
  Sliders,
  Bookmark
} from 'lucide-react';

interface FreeAudioTrack {
  id: string;
  titleHindi: string;
  titleEng: string;
  category: string;
  duration: string;
  audioText: string;
  narrator: string;
  accent: string;
}

const FREE_AUDIO_PLAYLIST: FreeAudioTrack[] = [
  {
    id: 'aud_1',
    titleHindi: 'पाठ १: दैनिक शिष्टाचार एवं औपचारिक अभिवादन',
    titleEng: 'Everyday Courtesy, Formal Greetings & Respectful Speech',
    category: 'Daily Conversation',
    duration: '08:45',
    audioText: 'नमस्ते! आपका स्वागत है। आप कैसे हैं? मैं ठीक हूँ, धन्यवाद।',
    narrator: 'Acharya Aarav Shastri',
    accent: 'Standard Hindi (Khariboli)'
  },
  {
    id: 'aud_2',
    titleHindi: 'पाठ २: बाजार, दुकान व खरीदारी संवाद',
    titleEng: 'Marketplace Dialogues, Bargaining & Prices Inquiries',
    category: 'Practical Dialogues',
    duration: '12:20',
    audioText: 'यह कितने का है? कृपया सही दाम बताएँ। धन्यवाद, मैं यह लूूँगा।',
    narrator: 'Smt. Radhika Das',
    accent: 'Delhi / NCR Accent'
  },
  {
    id: 'aud_3',
    titleHindi: 'पाठ ३: तमिल व दक्षिण भारतीय भाषियों के लिए उच्चारण',
    titleEng: 'Pronunciation Guide Specifically for South Indian Speakers',
    category: 'Phonetic Drill',
    duration: '10:15',
    audioText: 'வணக்கம்! तमिल माध्यम से हिंदी वर्णमाला का सही उच्चारण सीखें।',
    narrator: 'Dr. Devendra Sharma',
    accent: 'Dravidian Phonetic Bridge'
  },
  {
    id: 'aud_4',
    titleHindi: 'पाठ ४: कबीर के दोहे व भावार्थ ऑडियो',
    titleEng: 'Kabir Dohas Recitation with Musical Harmonium Melody',
    category: 'Poetry & Music',
    duration: '15:30',
    audioText: 'गुरु गोविंद दोऊ खड़े, काके लागूं पांय। बलिहारी गुरु आपने, गोविंद दियो बताय।',
    narrator: 'Pt. Hridaynath Sharma',
    accent: 'Braj & Awadhi Heritage'
  },
  {
    id: 'aud_5',
    titleHindi: 'पाठ ५: यात्रा व स्टेशन पर पूछे जाने वाले प्रश्न',
    titleEng: 'Travel, Railway Station & Navigation Inquiry Audios',
    category: 'Travel & Navigation',
    duration: '09:50',
    audioText: 'यह ट्रेन कहाँ जाती है? टिकट खिड़की कहाँ है? धन्यवाद।',
    narrator: 'Rajesh Verma',
    accent: 'Standard North Indian'
  }
];

export default function DashboardFreeAudioPage() {
  const [activeTrack, setActiveTrack] = useState<FreeAudioTrack>(FREE_AUDIO_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const playSpeechAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    } else {
      alert(`[Audio Playback]: "${text}"`);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      playSpeechAudio(activeTrack.audioText);
    }
  };

  const filteredPlaylist = FREE_AUDIO_PLAYLIST.filter((track) => {
    const matchesCat = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch =
      track.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.narrator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-purple-800/40">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black tracking-widest uppercase border border-purple-400/30 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-purple-400" /> FREE AUDIO PODCAST & LISTENING HUB
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              Native Voice Audios
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            मुफ्त ऑडियो पॉडकास्ट एवं श्रवण केंद्र <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-300">
              Free Audio Lessons, Dialects & Pronunciation Pods
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Listen to authentic native speech recordings, daily conversation pods, poetry recitations, and Dravidian-Indo-Aryan phonetic accent guides.
          </p>
        </div>
      </div>

      {/* Main Interactive Audio Player Console */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase">
              NOW PLAYING • {activeTrack.category}
            </span>
            <span className="text-xs text-purple-200 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> {activeTrack.duration}
            </span>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">{activeTrack.titleHindi}</h3>
            <p className="text-xs text-purple-200 font-medium">{activeTrack.titleEng}</p>
          </div>

          {/* Audio Transcript / Phrase Box */}
          <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-xs font-semibold space-y-1">
            <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider block">NATIVE AUDIO TRANSCRIPT PHRASE:</span>
            <p className="text-sm font-bold text-white">{activeTrack.audioText}</p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => playSpeechAudio(activeTrack.audioText)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition"
                title="Rewind 10s"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-slate-950" /> : <Play className="w-8 h-8 fill-slate-950 ml-1" />}
              </button>

              <button
                onClick={() => playSpeechAudio(activeTrack.audioText)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition"
                title="Forward 10s"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-purple-200">Speed:</span>
              {[0.8, 1.0, 1.2, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    playbackSpeed === speed ? 'bg-white text-purple-950 font-black' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Track Details */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span>Narrator: <strong className="text-slate-900">{activeTrack.narrator}</strong></span>
          <span>Regional Accent: <strong className="text-purple-700">{activeTrack.accent}</strong></span>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Daily Conversation', 'Practical Dialogues', 'Phonetic Drill', 'Poetry & Music', 'Travel & Navigation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search audio tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredPlaylist.map((track) => (
            <div
              key={track.id}
              onClick={() => {
                setActiveTrack(track);
                playSpeechAudio(track.audioText);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                activeTrack.id === track.id ? 'bg-purple-50 border-purple-500 shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <button className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition ${
                  activeTrack.id === track.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{track.titleHindi}</h4>
                  <p className="text-xs text-slate-500">{track.titleEng}</p>
                </div>
              </div>

              <div className="text-right shrink-0 text-xs">
                <span className="font-bold text-purple-700 block">{track.duration}</span>
                <span className="text-slate-400 text-[10px]">{track.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
