import { useCallback, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Social from './components/Social.jsx';
import Titan from './components/Titan.jsx';
import Video from './components/Video.jsx';
import ProjectSheet from './components/ProjectSheet.jsx';
import { Footer } from './components/Sections.jsx';
import Story from './components/Story.jsx';
import useReducedMotion from './useReducedMotion.js';
import useReveal from './useReveal.js';
import { LangProvider, useContent } from './i18n.jsx';

function Page() {
  const reduced = useReducedMotion();
  const { UI } = useContent();
  const [sheet, setSheet] = useState(null);
  const open = useCallback((p, i = 0) => setSheet({ id: p.id, i }), []);
  const close = useCallback(() => setSheet(null), []);
  useReveal();

  return (
    <>
      <a className="skip" href="#work">{UI.skip}</a>
      <div className="classic"><Nav /></div>
      <main>
        <div className="classic"><Hero reduced={reduced} onOpen={open} /></div>
        <Work reduced={reduced} onOpen={open} />
        <Social />
        <Titan />
        <Video />
        <div className="classic"><Story /></div>
      </main>
      <div className="classic"><Footer /></div>
      <ProjectSheet state={sheet} onClose={close} reduced={reduced} />
    </>
  );
}

export default function App({ lang = 'en' }) {
  return <LangProvider initial={lang}><Page /></LangProvider>;
}
