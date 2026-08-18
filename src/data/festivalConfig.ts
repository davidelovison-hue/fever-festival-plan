export type PlanCategory = {
  id: string;
  title: string;
};

export const PLAN_CATEGORIES: PlanCategory[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'tickets', title: 'Festival Tickets' },
  { id: 'camping', title: 'Camping' },
  { id: 'parking', title: 'Parking' },
  { id: 'bar', title: 'Bar' },
  { id: 'merch', title: 'Merch' },
  { id: 'pmr', title: 'PMR/PSH & Accompagnant' },
];

const BASE = import.meta.env.BASE_URL;

export const HERO_GRID_IMAGES = [
  `${BASE}hero-grid-1.jpg`,
  `${BASE}hero-grid-2.jpg`,
  `${BASE}hero-grid-3.jpg`,
  `${BASE}hero-grid-4.jpg`,
] as const;

export const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2400&q=90',
    alt: 'Awakenings Festival — main stage and crowd',
  },
  {
    src: HERO_GRID_IMAGES[0],
    alt: 'Festival crowd facing the main stage',
  },
  {
    src: HERO_GRID_IMAGES[1],
    alt: 'Outdoor electronic music festival',
  },
  {
    src: HERO_GRID_IMAGES[2],
    alt: 'Festival crowd with hands up at night',
  },
  {
    src: HERO_GRID_IMAGES[3],
    alt: 'Concert stage with lights and crowd',
  },
];

export const FESTIVAL_HERO_VIDEO = `${BASE}hero-video-festival.mp4`;

export const FESTIVAL_MEDIA_HERO = {
  video: FESTIVAL_HERO_VIDEO,
  videoPoster: GALLERY_IMAGES[0]?.src ?? '',
  grid: GALLERY_IMAGES.slice(1, 5).map((image) => image.src) as [string, string, string, string],
};

export const GALLERY_IMAGE_URLS = GALLERY_IMAGES.map((image) => image.src);

export const POSTER_IMAGE = `${BASE}festival-poster.png`;

export const AVATAR_URL =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80';

export const VENUE_IMAGE =
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=900&q=85';

export const OVERVIEW_INFO = [
  {
    icon: '📅',
    label: 'Date',
    text: '3–5 July 2026 (Friday–Sunday)',
  },
  {
    icon: '📍',
    label: 'Location',
    text: 'Houtrak — Spaarnwoude recreation area (near Amsterdam), Netherlands',
  },
  {
    icon: '♿',
    label: 'Accessibility',
    text: 'Accessible routes and viewing areas. Contact us for specific requirements before the event.',
  },
  {
    icon: '🎫',
    label: 'Cultural schemes',
    text: 'Where applicable, national youth or cultural schemes may be accepted — see checkout for eligibility.',
  },
];
