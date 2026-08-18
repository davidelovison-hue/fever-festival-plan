import { formatPrice } from '../lib/formatPrice';

export type VariantAxis = {
  id: string;
  label: string;
  options: string[];
  /** Shown but not selectable (e.g. sold-out waves). */
  disabledOptions?: string[];
  /** Preferred default when set and not disabled. */
  defaultOption?: string;
};

export type PlanEntity = {
  id: string;
  name: string;
  price: number;
  type: 'configurable_single' | 'configurable_multi' | 'composite';
  variantAxes?: VariantAxis[];
  /**
   * Absolute unit price when a chip/option value is selected.
   * Keys match option labels (e.g. "Viernes 13").
   */
  optionPrices?: Record<string, number>;
  date?: string;
  listingTag?: 'SELLING FAST' | 'SOLD OUT' | 'LIMITED';
  description?: string;
  includedItems?: string[];
  cardPreviewBullets?: string[];
  requires?: string[];
  displaySummary?: boolean;
  pricingMode?: 'dynamic';
};

export type PlanGroup = {
  id: string;
  title: string;
  entities: PlanEntity[];
};

export type PlanCategory = {
  id: string;
  title: string;
  contentMode?: 'overview';
  /** Equal-width cards in one row (e.g. extras). */
  cardLayout?: 'equalRow';
  groups: PlanGroup[];
};

export const FESTIVAL_DAY_AXIS: VariantAxis = {
  id: 'day',
  label: 'Día',
  options: ['Viernes 13', 'Sábado 14', 'Domingo 15'],
};

