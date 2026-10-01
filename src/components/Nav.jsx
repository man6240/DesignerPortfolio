import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Glass } from '../glass/LiquidGlass.jsx';
import { Menu, Close } from './Icons.jsx';
import { moveCapsule } from '../motion.js';
import { useContent, useLang, pathFor } from '../i18n.jsx';

/* EN | ES switch: a knob slides to the chosen language. They're real links to the other
   address, so it works without JavaScript; with it, the page swaps language in place. */
export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  const { UI } = useContent();
  const go = (l) => (e) => { e.preventDefault(); setLang(l); };
  return (
    <div className={`lang ${className}`} role="group" aria-label={UI.nav.lang} data-lang={lang}>
      <span className="lang-knob" aria-hidden="true" />
      <a href={pathFor('en')} hrefLang="en" lang="en" aria-current={lang === 'en' ? 'true' : undefined} onClick={go('en')} aria-label="English">EN</a>
      <a href={pathFor('es')} hrefLang="es" lang="es" aria-current={lang === 'es' ? 'true' : undefined} onClick={go('es')} aria-label="Español">ES</a>
    </div>
  );
}

/* Floating glass bar. It re-tints for the section underneath (light or dark),
   and a selection capsule slides to the section in view, like a tab bar. */
export default function Nav() {
  const { UI } = useContent();
  const { lang } = useLang();
  const LINKS = UI.nav.links;
  const [tone, setTone] = useState('dark');
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const under = [...document.querySelectorAll('main [data-tone], footer[data-tone]')].find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= 36 && r.bottom > 36;
      });
      if (under) setTone(under.dataset.tone);
      const current = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean).find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= vh * 0.4 && r.bottom > vh * 0.4;
      });
      setActive(current ? current.id : null);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [LINKS]);

  // the labels change width with the language, so re-measure the capsule too
  useLayoutEffect(() => {
    const a = active && linksRef.current?.querySelector(`[href="#${active}"]`);
    const pill = pillRef.current;
    if (!pill) return;
    if (a) moveCapsule(pill, { left: a.offsetLeft, width: a.offsetWidth });
    pill.classList.toggle('off', !a);
    if (!a) pill.dataset.placed = '0'; // reappear in place rather than sliding from a stale slot
  }, [active, lang]);

  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  return (
    <header className="nav" data-tone={tone}>
      <Glass className="nav-bar" refract={{ blur: 3, scale: 40, bezel: 16 }}>
        <a className="nav-mark" href="#top" aria-label={UI.nav.top}>
          <span className="monogram" aria-hidden="true">RV</span>
          <span className="nav-name">Rafael Vitriago</span>
        </a>
        <nav className="nav-links" aria-label="Sections" ref={linksRef}>
          <span className="nav-pill off" ref={pillRef} aria-hidden="true" />
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>{l.label}</a>
          ))}
        </nav>
        <LangSwitch />
        <a className="btn btn-primary btn-sm nav-cta" href="#contact">{UI.nav.contact}</a>
        <button className="nav-toggle" aria-label={open ? UI.nav.close : UI.nav.open} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <Close /> : <Menu />}
        </button>
      </Glass>
      {open && (
        <Glass className="nav-sheet" refract={{ blur: 10, scale: 50 }}>
          {[...LINKS, { id: 'contact', label: UI.nav.contact }].map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </Glass>
      )}
    </header>
  );
}
