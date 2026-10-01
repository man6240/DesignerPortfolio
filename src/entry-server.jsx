import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { contentFor } from './i18n.jsx';

// Used at build time only (scripts/prerender.mjs): renders each language to static HTML so search
// engines and link previews see the full content without running JavaScript.
export function render(lang) {
  return renderToString(<App lang={lang} />);
}
export const meta = (lang) => contentFor(lang).UI.meta;
