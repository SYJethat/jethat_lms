import './globals.css';
import type { Metadata } from 'next';
import GIGWHeaderBar from '@/components/GIGWHeaderBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hindi Language LMS — GIGW 3.0 & NEP 2020 Compliant Platform',
  description: 'Production-ready Hindi Learning Management System adhering to GIGW 3.0, W3C WCAG 2.1 AAA, Google Play IAP Billing, CERT-In Cyber Security, and NEP 2020 guidelines.',
  keywords: ['GIGW LMS', 'Hindi LMS', 'Learn Hindi', 'Devanagari', 'Hindi Grammar', 'AI Hindi Tutor', 'Kendriya Hindi Sansthan', 'Hindi Certification'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col antialiased">
        {/* Top GIGW 3.0 & Accessibility Toolbar */}
        <GIGWHeaderBar />

        {/* Global Navbar */}
        <Navbar />

        {/* Main Viewport Content Area with GIGW Skip Anchor */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
