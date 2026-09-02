'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Trophy,
  Award,
  Flame,
  Crown,
  Medal,
  Search,
  Globe,
  Building2,
  Sparkles,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  Zap,
  Star,
  Check,
  X,
  Languages,
  BookOpen
} from 'lucide-react';
import { MOCK_LEADERBOARD, LeaderboardUser } from '@/lib/mockData';

// Extended leaderboard data with track & native language details
interface EnhancedLeaderboardUser extends LeaderboardUser {
  track: 'indian-to-hindi' | 'foreign-to-indian' | 'rajbhasha-officer';
  nativeLang: string;
  targetLang: string;
  badges: string[];
  region: string;
}

const ENHANCED_LEADERBOARD: EnhancedLeaderboardUser[] = [
  {
    rank: 1,
    id: 'lb_1',
    name: 'Meera Krishnan',
    country: 'Tamil Nadu, India',
    institute: 'Anna University Language Center',
    xp: 5950,
    streak: 32,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    speakingScore: 98,
    writingScore: 96,
    track: 'indian-to-hindi',
    nativeLang: 'Tamil (தமிழ்)',
    targetLang: 'Hindi (हिंदी)',
    badges: ['🥇 #1 Global', '🔥 32-Day Streak', '🎙️ Speech Master'],
    region: 'South Region'
  },
  {
    rank: 2,
    id: 'lb_2',
    name: 'David Miller',
    country: 'United Kingdom',
    institute: 'SOAS University of London',
    xp: 5420,
    streak: 25,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    speakingScore: 94,
    writingScore: 92,
    track: 'foreign-to-indian',
    nativeLang: 'English (UK)',
    targetLang: 'Hindi (Devanagari)',
    badges: ['🥈 #2 Global', '🌍 Global Scholar', '✍️ Devanagari Master'],
    region: 'Overseas Global'
  },
  {
    rank: 3,
    id: 'lb_3',
    name: 'Rajesh Venkat',
    country: 'Telangana, India',
    institute: 'IIT Hyderabad Language Hub',
    xp: 4950,
    streak: 21,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    speakingScore: 95,
    writingScore: 91,
    track: 'indian-to-hindi',
    nativeLang: 'Telugu (తెలుగు)',
    targetLang: 'Hindi (हिंदी)',
    badges: ['🥉 #3 Global', '⚡ Fast Learner'],
    region: 'South Region'
  },
  {
    rank: 4,
    id: 'lb_4',
    name: 'Aarav Sharma (You)',
    country: 'Delhi NCR, India',
    institute: 'Delhi Public School, R.K. Puram',
    xp: 4820,
    streak: 18,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    speakingScore: 94,
    writingScore: 92,
    track: 'indian-to-hindi',
    nativeLang: 'Hindi / English',
    targetLang: 'Advanced Devanagari',
    badges: ['⭐ Top 5 Master', '🔥 18-Day Streak', '📜 Certified'],
    region: 'North Region'
  },
  {
    rank: 5,
    id: 'lb_5',
    name: 'Sophie Laurent',
    country: 'France',
    institute: 'INALCO Paris',
    xp: 4310,
    streak: 19,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    speakingScore: 91,
    writingScore: 89,
    track: 'foreign-to-indian',
    nativeLang: 'French (Français)',
    targetLang: 'Hindi & Tamil',
    badges: ['🌍 European Star', '🎧 Acoustic Ace'],
    region: 'Overseas Global'
  },
  {
    rank: 6,
    id: 'lb_6',
    name: 'Siddharth Roy',
    country: 'West Bengal, India',
    institute: 'Jadavpur University Kolkata',
    xp: 4100,
    streak: 14,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    speakingScore: 92,
    writingScore: 90,
    track: 'indian-to-hindi',
    nativeLang: 'Bengali (বাংলা)',
    targetLang: 'Hindi (हिंदी)',
    badges: ['🏛️ Rajbhasha Star'],
    region: 'East & North-East'
  },
  {
    rank: 7,
    id: 'lb_7',
    name: 'Kenji Sato',
    country: 'Japan',
    institute: 'Tokyo University of Foreign Studies',
    xp: 3890,
    streak: 16,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    speakingScore: 89,
    writingScore: 94,
    track: 'foreign-to-indian',
    nativeLang: 'Japanese (日本語)',
    targetLang: 'Devanagari Script',
    badges: ['✍️ Precision Writer'],
    region: 'Overseas Global'
  },
  {
    rank: 8,
    id: 'lb_8',
    name: 'Pooja Deshmukh',
    country: 'Maharashtra, India',
    institute: 'Mumbai University Fort Campus',
    xp: 3650,
    streak: 12,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    speakingScore: 90,
    writingScore: 88,
    track: 'indian-to-hindi',
    nativeLang: 'Marathi (मराठी)',
    targetLang: 'Hindi (हिंदी)',
    badges: ['📚 Essay Champion'],
    region: 'West Region'
  }
];

