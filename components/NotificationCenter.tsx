'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Award, Calendar, BookOpen, Trophy } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'class' | 'cert' | 'comp' | 'assignment';
  read: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Live Class Reminder',
      desc: 'آچارया आरव Shastri class starts in 30 minutes!',
      time: '10m ago',
      type: 'class',
      read: false,
    },
    {
      id: 'n2',
      title: 'Certificate Issued!',
      desc: 'Level 4 Intermediate Hindi Certificate ready to download.',
      time: '2h ago',
      type: 'cert',
      read: false,
    },
    {
      id: 'n3',
      title: 'Global Competition Live',
      desc: 'International Hindi Olympiad 2026 submissions are open.',
      time: '1d ago',
      type: 'comp',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-hindi-saffron rounded-full animate-ping" />
        )}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-hindi-saffron rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-card border border-slate-700/60 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-hindi-saffron" /> Notifications ({unreadCount} new)
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-hindi-saffron hover:underline font-medium"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 flex items-start gap-3 hover:bg-slate-800/40 transition ${
                  !n.read ? 'bg-slate-900/60' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-800 text-hindi-saffron shrink-0">
                  {n.type === 'class' && <Calendar className="w-4 h-4 text-amber-400" />}
                  {n.type === 'cert' && <Award className="w-4 h-4 text-emerald-400" />}
                  {n.type === 'comp' && <Trophy className="w-4 h-4 text-hindi-saffron" />}
                  {n.type === 'assignment' && <BookOpen className="w-4 h-4 text-cyan-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold text-white">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 text-center">
            <span className="text-xs text-slate-400">Centered LMS Notifications Engine</span>
          </div>
        </div>
      )}
    </div>
  );
}
