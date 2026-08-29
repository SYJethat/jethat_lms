'use client';

import React, { useState } from 'react';
import {
  Play,
  Video,
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  BookOpen,
  Search,
  Volume2,
  Award,
  Share2,
  Download,
  ThumbsUp,
  Bookmark
} from 'lucide-react';

interface FreeVideoItem {
  id: string;
  titleHindi: string;
  titleEng: string;
  category: string;
  duration: string;
  views: string;
  instructor: string;
  level: string;
  thumbnailGradient: string;
  description: string;
}

const FREE_VIDEOS_CATALOG: FreeVideoItem[] = [
  {
    id: 'vid_1',
    titleHindi: 'देवनागरी वर्णमाला व उच्चारण (Devanagari Alphabets & Phonetics)',
    titleEng: 'Master All 52 Devanagari Vowels & Consonants for Beginners',
    category: 'Devanagari Script',
    duration: '22 Mins',
    views: '124k',
    instructor: 'Dr. Devendra Sharma',
    level: 'Beginner',
    thumbnailGradient: 'from-blue-600 to-indigo-900',
    description: 'Learn step-by-step how to read, pronounce, and write Devanagari script with comparative sound rules for Dravidian & Indo-Aryan speakers.'
  },
  {
    id: 'vid_2',
    titleHindi: 'हिंदी वाक्य रचना नियम — SOV Syntax (Sentence Construction)',
    titleEng: 'Subject-Object-Verb (SOV) Word Order & Verb Conjugations',
    category: 'SOV Grammar',
    duration: '28 Mins',
    views: '98k',
    instructor: 'Prof. Ananya Sen',
    level: 'Elementary',
    thumbnailGradient: 'from-amber-600 to-red-800',
    description: 'Understand why Hindi sentence order is SOV (मैं हिंदी सीखता हूँ) and how it maps smoothly with regional Indian & foreign languages.'
  },
  {
    id: 'vid_3',
    titleHindi: 'दैनिक व्यावहारिक हिंदी भाषण (Spoken Everyday Conversation)',
    titleEng: 'Formal Greetings, Polite Expressions & Public Dialogues',
    category: 'Spoken Conversation',
    duration: '25 Mins',
    views: '142k',
    instructor: 'Acharya Aarav Shastri',
    level: 'Beginner',
    thumbnailGradient: 'from-emerald-600 to-teal-900',
    description: 'Practical spoken dialogues for markets, traveling, offices, and cultural events with native accent tips.'
  },
  {
    id: 'vid_4',
    titleHindi: 'क्षेत्रीय बोलियों का तुलनात्मक अध्ययन (Regional Accents & Dialects)',
    titleEng: 'Comparing Khariboli, Braj, Awadhi, Bhojpuri & Maithili',
    category: 'Regional Accent',
    duration: '32 Mins',
    views: '76k',
    instructor: 'Dr. Sunita Rao',
    level: 'Intermediate',
    thumbnailGradient: 'from-purple-600 to-indigo-950',
    description: 'Explore the vibrant dialectic diversity of Hindi across Northern, Central, and Eastern India.'
  },
  {
    id: 'vid_5',
    titleHindi: 'हिंदी काव्य व साहित्य रत्न (Poetry & Literature Jewels)',
    titleEng: 'Recitation of Kabir Dohas, Harivansh Rai Bachchan & Nirala',
    category: 'Literature & Poetry',
    duration: '30 Mins',
    views: '88k',
    instructor: 'Kavi Rajesh Verma',
    level: 'Advanced',
    thumbnailGradient: 'from-rose-600 to-amber-900',
    description: 'Immerse in classical Hindi poetry with word-by-word commentary and rhythmic audio recitation.'
  },
  {
    id: 'vid_6',
    titleHindi: 'विदेशी भाषा से हिंदी सीखने के 5 सुनहरे नियम (5 Rules for Global Learners)',
    titleEng: '5 Gold Rules to Learn Hindi from English, Spanish & French',
    category: 'Global Masterclass',
    duration: '24 Mins',
    views: '110k',
    instructor: 'Prof. Elena Rostova',
    level: 'Beginner',
    thumbnailGradient: 'from-cyan-600 to-blue-950',
    description: 'Proven strategies for international learners using IPA phonetics and Sanskrit root bridges.'
  }
];

export default function DashboardFreeVideosPage() {
  const [activeVideo, setActiveVideo] = useState<FreeVideoItem>(FREE_VIDEOS_CATALOG[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const filteredVideos = FREE_VIDEOS_CATALOG.filter((v) => {
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-700/30">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black tracking-widest uppercase border border-blue-400/30 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-blue-400" /> FREE VIDEO MASTERCLASS LIBRARY
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              100% Free Open Access
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            मुफ्त वीडियो व्याख्यान पुस्तकालय <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-200 to-emerald-300">
              Free Video Masterclasses & HD Lecture Series
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Access free video lectures covering Devanagari script, SOV sentence structure, daily conversations, regional accents, and poetry curated by national faculty.
          </p>
        </div>
      </div>

      {/* Featured Main Video Player */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="aspect-video bg-slate-900 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs z-10">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
              NOW WATCHING: {activeVideo.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {activeVideo.duration} • {activeVideo.views} Views
            </span>
          </div>

          <div className="text-center space-y-4 my-auto z-10">
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-110 transition"
            >
              <Play className="w-10 h-10 fill-white ml-1" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{activeVideo.titleHindi}</h3>
              <p className="text-xs text-slate-300 mt-1">{activeVideo.titleEng}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 z-10 border-t border-white/10 pt-3">
            <span>Instructor: <strong className="text-white">{activeVideo.instructor}</strong></span>
            <span>Quality: HD 1080p • Closed Captions Available</span>
          </div>
        </div>

        {/* Video Metadata Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">FACULTY LECTURE DETAILS</span>
            <p className="text-slate-700 font-medium">{activeVideo.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                liked ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className="w-4 h-4" /> {liked ? 'Liked ❤️' : 'Like'}
            </button>
            <button
              onClick={() => alert('Lecture link copied to clipboard!')}
              className="px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 font-bold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-blue-600" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Video Filter & Search Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Devanagari Script', 'SOV Grammar', 'Spoken Conversation', 'Regional Accent', 'Literature & Poetry'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
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
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideo(item)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 space-y-4 shadow-xs hover:shadow-lg ${
                activeVideo.id === item.id ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-400' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`aspect-video rounded-2xl bg-gradient-to-r ${item.thumbnailGradient} p-4 flex flex-col justify-between text-white relative overflow-hidden shadow-sm`}>
                <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-extrabold uppercase self-start">
                  {item.level}
                </span>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-white/80">
                  <span>{item.category}</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{item.titleHindi}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{item.titleEng}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                <span>By {item.instructor}</span>
                <span className="text-blue-600 font-bold">{item.views} Views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
