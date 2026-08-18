import { GALLERY_IMAGES, POSTER_IMAGE } from '../data/festivalConfig';

export const FESTIVAL_EVENT_ID = 'awakenings-festival-2026';

export const FESTIVAL_LOGO_SRC = `${import.meta.env.BASE_URL}festival-logo.png`;

export const FESTIVAL_EVENT = {
  id: FESTIVAL_EVENT_ID,
  title: 'Awakenings Festival 2026',
  image: GALLERY_IMAGES[0]?.src ?? POSTER_IMAGE,
  venue: 'Houtrak — Spaarnwoude (near Amsterdam), Netherlands',
  dateLine: '3–5 July 2026 (Friday–Sunday)',
};

export function getFestivalEvent(eventId: string) {
  if (eventId === FESTIVAL_EVENT_ID) return FESTIVAL_EVENT;
  return null;
}
