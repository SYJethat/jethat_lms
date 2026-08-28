import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hindi Language LMS — Scalable Platform for Hindi Learning & Certification',
  description: 'Production-ready Hindi Learning Management System combining gamified levels, AI speech & writing assessments, accredited institute degrees, digital avatars, live classes, and global competitions.',
  keywords: ['Hindi LMS', 'Learn Hindi', 'Devanagari', 'Hindi Grammar', 'AI Hindi Tutor', 'Kendriya Hindi Sansthan', 'Hindi Certification'],
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
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
