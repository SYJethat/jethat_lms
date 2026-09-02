'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Building2,
  Award,
  CheckCircle2,
  Globe,
  MapPin,
  Search,
  BookOpen,
  UserCheck,
  CreditCard,
  QrCode,
  ShieldCheck,
  Tag,
  Lock,
  RefreshCw,
  X,
  FileText,
  Clock,
  Printer,
  Download,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface UniversityInstitute {
  id: string;
  nameHindi: string;
  nameEng: string;
  location: string;
  state: string;
  accreditation: string;
  category: 'Central University' | 'National Institute' | 'State University' | 'Deemed University';
  established: number;
  programsOffered: string[];
  bannerGradient: string;
  logoUrl: string;
  description: string;
  annualSeats: number;
  feeStructure: string;
}

const INDIAN_UNIVERSITIES: UniversityInstitute[] = [
  {
    id: 'uni_khs_agra',
    nameHindi: 'केंद्रीय हिंदी संस्थान (Kendriya Hindi Sansthan)',
    nameEng: 'Central Hindi Institute, Agra (MoE, Govt. of India)',
    location: 'Agra',
    state: 'Uttar Pradesh',
    accreditation: 'Ministry of Education (MoE) Apex Autonomous Body',
    category: 'National Institute',
    established: 1960,
    programsOffered: ['Diploma in Hindi Teaching (Shikshan Nishnat)', 'Foreign Scholar Hindi Certificate', 'Advanced Translation Diploma'],
    bannerGradient: 'from-amber-600 to-red-800',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
    description: 'The premier national institute for Hindi language research, foreign scholar exchange, and Devanagari script pedagogy in India.',
    annualSeats: 1200,
    feeStructure: '₹0 (Govt Subsidized) / ₹1,499'
  },
  {
    id: 'uni_jnu_delhi',
    nameHindi: 'जवाहरलाल नेहरू विश्वविद्यालय (JNU)',
    nameEng: 'Jawaharlal Nehru University — Centre of Indian Languages',
    location: 'New Delhi',
    state: 'Delhi NCR',
    accreditation: 'UGC NAAC A++ Central University',
    category: 'Central University',
    established: 1969,
    programsOffered: ['MA in Hindi & Comparative Indian Literature', 'MPhil/PhD in Dravidian & Indo-Aryan Linguistics', 'Certificate in Translation'],
    bannerGradient: 'from-blue-700 to-indigo-900',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=80',
    description: 'Renowned world-class centre for comparative Indian literature, language policy, and multidisciplinary South Asian studies.',
    annualSeats: 850,
    feeStructure: '₹1,200 / Semester'
  },
  {
    id: 'uni_bhu_varanasi',
    nameHindi: 'काशी हिन्दू विश्वविद्यालय (BHU)',
    nameEng: 'Banaras Hindu University — Department of Hindi',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    accreditation: 'UGC NAAC A++ Institution of Eminence',
    category: 'Central University',
    established: 1916,
    programsOffered: ['BA (Hons) Hindi', 'MA Hindi Literature & Prayojanmulak Hindi', 'Diploma in Manuscriptology'],
    bannerGradient: 'from-amber-700 to-orange-900',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
    description: 'Historic seat of learning with over a century of legendary contributions to Hindi poetry, grammar, and Devanagari scholarship.',
    annualSeats: 1500,
    feeStructure: '₹1,980 / Year'
  },
  {
    id: 'uni_ciil_mysore',
    nameHindi: 'भारतीय भाषा संस्थान (CIIL, मैसूर)',
    nameEng: 'Central Institute of Indian Languages, Mysuru',
    location: 'Mysuru',
    state: 'Karnataka',
    accreditation: 'Ministry of Education National Nodal Body',
    category: 'National Institute',
    established: 1969,
    programsOffered: ['Regional Language Centre (RLC) 10-Month Course', 'Bhasha Sangam Inter-language Certificate', 'Corpus Technology Diploma'],
    bannerGradient: 'from-emerald-700 to-teal-900',
    logoUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=150&auto=format&fit=crop&q=80',
    description: 'National center coordinating linguistic harmony across all 22 Scheduled Indian Languages with state-of-the-art language labs.',
    annualSeats: 960,
    feeStructure: '100% Free Fellowship & Stipend'
  },
  {
    id: 'uni_du_delhi',
    nameHindi: 'दिल्ली विश्वविद्यालय (University of Delhi)',
    nameEng: 'University of Delhi — Department of Hindi & Rajbhasha',
    location: 'New Delhi',
    state: 'Delhi NCR',
    accreditation: 'UGC NAAC A+ Central University',
    category: 'Central University',
    established: 1922,
    programsOffered: ['MA Hindi', 'Post Graduate Diploma in Journalism & Hindi Mass Media', 'Advanced Hindi for Foreign Nationals'],
    bannerGradient: 'from-purple-700 to-slate-900',
    logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
    description: 'Premier capital university educating tens of thousands of scholars in modern Hindi journalism, creative writing, and drama.',
    annualSeats: 2200,
    feeStructure: '₹2,400 / Year'
  },
  {
    id: 'uni_visva_bharati',
    nameHindi: 'विश्वभारती विश्वविद्यालय (Visva-Bharati)',
    nameEng: 'Visva-Bharati University, Shantiniketan',
    location: 'Shantiniketan',
    state: 'West Bengal',
    accreditation: 'UGC Central University founded by Rabindranath Tagore',
    category: 'Central University',
    established: 1921,
    programsOffered: ['BA & MA in Hindi (Bhasha Bhavana)', 'Rabindra Sangeet & Hindi Translation', 'Cultural Heritage Diploma'],
    bannerGradient: 'from-red-700 to-amber-900',
    logoUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=150&auto=format&fit=crop&q=80',
    description: 'Founded by Nobel laureate Rabindranath Tagore, fostering deep cultural synthesis between Bengali, Hindi, and Asian heritage.',
    annualSeats: 600,
    feeStructure: '₹1,850 / Year'
  },
  {
    id: 'uni_mumbai',
    nameHindi: 'मुंबई विश्वविद्यालय (University of Mumbai)',
    nameEng: 'University of Mumbai — Department of Hindi',
    location: 'Mumbai',
    state: 'Maharashtra',
    accreditation: 'UGC NAAC A++ University',
    category: 'State University',
    established: 1857,
    programsOffered: ['Diploma in Commercial & Film Script Hindi', 'MA Hindi Literature', 'Certificate in Functional Hindi'],
    bannerGradient: 'from-cyan-700 to-blue-900',
    logoUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=150&auto=format&fit=crop&q=80',
    description: 'Center for Bollywood cinema scriptwriting, commercial Hindi media, and Marathi-Hindi linguistic exchange.',
    annualSeats: 1100,
    feeStructure: '₹3,100 / Year'
  },
  {
    id: 'uni_uoh_hyderabad',
    nameHindi: 'हैदराबाद विश्वविद्यालय (University of Hyderabad)',
    nameEng: 'University of Hyderabad — Department of Hindi',
    location: 'Hyderabad',
    state: 'Telangana',
    accreditation: 'UGC Institution of Eminence',
    category: 'Central University',
    established: 1974,
    programsOffered: ['MA Hindi', 'Post Graduate Diploma in Translation (Hindi-Telugu)', 'Comparative South Indian Studies'],
    bannerGradient: 'from-emerald-800 to-indigo-950',
    logoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    description: 'Top-ranked central university specializing in computational linguistics, machine translation, and Hindi-Telugu bilingualism.',
    annualSeats: 500,
    feeStructure: '₹2,100 / Year'
  }
];

