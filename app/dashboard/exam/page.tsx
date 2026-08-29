'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  Video,
  Headphones,
  FileEdit,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  X,
  Play,
  RotateCcw,
  Check
} from 'lucide-react';

export interface ExamModule {
  id: string;
  titleHindi: string;
  titleEng: string;
  courseCategory: '22 Indian Languages' | 'Foreign to Indian' | 'NIOS Academic';
  durationMins: number;
  passMarkPct: number;
  totalQuestions: number;
  status: 'Ready to Take' | 'Passed ✓' | 'Pending Video Completion';
  questions: {
    id: number;
    question: string;
    options: string[];
    answerIdx: number;
  }[];
}

export const ALL_EXAMS: ExamModule[] = [
  {
    id: 'exam_1',
    titleHindi: 'हिंदी संघ राजभाषा एवं सर्वनाम व्याकरणीय परीक्षा',
    titleEng: 'Level 4 Intermediate Hindi & SOV Grammar Final Assessment',
    courseCategory: '22 Indian Languages',
    durationMins: 20,
    passMarkPct: 80,
    totalQuestions: 4,
    status: 'Ready to Take',
    questions: [
      {
        id: 1,
        question: 'भारतीय संविधान के किस अनुच्छेद के तहत हिंदी संघ की राजभाषा घोषित की गई है?',
        options: ['अनुच्छेद ३४३ (Article 343)', 'अनुच्छेद ३५१ (Article 351)', 'अनुच्छेद ३७० (Article 370)', 'अनुच्छेद २४३ (Article 243)'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'हिंदी वाक्य संरचना का सही क्रम कौन सा है?',
        options: ['कर्ता - कर्म - क्रिया (Subject - Object - Verb)', 'कर्ता - क्रिया - कर्म (Subject - Verb - Object)', 'क्रिया - कर्ता - कर्म', 'कर्म - क्रिया - कर्ता'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'निम्न में से कौन सा शब्द गुणवाचक विशेषण का उदाहरण है?',
        options: ['सुंदर', 'पांच', 'कुछ', 'वह'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'मुंशी प्रेमचंद का प्रसिद्ध उपन्यास "गोदान" किस वर्ष प्रकाशित हुआ था?',
        options: ['१९३६ (1936)', '१९२० (1920)', '१९५० (1950)', '१९४२ (1942)'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_2',
    titleHindi: 'तमिल माध्यम से हिंदी द्विभाषी एवं ध्वन्यात्मक परीक्षा',
    titleEng: 'Tamil-to-Hindi Dravidian Phonetics & Translation Assessment',
    courseCategory: '22 Indian Languages',
    durationMins: 25,
    passMarkPct: 75,
    totalQuestions: 3,
    status: 'Ready to Take',
    questions: [
      {
        id: 1,
        question: 'तमिल शब्द "வணக்கம்" (Vanakkam) का हिंदी में सटीक अनुवाद क्या है?',
        options: ['नमस्ते / प्रणाम', 'धन्यवाद', 'शुभरात्रि', 'स्वागत है'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'हिंदी और तमिल दोनों भाषाओं में समान रूप से प्रयुक्त तत्सम शब्द कौन सा है?',
        options: ['पुस्तक (Pustak)', 'गाड़ी', 'रोटी', 'पानी'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'देवनागरी लिपि का विकास किस प्राचीन लिपि से हुआ है?',
        options: ['ब्राह्मी लिपि (Brahmi Script)', 'खरोष्ठी लिपि', 'शारदा लिपि', 'ग्रंथ लिपि'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_3',
    titleHindi: 'अंतर्राष्ट्रीय डिप्लोमा: हिंदी साहित्य व अनुवाद मूल्यांकन',
    titleEng: 'International Diploma Hindi Literature & Translation Exam',
    courseCategory: 'Foreign to Indian',
    durationMins: 30,
    passMarkPct: 85,
    totalQuestions: 3,
    status: 'Ready to Take',
    questions: [
      {
        id: 1,
        question: 'Which international organization accredited the Diploma in Hindi Studies?',
        options: ['ICCR & Ministry of External Affairs (MEA)', 'UNESCO', 'UNICEF', 'WHO'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'What is the Devanagari equivalent for "Welcome to India"?',
        options: ['भारत में आपका स्वागत है', 'भारत बहुत सुंदर है', 'धन्यवाद भारत', 'नमस्ते भारत'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'Which scholar established Kendriya Hindi Sansthan in Agra (1960)?',
        options: ['Ministry of Education, Govt. of India', 'Dr. Rajendra Prasad', 'Rabindranath Tagore', 'Mahatma Gandhi'],
        answerIdx: 0
      }
    ]
  }
];

export default function DashboardExamPage() {
  const [activeExam, setActiveExam] = useState<ExamModule | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [earnedScore, setEarnedScore] = useState<number | null>(null);
  const [passedExams, setPassedExams] = useState<string[]>([]);

  useEffect(() => {
    if (!activeExam || examSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam, examSubmitted, timeLeft]);

  const startExamModal = (exam: ExamModule) => {
    setActiveExam(exam);
    setTimeLeft(exam.durationMins * 60);
    setUserAnswers({});
    setExamSubmitted(false);
    setEarnedScore(null);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAutoSubmit = () => {
    if (!activeExam) return;
    let correctCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIdx) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / activeExam.questions.length) * 100);
    setEarnedScore(scorePct);
    setExamSubmitted(true);

    if (scorePct >= activeExam.passMarkPct) {
      setPassedExams((prev) => [...prev, activeExam.id]);
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. STUDENT LEARNING FLOW PROGRESS HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200">
            OFFICIAL ASSESSMENT & CERTIFICATION ENGINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            मूल्यांकन एवं परीक्षा केंद्र (Assessments & Examination Portal)
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Complete all 4 steps of your enrolled course to unlock your Ministry of Education accredited certificate & diploma.
          </p>
        </div>

        {/* 4-Step Course Completion Flow Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-black text-emerald-800">
              <span>STEP 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-emerald-600" /> Video Lectures
            </h4>
            <span className="text-[10px] text-emerald-700 font-bold block">100% Completed ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-black text-emerald-800">
              <span>STEP 2</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-emerald-600" /> Audio & Reading
            </h4>
            <span className="text-[10px] text-emerald-700 font-bold block">100% Completed ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 border border-amber-500 shadow-md space-y-1">
            <div className="flex items-center justify-between text-xs font-black">
              <span>STEP 3</span>
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            </div>
            <h4 className="text-xs font-black flex items-center gap-1.5">
              <FileEdit className="w-4 h-4" /> Final Assessment
            </h4>
            <span className="text-[10px] font-bold block">ACTIVE NOW 🔥</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 opacity-70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>STEP 4</span>
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Issue Certificate
            </h4>
            <span className="text-[10px] text-slate-400 font-bold block">Unlocks on Pass</span>
          </div>
        </div>
      </div>

      {/* 2. AVAILABLE EXAMS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" /> Available Assessments ({ALL_EXAMS.length})
          </h3>
          <span className="text-xs text-slate-500 font-semibold">Select any exam to start test simulator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALL_EXAMS.map((exam) => {
            const isPassed = passedExams.includes(exam.id);

            return (
              <div
                key={exam.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase">
                      {exam.courseCategory}
                    </span>
                    {isPassed ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        Passed ✓
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                        Ready
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-base text-slate-900 leading-tight">{exam.titleHindi}</h4>
                    <p className="text-xs text-slate-500 font-medium">{exam.titleEng}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>{exam.durationMins} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Pass: {exam.passMarkPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {isPassed ? (
                    <Link
                      href="/dashboard/student?tab=certificates"
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
                    >
                      📜 Claim Verified Certificate →
                    </Link>
                  ) : (
                    <button
                      onClick={() => startExamModal(exam)}
                      className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" /> Start Examination
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE EXAMINATION SIMULATOR MODAL */}
      {activeExam && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[92vh] overflow-y-auto">
            {/* Modal Top Exam Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                    <ShieldCheck className="w-3 h-3 inline mr-1" /> ANTI-CHEATING SECURE ENVIRONMENT
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">{activeExam.titleHindi}</h3>
              </div>

              {!examSubmitted && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 font-black text-base shadow-sm shrink-0">
                  <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              )}
            </div>

            {/* Exam Results View */}
            {examSubmitted ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                {earnedScore !== null && earnedScore >= activeExam.passMarkPct ? (
                  <div className="space-y-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <Award className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                        EXAMINATION PASSED WITH DISTINCTION
                      </span>
                      <h2 className="text-3xl font-black text-slate-900">
                        Score: {earnedScore}% ({earnedScore >= 90 ? 'Grade A+' : 'Grade A'})
                      </h2>
                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                        Congratulations! You have completed all 4 steps of your enrolled course. Your Accredited Certificate is now unlocked and ready to download!
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs max-w-md mx-auto space-y-2 text-indigo-950 font-bold">
                      <div className="flex justify-between">
                        <span>Pass Requirement:</span>
                        <span>{activeExam.passMarkPct}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Final Score:</span>
                        <span className="text-emerald-700 font-black">{earnedScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Official Certificate Status:</span>
                        <span className="text-emerald-600">UNLOCKED ✓</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <Link
                        href="/dashboard/student?tab=certificates"
                        onClick={() => setActiveExam(null)}
                        className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition"
                      >
                        📜 Claim & View Verified Certificate →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
                        PASS MARK NOT REACHED
                      </span>
                      <h2 className="text-2xl font-black text-slate-900">
                        Score: {earnedScore}% (Required: {activeExam.passMarkPct}%)
                      </h2>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        Don&apos;t worry! You can review your lessons and retake the examination anytime.
                      </p>
                    </div>

                    <button
                      onClick={() => startExamModal(activeExam)}
                      className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-1" /> Retake Exam
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Questions Simulator List */
              <div className="space-y-6">
                {activeExam.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-xs font-black shrink-0">
                        Q{qIdx + 1}
                      </span>
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[qIdx] === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-left font-bold text-xs border transition ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                  <button
                    onClick={() => setActiveExam(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel & Exit Exam
                  </button>

                  <button
                    onClick={handleAutoSubmit}
                    className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    Submit Examination Paper →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
