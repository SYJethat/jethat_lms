'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Building2,
  CheckCircle2,
  Users,
  Search,
  Calendar,
  Clock,
  QrCode,
  Download,
  X,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail
} from 'lucide-react';

export interface PhysicalCampusCenter {
  id: string;
  nameHindi: string;
  nameEng: string;
  region: 'North Region' | 'South Region' | 'West Region' | 'East & North-East';
  city: string;
  state: string;
  address: string;
  contactFaculty: string;
  phone: string;
  availableBatches: string[];
  totalSeats: number;
  seatsLeft: number;
  bannerGradient: string;
}

export const REGION_PHYSICAL_CENTERS: PhysicalCampusCenter[] = [
  {
    id: 'pc_1',
    nameHindi: 'केंद्रीय हिंदी संस्थान मुख्य परिसर, आगरा',
    nameEng: 'Kendriya Hindi Sansthan Main Campus, Agra',
    region: 'North Region',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Hindi Sansthan Road, Agra - 282005, Uttar Pradesh',
    contactFaculty: 'Dr. Devendra Sharma',
    phone: '+91 562 2530116',
    availableBatches: ['Morning Batch: 09:00 AM - 12:00 PM', 'Evening Batch: 16:00 PM - 19:00 PM', 'Weekend Special: Sat-Sun 10:00 AM'],
    totalSeats: 200,
    seatsLeft: 42,
    bannerGradient: 'from-red-700 to-amber-900'
  },
  {
    id: 'pc_2',
    nameHindi: 'दिल्ली विश्वविद्यालय दक्षिण परिसर अध्ययन केंद्र',
    nameEng: 'University of Delhi South Campus Center, New Delhi',
    region: 'North Region',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Benito Juarez Marg, Dhaula Kuan, New Delhi - 110021',
    contactFaculty: 'Prof. Ramesh Kumar',
    phone: '+91 11 24111955',
    availableBatches: ['Regular Batch: Mon-Fri 10:00 AM', 'Weekend Professionals: Sat-Sun 11:00 AM'],
    totalSeats: 150,
    seatsLeft: 18,
    bannerGradient: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'pc_3',
    nameHindi: 'काशी हिन्दू विश्वविद्यालय हिंदी अध्ययन केंद्र, वाराणसी',
    nameEng: 'Banaras Hindu University (BHU) Language Center, Varanasi',
    region: 'North Region',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'BHU Main Campus, Lanka, Varanasi - 221005, Uttar Pradesh',
    contactFaculty: 'Prof. Anand Vardhan',
    phone: '+91 542 2368551',
    availableBatches: ['Morning Batch: 08:30 AM - 11:30 AM', 'Evening Batch: 17:00 PM - 20:00 PM'],
    totalSeats: 180,
    seatsLeft: 25,
    bannerGradient: 'from-amber-700 to-orange-900'
  },
  {
    id: 'pc_4',
    nameHindi: 'भारतीय भाषा संस्थान मैसूर मुख्य परिसर',
    nameEng: 'CIIL Mysuru Regional Campus, Karnataka',
    region: 'South Region',
    city: 'Mysuru',
    state: 'Karnataka',
    address: 'Manasagangothri, Hunsur Road, Mysuru - 570006, Karnataka',
    contactFaculty: 'Prof. Ananya Sen',
    phone: '+91 821 2515820',
    availableBatches: ['Full-Time Residential Intensive', 'Evening Professional Batch: 18:00 PM'],
    totalSeats: 120,
    seatsLeft: 30,
    bannerGradient: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'pc_5',
    nameHindi: 'हैदराबाद विश्वविद्यालय भाषा संकाय, हैदराबाद',
    nameEng: 'University of Hyderabad Language Center, Telangana',
    region: 'South Region',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Gachibowli, Hyderabad - 500046, Telangana',
    contactFaculty: 'Dr. K. Seshadri',
    phone: '+91 40 23134000',
    availableBatches: ['Evening Bilingual Batch: 17:30 PM', 'Weekend Batch: Sat-Sun 09:30 AM'],
    totalSeats: 100,
    seatsLeft: 15,
    bannerGradient: 'from-purple-800 to-indigo-950'
  },
  {
    id: 'pc_6',
    nameHindi: 'मुंबई विश्वविद्यालय फोर्ट परिसर अध्ययन केंद्र',
    nameEng: 'University of Mumbai Fort Campus, Maharashtra',
    region: 'West Region',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'MG Road, Fort, Mumbai - 400032, Maharashtra',
    contactFaculty: 'Dr. Vijay Deshmukh',
    phone: '+91 22 22652819',
    availableBatches: ['Executive Evening: 18:00 PM - 21:00 PM', 'Weekend Batch: Sun 10:00 AM'],
    totalSeats: 130,
    seatsLeft: 12,
    bannerGradient: 'from-cyan-700 to-blue-900'
  },
  {
    id: 'pc_7',
    nameHindi: 'विश्वभारती विश्वविद्यालय शांतिनिकेतन परिसर',
    nameEng: 'Visva-Bharati Shantiniketan Center, West Bengal',
    region: 'East & North-East',
    city: 'Shantiniketan',
    state: 'West Bengal',
    address: 'Bhasha Bhavana Campus, Shantiniketan - 731235, West Bengal',
    contactFaculty: 'Prof. Subir Mukherjee',
    phone: '+91 3463 262751',
    availableBatches: ['Morning Cultural Batch: 09:00 AM', 'Weekend Immersion Batch'],
    totalSeats: 110,
    seatsLeft: 20,
    bannerGradient: 'from-red-800 to-rose-950'
  }
];

