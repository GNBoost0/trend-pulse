import { NextResponse } from 'next/server';

// URL du Google Apps Script Web App — à configurer après déploiement du Sheet
const APPS_SCRIPT_URL = process.env.DT_APPS_SCRIPT_URL || '';

export async function POST(request: Request) {
  if (!APPS_SCRIPT_URL) {
    // Mode dégradé : pas de backend configuré, on accepte silencieusement
    return NextResponse.json({ status: 'ok', message: 'No backend configured' });
  }

  try {
    const body = await request.json();
    
    const resp = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: 'Proxy error' },
      { status: 500 }
    );
  }
}
