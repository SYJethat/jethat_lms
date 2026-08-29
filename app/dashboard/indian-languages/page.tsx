'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Globe,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Play,
  ArrowRight,
  Search,
  Filter,
  Volume2,
  Award,
  Flame,
  Zap,
  Check,
  Star,
  RefreshCw,
  Lightbulb,
  MessageSquare,
  Layers,
  FileText,
  UserCheck,
  Heart,
  ChevronRight,
  X,
  BookMarked,
  ShieldCheck,
  Cpu,
  CreditCard,
  QrCode,
  Lock,
  Tag,
  Receipt,
  Bookmark,
  Download
} from 'lucide-react';
import { getStoredUser, enrollInCourse, unenrollFromCourse, User } from '@/lib/lmsStore';

interface IndianLanguageCourse {
  id: string;
  languageEng: string;
  languageNative: string;
  scriptName: string;
  region: string;
  category: 'South Indian' | 'East & North-East' | 'West & Central' | 'North & Himalayan' | 'Classical & Regional';
  titleHindi: string;
  titleEng: string;
  description: string;
  cognateExample: {
    native: string;
    nativePhonetics: string;
    hindi: string;
    hindiTranslit: string;
    meaning: string;
  };
  totalModules: number;
  totalLessons: number;
  totalStudents: number;
  rating: number;
  bannerGradient: string;
  badge: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Fast Track';
}

