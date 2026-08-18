import { GALLERY_IMAGES } from './festivalConfig';

export type FestivalArtist = {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  day?: string;
};

const FALLBACK =
  GALLERY_IMAGES[0]?.src ??
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85';

/** Bahidorá 2027 lineup highlights — replace photos with official artist stills as needed. */
export const FESTIVAL_ARTISTS: FestivalArtist[] = [
  {
    id: 'four-tet',
    name: 'Four Tet',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 13 Feb',
  },
  {
    id: 'ricardo-villalobos',
    name: 'Ricardo Villalobos',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c2d2cd?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
  {
    id: 'the-blessed-madonna',
    name: 'The Blessed Madonna',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
  {
    id: 'ela-minus',
    name: 'Ela Minus',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 15 Feb',
  },
  {
    id: 'helena-hauff',
    name: 'Helena Hauff',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 13 Feb',
  },
  {
    id: 'kings-of-convenience',
    name: 'Kings of Convenience',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
  {
    id: 'dj-seinfeld',
    name: 'DJ Seinfeld',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 15 Feb',
  },
  {
    id: 'vtss',
    name: 'VTSS',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 13 Feb',
  },
  {
    id: 'hvob',
    name: 'HVOB',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
  {
    id: 'shanti-celeste',
    name: 'Shanti Celeste',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 13 Feb',
  },
  {
    id: 'los-thuthanaka',
    name: 'Los Thuthanaka',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 15 Feb',
  },
  {
    id: 'bb-trickz',
    name: 'BB Trickz',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
  {
    id: 'wata-igarashi',
    name: 'Wata Igarashi',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 15 Feb',
  },
  {
    id: 'ry-x',
    name: 'RY X',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 14 Feb',
  },
];
