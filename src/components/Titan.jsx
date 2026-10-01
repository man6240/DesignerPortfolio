import { useEffect, useRef } from 'react';
import { useContent } from '../i18n.jsx';
import cover from '../assets/design/gracia-portada.webp';
import post from '../assets/design/post-amigo.webp';
import phone from '../assets/design/tipapp-pago.webp';

/* One word from edge to edge, set as SVG text stretched to the full width, with three pieces
   floating in front of it. They drift apart as the section scrolls through. */
export default function Titan() {
  const { UI } = useContent();
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="titan" data-tone="light" ref={root} aria-label={UI.titan.word}>
      <div className="titan-in">
        <svg className="titan-word" viewBox="0 0 1000 230" role="img" aria-label={UI.titan.word}>
          <text x="0" y="196" textLength="1000" lengthAdjust="spacingAndGlyphs">{UI.titan.word}</text>
        </svg>
        <div className="titan-pieces" aria-hidden="true">
          <img className="tp tp1" src={cover} alt="" loading="lazy" decoding="async" />
          <img className="tp tp2" src={post} alt="" loading="lazy" decoding="async" />
          <img className="tp tp3" src={phone} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="titan-foot">
          <p>{UI.titan.left}<br />{UI.titan.left2}</p>
          <p>{UI.titan.right}<br />{UI.titan.right2}</p>
        </div>
      </div>
    </section>
  );
}
