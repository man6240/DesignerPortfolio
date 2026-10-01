import { useEffect, useRef, useState } from 'react';
import { useContent } from '../i18n.jsx';
import { ArrowUpRight } from './Icons.jsx';
import poster from '../assets/shots/flag-0.jpg';

/* Video editing: the Flag Fiesta reel plays in a phone-shaped frame while it's on screen, next to
   the YouTube channel. Any IDs listed in VIDEO.youtube appear as cards that only load YouTube
   when clicked. */
function YouTubeCard({ v, label }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="yt reveal">
      <div className="yt-frame">
        {on ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button className="yt-cover" onClick={() => setOn(true)} aria-label={`${label}: ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="yt-play" aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption>{v.title}</figcaption>
    </figure>
  );
}

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
                  <source src="/hero/flag-fiesta.mp4" type="video/mp4" />
                  <source src="/hero/flag-fiesta.webm" type="video/webm" />
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

        {VIDEO.youtube.length > 0 && (
          <div className="yt-grid">
            {VIDEO.youtube.map((v) => <YouTubeCard key={v.id} v={v} label={UI.video.play} />)}
          </div>
        )}
      </div>
    </section>
  );
}
