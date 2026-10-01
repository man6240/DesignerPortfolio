import { useEffect, useRef, useState } from 'react';
import { Glass } from '../glass/LiquidGlass.jsx';
import { Star, Mail, Copy, Check, ArrowUpRight, WhatsApp } from './Icons.jsx';
import { useContent } from '../i18n.jsx';
import ryanHome from '../assets/design/ryan-1.webp';
import amigo from '../assets/design/post-amigo.webp';

/* The second half of the page as one scroll-driven story.

   Desktop: a tall container with a pinned, full-screen stage. Chapters are stacked layers in
   the stage; the scroll position gives each one a local progress `--l` (about 0 as it arrives,
   1 as it leaves) and CSS turns that into crossfades, push-ins, letters flying in and lines
   drawing, all reversible. Phones and "Reduce motion": the chapters flow as ordinary
   full-height sections that animate in once, without pinning. */

// Scrolling per chapter, in viewport heights: ANIM plays the entrance (everything pops in),
// then the finished chapter holds still for HOLD screens before handing over to the next.
// A chapter can override it with its own `hold`.
const ANIM = 1.6;
const HOLD = 0.8;
const DONE = 0.82; // local progress at which every element of a chapter has arrived
const START = 0.35; // local progress of the first chapter when the stage pins


/* ---- small building blocks ---- */

