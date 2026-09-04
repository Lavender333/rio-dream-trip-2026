import app from 'vinext/server/fetch-handler';

type Env = { SITE_PASSWORD?: string };
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void };

const encoder = new TextEncoder();

function loginPage(message = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rio Dream Trip 2026</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(140deg,#10243b 0%,#1d4969 55%,#c89645 160%);font-family:Arial,sans-serif;color:#10243b}.card{width:min(420px,calc(100% - 36px));padding:34px;background:#fffdf9;border-radius:22px;box-shadow:0 24px 80px #07131e66}.eyebrow{margin:0 0 8px;color:#866020;font-weight:700;font-size:12px;letter-spacing:.1em;text-transform:uppercase}h1{font-family:Georgia,serif;font-size:34px;margin:0 0 12px}p{line-height:1.5;color:#465467}form{display:grid;gap:12px;margin-top:24px}label{font-size:14px;font-weight:700}input{font:inherit;padding:13px;border:1px solid #aeb8c3;border-radius:10px}button{font:inherit;font-weight:700;padding:13px;border:0;border-radius:10px;background:#c89645;color:#10243b;cursor:pointer}.error{color:#a12424;font-size:14px}</style></head><body><main class="card"><p class="eyebrow">Private travel guide</p><h1>Rio Dream Trip</h1><p>Enter the trip password to open the interactive itinerary, stays, distances and budget.</p>${message ? `<p class="error">${message}</p>` : ''}<form method="post" action="/unlock"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required autofocus><button type="submit">Open the guide</button></form></main></body></html>`;
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function equal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function accessToken(env: Env) {
  if (!env.SITE_PASSWORD) throw new Error('SITE_PASSWORD is not configured');
  return digest(`rio-dream-trip:${env.SITE_PASSWORD}`);
}

function cookie(request: Request, name: string) {
  return request.headers.get('Cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? '';
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const secure = url.protocol === 'https:' ? '; Secure' : '';

    if (url.pathname === '/unlock' && request.method === 'POST') {
      const form = await request.formData();
      const entered = String(form.get('password') ?? '');
      const expected = await accessToken(env);
      if (!equal(await digest(`rio-dream-trip:${entered}`), expected)) return new Response(loginPage('That password does not match.'), { status: 401, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      return new Response(null, { status: 303, headers: { Location: '/', 'Set-Cookie': `rio_access=${expected}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}` } });
    }

    if (url.pathname === '/lock') return new Response(null, { status: 303, headers: { Location: '/', 'Set-Cookie': `rio_access=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}` } });

    if (!equal(cookie(request, 'rio_access'), await accessToken(env))) return new Response(loginPage(), { status: 401, headers: { 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-store' } });
    return app.fetch(request, env, ctx);
  },
};
