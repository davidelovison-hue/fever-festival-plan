export type PlanCategory = {
  id: string;
  title: string;
};

export const PLAN_CATEGORIES: PlanCategory[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'acceso', title: 'Entry pass' },
  { id: 'bundles', title: 'Bundles' },
  { id: 'camping', title: 'Camping' },
  { id: 'glamping', title: 'Glamping & Hotel' },
  { id: 'transport', title: 'Bus & Parking' },
  { id: 'extra', title: 'Extra' },
];

/** Default plan tab (Pass). */
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
    alt: 'Bahidorá 2027 — Las Estacas, Morelos',
  },
  {
    src: HERO_GRID_IMAGES[0],
    alt: 'River and spring at Las Estacas',
  },
  {
    src: HERO_GRID_IMAGES[1],
    alt: 'Outdoor stage in the jungle',
  },
  {
    src: HERO_GRID_IMAGES[2],
    alt: 'Crowd at Bahidorá at sunset',
  },
  {
    src: HERO_GRID_IMAGES[3],
    alt: 'Campsite by the river',
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
  { label: 'Date', value: '13–15 Feb' },
  { label: 'Duration', value: '3 days' },
  { label: 'Format', value: 'Outdoor' },
  { label: 'City', value: 'Morelos' },
] as const;

export const OVERVIEW_INFO = [
  {
    icon: '📅',
    label: 'Date',
    text: '13–15 February 2027 (Friday–Sunday)',
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
