'use client';

import Link from 'next/link';
import { topics } from '@/lib/topics';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#060609]">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card p-8 sm:p-12 text-center max-w-2xl mx-auto mb-16">
          <span className="text-4xl mb-4 block">📬</span>
          <h3 className="text-2xl font-bold text-white mb-2">Ne ratez plus rien</h3>
          <p className="text-gray-400 mb-6">Le récap quotidien des actus tech, crypto, IA et gaming — directement dans votre boîte mail.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
            />
            <button type="submit" className="px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30">
              S'abonner
            </button>
          </form>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-sm">⚡</div>
              <span className="text-lg font-black text-white">TREND<span className="text-brand-400">PULSE</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              L'actualité tech décryptée.<br />Chaque jour, sans bullshit.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Rubriques</h4>
            <div className="space-y-2.5">
              {topics.map(topic => (
                <Link key={topic.id} href={`/${topic.slug}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                  <span>{topic.icon}</span> {topic.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Liens</h4>
            <div className="space-y-2.5">
              <Link href="/a-propos" className="block text-sm text-gray-500 hover:text-white transition-colors">À propos</Link>
              <Link href="/contact" className="block text-sm text-gray-500 hover:text-white transition-colors">Contact</Link>
              <Link href="/mentions-legales" className="block text-sm text-gray-500 hover:text-white transition-colors">Mentions légales</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Suivez-nous</h4>
            <div className="flex gap-2">
              {['𝕏', 'f', 'in', '▶'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 text-sm hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Trend Pulse. Tous droits réservés. Fait avec ⚡ et beaucoup de café.
        </div>
      </div>
    </footer>
  );
}
