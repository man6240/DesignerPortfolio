// Prerenders both languages after the two vite builds:
//   dist/index.html     English (/)
//   dist/es/index.html  Spanish (/es/)
// Each gets its own <html lang>, title, description, canonical, Open Graph locale and the full page text.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.rafaelvitriago.eu';

// React warns that layout effects don't run on the server; that is expected here.
const error = console.error;
console.error = (msg, ...rest) => { if (!String(msg).includes('useLayoutEffect')) error(msg, ...rest); };

const { render, meta } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const template = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html has no <!--app-html--> placeholder');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const lang of ['en', 'es']) {
  const m = meta(lang);
  const url = lang === 'es' ? `${SITE}/es/` : `${SITE}/`;
  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replaceAll('__TITLE__', esc(m.title))
    .replaceAll('__DESCRIPTION__', esc(m.description))
    .replaceAll('__URL__', url)
    .replaceAll('__LOCALE__', lang === 'es' ? 'es_ES' : 'en_GB')
    .replaceAll('__ALT_LOCALE__', lang === 'es' ? 'en_GB' : 'es_ES')
    .replace('<!--app-html-->', render(lang));
  const dir = lang === 'es' ? path.join(root, 'dist/es') : path.join(root, 'dist');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), html);
}
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('prerendered dist/index.html (en) and dist/es/index.html (es)');
