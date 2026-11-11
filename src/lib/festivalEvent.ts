import { GALLERY_IMAGES, POSTER_IMAGE } from '../data/festivalConfig';

export const FESTIVAL_EVENT_ID = 'sala-principal-mesas';

export const FESTIVAL_LOGO_SRC = `${import.meta.env.BASE_URL}festival-logo.png`;

export const FESTIVAL_EVENT = {
  id: FESTIVAL_EVENT_ID,
  title: 'Mesas — Sala Principal',
  image: GALLERY_IMAGES[0]?.src ?? POSTER_IMAGE,
  venue: 'Sala Principal — Madrid',
  dateLine: '15 de mayo · 20:00–03:00',
};

export function getFestivalEvent(eventId: string) {
  if (eventId === FESTIVAL_EVENT_ID) return FESTIVAL_EVENT;
  return null;
}
