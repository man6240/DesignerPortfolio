import { useEffect, useRef } from 'react';
import { useContent } from '../i18n.jsx';
import { ArrowUpRight } from './Icons.jsx';
import poster from '../assets/design/launch-poster.jpg';

/* Video editing: the Flag Fiesta launch film plays in a phone-shaped frame while it's on screen, next to
   the YouTube channel. */
export default function Video() {
  const { VIDEO, UI } = useContent();
  const vid = useRef(null);

  useEffect(() => {
    const v = vid.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="video section" id="video" data-tone="dark">
      <div className="wrap">
        <header className="section-head split reveal">
          <div>
            <p className="eyebrow">{UI.video.eyebrow}</p>
            <h2 className="headline">{UI.video.headline}</h2>
          </div>
          <p className="section-sub">{UI.video.sub}</p>
        </header>

        <div className="video-grid">
          <figure className="reel reveal">
            <div className="reel-stage">
              <div className="reel-phone">
                <video ref={vid} muted loop playsInline preload="none" poster={poster} controls aria-label={UI.video.reel}>
                  <source src={`${import.meta.env.BASE_URL}video/flag-fiesta-launch.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
            <figcaption><strong>{UI.video.reel}</strong><span>{UI.video.reelNote}</span></figcaption>
          </figure>

          <a className="channel reveal" href={VIDEO.channel} target="_blank" rel="noopener">
            <span className="channel-logo" aria-hidden="true">
              <svg viewBox="0 0 28 20" width="56" height="40"><rect width="28" height="20" rx="6" fill="#ff0033" /><path d="M11 5.5v9l8-4.5z" fill="#fff" /></svg>
            </span>
            <span className="channel-name">@FlagFiestaGame</span>
            <strong>{UI.video.channel}</strong>
            <span className="channel-note">{UI.video.channelNote}</span>
            <span className="channel-go" aria-hidden="true"><ArrowUpRight size={20} stroke={2} /></span>
          </a>
        </div>

      </div>
    </section>
  );
}
