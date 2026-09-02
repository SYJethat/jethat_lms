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
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* 2-Column Split Layout: Left Main Video Player, Right Playlist Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Video Player & Details */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="aspect-video bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl border border-slate-800">
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
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">FACULTY LECTURE DETAILS</span>
                <p className="text-slate-700 font-medium leading-relaxed">{activeVideo.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    liked ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> {liked ? 'Liked ❤️' : 'Like'}
                </button>
                <button
                  onClick={() => alert('Lecture link copied to clipboard!')}
                  className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 font-bold flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-blue-600" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Video Library Playlist & Search */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            {/* Playlist Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Lecture Playlist (व्याख्यान सूची)</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {filteredVideos.length} Available Masterclasses
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                Free Access
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search lectures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Devanagari Script', 'SOV Grammar', 'Spoken Conversation', 'Regional Accent', 'Literature & Poetry'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Vertical Video Playlist Cards */}
            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {filteredVideos.map((item) => {
                const isActive = activeVideo.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveVideo(item);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex gap-3 items-center shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-400/60'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {/* Compact Left Thumbnail */}
                    <div className={`w-24 h-16 shrink-0 rounded-xl bg-gradient-to-r ${item.thumbnailGradient} p-2 flex flex-col justify-between text-white relative overflow-hidden shadow-2xs`}>
                      <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-extrabold uppercase self-start">
                        {item.level}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto">
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </div>
                      <span className="text-[9px] font-bold text-white/90 text-right">
                        {item.duration}
                      </span>
                    </div>

                    {/* Right Metadata */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-black uppercase text-blue-600 truncate">{item.category}</span>
                        {isActive && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[9px] shrink-0">
                            PLAYING
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 leading-snug">{item.titleHindi}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.titleEng}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-0.5">
                        <span>{item.instructor}</span>
                        <span>{item.views} Views</span>
                      </div>
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
