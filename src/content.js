// Everything a visitor reads lives here, in English and Spanish. Edit, rebuild, done.
//
// T(en, es) marks a bilingual string; useContent() (i18n.jsx) resolves the whole tree for the current language.
//
// PROJECTS — the featured case studies, in display order. Each is staged as a scene:
//   variant: 'web'   a browser window cycling through the site's pages (Ryan Family)
//            'print' printed spreads lying on the panel (Gracia bulletin)
//            'ui'    a display and a phone (TipApp)
//            'split' words around one phone, bunting on top (Flag Fiesta)
//            'stack' rounded words stacked left, two phones right (Sugoi)
//   shots:   images in order; the first is the cover. For 'ui', `phone` lists the portrait screens.
//   colors:  { base, deep, glow } for the panel. words: three big words. tags: three callouts.
//   link:    { label, href } shown as a button and in the project sheet.
//
// SOCIAL — the social media rail, images in src/assets/design/. `ratio` overrides the default 16:9 card.
//
// VIDEOS — YouTube IDs (the part after watch?v=) from the channel. Each one becomes a card
// that loads the player only when clicked.

export const T = (en, es) => ({ __t: true, en, es });

const all = import.meta.glob('./assets/{shots,design}/*.{jpg,png,webp}', { eager: true, import: 'default' });
const img = (name) => {
  const key = Object.keys(all).find((k) => k.split('/').pop().replace(/\.\w+$/, '') === name);
  if (!key) throw new Error(`Missing image: ${name}`);
  return all[key];
};
const pick = (prefix) =>
  Object.keys(all)
    .filter((k) => k.split('/').pop().startsWith(prefix + '-'))
    .sort((a, b) => parseInt(a.match(/-(\d+)\./)[1]) - parseInt(b.match(/-(\d+)\./)[1]))
    .map((k) => all[k]);

export const SITE = {
  name: 'Rafael Vitriago',
  title: T('Graphic Designer', 'Diseñador Gráfico'),
  email: 'rafaelrivero6240@gmail.com',
  phone: '+34 685 028 161',
  whatsapp: 'https://wa.me/34685028161',
  location: T('Jaén, Spain', 'Jaén, España'),
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rafael-alejandro-vitriago-rivero-1987a914a' },
    { label: 'Behance', href: 'https://www.behance.net/rafaelvitriago' },
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~012e7d933c7d25c023' },
    { label: T('Game portfolio', 'Portafolio de juegos'), href: 'https://rafavitriago.eu/' },
  ],
};

