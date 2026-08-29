'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Calendar,
  Award,
  Zap,
  Flame,
  Users,
  Swords,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  ArrowRight,
  RotateCcw,
  X,
  Play,
  Star,
  Medal
} from 'lucide-react';

export interface CompetitionEvent {
  id: string;
  titleHindi: string;
  titleEng: string;
  category: 'Global Championship' | 'National Olympiad' | 'University Division' | 'Weekly Sprint';
  prizePool: string;
  startDate: string;
  endDate: string;
  registeredCount: number;
  bannerGradient: string;
  icon: string;
  status: 'OPEN FOR ENTRY' | 'LIVE NOW 🔥' | 'SUBMISSIONS OPEN';
  rounds: string[];
}

export const GLOBAL_COMPETITIONS: CompetitionEvent[] = [
  {
    id: 'comp_1',
    titleHindi: 'अंतर्राष्ट्रीय हिंदी ओलंपियाड २०२६ (Global Hindi Olympiad)',
    titleEng: '2026 International Hindi Olympiad & Grammar Battle',
    category: 'Global Championship',
    prizePool: '₹2,50,000 INR + National Gold Medal',
    startDate: '10 Sep 2026',
    endDate: '15 Sep 2026',
    registeredCount: 4850,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-800',
    icon: '🏆',
    status: 'LIVE NOW 🔥',
    rounds: ['Round 1: Rapid Grammar Quiz', 'Round 2: Pronunciation AI Audit', 'Round 3: Grand Finale 1v1 Battle']
  },
  {
    id: 'comp_2',
    titleHindi: 'राष्ट्रीय देवनागरी सुलेख व निबंध प्रतियोगिता',
    titleEng: 'National Devanagari Calligraphy & Essay Contest',
    category: 'National Olympiad',
    prizePool: '₹1,00,000 INR + Certificate of Honor',
    startDate: '01 Sep 2026',
    endDate: '20 Sep 2026',
    registeredCount: 2940,
    bannerGradient: 'from-indigo-800 to-purple-950',
    icon: '✍️',
    status: 'SUBMISSIONS OPEN',
    rounds: ['Handwriting PDF Upload', 'Grammatical Precision', 'Jury Evaluation']
  },
  {
    id: 'comp_3',
    titleHindi: 'अंतर-विश्वविद्यालय हिंदी वाद-विवाद प्रतियोगिता',
    titleEng: 'Inter-University Hindi Debate & Oratory Championship',
    category: 'University Division',
    prizePool: '₹1,50,000 INR + Champion Trophy',
    startDate: '18 Sep 2026',
    endDate: '25 Sep 2026',
    registeredCount: 1620,
    bannerGradient: 'from-blue-700 to-indigo-900',
    icon: '🎙️',
    status: 'OPEN FOR ENTRY',
    rounds: ['Zonal Preliminary Speech', 'Semi-Final Live Stream', 'National Final Debate']
  },
  {
    id: 'comp_4',
    titleHindi: 'साप्ताहिक देवनागरी गति टाइपिंग स्प्रिंट',
    titleEng: 'Weekly Devanagari Script Speed Typing Battle',
    category: 'Weekly Sprint',
    prizePool: '+1,500 Academic XP & Master Typist Badge',
    startDate: 'Every Sunday',
    endDate: 'Ongoing',
    registeredCount: 5200,
    bannerGradient: 'from-emerald-700 to-teal-900',
    icon: '⚡',
    status: 'LIVE NOW 🔥',
    rounds: ['60-Second Typing Sprint', 'Accuracy Check', 'Instant Leaderboard XP']
  }
];

