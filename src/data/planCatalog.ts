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
   * Keys match option labels (e.g. "Indoor", "2p tent · Outdoor").
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
  /** Equal-width cards in one row (e.g. cashless top-ups). */
  cardLayout?: 'equalRow';
  groups: PlanGroup[];
};

export const DAY_AXIS: VariantAxis = {
  id: 'day',
  label: 'Day',
  options: ['Thu 2', 'Fri 3', 'Sat 4', 'Sun 5'],
};

export const TWO_DAY_AXIS: VariantAxis = {
  id: 'weekend',
  label: 'Days',
  options: ['Thu–Fri', 'Fri–Sat', 'Sat–Sun'],
};

/** Pricing waves — only Wave 3 remains available. */
export const WAVE_AXIS: VariantAxis = {
  id: 'wave',
  label: 'Wave',
  options: ['Wave 1', 'Wave 2', 'Wave 3'],
  disabledOptions: ['Wave 1', 'Wave 2'],
  defaultOption: 'Wave 3',
};

/** Earlier waves were cheaper — used to show urgency when previewing sold-out chips. */
export function defaultWaveOptionPrices(currentWavePrice: number): Record<string, number> {
  const wave3 = currentWavePrice;
  const wave2 = Math.max(1, Math.round((currentWavePrice - 30) / 5) * 5);
  const wave1 = Math.max(1, Math.round((currentWavePrice - 60) / 5) * 5);
  return {
    'Wave 1': Math.min(wave1, wave2),
    'Wave 2': Math.min(wave2, wave3),
    'Wave 3': wave3,
  };
}

export const CAMPING_TYPE_AXIS: VariantAxis = {
  id: 'camping',
  label: 'Camping',
  options: ['Outdoor', 'Indoor'],
};

function combineOptionSets(...sets: string[][]): string[] {
  return sets.reduce<string[]>(
    (acc, set) => (acc.length === 0 ? set : acc.flatMap((left) => set.map((right) => `${left} · ${right}`))),
    [],
  );
}

export const EASY_TENT_SIZES = ['2p tent', '4p tent', '6p tent', '8p tent'];

export const CAMP_ZONE_AXIS: VariantAxis = {
  id: 'zone',
  label: 'Zone',
  options: ['Main field', 'Quiet field', 'Lakeside', 'Forest edge'],
};

export const EASY_CAMPING_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Tent',
  options: combineOptionSets(EASY_TENT_SIZES, CAMPING_TYPE_AXIS.options),
};

export const EASY_CAMPING_PLUS_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Tent',
  options: combineOptionSets(EASY_TENT_SIZES, ['Outdoor Plus', 'Indoor Plus']),
};

export const GLAMPING_UNITS = [
  'Classic pod (2p)',
  'Comfort lodge (2p)',
  'Premium suite (4p)',
  'VIP tent (4p)',
  'All-Star tent (6p)',
];

export const GLAMPING_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Unit',
  options: combineOptionSets(GLAMPING_UNITS, ['Phoenix field', 'Main arena', 'Quiet zone']),
};

export const COMFORT_LODGE_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Lodge',
  options: combineOptionSets(
    ['Twin lodge', 'Double lodge', 'Group lodge (4p)', 'Group lodge (6p)'],
    CAMP_ZONE_AXIS.options,
  ),
};

export const CAMPING_ADDON_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Camping',
  options: CAMP_ZONE_AXIS.options,
};

export const PARKING_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Parking',
  options: ['Main car park', 'North car park', 'Park & Ride', 'Full festival pass'],
};

export const VIP_PARKING_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Parking',
  options: ['VIP car park', 'Premium close'],
};

export const PMR_PARKING_OPTION_AXIS: VariantAxis = {
  id: 'option',
  label: 'Parking',
  options: ['PMR car park', 'Companion parking'],
};

export const MERCH_TEE_SIZE_AXIS: VariantAxis = {
  id: 'size',
  label: 'Size',
  options: ['S', 'M', 'L', 'XL', 'XXL'],
};