export const PLAN_CATALOG: PlanCategory[] = [
  {
    id: 'overview',
    title: 'Overview',
    contentMode: 'overview',
    groups: [],
  },
  {
    id: 'acceso',
    title: 'Full Weekend',
    groups: [
      {
        id: 'acceso-weekend',
        title: 'Full Weekend',
        entities: [
          {
            id: 'ticket-full-weekend',
            name: 'Full Weekend 3 días',
            price: 3390,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            date: '13–15 Feb 2026',
            description: 'Acceso individual viernes, sábado y domingo.',
            cardPreviewBullets: ['Friday, Saturday & Sunday', 'Carbon offset included'],
          },
          {
            id: 'ticket-full-weekend-oasis',
            name: 'Full Weekend Oasis Banamex 3 días',
            price: 6890,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            date: '13–15 Feb 2026',
            description:
              'Weekend access plus Oasis Banamex: shaded backstage lounges at Sonorama, El Cubo and La Estación, comfort bathrooms, Las Estacas restaurant and priority entry.',
            includedItems: [
              'Friday–Sunday festival access',
              'Oasis Banamex backstage & lounge',
              'Priority entry + restaurant access',
            ],
            cardPreviewBullets: ['Oasis Banamex backstage', 'Priority entry'],
          },
          {
            id: 'ticket-half-weekend',
            name: 'Half Weekend 2 días',
            price: 2690,
            type: 'configurable_single',
            date: '14–15 Feb 2026',
            description: 'Acceso individual sábado y domingo.',
            cardPreviewBullets: ['Saturday & Sunday'],
          },
          {
            id: 'ticket-half-weekend-oasis',
            name: 'Half Weekend Oasis Banamex 2 días',
            price: 6190,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            date: '14–15 Feb 2026',
            description:
              'Saturday–Sunday access plus Oasis Banamex shaded backstage, comfort bathrooms, restaurant access and priority entry.',
            includedItems: [
              'Saturday–Sunday festival access',
              'Oasis Banamex backstage & lounge',
              'Priority entry + restaurant access',
            ],
            cardPreviewBullets: ['Sat–Sun + Oasis Banamex'],
          },
        ],
      },
      {
        id: 'acceso-day',
        title: 'Day Pass',
        entities: [
          {
            id: 'ticket-friday',
            name: 'Day Pass Viernes',
            price: 1099,
            type: 'configurable_single',
            date: 'Fri 13 Feb',
            description: 'Acceso individual 1 día — viernes 13 de febrero.',
          },
          {
            id: 'ticket-saturday',
            name: 'Day Pass Sábado',
            price: 2290,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            date: 'Sat 14 Feb',
            description: 'Acceso individual 1 día — sábado 14 de febrero.',
          },
          {
            id: 'ticket-sunday',
            name: 'Day Pass Domingo',
            price: 1490,
            type: 'configurable_single',
            date: 'Sun 15 Feb',
            description: 'Acceso individual 1 día — domingo 15 de febrero.',
          },
        ],
      },
      {
        id: 'acceso-oasis-upgrade',
        title: 'Oasis Banamex',
        entities: [
          {
            id: 'ticket-oasis-upgrade',
            name: 'Oasis Banamex Upgrade',
            price: 3500,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            date: '13–15 Feb 2026',
            description:
              'Add-on to Acceso General. Shaded backstage at Sonorama, El Cubo and La Estación, lounge and bar, comfort bathrooms, phone charging, cashless top-up, Las Estacas restaurant and priority entry. Does not include lodging.',
            includedItems: [
              'Oasis Banamex backstage & lounge',
              'Comfort bathrooms & charging',
              'Priority entry + restaurant',
            ],
            cardPreviewBullets: ['Requires Acceso General', 'Backstage + priority entry'],
            requires: ['ticket-full-weekend', 'ticket-half-weekend', 'ticket-friday', 'ticket-saturday', 'ticket-sunday'],
          },
        ],
      },
    ],
  },
  {
    id: 'bundles',
    title: 'Bundles',
    groups: [
      {
        id: 'bundles-5x4',
        title: '5x4',
        entities: [
          {
            id: 'bundle-full-weekend-5x4',
            name: 'Full Weekend 5x4',
            price: 13560,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description: 'Five Full Weekend tickets for the price of four. Total for the group.',
            cardPreviewBullets: ['5× Full Weekend 3 días', 'Pay 4, get 1 free'],
            includedItems: ['5× Full Weekend Acceso General'],
          },
          {
            id: 'bundle-full-oasis-5x4',
            name: 'Full Weekend Oasis 5x4',
            price: 27560,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description: 'Five Full Weekend Oasis Banamex tickets for the price of four. Total for the group.',
            cardPreviewBullets: ['5× Full Weekend Oasis', 'Pay 4, get 1 free'],
            includedItems: ['5× Full Weekend Oasis Banamex'],
          },
          {
            id: 'bundle-half-weekend-5x4',
            name: 'Half Weekend 5x4',
            price: 10760,
            type: 'configurable_single',
            description: 'Five Half Weekend tickets for the price of four. Total for the group.',
            cardPreviewBullets: ['5× Half Weekend 2 días', 'Pay 4, get 1 free'],
            includedItems: ['5× Half Weekend Acceso General'],
          },
          {
            id: 'bundle-half-oasis-5x4',
            name: 'Half Weekend Oasis 5x4',
            price: 24760,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description: 'Five Half Weekend Oasis Banamex tickets for the price of four. Total for the group.',
            cardPreviewBullets: ['5× Half Weekend Oasis', 'Pay 4, get 1 free'],
            includedItems: ['5× Half Weekend Oasis Banamex'],
          },
        ],
      },
      {
        id: 'bundles-combo',
        title: 'Combos',
        entities: [
          {
            id: 'bundle-saturday-bus',
            name: 'Day Pass Sábado + Autobús',
            price: 2890,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            date: 'Sat 14 Feb',
            description: 'Saturday festival access plus round-trip CDMX bus, per person.',
            cardPreviewBullets: ['Day Pass Sábado', 'Autobús redondo CDMX'],
            includedItems: ['Day Pass Sábado', 'Autobús redondo CDMX sábado'],
          },
        ],
      },
    ],
  },
  {
    id: 'camping',
    title: 'Camping',
    groups: [
      {
        id: 'camping-all',
        title: 'Camping',
        entities: [
          {
            id: 'camp-a',
            name: 'Camp A',
            price: 1190,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            description:
              'Camping inside Las Estacas with upgraded showers, premium bathrooms and a fire pit. Tent and Acceso General not included.',
            cardPreviewBullets: ['Inside Las Estacas', 'Price per person'],
            includedItems: ['Camping zone inside Las Estacas', 'Upgraded showers & premium bathrooms', 'Fire pit'],
          },
          {
            id: 'camp-zafiro',
            name: 'Camp Zafiro',
            price: 2190,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Premium camping in the heart of Las Estacas with fixed showers, bathrooms, changing rooms and an exclusive pool. Tent and Acceso General not included.',
            cardPreviewBullets: ['Exclusive pool', 'Price per person'],
            includedItems: ['Premium camping inside Las Estacas', 'Fixed showers, bathrooms & lockers', 'Exclusive pool'],
          },
          {
            id: 'camp-onix',
            name: 'Camp Ónix',
            price: 1490,
            type: 'configurable_single',
            description:
              'Premium camping just outside Las Estacas with fixed facilities, exclusive pools and a spring. Tent and Acceso General not included.',
            cardPreviewBullets: ['Pools & spring', 'Price per person'],
            includedItems: ['Premium camping outside Las Estacas', 'Fixed showers & bathrooms', 'Pools and spring'],
          },
          {
            id: 'camp-team',
            name: 'Team Camp',
            price: 15920,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Reserved group camping for your crew. Total price for the team plot — Acceso General and tents not included.',
            cardPreviewBullets: ['Reserved group plot', 'Total for the team'],
            includedItems: ['Reserved Team Camp area', 'Shared camping facilities'],
          },
        ],
      },
    ],
  },
  {
    id: 'glamping',
    title: 'Glamping & Hotel',
    groups: [
      {
        id: 'glamp-amatista',
        title: 'Glamp Amatista',
        entities: [
          {
            id: 'glamp-amatista-doble',
            name: 'Glamp Amatista Doble',
            price: 18900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping for 2 inside Las Estacas: double bed with linens, furniture, lamp and lock, premium showers and bathrooms, exclusive pool shared with Camp Zafiro. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 2', 'Pool with Camp Zafiro'],
            includedItems: ['Glamping tent for 2', 'Double bed & linens', 'Exclusive pool access'],
          },
          {
            id: 'glamp-amatista-cuadruple',
            name: 'Glamp Amatista Cuádruple',
            price: 29900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping for 4 inside Las Estacas: four single beds with linens, furniture, lamp and lock, premium showers and bathrooms, exclusive pool shared with Camp Zafiro. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 4', 'Pool with Camp Zafiro'],
            includedItems: ['Glamping tent for 4', 'Four single beds & linens', 'Exclusive pool access'],
          },
        ],
      },
      {
        id: 'hotel-nehira',
        title: 'Hotel Nehirá',
        entities: [
          {
            id: 'hotel-nehira-suite-doble',
            name: 'Nehirá Suite Doble',
            price: 24900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping suite for 2 at Hotel Nehirá inside Las Estacas: king bed, safe, furniture, lamp and fan, private bathroom and shower, exclusive pool shared with Camp Zafiro. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 2', 'Private bathroom'],
            includedItems: ['Nehirá suite for 2', 'King bed & private bathroom', 'Exclusive pool access'],
          },
          {
            id: 'hotel-nehira-master-doble',
            name: 'Nehirá Master Suite Doble',
            price: 29900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Master suite for 2 at Hotel Nehirá: king bed, safe, furniture, garden, private bathroom with shower and tub, exclusive pool shared with Camp Zafiro. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 2', 'Garden, tub & private bath'],
            includedItems: ['Master suite for 2', 'Garden + tub', 'Exclusive pool access'],
          },
        ],
      },
      {
        id: 'hotel-habitacion',
        title: 'Hotel Hacienda Cocoyoc',
        entities: [
          {
            id: 'hotel-doble-3n',
            name: 'Habitación Doble 3 noches',
            price: 12990,
            type: 'configurable_single',
            description:
              'Double room (one double bed) at Hotel Hacienda Cocoyoc for 3 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 2 · 3 nights', 'Shuttle every 30 min'],
            includedItems: ['Double room 3 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-doble-2n',
            name: 'Habitación Doble 2 noches',
            price: 9990,
            type: 'configurable_single',
            description:
              'Double room (one double bed) at Hotel Hacienda Cocoyoc for 2 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 2 · 2 nights', 'Shuttle every 30 min'],
            includedItems: ['Double room 2 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-cuadruple-3n',
            name: 'Habitación Cuádruple 3 noches',
            price: 16990,
            type: 'configurable_single',
            description:
              'Quadruple room at Hotel Hacienda Cocoyoc for 3 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 4 · 3 nights', 'Shuttle every 30 min'],
            includedItems: ['Quadruple room 3 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-cuadruple-2n',
            name: 'Habitación Cuádruple 2 noches',
            price: 13990,
            type: 'configurable_single',
            description:
              'Quadruple room at Hotel Hacienda Cocoyoc for 2 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. Acceso General not included.',
            cardPreviewBullets: ['Sleeps 4 · 2 nights', 'Shuttle every 30 min'],
            includedItems: ['Quadruple room 2 nights', 'Festival shuttle round-trip'],
          },
        ],
      },
    ],
  },
  {
    id: 'transport',
    title: 'Autobús & Estacionamiento',
    groups: [
      {
        id: 'transport-bus',
        title: 'Autobús',
        entities: [
          {
            id: 'bus-cdmx-viernes',
            name: 'Autobús redondo CDMX viernes',
            price: 990,
            type: 'configurable_single',
            date: 'Fri 13 Feb',
            description: 'Round-trip bus from Mexico City on Friday. Price per person. Festival ticket not included.',
            cardPreviewBullets: ['Round-trip from CDMX', 'Price per person'],
          },
          {
            id: 'bus-cdmx-sabado',
            name: 'Autobús redondo CDMX sábado',
            price: 990,
            type: 'configurable_single',
            date: 'Sat 14 Feb',
            description: 'Round-trip bus from Mexico City on Saturday. Price per person. Festival ticket not included.',
            cardPreviewBullets: ['Round-trip from CDMX', 'Price per person'],
          },
        ],
      },
      {
        id: 'transport-parking',
        title: 'Estacionamiento',
        entities: [
          {
            id: 'park-auto-weekend',
            name: 'Auto general camping fin de semana',
            price: 700,
            type: 'configurable_single',
            date: '13–15 Feb 2026',
            description: 'General car parking for the camping weekend. Festival ticket not included.',
          },
          {
            id: 'park-auto-day',
            name: 'Auto general por día',
            price: 500,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            description: 'General car parking for one festival day. Festival ticket not included.',
          },
          {
            id: 'park-auto-preferencial-day',
            name: 'Auto preferencial por día',
            price: 600,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            listingTag: 'LIMITED',
            description: 'Preferential car parking closer to the entrance, per day. Festival ticket not included.',
          },
          {
            id: 'park-moto-day',
            name: 'Moto general por día',
            price: 200,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            description: 'General motorcycle parking for one festival day. Festival ticket not included.',
          },
          {
            id: 'park-bus-van-day',
            name: 'Autobús o van por día',
            price: 700,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            description: 'Bus or van parking for one festival day. Festival ticket not included.',
          },
        ],
      },
    ],
  },
  {
    id: 'extra',
    title: 'Extra',
    groups: [
      {
        id: 'extra-wellness',
        title: 'Experiencias',
        entities: [
          {
            id: 'extra-flow-sound-bath',
            name: 'Flow Sound Bath',
            price: 333,
            type: 'configurable_single',
            description: 'Sound-bath session on site. Price per person. Festival access not included.',
            cardPreviewBullets: ['Price per person'],
          },
          {
            id: 'extra-temazcal',
            name: 'Temazcal',
            price: 990,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            description: 'Traditional temazcal ceremony. Price per person. Festival access not included.',
            cardPreviewBullets: ['Price per person'],
          },
          {
            id: 'extra-masaje',
            name: 'Masaje relajante',
            price: 990,
            type: 'configurable_single',
            description: 'Relaxing massage at the festival. Price per person. Festival access not included.',
            cardPreviewBullets: ['Price per person'],
          },
        ],
      },
    ],
  },
];

