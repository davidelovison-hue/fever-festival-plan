export type PlanCategory = {
  id: string;
  title: string;
};

export const PLAN_CATEGORIES: PlanCategory[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'acceso', title: 'Full Weekend' },
  { id: 'bundles', title: 'Bundles' },
  { id: 'camping', title: 'Camping' },
  { id: 'glamping', title: 'Glamping & Hotel' },
  { id: 'transport', title: 'Autobús & Estacionamiento' },
  { id: 'extra', title: 'Extra' },
];

/** Default plan tab (Acceso). */
export const DEFAULT_PLAN_TAB = 'acceso';

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
    alt: 'Bahidorá 2026 — Las Estacas, Morelos',
  },
  {
    src: HERO_GRID_IMAGES[0],
    alt: 'Río y manantial en Las Estacas',
  },
  {
    src: HERO_GRID_IMAGES[1],
    alt: 'Escenario al aire libre entre la selva',
  },
  {
    src: HERO_GRID_IMAGES[2],
    alt: 'Público en Bahidorá al atardecer',
  },
  {
    src: HERO_GRID_IMAGES[3],
    alt: 'Campamento junto al río',
  },
];

export const FESTIVAL_HERO_VIDEO = `${BASE}hero-video-festival.mp4`;

export const FESTIVAL_MEDIA_HERO = {
  video: FESTIVAL_HERO_VIDEO,
  videoPoster: GALLERY_IMAGES[0]?.src ?? '',
  grid: GALLERY_IMAGES.slice(1, 5).map((image) => image.src) as [string, string, string, string],
};

export const GALLERY_IMAGE_URLS = GALLERY_IMAGES.map((image) => image.src);

export const POSTER_IMAGE = `${BASE}festival-poster.jpg`;

export const AVATAR_URL =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80';

export const VENUE_IMAGE = `${BASE}hero-grid-1.jpg`;

export const HERO_FACTS = [
  { label: 'Date', value: '13–15 Feb' },
  { label: 'Duration', value: '3 days' },
  { label: 'Format', value: 'Outdoor' },
  { label: 'City', value: 'Morelos' },
] as const;

export const OVERVIEW_INFO = [
  {
    icon: '📅',
    label: 'Date',
    text: '13–15 February 2026 (Friday–Sunday)',
  },
  {
    icon: '📍',
    label: 'Location',
    text: 'Parque Las Estacas — Tlaltizapán, Morelos, Mexico',
  },
  {
    icon: '🔞',
    label: 'Age',
    text: '18+ with valid government-issued ID required at the gate.',
  },
  {
    icon: '♿',
    label: 'Accessibility',
    text: 'Contact boletaje@volveraflotar.com for access requirements before the event.',
  },
];
