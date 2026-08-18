import { GALLERY_IMAGES, POSTER_IMAGE } from '../data/festivalConfig';

export const FESTIVAL_EVENT_ID = 'bahidora-2026';

export const FESTIVAL_LOGO_SRC = `${import.meta.env.BASE_URL}festival-logo.png`;

export const FESTIVAL_EVENT = {
  id: FESTIVAL_EVENT_ID,
  title: 'Bahidorá 2026',
  image: GALLERY_IMAGES[0]?.src ?? POSTER_IMAGE,
  venue: 'Las Estacas — Tlaltizapán, Morelos, Mexico',
  dateLine: '13–15 February 2026 (Friday–Sunday)',
};

export function getFestivalEvent(eventId: string) {
  if (eventId === FESTIVAL_EVENT_ID) return FESTIVAL_EVENT;
  return null;
}
