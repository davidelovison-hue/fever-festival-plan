import { formatPrice } from '../lib/formatPrice';
import { getTableEntities, TABLE_ZONES } from './tableZones';

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

export const PLAN_CATALOG: PlanCategory[] = [
  {
    id: 'overview',
    title: 'Overview',
    contentMode: 'overview',
    groups: [],
  },
  {
    id: 'mesas',
    title: 'Mesas',
    groups: [
      {
        id: 'mesas-sala',
        title: 'Sala principal',
        entities: getTableEntities(),
      },
    ],
  },
  {
    id: 'bundles',
    title: 'Packs',
    groups: [
      {
        id: 'bundles-bottle',
        title: 'Botellas extra',
        entities: [
          {
            id: 'bundle-botella-premium',
            name: 'Botella premium extra',
            price: 120,
            type: 'configurable_single',
            description: 'Añade una botella premium a tu mesa. Compatible con cualquier zona.',
            cardPreviewBullets: ['1 botella premium', 'Servicio en mesa'],
            includedItems: ['1 botella premium', 'Servicio en mesa'],
          },
          {
            id: 'bundle-champagne',
            name: 'Champagne pack',
            price: 180,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description: 'Pack de champagne para celebrar en tu mesa.',
            cardPreviewBullets: ['2 botellas champagne', 'Hielo y cristalería'],
            includedItems: ['2 botellas champagne', 'Hielo y cristalería'],
          },
        ],
      },
    ],
  },
  {
    id: 'transport',
    title: 'Parking',
    groups: [
      {
        id: 'transport-parking',
        title: 'Parking',
        entities: [
          {
            id: 'park-vip-noche',
            name: 'Parking VIP',
            price: 25,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description: 'Plaza VIP cerca de la entrada principal. Precio por vehículo y noche.',
            cardPreviewBullets: ['Acceso preferente', 'Por vehículo'],
          },
          {
            id: 'park-general-noche',
            name: 'Parking general',
            price: 12,
            type: 'configurable_single',
            description: 'Parking general del venue. Precio por vehículo y noche.',
            cardPreviewBullets: ['Por vehículo'],
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
        id: 'extra-experiences',
        title: 'Experiencias',
        entities: [
          {
            id: 'extra-meet-greet',
            name: 'Meet & greet',
            price: 90,
            type: 'configurable_single',
            listingTag: 'SELLING FAST',
            description: 'Acceso a un meet & greet breve con el staff de pista antes de la apertura.',
            cardPreviewBullets: ['Por persona'],
          },
          {
            id: 'extra-foto',
            name: 'Sesión foto en mesa',
            price: 60,
            type: 'configurable_single',
            description: 'Sesión de fotos profesional en tu zona de mesa durante la noche.',
            cardPreviewBullets: ['Para el grupo de la mesa'],
          },
        ],
      },
    ],
  },
];

const BASE = import.meta.env.BASE_URL;

export const DEFAULT_TICKET_IMAGE = `${BASE}entity-ticket.jpg`;

const PARK_IMG = `${BASE}entity-parking.jpg`;
const BOTTLE_IMG = `${BASE}hero-grid-1.jpg`;
const EXTRA_IMG = `${BASE}hero-grid-3.jpg`;

export const ENTITY_IMAGES: Record<string, string> = {
  ...Object.fromEntries(TABLE_ZONES.map((zone) => [zone.entity.id, zone.image])),
  'bundle-botella-premium': BOTTLE_IMG,
  'bundle-champagne': BOTTLE_IMG,
  'park-vip-noche': PARK_IMG,
  'park-general-noche': PARK_IMG,
  'extra-meet-greet': EXTRA_IMG,
  'extra-foto': EXTRA_IMG,
};

export const ENTITY_GALLERIES: Record<string, string[]> = {};

export function getEntityImages(entityId: string): string[] {
  if (ENTITY_GALLERIES[entityId]) return ENTITY_GALLERIES[entityId];
  if (ENTITY_IMAGES[entityId]) return [ENTITY_IMAGES[entityId]];
  if (
    entityId.startsWith('mesa-') ||
    entityId.startsWith('bundle-') ||
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

export const PLAN_CORE_CATEGORY_IDS = ['mesas'] as const;

export const PLAN_ADDON_CATEGORIES = [
  { id: 'bundles', label: 'Packs' },
  { id: 'transport', label: 'Parking' },
  { id: 'extra', label: 'Extras' },
] as const;

export type PlanStepId = 'pass' | 'packs' | 'bus' | 'extra';

export type PlanStep = {
  id: PlanStepId;
  title: string;
  categoryIds: string[];
};

export const PLAN_STEPS: PlanStep[] = [
  { id: 'pass', title: 'Mesas', categoryIds: ['mesas'] },
  { id: 'packs', title: 'Packs', categoryIds: ['bundles'] },
  { id: 'bus', title: 'Parking', categoryIds: ['transport'] },
  { id: 'extra', title: 'Extra', categoryIds: ['extra'] },
];

const CATEGORY_TO_STEP: Record<string, PlanStepId> = {
  mesas: 'pass',
  bundles: 'packs',
  transport: 'bus',
  extra: 'extra',
};

const HASH_TO_STEP: Record<string, PlanStepId> = {
  ...CATEGORY_TO_STEP,
  pass: 'pass',
  mesas: 'pass',
  tickets: 'pass',
  packs: 'packs',
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

export const ALL_CAROUSELS = '__all__';

export type PlanCarouselOption = {
  id: string;
  label: string;
  categoryId: string;
};

/**
 * Whether a category's carousels should carry the category name. Skipped when
 * the step shows a single category, or when the category repeats the step.
 */
export function shouldPrefixCategory(
  categories: PlanCategory[],
  category: PlanCategory,
  activeStepTitle?: string,
): boolean {
  return categories.length > 1 && category.title !== activeStepTitle;
}

/** Shared by the carousel headings and the filter options, so they cannot drift. */
export function formatCarouselTitle(
  categoryTitle: string,
  groupTitle: string,
  prefix: boolean,
): string {
  return prefix && groupTitle !== categoryTitle ? `${categoryTitle} - ${groupTitle}` : groupTitle;
}

export function getCarouselsForCategories(
  categories: PlanCategory[],
  activeStepTitle?: string,
): PlanCarouselOption[] {
  return categories.flatMap((category) => {
    const prefix = shouldPrefixCategory(categories, category, activeStepTitle);
    return category.groups
      .filter((group) => group.entities.length > 0)
      .map((group) => ({
        id: group.id,
        label: formatCarouselTitle(category.title, group.title, prefix),
        categoryId: category.id,
      }));
  });
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
