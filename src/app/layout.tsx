import type { Metadata } from 'next';
import { AdSenseScript } from '@/components/Adsense';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Trend Pulse — L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
    template: '%s | Trend Pulse',
  },
  description: 'Votre source quotidienne d\'actualités : Intelligence Artificielle, Crypto & Blockchain, Cybersécurité, Bien-être & Biohacking, Gaming & E-sport.',
  metadataBase: new URL('https://trend-pulse.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://trend-pulse.vercel.app',
    siteName: 'Trend Pulse',
    title: 'Trend Pulse — L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
    description: 'Votre source quotidienne d\'actualités : IA, Crypto, Cybersécurité, Bien-être, Gaming.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trend Pulse',
    description: 'L\'actualité Tech, Crypto, IA, Gaming & Bien-être',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="Trend Pulse RSS" href="/rss.xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
