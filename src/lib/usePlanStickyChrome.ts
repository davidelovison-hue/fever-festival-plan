import { useLayoutEffect } from 'react';

/** Leftover strip tall enough to show cropped artist names above the stepper. */
const INTRO_SLIVER_PX = 80;
const SCROLL_SETTLE_MS = 110;
const SNAP_LOCK_MS = 450;

/**
 * Keep the sticky stepper flush under the real navbar, and don't let the
 * lineup rest as a cropped sliver between the two chrome bars.
 */
export function usePlanStickyChrome() {
  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>('.planPage');
    const nav = document.querySelector<HTMLElement>('.planStickyNav');
    const tabs = document.querySelector<HTMLElement>('.planTabsSlot');
    if (!page || !nav) return;

    const applyHeights = () => {
      const navH = nav.getBoundingClientRect().height;
      page.style.setProperty('--festival-nav-height', `${navH}px`);
      if (tabs) {
        page.style.setProperty('--sticky-tabs-height', `${tabs.getBoundingClientRect().height}px`);
      }
    };

    applyHeights();
    const resizeObserver = new ResizeObserver(applyHeights);
    resizeObserver.observe(nav);
    if (tabs) resizeObserver.observe(tabs);

    let settleTimer = 0;
    let snapLockUntil = 0;

    const dockIntroOrTabs = () => {
      if (Date.now() < snapLockUntil) return;
      const intro = document.querySelector<HTMLElement>('.planIntroBand');
      if (!intro || !tabs) return;

      const navH = nav.getBoundingClientRect().height;
      const introRect = intro.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();
      const straddling = introRect.top < navH - 1 && introRect.bottom > navH + 6;
      if (!straddling) return;

      const visible = introRect.bottom - navH;
      const hidden = navH - introRect.top;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

      let delta = 0;
      if (visible < INTRO_SLIVER_PX || hidden >= introRect.height * 0.4) {
        delta = tabsRect.top - navH;
      } else if (hidden > 8) {
        delta = introRect.top - navH;
      }
      if (Math.abs(delta) < 2) return;

      snapLockUntil = Date.now() + (reduceMotion ? 80 : SNAP_LOCK_MS);
      window.scrollBy({ top: delta, left: 0, behavior });
    };

    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(dockIntroOrTabs, SCROLL_SETTLE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', dockIntroOrTabs, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', dockIntroOrTabs);
    };
  }, []);
}
