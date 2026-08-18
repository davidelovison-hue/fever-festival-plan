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
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85';

/** Sample lineup — replace with your festival artists. */
export const FESTIVAL_ARTISTS: FestivalArtist[] = [
  {
    id: 'deadmau5',
    name: 'deadmau5',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 3 Jul',
  },
  {
    id: 'eric-prydz',
    name: 'Eric Prydz',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 4 Jul',
  },
  {
    id: 'carl-cox',
    name: 'Carl Cox',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 5 Jul',
  },
  {
    id: 'amelie-lens',
    name: 'Amelie Lens',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Fri 3 Jul',
  },
  {
    id: 'fred-again',
    name: 'Fred again..',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sat 4 Jul',
  },
  {
    id: 'sara-landry',
    name: 'Sara Landry',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=85',
    fallbackImage: FALLBACK,
    day: 'Sun 5 Jul',
  },
];