const BASE = import.meta.env.BASE_URL;

export const DEFAULT_TICKET_IMAGE = `${BASE}entity-ticket.jpg`;

const CAMP_A_IMG = `${BASE}hero-grid-4.jpg`;
const CAMP_ZAFIRO_IMG = `${BASE}hero-grid-1.jpg`;
const CAMP_ONIX_IMG = `${BASE}hero-grid-4.jpg`;
const AMATISTA_DOBLE_IMG = `${BASE}entity-amatista-doble.jpg`;
const AMATISTA_QUAD_IMG = `${BASE}entity-amatista-quad.jpg`;
const NEHIRA_SUITE_IMG = `${BASE}entity-nehira-suite.jpg`;
const NEHIRA_MASTER_IMG = `${BASE}entity-nehira-master.jpg`;
const COCOYOC_DOUBLE_IMG = `${BASE}entity-cocoyoc-double.jpg`;
const COCOYOC_QUAD_IMG = `${BASE}entity-cocoyoc-quad.jpg`;
const BUS_IMG = `${BASE}entity-bus.jpg`;
const PARK_IMG = `${BASE}entity-parking.jpg`;
const SPA_IMG = `${BASE}hero-grid-1.jpg`;
const SOUND_IMG = `${BASE}hero-grid-2.jpg`;