interface UniversityRegistration {
  regNumber: string;
  universityId: string;
  universityName: string;
  program: string;
  studentName: string;
  status: 'Seat Confirmed ✓' | 'Application Approved' | 'Pending Fee Payment';
  paymentInvoice: string;
  amount: string;
  date: string;
}

export default function DashboardInstitutesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  
  // Registration Modal States
  const [registeringUni, setRegisteringUni] = useState<UniversityInstitute | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<UniversityRegistration | null>(null);

  // My Confirmed University Registrations List
  const [myRegistrations, setMyRegistrations] = useState<UniversityRegistration[]>([
    {
      regNumber: 'REG-UNI-2026-894120',
      universityId: 'uni_khs_agra',
      universityName: 'Kendriya Hindi Sansthan (Central Hindi Institute), Agra',
      program: 'Diploma in Hindi Teaching & Foreign Scholar Exchange',
      studentName: 'Aarav Sharma',
      status: 'Seat Confirmed ✓',
      paymentInvoice: 'INV-UNI-2026-981240',
      amount: '₹0 (100% Free Govt Subsidy)',
      date: '2026-08-25'
    }
  ]);

  const handleRegisterSubmit = () => {
    if (!registeringUni || !selectedProgram) return;
    setIsProcessing(true);

    setTimeout(() => {
      const regNum = 'REG-UNI-2026-' + Math.floor(100000 + Math.random() * 900000);
      const invNum = 'INV-UNI-2026-' + Math.floor(100000 + Math.random() * 900000);
      
      const newReg: UniversityRegistration = {
        regNumber: regNum,
        universityId: registeringUni.id,
        universityName: registeringUni.nameEng,
        program: selectedProgram,
        studentName: studentName,
        status: 'Seat Confirmed ✓',
        paymentInvoice: invNum,
        amount: registeringUni.feeStructure,
        date: new Date().toISOString().split('T')[0]
      };

      setMyRegistrations((prev) => [newReg, ...prev]);
      setCompletedRegistration(newReg);
      setIsProcessing(false);

      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }, 1500);
  };

  const filteredUniversities = INDIAN_UNIVERSITIES.filter((uni) => {
    const matchesState = selectedState === 'All' || uni.state === selectedState;
    const matchesSearch =
      uni.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.nameEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 shadow-xl border border-indigo-800/40">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black tracking-widest uppercase border border-indigo-400/30 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> ACCREDITED INDIAN UNIVERSITIES & INSTITUTES DIRECTORY
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              Government Approved Seat Booking
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            भारतीय विश्वविद्यालय एवं संस्थान पोर्टल <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-200 to-emerald-300">
              Official Admission Registration & Seat Allotment Status
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Browse accredited Central Universities, National Institutes, and Hindi Chairs across India. Register online, receive your official Registration Number, track seat status, and pay fees with 100% scholarship vouchers.
          </p>
        </div>
      </div>

      {/* MY CONFIRMED REGISTRATIONS SECTION */}
      {myRegistrations.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">YOUR CONFIRMED SEATS & ADMISSION BADGES</span>
              <h3 className="text-lg font-black text-slate-900">मेरी विश्वविद्यालय पंजीकरण स्थिति (My Registered Admissions)</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              {myRegistrations.length} Active Admission{myRegistrations.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myRegistrations.map((reg) => (
              <div key={reg.regNumber} className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase">
                    {reg.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-900">{reg.regNumber}</span>
                </div>

                <div>
                  <h4 className="font-black text-sm text-slate-900">{reg.universityName}</h4>
                  <p className="text-xs text-indigo-700 font-bold mt-0.5">{reg.program}</p>
                </div>

                <div className="pt-2 border-t border-indigo-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <span>Student: <strong>{reg.studentName}</strong></span>
                  <span>Invoice: <strong className="font-mono text-slate-900">{reg.paymentInvoice}</strong></span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-700 font-bold">{reg.amount}</span>
                  <button
                    onClick={() => alert(`Downloading Official Admission Confirmation Slip for ${reg.regNumber}...`)}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Admission Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & State Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Uttar Pradesh', 'Delhi NCR', 'Karnataka', 'West Bengal', 'Maharashtra', 'Telangana'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs transition ${
                selectedState === st
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search university or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Universities Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUniversities.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className={`p-6 bg-gradient-to-r ${uni.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white font-extrabold text-xs">
                    📍 {uni.location}, {uni.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                    Estd. {uni.established}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{uni.nameHindi}</h3>
                  <p className="text-xs text-white/80 font-medium">{uni.nameEng}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {uni.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 text-xs">
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                    Available Programs & Diplomas:
                  </span>
                  <ul className="space-y-1 font-bold text-slate-800">
                    {uni.programsOffered.map((prog, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-semibold pt-1">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>{uni.annualSeats} Annual Seats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{uni.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
              <span className="text-xs font-black text-emerald-700">{uni.feeStructure}</span>

              <button
                onClick={() => {
                  setRegisteringUni(uni);
                  setSelectedProgram(uni.programsOffered[0]);
                  setCompletedRegistration(null);
                }}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                Register / Book Seat <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ONLINE REGISTRATION MODAL */}
      {registeringUni && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">
                  OFFICIAL UNIVERSITY ADMISSION FORM
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  University Admission Registration
                </h2>
              </div>
              <button
                onClick={() => setRegisteringUni(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {completedRegistration ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    ADMISSION SEAT CONFIRMED & REGISTERED
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Registration Complete!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your official Registration Number is <strong className="font-mono text-indigo-900">{completedRegistration.regNumber}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">University:</span>
                    <span className="font-bold text-slate-900">{completedRegistration.universityName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program:</span>
                    <span className="font-bold text-indigo-700">{completedRegistration.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Invoice:</span>
                    <span className="font-mono font-bold text-slate-900">{completedRegistration.paymentInvoice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-600">{completedRegistration.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => setRegisteringUni(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Done & Close Modal →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-5 rounded-2xl bg-gradient-to-r ${registeringUni.bannerGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                  <span className="px-2 py-0.5 rounded-full bg-black/30 text-white font-extrabold text-xs">
                    📍 {registeringUni.location}, {registeringUni.state}
                  </span>
                  <h3 className="text-lg font-black text-white">{registeringUni.nameHindi}</h3>
                  <p className="text-xs text-white/80">{registeringUni.nameEng}</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-800 block">Student Full Name:</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-800 block">Select Academic Program / Diploma:</label>
                    <select
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {registeringUni.programsOffered.map((prog, i) => (
                        <option key={i} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                    <span className="font-bold text-indigo-900 block">Registration Fee & Scholarship:</span>
                    <p className="text-slate-700">Annual Fee: <strong>{registeringUni.feeStructure}</strong> (100% Free with Govt. Bhasha Subsidy code <code>BHASHA2026</code>)</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRegisterSubmit}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Confirming Admission & Generating Number...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Submit Registration & Generate Number
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