export interface PhysicalRegistrationPass {
  passId: string;
  centerName: string;
  city: string;
  batchTime: string;
  studentName: string;
  date: string;
  status: 'Seat Confirmed ✓';
}

export default function DashboardPhysicalClassesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Registration Modal States
  const [registeringCenter, setRegisteringCenter] = useState<PhysicalCampusCenter | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [isProcessing, setIsProcessing] = useState(false);
  const [myPass, setMyPass] = useState<PhysicalRegistrationPass | null>(null);

  const [confirmedPasses, setConfirmedPasses] = useState<PhysicalRegistrationPass[]>([
    {
      passId: 'PHYS-PASS-2026-981240',
      centerName: 'Kendriya Hindi Sansthan Main Campus, Agra',
      city: 'Agra, UP',
      batchTime: 'Weekend Special: Sat-Sun 10:00 AM',
      studentName: 'Aarav Sharma',
      date: '2026-08-28',
      status: 'Seat Confirmed ✓'
    }
  ]);

  const handleConfirmSeat = () => {
    if (!registeringCenter || !selectedBatch) return;
    setIsProcessing(true);

    setTimeout(() => {
      const pId = 'PHYS-PASS-2026-' + Math.floor(100000 + Math.random() * 900000);
      const newPass: PhysicalRegistrationPass = {
        passId: pId,
        centerName: registeringCenter.nameEng,
        city: `${registeringCenter.city}, ${registeringCenter.state}`,
        batchTime: selectedBatch,
        studentName: studentName,
        date: new Date().toISOString().split('T')[0],
        status: 'Seat Confirmed ✓'
      };

      setConfirmedPasses((prev) => [newPass, ...prev]);
      setMyPass(newPass);
      setIsProcessing(false);

      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {
        console.log('Confetti');
      }
    }, 1200);
  };

  const filteredCenters = REGION_PHYSICAL_CENTERS.filter((c) => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesSearch =
      c.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
              OFFLINE PHYSICAL CAMPUS NETWORK (REGION-WISE)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              भौतिक कक्षाएं एवं क्षेत्रीय अध्ययन केंद्र (Physical Center Registration)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Register for offline physical classroom batches across North, South, West, and East India with guaranteed seat tokens and campus entry passes.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search campus or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Region Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {['All', 'North Region', 'South Region', 'West Region', 'East & North-East'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
                selectedRegion === reg
                  ? 'bg-blue-600 text-white shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {reg === 'All' ? '🌟 All Regions (7 Campuses)' : `📍 ${reg}`}
            </button>
          ))}
        </div>
      </div>

      {/* CONFIRMED PHYSICAL CLASSROOM PASSES SECTION */}
      {confirmedPasses.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">YOUR CONFIRMED PHYSICAL CLASSROOM PASSES</span>
              <h3 className="text-lg font-black text-slate-900">मेरी भौतिक कक्षा सीट टोकन (My Campus Gate Passes)</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              {confirmedPasses.length} Active Pass{confirmedPasses.length > 1 ? 'es' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {confirmedPasses.map((pass) => (
              <div key={pass.passId} className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase">
                    {pass.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-900">{pass.passId}</span>
                </div>

                <div>
                  <h4 className="font-black text-sm text-slate-900">{pass.centerName}</h4>
                  <p className="text-xs text-blue-800 font-bold mt-0.5">{pass.batchTime}</p>
                </div>

                <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <span>Student: <strong>{pass.studentName}</strong></span>
                  <button
                    onClick={() => alert(`Downloading Campus Gate Pass QR PDF for ${pass.passId}...`)}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Gate Pass PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REGIONAL PHYSICAL CAMPUS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`p-6 bg-gradient-to-r ${center.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white font-black text-xs">
                    📍 {center.region} • {center.city}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                    {center.seatsLeft} Seats Left
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-black text-white">{center.nameHindi}</h3>
                  <p className="text-xs text-white/80 font-medium">{center.nameEng}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </p>
                  <p className="flex items-center gap-1.5 pt-1">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Contact: <strong>{center.contactFaculty}</strong> ({center.phone})</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    AVAILABLE PHYSICAL BATCHES:
                  </span>
                  <ul className="space-y-1 text-slate-800 font-bold">
                    {center.availableBatches.map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
              <span className="text-xs font-black text-slate-700">{center.seatsLeft} of {center.totalSeats} seats open</span>

              <button
                onClick={() => {
                  setRegisteringCenter(center);
                  setSelectedBatch(center.availableBatches[0]);
                  setMyPass(null);
                }}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-1.5"
              >
                Register Campus Seat <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PHYSICAL SEAT REGISTRATION MODAL */}
      {registeringCenter && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                  PHYSICAL CAMPUS SEAT ALLOTMENT FORM
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Campus Seat Registration
                </h2>
              </div>
              <button
                onClick={() => setRegisteringCenter(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {myPass ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    PHYSICAL SEAT CONFIRMED ✓
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Campus Pass Issued!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your official Campus Gate Pass Token is <strong className="font-mono text-indigo-900">{myPass.passId}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus:</span>
                    <span className="font-bold text-slate-900">{myPass.centerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Batch Timing:</span>
                    <span className="font-bold text-indigo-700">{myPass.batchTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pass Token:</span>
                    <span className="font-mono font-bold text-slate-900">{myPass.passId}</span>
                  </div>
                </div>

                <button
                  onClick={() => setRegisteringCenter(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Done & Close Modal →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-5 rounded-2xl bg-gradient-to-r ${registeringCenter.bannerGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                  <span className="px-2 py-0.5 rounded-full bg-black/30 text-white font-extrabold text-xs">
                    📍 {registeringCenter.city}, {registeringCenter.state}
                  </span>
                  <h3 className="text-lg font-black text-white">{registeringCenter.nameHindi}</h3>
                  <p className="text-xs text-white/80">{registeringCenter.nameEng}</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-800 block">Student Full Name:</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-800 block">Select Physical Batch Timing:</label>
                    <select
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {registeringCenter.availableBatches.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-slate-800 space-y-1 font-medium">
                    <span className="font-bold text-blue-950 block">Campus Address:</span>
                    <p>{registeringCenter.address}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmSeat}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Issuing Campus Gate Pass...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Confirm Physical Seat & Issue Pass Token
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