export const UI = {
  meta: {
    title: T('Rafael Vitriago — Graphic Designer: social media, web design and video', 'Rafael Vitriago — Diseñador Gráfico: redes sociales, diseño web y vídeo'),
    description: T(
      'Freelance graphic designer in Jaén, Spain. Social media, advertising and print, web design, and photo and video editing. Working in English and Spanish.',
      'Diseñador gráfico freelance en Jaén, España. Redes sociales, publicidad e impresión, diseño web y edición de foto y vídeo. Trabajo en español e inglés.',
    ),
  },
  skip: T('Skip to work', 'Ir a los proyectos'),
  nav: {
    links: [
      { id: 'work', label: T('Work', 'Proyectos') },
      { id: 'social', label: T('Social', 'Redes') },
      { id: 'video', label: T('Video', 'Vídeo') },
      { id: 'experience', label: T('Experience', 'Experiencia') },
      { id: 'reviews', label: T('Reviews', 'Reseñas') },
      { id: 'about', label: T('About', 'Sobre mí') },
    ],
    contact: T('Contact', 'Contacto'),
    top: T('Rafael Vitriago, back to top', 'Rafael Vitriago, volver arriba'),
    open: T('Open menu', 'Abrir menú'),
    close: T('Close menu', 'Cerrar menú'),
    lang: T('Language', 'Idioma'),
  },
  hero: {
    hello: T('Hi, I’m', 'Hola, soy'),
    role: T('Graphic designer', 'Diseñador gráfico'),
    lede: T(
      'Social media, advertising, web design and photo and video editing, for churches, small businesses and studios. In English and Spanish, from Jaén, Spain.',
      'Redes sociales, publicidad, diseño web y edición de foto y vídeo para iglesias, pequeños negocios y estudios. En español e inglés, desde Jaén.',
    ),
    see: T('See the work', 'Ver los proyectos'),
    start: T('Start a project', 'Empezar un proyecto'),
    now: T('On screen', 'En pantalla'),
    openOn: T('Open project', 'Abrir proyecto'),
  },
  work: {
    eyebrow: T('Selected work', 'Proyectos'),
    headline: T('Design that gets read.', 'Diseño que se lee.'),
    sub: T(
      'Websites, print, interfaces and the art of two mobile games. Each one opens into a full gallery.',
      'Webs, impresión, interfaces y el arte de dos juegos móviles. Cada uno se abre en una galería completa.',
    ),
    gallery: T('Open gallery', 'Abrir galería'),
    view: T('View project', 'Ver proyecto'),
    role: T('My role', 'Mi papel'),
  },
  social: {
    eyebrow: T('Social media and advertising', 'Redes sociales y publicidad'),
    headline: T('Posts people stop for.', 'Posts que hacen parar el scroll.'),
    sub: T(
      'Event campaigns for Iglesia Bautista de la Gracia in Jaén: one idea per event, carried across the feed, the screens in the room and the printed bulletin.',
      'Campañas de eventos para la Iglesia Bautista de la Gracia en Jaén: una idea por evento, llevada al feed, a las pantallas de la sala y al boletín impreso.',
    ),
    drag: T('Drag or scroll sideways', 'Arrastra o desliza en horizontal'),
    rail: T('Social media posts. Scrolls sideways.', 'Publicaciones para redes sociales. Se desplaza en horizontal.'),
  },
  titan: {
    word: T('Design', 'Diseño'),
    left: T('From the brief', 'De la idea'),
    left2: T('and a blank page', 'y la hoja en blanco'),
    right: T('to the feed,', 'al feed,'),
    right2: T('the screen and the press', 'la pantalla y la imprenta'),
  },
  video: {
    eyebrow: T('Photo and video editing', 'Edición de foto y vídeo'),
    headline: T('Cut to the beat.', 'Montaje con ritmo.'),
    sub: T(
      'Trailers, gameplay reels and event videos: edit, colour, titles and sound, delivered for YouTube, Reels and the big screen.',
      'Tráilers, gameplay y vídeos de eventos: montaje, color, rótulos y sonido, listos para YouTube, Reels y la pantalla grande.',
    ),
    reel: T('Flag Fiesta: launch film', 'Flag Fiesta: tráiler de lanzamiento'),
    reelNote: T('A 30-second vertical cut for the Google Play launch, Reels and Shorts. Tap the speaker for sound.', 'Un corte vertical de 30 segundos para el lanzamiento en Google Play, Reels y Shorts. Toca el altavoz para oírlo.'),
    channel: T('More on YouTube', 'Más en YouTube'),
    channelNote: T('Trailers and shorts on the Flag Fiesta channel.', 'Tráilers y shorts en el canal de Flag Fiesta.'),
    play: T('Play video', 'Reproducir vídeo'),
  },
  sheet: {
    close: T('Close', 'Cerrar'),
    prev: T('Previous image', 'Imagen anterior'),
    next: T('Next image', 'Imagen siguiente'),
    images: T('Images', 'Imágenes'),
    image: T('Image', 'Imagen'),
    of: T('of', 'de'),
    clip: T('Video', 'Vídeo'),
    type: T('Type', 'Tipo'),
    client: T('Client', 'Cliente'),
    role: T('My role', 'Mi papel'),
    visit: T('Visit', 'Visitar'),
  },
  story: {
    label: T('Experience, reviews, about and contact', 'Experiencia, reseñas, sobre mí y contacto'),
    experience: T('Experience', 'Experiencia'),
    expTitle: T('Clients, studios and shipped work.', 'Clientes, estudios y trabajo publicado.'),
    reviews: T('Client reviews', 'Reseñas de clientes'),
    reviewsNote: T(
      'on Upwork, every one rated five stars. Those jobs were game development, but the way of working is the same: on time, on brief, and a little beyond.',
      'en Upwork, todos con cinco estrellas. Eran trabajos de desarrollo de juegos, pero la forma de trabajar es la misma: a tiempo, según lo pedido y un poco más.',
    ),
    stars: T('5 out of 5 stars', '5 de 5 estrellas'),
    about: T('About', 'Sobre mí'),
    aboutTitle: T('Design that tells the story.', 'Diseño que cuenta la historia.'),
    contact: T('Contact', 'Contacto'),
    contactTitle: T('Let’s make it.', 'Hagámoslo.'),
    contactBody: T(
      'A campaign, a website, a printed piece or a video that needs a hand? I’m available for freelance work, remotely or in Jaén, in English or Spanish.',
      '¿Una campaña, una web, una pieza impresa o un vídeo? Estoy disponible para trabajos freelance, en remoto o en Jaén, en español o en inglés.',
    ),
    email: T('Email me', 'Escríbeme'),
    copy: T('Copy address', 'Copiar correo'),
    copied: T('Copied', 'Copiado'),
  },
  footer: {
    rights: T('All rights reserved.', 'Todos los derechos reservados.'),
  },
};