/* A heading whose letters rise into place in sequence (and fly off again on the way out). */
function Letters({ text, as: Tag = 'h2', s = 0, step = 0.012, className = '' }) {
  let i = 0;
  return (
    <Tag className={`letters ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {text.split(' ').map((word, w) => (
          <span key={w}>
            {w > 0 && ' '}
            <span className="lw">
              {[...word].map((ch) => <span key={i} className="ch" style={{ '--s': (s + step * i++).toFixed(3) }}>{ch}</span>)}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* Anything that pops in at local progress `s`. */
function Pop({ s = 0, as: Tag = 'div', className = '', style, children, ...rest }) {
  return <Tag className={`pop ${className}`} style={{ ...style, '--s': s }} {...rest}>{children}</Tag>;
}

/* ---- graphics ---- */

/* Where the story has been: a dotted map with the moves drawn as arcs. */
const PLACES = [
  { x: 440, y: 530, lx: 16, ly: 6 },
  { x: 310, y: 160, lx: 16, ly: -8 },
  { x: 150, y: 250, lx: 0, ly: 40, anchor: 'middle' },
  { x: 1062, y: 222, lx: -16, ly: -14, anchor: 'end' },
];
function Journey({ names }) {
  const arc = (a, b, lift) => `M${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - lift} ${b.x} ${b.y}`;
  const arcs = [arc(PLACES[0], PLACES[1], 90), arc(PLACES[1], PLACES[2], 60), arc(PLACES[2], PLACES[3], 180)];
  return (
    <svg className="journey" viewBox="0 0 1200 600" aria-hidden="true">
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" /></pattern>
      </defs>
      <rect className="journey-dots" width="1200" height="600" fill="url(#dots)" />
      {arcs.map((d, k) => <path key={k} className="journey-arc draw" pathLength="1" d={d} style={{ '--s': (0.14 + k * 0.1).toFixed(2) }} />)}
      {PLACES.map((p, k) => (
        <g key={k} className="pop" style={{ '--s': (0.1 + k * 0.1).toFixed(2) }}>
          <circle className="journey-ring" cx={p.x} cy={p.y} r="14" />
          <circle className="journey-dot" cx={p.x} cy={p.y} r="6" />
          <text x={p.x + p.lx} y={p.y + p.ly} textAnchor={p.anchor || 'start'}>{names[k]}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---- the chapters ---- */

function ChapterExperience({ c }) {
  const strip = [...c.PROJECTS.flatMap((p) => p.shots.slice(0, 2)), ...c.SOCIAL.map((s) => s.src)];
  return (
    <>
      <div className="ch-bg strips">
        {[0, 1].map((r) => (
          <div key={r} className={`strip r${r}`}>
            {(r ? [...strip].reverse() : strip).map((src, k) => <img key={k} src={src} alt="" loading="lazy" decoding="async" />)}
          </div>
        ))}
      </div>
      <div className="ch-shade full" />
      <div className="ch-copy wide st-exp">
        <div>
          <Pop s={0} as="p" className="ch-kicker">{c.UI.story.experience}</Pop>
          <Letters text={c.UI.story.expTitle} className="ch-title" s={0.02} step={0.007} />
        </div>
        <ol className="roles">
          {c.EXPERIENCE.map((e, i) => (
            <Pop key={e.where} as="li" s={0.2 + i * 0.09}>
              <span className={`role-when ${i === 0 ? 'now' : ''}`}>{e.when}</span>
              <div>
                <h3>{e.role}</h3>
                <p className="role-where">{e.where}</p>
                <p className="role-body">{e.body}</p>
              </div>
            </Pop>
          ))}
        </ol>
      </div>
    </>
  );
}

function ChapterReviews({ c }) {
  const { REVIEWS, UI } = c;
  return (
    <>
      <div className="ch-bg zoom warm"><img src={amigo} alt="" loading="lazy" decoding="async" /></div>
      <div className="ch-shade full" />
      <div className="ch-copy wide st-reviews">
        <div className="st-score">
          <Pop s={0} as="h2" className="ch-kicker">{UI.story.reviews}</Pop>
          <Letters as="p" text={REVIEWS.score} className="score-num" s={0.04} step={0.05} />
          <div className="score-stars" aria-label={UI.story.stars}>
            {[0, 1, 2, 3, 4].map((k) => <Pop key={k} as="span" s={0.14 + k * 0.03}><Star size={22} /></Pop>)}
          </div>
          <Pop s={0.2} as="p" className="ch-body">{REVIEWS.jobs} {UI.story.reviewsNote}</Pop>
        </div>
        <div className="quotes">
          {REVIEWS.items.map((r, i) => (
            <Pop key={i} s={0.26 + i * 0.07}>
              <Glass as="figure" className="quote" refract={false}>
                <blockquote>“{r.quote}”</blockquote>
                <figcaption>{r.project} · Upwork</figcaption>
              </Glass>
            </Pop>
          ))}
        </div>
      </div>
    </>
  );
}

function ChapterAbout({ c }) {
  const { ABOUT, UI } = c;
  return (
    <>
      <div className="ch-bg night" />
      <div className="art jr-art"><Journey names={ABOUT.places} /></div>
      <div className="ch-shade left" />
      <div className="ch-copy about">
        <Pop s={0} as="p" className="ch-kicker">{UI.story.about}</Pop>
        <Letters text={UI.story.aboutTitle} className="ch-title" s={0.02} step={0.007} />
        {ABOUT.body.map((t, i) => <Pop key={i} s={0.2 + i * 0.07} as="p" className={`ch-body ${i ? 'dim' : ''}`}>{t}</Pop>)}
        <dl className="facts">
          {ABOUT.facts.map((f, k) => (
            <Pop key={k} s={0.36 + k * 0.05} className={f.label ? '' : 'cont'}>
              {f.label && <dt>{f.label}</dt>}
              <dd>{f.value}{f.sub && <span>{f.sub}</span>}</dd>
            </Pop>
          ))}
        </dl>
      </div>
    </>
  );
}

function ChapterContact({ c }) {
  const { SITE, UI } = c;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };
  return (
    <>
      <div className="ch-bg zoom fire"><img src={ryanHome} alt="" loading="lazy" decoding="async" /></div>
      <div className="ch-shade full" />
      <div className="ch-copy center st-contact">
        <Pop s={0} as="p" className="ch-kicker">{UI.story.contact}</Pop>
        <Letters text={UI.story.contactTitle} className="ch-title xl" s={0.02} step={0.012} />
        <Pop s={0.22} as="p" className="ch-body">{UI.story.contactBody}</Pop>
        <Pop s={0.3}><a className="contact-email" href={`mailto:${SITE.email}`}>{SITE.email}</a></Pop>
        <Pop s={0.36} className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${SITE.email}`}><Mail size={18} />{UI.story.email}</a>
          <a className="btn btn-wa" href={SITE.whatsapp} target="_blank" rel="noopener"><WhatsApp size={18} />WhatsApp</a>
          <Glass as="button" variant="clear" className="btn btn-glass" onClick={copy} aria-live="polite" refract={false}>
            {copied ? <><Check size={18} />{UI.story.copied}</> : <><Copy size={18} />{UI.story.copy}</>}
          </Glass>
        </Pop>
        <Pop s={0.4} as="p" className="contact-phone"><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></Pop>
        <Pop s={0.44} as="ul" className="contact-links">
          {SITE.links.map((l) => (
            <li key={l.href}>
              <Glass as="a" variant="clear" className="btn btn-glass btn-sm" href={l.href} target="_blank" rel="noreferrer" refract={false}>
                {l.label}<ArrowUpRight size={15} stroke={2} />
              </Glass>
            </li>
          ))}
        </Pop>
      </div>
    </>
  );
}

const CHAPTERS = [
  { key: 'experience', C: ChapterExperience, anchor: 'experience' },
  { key: 'reviews', C: ChapterReviews, anchor: 'reviews' },
  { key: 'about', C: ChapterAbout, anchor: 'about' },
  { key: 'contact', C: ChapterContact, anchor: 'contact' },
];
const N = CHAPTERS.length;
// scroll length of each chapter and where it starts
CHAPTERS.forEach((c) => { c.hold ??= HOLD; });
const LEN = CHAPTERS.map((c) => ANIM + c.hold);
const STARTS = LEN.reduce((a, _, i) => [...a, i ? a[i - 1] + LEN[i - 1] : 0], []);

