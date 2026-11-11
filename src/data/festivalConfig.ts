export type PlanCategory = {
  id: string;
  title: string;
};

export const PLAN_CATEGORIES: PlanCategory[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'mesas', title: 'Mesas' },
  { id: 'bundles', title: 'Packs' },
  { id: 'transport', title: 'Parking' },
  { id: 'extra', title: 'Extra' },
];

/** Default plan tab (Mesas). */
export const DEFAULT_PLAN_TAB = 'pass';

const BASE = import.meta.env.BASE_URL;

export const HERO_GRID_IMAGES = [
  `${BASE}hero-grid-1.jpg`,
  `${BASE}hero-grid-2.jpg`,
  `${BASE}hero-grid-3.jpg`,
  `${BASE}hero-grid-4.jpg`,
] as const;

export const GALLERY_IMAGES = [
  {
    src: `${BASE}festival-poster.jpg`,
    alt: 'Mesas — Sala Principal',
  },
  {
    src: HERO_GRID_IMAGES[0],
    alt: 'Ambiente VIP de la sala',
  },
  {
    src: HERO_GRID_IMAGES[1],
    alt: 'Pista principal',
  },
  {
    src: HERO_GRID_IMAGES[2],
    alt: 'Público en la noche',
  },
  {
    src: HERO_GRID_IMAGES[3],
    alt: 'Zona lounge',
  },
];

export const FESTIVAL_HERO_VIDEO = `${BASE}hero-video-festival.mp4`;

export const FESTIVAL_MEDIA_HERO = {
  video: FESTIVAL_HERO_VIDEO,
  videoPoster: `${BASE}hero-video-poster.jpg`,
  grid: GALLERY_IMAGES.slice(1, 5).map((image) => image.src) as [string, string, string, string],
};

export const GALLERY_IMAGE_URLS = GALLERY_IMAGES.map((image) => image.src);

export const POSTER_IMAGE = `${BASE}festival-poster.jpg`;

export const AVATAR_URL =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80';

export const VENUE_IMAGE = `${BASE}hero-grid-1.jpg`;

export const HERO_FACTS = [
  { label: 'Fecha', value: '15 May' },
  { label: 'Inicio', value: '20:00' },
  { label: 'Fin', value: '03:00' },
  { label: 'Edad', value: '18+' },
] as const;

export const OVERVIEW_INFO = [
  {
    icon: '📅',
    label: 'Fecha',
    text: '15 de mayo — de 20:00 a 03:00',
  },
  {
    icon: '📍',
    label: 'Ubicación',
    text: 'Sala Principal — Madrid',
  },
  {
    icon: '🔞',
    label: 'Edad',
    text: '18+ con documento de identidad válido en la entrada.',
  },
  {
    icon: '🪑',
    label: 'Mesas',
    text: 'Reserva tu mesa por zona: pista, palco, VIP, DJ booth y backstage.',
  },
];
