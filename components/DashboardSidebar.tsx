'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  LogIn,
  CheckCircle2,
  History,
  Globe,
  Compass,
  Bookmark,
  FileText,
  X,
  Save,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { getActiveRole, getStoredUser, saveStoredUser, User } from '@/lib/lmsStore';

interface SidebarItem {
  tabId: string;
  label: string;
  icon: any;
  badge?: string;
  subItems?: {
    tabId: string;
    label: string;
    badge?: string;
  }[];
}

interface SidebarGroup {
  groupTitle: string;
  items: SidebarItem[];
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = getActiveRole();
  const activeTab = searchParams.get('tab') || 'overview';

  const [user, setUser] = useState<User | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [footerMenuOpen, setFooterMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Dropdown open/close map state
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'courses-dropdown': false,
    'classes-dropdown': false,
    'free-dropdown': false,
    'ai-dropdown': false,
  });

  // Editable Student Profile Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    const cur = getStoredUser();
    setUser(cur);
    setEditName(cur.name || 'Aarav Sharma');
    setEditEmail(cur.email || 'aarav.sharma@lms.edu.in');
    setEditBio('Class 10 CBSE Student • Devanagari Learner');

    const handleUpdate = () => {
      const updated = getStoredUser();
      setUser(updated);
    };

    window.addEventListener('userStateUpdated', handleUpdate);
    return () => window.removeEventListener('userStateUpdated', handleUpdate);
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      name: editName,
      email: editEmail
    };

    saveStoredUser(updatedUser);
    setUser(updatedUser);
    setEditModalOpen(false);
    setFooterMenuOpen(false);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('userStateUpdated'));
    }

    alert('✅ Student Profile Details updated successfully!');
  };

  const handleLogout = () => {
    setFooterMenuOpen(false);
    router.push('/login');
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
            {
              tabId: 'courses-dropdown',
              label: 'Courses',
              icon: BookOpen,
              subItems: [
                { tabId: 'indian-languages', label: 'Indian Languages', badge: '22' },
                { tabId: 'foreign-languages', label: 'Foreign to Indian Languages', badge: '15' },
              ],
            },
            {
              tabId: 'free-dropdown',
              label: 'Free Resources',
              icon: Video,
              badge: 'FREE',
              subItems: [
                { tabId: 'free-videos', label: 'Free Videos', badge: 'HD' },
                { tabId: 'free-audio', label: 'Free Audio', badge: 'Audio' },
                { tabId: 'guided-learning', label: 'Guided Study', badge: 'PDF' },
              ],
            },
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen, badge: 'L1-L7' },
            { tabId: 'exam', label: 'Assessments & Exams', icon: HelpCircle, badge: '3' },
            {
              tabId: 'classes-dropdown',
              label: 'Classes & Training',
              icon: Video,
              badge: '2',
              subItems: [
                { tabId: 'classes', label: 'Live Classes (Online)' },
                { tabId: 'physical', label: 'Physical Classes (Offline)'},
              ],
            },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
            { tabId: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
          ],
        },
        {
          groupTitle: 'AI LEARNING TOOLS',
          items: [
            {
              tabId: 'ai-dropdown',
              label: 'AI Learning Tools',
              icon: Bot,
              subItems: [
                { tabId: 'chatbot', label: 'AI Teacher Hub', badge: 'Online' },
                { tabId: 'speaking-test', label: 'AI Speaking Test', badge: 'Voice' },
                { tabId: 'writing-test', label: 'AI Writing Test', badge: 'Devanagari' },
                { tabId: 'listening-test', label: 'AI Listening Test', badge: 'Audio' },
                { tabId: 'avatar', label: 'Digital Avatars', badge: '3D' },
              ],
            },
            { tabId: 'certificates', label: 'My Certificates', icon: Shield },
            { tabId: 'account-details', label: 'Account & Payments', icon: DollarSign, badge: 'Paid' },
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
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
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
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'library', label: 'Library', icon: BookOpen },
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
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'chatbot', label: 'AI Teacher Hub', icon: Bot },
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
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'certificates', label: 'Local Certificates', icon: Award },
            { tabId: 'classes', label: 'Live Classes', icon: Video },
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
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
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
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
            { tabId: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
          ],
        },
      ],
    },
  };

  const currentRoleData = roleSidebarData[role] || roleSidebarData.student;

  return (
    <>
      <aside className={`bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-sm z-30 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Sidebar Header with Official Emblem / Logo & Toggle Icon */}
        <div className="p-3 space-y-4">
          <div className="flex items-center justify-between py-1 px-1">
            <Link href="/" className="flex items-center group overflow-hidden">
              {!isCollapsed ? (
                <img
                  src="/logo.png"
                  alt="JetHat Cyber Security & Language LMS Logo"
                  className="h-9 w-auto object-contain transition group-hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black flex items-center justify-center text-xs shadow-md">
                  JH
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar to Icons"}
              className="p-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-500 transition border border-slate-200 shrink-0"
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Grouped Sidebar Menus */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-170px)] pr-0.5 scrollbar-none">
            {currentRoleData.groups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {!isCollapsed ? (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 block">
                    {grp.groupTitle}
                  </span>
                ) : (
                  <div className="my-2 border-t border-slate-200" title={grp.groupTitle} />
                )}

                <div className="space-y-0.5">
                  {grp.items.map((item, iIdx) => {
                    if (item.subItems) {
                      const isOpen = !!openDropdowns[item.tabId];
                      const isAnySubActive = item.subItems.some((s) => s.tabId === activeTab);

                      if (isCollapsed) {
                        return (
                          <div key={iIdx} className="space-y-1 my-1">
                            <button
                              onClick={() => toggleDropdown(item.tabId)}
                              title={`${item.label} (${item.subItems.length})`}
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition relative ${
                                isAnySubActive || isOpen
                                  ? 'bg-orange-600 text-white shadow-md font-bold'
                                  : 'text-slate-700 bg-slate-50 hover:bg-orange-100 hover:text-orange-700 border border-slate-200'
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                                {item.subItems.length}
                              </span>
                            </button>

                            {isOpen && (
                              <div className="space-y-1 py-1">
                                {item.subItems.map((sub, sIdx) => {
                                  const targetHref = `/dashboard/${role}?tab=${sub.tabId}`;
                                  const isSubActive = activeTab === sub.tabId;

                                  return (
                                    <Link
                                      key={sIdx}
                                      href={targetHref}
                                      title={sub.label}
                                      className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto text-[10px] font-black transition ${
                                        isSubActive
                                          ? 'bg-orange-600 text-white shadow-xs'
                                          : 'bg-orange-50 text-orange-800 hover:bg-orange-200'
                                      }`}
                                    >
                                      {sub.label.charAt(0)}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={iIdx} className="space-y-0.5">
                          <button
                            onClick={() => toggleDropdown(item.tabId)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition select-none ${
                              isAnySubActive || isOpen
                                ? 'bg-orange-50 text-orange-700 font-extrabold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <item.icon className={`w-4 h-4 ${isAnySubActive || isOpen ? 'text-orange-600' : 'text-slate-400'}`} />
                              {item.label}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-orange-100 text-orange-800">
                                  {item.badge}
                                </span>
                              )}
                              {isOpen ? (
                                <ChevronDown className="w-3.5 h-3.5 text-orange-600" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </div>
                          </button>

                          {/* Sub-items list */}
                          {isOpen && (
                            <div className="ml-4 pl-3 border-l-2 border-orange-200 space-y-0.5 py-1 animate-in fade-in duration-150">
                              {item.subItems.map((sub, sIdx) => {
                                const targetHref = `/dashboard/${role}?tab=${sub.tabId}`;
                                const isSubActive = activeTab === sub.tabId;

                                return (
                                  <Link
                                    key={sIdx}
                                    href={targetHref}
                                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                                      isSubActive
                                        ? 'bg-orange-600 text-white font-black shadow-xs'
                                        : 'text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                                    }`}
                                  >
                                    <span>{sub.label}</span>
                                    {sub.badge && (
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                          isSubActive
                                            ? 'bg-white text-orange-600'
                                            : 'bg-orange-100 text-orange-800'
                                        }`}
                                      >
                                        {sub.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Standard Links
                    const targetHref = `/dashboard/${role}?tab=${item.tabId}`;
                    const isActive = activeTab === item.tabId;

                    if (isCollapsed) {
                      return (
                        <Link
                          key={iIdx}
                          href={targetHref}
                          title={item.label}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition relative ${
                            isActive
                              ? 'bg-orange-600 text-white shadow-md'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={iIdx}
                        href={targetHref}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-600 font-extrabold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                          {item.label}
                        </span>

                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isActive
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
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

        {/* CLICKABLE INTERACTIVE SIDEBAR FOOTER CARD */}
        <div className="p-2.5 border-t border-slate-200 bg-slate-50/70 relative">
          <button
            onClick={() => setFooterMenuOpen(!footerMenuOpen)}
            className={`w-full rounded-2xl bg-white border border-slate-200 hover:border-orange-300 shadow-xs flex items-center justify-between text-left transition group cursor-pointer ${
              isCollapsed ? 'p-2 justify-center' : 'p-2'
            }`}
            title={isCollapsed ? `${user?.name || 'Aarav Sharma'} (${role})` : undefined}
          >
            <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center text-xs shadow-xs shrink-0 group-hover:scale-105 transition">
                {user?.name?.charAt(0) || 'A'}
              </div>
              {!isCollapsed && (
                <div className="space-y-0.5 overflow-hidden">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">
                    {user?.name || 'Aarav Sharma'}
                  </h4>
                  <span className="text-[10px] text-orange-600 font-extrabold capitalize block">
                    {role} Console ▾
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
          </button>

          {/* Footer Popover Dropdown Menu */}
          {footerMenuOpen && (
            <div className={`absolute bottom-full mb-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150 ${
              isCollapsed ? 'left-1 w-48' : 'left-3 right-3'
            }`}>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 py-1 block">
                STUDENT OPTIONS
              </span>

              <button
                onClick={() => {
                  setEditModalOpen(true);
                  setFooterMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-xl font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 transition"
              >
                <FileEdit className="w-4 h-4 text-orange-600" /> Edit Profile Details
              </button>

              <Link
                href={`/dashboard/${role}?tab=certificates`}
                onClick={() => setFooterMenuOpen(false)}
                className="w-full text-left px-2.5 py-2 rounded-xl font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2 transition"
              >
                <Award className="w-4 h-4 text-amber-500" /> My Certificates
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-2.5 py-2 rounded-xl font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition border-t border-slate-100 pt-2"
              >
                <LogOut className="w-4 h-4" /> Logout / Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* EDITABLE STUDENT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">STUDENT PROFILE EDITOR</span>
                  <h3 className="text-lg font-black text-slate-900">Edit Student Details</h3>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Student Full Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Email Address:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Academic Stream / Bio:</label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-[11px] text-orange-950 font-medium">
                💡 Profile updates will instantly sync across your certificates, topbar header, and student dashboard console.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