export const MERCH_ZIP_HOODIE_SIZE_AXIS: VariantAxis = {
  id: 'size',
  label: 'Size',
  options: ['S', 'M', 'L', 'XL'],
};

export const MERCH_COMBO_HOODIE_SIZE_AXIS: VariantAxis = {
  id: 'size',
  label: 'Size',
  options: ['X/S', 'M/L', 'XL/XXL'],
};

/** Build absolute prices for combined "size · type" camping options. */
function tentComboPrices(
  base: number,
  sizes: string[],
  types: string[],
  sizeBump: Record<string, number>,
  typeBump: Record<string, number>,
): Record<string, number> {
  const prices: Record<string, number> = {};
  for (const size of sizes) {
    for (const type of types) {
      prices[`${size} · ${type}`] = base + (sizeBump[size] ?? 0) + (typeBump[type] ?? 0);
    }
  }
  return prices;
}

const TENT_SIZE_BUMP: Record<string, number> = {
  '2p tent': 0,
  '4p tent': 30,
  '6p tent': 60,
  '8p tent': 90,
};

const LODGE_SIZE_BUMP: Record<string, number> = {
  'Twin lodge': 0,
  'Double lodge': 20,
  'Group lodge (4p)': 50,
  'Group lodge (6p)': 80,
};

const ZONE_BUMP: Record<string, number> = {
  'Main field': 0,
  'Quiet field': 10,
  Lakeside: 20,
  'Forest edge': 15,
  'Phoenix field': 0,
  'Main arena': 15,
  'Quiet zone': 10,
};

