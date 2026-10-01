import { useContent } from '../i18n.jsx';
import Scene from './Scene.jsx';

export function PhoneFrame({ src, alt = '', children, className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : children}
        <span className="phone-island" aria-hidden="true" />
      </div>
    </div>
  );
}

/* Every featured project is staged as a full-width scene in its own colours (Scene.jsx). */
export default function Work({ onOpen }) {
  const { PROJECTS, UI } = useContent();
  return (
    <section className="work section" id="work" data-tone="dark">
      <div className="wrap">
        <header className="section-head split reveal">
          <div>
            <p className="eyebrow">{UI.work.eyebrow}</p>
            <h2 className="headline">{UI.work.headline}</h2>
          </div>
          <p className="section-sub">{UI.work.sub}</p>
        </header>
        <div className="feats">
          {PROJECTS.map((p, i) => <Scene key={p.id} p={p} index={i} total={PROJECTS.length} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}
