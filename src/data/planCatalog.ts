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
   * Keys match option labels (e.g. "Friday 13").
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
  label: 'Day',
  options: ['Friday 13', 'Saturday 14', 'Sunday 15'],
};

/** Entry pass tab. Add `'Wave 2'` (and optionPrices / disabledOptions) when the next wave opens. */
export const TICKET_WAVE_AXIS: VariantAxis = {
  id: 'wave',
  label: 'Wave',
  options: ['Wave 1'],
  defaultOption: 'Wave 1',
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
    title: 'Entry pass',
    groups: [
      {
        id: 'acceso-weekend',
        title: 'Multi Day Pass',
        entities: [
          {
            id: 'ticket-full-weekend',
            name: '3 days',
            price: 3390,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            listingTag: 'SELLING FAST',
            date: '13–15 Feb 2027',
            description: 'Individual access Friday, Saturday and Sunday.',
            cardPreviewBullets: ['Friday, Saturday & Sunday', 'Carbon offset included'],
          },
          {
            id: 'ticket-full-weekend-oasis',
            name: '3 days + Oasis Banamex',
            price: 6890,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            listingTag: 'LIMITED',
            date: '13–15 Feb 2027',
            description:
              '3-day access plus Oasis Banamex: shaded backstage lounges at Sonorama, El Cubo and La Estación, comfort bathrooms, Las Estacas restaurant and priority entry.',
            includedItems: [
              'Friday–Sunday festival access',
              'Oasis Banamex backstage & lounge',
              'Priority entry + restaurant access',
            ],
            cardPreviewBullets: ['Oasis Banamex backstage', 'Priority entry'],
          },
          {
            id: 'ticket-half-weekend',
            name: '2 days',
            price: 2690,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            date: '14–15 Feb 2027',
            description: 'Individual access Saturday and Sunday.',
            cardPreviewBullets: ['Saturday & Sunday'],
          },
          {
            id: 'ticket-half-weekend-oasis',
            name: '2 days + Oasis Banamex',
            price: 6190,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            listingTag: 'LIMITED',
            date: '14–15 Feb 2027',
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
            name: 'Friday Day Pass',
            price: 1099,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            date: 'Fri 13 Feb',
            description: 'One-day individual access — Friday 13 February.',
          },
          {
            id: 'ticket-saturday',
            name: 'Saturday Day Pass',
            price: 2290,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            listingTag: 'SELLING FAST',
            date: 'Sat 14 Feb',
            description: 'One-day individual access — Saturday 14 February.',
          },
          {
            id: 'ticket-sunday',
            name: 'Sunday Day Pass',
            price: 1490,
            type: 'configurable_single',
            variantAxes: [TICKET_WAVE_AXIS],
            date: 'Sun 15 Feb',
            description: 'One-day individual access — Sunday 15 February.',
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
            variantAxes: [TICKET_WAVE_AXIS],
            listingTag: 'LIMITED',
            date: '13–15 Feb 2027',
            description:
              'Add-on to General Admission. Shaded backstage at Sonorama, El Cubo and La Estación, lounge and bar, comfort bathrooms, phone charging, cashless top-up, Las Estacas restaurant and priority entry. Does not include lodging.',
            includedItems: [
              'Oasis Banamex backstage & lounge',
              'Comfort bathrooms & charging',
              'Priority entry + restaurant',
            ],
            cardPreviewBullets: ['Requires General Admission', 'Backstage + priority entry'],
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
            cardPreviewBullets: ['5× Full Weekend 3 days', 'Pay 4, get 1 free'],
            includedItems: ['5× Full Weekend General Admission'],
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
            cardPreviewBullets: ['5× Half Weekend 2 days', 'Pay 4, get 1 free'],
            includedItems: ['5× Half Weekend General Admission'],
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
            name: 'Saturday Day Pass + Bus',
            price: 2890,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            date: 'Sat 14 Feb',
            description: 'Saturday festival access plus round-trip CDMX bus, per person.',
            cardPreviewBullets: ['Saturday Day Pass', 'Round-trip Mexico City bus'],
            includedItems: ['Saturday Day Pass', 'Round-trip Mexico City bus — Saturday'],
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
              'Camping inside Las Estacas with upgraded showers, premium bathrooms and a fire pit. Tent and General Admission not included.',
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
              'Premium camping in the heart of Las Estacas with fixed showers, bathrooms, changing rooms and an exclusive pool. Tent and General Admission not included.',
            cardPreviewBullets: ['Exclusive pool', 'Price per person'],
            includedItems: ['Premium camping inside Las Estacas', 'Fixed showers, bathrooms & lockers', 'Exclusive pool'],
          },
          {
            id: 'camp-onix',
            name: 'Camp Ónix',
            price: 1490,
            type: 'configurable_single',
            description:
              'Premium camping just outside Las Estacas with fixed facilities, exclusive pools and a spring. Tent and General Admission not included.',
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
              'Reserved group camping for your crew. Total price for the team plot — General Admission and tents not included.',
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
            name: 'Amatista Glamp — Double',
            price: 18900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping for 2 inside Las Estacas: double bed with linens, furniture, lamp and lock, premium showers and bathrooms, exclusive pool shared with Camp Zafiro. General Admission not included.',
            cardPreviewBullets: ['Sleeps 2', 'Pool with Camp Zafiro'],
            includedItems: ['Glamping tent for 2', 'Double bed & linens', 'Exclusive pool access'],
          },
          {
            id: 'glamp-amatista-cuadruple',
            name: 'Amatista Glamp — Quadruple',
            price: 29900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping for 4 inside Las Estacas: four single beds with linens, furniture, lamp and lock, premium showers and bathrooms, exclusive pool shared with Camp Zafiro. General Admission not included.',
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
            name: 'Nehirá Double Suite',
            price: 24900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Glamping suite for 2 at Hotel Nehirá inside Las Estacas: king bed, safe, furniture, lamp and fan, private bathroom and shower, exclusive pool shared with Camp Zafiro. General Admission not included.',
            cardPreviewBullets: ['Sleeps 2', 'Private bathroom'],
            includedItems: ['Nehirá suite for 2', 'King bed & private bathroom', 'Exclusive pool access'],
          },
          {
            id: 'hotel-nehira-master-doble',
            name: 'Nehirá Master Double Suite',
            price: 29900,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'Master suite for 2 at Hotel Nehirá: king bed, safe, furniture, garden, private bathroom with shower and tub, exclusive pool shared with Camp Zafiro. General Admission not included.',
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
            name: 'Double room — 3 nights',
            price: 12990,
            type: 'configurable_single',
            description:
              'Double room (one double bed) at Hotel Hacienda Cocoyoc for 3 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. General Admission not included.',
            cardPreviewBullets: ['Sleeps 2 · 3 nights', 'Shuttle every 30 min'],
            includedItems: ['Double room 3 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-doble-2n',
            name: 'Double room — 2 nights',
            price: 9990,
            type: 'configurable_single',
            description:
              'Double room (one double bed) at Hotel Hacienda Cocoyoc for 2 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. General Admission not included.',
            cardPreviewBullets: ['Sleeps 2 · 2 nights', 'Shuttle every 30 min'],
            includedItems: ['Double room 2 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-cuadruple-3n',
            name: 'Quadruple room — 3 nights',
            price: 16990,
            type: 'configurable_single',
            description:
              'Quadruple room at Hotel Hacienda Cocoyoc for 3 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. General Admission not included.',
            cardPreviewBullets: ['Sleeps 4 · 3 nights', 'Shuttle every 30 min'],
            includedItems: ['Quadruple room 3 nights', 'Festival shuttle round-trip'],
          },
          {
            id: 'hotel-cuadruple-2n',
            name: 'Quadruple room — 2 nights',
            price: 13990,
            type: 'configurable_single',
            description:
              'Quadruple room at Hotel Hacienda Cocoyoc for 2 nights. Includes round-trip shuttle to the festival every 30 minutes. Buy one ticket per room. General Admission not included.',
            cardPreviewBullets: ['Sleeps 4 · 2 nights', 'Shuttle every 30 min'],
            includedItems: ['Quadruple room 2 nights', 'Festival shuttle round-trip'],
          },
        ],
      },
    ],
  },
  {
    id: 'transport',
    title: 'Bus & Parking',
    groups: [
      {
        id: 'transport-bus',
        title: 'Bus',
        entities: [
          {
            id: 'bus-cdmx-viernes',
            name: 'Round-trip Mexico City bus — Friday',
            price: 990,
            type: 'configurable_single',
            date: 'Fri 13 Feb',
            description: 'Round-trip bus from Mexico City on Friday. Price per person. Festival ticket not included.',
            cardPreviewBullets: ['Round-trip from Mexico City', 'Price per person'],
          },
          {
            id: 'bus-cdmx-sabado',
            name: 'Round-trip Mexico City bus — Saturday',
            price: 990,
            type: 'configurable_single',
            date: 'Sat 14 Feb',
            description: 'Round-trip bus from Mexico City on Saturday. Price per person. Festival ticket not included.',
            cardPreviewBullets: ['Round-trip from Mexico City', 'Price per person'],
          },
        ],
      },
      {
        id: 'transport-parking',
        title: 'Parking',
        entities: [
          {
            id: 'park-auto-weekend',
            name: 'Weekend camping car parking',
            price: 700,
            type: 'configurable_single',
            date: '13–15 Feb 2027',
            description: 'General car parking for the camping weekend. Festival ticket not included.',
          },
          {
            id: 'park-auto-day',
            name: 'Daily general car parking',
            price: 500,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            description: 'General car parking for one festival day. Festival ticket not included.',
          },
          {
            id: 'park-auto-preferencial-day',
            name: 'Daily preferred car parking',
            price: 600,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            listingTag: 'LIMITED',
            description: 'Preferential car parking closer to the entrance, per day. Festival ticket not included.',
          },
          {
            id: 'park-moto-day',
            name: 'Daily general motorcycle parking',
            price: 200,
            type: 'configurable_single',
            variantAxes: [FESTIVAL_DAY_AXIS],
            description: 'General motorcycle parking for one festival day. Festival ticket not included.',
          },
          {
            id: 'park-bus-van-day',
            name: 'Daily bus or van parking',
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
        title: 'Experiences',
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
            name: 'Relaxing massage',
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

export const PLAN_CORE_CATEGORY_IDS = ['acceso', 'bundles'] as const;

export const PLAN_ADDON_CATEGORIES = [
  { id: 'camping', label: 'Camping' },
  { id: 'glamping', label: 'Glamping & Hotel' },
  { id: 'transport', label: 'Bus & Parking' },
  { id: 'extra', label: 'Extras' },
] as const;

export type PlanStepId = 'pass' | 'accommodation' | 'bus' | 'extra';

export type PlanStep = {
  id: PlanStepId;
  title: string;
  categoryIds: string[];
};

export const PLAN_STEPS: PlanStep[] = [
  { id: 'pass', title: 'Entry pass', categoryIds: ['acceso', 'bundles'] },
  { id: 'accommodation', title: 'Accommodation', categoryIds: ['camping', 'glamping'] },
  { id: 'bus', title: 'Bus', categoryIds: ['transport'] },
  { id: 'extra', title: 'Extra', categoryIds: ['extra'] },
];

const CATEGORY_TO_STEP: Record<string, PlanStepId> = {
  acceso: 'pass',
  bundles: 'pass',
  camping: 'accommodation',
  glamping: 'accommodation',
  transport: 'bus',
  extra: 'extra',
};

const HASH_TO_STEP: Record<string, PlanStepId> = {
  ...CATEGORY_TO_STEP,
  pass: 'pass',
  tickets: 'pass',
  accommodation: 'accommodation',
  bus: 'bus',
  parking: 'bus',
};

export function getPlanStep(stepId: string): PlanStep | undefined {
  return PLAN_STEPS.find((step) => step.id === stepId);
}

export function getCategoriesForStep(stepId: string): PlanCategory[] {
  const step = getPlanStep(stepId);
  if (!step) return [];
  return PLAN_CATALOG.filter((category) => step.categoryIds.includes(category.id));
}

export function getStepIdFromHash(hash: string): PlanStepId {
  return HASH_TO_STEP[hash] ?? 'pass';
}

export function isPlanStepId(id: string): id is PlanStepId {
  return PLAN_STEPS.some((step) => step.id === id);
}

export function findCategoryIdForEntity(entityId: string): string | undefined {
  for (const category of PLAN_CATALOG) {
    for (const group of category.groups) {
      if (group.entities.some((item) => item.id === entityId)) return category.id;
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
