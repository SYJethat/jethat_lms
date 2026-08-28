'use client';

import React from 'react';
import { Video, Calendar, Clock, UserCheck } from 'lucide-react';

export default function DashboardLiveClassesPage() {
  const classes = [
    { title: 'उच्च स्तरीय देवनागरी पत्राचार (Live Lecture)', teacher: 'Prof. Ramesh Sharma', time: 'Today, 4:00 PM IST', status: 'Upcoming' },
    { title: 'हिंदी व्याकरण काल एवं भेद (Interactive Class)', teacher: 'Dr. Devendra Sharma', time: 'Tomorrow, 11:00 AM IST', status: 'Scheduled' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Live Interactive Classrooms
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Live Online Classroom Schedule</h1>
        <p className="text-xs text-slate-500 font-medium">Join real-time video sessions with certified Hindi professors from top Indian universities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((c, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                {c.status}
              </span>
              <Video className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-500">{c.teacher}</p>
              <p className="text-xs text-blue-600 font-bold mt-1">{c.time}</p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center block shadow-sm">
              Join Classroom Studio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
