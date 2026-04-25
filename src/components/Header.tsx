'use client';

import Link from 'next/link';
import { topics } from '@/lib/topics';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('dt-theme');
    const preferDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (preferDark) { document.documentElement.setAttribute('data-theme','dark'); setDark(true); }
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('dt-theme', next ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50" style={{
      background: 'var(--bg-header)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barre principale */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo-header.png" alt="DailyTrend" className="h-9 w-9 rounded-lg" />
            <span className="text-[28px] font-extrabold tracking-tight" style={{color:'var(--text-primary)'}}>
              Daily<span style={{color:'var(--accent)'}}>Trend</span>
            </span>
          </Link>

          {/* Navigation desktop — pills stylées */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-secondary)] rounded-full px-2 py-1" style={{border:'1px solid var(--border)'}}>
            {topics.map(topic => (
              <Link key={topic.id} href={`/${topic.slug}`}
                className="px-3 py-1 rounded-full text-[12px] font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                style={{color:'var(--text-secondary)'}}>
                {topic.icon} <span className="ml-0.5">{topic.name.split(' ')[0]}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            {/* Recherche */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-32 sm:w-48 px-3 py-1.5 rounded-l-full text-sm outline-none"
                  style={{background:'var(--bg-secondary)', color:'var(--text-primary)', border:'1px solid var(--border)', borderRight:'none'}}
                  onBlur={() => { if (!query) setSearchOpen(false); }}
                />
                <button type="submit" className="px-3 py-1.5 rounded-r-full transition-colors" style={{background:'var(--accent)', color:'white'}}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-muted)'}}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            )}

            {/* Thème */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-muted)'}} title={dark ? 'Mode jour' : 'Mode nuit'}>
              {dark ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            {/* Burger mobile */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-full hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-muted)'}}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile — overlay */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{background:'var(--bg-primary)', borderColor:'var(--border)'}}>
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {/* Recherche mobile */}
            <form onSubmit={handleSearch} className="flex mb-3">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="flex-1 px-4 py-2.5 rounded-l-xl text-sm outline-none"
                style={{background:'var(--bg-secondary)', color:'var(--text-primary)', border:'1px solid var(--border)', borderRight:'none'}}
              />
              <button type="submit" className="px-4 rounded-r-xl text-white font-semibold text-sm" style={{background:'var(--accent)'}}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            </form>

            {topics.map(topic => (
              <Link key={topic.id} href={`/${topic.slug}`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--tag-bg)] transition-colors" style={{color:'var(--text-secondary)'}}>
                <span className="text-lg">{topic.icon}</span>
                <span className="text-sm font-medium">{topic.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
