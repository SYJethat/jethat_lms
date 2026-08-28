'use client';

import React from 'react';
import { Award, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { MOCK_CERTIFICATES } from '@/lib/mockData';

export default function DashboardCertificatesPage() {
  const cert = MOCK_CERTIFICATES[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Verifiable Credentials
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">My Accredited Certificates</h1>
        <p className="text-xs text-slate-500 font-medium">Digital certificates with QR verification code and Ministry of Education accreditation.</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border-2 border-blue-200 space-y-6 shadow-md text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full pointer-events-none" />

        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            हि
          </div>
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block">
            केंद्रीय हिंदी संस्थान • KENDRIYA HINDI SANSTHAN
          </span>
          <h2 className="text-2xl font-black text-slate-900">Certificate of Hindi Language Competency</h2>
        </div>

        <div className="py-4 space-y-2 text-xs text-slate-700">
          <p>This is to certify that</p>
          <h3 className="text-xl font-extrabold text-blue-600">{cert.studentName}</h3>
          <p>has successfully completed the accredited curriculum for</p>
          <h4 className="text-base font-bold text-slate-900">{cert.courseTitle}</h4>
          <p className="text-slate-500">Issued on {cert.issueDate} • Certificate ID: <span className="font-bold text-slate-900">{cert.certificateId}</span></p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-slate-100">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Download PDF Certificate
          </button>
          <a
            href={`/certificates/verify/${cert.certificateId}`}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Public Verification Link
          </a>
        </div>
      </div>
    </div>
  );
}