export default function DashboardLeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');
  const [trackFilter, setTrackFilter] = useState<'all' | 'indian-to-hindi' | 'foreign-to-indian' | 'rajbhasha-officer'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<EnhancedLeaderboardUser | null>(null);

  // Filtered leaderboard
  const filteredUsers = ENHANCED_LEADERBOARD.filter((usr) => {
    const matchesTrack = trackFilter === 'all' || usr.track === trackFilter;
    const matchesSearch =
      usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.institute.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const top1 = filteredUsers.find((u) => u.rank === 1) || filteredUsers[0];
  const top2 = filteredUsers.find((u) => u.rank === 2) || filteredUsers[1];
  const top3 = filteredUsers.find((u) => u.rank === 3) || filteredUsers[2];
  const listUsers = filteredUsers.filter((u) => u.rank > 3 || !top1 || !top2 || !top3);

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> GLOBAL LEARNER RANKINGS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              International Multi-Language Learner Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl">
              Rankings updated live based on Lesson XP, AI Speech & Writing Scores, and Competition Standings for <strong>All Indian Languages to Hindi</strong> and <strong>All Foreign Languages to Indian Languages</strong>.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 font-extrabold text-xs shrink-0">
            {(['daily', 'weekly', 'monthly', 'alltime'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-2 rounded-xl transition uppercase tracking-wider ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf === 'daily' ? '⚡ Daily' : tf === 'weekly' ? '🔥 Weekly' : tf === 'monthly' ? '🏆 Monthly' : '👑 Legends'}
              </button>
            ))}
          </div>
        </div>

        {/* Track Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: '🌟 All Tracks' },
              { id: 'indian-to-hindi', label: '🇮🇳 Indian → Hindi Track' },
              { id: 'foreign-to-indian', label: '🌍 Foreign → Indian Track' },
              { id: 'rajbhasha-officer', label: '🏛️ Rajbhasha Officer Track' }
            ].map((trk) => (
              <button
                key={trk.id}
                onClick={() => setTrackFilter(trk.id as any)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition ${
                  trackFilter === trk.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {trk.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search learner, institute..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* LOGGED-IN STUDENT CURRENT RANK BANNER CARD */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-indigo-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              alt="Aarav Sharma"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400 shadow-lg"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
              #4
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold text-[10px] uppercase border border-amber-400/30">
                Your Live Rank
              </span>
              <span className="text-xs font-bold text-slate-300">Delhi Public School, R.K. Puram</span>
            </div>
            <h3 className="text-xl font-black text-white">Aarav Sharma</h3>
            <p className="text-xs text-blue-200 font-medium">
              4,820 Total XP • 18 Day Streak 🔥 • AI Speech Score 94% • Writing Score 92%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-0.5">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">To Top 3 Podium</span>
            <span className="text-sm font-black text-amber-300 block">130 XP Needed</span>
          </div>
          <button
            onClick={() => alert('Start daily practice quiz to earn +150 XP!')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-slate-950" /> Earn +150 XP Now
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM STAGE (GOLD, SILVER, BRONZE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {/* SILVER #2 PODIUM CARD */}
        {top2 && (
          <div
            onClick={() => setSelectedUser(top2)}
            className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative order-2 md:order-1 text-center"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-black text-xs flex items-center gap-1 border border-slate-300 shadow-xs">
              <Medal className="w-4 h-4 text-slate-500" /> #2 SILVER PODIUM
            </div>

            <div className="pt-2 space-y-2">
              <img
                src={top2.avatar}
                alt={top2.name}
                className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-slate-300 shadow-md"
              />
              <h3 className="font-extrabold text-base text-slate-900">{top2.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{top2.institute}</p>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold inline-block">
                {top2.country}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex justify-around font-bold">
              <div>
                <span className="text-slate-400 text-[10px] block">Streak</span>
                <span className="text-slate-800 font-black">{top2.streak} Days 🔥</span>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <span className="text-slate-400 text-[10px] block">Total Score</span>
                <span className="text-blue-600 font-black">{top2.xp} XP</span>
              </div>
            </div>
          </div>
        )}

        {/* GOLD #1 PODIUM CARD */}
        {top1 && (
          <div
            onClick={() => setSelectedUser(top1)}
            className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-400 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative order-1 md:order-2 text-center ring-4 ring-amber-400/20 md:-translate-y-3"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md">
              <Crown className="w-4 h-4 text-slate-950 fill-slate-950" /> #1 GOLD CHAMPION
            </div>

            <div className="pt-2 space-y-2">
              <div className="relative inline-block">
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-amber-400 shadow-xl"
                />
                <Crown className="w-6 h-6 text-amber-500 fill-amber-400 absolute -top-3 -right-1 drop-shadow-md" />
              </div>
              <h3 className="font-black text-lg text-slate-900">{top1.name}</h3>
              <p className="text-xs text-amber-900 font-bold">{top1.institute}</p>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black inline-block">
                📍 {top1.country}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs text-xs flex justify-around font-bold">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase">Streak</span>
                <span className="text-amber-600 font-black">{top1.streak} Days 🔥</span>
              </div>
              <div className="border-r border-amber-200" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase">Total Score</span>
                <span className="text-blue-700 font-black text-sm">{top1.xp} XP</span>
              </div>
            </div>
          </div>
        )}

        {/* BRONZE #3 PODIUM CARD */}
        {top3 && (
          <div
            onClick={() => setSelectedUser(top3)}
            className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative order-3 text-center"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center gap-1 border border-amber-300 shadow-xs">
              <Medal className="w-4 h-4 text-amber-700" /> #3 BRONZE PODIUM
            </div>

            <div className="pt-2 space-y-2">
              <img
                src={top3.avatar}
                alt={top3.name}
                className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-amber-600/50 shadow-md"
              />
              <h3 className="font-extrabold text-base text-slate-900">{top3.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{top3.institute}</p>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold inline-block">
                {top3.country}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex justify-around font-bold">
              <div>
                <span className="text-slate-400 text-[10px] block">Streak</span>
                <span className="text-slate-800 font-black">{top3.streak} Days 🔥</span>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <span className="text-slate-400 text-[10px] block">Total Score</span>
                <span className="text-blue-600 font-black">{top3.xp} XP</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL RANKINGS DIRECTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-0">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Full Learner Standings ({filteredUsers.length} Students)
          </div>
          <span>Updated Daily at midnight UTC</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredUsers.map((usr) => {
            const isMe = usr.id === 'lb_4';

            return (
              <div
                key={usr.id}
                onClick={() => setSelectedUser(usr)}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition text-xs cursor-pointer ${
                  isMe ? 'bg-amber-50/70 hover:bg-amber-100/80 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                {/* Left info */}
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      usr.rank === 1
                        ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300'
                        : usr.rank === 2
                        ? 'bg-slate-200 text-slate-800 font-bold'
                        : usr.rank === 3
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'bg-slate-100 text-slate-600 font-bold'
                    }`}
                  >
                    #{usr.rank}
                  </span>

                  <img src={usr.avatar} alt="" className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-500 shrink-0" />

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">{usr.name}</h4>
                      {isMe && (
                        <span className="px-2 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px] uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {usr.nativeLang} → {usr.targetLang}
                    </p>
                  </div>
                </div>

                {/* Middle Stats */}
                <div className="flex items-center gap-6 text-slate-600">
                  <div className="hidden md:block text-right">
                    <span className="font-bold text-slate-800 block text-xs">{usr.institute}</span>
                    <span className="text-[11px] text-slate-500 font-medium block">{usr.country}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-400" /> {usr.streak}d
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 font-bold text-[11px]">
                      Speech {usr.speakingScore}%
                    </span>
                  </div>
                </div>

                {/* Right XP */}
                <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                  <span className="font-black text-blue-700 text-base font-mono">{usr.xp.toLocaleString()} XP</span>
                  <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-[11px] text-slate-700 transition">
                    Inspect Stats →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STUDENT DETAILED PROFILE MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-xs uppercase">
                  Rank #{selectedUser.rank}
                </span>
                <span className="text-xs font-bold text-slate-500">{selectedUser.region}</span>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">{selectedUser.name}</h3>
                <p className="text-xs text-blue-700 font-bold">{selectedUser.institute}</p>
                <p className="text-xs text-slate-500 font-medium">📍 {selectedUser.country}</p>
              </div>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Total XP</span>
                <span className="text-lg font-black text-blue-800 block">{selectedUser.xp}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Streak</span>
                <span className="text-lg font-black text-amber-700 block">{selectedUser.streak} Days</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Speech</span>
                <span className="text-lg font-black text-emerald-800 block">{selectedUser.speakingScore}%</span>
              </div>
            </div>

            {/* Badges showcase */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-slate-700 tracking-wider block">
                EARNED HONORS & BADGES:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedUser.badges.map((b, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                Close Profile Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