export const PROJECTS = [
  {
    id: 'ryan',
    title: 'The Ryan Family',
    subtitle: T('Missionaries to Spain', 'Misioneros en España'),
    kind: T('Web design', 'Diseño web'),
    client: 'The Ryan Family',
    status: T('Live', 'Publicada'),
    platforms: 'theworldthroughspain.com',
    role: T('Web design, art direction, photo editing and prayer-letter layout', 'Diseño web, dirección de arte, edición de fotos y maquetación de las cartas'),
    summary: T(
      'A website for a missionary family planting churches in Spain: their story, why Spain, what they believe and an archive of their prayer letters. Black-and-white photography of Seville and Jaén with one bright yellow accent.',
      'Una web para una familia de misioneros que planta iglesias en España: su historia, por qué España, lo que creen y el archivo de sus cartas de oración. Fotografía en blanco y negro de Sevilla y Jaén con un único acento amarillo.',
    ),
    shots: pick('ryan'),
    link: { label: T('Visit the site', 'Visitar la web'), href: 'https://theworldthroughspain.com/' },
    palette: ['#F5F06A', '#FFFBD1', '#0B0B0B'],
    variant: 'web',
    words: [T('Tell', 'Cuenta'), T('their', 'su'), T('story', 'historia')],
    tags: [T('Black & white + one accent', 'Blanco y negro + un acento'), T('Prayer-letter archive', 'Archivo de cartas'), T('Responsive', 'Adaptable a móvil')],
    colors: { base: '#2a2a2a', deep: '#0b0b0b', glow: '#e9e45a' },
  },
  {
    id: 'gracia',
    title: 'Iglesia Bautista de la Gracia',
    subtitle: T('Monthly bulletin', 'Boletín mensual'),
    kind: T('Print and editorial', 'Impresión y editorial'),
    client: 'Iglesia Bautista de la Gracia, Jaén',
    status: T('Every month', 'Cada mes'),
    platforms: T('Folded A4, print', 'A4 plegado, impreso'),
    role: T('Layout, typography, photo treatment and monthly editions', 'Maquetación, tipografía, tratamiento de fotos y ediciones mensuales'),
    summary: T(
      'A folded bulletin handed out every Sunday: the cover with the church’s mark over Jaén cathedral, contact and social links on the back, and inside a page for sermon notes and the month’s announcements with a QR code to the calendar.',
      'Un boletín plegado que se reparte cada domingo: la portada con la marca de la iglesia sobre la catedral de Jaén, contacto y redes en la contraportada, y dentro una página para notas de la predicación y los anuncios del mes con un QR al calendario.',
    ),
    shots: [img('gracia-boletin-1'), img('gracia-boletin-2'), img('gracia-portada'), img('gracia-anuncios'), img('gracia-contra')],
    palette: ['#8DBF86', '#DCEFD8', '#0F1E14'],
    variant: 'print',
    words: [T('Fold', 'Plegar'), T('print', 'imprimir'), T('repeat', 'repetir')],
    tags: [T('Brand system', 'Sistema de marca'), T('QR to the calendar', 'QR al calendario'), T('Sermon notes', 'Notas de la predicación')],
    colors: { base: '#3f6447', deep: '#0f1e14', glow: '#8dbf86' },
  },
  {
    id: 'tipapp',
    title: 'TipApp',
    subtitle: T('Product design', 'Diseño de producto'),
    kind: T('UI and UX', 'UI y UX'),
    client: T('Product concept', 'Concepto de producto'),
    status: T('Prototype', 'Prototipo'),
    platforms: T('Web and mobile', 'Web y móvil'),
    role: T('Brand, interface, interaction and front-end prototype', 'Marca, interfaz, interacción y prototipo front-end'),
    summary: T(
      'Tips that go to the person who served you: a code on the table, scan, choose how much, pay. A landing page, the payment screen, a worker’s dashboard and sign-up, designed and built as a working prototype.',
      'La propina va a quien te atiende: un código en la mesa, escaneas, eliges cuánto y pagas. Landing, pantalla de pago, panel del trabajador y alta, diseñados y montados como prototipo funcional.',
    ),
    shots: [img('tipapp-landing'), img('tipapp-pago'), img('tipapp-panel'), img('tipapp-titan'), img('tipapp-alta'), img('tipapp-gracias')],
    phone: [img('tipapp-pago'), img('tipapp-alta'), img('tipapp-gracias')],
    palette: ['#2997FF', '#D6E9FF', '#000000'],
    variant: 'ui',
    words: [T('Scan', 'Escanea'), T('choose', 'elige'), T('pay', 'paga')],
    tags: [T('Payment in 15 seconds', 'Pago en 15 segundos'), T('Worker dashboard', 'Panel del trabajador'), T('Dark and light themes', 'Temas claro y oscuro')],
    colors: { base: '#0b1a33', deep: '#000000', glow: '#0071e3' },
  },
  {
    id: 'flag-fiesta',
    title: 'Flag Fiesta',
    kind: T('Mobile game art and UI', 'Arte e interfaz de juego móvil'),
    client: 'Baldman Studios',
    status: T('Out now', 'Disponible'),
    platforms: 'Android',
    role: T('Logo, interface, game art and the store listing', 'Logo, interfaz, arte del juego y la ficha de la tienda'),
    summary: T(
      'A fast, colourful flag quiz for phones: guess or paint flags, then test yourself on places, people and history. The logo, every screen and the Google Play listing are mine.',
      'Un quiz de banderas rápido y colorido para móvil: adivina o pinta banderas y ponte a prueba con lugares, personajes e historia. El logo, todas las pantallas y la ficha de Google Play son míos.',
    ),
    shots: pick('flag'),
    video: 'flag-fiesta',
    link: { label: T('Get it on Google Play', 'Descárgalo en Google Play'), href: 'https://play.google.com/store/apps/details?id=com.BaldmanStudios.FlagFiesta' },
    palette: ['#E0508A', '#FFD1E3', '#0B1828'],
    variant: 'split',
    words: [T('Know', 'Conoce'), T('your', 'tu'), T('world', 'mundo')],
    tags: [T('Logo and brand', 'Logo y marca'), T('Playful, readable UI', 'Interfaz clara y divertida'), T('Store graphics', 'Gráficos de tienda')],
    colors: { base: '#1B3452', deep: '#0B1828', glow: '#C2447C' },
    decor: 'bunting',
  },
  {
    id: 'sugoi',
    title: 'Sugoi Fruit Fusion Wonders',
    kind: T('Mobile game art', 'Arte de juego móvil'),
    client: T('Two-person team', 'Equipo de dos'),
    status: T('Shipped', 'Publicado'),
    platforms: 'Google Play',
    role: T('2D art, interface, programming and economy design', 'Arte 2D, interfaz, programación y diseño de economía'),
    summary: T(
      'A take on the Suika watermelon mechanic: merge the fruits and watch the score climb. Every fruit, background and button was drawn for it.',
      'Una versión de la mecánica Suika: fusiona las frutas y mira cómo sube la puntuación. Cada fruta, fondo y botón se dibujó para el juego.',
    ),
    shots: pick('sugoi'),
    palette: ['#FFC23D', '#FFF0C8', '#3A1C04'],
    variant: 'stack',
    words: [T('Merge', 'Fusiona'), T('the', 'la'), T('fruit', 'fruta')],
    tags: [T('Hand-drawn 2D art', 'Arte 2D a mano'), T('Interface', 'Interfaz'), T('Economy design', 'Diseño de economía')],
    colors: { base: '#5A3A1C', deep: '#1E1206', glow: '#E8A94E' },
    shot: 1,
  },
];

