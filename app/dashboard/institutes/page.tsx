'use client';

import React from 'react';
import { Building2, Award, CheckCircle2, Globe } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function DashboardInstitutesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase">
          Accredited Universities
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Accredited Partner Institutes Directory</h1>
        <p className="text-xs text-slate-500 font-medium">Government-approved universities offering accredited Hindi diplomas, degrees, and certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <img src={inst.logo} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{inst.nameHindi}</h3>
                <span className="text-xs text-slate-500">{inst.nameEng}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{inst.description}</p>

            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 flex justify-between items-center text-xs font-bold text-indigo-900">
              <span>Official Accreditation: {inst.accreditation}</span>
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
