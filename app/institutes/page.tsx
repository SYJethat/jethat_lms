'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Award, Star, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function InstitutesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Indian Institutes <span className="gradient-text-saffron">& University Directory</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Explore accredited Indian institutes offering certified Hindi language diplomas, degrees, and government examinations.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <img src={inst.logo} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-hindi-saffron shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-white">{inst.nameHindi}</h2>
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-xs">
                      ★ {inst.rating} Rating
                    </span>
                  </div>
                  <h3 className="text-xs text-hindi-saffron font-bold">{inst.nameEng}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {inst.city}, {inst.state} • {inst.accreditation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/classes/physical"
                  className="px-5 py-2.5 rounded-xl bg-hindi-saffron text-slate-950 font-bold text-xs hover:bg-amber-600 transition"
                >
                  Enroll in Institute Course
                </Link>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {inst.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-hindi-saffron" /> Contact: {inst.contactEmail}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> Phone: {inst.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
