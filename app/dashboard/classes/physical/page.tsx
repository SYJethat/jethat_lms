'use client';

import React from 'react';
import { MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function DashboardPhysicalClassesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Physical Center Network
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Physical Classroom Locations & Batches</h1>
        <p className="text-xs text-slate-500 font-medium">Find offline accredited physical learning centers in Agra, Delhi, Varanasi, and Jaipur.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <img src={inst.logo} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{inst.nameHindi}</h3>
                <span className="text-xs text-slate-500">{inst.city}, {inst.state}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Offline Campus Locations:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {inst.availableCenters.map((c, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block">{c.city}</span>
                    <span className="text-[11px] text-slate-500">{c.seatsLeft} seats left</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
