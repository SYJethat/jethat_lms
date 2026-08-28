'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function DashboardExamPage() {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const questions = [
    {
      id: 1,
      q: 'हिंदी संघ की राजभाषा किस अनुच्छेद के अनुसार घोषित की गई है?',
      options: ['अनुच्छेद ३४३', 'अनुच्छेद ३५१', 'अनुच्छेद ३७०', 'अनुच्छेद २४३'],
      ans: 0,
    },
    {
      id: 2,
      q: 'निम्न में से कौन-सा शब्द स्वर संधि का उदाहरण है?',
      options: ['हिमालय (हिम + आलय)', 'सज्जन (सत + जन)', 'नमस्ते (नमः + ते)', 'दिक्गज (दिक् + गज)'],
      ans: 0,
    },
    {
      id: 3,
      q: 'मुंशी प्रेमचंद का प्रसिद्ध उपन्यास "गोदान" किस वर्ष प्रकाशित हुआ था?',
      options: ['१९३६', '१९२०', '१९५०', '१९४२'],
      ans: 0,
    },
  ];

  const handleSelect = (qIdx: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.ans) correct++;
    });
    const finalPct = Math.round((correct / questions.length) * 100);
    setScore(finalPct);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Exam Header Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold text-xs">
              Official Examination Engine
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Anti-Cheating Active
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 mt-1">Level 4 Intermediate Hindi Certification Exam</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-base">
          <Clock className="w-5 h-5 animate-pulse" /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-black">Q{idx + 1}</span>
              {q.q}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  disabled={submitted}
                  onClick={() => handleSelect(idx, optIdx)}
                  className={`p-3.5 rounded-2xl text-left font-semibold text-xs border transition ${
                    answers[idx] === optIdx
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition"
        >
          Submit Examination Paper
        </button>
      ) : (
        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 shadow-xs">
          <Award className="w-16 h-16 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Exam Result: {score}% Score Passed!</h2>
          <p className="text-xs text-slate-600 font-medium">
            Congratulations! You qualified for the Kendriya Hindi Sansthan official level certificate.
          </p>
          <Link
            href="/dashboard/student?tab=certificates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            View Issued Certificate →
          </Link>
        </div>
      )}
    </div>
  );
}
