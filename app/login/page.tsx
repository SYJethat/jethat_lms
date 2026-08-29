'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  BookOpen,
  Sparkles,
  Shield,
  Building2,
  DollarSign,
  BarChart3,
  Lock,
  Mail,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Globe,
  LogIn
} from 'lucide-react';
import { loginUserByRole, User } from '@/lib/lmsStore';

const LOGIN_ROLES: { role: User['role']; label: string; name: string; email: string; icon: any; color: string; desc: string }[] = [
  {
    role: 'student',
    label: 'Student Console',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    icon: UserIcon,
    color: 'border-orange-500/40 bg-orange-500/10 text-orange-600',
    desc: 'Access Level 1-7 Pathway, AI Chatbot, Avatars & Speaking Tests',
  },
  {
    role: 'teacher',
    label: 'Teacher Console',
    name: 'आचार्य आरव शास्त्री',
    email: 'teacher@hindi-lms.org',
    icon: BookOpen,
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-600',
    desc: 'Manage Classes, Student Rosters & Grade Assignments',
  },
  {
    role: 'creator',
    label: 'Course Creator Studio',
    name: 'कबीर वर्मा',
    email: 'creator@hindi-lms.org',
    icon: Sparkles,
    color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600',
    desc: 'Build Modules, Quizzes & Submit to 6-Step Publishing Queue',
  },
  {
    role: 'tester',
    label: 'Quality Testing Hub',
    name: 'डॉ. देवेन्द्र शर्मा',
    email: 'tester@hindi-lms.org',
    icon: Shield,
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-600',
    desc: 'Audit Devanagari Fonts, Audio Synthesis & QA Approvals',
  },
  {
    role: 'institute',
    label: 'Institute Admin',
    name: 'केंद्रीय हिंदी संस्थान एडमिन',
    email: 'institute@khs.edu.in',
    icon: Building2,
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600',
    desc: 'Manage Local Centers, Physical Batches & Certificate Issues',
  },
  {
    role: 'accounting',
    label: 'Accounting & Finance',
    name: 'रजत गुप्ता',
    email: 'finance@hindi-lms.org',
    icon: DollarSign,
    color: 'border-teal-500/40 bg-teal-500/10 text-teal-600',
    desc: 'View Revenue Ledgers, IAP Gateways & Export Invoices',
  },
  {
    role: 'admin',
    label: 'Super Admin',
    name: 'Super Admin Operations',
    email: 'admin@hindi-lms.org',
    icon: BarChart3,
    color: 'border-slate-500/40 bg-slate-500/10 text-slate-800',
    desc: 'Full System Control, RBAC Matrix & AI Gateway Config',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<User['role']>('student');
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

  const handleRoleSelect = (roleObj: typeof LOGIN_ROLES[0]) => {
    setSelectedRole(roleObj.role);
    setEmail(roleObj.email);
  };

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUserByRole(selectedRole);
    router.push(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-black uppercase tracking-wider">
            <Globe className="w-4 h-4 text-orange-600" /> SINGLE-DASHBOARD MULTI-ROLE LMS PORTAL
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            LMS Portal <span className="text-orange-600">User Sign In</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-2xl mx-auto">
            Select a target role profile below for 1-click test login, or enter your registered account credentials to log in directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: 1-Click Role Login Cards */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
              1. SELECT USER ROLE PROFILE (7 TARGET ROLES)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOGIN_ROLES.map((r) => {
                const isSelected = selectedRole === r.role;
                return (
                  <div
                    key={r.role}
                    onClick={() => handleRoleSelect(r)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 bg-white ${
                      isSelected
                        ? 'border-orange-500 ring-2 ring-orange-500 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl border ${r.color}`}>
                          <r.icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-slate-900">{r.label}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">{r.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono block truncate">{r.email}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed border-t border-slate-100 pt-2">
                      {r.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: Login Form Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-left sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900">Sign In to Workspace</h3>
              <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`px-3 py-1 text-xs font-extrabold rounded-lg transition ${
                    loginMethod === 'email' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`px-3 py-1 text-xs font-extrabold rounded-lg transition ${
                    loginMethod === 'otp' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Mobile OTP
                </button>
              </div>
            </div>

            <form onSubmit={handlePerformLogin} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1.5">User Email / ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                    required
                  />
                </div>
              </div>

              {loginMethod === 'email' ? (
                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1.5">Mobile OTP Verification</label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP (Simulated: 123456)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <LogIn className="w-4 h-4" /> Enter {selectedRole.toUpperCase()} Dashboard →
              </button>
            </form>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-500 text-center">
              🔒 Centralized RBAC OAuth2 / Session Authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
