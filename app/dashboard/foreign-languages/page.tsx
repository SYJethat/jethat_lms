'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Globe,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Search,
  Award,
  Volume2,
  Mic,
  MessageSquare,
  Compass,
  CreditCard,
  QrCode,
  ShieldCheck,
  Tag,
  RefreshCw,
  X,
  FileText,
  Bookmark,
  Users,
  GraduationCap,
  Heart,
  Layers,
  Languages,
  Check,
  Radio,
  Share2,
  Printer,
  Download
} from 'lucide-react';
import { getStoredUser, enrollInCourse, unenrollFromCourse } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

interface IndianLanguageOption {
  code: string;
  nameEng: string;
  nameNative: string;
  script: string;
  sampleGreeting: string;
  sampleAudioText: string;
}

const INDIAN_LANGUAGES_22: IndianLanguageOption[] = [
  { code: 'hi', nameEng: 'Hindi', nameNative: 'हिंदी', script: 'Devanagari', sampleGreeting: 'नमस्ते! (Namaste)', sampleAudioText: 'नमस्ते! आपका भारत में स्वागत है।' },
  { code: 'ta', nameEng: 'Tamil', nameNative: 'தமிழ்', script: 'Tamil', sampleGreeting: 'வணக்கம்! (Vanakkam)', sampleAudioText: 'வணக்கம்! உங்களை வரவேற்கிறோம்.' },
  { code: 'te', nameEng: 'Telugu', nameNative: 'తెలుగు', script: 'Telugu', sampleGreeting: 'నమస్కారం! (Namaskaram)', sampleAudioText: 'నమస్కారం! స్వాగతం.' },
  { code: 'bn', nameEng: 'Bengali', nameNative: 'বাংলা', script: 'Bengali', sampleGreeting: 'নমস্কার! (Nomoshkar)', sampleAudioText: 'নমস্কার! আপনাকে স্বাগতম।' },
  { code: 'mr', nameEng: 'Marathi', nameNative: 'मराठी', script: 'Devanagari', sampleGreeting: 'नमस्कार! (Namaskar)', sampleAudioText: 'नमस्कार! आपले स्वागत आहे.' },
  { code: 'gu', nameEng: 'Gujarati', nameNative: 'ગુજરાતી', script: 'Gujarati', sampleGreeting: 'નમસ્તે! (Namaste)', sampleAudioText: 'નમસ્તે! તમારું સ્વાગત છે.' },
  { code: 'kn', nameEng: 'Kannada', nameNative: 'ಕನ್ನಡ', script: 'Kannada', sampleGreeting: 'ನಮಸ್ಕಾರ! (Namaskara)', sampleAudioText: 'ನಮಸ್ಕಾರ! ಸುಸ್ವಾಗತ.' },
  { code: 'ml', nameEng: 'Malayalam', nameNative: 'മലയാളം', script: 'Malayalam', sampleGreeting: 'നമസ്കാരം! (Namaskaram)', sampleAudioText: 'നമസ്കാരം! സ്വാഗതം.' },
  { code: 'pa', nameEng: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', sampleGreeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! (Sat Sri Akaal)', sampleAudioText: 'ਜੀ ਆਇਆਂ ਨੂੰ! ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ।' },
  { code: 'or', nameEng: 'Odia', nameNative: 'ଓଡ଼ିଆ', script: 'Odia', sampleGreeting: 'ନମସ୍କାର! (Namaskara)', sampleAudioText: 'ନମସ୍କାର! ଆପଣଙ୍କୁ ସ୍ୱାଗତ।' },
  { code: 'as', nameEng: 'Assamese', nameNative: 'অসমীয়া', script: 'Bengali-Assamese', sampleGreeting: 'নমস্কাৰ! (Nomoskar)', sampleAudioText: 'নমস্কাৰ! আপোনাক স্বাগতম।' },
  { code: 'ur', nameEng: 'Urdu', nameNative: 'اردو', script: 'Perso-Arabic', sampleGreeting: 'آداب! (Aadaab)', sampleAudioText: 'آداب! آپ کا استقبال ہے۔' },
  { code: 'sa', nameEng: 'Sanskrit', nameNative: 'संस्कृतम्', script: 'Devanagari', sampleGreeting: 'नमो नमः! (Namo Namah)', sampleAudioText: 'नमो नमः! भवतां स्वागतम्।' },
  { code: 'ne', nameEng: 'Nepali', nameNative: 'नेपाली', script: 'Devanagari', sampleGreeting: 'नमस्ते! (Namaste)', sampleAudioText: 'नमस्ते! स्वागत छ।' },
  { code: 'ks', nameEng: 'Kashmiri', nameNative: 'कॉशुर', script: 'Perso-Arabic / Devanagari', sampleGreeting: 'नमस्कार! (Namaskar)', sampleAudioText: 'आदाब! तुह्युंद स्वागत छु।' },
  { code: 'kok', nameEng: 'Konkani', nameNative: 'कोंकणी', script: 'Devanagari', sampleGreeting: 'देव बरे करूं! (Dev Bare Karum)', sampleAudioText: 'नमस्कार! तुमचे स्वागत आसा.' },
  { code: 'mai', nameEng: 'Maithili', nameNative: 'मैथिली', script: 'Devanagari', sampleGreeting: 'प्रणाम! (Pranam)', sampleAudioText: 'प्रणाम! अहाँक स्वागत अछि।' },
  { code: 'sd', nameEng: 'Sindhi', nameNative: 'सिन्धी', script: 'Perso-Arabic / Devanagari', sampleGreeting: 'अस्सलाम अलैकुम!', sampleAudioText: 'तव्हां जो स्वागुत आहे.' },
  { code: 'doi', nameEng: 'Dogri', nameNative: 'डोगरी', script: 'Devanagari', sampleGreeting: 'जय देवा! (Jai Deva)', sampleAudioText: 'नमस्कार! तूंढा स्वागत ऐ।' },
  { code: 'mni', nameEng: 'Manipuri (Meitei)', nameNative: 'মৈতৈলোন্', script: 'Meitei Mayek', sampleGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! (Khurumjari)', sampleAudioText: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯑꯣꯛꯖꯔꯤ꯫' },
  { code: 'brx', nameEng: 'Bodo', nameNative: 'बर\'', script: 'Devanagari', sampleGreeting: 'खुमब्रामनाय!', sampleAudioText: 'खुमब्रामनाय! नोंखौ बरायबाय।' },
  { code: 'sat', nameEng: 'Santali', nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', sampleGreeting: 'ᱡᱚᱦᱟᱨ! (Johar)', sampleAudioText: 'ᱡᱚᱦᱟᱨ! ᱟᱢᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾' }
];

interface ForeignLanguageCourse {
  id: string;
  foreignLangEng: string;
  foreignLangNative: string;
  flag: string;
  titleHindi: string;
  titleForeign: string;
  region: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalModules: number;
  totalLessons: number;
  enrolledLearners: number;
  bannerGradient: string;
  description: string;
  cognateExample: {
    foreign: string;
    hindi: string;
    transliteration: string;
  };
}

const FOREIGN_LANGUAGE_COURSES: ForeignLanguageCourse[] = [
  {
    id: 'course_en_all',
    foreignLangEng: 'English',
    foreignLangNative: 'English',
    flag: '🇬🇧',
    titleHindi: 'अंग्रेजी से 22 भारतीय भाषाएं सीखें (English to All 22 Indian Languages)',
    titleForeign: 'Master All 22 Scheduled Indian Languages from English',
    region: 'Global / Western',
    difficulty: 'Beginner',
    totalModules: 18,
    totalLessons: 64,
    enrolledLearners: 185000,
    bannerGradient: 'from-blue-600 to-indigo-800',
    description: 'Comprehensive pathway to learn Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam & all 22 Indian languages from Global English.',
    cognateExample: { foreign: 'Name', hindi: 'नाम (Naam)', transliteration: 'Naam' }
  },
  {
    id: 'course_es_all',
    foreignLangEng: 'Spanish',
    foreignLangNative: 'Español',
    flag: '🇪🇸',
    titleHindi: 'स्पैनिश से 22 भारतीय भाषाएं (Aprender 22 Idiomas de la India desde Español)',
    titleForeign: 'Curso Completo de Idiomas de la India para Hispanohablantes',
    region: 'Europe / Latin America',
    difficulty: 'Beginner',
    totalModules: 16,
    totalLessons: 52,
    enrolledLearners: 68000,
    bannerGradient: 'from-amber-600 to-red-700',
    description: 'Aprende las 22 lenguas oficiales de la India (Hindi, Tamil, Bengala, etc.) desde el Español con fonética interactiva y evaluación oral.',
    cognateExample: { foreign: 'Amigo', hindi: 'मित्र / दोस्त', transliteration: 'Mitra' }
  },
  {
    id: 'course_fr_all',
    foreignLangEng: 'French',
    foreignLangNative: 'Français',
    flag: '🇫🇷',
    titleHindi: 'फ्रेंच से 22 भारतीय भाषाएं (Apprendre les 22 Langues de l\'Inde depuis le Français)',
    titleForeign: 'Toutes les 22 Langues Indiennes pour Francophones',
    region: 'Europe / Africa',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 48,
    enrolledLearners: 49000,
    bannerGradient: 'from-blue-700 to-cyan-800',
    description: 'Apprenez le Hindi, le Tamoul, le Télougou et les 22 langues indiennes avec des exercices d\'écriture, de parole et d\'écoute.',
    cognateExample: { foreign: 'Frère', hindi: 'भ्राता / भाई', transliteration: 'Bhrata' }
  },
  {
    id: 'course_de_all',
    foreignLangEng: 'German',
    foreignLangNative: 'Deutsch',
    flag: '🇩🇪',
    titleHindi: 'जर्मन से 22 भारतीय भाषाएं (Indische Sprachen lernen auf Deutsch)',
    titleForeign: '22 Sprachen Indiens für Deutschsprachige',
    region: 'Central Europe',
    difficulty: 'Intermediate',
    totalModules: 16,
    totalLessons: 50,
    enrolledLearners: 44000,
    bannerGradient: 'from-slate-700 to-amber-700',
    description: 'Lernen Sie alle 22 indischen Sprachen systematisch auf Deutsch. Mit indogermanischen Wurzeln und KI-Sprachcoach.',
    cognateExample: { foreign: 'Mutter', hindi: 'माता / मां', transliteration: 'Mata' }
  },
  {
    id: 'course_ja_all',
    foreignLangEng: 'Japanese',
    foreignLangNative: '日本語',
    flag: '🇯🇵',
    titleHindi: 'जापानी से 22 भारतीय भाषाएं (日本語から学ぶインド22言語)',
    titleForeign: '日本語話者のためのインド22言語マスターコース',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 18,
    totalLessons: 58,
    enrolledLearners: 76000,
    bannerGradient: 'from-red-600 to-pink-800',
    description: '日本語とインド諸言語（ヒンディー語、タミル語等）のSOV文法の類似性を活用した革新的なマルチ言語学習。',
    cognateExample: { foreign: '水 (Mizu)', hindi: 'जल / पानी', transliteration: 'Jal' }
  },
  {
    id: 'course_zh_all',
    foreignLangEng: 'Mandarin Chinese',
    foreignLangNative: '中文',
    flag: '🇨🇳',
    titleHindi: 'चीनी भाषा से 22 भारतीय भाषाएं (面向中文母语者的印度22种语言课程)',
    titleForeign: '中文母语者印度22种官方语言班',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 16,
    totalLessons: 54,
    enrolledLearners: 61000,
    bannerGradient: 'from-rose-600 to-red-900',
    description: '为中文使用者量身打造的印度22种语言速成课程，包含听说读写全方位实战训练与国际证书。',
    cognateExample: { foreign: '茶 (Chá)', hindi: 'चाय (Chai)', transliteration: 'Chai' }
  },
  {
    id: 'course_ru_all',
    foreignLangEng: 'Russian',
    foreignLangNative: 'Русский',
    flag: '🇷🇺',
    titleHindi: 'रूसी से 22 भारतीय भाषाएं (Изучение 22 языков Индии для русскоязычных)',
    titleForeign: 'Курс 22 Языков Индии для Русскоязычных',
    region: 'Eastern Europe / Eurasia',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 46,
    enrolledLearners: 41000,
    bannerGradient: 'from-blue-800 to-indigo-950',
    description: 'Изучайте 22 официальных языка Индии (хинди, тамильский, бенгальский) на основе индоевропейских корней.',
    cognateExample: { foreign: 'Огонь', hindi: 'अग्नि', transliteration: 'Agni' }
  },
  {
    id: 'course_ar_all',
    foreignLangEng: 'Arabic',
    foreignLangNative: 'العربية',
    flag: '🇸🇦',
    titleHindi: 'अरबी से 22 भारतीय भाषाएं (تعلم 22 لغة هندية للمتحدثين بالعربية)',
    titleForeign: 'الدورة الشاملة لتعلم 22 لغة هندية من العربية',
    region: 'Middle East',
    difficulty: 'Beginner',
    totalModules: 17,
    totalLessons: 56,
    enrolledLearners: 84000,
    bannerGradient: 'from-emerald-700 to-teal-900',
    description: 'تعلم 22 لغة رسمية في الهند (الهندية، الأردية، التاميلية) من خلال مفردات مشتركة وتدريبات شفهية وكتابية تفاعلية.',
    cognateExample: { foreign: 'كتاب', hindi: 'किताब (Kitaab)', transliteration: 'Kitaab' }
  },
  {
    id: 'course_ko_all',
    foreignLangEng: 'Korean',
    foreignLangNative: '한국어',
    flag: '🇰🇷',
    titleHindi: 'कोरियाई से 22 भारतीय भाषाएं (한국어 사용자를 위한 인도 22개 언어)',
    titleForeign: '한국어 사용자를 위한 인도 22개 언어 마스터클래스',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 50,
    enrolledLearners: 45000,
    bannerGradient: 'from-blue-600 to-purple-800',
    description: '한국어와 인도 언어들의 동일한 어순(SOV) 구조를 이용한 빠른 힌디어, 타밀어, 텔루구어 학습 마스터클래스.',
    cognateExample: { foreign: '나 (Na)', hindi: 'मैं (Main)', transliteration: 'Main' }
  },
  {
    id: 'course_it_all',
    foreignLangEng: 'Italian',
    foreignLangNative: 'Italiano',
    flag: '🇮🇹',
    titleHindi: 'इतालवी से 22 भारतीय भाषाएं (Imparare 22 Lingue dell\'India in Italiano)',
    titleForeign: 'Corso Completo di 22 Lingue Indiane per Italiani',
    region: 'Southern Europe',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 42,
    enrolledLearners: 28000,
    bannerGradient: 'from-emerald-600 to-emerald-900',
    description: 'Impara le 22 lingue ufficiali dell\'India con esercizi pratici di scrittura, parlato, ascolto e diploma ufficiale.',
    cognateExample: { foreign: 'Nome', hindi: 'नाम (Naam)', transliteration: 'Naam' }
  },
  {
    id: 'course_pt_all',
    foreignLangEng: 'Portuguese',
    foreignLangNative: 'Português',
    flag: '🇵🇹',
    titleHindi: 'पुर्तगाली से 22 भारतीय भाषाएं (Aprender 22 Línguas da Índia em Português)',
    titleForeign: 'Curso de 22 Línguas Indianas para Lusófonos',
    region: 'Europe / South America',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 44,
    enrolledLearners: 31000,
    bannerGradient: 'from-green-600 to-amber-700',
    description: 'Aprenda as 22 línguas oficiais da Índia a partir do Português com treinamento oral de IA e certificado internacional.',
    cognateExample: { foreign: 'Chá', hindi: 'चाय (Chai)', transliteration: 'Chai' }
  },
  {
    id: 'course_tr_all',
    foreignLangEng: 'Turkish',
    foreignLangNative: 'Türkçe',
    flag: '🇹🇷',
    titleHindi: 'तुर्की से 22 भारतीय भाषाएं (Türkçe Konuşanlar İçin 22 Hint Dili)',
    titleForeign: 'Türkçe Konuşanlar İçin 22 Hindistan Dili Eğitim Kursu',
    region: 'Eurasia / Middle East',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 48,
    enrolledLearners: 35000,
    bannerGradient: 'from-red-600 to-slate-900',
    description: 'Türkçe ile Hintçe, Urduca ve tüm 22 Hindistan resmi dili arasındaki ortak kelimeler ve SOV dilbilgisi eğitimi.',
    cognateExample: { foreign: 'Dünya', hindi: 'दुनिया', transliteration: 'Duniya' }
  },
  {
    id: 'course_nl_all',
    foreignLangEng: 'Dutch',
    foreignLangNative: 'Nederlands',
    flag: '🇳🇱',
    titleHindi: 'डच से 22 भारतीय भाषाएं (22 Indische Talen Leren voor Nederlandstaligen)',
    titleForeign: 'Cursus 22 Talen van India voor Nederlandstaligen',
    region: 'Western Europe',
    difficulty: 'Beginner',
    totalModules: 13,
    totalLessons: 40,
    enrolledLearners: 22000,
    bannerGradient: 'from-orange-600 to-blue-800',
    description: 'Leer alle 22 officiële talen van India vanuit het Nederlands met luister- en spreekmodules.',
    cognateExample: { foreign: 'Broeder', hindi: 'भ्राता', transliteration: 'Bhrata' }
  },
  {
    id: 'course_fa_all',
    foreignLangEng: 'Persian',
    foreignLangNative: 'فارسی',
    flag: '🇮🇷',
    titleHindi: 'फारसी से 22 भारतीय भाषाएं (آموزش ۲۲ زبان هند برای فارسی‌زبانان)',
    titleForeign: 'دوره جامع آموزش ۲۲ زبان رسمی هند به زبان فارسی',
    region: 'Middle East / Central Asia',
    difficulty: 'Beginner',
    totalModules: 17,
    totalLessons: 54,
    enrolledLearners: 58000,
    bannerGradient: 'from-amber-700 to-indigo-900',
    description: 'آموزش هندی، اردو، پنجابی و ۲۲ زبان هند با تکیه بر ریشه‌های مشترک واژگان فارسی و ساختار جملات.',
    cognateExample: { foreign: 'نام', hindi: 'नाम (Naam)', transliteration: 'Naam' }
  },
  {
    id: 'course_vi_all',
    foreignLangEng: 'Vietnamese',
    foreignLangNative: 'Tiếng Việt',
    flag: '🇻🇳',
    titleHindi: 'वियतनामी से 22 भारतीय भाषाएं (Học 22 ngôn ngữ Ấn Độ cho người Việt)',
    titleForeign: 'Khóa học 22 ngôn ngữ chính thức Ấn Độ dành cho người Việt',
    region: 'Southeast Asia',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 42,
    enrolledLearners: 26000,
    bannerGradient: 'from-red-700 to-yellow-600',
    description: 'Khóa học 22 ngôn ngữ chính thức Ấn Độ với bài tập viết, phát âm chuẩn và nghe hiểu tương tác.',
    cognateExample: { foreign: 'Nam', hindi: 'नर / मनुष्य', transliteration: 'Nara' }
  }
];

export default function DashboardForeignLanguagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses' | 'passport' | 'matrix'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  
  // Target Indian Language Selection State (Default: Hindi)
  const [targetIndianLang, setTargetIndianLang] = useState<IndianLanguageOption>(INDIAN_LANGUAGES_22[0]);

  const [selectedCourseModal, setSelectedCourseModal] = useState<ForeignLanguageCourse | null>(null);
  const [activePlayCourse, setActivePlayCourse] = useState<ForeignLanguageCourse | null>(null);

  // In-Page Course Workspace Steps (8 Modules: Videos, Reading, Writing, Guided Learning, Speaking, Listening, Exam, Diploma)
  const [courseStepTab, setCourseStepTab] = useState<'videos' | 'reading' | 'writing' | 'guided-learning' | 'speaking' | 'listening' | 'exam' | 'certificate'>('videos');
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, {
    video1Done: boolean;
    video2Done: boolean;
    video3Done: boolean;
    readingCompleted: boolean;
    writingCompleted: boolean;
    writingAnswer: string;
    speakingCompleted: boolean;
    speakingScore: number | null;
    listeningCompleted: boolean;
    listeningAnswer: number;
    examCompleted: boolean;
    examScore: number;
  }>>({
    'course_en_all': {
      video1Done: true,
      video2Done: true,
      video3Done: true,
      readingCompleted: true,
      writingCompleted: true,
      writingAnswer: 'Hello! I am learning Indian Languages.',
      speakingCompleted: true,
      speakingScore: 96,
      listeningCompleted: true,
      listeningAnswer: 1,
      examCompleted: true,
      examScore: 98
    }
  });

  // Speaking module audio recording & Day lesson state
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState(false);
  const [activeDayLesson, setActiveDayLesson] = useState<number>(1);

  // Payment Checkout States
  const [checkoutCourse, setCheckoutCourse] = useState<ForeignLanguageCourse | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessInvoice, setPaymentSuccessInvoice] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const getStepProgress = (courseId: string) => {
    const cur = courseProgressMap[courseId] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      speakingCompleted: false,
      speakingScore: null,
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
    if (cur.speakingCompleted) completedCount++;
    if (cur.listeningCompleted) completedCount++;
    if (cur.examCompleted) completedCount++;

    const percent = Math.round((completedCount / 6) * 100);
    const allFinished = completedCount === 6;
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
          speakingCompleted: false,
          speakingScore: null,
          listeningCompleted: false,
          listeningAnswer: 0,
          examCompleted: false,
          examScore: 0
        }),
        ...updates
      }
    }));
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`[Audio Output]: "${text}"`);
    }
  };

  const handleSimulateSpeaking = (courseId: string) => {
    setIsRecordingSpeaking(true);
    setTimeout(() => {
      setIsRecordingSpeaking(false);
      const score = Math.floor(Math.random() * 10) + 90;
      updateCourseProgress(courseId, { speakingCompleted: true, speakingScore: score });
    }, 2000);
  };

  const handleProcessPayment = () => {
    if (!checkoutCourse) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const updatedUser = enrollInCourse(checkoutCourse.id);
      setUser({ ...updatedUser });

      try {
        confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
      } catch (e) {
        console.log('Confetti triggered');
      }

      setIsProcessingPayment(false);
      const invNumber = 'INV-GLOBAL-2026-' + Math.floor(100000 + Math.random() * 900000);
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

  const filteredCourses = FOREIGN_LANGUAGE_COURSES.filter((c) => {
    const matchesSearch =
      c.foreignLangEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.foreignLangNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' || c.region.includes(selectedRegion);

    if (activeTab === 'my-courses') {
      return isEnrolled(c.id) && matchesSearch && matchesRegion;
    }
    return matchesSearch && matchesRegion;
  });

  const enrolledCoursesList = FOREIGN_LANGUAGE_COURSES.filter((c) => isEnrolled(c.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* IN-PAGE COURSE WORKSPACE */}
      {activePlayCourse ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePlayCourse(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
              >
                ← Back to Catalog
              </button>
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">
                  INTERNATIONAL DIPLOMA PATHWAY • {activePlayCourse.flag} {activePlayCourse.foreignLangEng} ➔ {targetIndianLang.nameEng} ({targetIndianLang.nameNative})
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activePlayCourse.foreignLangEng} to {targetIndianLang.nameEng} Masterclass
                </h1>
              </div>
            </div>

            {/* Target Indian Language Quick Selector in Workspace */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 shrink-0">Target Indian Lang:</span>
              <select
                value={targetIndianLang.code}
                onChange={(e) => {
                  const found = INDIAN_LANGUAGES_22.find(l => l.code === e.target.value);
                  if (found) setTargetIndianLang(found);
                }}
                className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-black text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {INDIAN_LANGUAGES_22.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    🇮🇳 {lang.nameEng} ({lang.nameNative})
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Progress */}
            {(() => {
              const prog = getStepProgress(activePlayCourse.id);
              return (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-right space-y-1 shrink-0 min-w-[220px]">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-700">Pathway Progress</span>
                    <span className="text-indigo-600">{prog.percent}% ({prog.completedCount}/6 Modules)</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                    {prog.allFinished ? '🎉 All 6 Modules Complete! Diploma Unlocked.' : 'Complete Videos, Reading, Writing, Speaking, Listening & Exam.'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Stepper Navigation Tabs (7 Steps: Video, Reading, Writing, Speaking, Listening, Exam, Diploma) */}
          {(() => {
            const prog = getStepProgress(activePlayCourse.id);
            return (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
                <button
                  onClick={() => setCourseStepTab('videos')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'videos'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.videosCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Play className="w-4 h-4" /> 1. Video Lectures ({prog.videosCompleted ? '✓ 3/3 Done' : '3 Videos'})
                </button>

                <button
                  onClick={() => setCourseStepTab('reading')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'reading'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.readingCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> 2. Reading & Grammar ({prog.readingCompleted ? '✓ Completed' : 'Reading'})
                </button>

                <button
                  onClick={() => setCourseStepTab('writing')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'writing'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.writingCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" /> 3. Written Practice ({prog.writingCompleted ? '✓ Submitted' : 'Writing'})
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
                  onClick={() => setCourseStepTab('speaking')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'speaking'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.speakingCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Mic className="w-4 h-4" /> 4. Speaking AI Coach ({prog.speakingCompleted ? `✓ Score ${prog.speakingScore}%` : 'Speaking'})
                </button>

                <button
                  onClick={() => setCourseStepTab('listening')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'listening'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.listeningCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Volume2 className="w-4 h-4" /> 5. Listening Test ({prog.listeningCompleted ? '✓ Completed' : 'Listening'})
                </button>

                <button
                  onClick={() => setCourseStepTab('exam')}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                    courseStepTab === 'exam'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : prog.examCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Award className="w-4 h-4" /> 6. Final Exam ({prog.examCompleted ? `✓ Score ${prog.examScore}%` : 'Exam Assessment'})
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
                  <Award className="w-4 h-4 text-amber-600" /> 7. International Diploma {!prog.allFinished && '(🔒 Complete 1-6)'}
                </button>
              </div>
            );
          })()}

          {/* STEP 1: VIDEO LESSONS */}
          {courseStepTab === 'videos' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 1 OF 6 • MULTIPLE VIDEO LECTURES</span>
                  <h3 className="text-xl font-black text-slate-900">वीडियो पाठ श्रृंखला (Video Lecture Series)</h3>
                  <p className="text-xs text-slate-500">Watch all 3 video lessons explaining {targetIndianLang.nameEng} ({targetIndianLang.nameNative}) for {activePlayCourse.foreignLangEng} speakers.</p>
                </div>
              </div>

              <div className="aspect-video bg-slate-900 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/30">
                    {activePlayCourse.flag} Video 1: {targetIndianLang.nameEng} Phonetics & {targetIndianLang.script} Script for {activePlayCourse.foreignLangEng} Speakers
                  </span>
                  <span className="text-slate-400">Duration: 22 Mins</span>
                </div>

                <div className="text-center space-y-3 my-auto z-10">
                  <div
                    onClick={() => playAudio(targetIndianLang.sampleAudioText)}
                    className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-110 transition"
                  >
                    <Play className="w-10 h-10 fill-white ml-1" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white">Click Play to Watch Video Lesson 1</h4>
                  <p className="text-xs text-slate-300">HD Video with Native {activePlayCourse.foreignLangNative} Subtitles & IPA Phonetic Guide</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 z-10 border-t border-white/10 pt-3">
                  <span>Playback Speed: 1.0x</span>
                  <span>Audio Track: {activePlayCourse.foreignLangEng} + {targetIndianLang.nameEng}</span>
                </div>
              </div>

              {/* Day-by-Day Paced Curriculum Box (<30 Mins / Day) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">DAY-BY-DAY PACED CURRICULUM • UNDER 30 MINS / DAY</span>
                    <h4 className="text-base font-black text-slate-900">7-Day Express Schedule for {targetIndianLang.nameEng} ({targetIndianLang.nameNative})</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
                    ⚡ 7-Day Fast Track • ~22 Mins / Day
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
                  {[
                    { day: 1, title: 'Script & Sound', time: '18 Mins', level: 'L1: Starter', icon: '📖' },
                    { day: 2, title: 'Greetings & Words', time: '20 Mins', level: 'L1: Starter', icon: '💬' },
                    { day: 3, title: 'Grammar & SOV', time: '25 Mins', level: 'L2: Basic', icon: '🧩' },
                    { day: 4, title: 'Writing Practice', time: '20 Mins', level: 'L2: Basic', icon: '✍️' },
                    { day: 5, title: 'Speaking AI Coach', time: '25 Mins', level: 'L3: Fluent', icon: '🗣️' },
                    { day: 6, title: 'Listening Audio', time: '20 Mins', level: 'L3: Fluent', icon: '🎧' },
                    { day: 7, title: 'Final Diploma Exam', time: '30 Mins', level: 'L4: Master', icon: '📜' }
                  ].map((item) => (
                    <div
                      key={item.day}
                      onClick={() => setActiveDayLesson(item.day)}
                      className={`p-3 rounded-2xl border cursor-pointer transition space-y-1 ${
                        activeDayLesson === item.day
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-extrabold">
                        <span>Day {item.day} {item.icon}</span>
                        <span className={activeDayLesson === item.day ? 'text-indigo-100' : 'text-slate-500'}>{item.time}</span>
                      </div>
                      <h5 className="font-bold text-[11px] line-clamp-1">{item.title}</h5>
                      <span className={`text-[9px] font-extrabold uppercase block ${activeDayLesson === item.day ? 'text-indigo-200' : 'text-indigo-600'}`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <>
                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video1Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-indigo-600">Video 1</span>
                          {prog.video1Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{targetIndianLang.nameEng} Alphabets & Phonetics</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video1Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video1Done ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                        >
                          {prog.video1Done ? '✓ Finished' : 'Mark Video 1 Finished'}
                        </button>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video2Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-indigo-600">Video 2</span>
                          {prog.video2Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{targetIndianLang.nameEng} Grammar & Sentence Order</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video2Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video2Done ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                        >
                          {prog.video2Done ? '✓ Finished' : 'Mark Video 2 Finished'}
                        </button>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-3 transition ${prog.video3Done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-indigo-600">Video 3</span>
                          {prog.video3Done && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Spoken {targetIndianLang.nameEng} Fluency</h4>
                        <button
                          onClick={() => updateCourseProgress(activePlayCourse.id, { video3Done: true })}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition ${prog.video3Done ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
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
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 2: Reading & Grammar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: READING & GRAMMAR */}
          {courseStepTab === 'reading' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 2 OF 6 • READING & GRAMMAR COMPREHENSION</span>
                  <h3 className="text-xl font-black text-slate-900">पठन सामग्री ({targetIndianLang.nameEng} Reading Passage)</h3>
                  <p className="text-xs text-slate-500">Read the {targetIndianLang.nameEng} ({targetIndianLang.nameNative}) text passage written in {targetIndianLang.script} script.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-4">
                <h4 className="text-base font-bold text-indigo-900">Lesson 1 Passage: Welcome in {targetIndianLang.nameEng}</h4>
                <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <p className="font-bold text-base text-indigo-950">
                    {targetIndianLang.sampleAudioText}
                  </p>
                  <p className="text-slate-600">
                    Comparative Translation in {activePlayCourse.foreignLangEng}: Welcome to India! {targetIndianLang.nameEng} is one of the most expressive scheduled Indian languages.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Greeting in {targetIndianLang.nameEng}</span>
                    <span className="font-black text-indigo-900 text-sm">{targetIndianLang.sampleGreeting}</span>
                    <span className="text-indigo-600 block text-[11px]">Transliterated Greeting</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Script Name</span>
                    <span className="font-bold text-slate-900">{targetIndianLang.script} Script</span>
                    <span className="text-emerald-600 block font-bold">Official Scheduled Language</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Source Foreign Lang</span>
                    <span className="font-bold text-slate-900">{activePlayCourse.foreignLangEng} ({activePlayCourse.foreignLangNative})</span>
                    <span className="text-indigo-600 block font-bold">Bilingual Bridge Active</span>
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
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                    >
                      Proceed to Step 3: Written Practice →
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* STEP 3: WRITTEN PRACTICE */}
          {courseStepTab === 'writing' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 3 OF 6 • WRITTEN PRACTICE EXERCISE</span>
                  <h3 className="text-xl font-black text-slate-900">लिखित अभ्यास ({targetIndianLang.nameEng} Writing Practice)</h3>
                  <p className="text-xs text-slate-500">Type or write a short introduction sentence in {targetIndianLang.nameEng} ({targetIndianLang.script} script).</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <span className="font-bold block">Writing Exercise Prompt:</span>
                  <p>Write a greeting sentence in {targetIndianLang.nameEng} introducing yourself for {activePlayCourse.foreignLangEng} speakers.</p>
                </div>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="space-y-3">
                      <textarea
                        rows={4}
                        placeholder={`Type your ${targetIndianLang.nameEng} answer here (e.g. ${targetIndianLang.sampleGreeting})...`}
                        value={prog.writingAnswer}
                        onChange={(e) => updateCourseProgress(activePlayCourse.id, { writingAnswer: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 font-bold">Quick Insertion Toolbar:</span>
                        {[targetIndianLang.sampleGreeting, 'Welcome', 'India', 'Learning'].map((word, i) => (
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
                              alert('Please write a sentence before submitting.');
                              return;
                            }
                            updateCourseProgress(activePlayCourse.id, { writingCompleted: true });
                            alert('Written exercise submitted successfully!');
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-xs transition ${
                            prog.writingCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                          }`}
                        >
                          {prog.writingCompleted ? '✓ Written Exercise Submitted' : 'Submit Written Exercise'}
                        </button>

                        <button
                          onClick={() => setCourseStepTab('speaking')}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                        >
                          Proceed to Step 4: Speaking AI Coach →
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
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">INTERNATIONAL DIGITAL STUDY MODULES</span>
                  <h3 className="text-xl font-black text-slate-900">Digital Guided Study Library ({activePlayCourse.foreignLangEng} ➔ {targetIndianLang.nameEng})</h3>
                  <p className="text-xs text-slate-500">Download official study notes, grammar handbooks, and phonetic guides for international scholars.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 text-center border border-slate-800">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2 flex items-center justify-center shadow-md">
                    <span className="font-black text-blue-900 text-base leading-none">ICCR</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">INTERNATIONAL STUDY MODULE</span>
                    <h4 className="text-sm font-extrabold text-white">Study Handbook for {activePlayCourse.foreignLangEng} Native Speakers</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    Comprehensive foreign-to-Indian language notes, infographics, and research presentations.
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  {[
                    { mod: 1, title: `Module 1: ${targetIndianLang.nameEng} Phonetics & ${targetIndianLang.script} Script Guide for ${activePlayCourse.foreignLangEng} Speakers`, size: '4.5 MB' },
                    { mod: 2, title: `Module 2: SOV Grammar Rules & Verbs (${activePlayCourse.foreignLangNative} Transliteration)`, size: '5.9 MB' },
                    { mod: 3, title: `Module 3: Everyday Dialogues & Comparative Vocabulary Handbook`, size: '3.8 MB' },
                    { mod: 4, title: `Module 4: Writing Drills & Keyboard Insertion Guide for ${targetIndianLang.nameEng}`, size: '4.7 MB' },
                    { mod: 5, title: `Module 5: International Assessment Diploma Preparation Guide`, size: '8.4 MB' }
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
                        onClick={() => alert(`📥 Downloading Module ${m.mod} PDF International Handbook...`)}
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
                  onClick={() => setCourseStepTab('speaking')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 4: Speaking AI Coach →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SPEAKING & AI SPEECH COACH */}
          {courseStepTab === 'speaking' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 4 OF 6 • SPEAKING & AI PRONUNCIATION COACH</span>
                  <h3 className="text-xl font-black text-slate-900">मौखिक अभ्यास ({targetIndianLang.nameEng} Speaking Practice)</h3>
                  <p className="text-xs text-slate-500">Listen to native audio, record your voice, and receive instant AI pronunciation score.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-700">Native Spoken Target Phrase</span>
                    <h4 className="text-lg font-black text-indigo-950">{targetIndianLang.sampleAudioText}</h4>
                  </div>
                  <button
                    onClick={() => playAudio(targetIndianLang.sampleAudioText)}
                    className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition shrink-0"
                    title="Listen Native Audio"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Simulated Microphone Recording Box */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                  <div
                    onClick={() => handleSimulateSpeaking(activePlayCourse.id)}
                    className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center cursor-pointer transition shadow-lg ${
                      isRecordingSpeaking
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    <Mic className="w-9 h-9" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {isRecordingSpeaking ? '🎙️ Recording & Analyzing Accent...' : 'Click Mic to Record Your Voice'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Speak clearly into your microphone in {targetIndianLang.nameEng}</p>
                  </div>

                  {(() => {
                    const prog = getStepProgress(activePlayCourse.id);
                    return (
                      prog.speakingScore !== null && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl max-w-sm mx-auto animate-in fade-in">
                          <span className="text-xs font-black text-emerald-800 block">
                            🎉 AI Pronunciation Score: {prog.speakingScore}%
                          </span>
                          <span className="text-[11px] text-emerald-600 font-semibold">
                            Excellent native phonetics and accent match!
                          </span>
                        </div>
                      )
                    );
                  })()}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setCourseStepTab('listening')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 5: Listening Test →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: LISTENING COMPREHENSION */}
          {courseStepTab === 'listening' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 5 OF 6 • LISTENING AUDIO COMPREHENSION</span>
                  <h3 className="text-xl font-black text-slate-900">श्रवण परीक्षा (Listening Test)</h3>
                  <p className="text-xs text-slate-500">Listen to the spoken audio clip and select the correct translation in {activePlayCourse.foreignLangEng}.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playAudio(targetIndianLang.sampleAudioText)}
                    className="w-14 h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-md transition"
                  >
                    <Volume2 className="w-7 h-7 fill-white ml-0.5" />
                  </button>
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase block">Audio Comprehension Clip #1</span>
                    <h4 className="text-base font-bold text-slate-900">Listen to the spoken phrase in {targetIndianLang.nameEng}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Click speaker button to play speech audio</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Question 1: What is the core message of the audio clip?</h4>
                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="space-y-2">
                      {[
                        `Welcome to India and ${targetIndianLang.nameEng} language ✓`,
                        'Grammar instructions for final assessment',
                        'Weather forecast in New Delhi',
                        'Railway timetable inquiry'
                      ].map((opt, i) => (
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
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                          }`}
                        >
                          {prog.listeningCompleted ? '✓ Listening Test Submitted' : 'Submit Listening Test'}
                        </button>

                        <button
                          onClick={() => setCourseStepTab('exam')}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                        >
                          Proceed to Step 6: Final Exam →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* STEP 6: FINAL EXAM ASSESSMENT */}
          {courseStepTab === 'exam' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">STEP 6 OF 6 • INTERNATIONAL ASSESSMENT EXAM</span>
                  <h3 className="text-xl font-black text-slate-900">अंतिम मूल्यांकन परीक्षा (Final Exam Assessment)</h3>
                  <p className="text-xs text-slate-500">Complete final assessment exam to receive your ICCR & MEA Accredited International Diploma.</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-medium">
                  📝 Exam Rules: Score across all modules (Videos, Reading, Writing, Speaking, Listening) to unlock your verified International Diploma.
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Q1: What is the sample greeting in {targetIndianLang.nameEng}?</span>
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span className="p-2.5 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl">1. {targetIndianLang.sampleGreeting} ✓</span>
                      <span className="p-2.5 bg-white border border-slate-200 rounded-xl">2. Goodbye</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Q2: What is the official script for {targetIndianLang.nameEng}?</span>
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span className="p-2.5 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl">1. {targetIndianLang.script} Script ✓</span>
                      <span className="p-2.5 bg-white border border-slate-200 rounded-xl">2. Cyrillic Script</span>
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
                            🎉 Exam Passed! Score: {prog.examScore}% (Grade A+ International Distinction)
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
                            speakingCompleted: true,
                            speakingScore: 96,
                            listeningCompleted: true,
                            examCompleted: true,
                            examScore: 98
                          });
                          try {
                            confetti({ particleCount: 170, spread: 100, origin: { y: 0.5 } });
                          } catch (e) {
                            console.log('Confetti triggered');
                          }
                          setCourseStepTab('certificate');
                        }}
                        className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                      >
                        {prog.allFinished ? 'View Unlocked Diploma →' : 'Submit Exam & Generate International Diploma →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* STEP 7: INTERNATIONAL DIPLOMA CERTIFICATE */}
          {courseStepTab === 'certificate' && (
            <div className="space-y-6">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border-8 border-double border-indigo-700 shadow-2xl text-center space-y-6 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-600 flex items-center justify-center mx-auto shadow-md">
                    <Globe className="w-10 h-10 text-indigo-600" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-800 block">
                    ICCR & MINISTRY OF EXTERNAL AFFAIRS (MEA) ACCREDITED
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                    अंतर्राष्ट्रीय डिप्लोमा (INTERNATIONAL DIPLOMA)
                  </h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Diploma in {targetIndianLang.nameEng} ({targetIndianLang.nameNative}) Studies for International Scholars
                  </p>
                </div>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent mx-auto" />

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  <p className="italic">This International Diploma is proudly awarded to</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 border-b-2 border-slate-200 pb-1 inline-block">
                    {user?.name || 'Alexander Wright (एलेक्जेंडर राइट)'}
                  </h3>
                  <p>
                    for demonstrating complete proficiency across Videos, Reading, Writing, Speaking, Listening & Assessment for:
                  </p>
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 font-extrabold text-base text-indigo-950">
                    {activePlayCourse.flag} &quot;Diploma in {targetIndianLang.nameEng} ({targetIndianLang.nameNative}) via {activePlayCourse.foreignLangEng}&quot;
                    <span className="block text-xs font-medium text-indigo-800 mt-0.5">({activePlayCourse.titleForeign})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs text-center max-w-2xl mx-auto">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">FINAL ASSESSMENT SCORE</span>
                    <span className="font-black text-emerald-600 text-base">98.0%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">GLOBAL DISTINCTION</span>
                    <span className="font-black text-indigo-600 text-base">Summa Cum Laude</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">DIPLOMA ID</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">INT-HLMS-2026-981240</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left border-t border-slate-200 text-xs">
                  <div className="space-y-1">
                    <span className="font-serif italic font-bold text-slate-900 block">डॉ. देवेन्द्र शर्मा</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Director of International Studies</span>
                  </div>

                  <div className="text-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hindi-lms.org/certificates/verify/INT-HLMS-2026-981240"
                      alt="Verified QR Code"
                      className="w-16 h-16 mx-auto rounded-lg border border-slate-300 p-1 bg-white"
                    />
                    <span className="text-[9px] text-slate-400 block mt-1">Scan for Global Verification</span>
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="font-serif italic font-bold text-slate-900 block">Prof. Elena Rostova</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Dean of Global Languages</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  🖨️ Print International Diploma
                </button>

                <button
                  onClick={() => alert('Downloading official PDF International Diploma...')}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  📥 Download PDF Diploma
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* NORMAL PAGE TAB CATALOGUE VIEW */
        <>
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-800/40">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black tracking-widest uppercase border border-indigo-400/30 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" /> Global Foreign Languages to 22 Indian Languages Portal
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  Written • Speaking • Listening • AI Coach
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  विदेशी भाषाओं से सभी 22 भारतीय भाषाएं सीखें <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-amber-300">
                    Learn Any of All 22 Indian Languages from 15 Global Foreign Languages
                  </span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                  Tailored learning pathways for speakers of English, Spanish, French, German, Japanese, Mandarin, Russian, Arabic, Korean, Italian, Portuguese, Turkish, Dutch, Persian, and Vietnamese to master Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam & all 22 Indian languages!
                </p>
              </div>

              {/* Target Indian Language Selector Banner Strip */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-300" />
                  <span className="font-bold text-white">Select Your Target Indian Language (22 Languages):</span>
                </div>
                <select
                  value={targetIndianLang.code}
                  onChange={(e) => {
                    const found = INDIAN_LANGUAGES_22.find(l => l.code === e.target.value);
                    if (found) setTargetIndianLang(found);
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs focus:outline-none shadow-md cursor-pointer"
                >
                  {INDIAN_LANGUAGES_22.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      🇮🇳 {lang.nameEng} ({lang.nameNative}) - {lang.script} Script
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4" /> All Foreign Courses (15)
              </button>

              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 relative ${
                  activeTab === 'my-courses'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> My Enrolled Diplomas ({enrolledCoursesList.length})
              </button>

              <button
                onClick={() => setActiveTab('passport')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'passport'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" /> ICCR Diplomatic Passport
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 shrink-0">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Continents</option>
                <option value="Global">Global / Western</option>
                <option value="Europe">Europe</option>
                <option value="East Asia">East Asia</option>
                <option value="Middle East">Middle East</option>
                <option value="Eurasia">Eurasia</option>
              </select>
            </div>
          </div>

          {/* CATALOGUE & MY COURSES GRID */}
          {(activeTab === 'all' || activeTab === 'my-courses') && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by Foreign Language (e.g. English, Spanish, French, Japanese, Arabic)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                />
              </div>

              {filteredCourses.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <Globe className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No Foreign Language Courses Found</h3>
                  <p className="text-xs text-slate-500">Try adjusting your search query or region filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => {
                    const enrolled = isEnrolled(course.id);
                    const prog = getStepProgress(course.id);
                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className={`p-5 bg-gradient-to-r ${course.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white font-extrabold text-sm">
                                {course.flag} {course.foreignLangEng} ({course.foreignLangNative})
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                                {course.region}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-base font-black text-white group-hover:translate-x-1 transition-transform">
                                {course.foreignLangEng} ➔ {targetIndianLang.nameEng} ({targetIndianLang.nameNative})
                              </h3>
                              <p className="text-xs text-white/80 line-clamp-1">{course.titleForeign}</p>
                            </div>
                          </div>

                          <div className="p-5 space-y-4">
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {course.description}
                            </p>

                            <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1">
                              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                                Target Indian Greeting ({targetIndianLang.nameEng}):
                              </span>
                              <div className="flex items-center justify-between font-bold text-slate-800">
                                <span>{targetIndianLang.sampleGreeting}</span>
                                <button
                                  onClick={() => playAudio(targetIndianLang.sampleAudioText)}
                                  className="text-indigo-600 hover:underline text-[11px] font-bold"
                                >
                                  🔊 Listen Audio
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                              <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                                <span>{course.totalModules} Units • {course.totalLessons} Lessons</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-emerald-500" />
                                <span>{(course.enrolledLearners / 1000).toFixed(1)}k Foreign Learners</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-slate-100 mt-auto">
                          {enrolled ? (
                            <div className="space-y-2 pt-3">
                              <div className="flex justify-between text-[11px] font-bold text-slate-700">
                                <span>Status: Enrolled</span>
                                <span className="text-indigo-600">{prog.percent}% ({prog.completedCount}/6 Modules)</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${prog.percent}%` }} />
                              </div>
                              <button
                                onClick={() => setActivePlayCourse(course)}
                                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5"
                              >
                                Continue In-Page Workspace <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2 pt-3">
                              <button
                                onClick={() => setSelectedCourseModal(course)}
                                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                              >
                                View Syllabus
                              </button>

                              <button
                                onClick={() => setCheckoutCourse(course)}
                                className="flex-1 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1"
                              >
                                Register / Enroll Now
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* PASSPORT TAB */}
          {activeTab === 'passport' && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">GLOBAL DIPLOMATIC PASSPORT</span>
                  <h3 className="text-xl font-black text-slate-900">ICCR International Student Cultural Passport</h3>
                  <p className="text-xs text-slate-500">Track your verified foreign language study credentials and cultural exchange stamps.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl">
                      🇮🇳
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base">{user?.name || 'Alexander Wright'}</h4>
                      <span className="text-xs text-amber-300">Registered Global Scholar • Passport #IND-981240</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                    Active International Exchange
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* SYLLABUS MODAL */}
      {selectedCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">
                  {selectedCourseModal.flag} {selectedCourseModal.foreignLangEng} ➔ {targetIndianLang.nameEng} Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCourseModal.foreignLangEng} to {targetIndianLang.nameEng} ({targetIndianLang.nameNative}) Masterclass
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
              {selectedCourseModal.description} Includes complete Written, Speaking AI Coach, Listening Comprehension, and Final Certification Exam.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const target = selectedCourseModal;
                  setSelectedCourseModal(null);
                  setCheckoutCourse(target);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                Proceed to Registration & Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutCourse && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">
                    INTERNATIONAL REGISTRATION GATEWAY
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
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    REGISTRATION SUCCESSFUL & ENROLLED
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You have successfully enrolled in <span className="font-bold text-slate-800">&quot;{checkoutCourse.foreignLangEng} to {targetIndianLang.nameEng}&quot;</span>.
                  </p>
                </div>

                <button
                  onClick={handleFinishCheckout}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                >
                  Go to My Enrolled Courses →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-5 rounded-2xl bg-gradient-to-r ${checkoutCourse.bannerGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white font-extrabold uppercase text-xs">
                    {checkoutCourse.flag} {checkoutCourse.foreignLangEng} ➔ {targetIndianLang.nameEng} ({targetIndianLang.nameNative})
                  </span>
                  <h3 className="text-lg font-black text-white">{checkoutCourse.titleHindi}</h3>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" /> Have an International Exchange Scholarship Code?
                    </span>
                    <button
                      onClick={() => {
                        setCouponCode('GLOBALBHASHA2026');
                        setCouponApplied(true);
                      }}
                      className="text-[11px] font-extrabold text-indigo-600 hover:underline"
                    >
                      Use &quot;GLOBALBHASHA2026&quot; (100% OFF)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. GLOBALBHASHA2026)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        if (couponApplied) setCouponApplied(false);
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        if (couponCode.trim().length > 0) setCouponApplied(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      {couponApplied ? 'Applied ✓' : 'Apply Coupon'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition hover:scale-101 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Securing Gateway...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {couponApplied ? 'Apply 100% Subsidy & Enroll Free' : 'Pay & Complete Registration'}
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
