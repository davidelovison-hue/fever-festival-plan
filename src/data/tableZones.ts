import type { PlanEntity } from './planCatalog';

const BASE = import.meta.env.BASE_URL;

/** Shared club-night imagery for table zone cards. */
const ZONE_IMAGES = {
  pista: `${BASE}hero-grid-2.jpg`,
  palco: `${BASE}hero-grid-3.jpg`,
  vip: `${BASE}hero-grid-1.jpg`,
  cristal: `${BASE}hero-grid-4.jpg`,
  dj: `${BASE}festival-poster.jpg`,
  backstage: `${BASE}entity-nehira-suite.jpg`,
} as const;

export type TableZoneId =
  | 'pista-izquierda'
  | 'pista-derecha'
  | 'palco-izquierdo'
  | 'palco-derecho'
  | 'vip-cielo'
  | 'cristal'
  | 'dj-booth'
  | 'backstage';

export type TableZone = {
  id: TableZoneId;
  mapLabel: string;
  entity: PlanEntity;
  image: string;
  capacity: number;
  /** Fill tone on the isometric map (wireframe greys). */
  mapTone: 'dark' | 'mid' | 'light' | 'accent';
};

export const TABLE_INTRO =
  'Vive el evento desde una mesa en la sala principal, con acceso preferente y servicios exclusivos.';

export const TABLE_ZONES: TableZone[] = [
  {
    id: 'pista-izquierda',
    mapLabel: 'PISTA IZQUIERDA',
    mapTone: 'dark',
    image: ZONE_IMAGES.pista,
    capacity: 5,
    entity: {
      id: 'mesa-pista-izquierda',
      name: 'PISTA IZQUIERDA',
      price: 300,
      type: 'configurable_single',
      description:
        'Mesa en pista izquierda, cerca del escenario y con vista directa al DJ. Ideal para grupos que quieren estar en el centro de la fiesta.',
      includedItems: ['1 botella', 'Acceso prioritario y reentrada', 'Parking VIP'],
      cardPreviewBullets: ['1 botella', 'Acceso prioritario y reentrada', 'Parking VIP'],
    },
  },
  {
    id: 'pista-derecha',
    mapLabel: 'PISTA DERECHA',
    mapTone: 'light',
    image: ZONE_IMAGES.pista,
    capacity: 5,
    entity: {
      id: 'mesa-pista-derecha',
      name: 'PISTA DERECHA',
      price: 300,
      type: 'configurable_single',
      description:
        'Mesa en pista derecha con acceso rápido a barra y baños. Ambiente energético junto a la pista principal.',
      includedItems: ['1 botella', 'Acceso prioritario y reentrada', 'Parking VIP'],
      cardPreviewBullets: ['1 botella', 'Acceso prioritario y reentrada', 'Parking VIP'],
    },
  },
  {
    id: 'palco-izquierdo',
    mapLabel: 'PALCO IZQUIERDO',
    mapTone: 'mid',
    image: ZONE_IMAGES.palco,
    capacity: 6,
    entity: {
      id: 'mesa-palco-izquierdo',
      name: 'PALCO IZQUIERDO',
      price: 450,
      type: 'configurable_single',
      listingTag: 'SELLING FAST',
      description:
        'Palco elevado a la izquierda con vista panorámica de la sala. Más espacio, más comodidad y servicio de camarero.',
      includedItems: [
        '2 botellas',
        'Acceso prioritario y reentrada',
        'Parking VIP',
        'Servicio de camarero',
      ],
      cardPreviewBullets: ['2 botellas', 'Acceso prioritario y reentrada', 'Parking VIP'],
    },
  },
  {
    id: 'palco-derecho',
    mapLabel: 'PALCO DERECHO',
    mapTone: 'mid',
    image: ZONE_IMAGES.palco,
    capacity: 6,
    entity: {
      id: 'mesa-palco-derecho',
      name: 'PALCO DERECHO',
      price: 450,
      type: 'configurable_single',
      description:
        'Palco elevado a la derecha con perspectiva completa de pista y escenario. Perfecto para celebraciones.',
      includedItems: [
        '2 botellas',
        'Acceso prioritario y reentrada',
        'Parking VIP',
        'Servicio de camarero',
      ],
      cardPreviewBullets: ['2 botellas', 'Acceso prioritario y reentrada', 'Parking VIP'],
    },
  },
  {
    id: 'vip-cielo',
    mapLabel: 'V.I.P. CIELO',
    mapTone: 'accent',
    image: ZONE_IMAGES.vip,
    capacity: 8,
    entity: {
      id: 'mesa-vip-cielo',
      name: 'V.I.P. CIELO',
      price: 900,
      type: 'configurable_single',
      listingTag: 'LIMITED',
      description:
        'Zona VIP elevada con ambiente exclusivo, sofás y vista privilegiada. Incluye barra y baño privado en la zona.',
      includedItems: [
        '3 botellas',
        'Acceso prioritario y reentrada',
        'Parking VIP',
        'Zona con barra y baño privado',
      ],
      cardPreviewBullets: ['3 botellas', 'Barra y baño privado', 'Parking VIP'],
    },
  },
  {
    id: 'cristal',
    mapLabel: 'CRISTAL',
    mapTone: 'light',
    image: ZONE_IMAGES.cristal,
    capacity: 4,
    entity: {
      id: 'mesa-cristal',
      name: 'CRISTAL',
      price: 550,
      type: 'configurable_single',
      listingTag: 'LIMITED',
      description:
        'Mesa en la zona Cristal, semi-privada y con iluminación distintiva. Una experiencia más íntima sin alejarte de la música.',
      includedItems: ['2 botellas', 'Acceso prioritario y reentrada', 'Parking VIP'],
      cardPreviewBullets: ['2 botellas', 'Acceso prioritario y reentrada', 'Parking VIP'],
    },
  },
  {
    id: 'dj-booth',
    mapLabel: 'DJ BOOTH',
    mapTone: 'dark',
    image: ZONE_IMAGES.dj,
    capacity: 4,
    entity: {
      id: 'mesa-dj-booth',
      name: 'DJ BOOTH',
      price: 750,
      type: 'configurable_single',
      listingTag: 'SELLING FAST',
      description:
        'Mesa junto al DJ booth para vivir el set de cerca. Ambiente premium y contacto directo con la cabina.',
      includedItems: [
        '2 botellas',
        'Acceso prioritario y reentrada',
        'Parking VIP',
        'Meet & greet con el staff de pista',
      ],
      cardPreviewBullets: ['2 botellas', 'Junto al DJ', 'Parking VIP'],
    },
  },
  {
    id: 'backstage',
    mapLabel: 'BACKSTAGE',
    mapTone: 'mid',
    image: ZONE_IMAGES.backstage,
    capacity: 10,
    entity: {
      id: 'mesa-backstage',
      name: 'BACKSTAGE EXPERIENCE',
      price: 1200,
      type: 'configurable_single',
      listingTag: 'LIMITED',
      description:
        'Experiencia backstage con acceso a zona reservada, catering ligero y host dedicado para tu grupo.',
      includedItems: [
        '4 botellas',
        'Acceso prioritario y reentrada',
        'Parking VIP',
        'Zona con barra y baño privado',
        'Host dedicado',
      ],
      cardPreviewBullets: ['4 botellas', 'Host dedicado', 'Barra y baño privado'],
    },
  },
];

export function getTableZoneById(id: string): TableZone | undefined {
  return TABLE_ZONES.find((zone) => zone.id === id || zone.entity.id === id);
}

export function getTableEntities(): PlanEntity[] {
  return TABLE_ZONES.map((zone) => zone.entity);
}