export const ENTITY_IMAGES: Record<string, string> = {
  'camp-a': CAMP_A_IMG,
  'camp-zafiro': CAMP_ZAFIRO_IMG,
  'camp-onix': CAMP_ONIX_IMG,
  'camp-team': CAMP_A_IMG,
  'glamp-amatista-doble': AMATISTA_DOBLE_IMG,
  'glamp-amatista-cuadruple': AMATISTA_QUAD_IMG,
  'hotel-nehira-suite-doble': NEHIRA_SUITE_IMG,
  'hotel-nehira-master-doble': NEHIRA_MASTER_IMG,
  'hotel-doble-3n': COCOYOC_DOUBLE_IMG,
  'hotel-doble-2n': COCOYOC_DOUBLE_IMG,
  'hotel-cuadruple-3n': COCOYOC_QUAD_IMG,
  'hotel-cuadruple-2n': COCOYOC_QUAD_IMG,
  'bus-cdmx-viernes': BUS_IMG,
  'bus-cdmx-sabado': BUS_IMG,
  'park-auto-weekend': PARK_IMG,
  'park-auto-day': PARK_IMG,
  'park-auto-preferencial-day': PARK_IMG,
  'park-moto-day': PARK_IMG,
  'park-bus-van-day': BUS_IMG,
  'extra-flow-sound-bath': SOUND_IMG,
  'extra-temazcal': SPA_IMG,
  'extra-masaje': SPA_IMG,
};

