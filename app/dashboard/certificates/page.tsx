'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  CheckCircle2,
  Globe,
  Search,
  BookOpen,
  Sparkles,
  FileText,
  Printer,
  X,
  Share2,
  GraduationCap,
  Bookmark,
  Layers,
  ArrowRight,
  LayoutGrid,
  List,
  Eye
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

interface UserCertificate {
  id: string;
  certificateId: string;
  category: '22 Indian Languages' | 'International Foreign Diplomas' | 'NIOS Academic Boards' | 'AI & Skill Badges';
  courseTitleHindi: string;
  courseTitleEng: string;
  accreditingBody: string;
  studentName: string;
  issueDate: string;
  score: string;
  grade: string;
  badgeGradient: string;
  badgeIcon: string;
  status: 'Verified & Issued ✓';
}

const ALL_MY_CERTIFICATES: UserCertificate[] = [
  {
    id: 'cert_1',
    certificateId: 'HLMS-2026-IND-981240',
    category: '22 Indian Languages',
    courseTitleHindi: 'हिंदी भाषा प्रवीणता प्रमाण पत्र (Hindi Proficiency)',
    courseTitleEng: 'Certificate of Hindi Language Competency',
    accreditingBody: 'केंद्रीय हिंदी संस्थान • Kendriya Hindi Sansthan (MoE, Govt. of India)',
    studentName: 'Aarav Sharma',
    issueDate: '28 Aug 2026',
    score: '96.5%',
    grade: 'Grade A+ Distinction',
    badgeGradient: 'from-amber-600 to-red-800',
    badgeIcon: '🇮🇳',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_2',
    certificateId: 'HLMS-2026-TAM-761209',
    category: '22 Indian Languages',
    courseTitleHindi: 'तमिल माध्यम से हिंदी द्विभाषी डिप्लोमा (Tamil-Hindi Bilingual Diploma)',
    courseTitleEng: 'Diploma in Tamil-to-Hindi Language & Phonetic Bridge',
    accreditingBody: 'भारतीय भाषा संस्थान (CIIL) & Bhasha Sangam',
    studentName: 'Aarav Sharma',
    issueDate: '24 Aug 2026',
    score: '94.0%',
    grade: 'Grade A Distinction',
    badgeGradient: 'from-blue-600 to-indigo-900',
    badgeIcon: '📜',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_3',
    certificateId: 'INT-HLMS-2026-981240',
    category: 'International Foreign Diplomas',
    courseTitleHindi: 'अंतर्राष्ट्रीय डिप्लोमा: हिंदी व भारतीय भाषा अध्ययन',
    courseTitleEng: 'International Diploma in Hindi & Indian Language Studies',
    accreditingBody: 'ICCR & Ministry of External Affairs (MEA) Govt. of India',
    studentName: 'Aarav Sharma',
    issueDate: '20 Aug 2026',
    score: '98.0%',
    grade: 'Summa Cum Laude',
    badgeGradient: 'from-indigo-900 to-purple-950',
    badgeIcon: '🌍',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_4',
    certificateId: 'NIOS-10-2026-441209',
    category: 'NIOS Academic Boards',
    courseTitleHindi: 'राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान — कक्षा 10 प्रमाणपत्र',
    courseTitleEng: 'NIOS Secondary Class 10 Hindi Board Certificate',
    accreditingBody: 'National Institute of Open Schooling (NIOS Board)',
    studentName: 'Aarav Sharma',
    issueDate: '15 Jul 2026',
    score: '92.0%',
    grade: 'First Division',
    badgeGradient: 'from-emerald-700 to-teal-900',
    badgeIcon: '🎓',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_5',
    certificateId: 'NIOS-12-2026-551902',
    category: 'NIOS Academic Boards',
    courseTitleHindi: 'उच्चतर माध्यमिक कक्षा 12 हिंदी साहित्य डिप्लोमा',
    courseTitleEng: 'NIOS Senior Secondary Class 12 Hindi Literature Diploma',
    accreditingBody: 'National Institute of Open Schooling (NIOS Board)',
    studentName: 'Aarav Sharma',
    issueDate: '10 Jun 2026',
    score: '95.5%',
    grade: 'Grade A+ Honors',
    badgeGradient: 'from-rose-700 to-amber-900',
    badgeIcon: '📚',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_6',
    certificateId: 'AI-SPEECH-2026-894102',
    category: 'AI & Skill Badges',
    courseTitleHindi: 'एआई मौखिक उच्चारण व संभाषण प्रमाण पत्र',
    courseTitleEng: 'AI Spoken Audio Phonetics & Fluency Certification',
    accreditingBody: 'AI & Educational Technology Board',
    studentName: 'Aarav Sharma',
    issueDate: '02 Aug 2026',
    score: '97.0%',
    grade: 'Expert Native Accent',
    badgeGradient: 'from-cyan-600 to-blue-900',
    badgeIcon: '🤖',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_7',
    certificateId: 'DEV-TYPE-2026-339108',
    category: 'AI & Skill Badges',
    courseTitleHindi: 'देवनागरी लिपि गति व शुद्धता बैज',
    courseTitleEng: 'Devanagari Script Speed & Accuracy Certification',
    accreditingBody: 'National Devanagari Literacy Board',
    studentName: 'Aarav Sharma',
    issueDate: '18 Jul 2026',
    score: '99.0%',
    grade: 'Master Typist Badge',
    badgeGradient: 'from-purple-600 to-slate-900',
    badgeIcon: '✍️',
    status: 'Verified & Issued ✓'
  },
  {
    id: 'cert_8',
    certificateId: 'HLMS-2026-TEL-661209',
    category: '22 Indian Languages',
    courseTitleHindi: 'तेलुगु माध्यम से हिंदी भाषा प्रवीणता प्रमाण पत्र',
    courseTitleEng: 'Telugu-to-Hindi Honorifics & Grammar Certificate',
    accreditingBody: 'Central Institute of Indian Languages (CIIL)',
    studentName: 'Aarav Sharma',
    issueDate: '05 May 2026',
    score: '93.5%',
    grade: 'Grade A',
    badgeGradient: 'from-amber-600 to-orange-800',
    badgeIcon: '🇮🇳',
    status: 'Verified & Issued ✓'
  }
];

