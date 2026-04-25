import type { Metadata } from 'next';
import { AdSenseScript } from '@/components/Adsense';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DailyTrend — L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
    template: '%s | DailyTrend',
  },
  description: 'Votre source quotidienne d\'actualités : Intelligence Artificielle, Crypto & Blockchain, Cybersécurité, Bien-être & Biohacking, Gaming & E-sport, Finance & Business.',
  metadataBase: new URL('https://dailytrend.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dailytrend.vercel.app',
    siteName: 'DailyTrend',
    title: 'DailyTrend — L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
    description: 'Votre source quotidienne d\'actualités : IA, Crypto, Cybersécurité, Bien-être, Gaming.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyTrend',
    description: 'L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo-header.png" />
        <link rel="alternate" type="application/rss+xml" title="DailyTrend RSS" href="/rss.xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
