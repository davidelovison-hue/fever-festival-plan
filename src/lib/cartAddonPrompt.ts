import {
  PLAN_ADDON_CATEGORIES,
  PLAN_CORE_CATEGORY_IDS,
  findCategoryIdForEntity,
} from '../data/planCatalog';

const PROMPT_KEY = 'fever-festival-plan:addon-checkout-prompted';
const RETURN_KEY = 'fever-festival-plan:addon-prompt-on-return';

let lastPathname = '/';

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

function isCheckoutFunnelPath(pathname: string): boolean {
  return pathname.startsWith('/event/');
}

function writeFlag(key: string, value: boolean): void {
  try {
    if (value) sessionStorage.setItem(key, '1');
    else sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function readFlag(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

/** Keep the one-time prompt scoped to a plan-page visit; re-arm after checkout. */
export function trackAddonPromptRoute(pathname: string): void {
  if (pathname === '/' && isCheckoutFunnelPath(lastPathname)) {
    writeFlag(RETURN_KEY, true);
    clearAddonCheckoutPromptShown();
  }
  lastPathname = pathname;
}

export function hasPendingAddonPromptFromCheckout(): boolean {
  return readFlag(RETURN_KEY);
}

export function clearPendingAddonPromptFromCheckout(): void {
  writeFlag(RETURN_KEY, false);
}

export function hasAddonCheckoutPromptBeenShown(): boolean {
  return readFlag(PROMPT_KEY);
}

export function markAddonCheckoutPromptShown(): void {
  writeFlag(PROMPT_KEY, true);
}

export function clearAddonCheckoutPromptShown(): void {
  writeFlag(PROMPT_KEY, false);
}
