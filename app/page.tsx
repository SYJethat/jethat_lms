'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  BookOpen,
  Bot,
  Award,
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  ShieldCheck,
  Video,
  Building2,
  Mic,
  FileEdit,
  Headphones,
  CheckCircle2,
  Users,
  Globe,
  LogIn,
  User as UserIcon,
  DollarSign,
  BarChart3,
  Shield,
  MapPin,
  HelpCircle,
  FileText,
  CreditCard,
  GraduationCap,
  Play,
  ChevronRight,
  ChevronLeft,
  Compass,
  Star,
  Download,
  QrCode,
  Check,
  Radio,
  ArrowUpRight,
  Newspaper,
  BellRing,
  ExternalLink,
  Layers,
  Lock
} from 'lucide-react';
import { loginUserByRole, User } from '@/lib/lmsStore';

interface HeroSlide {
  id: number;
  badge: string;
  titleHindi: string;
  titleEng: string;
  subtitle: string;
  bgGradient: string;
  imagePath: string;
  highlightText: string;
  ctaText: string;
  ctaHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: '🇮🇳 NEP 2020 & RAJBHASHA COMPLIANT',
    titleHindi: '२२ अनुसूचित भारतीय भाषाएं व विदेशी भाषा केंद्र',
    titleEng: '22 Scheduled Indian Languages National Portal',
    subtitle: 'Master Hindi seamlessly from Tamil, Telugu, Malayalam, Kannada, Bengali, English, Spanish, French, and 15 International languages.',
    bgGradient: 'from-slate-950/90 via-slate-900/70 to-transparent',
    imagePath: '/hero_lms_1.jpg',
    highlightText: '100% Free Government Subsidized Accredited Diplomas',
    ctaText: '🚀 Start Free Student Console',
    ctaHref: '/dashboard/student'
  },
  {
    id: 2,
    badge: '🤖 1V1 VIRTUAL AI VIDEO TEACHER & WEBCAM',
    titleHindi: 'आचार्य AI वीडियो शिक्षक - प्रत्यक्ष संवाद स्टूडियो',
    titleEng: 'Interactive 1v1 Video Call with Virtual AI Professors',
    subtitle: 'Access your student webcam live, ask questions in Hindi or English, and receive spoken audio explanations with real-time 3D lip-sync video avatars.',
    bgGradient: 'from-slate-950/90 via-slate-900/70 to-transparent',
    imagePath: '/hero_lms_2.jpg',
    highlightText: 'Real-Time Devanagari Pronunciation & Grammar Review',
    ctaText: '📹 Launch AI Video Call Studio',
    ctaHref: '/dashboard/student?tab=chatbot'
  },
  {
    id: 3,
    badge: '📜 CENTRAL UNIVERSITIES & NIOS ACCREDITED DIPLOMAS',
    titleHindi: 'केंद्रीय विश्वविद्यालय प्रमाण पत्र व एनआईओएस डिप्लोमा',
    titleEng: 'University Verified Language Certificates & Diplomas',
    subtitle: 'Earn official accredited diplomas recognized by Kendriya Hindi Sansthan Agra, CIIL Mysuru, BHU Varanasi, and Delhi University with QR verification.',
    bgGradient: 'from-slate-950/90 via-slate-900/70 to-transparent',
    imagePath: '/hero_lms_1.jpg',
    highlightText: 'Instant QR Code Verification & Print Ready PDF Slips',
    ctaText: '📜 View Verified Certificates',
    ctaHref: '/dashboard/student?tab=certificates'
  }
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [activeGuideStep, setActiveGuideStep] = useState(0);

  // Auto slide image carousel every 6 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Auto guide step loop every 5 seconds
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveGuideStep((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(stepTimer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleRoleQuickLogin = (roleId: User['role']) => {
    loginUserByRole(roleId);
    router.push(`/dashboard/${roleId}`);
  };

  const currentSlide = HERO_SLIDES[currentSlideIdx];

  const newsCirculars = [
    {
      id: 'n1',
      date: '28 Aug 2026',
      badge: 'MINISTRY CIRCULAR',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      title: 'NEP 2020 100% Fee Subsidy Approved for All 22 Eighth Schedule Indian Languages',
      desc: 'Ministry of Education grants 100% fee waivers for accredited Hindi and regional language diploma courses using scholarship coupon BHASHA2026.',
      href: '/dashboard/student?tab=account-details'
    },
    {
      id: 'n2',
      date: '25 Aug 2026',
      badge: 'UNIVERSITY ADMISSION',
      badgeColor: 'bg-orange-100 text-orange-800',
      title: 'Kendriya Hindi Sansthan Agra Opens 2026-27 Online Admission Batch',
      desc: 'Admissions open for 1-Year Post-Graduate Diploma in Hindi Teaching & Foreign Scholar Certificate across 8 regional campuses.',
      href: '/dashboard/student?tab=institutes'
    },
    {
      id: 'n3',
      date: '22 Aug 2026',
      badge: 'AI GATEWAY FEATURE',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      title: '1v1 Virtual AI Video Call Teacher Studio Live with Real WebCam Access',
      desc: 'Interactive 1v1 video calls with AI Professors Acharya Devendra & Vidya AI Tutor, accessing real student webcams with native speech lip-sync.',
      href: '/dashboard/student?tab=chatbot'
    },
    {
      id: 'n4',
      date: '18 Aug 2026',
      badge: 'NATIONAL OLYMPIAD',
      badgeColor: 'bg-amber-100 text-amber-800',
      title: '2026 Global Devanagari Script & Grammar Championship Registration Open',
      desc: 'Participate in live 1v1 multiplayer quiz battles and Devanagari speed typing sprints for ₹5,00,000 INR prize pool & Gold Medals.',
      href: '/dashboard/student?tab=competitions'
    },
    {
      id: 'n5',
      date: '15 Aug 2026',
      badge: 'CIIL MYSURU NOTICE',
      badgeColor: 'bg-rose-100 text-rose-800',
      title: 'Dravidian-Hindi Phonetic Bridge Course Launched for Tamil & Telugu Scholars',
      desc: 'Central Institute of Indian Languages releases 10-month bilingual audio courseware for Southern language learners.',
      href: '/dashboard/student?tab=free-audio'
    }
  ];

  const guideSteps = [
    {
      stepNum: '01',
      titleHindi: '१. पाठ्यक्रम का चयन व निःशुल्क छात्रवृत्ति',
      titleEng: '1. Select Language Track & Claim Subsidy',
      desc: 'Choose from 22 Eighth Schedule Indian languages or 15 foreign language tracks. Apply scholarship coupon BHASHA2026 for 100% Govt Subsidy.',
      icon: BookOpen,
      color: 'bg-orange-600 text-white',
      badge: 'STEP 1: ENROLLMENT',
      actionText: '🚀 Explore 22 Languages Track',
      actionHref: '/dashboard/student?tab=indian-languages',
      features: ['Bilingual Tamil, Telugu, Malayalam & Bengali tracks', '100% Free Govt Subsidy Coupon (BHASHA2026)', 'Instant enrollment confirmation token']
    },
    {
      stepNum: '02',
      titleHindi: '२. वीडियो व्याख्यान व ऑडियो पॉडकास्ट देखें',
      titleEng: '2. Watch HD Lectures & Audio Podcasts',
      desc: 'Access 4K video masterclasses covering Devanagari stroke order, SOV grammar rules, native audio podcasts, and NIOS textbook PDFs.',
      icon: Video,
      color: 'bg-cyan-600 text-white',
      badge: 'STEP 2: LEARNING RESOURCES',
      actionText: '🎥 Try Sample Free Lessons',
      actionHref: '/dashboard/student?tab=free-videos',
      features: ['4K HD Devanagari handwriting tutorials', 'Native speaker audio podcasts for offline listening', 'Downloadable NIOS textbook PDF worksheets']
    },
    {
      stepNum: '03',
      titleHindi: '३. AI वीडियो शिक्षक से १v१ प्रत्यक्ष संवाद',
      titleEng: '3. 1v1 AI Video Call & WebCam Practice',
      desc: 'Connect live on 1v1 video calls with AI Professors Acharya Devendra & Vidya AI Tutor. Enable your webcam, ask questions out loud, and receive real-time audio lip-sync feedback.',
      icon: Bot,
      color: 'bg-amber-600 text-white',
      badge: 'STEP 3: AI TUTORING STUDIO',
      actionText: '📹 Call AI Video Teacher Now',
      actionHref: '/dashboard/student?tab=chatbot',
      features: ['Real student webcam video stream integration', 'Live Speech Recognition & native audio playback', '3D lip-sync AI professor avatars']
    },
    {
      stepNum: '04',
      titleHindi: '४. ऑनलाइन परीक्षा उत्तीर्ण करें व डिप्लोमा प्राप्त करें',
      titleEng: '4. Pass Assessment & Claim University Diploma',
      desc: 'Take timed online exams with automated anti-cheating grading. Score 80%+ to unlock official accredited central university diplomas with instant QR verification.',
      icon: Award,
      color: 'bg-emerald-600 text-white',
      badge: 'STEP 4: ACCREDITED CERTIFICATE',
      actionText: '📜 View Sample Certificate',
      actionHref: '/dashboard/student?tab=certificates',
      features: ['Timed anti-cheating exam simulator', 'Instant score calculation & distinction badges', 'Ministry of Education accredited QR PDF diploma']
    }
  ];

  const roleNamesList: { id: User['role']; name: string; icon: any; color: string }[] = [
    { id: 'student', name: 'Student Console', icon: UserIcon, color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { id: 'teacher', name: 'Teacher Console', icon: BookOpen, color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { id: 'creator', name: 'Course Creator Studio', icon: Sparkles, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { id: 'tester', name: 'Quality Testing Hub', icon: Shield, color: 'bg-rose-50 border-rose-200 text-rose-700' },
    { id: 'institute', name: 'Institute Admin', icon: Building2, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { id: 'accounting', name: 'Accounting & Finance', icon: DollarSign, color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { id: 'admin', name: 'Super Admin', icon: BarChart3, color: 'bg-slate-100 border-slate-300 text-slate-800' }
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC]">
      {/* 1. NIOS-STYLE FULL-WIDTH HERO CAROUSEL WITH LOGO BRAND COLORS */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[650px] flex items-center border-b-4 border-orange-500 shadow-2xl">
        {/* Background Image - Clean, High Opacity, No Blur, Bright Sharp Visuals */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.imagePath}
            alt={currentSlide.titleEng}
            className="w-full h-full object-cover object-center opacity-85 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10 w-full">
          <div className="max-w-3xl space-y-6 text-left animate-in fade-in duration-500">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-orange-400/40 shadow-sm backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{currentSlide.badge}</span>
            </div> */}

            <div className="space-y-2">
              <span className="text-amber-300 text-lg sm:text-2xl font-bold font-serif block">
                {currentSlide.titleHindi}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                {currentSlide.titleEng}
              </h1>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium drop-shadow-xs max-w-2xl">
              {currentSlide.subtitle}
            </p>

            {/* <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-amber-300 font-extrabold text-xs flex items-center gap-2 max-w-lg shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentSlide.highlightText}</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={currentSlide.ctaHref}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 flex items-center gap-2 hover:scale-105 transition"
              >
                {currentSlide.ctaText} <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard/student?tab=chatbot"
                className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition border border-slate-700 backdrop-blur-md"
              >
                <Video className="w-4 h-4 text-cyan-400" /> Watch AI Video Call Demo
              </Link>
            </div> */}
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 transition z-20 backdrop-blur-md hidden sm:block"
          title="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 transition z-20 backdrop-blur-md hidden sm:block"
          title="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${currentSlideIdx === idx ? 'w-10 bg-orange-500' : 'w-3 bg-slate-600 hover:bg-slate-400'
                }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* QUICK TICKER STATS BAR (LOGO BRAND COLORS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-900 text-center">
          <div className="space-y-1">
            <span className="text-3xl font-black text-orange-600 block">22</span>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Scheduled Languages</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl font-black text-cyan-600 block">8</span>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Central Universities</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl font-black text-emerald-600 block">24/7</span>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">AI Video Call Tutor</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl font-black text-rose-700 block">100%</span>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Govt Subsidy Verified</span>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION (LEFT TEXT & RIGHT 2X2 SHORT CARDS GRID) */}
      <section id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Platform Overview & Mission */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200 inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-orange-600" /> ABOUT OUR NATIONAL LMS PLATFORM
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              भारत का राष्ट्रीय हिंदी एवं २२ अनुसूचित भाषा अध्ययन पोर्टल
            </h2>

            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Designed under the National Education Policy (NEP 2020) and Official Language guidelines, our autonomous LMS empowers students, scholars, and global learners to master Hindi and all 22 Eighth Schedule Indian languages through interactive AI tutoring, live video classrooms, and accredited university diplomas.
            </p>

            <div className="space-y-2 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Govt Subsidized Admission with Coupon Code <code className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-mono">BHASHA2026</code></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 AI Video Call Teacher with Real Student WebCam Support & Speech Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accredited Diplomas by Kendriya Hindi Sansthan Agra, CIIL Mysuru, BHU & DU</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/student?tab=indian-languages"
                className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition"
              >
                Explore 22 Languages Track <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Short Feature Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-slate-900">22 Scheduled Languages</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Bilingual pathways from Tamil, Telugu, Malayalam, Bengali, English & 15 foreign languages.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-slate-900">1v1 AI Video Call Studio</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Real webcam video stream, 3D lip-sync AI professors, and native speech audio feedback.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-slate-900">University Diplomas</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  QR-code verified language diplomas accredited by Ministry of Education central universities.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-slate-900">Olympiads & Battles</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Live 1v1 multiplayer quiz battles, weekly speed typing sprints, and global ranks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 🇮🇳 ENHANCED SLEEK & COMPACT SECTION 1: 22 SCHEDULED INDIAN LANGUAGES */}
      <section id="indian-languages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <div className="space-y-1">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200">
            CONSTITUTIONAL VIII SCHEDULE COVERAGE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            22 Scheduled Indian Languages & Foreign Pathways
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-2xl mx-auto">
            Select your mother tongue to launch bilingual Hindi study tracks.
          </p>
        </div>

        {/* Compact High-Density Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 text-left">
          {[
            { name: 'हिंदी (Hindi)', code: 'HI', tag: 'Official' },
            { name: 'தமிழ் (Tamil)', code: 'TA', tag: 'Dravidian' },
            { name: 'తెలుగు (Telugu)', code: 'TE', tag: 'Dravidian' },
            { name: 'বাংলা (Bengali)', code: 'BN', tag: 'Eastern' },
            { name: 'मराठी (Marathi)', code: 'MR', tag: 'Devanagari' },
            { name: 'கன்னட (Kannada)', code: 'KN', tag: 'Dravidian' },
            { name: 'മലയാളം (Malayalam)', code: 'ML', tag: 'Southern' },
            { name: 'ગુજરાતી (Gujarati)', code: 'GU', tag: 'Western' },
            { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'PA', tag: 'Gurmukhi' },
            { name: 'ଓଡ଼ିଆ (Odia)', code: 'OR', tag: 'Eastern' },
            { name: 'اردو (Urdu)', code: 'UR', tag: 'Nasta\'liq' },
            { name: 'অসমীয়া (Assamese)', code: 'AS', tag: 'North-East' },
          ].map((lang, idx) => (
            <Link
              key={idx}
              href="/dashboard/student?tab=indian-languages"
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-orange-500 hover:bg-orange-50/50 transition shadow-2xs flex items-center justify-between group"
            >
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-orange-600">{lang.name}</h4>
                <span className="text-[9px] text-slate-400 font-bold uppercase">{lang.tag}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-black text-[9px]">
                {lang.code}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW SECTION: LEFT MARQUEE CONTINUOUS BOTTOM-TO-TOP LIST & RIGHT GAZETTE SPOTLIGHT CARD */}
      <section id="government-news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider border border-red-200 inline-flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-red-600 animate-pulse" /> OFFICIAL PRESS RELEASES & MARQUEE TICKER
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Government Circulars & LMS News (सरकारी अधिसूचनाएं)
            </h2>
          </div>

          <span className="text-xs font-bold text-slate-500">Live Marquee Active • 29 Aug 2026</span>
        </div>

        {/* LEFT & RIGHT LAYOUT: LEFT VERTICAL MARQUEE + RIGHT FEATURED GAZETTE BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Continuous Bottom-to-Top Vertical Marquee List (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-orange-600" /> Continuous Circular Feed (Hover to Pause)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                5 Active Notices
              </span>
            </div>

            {/* Marquee Container Window */}
            <div className="h-64 overflow-hidden relative group">
              <div className="space-y-3 animate-[marqueeUp_22s_linear_infinite] group-hover:[animation-play-state:paused]">
                {[...newsCirculars, ...newsCirculars].map((news, idx) => (
                  <Link
                    key={idx}
                    href={news.href}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-400 hover:bg-orange-50/60 transition block space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${news.badgeColor}`}>
                        {news.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{news.date}</span>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug hover:text-orange-600 transition">
                      {news.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {news.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <span className="text-[11px] font-bold text-orange-600 inline-flex items-center gap-1">
                ↑ Hover cursor over list to pause scrolling
              </span>
            </div>
          </div>

          {/* Right Column: Featured Gazette & Subsidy Spotlight Box (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between border border-orange-500/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">
                  🏛️ FEATURED GAZETTE SPOTLIGHT
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black">
                  Active Notice
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-amber-300 text-xs font-bold block">Ministry of Education Release #2026-98</span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  National Education Policy 100% Fee Subsidy Scheme
                </h3>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                Under the directives of the Ministry of Education, all registered students pursuing accredited language certificates across 22 Eighth Schedule Indian languages are granted 100% tuition subsidy.
              </p>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Scholarship Coupon Code:</span>
                  <span className="font-mono text-amber-300 font-black text-sm">BHASHA2026</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Subsidy Amount:</span>
                  <span className="text-emerald-400 font-black">100% Free Waiver (₹0 Fee)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/dashboard/student?tab=account-details"
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" /> Download Official Gazette PDF
              </Link>

              <Link
                href="/dashboard/student?tab=institutes"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                Claim Free Seat <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 📖 INTERACTIVE HOW TO USE LMS SECTION */}
      <section id="how-to-use" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
            INTERACTIVE ANIMATED STUDENT GUIDE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How to Use the LMS Portal (उपयोग मार्गदर्शिका)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Click any step below to explore the interactive workflow from free enrollment to university diploma issuance:
          </p>
        </div>

        {/* STEPPER CONNECTOR TAB BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {guideSteps.map((st, idx) => {
            const isActive = activeGuideStep === idx;

            return (
              <button
                key={st.stepNum}
                onClick={() => setActiveGuideStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${isActive
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg scale-102 ring-4 ring-orange-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${isActive ? 'bg-white text-orange-600' : st.color
                  }`}>
                  {st.stepNum}
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <span className={`text-[10px] font-black uppercase tracking-wider block ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                    STEP {st.stepNum}
                  </span>
                  <h4 className="font-extrabold text-xs truncate">{st.titleEng.split('.')[1]}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STEP BREAKDOWN CARD DISPLAY */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl animate-in fade-in zoom-in-98 duration-300 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Breakdown Text Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200">
                  {guideSteps[activeGuideStep].badge}
                </span>
                <span className="text-xs font-bold text-emerald-600">Verified Step Workflow ✓</span>
              </div>

              <div className="space-y-1">
                <span className="text-amber-600 text-lg font-bold font-serif block">
                  {guideSteps[activeGuideStep].titleHindi}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {guideSteps[activeGuideStep].titleEng}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {guideSteps[activeGuideStep].desc}
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800 pt-1">
                {guideSteps[activeGuideStep].features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  href={guideSteps[activeGuideStep].actionHref}
                  className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition"
                >
                  {guideSteps[activeGuideStep].actionText} →
                </Link>
              </div>
            </div>

            {/* Right Visual Feature Preview Card */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 text-white space-y-4 shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                  SIMULATED STUDIO PREVIEW
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Step {activeGuideStep + 1} / 4</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                  {React.createElement(guideSteps[activeGuideStep].icon, { className: 'w-5 h-5' })}
                </div>
                <h4 className="font-extrabold text-sm text-white">{guideSteps[activeGuideStep].titleEng}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Interactive real-time execution inside the student portal. Try out this step now!
                </p>
              </div>

              <Link
                href={guideSteps[activeGuideStep].actionHref}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center block shadow-md transition"
              >
                Try Interactive Feature →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 🏛️ SECTION 3: ACCREDITED PARTNER UNIVERSITIES & CENTERS */}
      <section id="universities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
            OFFICIAL ACCREDITATION NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Accredited Partner Central Universities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Diplomas and certificates issued on our platform are recognized by national ministries and top Indian universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Kendriya Hindi Sansthan, Agra',
              type: 'Ministry of Education Autonomous Body',
              desc: 'Main campus Agra with 8 regional centers. Offers Diploma in Hindi Teaching & Foreign Scholar Courses.',
              seats: '2,500 Annual Seats',
              badge: 'KHS Agra'
            },
            {
              name: 'Central Institute of Indian Languages (CIIL)',
              type: 'National Language Institute, Mysuru',
              desc: 'Dedicated Dravidian-Hindi phonetic bridge courses and 10-month regional language certificates.',
              seats: '1,800 Annual Seats',
              badge: 'CIIL Mysuru'
            },
            {
              name: 'Banaras Hindu University (BHU), Varanasi',
              type: 'Central University of Excellence',
              desc: 'Literature masterclasses, Munshi Premchand studies, and advanced Devanagari translation.',
              seats: '3,200 Annual Seats',
              badge: 'BHU Varanasi'
            }
          ].map((uni, uIdx) => (
            <div
              key={uIdx}
              className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-black text-[10px]">
                    {uni.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">{uni.seats}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">{uni.name}</h3>
                <span className="text-xs text-orange-600 font-bold block">{uni.type}</span>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{uni.desc}</p>
              </div>

              <Link
                href="/dashboard/student?tab=institutes"
                className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
              >
                Register University Seat →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 🎁 SECTION 4: FREE STUDENT FACILITIES & RESOURCES */}
      <section id="free-resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-black uppercase tracking-wider border border-cyan-200">
            100% FREE RESOURCE FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Free Video Masterclasses, Audio & PDFs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Access HD video lectures, native pronunciation audio podcasts, and downloadable study guides free of cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold">
              <Video className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">🎥 Free Video Masterclasses</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                4K & HD video tutorials covering Devanagari stroke order, SOV grammar rules, and conversation practice.
              </p>
            </div>
            <Link
              href="/dashboard/student?tab=free-videos"
              className="text-xs font-black text-orange-600 hover:underline inline-flex items-center gap-1"
            >
              Watch Free Videos →
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">🎧 Free Audio Podcasts</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Native voice recordings, Dravidian-Hindi pronunciation drills, and audiobooks for offline listening.
              </p>
            </div>
            <Link
              href="/dashboard/student?tab=free-audio"
              className="text-xs font-black text-cyan-600 hover:underline inline-flex items-center gap-1"
            >
              Listen Free Audio →
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">📖 Guided Study PDFs</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Downloadable NIOS worksheets, grammar reference books, and Devanagari alphabet charts.
              </p>
            </div>
            <Link
              href="/dashboard/student?tab=guided-learning"
              className="text-xs font-black text-emerald-600 hover:underline inline-flex items-center gap-1"
            >
              Download Free PDFs →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. COMPACT & SIMPLE ROLE-BASED WORKSPACES SECTION */}
      <section id="role-workspaces" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Simple Paragraph Overview (6 cols) */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200 inline-flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-orange-600" /> ROLE-BASED WORKSPACES
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Role-Based Console Workspaces (भूमिका आधारित कंसोल)
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Our platform provides tailored console workspaces for students, faculty teachers, curriculum authors, quality auditors, campus managers, financial accountants, and system administrators. Select any workspace role on the right to enter directly:
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Single-Dashboard Unified Role Access Control</span>
              </div>
            </div>

            {/* Right Column: Simple Role Buttons List - ONLY NAME, NO SUBTEXT (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roleNamesList.map((rItem) => (
                <button
                  key={rItem.id}
                  onClick={() => handleRoleQuickLogin(rItem.id)}
                  className={`p-3.5 rounded-2xl border ${rItem.color} hover:shadow-md hover:scale-102 transition flex items-center justify-between font-extrabold text-xs group text-left`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <rItem.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{rItem.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 opacity-70 group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL HIGH-IMPACT CALL-TO-ACTION (CTA) BANNER SECTION */}
      <section id="final-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border-2 border-orange-400/40 space-y-6 text-center relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest border border-white/30 backdrop-blur-md inline-block">
              🇮🇳 JOIN OVER 4,850 LEARNER SCHOLARS NATIONWIDE
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Master Hindi & 22 Scheduled Indian Languages?
            </h2>

            <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed">
              Enroll today with 100% Government Subsidy scholarship coupon <code className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-mono">BHASHA2026</code>. Access 24/7 AI Video Call tutoring, live classrooms, and accredited central university diplomas.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <button
              onClick={() => handleRoleQuickLogin('student')}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <LogIn className="w-4 h-4 text-orange-600" /> Start Free Student Console →
            </button>

            <Link
              href="/dashboard/student?tab=chatbot"
              className="px-8 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition border border-white/20 backdrop-blur-md"
            >
              <Video className="w-4 h-4 text-cyan-400" /> Call 1v1 AI Video Teacher
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
