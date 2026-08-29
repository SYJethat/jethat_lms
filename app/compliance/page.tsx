'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  Globe,
  Award,
  FileText,
  Building2,
  Download,
  ExternalLink,
  Eye,
  Volume2,
  CreditCard,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 space-y-16">
      {/* Page Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500 relative overflow-hidden text-left">
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-orange-400/40">
            <ShieldCheck className="w-4 h-4 text-orange-400" /> OFFICIAL GOVERNMENT & IN-APP PURCHASES GOVERNANCE
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            GIGW 3.0, IAP & CERT-In Cyber Security Compliance Hub
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-3xl leading-relaxed">
            Official Audit Matrix, Accessibility Guidelines (GIGW 3.0 / W3C WCAG 2.1 AAA), Google Play & Apple In-App Purchase (IAP) Billing Policies, CERT-In Security Ratings, and NEP 2020 Subsidies.
          </p>
        </div>
      </section>

      {/* Main Compliance Matrix Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. GIGW 3.0 & W3C WCAG 2.1 AAA ACCESSIBILITY SECTION */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">GOVERNMENT ACCESSIBILITY</span>
                <h2 className="text-2xl font-black text-slate-900">
                  1. GIGW 3.0 & W3C WCAG 2.1 AAA Accessibility Guidelines
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
              PASSED AUDIT ✓
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Our portal adheres strictly to the Guidelines for Indian Government Websites (GIGW 3.0) framed by the National Informatics Centre (NIC) & Ministry of Electronics and Information Technology (MeitY).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <Volume2 className="w-4 h-4 text-orange-600" /> Screen Reader Compatibility
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Full integration with NVDA, JAWS, and Apple VoiceOver screen reader tools.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <Eye className="w-4 h-4 text-cyan-600" /> High Contrast & Text Resizing
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Font size controls (A-/A/A+) and high contrast yellow-black accessibility mode.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <FileText className="w-4 h-4 text-emerald-600" /> Skip to Main Content Link
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Mandatory GIGW skip navigation anchor links enabled for keyboard users.
              </p>
            </div>
          </div>
        </div>

        {/* 2. IN-APP PURCHASES (IAP) & GOOGLE PLAY BILLING COMPLIANCE */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest block">PAYMENT & STORE BILLING</span>
                <h2 className="text-2xl font-black text-slate-900">
                  2. Google Play IAP & Apple App Store Billing Compliance
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-800 font-black text-xs">
              STORE APPROVED ✓
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            All in-app purchases, pro subscriptions, course token purchases, and exam fees strictly follow Google Play In-App Billing Library v6.0 and Apple App Store Review Guidelines (Section 3.1.1).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <CreditCard className="w-4 h-4 text-cyan-600" /> GST Tax Invoice Receipts
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Automated 18% GST invoice PDF generation for all paid course enrollments.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <Zap className="w-4 h-4 text-amber-600" /> 100% Free Govt Subsidy Coupon
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Apply coupon <code className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-900 font-mono">BHASHA2026</code> for ₹0 fee waiver under NEP 2020.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Refund & Cancellation Policy
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Instant 7-day money-back guarantee for all digital courseware purchases.
              </p>
            </div>
          </div>
        </div>

        {/* 3. CERT-IN CYBER SECURITY & DATA PRIVACY COMPLIANCE */}
        <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold border border-orange-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">CYBER SECURITY AUDIT</span>
                <h2 className="text-2xl font-black text-white">
                  3. CERT-In 256-Bit SSL/TLS Cyber Security Audit
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
              RATING A+ SECURE
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Audited by the Indian Computer Emergency Response Team (CERT-In) empaneled security auditors. Operates under ISO 27001 data protection and Digital Personal Data Protection Act (DPDP 2023) standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-extrabold text-xs text-white">🔒 256-Bit End-to-End Encryption</h4>
              <p className="text-xs text-slate-400">All student records, exam scores, and live webcam video calls are encrypted.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-extrabold text-xs text-white">🛡️ RBAC Session Security</h4>
              <p className="text-xs text-slate-400">Strict single-dashboard Role-Based Access Control preventing unauthorized access.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-extrabold text-xs text-white">📜 Immutable Audit Logging</h4>
              <p className="text-xs text-slate-400">All administrative operations and certificate issuances logged in immutable audit trails.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
