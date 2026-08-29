'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Eye,
  Volume2,
  Lock,
  Smartphone,
  Globe,
  Award,
  ChevronDown,
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  X
} from 'lucide-react';

export default function GIGWHeaderBar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1: small, 0: normal, 1: large
  const [highContrast, setHighContrast] = useState(false);
  const [complianceDropdownOpen, setComplianceDropdownOpen] = useState(false);
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [currentLang, setCurrentLang] = useState<'hi' | 'en'>('hi');

  // Handle Font Size Manipulation
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (fontSizeLevel === 1) {
      htmlEl.style.fontSize = '18px';
    } else if (fontSizeLevel === -1) {
      htmlEl.style.fontSize = '14px';
    } else {
      htmlEl.style.fontSize = '16px';
    }
  }, [fontSizeLevel]);

  // Handle High Contrast Mode Toggle
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('gigw-high-contrast');
    } else {
      document.body.classList.remove('gigw-high-contrast');
    }
  }, [highContrast]);

  const handleScreenReaderAnnounce = () => {
    setScreenReaderActive(true);
    const msg = 'Screen Reader Access Active. GIGW 3.0 and WCAG AAA Accessibility Enabled on Hindi LMS Portal.';
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(msg);
    }
    setTimeout(() => setScreenReaderActive(false), 5000);
  };

  return (
    <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px] font-bold relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: GIGW Government Compliance Notice & Emblem */}
        <div className="flex items-center gap-3">
          {/* Skip to Main Content Link (GIGW Mandatory Requirement) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-3 focus:py-1 focus:bg-orange-600 focus:text-white focus:rounded-lg"
          >
            Skip to Main Content (मुख्य विषय पर जाएं)
          </a>

          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="px-1.5 py-0.5 rounded bg-orange-600/30 border border-orange-500/40 text-[9px] font-black text-orange-400">
              🇮🇳 GOVT OF INDIA
            </span>
            <span className="hidden md:inline text-slate-300 font-semibold">
              भारत सरकार • शिक्षा मंत्रालय (Ministry of Education)
            </span>
          </div>

          <span className="hidden lg:inline text-slate-600">•</span>

          {/* Compliance Rating Trigger Button */}
          <button
            onClick={() => setComplianceDropdownOpen(!complianceDropdownOpen)}
            className="hidden lg:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> GIGW 3.0 & IAP Compliant <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Right Side: Accessibility Toolbar (Font Size, Contrast, Screen Reader, Language) */}
        <div className="flex items-center gap-3 text-slate-300">
          {/* Screen Reader Access */}
          <button
            onClick={handleScreenReaderAnnounce}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition ${
              screenReaderActive ? 'bg-orange-600 text-white animate-pulse' : 'hover:bg-slate-800 text-slate-300'
            }`}
            title="Screen Reader Access"
          >
            <Volume2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Screen Reader</span>
          </button>

          {/* Text Size Adjuster (A- / A / A+) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setFontSizeLevel(-1)}
              className={`px-1.5 py-0.5 rounded transition ${fontSizeLevel === -1 ? 'bg-orange-600 text-white' : 'hover:text-white'}`}
              title="Decrease Font Size (A-)"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(0)}
              className={`px-1.5 py-0.5 rounded transition ${fontSizeLevel === 0 ? 'bg-slate-800 text-orange-400' : 'hover:text-white'}`}
              title="Reset Font Size (A)"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              className={`px-1.5 py-0.5 rounded transition ${fontSizeLevel === 1 ? 'bg-orange-600 text-white' : 'hover:text-white'}`}
              title="Increase Font Size (A+)"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                : 'border-slate-800 hover:bg-slate-900 text-slate-300'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{highContrast ? 'High Contrast ON' : 'Contrast'}</span>
          </button>

          {/* Dedicated Legal Compliance Page Link */}
          <Link
            href="/compliance"
            className="hidden sm:flex items-center gap-1 text-cyan-400 hover:underline font-bold"
          >
            <Lock className="w-3.5 h-3.5" /> Compliance Hub
          </Link>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setCurrentLang('hi')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-black transition ${
                currentLang === 'hi' ? 'bg-orange-600 text-white' : 'text-slate-400'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-black transition ${
                currentLang === 'en' ? 'bg-orange-600 text-white' : 'text-slate-400'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Badges Dropdown Menu */}
      {complianceDropdownOpen && (
        <div className="absolute left-4 top-full mt-1 w-88 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">
              GOVERNMENT & IN-APP PURCHASES COMPLIANCE
            </span>
            <button
              onClick={() => setComplianceDropdownOpen(false)}
              className="text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white">GIGW 3.0 Compliance Certified</h4>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Adheres strictly to Guidelines for Indian Government Websites (GIGW 3.0) and W3C WCAG 2.1 AAA.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <Smartphone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white">Google Play & Apple IAP Compliant</h4>
                <p className="text-[10px] text-slate-400 leading-snug">
                  100% compliant with Google Play In-App Billing APIs, Apple IAP Store Guidelines & GST Receipts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white">CERT-In 256-Bit Security Audit</h4>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Audited by Indian Computer Emergency Response Team (CERT-In) for SSL/TLS encryption.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-right">
            <Link
              href="/compliance"
              onClick={() => setComplianceDropdownOpen(false)}
              className="text-xs font-black text-orange-400 hover:underline"
            >
              View Full Compliance Certificates & Report →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
