import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AddToCartToast } from '../components/AddToCartToast';
import { CartPanel } from '../components/CartPanel';
import { FestivalArtistsCarousel } from '../components/FestivalArtistsCarousel';
import { FestivalGallery } from '../components/FestivalGallery';
import { FestivalNavbar } from '../components/FestivalNavbar';
import { OverviewCollapsible } from '../components/OverviewCollapsible';
import { PlanCategorySection } from '../components/PlanCategorySection';
import { PlanTabs } from '../components/PlanTabs';
import { useCart } from '../lib/cartContext';
import { scrollPageToTop } from '../lib/scrollPageToTop';
import { useIsMobile } from '../lib/useIsMobile';
import { FESTIVAL_ARTISTS } from '../data/festivalArtists';
import {
  getEnhanceCategories,
  getTicketCategories,
  isEnhanceCategoryId,
  isTicketCategoryId,
} from '../data/planCatalog';
import './PlanPage.css';

const TICKET_CATEGORIES = getTicketCategories();
const ENHANCE_CATEGORIES = getEnhanceCategories();
const DEFAULT_TICKET_TAB = 'acceso';

function getHash() {
  return window.location.hash.replace(/^#/, '');
}

function getTicketTabFromHash() {
  const hash = getHash();
  if (hash === 'overview') return DEFAULT_TICKET_TAB;
  if (hash === 'tickets') return DEFAULT_TICKET_TAB;
  if (hash === 'accompagnant' || hash === 'pmr') return DEFAULT_TICKET_TAB;
  if (isTicketCategoryId(hash)) return hash;
  return DEFAULT_TICKET_TAB;
}

function getSectionScrollIdFromHash() {
  const hash = getHash();
  if (!hash || hash === 'overview') return null;
  if (hash === 'tickets') return 'tickets';
  if (hash === 'parking') return 'transport';
  if (hash === 'accompagnant' || hash === 'pmr') return 'tickets';
  if (hash === 'enhance') return 'enhance';
  if (isTicketCategoryId(hash) || isEnhanceCategoryId(hash)) return hash;
  return null;
}

function shouldOpenOverviewFromHash() {
  return getHash() === 'overview';
}

const TAB_SCROLL_GAP_PX = 12;
const STICKY_CHECK_TOLERANCE_PX = 2;

function getStickyOffsetPx() {
  const nav = document.querySelector<HTMLElement>('.planStickyNav');
  const tabs = document.querySelector<HTMLElement>('.planTabsSlot');
  const navH = nav?.getBoundingClientRect().height ?? 0;
  const tabsH = tabs?.getBoundingClientRect().height ?? 0;
  return navH + tabsH + TAB_SCROLL_GAP_PX;
}

function isTabsBarStickyNow() {
  const nav = document.querySelector<HTMLElement>('.planStickyNav');
  const tabs = document.querySelector<HTMLElement>('.planTabsSlot');
  const anchor = document.querySelector<HTMLElement>('.planTabsScrollAnchor');
  if (!tabs) return false;
  if (!anchor) return false;

  const navH = nav?.getBoundingClientRect().height ?? 0;
  const anchorDocTop = anchor.getBoundingClientRect().top + window.scrollY;
  return window.scrollY >= anchorDocTop - navH - STICKY_CHECK_TOLERANCE_PX;
}

function getScrollTargetEl(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return null;
  const chips = section.querySelector<HTMLElement>('.groupChipsWrap');
  if (chips) return chips;

  const firstTitle = section.querySelector<HTMLElement>('.groupCarouselTitle, .categorySectionTitle');
  if (firstTitle) return firstTitle;
  const firstBlock = section.querySelector<HTMLElement>('.groupBlock');
  return firstBlock ?? section;
}

function scheduleOverviewScroll() {
  let cancelled = false;
  let rafId = 0;

  const runOnce = () => {
    const overviewEl = document.querySelector<HTMLElement>('.planOverviewSlot');
    if (!overviewEl) return;
    overviewEl.scrollIntoView({ block: 'start', behavior: 'auto' });
    const offset = getStickyOffsetPx();
    if (offset > 0) window.scrollBy({ top: -offset, left: 0, behavior: 'auto' });
  };

  rafId = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!cancelled) runOnce();
    });
  });

  return () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}

function scheduleActiveTabScroll(tabId: string) {
  let cancelled = false;
  let rafId = 0;

  const runOnce = () => {
    if (!isTabsBarStickyNow()) return;

    const targetEl = getScrollTargetEl(tabId);
    if (!targetEl) return;

    targetEl.scrollIntoView({ block: 'start', behavior: 'auto' });
    const offset = getStickyOffsetPx();
    if (offset > 0) window.scrollBy({ top: -offset, left: 0, behavior: 'auto' });
  };

  rafId = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!cancelled) runOnce();
    });
  });

  return () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}

function scheduleSectionScroll(sectionId: string) {
  let cancelled = false;
  let rafId = 0;

  const runOnce = () => {
    const targetEl = getScrollTargetEl(sectionId) ?? document.getElementById(sectionId);
    if (!targetEl) return;
    targetEl.scrollIntoView({ block: 'start', behavior: 'auto' });
    const offset = getStickyOffsetPx();
    if (offset > 0) window.scrollBy({ top: -offset, left: 0, behavior: 'auto' });
  };

  rafId = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!cancelled) runOnce();
    });
  });

  return () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}

