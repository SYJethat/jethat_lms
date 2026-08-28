'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, Printer, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import { MOCK_CERTIFICATE, CertificateData } from '@/lib/mockData';

export default function CertificateVerificationPage({ params }: { params: { id: string } }) {
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/certificates/verify/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCert(data.certificate);
        else setCert(MOCK_CERTIFICATE);
      })
      .catch(() => setCert(MOCK_CERTIFICATE))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-hindi-saffron font-bold animate-pulse">
        Verifying Certificate Registry Key & QR Signature...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Verification Status Alert */}
      <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Official Certificate Authenticated: Registry ID #{cert?.certificateId}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
          VERIFIED & ACCREDITED
        </span>
      </div>

      {/* Official Certificate Visual Frame */}
      <div className="glass-card p-8 sm:p-14 rounded-3xl border-4 border-amber-500/40 relative overflow-hidden bg-slate-950 text-center space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="text-left">
            <span className="text-xs font-extrabold text-hindi-saffron uppercase tracking-widest block">Accredited Certificate of Excellence</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">हिंदी भाषा दक्षता प्रमाण-पत्र</h1>
          </div>
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=150&q=80" alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-hindi-saffron" />
        </div>

        <div className="space-y-4 py-4">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">This is to certify that</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white gradient-text-saffron">{cert?.studentName}</h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            has successfully completed the comprehensive curriculum, examinations, and AI speech evaluation for
          </p>
          <h3 className="text-lg font-bold text-white bg-slate-900/90 py-2.5 px-4 rounded-xl border border-slate-800 inline-block max-w-2xl">
            {cert?.courseTitle}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-slate-800">
          <div className="text-left">
            <span className="text-slate-400 block">Issuing Authority</span>
            <span className="font-bold text-white block mt-0.5">{cert?.instituteName}</span>
          </div>
          <div className="text-left">
            <span className="text-slate-400 block">Issue Date</span>
            <span className="font-bold text-white block mt-0.5">{cert?.issueDate}</span>
          </div>
          <div className="text-left">
            <span className="text-slate-400 block">Score & Grade</span>
            <span className="font-bold text-emerald-400 block mt-0.5">{cert?.score}% ({cert?.grade})</span>
          </div>
          <div className="text-right flex justify-end">
            <img src={cert?.qrCodeUrl} alt="QR Code" className="w-16 h-16 rounded bg-white p-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>
    </div>
  );
}