export const SOCIAL = [
  { id: 'amigo', src: img('post-amigo'), title: T('Friend Day', 'Día del amigo'), note: T('Autumn invitation, poster and envelopes', 'Invitación de otoño, cartel y sobres'), color: '#d9661c' },
  { id: 'estudio', src: img('post-estudio'), title: T('Women’s Bible Study', 'Estudio bíblico para mujeres'), note: T('Editorial type, watercolour florals', 'Tipografía editorial, acuarela floral'), color: '#a8471c' },
  { id: 'edificio', src: img('post-edificio'), title: T('New building offering', 'Ofrenda nuevo edificio'), note: T('Outlined type with a neon glow, 3D', 'Tipografía calada con brillo neón, 3D'), color: '#3e9b55' },
  { id: 'aniversario', src: img('post-aniversario'), title: T('5th anniversary', '5º aniversario'), note: T('Torn-paper photo band, script and gold', 'Foto en papel rasgado, caligrafía y dorado'), color: '#c9a45c' },
  { id: 'videojuegos', src: img('post-videojuegos'), title: T('Video game night', 'Noche de videojuegos'), note: T('Pixel-art type for ages 9 to 15', 'Tipografía pixel art para 9 a 15 años'), color: '#7b3fe4' },
  { id: 'bautismos', src: img('post-bautismos'), title: T('Baptism Sunday', 'Domingo de bautismos'), note: T('Script over open water', 'Caligrafía sobre el mar'), color: '#2f8fb0' },
  { id: 'verano', ratio: '1587 / 1123', src: img('post-estudio-verano'), title: T('Combined Bible study', 'Estudio bíblico combinado'), note: T('Bilingual summer schedule', 'Horario de verano bilingüe'), color: '#7a6be0' },
];

