'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Flame,
  Zap,
  Search,
  User as UserIcon,
  Globe,
  ChevronDown,
  Sparkles,
  Award,
  BookOpen,
  Trophy,
  Bot,
  Video,
  Building2,
  Shield,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Menu,
  X,
  LogIn,
  ShieldCheck,
  Download,
  HelpCircle,
  Home,
  FileText
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import SearchModal from './SearchModal';
import { getStoredUser, getActiveRole, loginUserByRole, User } from '@/lib/lmsStore';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<User['role']>('student');
  const [searchOpen, setSearchOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certIdInput, setCertIdInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setActiveRole(getActiveRole());
  }, [pathname]);

  // Hide Navbar on dashboard and exam pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/exam')) return null;

  const handleVerifyCertificateAction = (e: React.FormEvent) => {
    e.preventDefault();
    const certCode = certIdInput.trim() || 'HLMS-2026-884920';
    setCertModalOpen(false);
    router.push(`/dashboard/student?tab=certificates&verify=${certCode}`);
  };

  const mainNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About Us', icon: Building2 },
    { href: '/resources', label: 'Resources', icon: Video },
    { href: '/how-to-use', label: 'How to Use', icon: HelpCircle },
  ];

  return (
    <>
      {/* Navbar Container */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-1">
            <img
              src="/logo.png"
              alt="JetHat Cyber Security & Language LMS Logo"
              className="h-16 sm:h-16 w-auto object-contain transition group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Page Routes (Home, About, Resources, How to Use) */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-slate-700">
            {mainNavLinks.map((linkItem) => {
              const isActiveRoute = pathname === linkItem.href;

              return (
                <Link
                  key={linkItem.href}
                  href={linkItem.href}
                  className={`flex items-center gap-1.5 transition ${
                    isActiveRoute
                      ? 'text-orange-600 font-black border-b-2 border-orange-600 pb-0.5'
                      : 'hover:text-orange-600'
                  }`}
                >
                  <linkItem.icon className={`w-4 h-4 ${isActiveRoute ? 'text-orange-600' : 'text-slate-400'}`} />
                  {linkItem.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PUBLIC CERTIFICATE VERIFICATION NAVBAR POPUP TRIGGER */}
            <button
              onClick={() => setCertModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-extrabold text-xs flex items-center gap-1.5 transition border border-orange-200 shadow-2xs"
            >
              <Award className="w-4 h-4 text-orange-600 shrink-0" /> Verify Certificate
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              title="Search platform"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <NotificationCenter />

            {/* LMS PORTAL SIGN IN BUTTON -> DIRECT NAVIGATION ROUTE TO /login */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-orange-600/20 transition hover:scale-105"
            >
              <LogIn className="w-4 h-4" /> LMS Portal Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 text-xs font-extrabold text-slate-700">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-orange-600 text-white font-bold text-center"
            >
              🔑 LMS Portal Sign In
            </Link>
          </div>
        )}
      </nav>

      {/* PUBLIC CERTIFICATE VERIFICATION POPUP MODAL */}
      {certModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block">
                    PUBLIC DIPLOMA VERIFICATION
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Verify Certificate (प्रमाणपत्र सत्यापन)
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Verify official language diplomas & certificates accredited by Kendriya Hindi Sansthan Agra, CIIL Mysuru, BHU, and Delhi University with instant QR verification.
            </p>

            <form onSubmit={handleVerifyCertificateAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Certificate Serial ID / Token:
                </label>
                <input
                  type="text"
                  value={certIdInput}
                  onChange={(e) => setCertIdInput(e.target.value)}
                  placeholder="e.g. HLMS-2026-884920 or KHS-DIP-2026-774910"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono font-bold"
                  required
                />
              </div>

              {/* Sample Quick Fill Pills */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Sample Accredited Certificate IDs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['HLMS-2026-884920', 'KHS-DIP-2026-774910', 'CIIL-LANG-2026-302911'].map((sampleId) => (
                    <button
                      key={sampleId}
                      type="button"
                      onClick={() => setCertIdInput(sampleId)}
                      className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10px] font-mono font-bold transition"
                    >
                      {sampleId}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="w-1/3 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" /> Verify Diploma Now
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cryptographic QR & Ministry Verification Engine
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