export const ENTITY_GALLERIES: Record<string, string[]> = {
  'camp-a': [CAMP_A_IMG, CAMP_ZAFIRO_IMG],
  'camp-zafiro': [CAMP_ZAFIRO_IMG, CAMP_ONIX_IMG],
  'camp-onix': [CAMP_ONIX_IMG, CAMP_A_IMG],
  'camp-team': [CAMP_A_IMG, CAMP_ZAFIRO_IMG],
  'glamp-amatista-doble': [AMATISTA_DOBLE_IMG, AMATISTA_QUAD_IMG],
  'glamp-amatista-cuadruple': [AMATISTA_QUAD_IMG, AMATISTA_DOBLE_IMG],
  'hotel-nehira-suite-doble': [NEHIRA_SUITE_IMG, NEHIRA_MASTER_IMG],
  'hotel-nehira-master-doble': [NEHIRA_MASTER_IMG, NEHIRA_SUITE_IMG],
  'hotel-doble-3n': [COCOYOC_DOUBLE_IMG, COCOYOC_QUAD_IMG],
  'hotel-doble-2n': [COCOYOC_DOUBLE_IMG, COCOYOC_QUAD_IMG],
  'hotel-cuadruple-3n': [COCOYOC_QUAD_IMG, COCOYOC_DOUBLE_IMG],
  'hotel-cuadruple-2n': [COCOYOC_QUAD_IMG, COCOYOC_DOUBLE_IMG],
};

export function getEntityImages(entityId: string): string[] {
  if (ENTITY_GALLERIES[entityId]) return ENTITY_GALLERIES[entityId];
  if (ENTITY_IMAGES[entityId]) return [ENTITY_IMAGES[entityId]];
  if (
    entityId.startsWith('ticket-') ||
    entityId.startsWith('bundle-') ||
    entityId.startsWith('bus-') ||
    entityId.startsWith('park-') ||
    entityId.startsWith('extra-')
  ) {
    return [DEFAULT_TICKET_IMAGE];
  }
  return [DEFAULT_TICKET_IMAGE];
}

export function findEntity(entityId: string): PlanEntity | undefined {
  for (const category of PLAN_CATALOG) {
    for (const group of category.groups) {
      const entity = group.entities.find((item) => item.id === entityId);
      if (entity) return entity;
    }
  }
  return undefined;
}

/** Unit price for the currently selected chip(s); falls back to base `price`. */
export function getEntityUnitPrice(
  entity: PlanEntity,
  selections: Record<string, string> = {},
): number {
  const prices = entity.optionPrices;
  if (prices) {
    const preferredKeys = ['option', 'camping', 'size', 'wave', 'day', 'weekend', 'route'];
    for (const key of preferredKeys) {
      const value = selections[key];
      if (value && prices[value] != null) return prices[value];
    }

    for (const value of Object.values(selections)) {
      if (value && prices[value] != null) return prices[value];
    }
  }

  return entity.price;
}

export function formatEntityPrice(price: number): string {
  return formatPrice(price);
}
