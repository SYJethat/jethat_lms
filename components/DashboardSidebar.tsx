'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Shield,
  Building2,
  DollarSign,
  BarChart3,
  Bot,
  Mic,
  FileEdit,
  Headphones,
  Trophy,
  Award,
  Video,
  MapPin,
  HelpCircle,
  LogOut,
  User as UserIcon,
  Zap,
  Flame,
  ChevronDown,
  LogIn,
  CheckCircle2,
  History
} from 'lucide-react';
import { getActiveRole, getStoredUser, loginUserByRole, User } from '@/lib/lmsStore';

interface SidebarGroup {
  groupTitle: string;
  items: {
    tabId: string;
    label: string;
    icon: any;
    badge?: string;
  }[];
}

const ROLES_QUICK_SWITCH: { id: User['role']; label: string; icon: any; color: string }[] = [
  { id: 'student', label: 'Student', icon: UserIcon, color: 'text-blue-600' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, color: 'text-amber-600' },
  { id: 'creator', label: 'Course Creator', icon: Sparkles, color: 'text-cyan-600' },
  { id: 'tester', label: 'Quality Tester', icon: Shield, color: 'text-purple-600' },
  { id: 'institute', label: 'Institute Admin', icon: Building2, color: 'text-indigo-600' },
  { id: 'accounting', label: 'Accounting', icon: DollarSign, color: 'text-rose-600' },
  { id: 'admin', label: 'Super Admin', icon: BarChart3, color: 'text-orange-600' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = getActiveRole();
  const user = getStoredUser();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const activeTab = searchParams.get('tab') || 'overview';

  const handleRoleSwitch = (newRole: User['role']) => {
    loginUserByRole(newRole);
    setRoleMenuOpen(false);
    router.push(`/dashboard/${newRole}`);
  };

  const roleSidebarData: Record<User['role'], { title: string; subtitle: string; groups: SidebarGroup[] }> = {
    student: {
      title: 'Student Console',
      subtitle: 'Learner • Class 10/12 Stream',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'levels', label: 'हिंदी स्तर (Pathway)', icon: BookOpen, badge: 'L1-L7' },
            { tabId: 'exam', label: 'Assessments & Exams', icon: HelpCircle, badge: '3' },
            { tabId: 'classes', label: 'लाइव क्लास (Live)', icon: Video },
            { tabId: 'competitions', label: 'प्रतियोगिता (Battles)', icon: Trophy },
            { tabId: 'leaderboard', label: 'लीडरबोर्ड (Ranks)', icon: BarChart3 },
            { tabId: 'institutes', label: 'संस्थान (Institutes)', icon: Building2 },
            { tabId: 'library', label: 'पुस्तकालय (Library)', icon: BookOpen },
          ],
        },
        {
          groupTitle: 'AI LEARNING TOOLS',
          items: [
            { tabId: 'chatbot', label: 'AI शिक्षक (AI Hub)', icon: Bot, badge: 'Online' },
            { tabId: 'avatar', label: 'Digital Avatars', icon: Sparkles },
            { tabId: 'speaking-test', label: 'AI Speaking Test', icon: Mic },
            { tabId: 'writing-test', label: 'AI Writing Test', icon: FileEdit },
            { tabId: 'listening-test', label: 'AI Listening Test', icon: Headphones },
            { tabId: 'physical', label: 'Physical Centers', icon: MapPin },
            { tabId: 'certificates', label: 'My Certificates', icon: Shield },
          ],
        },
      ],
    },
    teacher: {
      title: 'Teacher Console',
      subtitle: 'Faculty & Student Evaluator',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'classes', label: 'Schedule Live Class', icon: Video, badge: '2 Upcoming' },
            { tabId: 'assignments', label: 'Student Assignments', icon: FileEdit, badge: '5 Pending' },
            { tabId: 'ai-review', label: 'AI Speech & Writing Review', icon: Mic },
            { tabId: 'roster', label: 'Enrolled Student Roster', icon: UserIcon },
          ],
        },
        {
          groupTitle: 'ACADEMIC RESOURCES',
          items: [
            { tabId: 'levels', label: 'हिंदी स्तर (Pathway)', icon: BookOpen },
            { tabId: 'institutes', label: 'संस्थान (Institutes)', icon: Building2 },
            { tabId: 'library', label: 'पुस्तकालय (Library)', icon: BookOpen },
            { tabId: 'competitions', label: 'प्रतियोगिता (Battles)', icon: Trophy },
          ],
        },
      ],
    },
    creator: {
      title: 'Course Creator Studio',
      subtitle: 'Curriculum & Publishing',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'builder', label: 'Course Module Builder', icon: Sparkles },
            { tabId: 'lessons', label: 'Lesson Content Editor', icon: BookOpen },
            { tabId: 'quizzes', label: 'Quiz Authoring Tool', icon: HelpCircle },
            { tabId: 'workflow', label: 'Publishing Queue', icon: Shield, badge: '6 Stages' },
          ],
        },
        {
          groupTitle: 'RESOURCES',
          items: [
            { tabId: 'levels', label: 'हिंदी स्तर (Pathway)', icon: BookOpen },
            { tabId: 'library', label: 'पुस्तकालय (Library)', icon: BookOpen },
          ],
        },
      ],
    },
    tester: {
      title: 'Quality Testing Hub',
      subtitle: 'Content & Audio QA Auditor',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'queue', label: 'QA Audit Queue', icon: Shield, badge: '1 Pending' },
            { tabId: 'spelling', label: 'Devanagari Font Inspector', icon: FileEdit },
            { tabId: 'audio', label: 'Audio Synthesis Test', icon: Headphones },
            { tabId: 'approvals', label: 'Approval Portal', icon: Award },
          ],
        },
        {
          groupTitle: 'PLATFORM AUDIT',
          items: [
            { tabId: 'levels', label: 'हिंदी स्तर (Pathway)', icon: BookOpen },
            { tabId: 'chatbot', label: 'AI शिक्षक (AI Hub)', icon: Bot },
          ],
        },
      ],
    },
    institute: {
      title: 'Institute Admin',
      subtitle: 'Center & Batches Manager',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'physical', label: 'Physical Center Locations', icon: MapPin },
            { tabId: 'batches', label: 'Student Batches & Seats', icon: UserIcon },
            { tabId: 'fees', label: 'Fee Collections', icon: DollarSign },
          ],
        },
        {
          groupTitle: 'MANAGEMENT',
          items: [
            { tabId: 'institutes', label: 'संस्थान (Institutes)', icon: Building2 },
            { tabId: 'certificates', label: 'Local Certificates', icon: Award },
            { tabId: 'classes', label: 'लाइव क्लास (Live)', icon: Video },
          ],
        },
      ],
    },
    accounting: {
      title: 'Accounting & Finance',
      subtitle: 'Financial Controller',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'revenue', label: 'Revenue Ledgers', icon: BarChart3 },
            { tabId: 'gateways', label: 'Gateway Breakdown', icon: Shield },
            { tabId: 'subscriptions', label: 'Pro Subscriptions', icon: Zap },
            { tabId: 'refunds', label: 'Refund Requests', icon: FileEdit },
          ],
        },
        {
          groupTitle: 'INSTITUTE AUDIT',
          items: [
            { tabId: 'institutes', label: 'संस्थान (Institutes)', icon: Building2 },
          ],
        },
      ],
    },
    admin: {
      title: 'Super Admin',
      subtitle: 'System Commander & RBAC',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'rbac', label: 'User RBAC Matrix', icon: Shield, badge: '7 Roles' },
            { tabId: 'publishing', label: 'Publishing Approvals', icon: BookOpen },
            { tabId: 'ai-settings', label: 'AI Gateway Config', icon: Bot },
            { tabId: 'audit', label: 'Immutable Audit Logs', icon: History },
          ],
        },
        {
          groupTitle: 'GLOBAL PLATFORM',
          items: [
            { tabId: 'levels', label: 'हिंदी स्तर (Pathway)', icon: BookOpen },
            { tabId: 'competitions', label: 'प्रतियोगिता (Battles)', icon: Trophy },
            { tabId: 'leaderboard', label: 'लीडरबोर्ड (Ranks)', icon: BarChart3 },
            { tabId: 'institutes', label: 'संस्थान (Institutes)', icon: Building2 },
            { tabId: 'library', label: 'पुस्तकालय (Library)', icon: BookOpen },
          ],
        },
      ],
    },
  };

  const currentRoleData = roleSidebarData[role] || roleSidebarData.student;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-sm z-30">
      {/* Sidebar Header with Official Emblem / Logo */}
      <div className="p-4 space-y-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition">
            हि
          </div>
          <div>
            <h2 className="text-xs font-black uppercase text-blue-900 leading-tight tracking-tight">
              केंद्रीय हिंदी संस्थान
            </h2>
            <span className="text-[9px] font-semibold text-slate-500 block">
              AI-POWERED HINDI LMS PORTAL
            </span>
          </div>
        </Link>

        {/* Dynamic Role Switcher Dropdown inside Sidebar */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-full p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs flex items-center justify-between shadow-xs hover:bg-blue-100 transition"
          >
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-blue-600" />
              <span>Role: <span className="uppercase text-blue-700 font-black">{role}</span></span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
          </button>

          {roleMenuOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1 text-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block">
                SWITCH LOGGED IN ROLE
              </span>
              {ROLES_QUICK_SWITCH.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleSwitch(r.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold transition flex items-center justify-between ${
                    role === r.id ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <r.icon className={`w-3.5 h-3.5 ${role === r.id ? 'text-white' : r.color}`} />
                    {r.label}
                  </span>
                  {role === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grouped Sidebar Menus */}
        <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
          {currentRoleData.groups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">
                {grp.groupTitle}
              </span>

              <div className="space-y-0.5">
                {grp.items.map((item, iIdx) => {
                  const targetHref = `/dashboard/${role}?tab=${item.tabId}`;
                  const isActive = activeTab === item.tabId;

                  return (
                    <Link
                      key={iIdx}
                      href={targetHref}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Card Matching Screenshot */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/80">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500 shrink-0"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-800 block line-clamp-1">{user?.name}</span>
              <span className="text-[10px] text-blue-600 font-semibold block uppercase line-clamp-1">
                {role.toUpperCase()} • CLASS 10
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Logout / Login Portal"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