// scroll (in screens) -> story progress g: each chapter covers one unit of g,
// and within it the scroll stands still at DONE for the length of the hold
const P = (DONE - START) * ANIM;
const progressAt = (y) => {
  let i = 0;
  while (i < N - 1 && y >= STARTS[i + 1]) i++;
  const t = y - STARTS[i];
  const a = t < P ? t : t < P + CHAPTERS[i].hold ? P : t - CHAPTERS[i].hold;
  return i + a / ANIM;
};
// total pinned scroll: until the last chapter has arrived and held, plus one screen
const TOTAL = STARTS[N - 1] + P + CHAPTERS[N - 1].hold + 1;

export default function Story() {
  const c = useContent();
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const layers = [...el.querySelectorAll('.chapter')];
    const marks = [...el.querySelectorAll('.story-mark')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let mode = '', raf = 0;

    // flow mode: the animated items and the progress range each one needs
    const sOf = (e) => parseFloat(e.style.getPropertyValue('--s')) || 0;
    const items = [...el.querySelectorAll('.pop, .letters, .art')]
      .filter((e) => e.classList.contains('art') || !e.closest('.art'))
      .map((e) => {
        if (e.classList.contains('art')) return { el: e, a: 0, b: 0.9 };
        if (e.classList.contains('letters')) {
          const ch = e.querySelectorAll('.ch');
          return { el: e, a: sOf(ch[0]), b: sOf(ch[ch.length - 1]) + 0.16 };
        }
        return { el: e, a: sOf(e), b: sOf(e) + 0.18 };
      });

    const layout = () => {
      const next = reduced.matches ? 'still' : (window.innerWidth < 900 || window.innerHeight < 620) ? 'flow' : 'pinned';
      if (next !== mode) {
        mode = next; el.dataset.mode = mode;
        if (mode !== 'flow') items.forEach(({ el: e }) => e.style.removeProperty('--l'));
      }
      const vh = window.innerHeight;
      // nav anchors: in pinned mode each sits where its chapter is fully on screen
      marks.forEach((m) => {
        const i = +m.dataset.i;
        if (mode === 'pinned') { m.style.top = `${(STARTS[i] + 0.15 * ANIM) * vh}px`; m.style.height = `${LEN[i] * vh}px`; }
        else { m.style.top = `${layers[i].offsetTop}px`; m.style.height = `${layers[i].offsetHeight}px`; }
      });
      update();
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (mode === 'pinned') {
        const y = -el.getBoundingClientRect().top;
        const base = progressAt(y / vh) + START;
        layers.forEach((layer, i) => {
          const l = Math.max(-1.5, Math.min(2, base - i));
          layer.style.setProperty('--l', l.toFixed(4));
          layer.classList.toggle('live', l > -0.25 && (l < 1.1 || i === N - 1));
        });
      } else if (mode === 'flow') {
        layers.forEach((layer) => {
          const r = layer.getBoundingClientRect();
          const l = Math.max(-1, Math.min(0.75, ((vh - r.top) / vh) * 0.8 - 0.35));
          layer.style.setProperty('--l', l.toFixed(4));
          layer.classList.add('live');
        });
        // each item is timed by its own position, so content low in a tall chapter still animates in view
        items.forEach(({ el, a, b }) => {
          const p = Math.max(0, Math.min(1, (vh * 0.95 - el.getBoundingClientRect().top) / (vh * 0.35)));
          el.style.setProperty('--l', (a + p * (b - a)).toFixed(4));
        });
      } else {
        layers.forEach((layer) => { layer.style.setProperty('--l', '0.75'); layer.classList.add('live'); });
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    layout();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    reduced.addEventListener('change', layout);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
      reduced.removeEventListener('change', layout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="story" ref={root} data-tone="dark" style={{ '--total': TOTAL, '--start': START }} aria-label={c.UI.story.label}>
      {CHAPTERS.filter((c) => c.anchor).map((c) => (
        <div key={c.anchor} id={c.anchor} className="story-mark" data-i={CHAPTERS.indexOf(c)} data-tone="dark" aria-hidden="true" />
      ))}
      <div className="story-stage">
        {CHAPTERS.map(({ key, C }, i) => (
          <article key={key} className={`chapter ch-${key} ${i === 0 ? 'live' : ''}`} style={{ '--l': i === 0 ? START : -1, zIndex: i + 1 }}>
            <C c={c} />
          </article>
        ))}
      </div>
    </section>
  );
}
