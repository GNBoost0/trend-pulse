'use client';

import Script from 'next/script';

const ADSENSE_CLIENT_ID = ''; // À remplir après approbation Google AdSense

export function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export function AdBanner() {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-full max-w-[728px] min-h-[90px]">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot=""
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

export function AdSidebar() {
  return (
    <div className="w-full min-h-[250px] my-4">
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot=""
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdInArticle() {
  return (
    <div className="w-full min-h-[120px] my-8">
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot=""
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </div>
  );
}
