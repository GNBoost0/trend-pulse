'use client';

import Link from 'next/link';
import Image from 'next/image';
import { topics } from '@/lib/topics';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dt-theme');
    const preferDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (preferDark) { document.documentElement.setAttribute('data-theme','dark'); setDark(true); }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('dt-theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]" style={{background:'var(--bg-header)', backdropFilter:'blur(20px)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="DailyTrend" className="h-8 w-8 rounded-lg" />
            <span className="text-[15px] font-extrabold tracking-tight" style={{color:'var(--text-primary)'}}>Daily<span style={{color:'var(--accent)'}}>Trend</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {topics.map(topic => (
              <Link key={topic.id} href={`/${topic.slug}`} className="px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-secondary)'}}>
                {topic.icon} <span className="ml-1">{topic.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-muted)'}} title={dark ? 'Mode jour' : 'Mode nuit'}>
              {dark ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-muted)'}}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-3 border-t border-[var(--border)] pt-2 space-y-0.5">
            {topics.map(topic => (
              <Link key={topic.id} href={`/${topic.slug}`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-secondary)'}}>
                <span className="text-base">{topic.icon}</span> {topic.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