export default function DashboardCertificatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewModalCert, setPreviewModalCert] = useState<UserCertificate | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const filteredCertificates = ALL_MY_CERTIFICATES.filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesSearch =
      cert.courseTitleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.courseTitleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.accreditingBody.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner & Control Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200">
              VERIFIABLE DIGITAL CREDENTIALS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              मेरे मान्यता प्राप्त प्रमाणपत्र (My Verified Certificates & Diplomas)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              View, print, and download your accredited certificates in Grid or List view. Click any card to open full verification document.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <List className="w-4 h-4" /> List
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search certificate or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {['All', '22 Indian Languages', 'International Foreign Diplomas', 'NIOS Academic Boards', 'AI & Skill Badges'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? '🌟 All Certificates (8)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW DISPLAY (GRID VS LIST) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Certificate Catalogue ({filteredCertificates.length})
          </h3>
          <span className="text-xs text-slate-500 font-semibold">Click any item to view full verification slip</span>
        </div>

        {viewMode === 'grid' ? (
          /* GRID VIEW MODE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setPreviewModalCert(cert)}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl group"
              >
                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${cert.badgeGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xl">{cert.badgeIcon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase">
                        {cert.status}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-white line-clamp-2">{cert.courseTitleHindi}</h4>
                  </div>

                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase">
                      {cert.category}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition line-clamp-1">{cert.courseTitleEng}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{cert.accreditingBody}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold">
                  <span className="text-emerald-700">{cert.score} ({cert.grade})</span>
                  <span className="text-indigo-600 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Slip
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW MODE */
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Course / Diploma Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Accreditation Body</th>
                    <th className="p-3.5">Issue Date</th>
                    <th className="p-3.5">Score & Distinction</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {filteredCertificates.map((cert) => (
                    <tr
                      key={cert.id}
                      onClick={() => setPreviewModalCert(cert)}
                      className="hover:bg-indigo-50/50 cursor-pointer transition"
                    >
                      <td className="p-3.5 font-mono font-bold text-indigo-900">{cert.certificateId}</td>
                      <td className="p-3.5 max-w-xs space-y-0.5">
                        <p className="font-extrabold text-slate-900">{cert.courseTitleHindi}</p>
                        <p className="text-[11px] text-slate-500">{cert.courseTitleEng}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {cert.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px] max-w-xs truncate">{cert.accreditingBody}</td>
                      <td className="p-3.5 text-slate-500">{cert.issueDate}</td>
                      <td className="p-3.5 font-extrabold text-emerald-700">{cert.score} ({cert.grade})</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewModalCert(cert);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 ml-auto shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Slip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CERTIFICATE FULL PREVIEW SLIP MODAL */}
      {previewModalCert && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border-8 border-double border-indigo-700 rounded-3xl p-6 sm:p-12 space-y-6 shadow-2xl text-center relative overflow-hidden my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewModalCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-600 flex items-center justify-center mx-auto shadow-md">
                <Award className="w-10 h-10 text-indigo-600" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-800 block">
                {previewModalCert.accreditingBody}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                {previewModalCert.courseTitleHindi}
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {previewModalCert.courseTitleEng}
              </p>
            </div>

            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent mx-auto" />

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              <p className="italic">This official credential is proudly awarded to</p>
              <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 border-b-2 border-slate-200 pb-1 inline-block">
                {user?.name || previewModalCert.studentName}
              </h3>
              <p>
                for successfully completing all module requirements, practical exercises, and final examination for:
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 font-extrabold text-base text-indigo-950">
                &quot;{previewModalCert.courseTitleEng}&quot;
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs text-center max-w-2xl mx-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">FINAL SCORE</span>
                <span className="font-black text-emerald-600 text-base">{previewModalCert.score}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">GRADE / DISTINCTION</span>
                <span className="font-black text-indigo-600 text-base">{previewModalCert.grade}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">CERTIFICATE ID</span>
                <span className="font-mono font-bold text-slate-800 text-xs">{previewModalCert.certificateId}</span>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left border-t border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="font-serif italic font-bold text-slate-900 block">डॉ. देवेन्द्र शर्मा</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Director of Academic Affairs</span>
              </div>

              <div className="text-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hindi-lms.org/certificates/verify/${previewModalCert.certificateId}`}
                  alt="Verified QR Code"
                  className="w-16 h-16 mx-auto rounded-lg border border-slate-300 p-1 bg-white"
                />
                <span className="text-[9px] text-slate-400 block mt-1">Scan for Digital Verification</span>
              </div>

              <div className="space-y-1 text-right">
                <span className="font-serif italic font-bold text-slate-900 block">Prof. Ananya Sen</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Dean of Examinations</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
              >
                🖨️ Print Certificate
              </button>

              <button
                onClick={() => alert(`Downloading PDF Certificate for ${previewModalCert.certificateId}...`)}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
              >
                📥 Download PDF Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
