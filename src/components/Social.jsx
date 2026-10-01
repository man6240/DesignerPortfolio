import { useEffect, useRef } from 'react';
import { useContent } from '../i18n.jsx';

/* The social media rail: posts in a row you can drag (mouse), swipe (touch) or scroll with the
   keyboard, over a light section with the section's name as a watermark behind it. */
export default function Social() {
  const { SOCIAL, UI } = useContent();
  const rail = useRef(null);

  // drag to scroll with a mouse; touch and trackpads scroll natively
  useEffect(() => {
    const el = rail.current;
    let down = false, x0 = 0, s0 = 0, moved = false;
    const start = (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = el.scrollLeft; el.classList.add('dragging'); };
    const move = (e) => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = s0 - dx; };
    const end = () => { down = false; el.classList.remove('dragging'); };
    const click = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    el.addEventListener('click', click, true);
    return () => {
      el.removeEventListener('pointerdown', start);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      el.removeEventListener('click', click, true);
    };
  }, []);

  return (
    <section className="social" id="social" data-tone="light">
      <p className="watermark" aria-hidden="true">Social</p>
      <div className="wrap social-head reveal">
        <p className="eyebrow">{UI.social.eyebrow}</p>
        <h2 className="headline">{UI.social.headline}</h2>
        <p className="section-sub">{UI.social.sub}</p>
      </div>
      <div className="rail" ref={rail} tabIndex={0} role="group" aria-label={UI.social.rail}>
        <ul className="rail-track">
          {SOCIAL.map((s, i) => (
            <li key={s.id} className="post reveal" style={{ '--c': s.color }}>
              <figure>
                <div className="post-img" style={s.ratio ? { aspectRatio: s.ratio } : undefined}><img src={s.src} alt={`${s.title}: ${s.note}`} loading="lazy" decoding="async" draggable="false" /></div>
                <figcaption>
                  <span className="post-n">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{s.title}</strong>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <p className="wrap rail-hint" aria-hidden="true">{UI.social.drag} →</p>
    </section>
  );
}
