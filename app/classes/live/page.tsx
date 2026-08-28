'use client';

import React, { useState } from 'react';
import { Calendar, Video, Clock, Users, CheckCircle2, ExternalLink } from 'lucide-react';
import { MOCK_LIVE_CLASSES } from '@/lib/mockData';

export default function LiveClassesPage() {
  const [classes, setClasses] = useState(MOCK_LIVE_CLASSES);

  const handleRegister = (id: string) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, registeredStudents: c.registeredStudents + 1 } : c))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Live Interactive <span className="gradient-text-saffron">Hindi Classrooms</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Join scheduled live classes led by accredited Hindi professors and language masters via Zoom, Google Meet, or WebRTC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {classes.map((cls) => (
          <div key={cls.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Scheduled Session
                </span>
                <span className="text-xs text-slate-400 font-semibold">{cls.duration}</span>
              </div>

              <h2 className="text-xl font-bold text-white leading-snug">{cls.title}</h2>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <img src={cls.teacherAvatar} alt="" className="w-11 h-11 rounded-xl object-cover ring-1 ring-hindi-saffron" />
                <div>
                  <span className="text-xs text-slate-400 block">Assigned Teacher</span>
                  <h4 className="text-sm font-bold text-white">{cls.teacherName}</h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-hindi-saffron" /> {cls.date}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> {cls.time}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Enrolled Seats</span>
                <span className="text-white font-bold">{cls.registeredStudents} / {cls.maxSeats} Seats</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRegister(cls.id)}
                  className="flex-1 py-3 rounded-xl bg-hindi-saffron hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
                >
                  Reserve Seat
                </button>
                <a
                  href={cls.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
                  title="Launch Room Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