export const VIDEO = {
  channel: 'https://www.youtube.com/@FlagFiestaGame',
  // YouTube Shorts from the channel: the ID is the part after /shorts/. Each card loads YouTube only when clicked.
  youtube: [
    { id: 'vchzq_PEbFw', title: T('Flag Fiesta · Short 1', 'Flag Fiesta · Short 1') },
    { id: 'zc_CBRlsoTg', title: T('Flag Fiesta · Short 2', 'Flag Fiesta · Short 2') },
    { id: 'uRi2bknQWWI', title: T('Flag Fiesta · Short 3', 'Flag Fiesta · Short 3') },
    { id: 'P3aVWynpTPU', title: T('Flag Fiesta · Short 4', 'Flag Fiesta · Short 4') },
  ],
};

// Hero: the display and the phone each rotate through work, offset so only one changes at a time.
// project: which project opens on click (and its gallery index). video: plays the Flag Fiesta clip.
export const HERO = {
  monitor: [
    { id: 'ryan', src: img('ryan-1'), shot: 0, tag: T('Web', 'Web'), label: 'The Ryan Family' },
    { id: 'social', src: img('post-amigo'), tag: T('Social', 'Redes'), label: T('Friend Day', 'Día del amigo') },
    { id: 'gracia', src: img('gracia-boletin-1'), shot: 0, tag: T('Print', 'Impresión'), label: T('Gracia bulletin', 'Boletín Gracia') },
    { id: 'tipapp', src: img('tipapp-landing'), shot: 0, tag: 'UI', label: 'TipApp' },
    { id: 'social', src: img('post-estudio'), tag: T('Social', 'Redes'), label: T('Women’s Bible Study', 'Estudio bíblico') },
    { id: 'ryan', src: img('ryan-3'), shot: 2, tag: T('Web', 'Web'), label: T('Ryan prayer letters', 'Cartas de los Ryan') },
    { id: 'social', src: img('post-edificio'), tag: T('Social', 'Redes'), label: T('New building', 'Nuevo edificio') },
  ],
  phone: [
    { id: 'tipapp', src: img('tipapp-pago'), shot: 1, tag: 'UI', label: T('TipApp payment', 'TipApp, pago'), frame: 'blue' },
    { id: 'flag-fiesta', video: true, shot: 0, tag: T('Video', 'Vídeo'), label: 'Flag Fiesta', frame: 'orange' },
    { id: 'gracia', src: img('gracia-portada'), shot: 2, tag: T('Print', 'Impresión'), label: T('Bulletin cover', 'Portada del boletín'), frame: 'blue' },
    { id: 'sugoi', src: pick('sugoi')[0], shot: 0, tag: T('Game art', 'Arte de juego'), label: 'Sugoi Fruit Fusion', frame: 'orange' },
    { id: 'tipapp', src: img('tipapp-alta'), shot: 4, tag: 'UI', label: T('TipApp sign-up', 'TipApp, alta'), frame: 'blue' },
  ],
};

export const STATS = [
  { value: '5+', label: T('Years designing', 'Años diseñando') },
  { value: '5.0', label: T('Rating on Upwork', 'Valoración en Upwork') },
  { value: '4', label: T('Disciplines', 'Disciplinas') },
  { value: '2', label: T('Languages, EN · ES', 'Idiomas, ES · EN') },
];

