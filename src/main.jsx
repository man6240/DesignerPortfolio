import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/fredoka';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import App from './App.jsx';
import { langFromPath } from './i18n.jsx';
import './styles.css';
import './design.css';

// index.html sets this before first paint; set it here too so any page that loads the bundle
// (the preview build, an embed) gets the same layout as the live site.
document.documentElement.classList.add('js');
const lang = langFromPath(location.pathname);
const root = document.getElementById('root');
// The production build ships prerendered HTML (scripts/prerender.mjs); pick it up instead of re-rendering.
if (root.firstElementChild) hydrateRoot(root, <App lang={lang} />);
else createRoot(root).render(<App lang={lang} />);
// Animated parts stay hidden (styles.css, html.js) until the app has taken over.
requestAnimationFrame(() => document.documentElement.classList.add('hydrated'));
