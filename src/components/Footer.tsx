'use client';

import Link from 'next/link';
import { topics } from '@/lib/topics';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]" style={{background:'var(--bg-secondary)'}}>
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile: tout empilé pleine largeur | Desktop: logo+menus centrés */}
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-8 mb-8">
          {/* Logo + nom */}
          <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
            <img src="/logo.png" alt="DailyTrend" className="w-3/4 max-w-[220px] md:max-w-[160px]" />
            <span className="text-3xl font-extrabold tracking-tight mt-3 inline-block" style={{color:'var(--text-primary)'}}>Daily<span style={{color:'var(--accent)'}}>Trend</span></span>
          </div>

          {/* Menus — empilés mobile, côte à côte desktop */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 w-full sm:w-auto">
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

        {/* Actions rapides — centrées */}
        <div className="border-t border-[var(--border)] pt-6 mb-6 flex justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-lg">
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-sm font-bold mb-1" style={{color:'var(--text-primary)'}}>Restez connecté</h4>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>Active les notifications pour ne rien rater.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  if ('serviceWorker' in navigator && 'PushManager' in window) {
                    try {
                      const reg = await navigator.serviceWorker.register('/sw.js');
                      const perm = await Notification.requestPermission();
                      if (perm === 'granted') {
                        const VAPID_KEY = 'BJz_Xeqn5j15mWV3zJsOyF6WY76MAPvuUF56JRD7goZvVQ7GYqIhPgn1pYsw7vrhDF10UJ7qU807tG5OYDRNP3I';
                        const sub = await reg.pushManager.subscribe({
                          userVisibleOnly: true,
                          applicationServerKey: VAPID_KEY,
                        });
                        await fetch('/api/push-subscribe', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'subscribe', subscription: sub.toJSON() }),
                        });
                        localStorage.setItem('dt-engagement', 'notifications');
                        alert('✅ Notifications activées !');
                      } else {
                        alert('❌ Permissions refusées. Tu peux les activer dans les paramètres du navigateur.');
                      }
                    } catch (e) {
                      alert('⚠️ Erreur: ' + (e as Error).message);
                    }
                  } else {
                    alert('⚠️ Ton navigateur ne supporte pas les notifications push.');
                  }
                }}
                className="px-4 py-2 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
                style={{background:'var(--accent)'}}
              >
                🔔 Notifications
              </button>
              <button
                onClick={() => {
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/sw.js');
                  }
                }}
                className="px-4 py-2 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
                style={{background:'var(--bg-primary)', color:'var(--text-secondary)', border:'1px solid var(--border)'}}
              >
                📱 Écran d&apos;accueil
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px]" style={{color:'var(--text-muted)'}}>
          © {new Date().getFullYear()} DailyTrend — dailytrend.fr
        </div>
      </div>
    </footer>
  );
}