export const EXPERIENCE = [
  {
    when: T('Now', 'Ahora'),
    where: 'Freelance',
    role: T('Graphic designer and video editor', 'Diseñador gráfico y editor de vídeo'),
    body: T(
      'Social media, print, websites and video for churches, missionaries, small businesses and studios, in Spain and abroad.',
      'Redes sociales, impresión, webs y vídeo para iglesias, misioneros, pequeños negocios y estudios, en España y fuera.',
    ),
  },
  {
    when: T('Ongoing', 'Continuo'),
    where: 'Iglesia Bautista de la Gracia, Jaén',
    role: T('Design and social media', 'Diseño y redes sociales'),
    body: T(
      'The monthly bulletin, every event campaign, the slides on the screens and the videos.',
      'El boletín mensual, todas las campañas de eventos, las diapositivas de las pantallas y los vídeos.',
    ),
  },
  {
    when: T('Previously', 'Antes'),
    where: 'Mad Viking Games',
    role: T('Game designer', 'Diseñador de juegos'),
    body: T(
      'Level and environment design, lighting, character showcases and the cinematic trailer for Ashes of Idunn.',
      'Diseño de niveles y entornos, iluminación, presentaciones de personajes y el tráiler cinemático de Ashes of Idunn.',
    ),
  },
];

export const REVIEWS = {
  score: '5.0',
  jobs: T('4 completed jobs', '4 trabajos completados'),
  items: [
    { quote: T('Rafael is an amazing contractor and helped us complete our project on time by matching our requirements. I definitely recommend Rafael to anyone for their work!', 'Rafael es un colaborador increíble y nos ayudó a terminar el proyecto a tiempo cumpliendo lo que pedíamos. ¡Recomiendo a Rafael a cualquiera por su trabajo!'), project: T('Unreal Engine material creation', 'Creación de materiales en Unreal Engine') },
    { quote: T('Nothing extra to add — it just worked as expected. Even went above and beyond by solving some extra issues with GitHub along the way.', 'Nada que añadir: funcionó como se esperaba. Incluso fue más allá resolviendo de paso otros problemas con GitHub.'), project: T('PCVR in UE5', 'PCVR en UE5') },
    { quote: T('Delivered exactly what was needed for our VR Backrooms game. Solid Unreal developer who understands the brief and executes cleanly.', 'Entregó exactamente lo que necesitaba nuestro juego VR Backrooms. Un desarrollador sólido que entiende el encargo y lo ejecuta con limpieza.'), project: T('VR Backrooms game', 'Juego VR Backrooms') },
    { quote: T('Great work!', '¡Gran trabajo!'), project: T('Level designer', 'Diseñador de niveles') },
  ],
};

export const ABOUT = {
  body: [
    T(
      'I’m a graphic designer and video editor based in Jaén, Spain. I came to design through games: years of building interfaces, logos, store art and trailers taught me that every piece has one job, and that people decide in a second whether to read it.',
      'Soy diseñador gráfico y editor de vídeo en Jaén. Llegué al diseño a través de los videojuegos: años haciendo interfaces, logos, arte para tiendas y tráilers me enseñaron que cada pieza tiene un trabajo, y que la gente decide en un segundo si la va a leer.',
    ),
    T(
      'Venezuelan, raised in Canada, with years in the United States along the way. I work in English and Spanish, remotely or in person.',
      'Venezolano, criado en Canadá y con años en Estados Unidos por el camino. Trabajo en español e inglés, en remoto o en persona.',
    ),
  ],
  facts: [
    { label: T('Education', 'Formación'), value: T('Master’s in Video Game Creation', 'Máster en Creación de Videojuegos'), sub: 'Universidad de Málaga' },
    { label: '', value: T('B.A. Digital Game Design, Magna Cum Laude', 'Grado en Diseño de Juegos Digitales, Magna Cum Laude'), sub: 'Universidad Andrés Bello' },
    { label: T('Languages', 'Idiomas'), value: T('English and Spanish', 'Español e inglés') },
    { label: T('Also', 'También'), value: T('Game design, 3D and lighting', 'Diseño de juegos, 3D e iluminación') },
  ],
  places: [T('Venezuela', 'Venezuela'), T('Canada', 'Canadá'), T('United States', 'Estados Unidos'), T('Jaén, Spain', 'Jaén, España')],
};