export default function DashboardCompetitionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBattleModal, setActiveBattleModal] = useState<CompetitionEvent | null>(null);

  // 1v1 Quiz Battle Simulator State
  const [battleState, setBattleState] = useState<'matching' | 'playing' | 'victory'>('matching');
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const battleQuestions = [
    {
      q: 'हिंदी शब्द "सूर्य" का पर्यायवाची कौन सा है?',
      options: ['भास्कर (Bhaskar)', 'निशाकर', 'सुधाकर', 'अंबर'],
      ans: 0
    },
    {
      q: 'संज्ञा के कितने मुख्य भेद होते हैं?',
      options: ['५ (5)', '३ (3)', '७ (7)', '२ (2)'],
      ans: 0
    },
    {
      q: 'निम्नलिखित में से कौन सा शब्द शुद्ध वर्तनी वाला है?',
      options: ['उज्ज्वल (Ujjwal)', 'उजवल', 'उज्जवल', 'ऊज्वल'],
      ans: 0
    }
  ];

  const start1v1Battle = (comp: CompetitionEvent) => {
    setActiveBattleModal(comp);
    setBattleState('matching');
    setMyScore(0);
    setOpponentScore(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);

    // Simulate 1.5s matching animation
    setTimeout(() => {
      setBattleState('playing');
    }, 1500);
  };

  const handleAnswerSubmit = (optIdx: number) => {
    setSelectedOption(optIdx);
    const q = battleQuestions[currentQuestionIdx];

    // Check correctness
    let addedMyPoints = 0;
    if (optIdx === q.ans) {
      addedMyPoints = 100;
    }
    // Simulate opponent response (80% chance correct)
    const opponentCorrect = Math.random() > 0.2;
    const addedOpponentPoints = opponentCorrect ? 100 : 0;

    setMyScore((prev) => prev + addedMyPoints);
    setOpponentScore((prev) => prev + addedOpponentPoints);

    setTimeout(() => {
      if (currentQuestionIdx < battleQuestions.length - 1) {
        setCurrentQuestionIdx((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setBattleState('victory');
        try {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        } catch (e) {
          console.log('Confetti');
        }
      }
    }, 1000);
  };

  const filteredCompetitions = GLOBAL_COMPETITIONS.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-amber-500/30">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black tracking-widest uppercase border border-amber-400/40 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> GLOBAL MULTIPLAYER BATTLE ARENA
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              ₹5,00,000 INR Annual Prize Pool
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            अंतर्राष्ट्रीय हिंदी प्रतियोगिता एवं ओलंपियाड <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300">
              Live 1v1 Quiz Battles, Essay Contests & Speed Sprints
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
            Compete against thousands of learners worldwide. Win accredited national gold medals, cash prizes, and boost your global academic leaderboard rank!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300">
              <Users className="w-4 h-4" /> 4,850 Competitors Registered
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
              <Medal className="w-4 h-4" /> 12 National Gold Medals Awarded
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Global Championship', 'National Olympiad', 'University Division', 'Weekly Sprint'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-black text-xs transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? '🏆 All Battles (4)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* COMPETITIONS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompetitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`p-6 bg-gradient-to-r ${comp.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white font-extrabold text-xs flex items-center gap-1.5">
                    {comp.icon} {comp.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white font-black text-[10px] uppercase">
                    {comp.status}
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-black text-white">{comp.titleHindi}</h3>
                  <p className="text-xs text-white/80 font-medium">{comp.titleEng}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-black text-amber-950">
                  <span>🏆 PRIZE POOL:</span>
                  <span className="text-amber-700 text-sm font-black">{comp.prizePool}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{comp.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>{comp.registeredCount} Contenders</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    TOURNAMENT STAGES:
                  </span>
                  <ul className="space-y-1 text-slate-800 font-semibold">
                    {comp.rounds.map((rd, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{rd}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-auto">
              <button
                onClick={() => start1v1Battle(comp)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center block shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
              >
                <Swords className="w-4 h-4 fill-slate-950" /> Enter Live 1v1 Battle Arena →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 1V1 QUIZ BATTLE SIMULATOR MODAL */}
      {activeBattleModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block">
                  LIVE 1V1 MULTIPLAYER BATTLE ARENA
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">{activeBattleModal.titleHindi}</h3>
              </div>
              <button
                onClick={() => setActiveBattleModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MATCHING STATE */}
            {battleState === 'matching' && (
              <div className="py-12 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto animate-spin">
                  <Swords className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">Matching Global Opponent...</h4>
                  <p className="text-xs text-slate-500 font-bold">Connecting with registered scholar from Delhi University...</p>
                </div>
              </div>
            )}

            {/* PLAYING STATE */}
            {battleState === 'playing' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Score Scoreboard Ticker */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 font-black text-sm flex items-center justify-center text-white">
                      YOU
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-200">Aarav Sharma</span>
                      <span className="text-amber-400 font-black block text-sm">{myScore} XP</span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase">
                    VS
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="font-extrabold text-xs text-slate-200">Rohan Verma (DU)</span>
                      <span className="text-amber-400 font-black block text-sm">{opponentScore} XP</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-600 font-black text-sm flex items-center justify-center text-white">
                      OPP
                    </div>
                  </div>
                </div>

                {/* Current Rapid Question Card */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">
                    ROUND {currentQuestionIdx + 1} OF 3 • RAPID FIRE
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {battleQuestions[currentQuestionIdx].q}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {battleQuestions[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerSubmit(optIdx)}
                          className={`p-3.5 rounded-xl text-left font-bold text-xs border transition ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-black shadow-md'
                              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* VICTORY STATE */}
            {battleState === 'victory' && (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                  <Trophy className="w-12 h-12 text-amber-500" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                    🎉 BATTLE VICTORY! CHAMPION RANK UNLOCKED
                  </span>
                  <h3 className="text-3xl font-black text-slate-900">
                    You Won! ({myScore} XP vs {opponentScore} XP)
                  </h3>
                  <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                    Congratulations! Your battle win earned you <strong className="text-indigo-600">+300 Bonus Academic XP</strong> and boosted your global leaderboard ranking!
                  </p>
                </div>

                <button
                  onClick={() => setActiveBattleModal(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Done & Return to Arena →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