/** Accessible ticket catalog (PMR / Accompagnant). */
function buildAccessibleTicketGroups(kind: 'pmr' | 'accompagnant'): PlanGroup[] {
  const tag = kind === 'pmr' ? 'PMR/PSH' : 'Accompagnant PMR/PSH';
  const id = kind === 'pmr' ? 'pmr' : 'acc';
  const accessNote =
    kind === 'pmr'
      ? 'Accessible ticket — eligibility applies (PMR/PSH).'
      : 'Accompagnant PMR/PSH ticket — must accompany a PMR/PSH ticket holder.';

  return [
    {
      id: `${id}-pass-4jours`,
      title: `PASS 4 JOURS ${tag}`,
      entities: [
        {
          id: `ticket-${id}-4day`,
          name: `PASS 4 JOURS ${tag}`,
          price: 262,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          listingTag: 'SELLING FAST',
          description: `4-day festival access (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-4day-camp-outdoor`,
          name: `PASS 4 JOURS + CAMPING OUTDOOR ${tag}`,
          price: 312,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `4-day pass + outdoor camping (${tag}). ${accessNote}`,
          cardPreviewBullets: ['Outdoor camping from Wed 1 Jul 18:00'],
        },
        {
          id: `ticket-${id}-4day-camp-indoor`,
          name: `PASS 4 JOURS + CAMPING INDOOR ${tag}`,
          price: 415,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `4-day pass + indoor camping (${tag}). ${accessNote}`,
          cardPreviewBullets: ['Indoor camping from Thu 2 Jul 08:00'],
        },
      ],
    },
    {
      id: `${id}-pass-2jours`,
      title: `PASS 2 JOURS ${tag}`,
      entities: [
        {
          id: `ticket-${id}-2day-jf`,
          name: `PASS 2 JOURS — JEUDI/VENDREDI ${tag}`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Thu–Fri pass (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-2day-vs`,
          name: `PASS 2 JOURS — VENDREDI/SAMEDI ${tag}`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Fri–Sat pass (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-2day-sd`,
          name: `PASS 2 JOURS — SAMEDI/DIMANCHE ${tag}`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Sat–Sun pass (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-2day-jf-camp`,
          name: `PASS 2 JOURS — JEUDI/VENDREDI ${tag} + CAMPING INDOOR`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Thu–Fri pass + indoor camping (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-2day-vs-camp`,
          name: `PASS 2 JOURS — VENDREDI/SAMEDI ${tag} + CAMPING INDOOR`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Fri–Sat pass + indoor camping (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-2day-sd-camp`,
          name: `PASS 2 JOURS — SAMEDI/DIMANCHE ${tag} + CAMPING INDOOR`,
          price: 203,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          description: `Sat–Sun pass + indoor camping (${tag}). ${accessNote}`,
        },
      ],
    },
    {
      id: `${id}-ticket-1jour`,
      title: `TICKET 1 JOUR ${tag}`,
      entities: [
        {
          id: `ticket-${id}-1day-thu`,
          name: `LE JEUDI ${tag}`,
          price: 113,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          date: 'Thu 2 Jul',
          description: `Thursday day ticket (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-1day-fri`,
          name: `LE VENDREDI ${tag}`,
          price: 113,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          date: 'Fri 3 Jul',
          description: `Friday day ticket (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-1day-sat`,
          name: `LE SAMEDI ${tag}`,
          price: 113,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          date: 'Sat 4 Jul',
          listingTag: 'SELLING FAST',
          description: `Saturday day ticket (${tag}). ${accessNote}`,
        },
        {
          id: `ticket-${id}-1day-sun`,
          name: `LE DIMANCHE ${tag}`,
          price: 113,
          type: 'configurable_single',
          variantAxes: [WAVE_AXIS],
          date: 'Sun 5 Jul',
          description: `Sunday day ticket (${tag}). ${accessNote}`,
        },
      ],
    },
  ];
}

export const PLAN_CATALOG: PlanCategory[] = [
  {
    id: 'overview',
    title: 'Overview',
    contentMode: 'overview',
    groups: [],
  },
  {
    id: 'tickets',
    title: 'Festival Tickets',
    groups: [
      {
        id: 'pass-4jours',
        title: 'PASS 4 JOURS',
        entities: [
          {
            id: 'ticket-4day',
            name: 'PASS 4 JOURS',
            price: 219,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            listingTag: 'SELLING FAST',
            description: 'Festival access for 4 days (2–5 July 2028).',
          },
          {
            id: 'ticket-4day-camp-outdoor',
            name: 'PASS 4 JOURS + CAMPING OUTDOOR',
            price: 289,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: '4-day festival pass bundled with outdoor camping.',
            cardPreviewBullets: ['Outdoor camping from Wed 1 Jul 18:00'],
            includedItems: ['4-day festival pass', 'Outdoor camping', 'Sanitary facilities'],
          },
          {
            id: 'ticket-4day-camp-indoor',
            name: 'PASS 4 JOURS + CAMPING INDOOR',
            price: 349,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: '4-day festival pass bundled with indoor camping.',
            cardPreviewBullets: ['Indoor camping from Thu 2 Jul 08:00'],
            includedItems: ['4-day festival pass', 'Indoor camping', 'Sanitary facilities'],
          },
          {
            id: 'ticket-duo-damso',
            name: 'DUO PASS — DAMSO',
            price: 189,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            listingTag: 'LIMITED',
            description:
              'Festival bundle ticket with access to partner events on selected dates.',
            cardPreviewBullets: [
              'Cross-festival bundle — Awakenings + partner festival',
              'Upgrade path if you already hold a qualifying day ticket',
            ],
          },
        ],
      },
      {
        id: 'pass-2jours',
        title: 'PASS 2 JOURS',
        entities: [
          {
            id: 'ticket-2day-jf',
            name: 'PASS 2 JOURS — JEUDI/VENDREDI',
            price: 149,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Two consecutive festival days — Thursday & Friday.',
          },
          {
            id: 'ticket-2day-vs',
            name: 'PASS 2 JOURS — VENDREDI/SAMEDI',
            price: 149,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Two consecutive festival days — Friday & Saturday.',
          },
          {
            id: 'ticket-2day-sd',
            name: 'PASS 2 JOURS — SAMEDI/DIMANCHE',
            price: 149,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Two consecutive festival days — Saturday & Sunday.',
          },
          {
            id: 'ticket-2day-jf-camp',
            name: 'PASS 2 JOURS — JEUDI/VENDREDI + CAMPING INDOOR',
            price: 199,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Thu–Fri pass with indoor camping access.',
          },
          {
            id: 'ticket-2day-vs-camp',
            name: 'PASS 2 JOURS — VENDREDI/SAMEDI + CAMPING INDOOR',
            price: 199,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Fri–Sat pass with indoor camping access.',
          },
          {
            id: 'ticket-2day-sd-camp',
            name: 'PASS 2 JOURS — SAMEDI/DIMANCHE + CAMPING INDOOR',
            price: 199,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            description: 'Sat–Sun pass with indoor camping access.',
          },
        ],
      },
      {
        id: 'ticket-1jour',
        title: 'TICKET 1 JOUR',
        entities: [
          {
            id: 'ticket-1day-thu',
            name: 'LE JEUDI',
            price: 89,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            date: 'Thu 2 Jul',
            description: 'Single-day festival access — Thursday 2 July.',
          },
          {
            id: 'ticket-1day-fri',
            name: 'LE VENDREDI',
            price: 89,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            date: 'Fri 3 Jul',
            description: 'Single-day festival access — Friday 3 July.',
          },
          {
            id: 'ticket-1day-sat',
            name: 'LE SAMEDI',
            price: 89,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            date: 'Sat 4 Jul',
            listingTag: 'SELLING FAST',
            description: 'Single-day festival access — Saturday 4 July.',
          },
          {
            id: 'ticket-1day-sun',
            name: 'LE DIMANCHE',
            price: 89,
            type: 'configurable_single',
            variantAxes: [WAVE_AXIS],
            date: 'Sun 5 Jul',
            description: 'Single-day festival access — Sunday 5 July.',
          },
        ],
      },
      {
        id: 'premium',
        title: 'VIP',
        entities: [
          {
            id: 'ticket-vip',
            name: 'VIP',
            price: 349,
            type: 'configurable_single',
            listingTag: 'LIMITED',
            description:
              'VIP Club with Phoenix main stage view, plus VIP parking & shuttle when buying 2 identical VIP tickets.',
            includedItems: [
              'Festival access',
              'VIP Club area',
              'VIP parking & shuttle (2 identical VIP tickets)',
            ],
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
        id: 'camping-bundles',
        title: '4 Days Pass + Camping',
        entities: [
          {
            id: 'camp-4day-bundle',
            name: '4 Days Pass + Camping',
            price: 289,
            optionPrices: {
              Outdoor: 289,
              Indoor: 349,
            },
            type: 'configurable_single',
            variantAxes: [CAMPING_TYPE_AXIS],
            listingTag: 'SELLING FAST',
            description: '4-day festival pass bundled with camping access.',
            cardPreviewBullets: [
              'Outdoor: camping from Wed 1 Jul 18:00',
              'Indoor: camping from Thu 2 Jul 08:00',
            ],
            includedItems: ['4-day festival pass', 'Camping access', 'Sanitary facilities'],
          },
          {
            id: 'camp-addon-byt',
            name: 'Camping Add-on',
            price: 79,
            optionPrices: {
              'Main field': 79,
              'Quiet field': 89,
              Lakeside: 99,
              'Forest edge': 94,
            },
            type: 'configurable_single',
            variantAxes: [CAMPING_ADDON_OPTION_AXIS],
            description: 'Bring-your-own tent camping — requires a valid festival pass.',
            cardPreviewBullets: [
              'Festival pass not included',
              'Pick your camping zone',
            ],
          },
        ],
      },
      {
        id: 'easy-camping',
        title: 'Easy Camping',
        entities: [
          {
            id: 'camp-easy',
            name: 'Easy Camping',
            price: 129,
            optionPrices: tentComboPrices(
              129,
              EASY_TENT_SIZES,
              CAMPING_TYPE_AXIS.options,
              TENT_SIZE_BUMP,
              { Outdoor: 0, Indoor: 25 },
            ),
            type: 'configurable_single',
            variantAxes: [EASY_CAMPING_OPTION_AXIS],
            listingTag: 'SELLING FAST',
            description: 'Pre-pitched Festitent — arrive whenever you like, tent already set up.',
            cardPreviewBullets: [
              'Requires a valid 4 Days Pass + Camping',
              'No carrying or pitching required',
            ],
          },
          {
            id: 'camp-easy-plus',
            name: 'Easy Camping Plus',
            price: 169,
            optionPrices: tentComboPrices(
              169,
              EASY_TENT_SIZES,
              ['Outdoor Plus', 'Indoor Plus'],
              TENT_SIZE_BUMP,
              { 'Outdoor Plus': 0, 'Indoor Plus': 30 },
            ),
            type: 'configurable_single',
            variantAxes: [EASY_CAMPING_PLUS_OPTION_AXIS],
            description: 'Pre-pitched tent with bedding pack and mat included.',
            cardPreviewBullets: [
              'Requires a valid 4 Days Pass + Camping',
              'Bedding pack included',
            ],
          },
          {
            id: 'camp-comfort',
            name: 'Comfort Camping',
            price: 199,
            optionPrices: tentComboPrices(
              199,
              ['Twin lodge', 'Double lodge', 'Group lodge (4p)', 'Group lodge (6p)'],
              CAMP_ZONE_AXIS.options,
              LODGE_SIZE_BUMP,
              ZONE_BUMP,
            ),
            type: 'configurable_single',
            variantAxes: [COMFORT_LODGE_OPTION_AXIS],
            description: 'Lodge blocks with shared lounges and upgraded showers.',
            cardPreviewBullets: [
              'Requires a valid 4 Days Pass + Camping',
              'Wristband access to lodge areas',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'parking',
    title: 'Parking',
    groups: [
      {
        id: 'parking-options',
        title: 'Parking',
        entities: [
          {
            id: 'park-standard',
            name: 'Car Parking',
            price: 35,
            optionPrices: {
              'Main car park': 35,
              'North car park': 32,
              'Park & Ride': 25,
              'Full festival pass': 55,
            },
            type: 'configurable_single',
            variantAxes: [PARKING_OPTION_AXIS],
            description: 'Official festival parking — festival entry ticket not included.',
          },
          {
            id: 'park-vip',
            name: 'VIP Parking',
            price: 55,
            optionPrices: {
              'VIP car park': 55,
              'Premium close': 75,
            },
            type: 'configurable_single',
            variantAxes: [VIP_PARKING_OPTION_AXIS],
            description: 'Closest parking to the arena — valid when purchasing two identical VIP tickets.',
          },
          {
            id: 'park-pmr',
            name: 'PMR Parking',
            price: 35,
            optionPrices: {
              'PMR car park': 35,
              'Companion parking': 25,
            },
            type: 'configurable_single',
            variantAxes: [PMR_PARKING_OPTION_AXIS],
            description: 'Accessible parking — contact support if you need assistance.',
          },
        ],
      },
    ],
  },
  {
    id: 'bar',
    title: 'Bar',
    groups: [
      {
        id: 'cashless-recharges',
        title: 'Cashless recharges',
        entities: [
          {
            id: 'bar-recharge-20',
            name: '€20 top-up',
            price: 20,
            type: 'configurable_single',
            description: 'Load €20 onto your cashless wristband.',
          },
          {
            id: 'bar-recharge-50',
            name: '€50 top-up',
            price: 50,
            type: 'configurable_single',
            description: 'Load €50 onto your cashless wristband.',
          },
          {
            id: 'bar-recharge-100',
            name: '€100 top-up',
            price: 100,
            type: 'configurable_single',
            description: 'Load €100 onto your cashless wristband.',
          },
          {
            id: 'bar-recharge-150',
            name: '€150 top-up',
            price: 150,
            type: 'configurable_single',
            description: 'Load €150 onto your cashless wristband.',
          },
        ],
      },
    ],
  },
  {
    id: 'merch',
    title: 'Merch',
    groups: [
      {
        id: 'merch-tees',
        title: 'Line Up 2028 — T-Shirts',
        entities: [
          {
            id: 'merch-tee-lineup-beige',
            name: 'T-Shirt Line Up 2028 Beige',
            price: 38.5,
            optionPrices: {
              S: 38.5,
              M: 38.5,
              L: 38.5,
              XL: 40.5,
              XXL: 42.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_TEE_SIZE_AXIS],
            description: 'Line-up tee — beige colourway.',
          },
          {
            id: 'merch-tee-lineup-blanc',
            name: 'T-Shirt Line Up 2028 Blanc',
            price: 38.5,
            optionPrices: {
              S: 38.5,
              M: 38.5,
              L: 38.5,
              XL: 40.5,
              XXL: 42.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_TEE_SIZE_AXIS],
            description: 'Line-up tee — white colourway.',
          },
          {
            id: 'merch-tee-lineup-bleu',
            name: 'T-Shirt Line Up 2028 Bleu',
            price: 38.5,
            optionPrices: {
              S: 38.5,
              M: 38.5,
              L: 38.5,
              XL: 40.5,
              XXL: 42.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_TEE_SIZE_AXIS],
            listingTag: 'SELLING FAST',
            description: 'Line-up tee — blue colourway.',
          },
          {
            id: 'merch-tee-lineup-noir',
            name: 'T-Shirt Line Up 2028 Noir',
            price: 38.5,
            optionPrices: {
              S: 38.5,
              M: 38.5,
              L: 38.5,
              XL: 40.5,
              XXL: 42.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_TEE_SIZE_AXIS],
            description: 'Line-up tee — black colourway.',
          },
          {
            id: 'merch-tee-lineup-vert',
            name: 'T-Shirt Line Up 2028 Vert',
            price: 38.5,
            optionPrices: {
              S: 38.5,
              M: 38.5,
              L: 38.5,
              XL: 40.5,
              XXL: 42.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_TEE_SIZE_AXIS],
            listingTag: 'SOLD OUT',
            description: 'Line-up tee — green colourway.',
          },
        ],
      },
      {
        id: 'merch-hoodies',
        title: 'Hoodies',
        entities: [
          {
            id: 'merch-hoodie-zip-grey',
            name: 'Hoodie Zippé Gris',
            price: 86.5,
            optionPrices: {
              S: 86.5,
              M: 86.5,
              L: 86.5,
              XL: 89.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_ZIP_HOODIE_SIZE_AXIS],
            listingTag: 'SELLING FAST',
            description: 'Grey zip hoodie — official festival merch collection.',
          },
          {
            id: 'merch-hoodie-lineup-denim',
            name: 'Hoodie Line Up 2028 Denim',
            price: 82.5,
            optionPrices: {
              'X/S': 82.5,
              'M/L': 82.5,
              'XL/XXL': 86.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_COMBO_HOODIE_SIZE_AXIS],
            description: 'Line-up hoodie — denim colourway.',
          },
          {
            id: 'merch-hoodie-lineup-noir',
            name: 'Hoodie Line Up 2028 Noir',
            price: 82.5,
            optionPrices: {
              'X/S': 82.5,
              'M/L': 82.5,
              'XL/XXL': 86.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_COMBO_HOODIE_SIZE_AXIS],
            description: 'Line-up hoodie — black colourway.',
          },
          {
            id: 'merch-hoodie-hof-noir',
            name: 'Hoodie Hall Of Fame 20 Ans Noir',
            price: 82.5,
            optionPrices: {
              'X/S': 82.5,
              'M/L': 82.5,
              'XL/XXL': 86.5,
            },
            type: 'configurable_single',
            variantAxes: [MERCH_COMBO_HOODIE_SIZE_AXIS],
            listingTag: 'SOLD OUT',
            description: '20th anniversary Hall Of Fame hoodie — black.',
          },
        ],
      },
    ],
  },
  {
    id: 'pmr',
    title: 'PMR/PSH & Accompagnant',
    groups: [
      ...buildAccessibleTicketGroups('pmr'),
      ...buildAccessibleTicketGroups('accompagnant'),
    ],
  },
];

export const DEFAULT_TICKET_IMAGE =
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80';

export const ENTITY_IMAGES: Record<string, string> = {
  'camp-4day-bundle':
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  'camp-addon-byt':
    'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=800&q=80',
  'camp-easy':
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
  'camp-easy-plus':
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
  'camp-comfort':
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  'camp-glamping':
    'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
  'camp-glamping-vip':
    'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80',
  'merch-tee-lineup-beige':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Beige.png?width=800',
  'merch-tee-lineup-blanc':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Blanc_538eec21-4f46-4630-9e6a-2ac4bed9c83c.png?width=800',
  'merch-tee-lineup-bleu':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/1_b5e2c57d-bab7-4c95-8850-d60573cb0abf.png?width=800',
  'merch-tee-lineup-noir':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Noir_00cdefc0-eb1f-4cb5-96a9-8ff3df0b558a.png?width=800',
  'merch-tee-lineup-vert':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Ardentevertback_2.png?width=800',
  'merch-hoodie-zip-grey':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Design_sans_titre_13.png?width=800',
  'merch-hoodie-lineup-denim':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/NOUVEA_1.png?width=800',
  'merch-hoodie-lineup-noir':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Hoodienoirfront.png?width=800',
  'merch-hoodie-hof-noir':
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/HoodienoirfrontHOF.png?width=800',
};

export const ENTITY_GALLERIES: Record<string, string[]> = {
  'camp-4day-bundle': [
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  ],
  'camp-easy': [
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
  ],
  'camp-easy-plus': [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
  ],
  'camp-comfort': [
    'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  ],
  'camp-glamping': [
    'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
  ],
  'merch-hoodie-zip-grey': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Design_sans_titre_13.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Design_sans_titre_12.png?width=800',
  ],
  'merch-tee-lineup-beige': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Beige.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Beigefront.png?width=800',
  ],
  'merch-tee-lineup-blanc': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Blanc_538eec21-4f46-4630-9e6a-2ac4bed9c83c.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Blancfront.png?width=800',
  ],
  'merch-tee-lineup-bleu': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/1_b5e2c57d-bab7-4c95-8850-d60573cb0abf.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/2_cd6923f8-6e92-49e8-b499-2a21d489c1ff.png?width=800',
  ],
  'merch-tee-lineup-noir': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Noir_00cdefc0-eb1f-4cb5-96a9-8ff3df0b558a.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Nouveaunoirfront.png?width=800',
  ],
  'merch-tee-lineup-vert': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Ardentevertback_2.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Ardentevertfront.png?width=800',
  ],
  'merch-hoodie-lineup-denim': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/NOUVEA_1.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/NOUVEA_2.png?width=800',
  ],
  'merch-hoodie-lineup-noir': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Hoodienoirfront.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/Hoodienoir.png?width=800',
  ],
  'merch-hoodie-hof-noir': [
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/HoodienoirfrontHOF.png?width=800',
    'https://cdn.shopify.com/s/files/1/0652/8322/7913/files/HoodienoirHOF.png?width=800',
  ],
};

export function getEntityImages(entityId: string): string[] {
  if (ENTITY_GALLERIES[entityId]) return ENTITY_GALLERIES[entityId];
  if (ENTITY_IMAGES[entityId]) return [ENTITY_IMAGES[entityId]];
  if (entityId.startsWith('ticket-')) return [DEFAULT_TICKET_IMAGE];
  if (entityId.startsWith('merch-')) {
    return ENTITY_GALLERIES[entityId] ?? (ENTITY_IMAGES[entityId] ? [ENTITY_IMAGES[entityId]] : []);
  }
  return [];
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

  // Ticket waves: sold-out earlier waves keep their lower historical price for urgency preview.
  const hasWaveAxis = entity.variantAxes?.some((axis) => axis.id === 'wave');
  const wave = selections.wave;
  if (hasWaveAxis && wave) {
    const wavePrices = defaultWaveOptionPrices(entity.price);
    if (wavePrices[wave] != null) return wavePrices[wave];
  }

  return entity.price;
}

export function formatEntityPrice(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €`;
}
