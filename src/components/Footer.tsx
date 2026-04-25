'use client';

import Link from 'next/link';
import { topics } from '@/lib/topics';

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <img src="/logo.png" alt="DailyTrend" className="h-7 w-7 rounded-md" />
              <span className="text-sm font-extrabold" style={{color:'var(--text-primary)'}}>Daily<span style={{color:'var(--accent)'}}>Trend</span></span>
            </Link>
            <p className="text-xs leading-relaxed" style={{color:'var(--text-muted)'}}>L'actu tech & finance sans bullshit. Chaque jour.</p>
          </div>
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
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{color:'var(--text-muted)'}}>Newsletter</h4>
            <p className="text-xs mb-2" style={{color:'var(--text-muted)'}}>Le récap quotidien dans votre boîte.</p>
            <form className="flex gap-1.5" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="email" className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" style={{background:'var(--bg-primary)',color:'var(--text-primary)',border:'1px solid var(--border)'}} />
              <button className="px-3 py-1.5 text-white text-xs font-semibold rounded-md hover:opacity-90" style={{background:'var(--accent)'}}>OK</button>
            </form>
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--border)] text-center text-[11px]" style={{color:'var(--text-muted)'}}>
          © {new Date().getFullYear()} DailyTrend — dailytrend.fr
        </div>
      </div>
    </footer>
  );
}
