import Link from 'next/link';
import { topics } from '@/lib/topics';

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-600 text-white text-center py-1.5 text-xs font-medium tracking-wide">
        ⚡ Votre dose quotidienne de tech, crypto, IA & gaming
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-lg shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none tracking-tight text-white">
                  TREND<span className="text-brand-400">PULSE</span>
                </span>
                <span className="text-[10px] text-gray-500 tracking-widest uppercase font-medium hidden sm:block">
                  L'actu qui compte
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {topics.map(topic => (
                <Link
                  key={topic.id}
                  href={`/${topic.slug}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{topic.icon}</span>
                  <span>{topic.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-1">
              {topics.map(topic => (
                <Link
                  key={topic.id}
                  href={`/${topic.slug}`}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  title={topic.name}
                >
                  <span className="text-lg">{topic.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