const INDIAN_LANGUAGE_COURSES: IndianLanguageCourse[] = [
  {
    id: 'course_ta_hindi',
    languageEng: 'Tamil',
    languageNative: 'தமிழ்',
    scriptName: 'Tamil Script (தமிழ் அரிச்சுவடி)',
    region: 'Tamil Nadu & Puducherry',
    category: 'South Indian',
    titleHindi: 'தமிழ் மூலம் हिंदी — तमिल भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Tamil — Direct Phonetic & Grammar Pathway',
    description: 'Designed specifically for Tamil speakers. Leverage Dravidian sentence structure (SOV) and Sanskrit-derived loanwords to master spoken & written Hindi effortlessly.',
    cognateExample: {
      native: 'வணக்கம்',
      nativePhonetics: 'Vanakkam',
      hindi: 'नमस्ते / प्रणाम',
      hindiTranslit: 'Namaste / Pranam',
      meaning: 'Respectful Greeting / Hello'
    },
    totalModules: 12,
    totalLessons: 48,
    totalStudents: 34500,
    rating: 4.9,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    badge: 'Popular',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_te_hindi',
    languageEng: 'Telugu',
    languageNative: 'తెలుగు',
    scriptName: 'Telugu Script (తెలుగు లిపి)',
    region: 'Andhra Pradesh & Telangana',
    category: 'South Indian',
    titleHindi: 'తెలుగు ద్వారా हिंदी — तेलुगु माध्यम से हिंदी सीखें',
    titleEng: 'Learn Hindi via Telugu — Shared Honorifics & Vocabulary',
    description: 'Telugu speakers share massive Tatsama Sanskrit vocabulary with Hindi. Learn Devanagari reading, sentence formation, and formal conversational Hindi.',
    cognateExample: {
      native: 'నమస్కారం',
      nativePhonetics: 'Namaskaram',
      hindi: 'नमस्कार',
      hindiTranslit: 'Namaskar',
      meaning: 'Greetings / Hello'
    },
    totalModules: 14,
    totalLessons: 52,
    totalStudents: 41200,
    rating: 4.9,
    bannerGradient: 'from-red-600 via-rose-600 to-pink-600',
    badge: 'Top Rated',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_bn_hindi',
    languageEng: 'Bengali',
    languageNative: 'বাংলা',
    scriptName: 'Bengali-Assamese Script (বাংলা বর্ণমালা)',
    region: 'West Bengal & Tripura',
    category: 'East & North-East',
    titleHindi: 'বাংলা থেকে हिंदी — बंगाली से हिंदी शिक्षण कोर्स',
    titleEng: 'Learn Hindi via Bengali — Expressive Dialogue & Script Transition',
    description: 'Transition easily from Eastern Indo-Aryan phonetics to Hindi Devanagari. Includes dedicated drills for gendered verbs (लिंग भेद) which differ from Bengali.',
    cognateExample: {
      native: 'ধন্যবাদ',
      nativePhonetics: 'Dhanyabad',
      hindi: 'धन्यवाद',
      hindiTranslit: 'Dhanyavaad',
      meaning: 'Thank You'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 29800,
    rating: 4.8,
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badge: 'Fast Track',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_mr_hindi',
    languageEng: 'Marathi',
    languageNative: 'मराठी',
    scriptName: 'Devanagari (बाळबोध)',
    region: 'Maharashtra',
    category: 'West & Central',
    titleHindi: 'मराठीतून हिंदी — मराठी भाषियों के लिए त्वरित हिंदी',
    titleEng: 'Learn Hindi via Marathi — Instant Devanagari Mastery',
    description: 'Since Marathi and Hindi both use Devanagari script, Marathi native speakers can skip alphabet drills and leap directly into high-level conversational fluency!',
    cognateExample: {
      native: 'नमस्कार / धन्यवाद',
      nativePhonetics: 'Namaskar / Dhanyavaad',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thank You (100% Identical)'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 52100,
    rating: 4.95,
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    badge: 'Highest Match',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_gu_hindi',
    languageEng: 'Gujarati',
    languageNative: 'ગુજરાતી',
    scriptName: 'Gujarati Script (ગુજરાતી લિપિ)',
    region: 'Gujarat & Dadra Nagar Haveli',
    category: 'West & Central',
    titleHindi: 'ગુજરાતી દ્વારા हिंदी — गुजराती माध्यम से हिंदी पाठ्यकम',
    titleEng: 'Learn Hindi via Gujarati — Business & Spoken Hindi Bridge',
    description: 'Gujarati script is closely related to Devanagari without top header line. Learn fast reading and conversational Hindi for academics and commerce.',
    cognateExample: {
      native: 'આભાર / નમસ્તે',
      nativePhonetics: 'Aabhar / Namaste',
      hindi: 'आभार / नमस्ते',
      hindiTranslit: 'Aabhar / Namaste',
      meaning: 'Gratitude & Greetings'
    },
    totalModules: 11,
    totalLessons: 44,
    totalStudents: 26400,
    rating: 4.8,
    bannerGradient: 'from-amber-500 via-yellow-600 to-orange-600',
    badge: 'Popular',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_kn_hindi',
    languageEng: 'Kannada',
    languageNative: 'ಕನ್ನಡ',
    scriptName: 'Kannada Script (ಕನ್ನಡ ಲಿಪಿ)',
    region: 'Karnataka',
    category: 'South Indian',
    titleHindi: 'ಕನ್ನಡದ ಮೂಲಕ हिंदी — कन्नड़ भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Kannada — Grammar & Phonetics Module',
    description: 'Tailored for Karnataka learners. Bridges Dravidian sentence syntax with Hindi verb conjugations and Devanagari reading practice.',
    cognateExample: {
      native: 'ನಮಸ್ಕಾರ / ಧನ್ಯವಾದಗಳು',
      nativePhonetics: 'Namaskara / Dhanyavadagalu',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 12,
    totalLessons: 48,
    totalStudents: 31000,
    rating: 4.85,
    bannerGradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    badge: 'Essential',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_ml_hindi',
    languageEng: 'Malayalam',
    languageNative: 'മലയാളം',
    scriptName: 'Malayalam Script (മലയാള ലിപി)',
    region: 'Kerala & Lakshadweep',
    category: 'South Indian',
    titleHindi: 'മലയാളത്തിലൂടെ हिंदी — मलयालम माध्यम से हिंदी',
    titleEng: 'Learn Hindi via Malayalam — High Sanskrit Vocabulary Bridge',
    description: 'Malayalam boasts high Sanskrit loanwords. Keralite students will find advanced Hindi vocabulary effortless to comprehend through shared linguistic roots.',
    cognateExample: {
      native: 'നമസ്കാരം / നന്ദി',
      nativePhonetics: 'Namaskaram / Nandi',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Respectful Greeting & Thanks'
    },
    totalModules: 13,
    totalLessons: 50,
    totalStudents: 22800,
    rating: 4.9,
    bannerGradient: 'from-teal-600 via-emerald-600 to-green-600',
    badge: 'High Vocabulary',
    difficulty: 'Intermediate'
  },
  {
    id: 'course_pa_hindi',
    languageEng: 'Punjabi',
    languageNative: 'ਪੰਜਾਬੀ',
    scriptName: 'Gurmukhi (ਗੁਰਮੁਖੀ)',
    region: 'Punjab & Chandigarh',
    category: 'North & Himalayan',
    titleHindi: 'ਪੰਜਾਬੀ ਤੋਂ हिंदी — पंजाबी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Punjabi — Gurmukhi to Devanagari Bridge',
    description: 'Punjabi shares deep colloquial and structural ties with Hindi. Master Devanagari script, formal vocabulary, and official Hindi correspondence.',
    cognateExample: {
      native: 'ਧੰਨਵਾਦ / ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
      nativePhonetics: 'Dhannvaad / Sat Sri Akal',
      hindi: 'धन्यवाद / नमस्ते',
      hindiTranslit: 'Dhanyavaad / Namaste',
      meaning: 'Thanks & Greeting'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 38900,
    rating: 4.9,
    bannerGradient: 'from-orange-500 via-amber-600 to-yellow-500',
    badge: 'Popular',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_or_hindi',
    languageEng: 'Odia',
    languageNative: 'ଓଡ଼ିଆ',
    scriptName: 'Odia Script (ଓଡ଼ିଆ ଲିପି)',
    region: 'Odisha',
    category: 'East & North-East',
    titleHindi: 'ଓଡ଼ିଆ ମାଧ୍ୟମରେ हिंदी — उड़िया भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Odia — Structural & Vocabulary Course',
    description: 'Designed for Odia speakers. Leverages eastern Indo-Aryan roots and shared Sanskrit vocabulary for fast conversational and academic Hindi proficiency.',
    cognateExample: {
      native: 'ନମସ୍କାର / ଧନ୍ୟବାଦ',
      nativePhonetics: 'Namaskara / Dhanyabada',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 18400,
    rating: 4.8,
    bannerGradient: 'from-cyan-600 via-sky-600 to-blue-600',
    badge: 'Recommended',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_as_hindi',
    languageEng: 'Assamese',
    languageNative: 'অসমীয়া',
    scriptName: 'Assamese Script (অসমীয়া লিপি)',
    region: 'Assam',
    category: 'East & North-East',
    titleHindi: 'অসমীয়াৰ পৰা हिंदी — असमीया से हिंदी भाषा पाठ्यक्रम',
    titleEng: 'Learn Hindi via Assamese — North-East Bhasha Sangam',
    description: 'Learn Hindi with Assamese explanatory audio and script comparison. Master everyday spoken expressions and formal Hindi grammar rules.',
    cognateExample: {
      native: 'নমস্কাৰ / ধন্যবাদ',
      nativePhonetics: 'Namaskar / Dhanyabad',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 16200,
    rating: 4.85,
    bannerGradient: 'from-emerald-500 via-teal-600 to-sky-600',
    badge: 'Bhasha Sangam',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_ur_hindi',
    languageEng: 'Urdu',
    languageNative: 'اردو',
    scriptName: 'Perso-Arabic (Nastaliq) / Devanagari',
    region: 'Pan-India',
    category: 'Classical & Regional',
    titleHindi: 'اردو سے ہندی — उर्दू माध्यम से देवनागरी हिंदी सीखें',
    titleEng: 'Learn Hindi via Urdu — Spoken Intelligibility to Devanagari Script',
    description: 'Urdu and Hindi share identical spoken grammar. Urdu speakers focus on learning Devanagari reading/writing and literary Tatsama vocabulary.',
    cognateExample: {
      native: 'شکریہ / سلام',
      nativePhonetics: 'Shukriya / Salaam',
      hindi: 'धन्यवाद / नमस्ते',
      hindiTranslit: 'Dhanyavaad / Namaste',
      meaning: 'Thanks & Greetings'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 45600,
    rating: 4.95,
    bannerGradient: 'from-violet-600 via-purple-600 to-indigo-700',
    badge: '100% Spoken Match',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sa_hindi',
    languageEng: 'Sanskrit',
    languageNative: 'संस्कृतम्',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Pan-India / Ancient Heritage',
    category: 'Classical & Regional',
    titleHindi: 'संस्कृतेन हिंदी — संस्कृत मूल से आधुनिक हिंदी शिक्षण',
    titleEng: 'Learn Hindi via Sanskrit — Classical Roots to Modern Hindi',
    description: 'Sanskrit is the mother language of Hindi. Learn modern Hindi grammar, tenses, and idioms by linking them directly to classical Sanskrit roots.',
    cognateExample: {
      native: 'नमो नमः / धन्यवादः',
      nativePhonetics: 'Namo Namah / Dhanyavaadah',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Salutations & Gratitude'
    },
    totalModules: 7,
    totalLessons: 28,
    totalStudents: 21900,
    rating: 4.95,
    bannerGradient: 'from-amber-600 via-red-600 to-orange-700',
    badge: 'Mother Root',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_ne_hindi',
    languageEng: 'Nepali',
    languageNative: 'नेपाली',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Sikkim, West Bengal & Gorkhaland',
    category: 'North & Himalayan',
    titleHindi: 'नेपालीबाट हिंदी — नेपाली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Nepali — Shared Devanagari Heritage',
    description: 'Nepali learners enjoy immediate script familiarity with Devanagari. Focus on nuances in Hindi verb tenses, formal registers, and vocabulary.',
    cognateExample: {
      native: 'नमस्ते / धन्यवाद',
      nativePhonetics: 'Namaste / Dhanyabaad',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 8,
    totalLessons: 30,
    totalStudents: 19400,
    rating: 4.9,
    bannerGradient: 'from-red-600 via-rose-700 to-pink-600',
    badge: 'Direct Script',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_ks_hindi',
    languageEng: 'Kashmiri',
    languageNative: 'कॉशुर',
    scriptName: 'Perso-Arabic / Devanagari (कश्मीरी)',
    region: 'Jammu & Kashmir',
    category: 'North & Himalayan',
    titleHindi: 'कॉशुर प्याठ हिंदी — कश्मीरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Kashmiri — Himalayan Linguistic Bridge',
    description: 'Designed for Kashmir valley and Jammu region learners. Bridges Kashmiri phonetic structures with standard Devanagari Hindi reading and speech.',
    cognateExample: {
      native: 'नमस्कार / शुक्रिया',
      nativePhonetics: 'Namaskar / Shukriya',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 14200,
    rating: 4.85,
    bannerGradient: 'from-sky-600 via-indigo-600 to-blue-700',
    badge: 'Himalayan Portal',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_kok_hindi',
    languageEng: 'Konkani',
    languageNative: 'कोंकणी',
    scriptName: 'Devanagari (कोंकणी)',
    region: 'Goa & Coastal Karnataka',
    category: 'West & Central',
    titleHindi: 'कोंकणी सावन हिंदी — कोंकणी से हिंदी भाषा कोर्स',
    titleEng: 'Learn Hindi via Konkani — West Coast Devanagari Gateway',
    description: 'Konkani in Goa uses Devanagari script. Leverage your native coastal vocabulary to master Hindi grammar, poetry, and formal writing.',
    cognateExample: {
      native: 'नमस्कार / देव बरे करू',
      nativePhonetics: 'Namaskar / Dev Bare Karu',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 12800,
    rating: 4.85,
    bannerGradient: 'from-blue-500 via-cyan-600 to-teal-600',
    badge: 'Coastal Gateway',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_mai_hindi',
    languageEng: 'Maithili',
    languageNative: 'मैथिली',
    scriptName: 'Tirhuta / Devanagari',
    region: 'Mithila / Bihar',
    category: 'East & North-East',
    titleHindi: 'मैथिली सं हिंदी — मैथिली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Maithili — Mithila Heritage to Standard Hindi',
    description: 'Maithili speakers share deep cultural and grammatical ties with Hindi. Master formal business Hindi and competitive examination Hindi.',
    cognateExample: {
      native: 'प्रणाम / धन्यवाद',
      nativePhonetics: 'Pranam / Dhanyavaad',
      hindi: 'प्रणाम / धन्यवाद',
      hindiTranslit: 'Pranam / Dhanyavaad',
      meaning: 'Respectful Greeting & Thanks'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 27300,
    rating: 4.9,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    badge: 'Mithila Heritage',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sd_hindi',
    languageEng: 'Sindhi',
    languageNative: 'सिंधी / سنڌي',
    scriptName: 'Arabic / Devanagari',
    region: 'Pan-India Sindhi Diaspora',
    category: 'West & Central',
    titleHindi: 'सिंधी मां हिंदी — सिंधी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Sindhi — Phonetic & Script Mapping',
    description: 'Connect Sindhi sound system with Devanagari script. Ideal for Sindhi community students across India seeking fluent spoken & written Hindi.',
    cognateExample: {
      native: 'नमस्कार / मेहरबानी',
      nativePhonetics: 'Namaskar / Meherbani',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 11500,
    rating: 4.8,
    bannerGradient: 'from-pink-600 via-rose-600 to-purple-600',
    badge: 'Diaspora Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_doi_hindi',
    languageEng: 'Dogri',
    languageNative: 'डोगरी',
    scriptName: 'Devanagari (डोगरी)',
    region: 'Jammu Region',
    category: 'North & Himalayan',
    titleHindi: 'डोगरी थमां हिंदी — डोगरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Dogri — Duggar Culture to Standard Hindi',
    description: 'Explore the natural harmony between Dogri expressions and standard Hindi vocabulary with audio lessons and interactive quizzes.',
    cognateExample: {
      native: 'जय देवा / धन्यवाद',
      nativePhonetics: 'Jai Deva / Dhanyavaad',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 9,
    totalLessons: 34,
    totalStudents: 10800,
    rating: 4.85,
    bannerGradient: 'from-yellow-600 via-amber-600 to-orange-600',
    badge: 'Duggar Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_mni_hindi',
    languageEng: 'Manipuri (Meitei)',
    languageNative: 'মৈতৈলোন্ / मणीपुरी',
    scriptName: 'Meitei Mayek / Bengali Script',
    region: 'Manipur',
    category: 'East & North-East',
    titleHindi: 'মৈতৈলোন্দগী হিন্দি — मणिपुरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Manipuri — North-East Visual & Audio Gateway',
    description: 'Designed specifically for Manipur students. Uses visual script guides and Meiteilon audio explanations for smooth Hindi learning.',
    cognateExample: {
      native: 'खुरुमजरी / थागत्चरी',
      nativePhonetics: 'Khurumjari / Thagatchari',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 12,
    totalLessons: 46,
    totalStudents: 13900,
    rating: 4.9,
    bannerGradient: 'from-emerald-600 via-teal-700 to-indigo-700',
    badge: 'Meitei Mayek Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_brx_hindi',
    languageEng: 'Bodo',
    languageNative: 'बोडो',
    scriptName: 'Devanagari (बोडो)',
    region: 'Bodoland / Assam',
    category: 'East & North-East',
    titleHindi: 'बोडोरावजों हिंदी — बोडो भाषियों के लिए हिंदी पाठ्यकम',
    titleEng: 'Learn Hindi via Bodo — Bodoland Devanagari Portal',
    description: 'Since Bodo uses Devanagari script, Bodo speakers can rapidly learn Hindi words, sentence building, and formal communication.',
    cognateExample: {
      native: 'खुलुमबाय / साबायखर',
      nativePhonetics: 'Khulumby / Sabaykhar',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thank You'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 9800,
    rating: 4.85,
    bannerGradient: 'from-teal-600 via-cyan-600 to-blue-600',
    badge: 'Bodoland Gateway',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sat_hindi',
    languageEng: 'Santali',
    languageNative: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ',
    scriptName: 'Ol Chiki / Devanagari',
    region: 'Jharkhand, Odisha, West Bengal',
    category: 'Classical & Regional',
    titleHindi: 'संथाली ते हिंदी — संथाली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Santali — Tribal Heritage to National Language',
    description: 'Connect Ol Chiki & Santali expressions with Devanagari Hindi. Learn essential conversational phrases, grammar, and reading skills.',
    cognateExample: {
      native: 'जोहार / सरहाओ',
      nativePhonetics: 'Johar / Sarhao',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Universal Greeting & Thanks'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 14100,
    rating: 4.9,
    bannerGradient: 'from-amber-700 via-orange-700 to-red-700',
    badge: 'Tribal Bhasha Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_en_in_hindi',
    languageEng: 'English & Multilingual',
    languageNative: 'English (Indian Context)',
    scriptName: 'Latin / Romanized Devanagari (Hinglish)',
    region: 'Pan-India & Global Diaspora',
    category: 'Classical & Regional',
    titleHindi: 'English to Hindi — भारतीय अंग्रेजी माध्यम से हिंदी',
    titleEng: 'Learn Hindi via Indian English — Hinglish & Romanized Bridge',
    description: 'Perfect for urban Indian students, NRI global diaspora, and multi-lingual learners who prefer Romanized transliteration alongside Devanagari.',
    cognateExample: {
      native: 'Hello / Thank You',
      nativePhonetics: 'Hello / Thank You',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Universal Greeting & Gratitude'
    },
    totalModules: 15,
    totalLessons: 60,
    totalStudents: 68500,
    rating: 4.95,
    bannerGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    badge: 'Global NRI Pick',
    difficulty: 'Beginner Friendly'
  }
];

// Interactive Cognate Database for multi-lingual comparison tool
const COMPARATIVE_COGNATES = [
  {
    wordEng: 'Greeting / Hello',
    hindi: 'नमस्ते (Namaste)',
    sanskrit: 'नमो नमः',
    tamil: 'வணக்கம் (Vanakkam)',
    telugu: 'నమస్కారం (Namaskaram)',
    bengali: 'নমস্কার (Nomoshkar)',
    marathi: 'नमस्कार (Namaskar)',
    gujarati: 'નમસ્તે (Namaste)',
    kannada: 'ನಮಸ್ಕಾರ (Namaskara)',
    malayalam: 'നമസ്കാരം (Namaskaram)',
    punjabi: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ (Sat Sri Akal)',
    audioText: 'नमस्ते'
  },
  {
    wordEng: 'Thank You',
    hindi: 'धन्यवाद (Dhanyavaad)',
    sanskrit: 'धन्यवादः',
    tamil: 'நன்றி (Nandri)',
    telugu: 'ధన్యవాదాలు (Dhanyavadalu)',
    bengali: 'ধন্যবাদ (Dhanyabad)',
    marathi: 'धन्यवाद (Dhanyavaad)',
    gujarati: 'આભાર (Aabhar)',
    kannada: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)',
    malayalam: 'നന്ദി (Nandi)',
    punjabi: 'ਧੰਨਵਾਦ (Dhannvaad)',
    audioText: 'धन्यवाद'
  },
  {
    wordEng: 'Water',
    hindi: 'जल / पानी (Jal / Paani)',
    sanskrit: 'जलम् / तोयम्',
    tamil: 'நீர் / தண்ணீர் (Neer / Thanneer)',
    telugu: 'నీరు / జలము (Neeru / Jalamu)',
    bengali: 'জল / পানি (Jol / Pani)',
    marathi: 'पाणी / जल (Paani / Jal)',
    gujarati: 'પાણી / જળ (Paani / Jal)',
    kannada: 'நீರು / ಜಲ (Neeru / Jala)',
    malayalam: 'വെള്ളം / ജലം (Vellam / Jalam)',
    punjabi: 'ਪਾਣੀ (Paani)',
    audioText: 'जल ही जीवन है'
  },
  {
    wordEng: 'Book / Knowledge',
    hindi: 'पुस्तक / विद्या (Pustak / Vidya)',
    sanskrit: 'पुस्तकम् / विद्या',
    tamil: 'புத்தகம் / வித்தை (Puthagam)',
    telugu: 'పుస్తకం / విద్య (Pustakam)',
    bengali: 'বই / বিদ্যা (Boi / Bidya)',
    marathi: 'पुस्तक / विद्या (Pustak)',
    gujarati: 'પુસ્તક / વિદ્યા (Pustak)',
    kannada: 'ಪುಸ್ತಕ / ವಿದ್ಯೆ (Pustaka)',
    malayalam: 'പുസ്തകം / വിദ്യ (Pusthakam)',
    punjabi: 'ਪੁਸਤਕ / ਵਿੱਦਿਆ (Pustak)',
    audioText: 'ज्ञान ही परम शक्ति है'
  },
  {
    wordEng: 'Mother / Respect',
    hindi: 'माता / माँ (Mata / Maa)',
    sanskrit: 'माता / जननी',
    tamil: 'அம்மா / தாய் (Amma / Thai)',
    telugu: 'అమ్మ / తల్లి (Amma / Thalli)',
    bengali: 'মা / মাতা (Maa / Mata)',
    marathi: 'आई / माता (Aai / Mata)',
    gujarati: 'માતા / મા (Mata / Maa)',
    kannada: 'ಅಮ್ಮ / ತಾಯಿ (Amma / Thayi)',
    malayalam: 'അമ്മ / മാതാവ് (Amma / Mathavu)',
    punjabi: 'ਮਾਂ / ਮਾਤਾ (Maa / Mata)',
    audioText: 'मातृ देवो भव'
  }
];

// Interactive SOV Sentence Reorder Game Items
const SOV_GAME_QUESTIONS = [
  {
    id: 'sov_1',
    nativeLang: 'Tamil / Dravidian SOV',
    nativeSentence: 'நான் હિંદી கற்கிறேன் (Naan Hindi katrikiren)',
    englishTranslation: 'I am learning Hindi.',
    correctHindiTokens: ['मैं', 'हिंदी', 'सीख रहा हूँ'],
    shuffledTokens: ['सीख रहा हूँ', 'मैं', 'हिंदी'],
    hint: 'Hindi follows Subject (मैं) + Object (हिंदी) + Verb (सीख रहा हूँ).'
  },
  {
    id: 'sov_2',
    nativeLang: 'Bengali / Eastern SOV',
    nativeSentence: 'আমি বই পড়ছি (Ami boi porchi)',
    englishTranslation: 'I am reading a book.',
    correctHindiTokens: ['मैं', 'किताब', 'पढ़ रहा हूँ'],
    shuffledTokens: ['पढ़ रहा हूँ', 'किताब', 'मैं'],
    hint: 'Subject (मैं) + Object (किताब) + Verb (पढ़ रहा हूँ).'
  },
  {
    id: 'sov_3',
    nativeLang: 'Telugu / Southern SOV',
    nativeSentence: 'నేను మంచి స్నేహితుడిని (Nenu manchi snehithudini)',
    englishTranslation: 'I am a good friend.',
    correctHindiTokens: ['मैं', 'एक अच्छा', 'दोस्त हूँ'],
    shuffledTokens: ['दोस्त हूँ', 'एक अच्छा', 'मैं'],
    hint: 'Order: Subject + Modifier + Complement.'
  }
];

// 3D Micro Flashcard Deck Items
const FLASHCARDS = [
  {
    id: 1,
    nativeTitle: 'Greeting in Tamil',
    nativeWord: 'வணக்கம் (Vanakkam)',
    hindiWord: 'नमस्ते (Namaste)',
    transliteration: 'Na-mas-te',
    exampleHindi: 'नमस्ते, आप कैसे हैं?',
    exampleEng: 'Hello, how are you?',
    category: 'Daily Salutation'
  },
  {
    id: 2,
    nativeTitle: 'Thanks in Bengali',
    nativeWord: 'ধন্যবাদ (Dhanyabad)',
    hindiWord: 'धन्यवाद (Dhanyavaad)',
    transliteration: 'Dhan-ya-vaad',
    exampleHindi: 'आपकी सहायता के लिए धन्यवाद।',
    exampleEng: 'Thank you for your help.',
    category: 'Polite Phrase'
  },
  {
    id: 3,
    nativeTitle: 'Friend in Marathi',
    nativeWord: 'मित्र (Mitra)',
    hindiWord: 'मित्र / दोस्त (Mitra / Dost)',
    transliteration: 'Mi-tra / Dost',
    exampleHindi: 'वह मेरा सच्चा मित्र है।',
    exampleEng: 'He is my true friend.',
    category: 'Relationship'
  },
  {
    id: 4,
    nativeTitle: 'Welcome in Telugu',
    nativeWord: 'స్వాగతం (Swagatam)',
    hindiWord: 'स्वागत है (Swagat Hai)',
    transliteration: 'Swa-gat Hai',
    exampleHindi: 'हमारे घर में आपका स्वागत है।',
    exampleEng: 'Welcome to our home.',
    category: 'Hospitality'
  }
];

export default function DashboardIndianLanguagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses' | 'ideas' | 'bridge'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPaceFilter, setSelectedPaceFilter] = useState<string>('All');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('All');
  const [activeDayLesson, setActiveDayLesson] = useState<number>(1);
  const [selectedCourseModal, setSelectedCourseModal] = useState<IndianLanguageCourse | null>(null);
  const [activePlayCourse, setActivePlayCourse] = useState<IndianLanguageCourse | null>(null);
  
  // Game & Interactive Tool States
  const [selectedCognateLang, setSelectedCognateLang] = useState<string>('tamil');
  const [gameIndex, setGameIndex] = useState(0);
  const [userSentenceTokens, setUserSentenceTokens] = useState<string[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [speakingRecording, setSpeakingRecording] = useState(false);
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);

  // Checkout & Payment Modal States
  const [checkoutCourse, setCheckoutCourse] = useState<IndianLanguageCourse | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<'standard' | 'pro' | 'scholarship'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'scholarship'>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessInvoice, setPaymentSuccessInvoice] = useState<string | null>(null);

  // Full In-Page Course Workspace & Step Completion Tracking
  const [courseStepTab, setCourseStepTab] = useState<'videos' | 'reading' | 'writing' | 'guided-learning' | 'listening' | 'exam' | 'certificate'>('videos');
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, {
    video1Done: boolean;
    video2Done: boolean;
    video3Done: boolean;
    readingCompleted: boolean;
    writingCompleted: boolean;
    writingAnswer: string;
    listeningCompleted: boolean;
    listeningAnswer: number;
    examCompleted: boolean;
    examScore: number;
  }>>({
    'course_ta_hindi': {
      video1Done: true,
      video2Done: true,
      video3Done: true,
      readingCompleted: true,
      writingCompleted: true,
      writingAnswer: 'नमस्ते! मैं अपनी मातृभाषा तमिल से हिंदी सीख रहा हूँ।',
      listeningCompleted: true,
      listeningAnswer: 1,
      examCompleted: true,
      examScore: 96
    }
  });

  const getStepProgress = (courseId: string) => {
    const cur = courseProgressMap[courseId] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      listeningCompleted: false,
      listeningAnswer: 0,
      examCompleted: false,
      examScore: 0
    };
    const videosCompleted = cur.video1Done && cur.video2Done && cur.video3Done;
    let completedCount = 0;
    if (videosCompleted) completedCount++;
    if (cur.readingCompleted) completedCount++;
    if (cur.writingCompleted) completedCount++;
    if (cur.listeningCompleted) completedCount++;
    if (cur.examCompleted) completedCount++;

    const percent = Math.round((completedCount / 5) * 100);
    const allFinished = completedCount === 5;
    return { ...cur, videosCompleted, completedCount, percent, allFinished };
  };

  const updateCourseProgress = (courseId: string, updates: Partial<typeof courseProgressMap[string]>) => {
    setCourseProgressMap((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {
          video1Done: false,
          video2Done: false,
          video3Done: false,
          readingCompleted: false,
          writingCompleted: false,
          writingAnswer: '',
          listeningCompleted: false,
          listeningAnswer: 0,
          examCompleted: false,
          examScore: 0
        }),
        ...updates
      }
    }));
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleEnroll = (courseId: string) => {
    const updated = enrollInCourse(courseId);
    setUser({ ...updated });
  };

  const handleUnenroll = (courseId: string) => {
    const updated = unenrollFromCourse(courseId);
    setUser({ ...updated });
  };

  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const handleProcessPayment = () => {
    if (!checkoutCourse) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      // Complete enrollment
      const updatedUser = enrollInCourse(checkoutCourse.id);
      setUser({ ...updatedUser });

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti triggered');
      }

      setIsProcessingPayment(false);
      const invNumber = 'INV-HLMS-2026-' + Math.floor(100000 + Math.random() * 900000);
      setPaymentSuccessInvoice(invNumber);
    }, 1500);
  };

  const handleFinishCheckout = () => {
    setPaymentSuccessInvoice(null);
    setCheckoutCourse(null);
    setCouponCode('');
    setCouponApplied(false);
    setActiveTab('my-courses');
  };

  // Filter courses based on tab, category, search
  const filteredCourses = INDIAN_LANGUAGE_COURSES.filter((c) => {
    const matchesSearch =
      c.languageEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.languageNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;

    if (activeTab === 'my-courses') {
      return isEnrolled(c.id) && matchesSearch;
    }
    return matchesSearch && matchesCategory;
  });

  const enrolledCoursesList = INDIAN_LANGUAGE_COURSES.filter((c) =>
    user?.enrolledCourses?.includes(c.id)
  );

  // Audio simulator function
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Audio playing: "${text}"`);
    }
  };

  // Sentence Builder Game Handler
  const currentGame = SOV_GAME_QUESTIONS[gameIndex];
  const handleAddToken = (token: string) => {
    if (!userSentenceTokens.includes(token)) {
      setUserSentenceTokens([...userSentenceTokens, token]);
    }
  };

  const handleRemoveToken = (token: string) => {
    setUserSentenceTokens(userSentenceTokens.filter((t) => t !== token));
  };

  const handleCheckSentence = () => {
    const isCorrect =
      userSentenceTokens.join(' ') === currentGame.correctHindiTokens.join(' ');
    if (isCorrect) {
      playAudio(currentGame.correctHindiTokens.join(' '));
      setGameScore((prev) => prev + 100);
      if (gameIndex < SOV_GAME_QUESTIONS.length - 1) {
        setTimeout(() => {
          setGameIndex((prev) => prev + 1);
          setUserSentenceTokens([]);
        }, 1200);
      } else {
        setGameFinished(true);
      }
    } else {
      alert('Keep trying! Check the Subject-Object-Verb word order hint.');
    }
  };

  const handleSimulateSpeaking = () => {
    setSpeakingRecording(true);
    setSpeakingScore(null);
    setTimeout(() => {
      setSpeakingRecording(false);
      const score = Math.floor(Math.random() * 15) + 85;
      setSpeakingScore(score);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* FULL IN-PAGE COURSE LEARNING WORKSPACE (WHEN COURSE IS ACTIVE) */}
      {activePlayCourse ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Header Bar with Back Button & Overall Progress */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePlayCourse(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
              >
                ← Back to Courses
              </button>
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">
                  ACTIVE COURSE LEARNING WORKSPACE • {activePlayCourse.languageEng} ({activePlayCourse.languageNative})
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activePlayCourse.titleHindi}
                </h1>
              </div>
            </div>

            {/* Overall Progress Bar */}
            {(() => {
              const prog = getStepProgress(activePlayCourse.id);
              return (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-right space-y-1 shrink-0 min-w-[220px]">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-700">Pathway Progress</span>
                    <span className="text-blue-600">{prog.percent}% ({prog.completedCount}/5 Steps)</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                    {prog.allFinished ? '🎉 All 5 Steps Finished! Certificate Unlocked.' : 'Complete Videos, Reading, Writing, Listening & Exam to unlock Certificate.'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Step Navigation Bar (Inline Stepper) */}
          {(() => {
            const prog = getStepProgress(activePlayCourse.id);
            return (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
                <button
                  onClick={() => setCourseStepTab('videos')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'videos'
                      ? 'bg-blue-600 text-white shadow-md'
                      : prog.videosCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Play className="w-4 h-4" /> 1. Video Lessons ({prog.videosCompleted ? '✓ 3/3 Done' : '3 Videos'})
                </button>

                <button
                  onClick={() => setCourseStepTab('reading')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'reading'
                      ? 'bg-blue-600 text-white shadow-md'
                      : prog.readingCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> 2. Reading Text ({prog.readingCompleted ? '✓ Completed' : 'Reading Text'})
                </button>

                <button
                  onClick={() => setCourseStepTab('writing')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'writing'
                      ? 'bg-blue-600 text-white shadow-md'
                      : prog.writingCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" /> 3. Written Test ({prog.writingCompleted ? '✓ Submitted' : 'Written Exercise'})
                </button>

                <button
                  onClick={() => setCourseStepTab('guided-learning')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'guided-learning'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-emerald-500" /> 📖 Guided Study Modules (PDFs)
                </button>

                <button
                  onClick={() => setCourseStepTab('listening')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'listening'
                      ? 'bg-blue-600 text-white shadow-md'
                      : prog.listeningCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Volume2 className="w-4 h-4" /> 4. Listening Test ({prog.listeningCompleted ? '✓ Completed' : 'Audio Test'})
                </button>

                <button
                  onClick={() => setCourseStepTab('exam')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'exam'
                      ? 'bg-blue-600 text-white shadow-md'
                      : prog.examCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Award className="w-4 h-4" /> 5. Final Exam ({prog.examCompleted ? `✓ Score ${prog.examScore}%` : 'Assessment Exam'})
                </button>

                <button
                  onClick={() => setCourseStepTab('certificate')}
                  disabled={!prog.allFinished}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'certificate'
                      ? 'bg-amber-500 text-slate-900 shadow-md font-black'
                      : prog.allFinished
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-600" /> 6. Official Certificate {!prog.allFinished && '(🔒 Finish 1-5)'}
                </button>
              </div>
            );
          })()}

          {/* STEP 1: VIDEO LESSONS */}
          {courseStepTab === 'videos' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">STEP 1 OF 5 • MULTIPLE VIDEO LECTURES</span>
                  <h3 className="text-xl font-black text-slate-900">वीडियो पाठ श्रृंखला (Video Lecture Series)</h3>
                  <p className="text-xs text-slate-500">Watch all 3 video lessons to master Devanagari script, grammar & spoken Hindi.</p>
                </div>
              </div>

              {/* Video Player Container */}
              <div className="aspect-video bg-slate-900 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                    Video 1 of 3: Devanagari Script & Vowels for {activePlayCourse.languageEng} Speakers
                  </span>
                  <span className="text-slate-400">Duration: 18 Mins</span>
                </div>

                <div className="text-center space-y-3 my-auto z-10">
                  <div
                    onClick={() => playAudio(`नमस्ते! इस वीडियो में हम ${activePlayCourse.languageEng} भाषा से हिंदी वर्णमाला का तुलनात्मक अध्ययन करेंगे।`)}
                    className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-110 transition"
                  >
                    <Play className="w-10 h-10 fill-white ml-1" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white">Click Play to Watch Video Lesson 1</h4>
                  <p className="text-xs text-slate-300">High Definition Video with Native {activePlayCourse.languageEng} Explanations</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 z-10 border-t border-white/10 pt-3">
                  <span>Playback Speed: 1.0x</span>
                  <span>Subtitles: Hindi & {activePlayCourse.languageEng}</span>
                </div>
              </div>

              {/* Day-by-Day Paced Curriculum Box (<30 Mins / Day) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">DAY-BY-DAY PACED CURRICULUM • UNDER 30 MINS / DAY</span>
                    <h4 className="text-base font-black text-slate-900">7-Day Express Daily Schedule Roadmap</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                    ⚡ 7-Day Fast Track • ~22 Mins / Day
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
                  {[
                    { day: 1, title: 'Script & Sound', time: '18 Mins', level: 'L1: Starter', icon: '📖' },
                    { day: 2, title: 'Greetings & Words', time: '20 Mins', level: 'L1: Starter', icon: '💬' },
                    { day: 3, title: 'SOV Sentence', time: '25 Mins', level: 'L2: Basic', icon: '🧩' },
                    { day: 4, title: 'Writing Practice', time: '20 Mins', level: 'L2: Basic', icon: '✍️' },
                    { day: 5, title: 'Speaking AI', time: '25 Mins', level: 'L3: Fluent', icon: '🗣️' },
                    { day: 6, title: 'Listening Audio', time: '20 Mins', level: 'L3: Fluent', icon: '🎧' },
                    { day: 7, title: 'Final Exam', time: '30 Mins', level: 'L4: Master', icon: '📜' }
                  ].map((item) => (
                    <div
                      key={item.day}
                      onClick={() => setActiveDayLesson(item.day)}
                      className={`p-3 rounded-2xl border cursor-pointer transition space-y-1 ${
                        activeDayLesson === item.day
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-extrabold">
                        <span>Day {item.day} {item.icon}</span>
                        <span className={activeDayLesson === item.day ? 'text-blue-100' : 'text-slate-500'}>{item.time}</span>
                      </div>
                      <h5 className="font-bold text-[11px] line-clamp-1">{item.title}</h5>
                      <span className={`text-[9px] font-extrabold uppercase block ${activeDayLesson === item.day ? 'text-blue-200' : 'text-blue-600'}`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Video Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <>
                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video1Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-blue-600">Video 1</span>
                          {prog.video1Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Devanagari Alphabet & Phonetics</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video1Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video1Done ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          {prog.video1Done ? '✓ Finished' : 'Mark Video 1 Finished'}
                        </button>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video2Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-blue-600">Video 2</span>
                          {prog.video2Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">SOV Sentence Construction</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video2Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video2Done ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          {prog.video2Done ? '✓ Finished' : 'Mark Video 2 Finished'}
                        </button>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video3Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-blue-600">Video 3</span>
                          {prog.video3Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Spoken Conversational Fluency</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video3Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video3Done ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          {prog.video3Done ? '✓ Finished' : 'Mark Video 3 Finished'}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setCourseStepTab('reading')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 2: Reading Text →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: READING TEXT */}
          {courseStepTab === 'reading' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">STEP 2 OF 5 • READING COMPREHENSION & TEXT</span>
                  <h3 className="text-xl font-black text-slate-900">पठन एवं पाठ्य सामग्री (Reading Text Passage)</h3>
                  <p className="text-xs text-slate-500">Read the Devanagari passage and review comparative vocabulary notes.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
                <h4 className="text-base font-bold text-blue-900">पाठ १: भारत और भाषा संगम (Lesson Reading Passage)</h4>
                <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <p>
                    भारत एक बहुभाषी देश है। यहाँ भिन्न-भिन्न राज्यों में अनेक सुंदर भाषाएँ बोली जाती हैं। {activePlayCourse.languageEng} भाषियों के लिए हिंदी सीखना अत्यंत सरल है क्योंकि दोनों भाषाओं के वाक्य विन्यास में गहरी समानता है।
                  </p>
                  <p>
                    व्याकरण नियम: हिंदी में कर्ता (Subject), कर्म (Object), और क्रिया (Verb) का क्रम होता है। उदाहरण: &quot;मैं हिंदी पढ़ता हूँ।&quot;
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Native ({activePlayCourse.languageEng})</span>
                    <span className="font-bold text-slate-900">{activePlayCourse.cognateExample.native}</span>
                    <span className="text-blue-600 block font-bold">➔ {activePlayCourse.cognateExample.hindi}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Gratitude</span>
                    <span className="font-bold text-slate-900">Thanks</span>
                    <span className="text-blue-600 block font-bold">➔ धन्यवाद (Dhanyavaad)</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Student</span>
                    <span className="font-bold text-slate-900">Learner</span>
                    <span className="text-blue-600 block font-bold">➔ छात्र / विद्यार्थी (Chhatra)</span>
                  </div>
                </div>
              </div>

              {(() => {
                const prog = getStepProgress(activePlayCourse.id);
                return (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => updateCourseProgress(activePlayCourse.id, { readingCompleted: true })}
                      className={`px-6 py-3 rounded-xl font-bold text-xs transition ${
                        prog.readingCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300'
                      }`}
                    >
                      {prog.readingCompleted ? '✓ Reading Text Completed' : 'Mark Reading Text as Completed'}
                    </button>

                    <button
                      onClick={() => setCourseStepTab('writing')}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                    >
                      Proceed to Step 3: Written Test →
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* STEP 3: WRITTEN TEST */}
          {courseStepTab === 'writing' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">STEP 3 OF 5 • WRITTEN TEST EXERCISE</span>
                  <h3 className="text-xl font-black text-slate-900">लिखित परीक्षा एवं अभ्यास (Written Test Exercise)</h3>
                  <p className="text-xs text-slate-500">Type or write a short self-introduction sentence in Devanagari Hindi.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <span className="font-bold block">Writing Prompt:</span>
                  <p>Write a sentence in Hindi introducing yourself (e.g. &quot;नमस्ते, मेरा नाम... है और मैं हिंदी सीख रहा हूँ।&quot;)</p>
                </div>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="space-y-3">
                      <textarea
                        rows={4}
                        placeholder="Type your Hindi answer here (e.g. नमस्ते! मेरा नाम आरव है।)..."
                        value={prog.writingAnswer}
                        onChange={(e) => updateCourseProgress(activePlayCourse.id, { writingAnswer: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 font-bold">Quick Insertion Bar:</span>
                        {['नमस्ते', 'धन्यवाद', 'मेरा नाम', 'मैं सीख रहा हूँ', 'शुभ प्रभात'].map((word, i) => (
                          <button
                            key={i}
                            onClick={() => updateCourseProgress(activePlayCourse.id, { writingAnswer: (prog.writingAnswer + ' ' + word).trim() })}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                          >
                            + {word}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          onClick={() => {
                            if (!prog.writingAnswer.trim()) {
                              alert('Please write a short sentence before submitting.');
                              return;
                            }
                            updateCourseProgress(activePlayCourse.id, { writingCompleted: true });
                            alert('Written test submitted successfully!');
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-xs transition ${
                            prog.writingCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                          }`}
                        >
                          {prog.writingCompleted ? '✓ Written Test Submitted' : 'Submit Written Test'}
                        </button>

                        <button
                          onClick={() => setCourseStepTab('listening')}
                          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                        >
                          Proceed to Step 4: Listening Test →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* GUIDED STUDY MATERIALS STEP */}
          {courseStepTab === 'guided-learning' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">OFFICIAL DIGITAL STUDY MODULES & INFOGRAPHICS</span>
                  <h3 className="text-xl font-black text-slate-900">गाइडेड अध्ययन सामग्री पुस्तकालय ({activePlayCourse.languageEng})</h3>
                  <p className="text-xs text-slate-500">Download official NIOS & National Faculty study guides, presentations, and course notes.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 text-center border border-slate-800">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2 flex items-center justify-center shadow-md">
                    <span className="font-black text-blue-900 text-base leading-none">NIOS</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">DIGITAL LEARNING MODULE</span>
                    <h4 className="text-sm font-extrabold text-white">Study Material Library for {activePlayCourse.languageEng} Learners</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    Curated course notes, infographics, and research presentations prepared by National Faculty.
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  {[
                    { mod: 1, title: `Module 1: Devanagari Script & ${activePlayCourse.languageEng} Phonetic Rules`, size: '4.2 MB' },
                    { mod: 2, title: `Module 2: SOV Grammar & Verb Conjugations for ${activePlayCourse.languageEng} Speakers`, size: '5.8 MB' },
                    { mod: 3, title: `Module 3: Everyday Dialogues & Comparative Cognate Dictionary`, size: '3.6 MB' },
                    { mod: 4, title: `Module 4: Writing Drills & Common Spelling Correction Tables`, size: '4.9 MB' },
                    { mod: 5, title: `Module 5: Final Assessment Model Question Papers & Solved Keys`, size: '8.2 MB' }
                  ].map((m) => (
                    <div key={m.mod} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 block">MODULE {m.mod}</span>
                          <h5 className="font-extrabold text-xs text-slate-900">{m.title}</h5>
                          <span className="text-[10px] text-slate-500 font-medium">Official PDF • {m.size}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`📥 Downloading Module ${m.mod} PDF Study Guide...`)}
                        className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0"
                      >
                        STUDY MATERIAL <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setCourseStepTab('listening')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 4: Listening Test →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LISTENING TEST */}
          {courseStepTab === 'listening' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">STEP 4 OF 5 • LISTENING AUDIO COMPREHENSION</span>
                  <h3 className="text-xl font-black text-slate-900">श्रवण परीक्षा (Listening Test Exercise)</h3>
                  <p className="text-xs text-slate-500">Listen to the spoken Hindi conversation clip and select correct answers.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playAudio('नमस्ते! मेरा नाम कबीर है और मैं केंद्रीय हिंदी संस्थान में अध्यापक हूँ। आज की कक्षा में आपका स्वागत है।')}
                    className="w-14 h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-md transition"
                  >
                    <Volume2 className="w-7 h-7 fill-white ml-0.5" />
                  </button>
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase block">Audio Clip #1</span>
                    <h4 className="text-base font-bold text-slate-900">Listen carefully to the instructor speech</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Click speaker button to play speech audio</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Question 1: What is the profession of the audio speaker?</h4>
                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="space-y-2">
                      {['Doctor / चिकित्सक', 'Teacher / अध्यापक', 'Engineer / अभियंता', 'Student / छात्र'].map((opt, i) => (
                        <label
                          key={i}
                          onClick={() => updateCourseProgress(activePlayCourse.id, { listeningAnswer: i + 1 })}
                          className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer font-bold transition ${
                            prog.listeningAnswer === i + 1
                              ? 'bg-purple-50 border-purple-500 text-purple-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input type="radio" checked={prog.listeningAnswer === i + 1} readOnly className="text-purple-600" />
                          <span>{opt}</span>
                        </label>
                      ))}

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <button
                          onClick={() => {
                            if (prog.listeningAnswer === 0) {
                              alert('Please select an answer first.');
                              return;
                            }
                            updateCourseProgress(activePlayCourse.id, { listeningCompleted: true });
                            alert('Listening test submitted successfully!');
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-xs transition ${
                            prog.listeningCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                          }`}
                        >
                          {prog.listeningCompleted ? '✓ Listening Test Submitted' : 'Submit Listening Test'}
                        </button>

                        <button
                          onClick={() => setCourseStepTab('exam')}
                          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                        >
                          Proceed to Step 5: Final Exam →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* STEP 5: FINAL EXAM ASSESSMENT */}
          {courseStepTab === 'exam' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">STEP 5 OF 5 • FINAL CERTIFICATION EXAM ASSESSMENT</span>
                  <h3 className="text-xl font-black text-slate-900">अंतिम मूल्यांकन परीक्षा (Final Course Exam)</h3>
                  <p className="text-xs text-slate-500">Complete this final assessment exam to unlock your official verified certificate.</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 font-medium">
                  📝 Exam Rules: Complete all questions across vocabulary, reading & grammar to receive your Government & NIOS Accredited Certificate.
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Q1: Which Hindi word means &quot;Thank You&quot;?</span>
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span className="p-2.5 bg-white border border-slate-200 rounded-xl">1. नमस्ते (Namaste)</span>
                      <span className="p-2.5 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl">2. धन्यवाद (Dhanyavaad) ✓</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Q2: What is the word order in Hindi sentence construction?</span>
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span className="p-2.5 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl">1. Subject + Object + Verb (SOV) ✓</span>
                      <span className="p-2.5 bg-white border border-slate-200 rounded-xl">2. Verb + Subject + Object</span>
                    </div>
                  </div>
                </div>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        {prog.examCompleted && (
                          <span className="text-xs font-bold text-emerald-600">
                            🎉 Exam Passed! Final Score: {prog.examScore}% (Grade A+ Distinction)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          updateCourseProgress(activePlayCourse.id, {
                            video1Done: true,
                            video2Done: true,
                            video3Done: true,
                            readingCompleted: true,
                            writingCompleted: true,
                            listeningCompleted: true,
                            examCompleted: true,
                            examScore: 96.5
                          });
                          try {
                            confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
                          } catch (e) {
                            console.log('Confetti triggered');
                          }
                          setCourseStepTab('certificate');
                        }}
                        className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                      >
                        {prog.allFinished ? 'View Unlocked Certificate →' : 'Submit Exam & Generate Certificate →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* STEP 6: FINAL UNLOCKED CERTIFICATE PAGE */}
          {courseStepTab === 'certificate' && (
            <div className="space-y-6">
              {/* Premium Printable Certificate Component */}
              <div className="p-8 sm:p-12 rounded-3xl bg-white border-8 border-double border-amber-600 shadow-2xl text-center space-y-6 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-500 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                    <Award className="w-10 h-10 text-amber-600" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-amber-700 block">
                    KENDRIYA HINDI SANSTHAN & NIOS ACCREDITED
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                    प्रमाण पत्र (CERTIFICATE OF PROFICIENCY)
                  </h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Official Government Accredited Hindi Language Learning Diploma
                  </p>
                </div>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  <p className="italic">This is to certify that</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-900 border-b-2 border-slate-200 pb-1 inline-block">
                    {user?.name || 'Aarav Sharma (आरव शर्मा)'}
                  </h3>
                  <p>
                    has successfully completed all 5 course learning modules (Videos, Reading Text, Writing Exercise, Listening Comprehension, and Final Exam Assessment) for:
                  </p>
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 font-extrabold text-base text-amber-950">
                    &quot;{activePlayCourse.titleHindi}&quot;
                    <span className="block text-xs font-medium text-amber-800 mt-0.5">({activePlayCourse.titleEng})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs text-center max-w-2xl mx-auto">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">FINAL EXAM SCORE</span>
                    <span className="font-black text-emerald-600 text-base">96.5%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">ACADEMIC GRADE</span>
                    <span className="font-black text-blue-600 text-base">A+ Distinction</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">CERTIFICATE ID</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">HLMS-2026-IND-981240</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left border-t border-slate-200 text-xs">
                  <div className="space-y-1">
                    <span className="font-serif italic font-bold text-slate-900 block">डॉ. देवेन्द्र शर्मा</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Director of Academics</span>
                  </div>

                  <div className="text-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hindi-lms.org/certificates/verify/HLMS-2026-IND-981240"
                      alt="Verified QR Code"
                      className="w-16 h-16 mx-auto rounded-lg border border-slate-300 p-1 bg-white"
                    />
                    <span className="text-[9px] text-slate-400 block mt-1">Scan to Verify Authenticity</span>
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="font-serif italic font-bold text-slate-900 block">आचार्य आरव शास्त्री</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Chief Examiner</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  🖨️ Print Official Certificate
                </button>

                <button
                  onClick={() => alert('Downloading official high-resolution PDF Certificate...')}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  📥 Download PDF Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* NORMAL PAGE TABS & CATALOGUE VIEW */
        <>
          {/* 1. Hero Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-700/30">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black tracking-widest uppercase border border-blue-400/30 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> 22 Scheduled Indian Languages Portal
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  NEP 2020 & Bhasha Sangam Aligned
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  अपनी मातृभाषा से हिंदी सीखें <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
                    Learn Hindi from 22 Official Indian Languages
                  </span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                  Explore dedicated Hindi courses crafted for speakers of Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu, Sanskrit and more. Register today to track your progress & access interactive AI multi-lingual tools!
                </p>
              </div>

              {/* Quick Stats bar */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Available Courses</span>
                  <span className="text-lg font-black text-white">22 Languages</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Total Registered Learners</span>
                  <span className="text-lg font-black text-amber-300">5.2 Lakh+</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">My Enrolled Courses</span>
                  <span className="text-lg font-black text-emerald-400">{user?.enrolledCourses?.length || 0} Courses</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Learning Methodology</span>
                  <span className="text-lg font-black text-cyan-300">SOV & Cognate AI Bridge</span>
                </div>
              </div>
            </div>
          </div>

      {/* 2. Main Navigation Bar inside Page */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" /> All 22 Language Courses
          </button>

          <button
            onClick={() => setActiveTab('my-courses')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 relative ${
              activeTab === 'my-courses'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookMarked className="w-4 h-4" /> My Enrolled Courses
            {enrolledCoursesList.length > 0 && (
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'my-courses' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'
                }`}
              >
                {enrolledCoursesList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeTab === 'ideas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-300" /> Innovative Learning Ideas & Tools
          </button>

          <button
            onClick={() => setActiveTab('bridge')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeTab === 'bridge'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Cognate & Etymology Bridge
          </button>
        </div>

        {/* Search Input */}
        {activeTab !== 'ideas' && activeTab !== 'bridge' && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search language, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW 1: MY ENROLLED COURSES SECTION ("मेरे पंजीकृत कोर्स") */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'my-courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-blue-600" /> मेरे पंजीकृत हिंदी कोर्स (My Enrolled Hindi Courses)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Track your active Hindi learning courses registered from your regional Indian language.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs flex items-center gap-1.5 transition"
            >
              + Enroll in New Language Course
            </button>
          </div>

          {enrolledCoursesList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900">No Courses Registered Yet</h3>
                <p className="text-xs text-slate-500">
                  Select your native language from the 22 Indian languages list below and click &quot;Register / Enroll Now&quot; to begin learning Hindi!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('all')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                Browse 22 Language Courses →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesList.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className={`p-6 bg-gradient-to-r ${course.bannerGradient} text-white space-y-3 relative`}>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                        {course.languageEng} ({course.languageNative})
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-900 text-[10px] font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Enrolled
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black leading-tight text-white">{course.titleHindi}</h3>
                      <p className="text-xs text-white/80 font-medium mt-1">{course.titleEng}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Active Module Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-700">Course Progress</span>
                          <span className="text-blue-600">35% Completed</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-1/3 transition-all duration-500" />
                        </div>
                      </div>

                      {/* Current Lesson Badge */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 fill-blue-600" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Next Active Lesson</span>
                          <span className="text-xs font-bold text-slate-900 block line-clamp-1">
                            Lesson 4: Daily Conversation & Greetings in Devanagari
                          </span>
                        </div>
                      </div>

                      {/* Cognate bridge preview */}
                      <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs">
                        <span className="text-[10px] font-bold text-amber-700 uppercase block mb-1">
                          Native Bridge Pair
                        </span>
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{course.cognateExample.native} ({course.cognateExample.nativePhonetics})</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-amber-900">{course.cognateExample.hindi}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => setActivePlayCourse(course)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                      >
                        <Play className="w-4 h-4 fill-white" /> Continue Course
                      </button>

                      <button
                        onClick={() => handleUnenroll(course.id)}
                        className="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition"
                        title="Unenroll course"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 2: ALL 22 INDIAN LANGUAGE COURSES CATALOGUE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'South Indian', 'East & North-East', 'West & Central', 'North & Himalayan', 'Classical & Regional'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of 22 Language Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrolled = isEnrolled(course.id);

              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Gradient Header */}
                  <div className={`p-6 bg-gradient-to-r ${course.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                        {course.languageEng} • {course.region}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-xs">
                        {course.badge}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1">
                      <span className="text-2xl font-black block text-amber-200">
                        {course.languageNative}
                      </span>
                      <h3 className="text-base font-black text-white leading-tight">
                        {course.titleHindi}
                      </h3>
                      <p className="text-xs text-white/80 font-medium line-clamp-1">{course.titleEng}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {course.description}
                    </p>

                    {/* Bridge Cognate Preview Box */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs space-y-1">
                      <span className="text-[10px] font-extrabold text-blue-600 uppercase block tracking-wider">
                        Cognate Bridge ({course.languageEng} ➔ Hindi)
                      </span>
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{course.cognateExample.native} ({course.cognateExample.nativePhonetics})</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-900">{course.cognateExample.hindi}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block italic">Meaning: {course.cognateExample.meaning}</span>
                    </div>

                    {/* Course Stats row */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[11px]">
                      <div>
                        <span className="text-slate-400 block font-medium">Modules</span>
                        <span className="font-extrabold text-slate-800">{course.totalModules} Units</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Students</span>
                        <span className="font-extrabold text-slate-800">{(course.totalStudents / 1000).toFixed(1)}k</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Rating</span>
                        <span className="font-extrabold text-amber-600 flex items-center justify-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourseModal(course)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                      >
                        Syllabus
                      </button>

                      {enrolled ? (
                        <button
                          onClick={() => {
                            setActiveTab('my-courses');
                            setActivePlayCourse(course);
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Enrolled • Continue
                        </button>
                      ) : (
                        <button
                          onClick={() => setCheckoutCourse(course)}
                          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition hover:scale-102"
                        >
                          Register / Enroll Now <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 3: INNOVATIVE IDEAS FOR LEARNING LANGUAGES SECTION */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ideas' && (
        <div className="space-y-10">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-7 h-7 text-amber-500 fill-amber-500 animate-pulse" /> 
              भाषा सीखने के नवीन विचार एवं उपकरण (Innovative Ideas for Language Learning)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Explore 6 multi-modal, gamified, and AI-powered learning methods designed to bridge any Indian regional language to Hindi fluency.
            </p>
          </div>

          {/* Grid of 6 Learning Methodologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Idea 1: Cognate & Etymology Bridge */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">IDEA #1 • LINGUISTIC MAP</span>
                <h3 className="text-lg font-bold text-slate-900">Cognate & Etymology Bridge (समानार्थक शब्द सेतु)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Over 60% of Hindi formal words share identical Sanskrit (Tatsama) roots with South Indian, Eastern, and Western Indian languages. Map shared roots to bypass basic vocabulary building!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('bridge')}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
              >
                Try Comparative Cognate Tool →
              </button>
            </div>

            {/* Idea 2: Interactive SOV Sentence Builder */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">IDEA #2 • GAMIFIED SYNTAX</span>
                <h3 className="text-lg font-bold text-slate-900">SOV Word Order Puzzle (वाक्य निर्माण खेल)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Unlike English (SVO: I eat rice), Indian languages use Subject-Object-Verb (SOV: Naan Sadham Saapidugiren / Main Chaaval Khaata Hoon). Drag & drop word blocks to build Hindi sentences naturally!
                </p>
              </div>
              <a
                href="#sov-game"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs text-center block transition"
              >
                Play Sentence Puzzle Below ↓
              </a>
            </div>

            {/* Idea 3: Bilingual Audio & Speech Companion */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">IDEA #3 • AUDIO PHONETICS</span>
                <h3 className="text-lg font-bold text-slate-900">Bilingual Voice Tutor (द्विभाषी ध्वनि सहायक)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Hear phrases spoken first in your native accent (e.g. Tamil or Bengali) followed by clear Hindi Devanagari pronunciation with instant accent scoring feedback.
                </p>
              </div>
              <a
                href="#voice-tutor"
                className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs text-center block transition"
              >
                Test Voice Tutor Below ↓
              </a>
            </div>

            {/* Idea 4: Daily 3D Micro-Flashcards */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-amber-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">IDEA #4 • MEMORY RETENTION</span>
                <h3 className="text-lg font-bold text-slate-900">Daily 5-Min Micro-Flashcards (दैनिक शब्द कार्ड)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Flip interactive flashcards daily to learn 5 essential Hindi conversational words mapped directly to your native language daily!
                </p>
              </div>
              <a
                href="#flashcards"
                className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs text-center block transition"
              >
                Practice Flashcards Below ↓
              </a>
            </div>

            {/* Idea 5: Cultural Idioms & Proverbs Matcher */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-rose-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider">IDEA #5 • FOLKLORE & IDIOMS</span>
                <h3 className="text-lg font-bold text-slate-900">Cultural Idioms Matcher (लोककथा और मुहावरे)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Learn Hindi proverbs by connecting them to equivalent regional folk wisdom (e.g. Tamil, Bengali & Marathi proverbs mapped to Hindi muhavare).
                </p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-[11px] font-medium text-slate-700">
                &quot;சுவர் இருந்தால் தான் சித்திரம்&quot; ➔ &quot;जान है तो जहान है&quot;
              </div>
            </div>

            {/* Idea 6: Bhasha Sangam Peer Exchange */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-cyan-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 tracking-wider">IDEA #6 • COMMUNITY PAIRING</span>
                <h3 className="text-lg font-bold text-slate-900">Bhasha Sangam Peer Lounge (भाषा संगम मंच)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Connect 1-on-1 with native Hindi speakers who are learning your regional Indian language for tandem language exchange!
                </p>
              </div>
              <button
                onClick={() => alert('Bhasha Sangam Peer Room Matchmaker active! Connecting with tandem Hindi practice partners...')}
                className="w-full py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold text-xs transition"
              >
                Join Tandem Lounge →
              </button>
            </div>
          </div>

          {/* Interactive Demo Showcase 1: SOV Word Order Puzzle */}
          <div id="sov-game" className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                  INTERACTIVE IDEA DEMO #1
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">SOV Word Order Reorder Game</h3>
                <p className="text-xs text-slate-400">
                  Assemble Hindi sentence tokens matching Dravidian/Indo-Aryan sentence structure.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
                  Score: {gameScore} XP
                </span>
              </div>
            </div>

            {!gameFinished ? (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase block">
                    Source Language Sentence ({currentGame.nativeLang})
                  </span>
                  <p className="text-base font-bold text-white">{currentGame.nativeSentence}</p>
                  <p className="text-xs text-slate-400">English: &quot;{currentGame.englishTranslation}&quot;</p>
                </div>

                {/* Target Sentence Dropzone */}
                <div className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/40 min-h-[70px] flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500 mr-2">Constructed Hindi Sentence:</span>
                  {userSentenceTokens.length === 0 ? (
                    <span className="text-xs italic text-slate-600">Click word blocks below to insert here...</span>
                  ) : (
                    userSentenceTokens.map((token, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRemoveToken(token)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-rose-600 text-white font-bold text-sm flex items-center gap-1.5 shadow-sm transition"
                      >
                        {token} <X className="w-3.5 h-3.5" />
                      </button>
                    ))
                  )}
                </div>

                {/* Word Blocks Bank */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 block">Available Word Blocks:</span>
                  <div className="flex flex-wrap gap-3">
                    {currentGame.shuffledTokens.map((token, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddToken(token)}
                        disabled={userSentenceTokens.includes(token)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                          userSentenceTokens.includes(token)
                            ? 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                        }`}
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-amber-300 font-medium italic">💡 Hint: {currentGame.hint}</span>
                  <button
                    onClick={handleCheckSentence}
                    disabled={userSentenceTokens.length === 0}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-xs uppercase tracking-wider shadow-md transition disabled:opacity-50"
                  >
                    Check & Listen Audio ✓
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <Award className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="text-2xl font-black text-white">Congratulations! Game Completed!</h4>
                <p className="text-xs text-slate-300">You earned {gameScore} XP building Hindi sentences!</p>
                <button
                  onClick={() => {
                    setGameIndex(0);
                    setGameFinished(false);
                    setUserSentenceTokens([]);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          {/* Interactive Demo Showcase 2: Voice & Pronunciation Tutor */}
          <div id="voice-tutor" className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-wider">
                  INTERACTIVE IDEA DEMO #2
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Bilingual Voice & Pronunciation Companion</h3>
                <p className="text-xs text-slate-500">Listen to native audio and test your Hindi voice clarity.</p>
              </div>
              <button
                onClick={() => playAudio('नमस्ते, भारत में आपका स्वागत है')}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4" /> Listen Native Model
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Practice Target Sentence</span>
              <h4 className="text-2xl font-black text-slate-900">
                &quot;नमस्ते! मैं अपनी मातृभाषा से हिंदी सीख रहा हूँ।&quot;
              </h4>
              <p className="text-xs text-slate-500 italic">
                (Namaste! Main apni maatribhasha se Hindi seekh raha hoon)
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleSimulateSpeaking}
                  disabled={speakingRecording}
                  className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-md ${
                    speakingRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  {speakingRecording ? 'Listening to your voice...' : 'Speak & Score Pronunciation'}
                </button>
              </div>

              {speakingScore !== null && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
                  🎉 AI Accuracy Score: <span className="text-lg font-black">{speakingScore}%</span> • Excellent Devanagari vowel clarity!
                </div>
              )}
            </div>
          </div>

          {/* Interactive Demo Showcase 3: Daily 3D Flashcards */}
          <div id="flashcards" className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                  INTERACTIVE IDEA DEMO #3
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Daily 3D Micro Flashcard Deck</h3>
                <p className="text-xs text-slate-500">Click card to flip and reveal Hindi translation & example.</p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Card {flashcardIndex + 1} of {FLASHCARDS.length}
              </span>
            </div>

            <div className="max-w-md mx-auto">
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="w-full h-64 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white p-8 cursor-pointer shadow-xl flex flex-col justify-between transition-transform duration-300 hover:scale-102 relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 font-bold backdrop-blur-xs">
                    {FLASHCARDS[flashcardIndex].category}
                  </span>
                  <span className="text-amber-100 text-[11px] font-semibold">Click to Flip 🔄</span>
                </div>

                {!cardFlipped ? (
                  <div className="text-center space-y-2 my-auto">
                    <span className="text-xs text-white/80 block uppercase font-extrabold tracking-widest">
                      {FLASHCARDS[flashcardIndex].nativeTitle}
                    </span>
                    <h3 className="text-3xl font-black">{FLASHCARDS[flashcardIndex].nativeWord}</h3>
                  </div>
                ) : (
                  <div className="text-center space-y-2 my-auto animate-in fade-in">
                    <span className="text-xs text-amber-200 block uppercase font-black tracking-widest">
                      Hindi Equivalent
                    </span>
                    <h3 className="text-3xl font-black">{FLASHCARDS[flashcardIndex].hindiWord}</h3>
                    <p className="text-xs text-white/90 font-medium">({FLASHCARDS[flashcardIndex].transliteration})</p>
                    <p className="text-xs text-amber-100 italic mt-2 bg-black/20 p-2 rounded-xl">
                      &quot;{FLASHCARDS[flashcardIndex].exampleHindi}&quot;
                    </p>
                  </div>
                )}

                <div className="text-center text-[10px] text-white/70">
                  {cardFlipped ? 'Showing Hindi Side' : 'Showing Native Language Side'}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => {
                    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : FLASHCARDS.length - 1));
                    setCardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  ← Previous
                </button>

                <button
                  onClick={() => playAudio(FLASHCARDS[flashcardIndex].hindiWord)}
                  className="p-2 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100"
                  title="Play audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setFlashcardIndex((prev) => (prev < FLASHCARDS.length - 1 ? prev + 1 : 0));
                    setCardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Next Card →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 4: COGNATE & ETYMOLOGY COMPARATIVE BRIDGE TAB */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'bridge' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600" /> शब्दावली व व्याकरण तुलनात्मक सेतु (Comparative Cognate Bridge)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Compare common words across all major Indian language families side-by-side with Hindi.
            </p>
          </div>

          {/* Comparative Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Concept / Meaning</th>
                    <th className="p-4 bg-blue-50/70 text-blue-900 font-black">Hindi (हिंदी)</th>
                    <th className="p-4">Sanskrit Root</th>
                    <th className="p-4">Tamil (தமிழ்)</th>
                    <th className="p-4">Telugu (తెలుగు)</th>
                    <th className="p-4">Bengali (বাংলা)</th>
                    <th className="p-4">Marathi (मराठी)</th>
                    <th className="p-4 text-center">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {COMPARATIVE_COGNATES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-bold text-slate-900">{item.wordEng}</td>
                      <td className="p-4 bg-blue-50/40 font-black text-blue-900 text-sm">{item.hindi}</td>
                      <td className="p-4 text-slate-500 italic">{item.sanskrit}</td>
                      <td className="p-4">{item.tamil}</td>
                      <td className="p-4">{item.telugu}</td>
                      <td className="p-4">{item.bengali}</td>
                      <td className="p-4">{item.marathi}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => playAudio(item.audioText)}
                          className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                          title="Listen Hindi Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: SYLLABUS & REGISTRATION DETAIL MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                  {selectedCourseModal.languageEng} ➔ Hindi Course Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCourseModal.titleHindi}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCourseModal.description}
            </p>

            {/* Course Features Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Curriculum Structure</span>
                <span className="font-bold text-slate-900">{selectedCourseModal.totalModules} Units • {selectedCourseModal.totalLessons} Lessons</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Target Fluency</span>
                <span className="font-bold text-slate-900">{selectedCourseModal.difficulty}</span>
              </div>
            </div>

            {/* Sample Lesson List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Sample Module Roadmap:</span>
              <div className="space-y-1.5 text-xs font-medium text-slate-600">
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                  <span>Unit 1: Alphabet & Devanagari Sound Comparison</span>
                  <span className="text-blue-600 font-bold">Free Preview</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>Unit 2: Subject-Object-Verb (SOV) Sentence Construction</span>
                  <span className="text-slate-400">Locked</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>Unit 3: Formal Greetings & Polite Conversational Phrases</span>
                  <span className="text-slate-400">Locked</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>

              {isEnrolled(selectedCourseModal.id) ? (
                <button
                  onClick={() => {
                    setSelectedCourseModal(null);
                    setActiveTab('my-courses');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Go to My Enrolled Class →
                </button>
              ) : (
                <button
                  onClick={() => {
                    const targetCourse = selectedCourseModal;
                    setSelectedCourseModal(null);
                    setCheckoutCourse(targetCourse);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  Proceed to Registration & Payment <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: PAYMENT CHECKOUT & COURSE REGISTRATION MODAL */}
      {/* ------------------------------------------------------------- */}
      {checkoutCourse && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                    SECURE REGISTRATION GATEWAY • RAZORPAY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Course Payment & Enrollment Checkout
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setCheckoutCourse(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccessInvoice ? (
              /* SUCCESS RECEIPT STATE */
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    PAYMENT SUCCESSFUL & ENROLLED
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You have successfully enrolled in <span className="font-bold text-slate-800">&quot;{checkoutCourse.titleHindi}&quot;</span>. Your official receipt and learning pathway are now unlocked!
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 max-w-md mx-auto text-left">
                  <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-900">
                    <span>Receipt Invoice ID:</span>
                    <span className="font-mono text-blue-600">{paymentSuccessInvoice}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Course Registered:</span>
                    <span className="font-semibold text-slate-800">{checkoutCourse.languageEng} ({checkoutCourse.languageNative})</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Student Name:</span>
                    <span className="font-semibold text-slate-800">{user?.name || 'Aarav Sharma'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Payment Gateway:</span>
                    <span className="font-semibold text-slate-800">{paymentMethod === 'scholarship' ? 'Govt Bhasha Subsidy (₹0)' : 'UPI / Razorpay'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200 font-black text-slate-900">
                    <span>Total Amount Paid:</span>
                    <span className="text-emerald-600">
                      {paymentPlan === 'scholarship' || couponApplied ? '₹0 (100% Free Scholarship)' : paymentPlan === 'pro' ? '₹1,178' : '₹588'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleFinishCheckout}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                >
                  Go to My Enrolled Courses →
                </button>
              </div>
            ) : (
              /* CHECKOUT PAYMENT FORM STATE */
              <div className="space-y-6">
                {/* 1. Selected Course Summary Banner */}
                <div className={`p-5 rounded-2xl bg-gradient-to-r ${checkoutCourse.bannerGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white font-extrabold uppercase">
                      {checkoutCourse.languageEng} ({checkoutCourse.languageNative})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                      {checkoutCourse.totalModules} Units • Certificate Included
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{checkoutCourse.titleHindi}</h3>
                  <p className="text-xs text-white/80 line-clamp-1">{checkoutCourse.titleEng}</p>
                </div>

                {/* 2. Select Batch / Plan */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                    1. Select Learning Batch & Access Plan:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div
                      onClick={() => {
                        setPaymentPlan('standard');
                        if (paymentMethod === 'scholarship') setPaymentMethod('upi');
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition space-y-1 ${
                        paymentPlan === 'standard'
                          ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-extrabold text-slate-900">
                        <span>Standard Batch</span>
                        <span className="text-blue-600 font-black">₹499</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Full Course Access + Devanagari Worksheets + NIOS Certificate</p>
                    </div>

                    <div
                      onClick={() => {
                        setPaymentPlan('pro');
                        if (paymentMethod === 'scholarship') setPaymentMethod('upi');
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition space-y-1 ${
                        paymentPlan === 'pro'
                          ? 'border-purple-600 bg-purple-50/60 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-extrabold text-slate-900">
                        <span>Pro AI Tutor</span>
                        <span className="text-purple-600 font-black">₹999</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Includes AI Speech Coach + 1-on-1 Live Class Mentorship</p>
                    </div>

                    <div
                      onClick={() => {
                        setPaymentPlan('scholarship');
                        setPaymentMethod('scholarship');
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition space-y-1 ${
                        paymentPlan === 'scholarship'
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-extrabold text-slate-900">
                        <span>Govt Subsidy</span>
                        <span className="text-emerald-600 font-black">₹0 FREE</span>
                      </div>
                      <p className="text-[11px] text-slate-500">100% Free Ministry of Education Student Bhasha Grant</p>
                    </div>
                  </div>
                </div>

                {/* 3. Promo / Coupon Code Section */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" /> Have a Coupon or Scholarship Code?
                    </span>
                    <button
                      onClick={() => {
                        setCouponCode('BHASHA2026');
                        setCouponApplied(true);
                      }}
                      className="text-[11px] font-extrabold text-blue-600 hover:underline"
                    >
                      Use &quot;BHASHA2026&quot; (100% OFF)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. BHASHA2026)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        if (couponApplied) setCouponApplied(false);
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (couponCode.trim().length > 0) {
                          setCouponApplied(true);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      {couponApplied ? 'Applied ✓' : 'Apply Coupon'}
                    </button>
                  </div>

                  {couponApplied && (
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Coupon &quot;{couponCode}&quot; Applied! 100% Scholarship discount added.
                    </div>
                  )}
                </div>

                {/* 4. Payment Method Selection */}
                {paymentPlan !== 'scholarship' && !couponApplied && (
                  <div className="space-y-3">
                    <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                      2. Choose Payment Method:
                    </label>

                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
                      <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                          paymentMethod === 'upi' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5" /> UPI / QR Code
                      </button>
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                          paymentMethod === 'card' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Debit / Credit Card
                      </button>
                      <button
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                          paymentMethod === 'netbanking' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" /> Net Banking
                      </button>
                    </div>

                    {/* UPI Payment Pane */}
                    {paymentMethod === 'upi' && (
                      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4 text-xs">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=hindi-lms@okaxis&pn=CentralHindiInstitute&am=${paymentPlan === 'pro' ? 1178 : 588}`}
                            alt="UPI QR Code"
                            className="w-28 h-28 rounded-xl border border-slate-300 p-1 bg-white shadow-xs shrink-0"
                          />
                          <div className="space-y-2 text-center sm:text-left">
                            <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider block">
                              SCAN TO PAY WITH ANY UPI APP
                            </span>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                              <span className="px-2 py-1 bg-white rounded-lg border text-[11px] font-bold text-slate-700">Google Pay</span>
                              <span className="px-2 py-1 bg-white rounded-lg border text-[11px] font-bold text-slate-700">PhonePe</span>
                              <span className="px-2 py-1 bg-white rounded-lg border text-[11px] font-bold text-slate-700">Paytm</span>
                              <span className="px-2 py-1 bg-white rounded-lg border text-[11px] font-bold text-slate-700">BHIM UPI</span>
                            </div>
                            <p className="text-[11px] text-slate-500">Scan QR Code or enter your Virtual Payment Address (VPA) below:</p>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Virtual Payment Address (VPA / UPI ID):</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okaxis or mobile@paytm"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Card Payment Pane */}
                    {paymentMethod === 'card' && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Card Number:</label>
                          <input
                            type="text"
                            placeholder="4111 2222 3333 4444"
                            defaultValue="4532 8901 2234 9812"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Expiry Date (MM/YY):</label>
                            <input
                              type="text"
                              placeholder="08/28"
                              defaultValue="12/28"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">CVV:</label>
                            <input
                              type="password"
                              placeholder="123"
                              defaultValue="889"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Cardholder Name:</label>
                          <input
                            type="text"
                            defaultValue={user?.name || 'Aarav Sharma'}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Netbanking Pane */}
                    {paymentMethod === 'netbanking' && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <label className="text-[11px] font-bold text-slate-700 block">Select Popular Indian Bank:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((b, i) => (
                            <button
                              key={i}
                              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 font-semibold text-center text-slate-800 transition"
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Pricing Breakdown Box */}
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Course Registration Fee:</span>
                    <span className="font-bold text-slate-800">
                      {paymentPlan === 'pro' ? '₹999' : '₹499'}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Govt Education Tax (GST 18%):</span>
                    <span className="font-bold text-slate-800">
                      {paymentPlan === 'pro' ? '₹179' : '₹89'}
                    </span>
                  </div>

                  {(paymentPlan === 'scholarship' || couponApplied) && (
                    <div className="flex justify-between font-bold text-emerald-600">
                      <span>Bhasha Sangam 100% Scholarship Discount:</span>
                      <span>-{paymentPlan === 'pro' ? '₹1,178' : '₹588'}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>Total Payable Amount:</span>
                    <span className="text-lg text-blue-600 font-mono">
                      {paymentPlan === 'scholarship' || couponApplied ? '₹0 FREE' : paymentPlan === 'pro' ? '₹1,178' : '₹588'}
                    </span>
                  </div>
                </div>

                {/* Checkout Submit Button */}
                <div className="pt-2">
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition hover:scale-101 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Securing Payment Gateway...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {paymentPlan === 'scholarship' || couponApplied
                          ? 'Apply 100% Subsidy & Enroll Free'
                          : `Pay ${paymentPlan === 'pro' ? '₹1,178' : '₹588'} & Complete Course Registration`}
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-bit SSL Encrypted • Instant Course Activation & Certificate Receipt
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
