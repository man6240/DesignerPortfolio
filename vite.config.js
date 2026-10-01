import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        -> dist/ (multi-file build for Cloudflare Pages; images emitted as files)
// `npm run build:single` -> dist-single/index.html (everything, images included, inlined in one file)
// In dev (and the single-file build) nothing prerenders the page, so fill the head's placeholders in English.
const devHead = {
  name: 'dev-head',
  transformIndexHtml: {
    order: 'pre',
    handler: (html, ctx) => (ctx.server || process.env.SINGLE
      ? html.replaceAll('__TITLE__', 'Rafael Vitriago — Graphic Designer').replaceAll('__DESCRIPTION__', 'Graphic designer in Jaén, Spain.')
        .replaceAll('__URL__', 'https://www.rafaelvitriago.eu/').replaceAll('__LOCALE__', 'en_GB').replaceAll('__ALT_LOCALE__', 'es_ES')
      : html),
  },
};

export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  if (single) process.env.SINGLE = '1';
  return {
    plugins: [react(), devHead, ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      chunkSizeWarningLimit: 4000,
      assetsInlineLimit: single ? 100_000_000 : 4096,
    },
  };
});
