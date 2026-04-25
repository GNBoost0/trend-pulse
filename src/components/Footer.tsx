'use client';

import Link from 'next/link';
import { topics } from '@/lib/topics';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]" style={{background:'var(--bg-secondary)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Logo + Menus centrés ensemble */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          {/* Logo + nom */}
          <div className="flex flex-col items-center shrink-0">
            <img src="/logo.png" alt="DailyTrend" className="w-full max-w-[200px] md:max-w-[160px]" />
            <span className="text-3xl font-extrabold tracking-tight mt-3 inline-block" style={{color:'var(--text-primary)'}}>Daily<span style={{color:'var(--accent)'}}>Trend</span></span>
          </div>

          {/* Menus */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{color:'var(--text-muted)'}}>Rubriques</h4>
              {topics.map(t => (
                <Link key={t.id} href={`/${t.slug}`} className="block text-xs py-1 transition-colors hover:opacity-80" style={{color:'var(--text-secondary)'}}>{t.icon} {t.name}</Link>
              ))}
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{color:'var(--text-muted)'}}>Pages</h4>
              <Link href="/a-propos" className="block text-xs py-1 transition-colors hover:opacity-80" style={{color:'var(--text-secondary)'}}>À propos</Link>
              <Link href="/contact" className="block text-xs py-1 transition-colors hover:opacity-80" style={{color:'var(--text-secondary)'}}>Contact</Link>
              <Link href="/mentions-legales" className="block text-xs py-1 transition-colors hover:opacity-80" style={{color:'var(--text-secondary)'}}>Mentions légales</Link>
            </div>
          </div>
        </div>

        {/* Newsletter — en dessous, centré */}
        <div className="border-t border-[var(--border)] pt-6 mb-6 flex justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-lg">
            <div className="flex-1">
              <h4 className="text-sm font-bold mb-1" style={{color:'var(--text-primary)'}}>Newsletter</h4>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>Le récap quotidien dans votre boîte.</p>
            </div>
            <form className="flex gap-1.5" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="email" className="px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" style={{background:'var(--bg-primary)',color:'var(--text-primary)',border:'1px solid var(--border)'}} />
              <button className="px-4 py-2 text-white text-sm font-semibold rounded-md hover:opacity-90" style={{background:'var(--accent)'}}>OK</button>
            </form>
          </div>
        </div>

        <div className="text-center text-[11px]" style={{color:'var(--text-muted)'}}>
          © {new Date().getFullYear()} DailyTrend — dailytrend.fr
        </div>
      </div>
    </footer>
  );
}
