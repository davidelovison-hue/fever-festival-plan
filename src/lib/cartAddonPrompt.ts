import {
  PLAN_ADDON_CATEGORIES,
  PLAN_CORE_CATEGORY_IDS,
  findCategoryIdForEntity,
} from '../data/planCatalog';

const PROMPT_KEY = 'fever-festival-plan:addon-checkout-prompted';

export function cartHasTicketsWithoutAddons(items: { entityId: string }[]): boolean {
  const coreIds = new Set<string>(PLAN_CORE_CATEGORY_IDS);
  const addonIds = new Set<string>(PLAN_ADDON_CATEGORIES.map((tab) => tab.id));
  let hasTicket = false;
  let hasAddon = false;

  for (const item of items) {
    const categoryId = findCategoryIdForEntity(item.entityId);
    if (!categoryId) continue;
    if (coreIds.has(categoryId)) hasTicket = true;
    if (addonIds.has(categoryId)) hasAddon = true;
  }

  return hasTicket && !hasAddon;
}

export function hasAddonCheckoutPromptBeenShown(): boolean {
  try {
    return sessionStorage.getItem(PROMPT_KEY) === '1';
  } catch {
    return false;
  }
}

export function markAddonCheckoutPromptShown(): void {
  try {
    sessionStorage.setItem(PROMPT_KEY, '1');
  } catch {
    /* ignore */
  }
}