function getTicketSectionScrollTop() {
  const nav = document.querySelector<HTMLElement>('.planStickyNav');
  const intro = document.querySelector<HTMLElement>('.planTicketsIntro');
  const tabs = document.querySelector<HTMLElement>('.planTabsSlot');
  const anchor = document.querySelector<HTMLElement>('.planTabsScrollAnchor');
  const section = document.getElementById('tickets');
  const target = intro ?? tabs ?? anchor ?? section;
  if (!target) return null;

  const navH = nav?.getBoundingClientRect().height ?? 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - navH);
}

/** Hero "Buy tickets" CTA: always scroll to the ticket section. */
function scrollToTicketSection() {
  const top = getTicketSectionScrollTop();
  if (top == null) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function scheduleScrollToTicketSection() {
  let cancelled = false;
  const run = () => {
    if (!cancelled) scrollToTicketSection();
  };
  const rafId = requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
  const timeoutId = window.setTimeout(run, 80);
  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    window.clearTimeout(timeoutId);
  };
}

export function PlanPage() {
  const location = useLocation();
  const { items } = useCart();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(getTicketTabFromHash);
  const [isOverviewOpen, setIsOverviewOpen] = useState(shouldOpenOverviewFromHash);
  const hasInitialTabScrollRef = useRef(false);
  const hasCart = items.length > 0;

  useLayoutEffect(() => {
    if (location.pathname !== '/') return;
    const hash = location.hash.replace(/^#/, '');
    if (hash) return;
    setIsOverviewOpen(false);
    return scrollPageToTop();
  }, [location.pathname, location.hash, location.key]);

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (tabId === activeTab) return;
      setActiveTab(tabId);
      window.history.pushState(null, '', `#${tabId}`);
    },
    [activeTab],
  );

  const handleGoToTickets = useCallback(() => {
    setIsOverviewOpen(false);
    if (activeTab !== DEFAULT_TICKET_TAB) {
      setActiveTab(DEFAULT_TICKET_TAB);
      window.history.pushState(null, '', '#acceso');
    } else {
      window.history.replaceState(null, '', '#acceso');
    }
    scheduleScrollToTicketSection();
  }, [activeTab]);

  const handleOverviewToggle = useCallback(() => {
    setIsOverviewOpen((open) => !open);
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = getHash();
      if (hash === 'overview') {
        setIsOverviewOpen(true);
        return;
      }
      setActiveTab(getTicketTabFromHash());
    };

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  useEffect(() => {
    if (!isOverviewOpen) return;
    return scheduleOverviewScroll();
  }, [isOverviewOpen]);

  useEffect(() => {
    const hash = getHash();
    const sectionId = getSectionScrollIdFromHash();

    if (!hasInitialTabScrollRef.current) {
      hasInitialTabScrollRef.current = true;
      if ((activeTab === DEFAULT_TICKET_TAB && !hash) || hash === 'overview') {
        return;
      }
      if (sectionId && (isEnhanceCategoryId(sectionId) || sectionId === 'enhance')) {
        return scheduleSectionScroll(sectionId);
      }
    }

    if (sectionId && (isEnhanceCategoryId(sectionId) || sectionId === 'enhance')) {
      return;
    }

    return scheduleActiveTabScroll(activeTab);
  }, [activeTab]);

  return (
    <div className="planPage">
      <div className="planStickyNav">
        <FestivalNavbar />
      </div>

      <div className="planHeroSlot planHeroSlot--mediaHero planHeroSlot--immersive">
        <FestivalGallery onBuyTickets={handleGoToTickets} />
      </div>

      <div className="planDesktopShell">
        <div className="planIntroBand">
          <div className="planOverviewSlot">
            <OverviewCollapsible isOpen={isOverviewOpen} onToggle={handleOverviewToggle} />
          </div>

          <div className="planArtistsSlot">
            <FestivalArtistsCarousel
              artists={FESTIVAL_ARTISTS}
              title="Lineup"
              hideDay
            />
          </div>
        </div>

        <div className="planTicketsIntro">
          <h2 className="planTicketsIntroTitle" id="plan-tickets-heading">
            Choose your ticket
          </h2>
          <p className="planTicketsIntroCopy">
            Full Weekend or Bundles first. Camping, stays, and travel are further down.
          </p>
        </div>

        <div className="planTabsScrollAnchor" aria-hidden="true" />
        <div className="planTabsSlot">
          <PlanTabs
            categories={TICKET_CATEGORIES}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="planMainShell">
          <div className="planMainColumn">
            <div className="planContentColumn">
              <div
                className="planTicketsBlock"
                id="tickets"
                aria-labelledby="plan-tickets-heading"
              >
                {TICKET_CATEGORIES.map((category) => (
                  <PlanCategorySection
                    key={category.id}
                    category={category}
                    isActive={activeTab === category.id}
                  />
                ))}
              </div>

              <section
                className="planEnhanceBlock"
                id="enhance"
                aria-labelledby="plan-enhance-heading"
              >
                <header className="planEnhanceHeader">
                  <p className="planEnhanceEyebrow">Optional add-ons</p>
                  <h2 className="planEnhanceTitle" id="plan-enhance-heading">
                    Enhance your trip
                  </h2>
                  <p className="planEnhanceCopy">
                    Camping, glamping, hotels, buses, parking, and extras — add them after your ticket.
                  </p>
                </header>

                {ENHANCE_CATEGORIES.map((category) => (
                  <PlanCategorySection
                    key={category.id}
                    category={category}
                    isActive
                    showTitle
                  />
                ))}
              </section>
            </div>
            {isMobile ? <AddToCartToast variant="mobile" /> : null}
          </div>
        </div>

        {isMobile && hasCart ? <CartPanel mode="mobile" /> : null}
        {!isMobile ? <CartPanel mode="desktop" /> : null}
      </div>
    </div>
  );
}
