import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as C from './content.js';

/* English lives at /, Spanish at /es/. Both are prerendered (scripts/prerender.mjs), so each
   URL arrives already in its language; the switch in the nav then swaps the text in place and
   updates the address, title and <html lang> without a reload. */

export const LANGS = ['en', 'es'];
export const pathFor = (lang) => (lang === 'es' ? '/es/' : '/');
export const langFromPath = (path = '/') => (/^\/es(\/|$)/.test(path) ? 'es' : 'en');

// Replace every T(en, es) in the content tree with the string for `lang`.
function resolve(v, lang) {
  if (Array.isArray(v)) return v.map((x) => resolve(x, lang));
  if (v && typeof v === 'object') {
    if (v.__t) return v[lang];
    if (Object.getPrototypeOf(v) !== Object.prototype) return v;
    const out = {};
    for (const k in v) out[k] = resolve(v[k], lang);
    return out;
  }
  return v;
}
const cache = {};
export const contentFor = (lang) => (cache[lang] ??= resolve({ ...C }, lang));

const Ctx = createContext(null);

export function LangProvider({ initial, children }) {
  const [lang, setLangState] = useState(initial);

  const setLang = useCallback((next) => {
    if (next === lang) return;
    setLangState(next);
    try { localStorage.setItem('lang', next); } catch {}
    const c = contentFor(next);
    document.documentElement.lang = next;
    document.title = c.UI.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.UI.meta.description);
    // the preview build (relative base) lives at an address it doesn't own, so it only swaps the text
    if (import.meta.env.BASE_URL === '/') history.replaceState(null, '', pathFor(next) + location.hash);
  }, [lang]);

  // Back/forward between the two addresses
  useEffect(() => {
    const on = () => setLangState(langFromPath(location.pathname));
    window.addEventListener('popstate', on);
    return () => window.removeEventListener('popstate', on);
  }, []);

  const value = useMemo(() => ({ lang, setLang, c: contentFor(lang) }), [lang, setLang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export const useContent = () => useContext(Ctx).c;
