'use client';

import React, { useState } from 'react';
import { Building2, MapPin, Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function PhysicalClassPage() {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('Delhi');
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [registered, setRegistered] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Regional <span className="gradient-text-saffron">Physical Classroom Registration</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Hierarchy Search: Country → State → City → Institute Center. Register for in-person Hindi classroom batches.
        </p>
      </div>

      {/* Cascading Filter Controls */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">1. Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
          >
            <option value="India">India 🇮🇳</option>
            <option value="USA">United States 🇺🇸</option>
            <option value="Japan">Japan 🇯🇵</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">2. State / Region</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
          >
            <option value="Delhi">Delhi NCT</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">3. City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
          >
            <option value="New Delhi">New Delhi</option>
            <option value="Varanasi">Varanasi</option>
            <option value="Agra">Agra</option>
          </select>
        </div>
      </div>

      {/* Available Physical Centers Roster */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-hindi-saffron" /> Available accredited centers in {selectedCity}, {selectedState}
        </h3>

        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={inst.logo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-base font-bold text-white">{inst.nameHindi}</h4>
                  <span className="text-xs text-hindi-saffron">{inst.accreditation}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                Center Open
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {inst.availableCenters.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{c.area} Center</h5>
                    <span className="text-[11px] text-slate-400">Seats remaining: {c.seatsLeft}</span>
                  </div>
                  <button
                    onClick={() => setRegistered(true)}
                    className="px-4 py-2 rounded-lg bg-hindi-saffron text-slate-950 font-bold text-xs hover:bg-amber-600 transition"
                  >
                    Register Offline
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {registered && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Physical Classroom Registration Confirmed! A confirmation voucher has been sent to your email.
          </div>
        )}
      </div>
    </div>
  );
}
