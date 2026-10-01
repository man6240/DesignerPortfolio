# rafaelvitriago.eu — graphic design portfolio

Portfolio for Rafael Vitriago, graphic designer: social media, advertising and print, web design, and
photo and video editing. In **English (`/`) and Spanish (`/es/`)**, with an EN | ES switch in the nav and footer.

Built on the same base as the game portfolio ([rafavitriago.eu](https://rafavitriago.eu/), repo
`PortfolioSiteRafa`): React + Vite + Anime.js, Liquid Glass controls, the giant-name hero, product-shot
scenes and the pinned scroll story. The light social section, the edge-to-edge word and the watermarks take
their cues from the TipApp prototype; the web scene borrows the Ryan Family site's black-and-white-plus-yellow look.

## Run

    npm install
    npm run dev          # local, http://localhost:5173 (Spanish at /es/)
    npm run build        # dist/  -> Cloudflare Pages (build command: npm run build, output: dist)
    npm run preview      # serve dist/ locally

## Page order

1. **Hero** (`Hero.jsx`): giant name; a display and a phone rotate through the work (`HERO` in `content.js`).
2. **Work** (`Work.jsx`, `Scene.jsx`): one full-width scene per project in `PROJECTS`. `variant` picks the staging:
   `web` (browser window cycling through pages), `print` (spreads on the table), `ui` (browser + phone),
   `split` / `stack` (the game scenes). Clicking opens the gallery (`ProjectSheet.jsx`).
3. **Social** (`Social.jsx`): a draggable rail of posts (`SOCIAL`).
4. **Titan** (`Titan.jsx`): "Design / Diseño" from edge to edge with three pieces floating in front.
5. **Video** (`Video.jsx`): the Flag Fiesta launch film (`public/video/`) and the YouTube channel. Add video IDs to `VIDEO.youtube`
   and each becomes a card that loads YouTube only when clicked.
6. **Story** (`Story.jsx`): pinned chapters — experience, reviews, about, contact.

## Edit content

Everything a visitor reads is in `src/content.js`. Bilingual strings are written `T('English', 'Español')`.
Images live in `src/assets/design/` (design work) and `src/assets/shots/` (game screenshots).

**To replace an image**, export the new version and save it over the file with the same name.
Apart from `tipapp-landing.webp`, the TipApp images (`tipapp-*.webp`) are captures of reconstructed screens;
real screenshots can replace them the same way.

## Languages

- `npm run build` prerenders both languages (`scripts/prerender.mjs`): `dist/index.html` (en) and
  `dist/es/index.html` (es), each with its own `<html lang>`, title, description, canonical and `hreflang`.
- The switch (`LangSwitch` in `Nav.jsx`) changes the text in place and the address between `/` and `/es/`.
  The choice is remembered, so a returning visitor lands on their language.
- `public/_redirects` sends the old `/en/…` addresses to `/`.

## Deploy (Cloudflare Pages)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repo.
Framework preset: none. Build command `npm run build`. Output directory `dist`. Node 20 or newer.
Then Custom domains → add `www.rafaelvitriago.eu` and `rafaelvitriago.eu`.
`public/_headers` keeps HTML uncached and hashed assets cached for a year.
