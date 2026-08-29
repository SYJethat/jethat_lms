'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Receipt,
  Download,
  CheckCircle2,
  Shield,
  Tag,
  CreditCard,
  QrCode,
  User as UserIcon,
  BookOpen,
  Building2,
  Search,
  Calendar,
  FileText,
  Printer,
  Sparkles,
  Award
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

export interface PaymentTransaction {
  id: string;
  invoiceNumber: string;
  itemTitle: string;
  category: 'Indian Languages Course' | 'Global Foreign Course' | 'University Registration' | 'Certificate Fee';
  date: string;
  amount: string;
  method: 'UPI QR' | 'Credit Card' | 'Netbanking' | '100% Free Govt Subsidy';
  status: 'Paid ✓' | 'Verified & Active';
}

export default function DashboardAccountDetailsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: 'tx_1',
      invoiceNumber: 'INV-HLMS-2026-981240',
      itemTitle: 'தமிழ் மூலம் हिंदी — Tamil to Hindi Masterclass',
      category: 'Indian Languages Course',
      date: '2026-08-28',
      amount: '₹0.00 (100% Govt Subsidy Code: BHASHA2026)',
      method: '100% Free Govt Subsidy',
      status: 'Paid ✓'
    },
    {
      id: 'tx_2',
      invoiceNumber: 'INV-GLOBAL-2026-761294',
      itemTitle: 'English to All 22 Scheduled Indian Languages Masterclass',
      category: 'Global Foreign Course',
      date: '2026-08-27',
      amount: '₹0.00 (100% Scholarship Code: GLOBALBHASHA2026)',
      method: '100% Free Govt Subsidy',
      status: 'Paid ✓'
    },
    {
      id: 'tx_3',
      invoiceNumber: 'INV-UNI-2026-981240',
      itemTitle: 'Kendriya Hindi Sansthan (Central Hindi Institute), Agra Admission',
      category: 'University Registration',
      date: '2026-08-25',
      amount: '₹0.00 (Subsidized MoE Seats)',
      method: 'UPI QR',
      status: 'Verified & Active'
    },
    {
      id: 'tx_4',
      invoiceNumber: 'INV-CERT-2026-441209',
      itemTitle: 'Accredited International Diploma Verification Fee',
      category: 'Certificate Fee',
      date: '2026-08-20',
      amount: '₹499.00',
      method: 'Credit Card',
      status: 'Paid ✓'
    }
  ]);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleDownloadInvoice = (tx: PaymentTransaction) => {
    alert(`📄 Downloading Official GST Invoice PDF for ${tx.invoiceNumber}...`);
  };

  const filteredTx = transactions.filter((t) => {
    return (
      t.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider">
              FINANCIAL LEDGERS & ACCOUNTS PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              खाता विवरण एवं भुगतान इतिहास (Account & Payment Details)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              View your student profile summary, course enrollments count, payment history, tax invoices, and scholarship vouchers.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search invoice or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Account & Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400">REGISTERED STUDENT</span>
            <h3 className="text-base font-black text-slate-900">{user?.name || 'Aarav Sharma'}</h3>
            <span className="text-[11px] font-bold text-indigo-600">ID: STU-HLMS-2026-981</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400">ENROLLED COURSES COUNT</span>
            <h3 className="text-2xl font-black text-slate-900">{user?.enrolledCourses?.length || 3} Courses</h3>
            <span className="text-[11px] font-bold text-emerald-600">Active Access Unlocked</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400">SCHOLARSHIP SUBSIDY</span>
            <h3 className="text-2xl font-black text-emerald-600">100% Free</h3>
            <span className="text-[11px] font-bold text-slate-600">Govt Code: BHASHA2026</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400">PAYMENT STATUS</span>
            <h3 className="text-2xl font-black text-emerald-600">Verified ✓</h3>
            <span className="text-[11px] font-bold text-slate-600">All Invoices Cleared</span>
          </div>
        </div>
      </div>

      {/* PAYMENT TRANSACTION HISTORY TABLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">भुगतान एवं चालान इतिहास (Payment & Invoice History)</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{filteredTx.length} Invoices Found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Course / Service Item</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-mono font-bold text-indigo-900">{tx.invoiceNumber}</td>
                  <td className="p-3.5 max-w-xs font-bold text-slate-900">{tx.itemTitle}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{tx.date}</td>
                  <td className="p-3.5">{tx.method}</td>
                  <td className="p-3.5 font-extrabold text-emerald-700">{tx.amount}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(tx)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
