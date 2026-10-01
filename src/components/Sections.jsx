import { useContent } from '../i18n.jsx';
import { LangSwitch } from './Nav.jsx';

export function Footer() {
  const { SITE, UI } = useContent();
  return (
    <footer className="foot" data-tone="dark">
      <div className="wrap foot-inner">
        <p>© {new Date().getFullYear()} {SITE.name}. {UI.footer.rights}</p>
        <p className="foot-links">
          <a href={`mailto:${SITE.email}`}>Email</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
          <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
        </p>
        <p>{SITE.title} · {SITE.location}</p>
        <LangSwitch className="foot-lang" />
      </div>
    </footer>
  );
}
