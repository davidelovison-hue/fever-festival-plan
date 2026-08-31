import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AddToCartToast } from '../components/AddToCartToast';
import { CartPanel } from '../components/CartPanel';
import { FestivalGallery } from '../components/FestivalGallery';
import { FestivalNavbar } from '../components/FestivalNavbar';
import { OverviewCollapsible } from '../components/OverviewCollapsible';
import { ForcedPlanProgress } from '../components/ForcedPlanProgress';
import { PlanCarouselFilter } from '../components/PlanCarouselFilter';
import { PlanCategorySection } from '../components/PlanCategorySection';
import { PlanCrossSellStrip } from '../components/PlanCrossSellStrip';
import { PlanStepper } from '../components/PlanStepper';
import { useCart } from '../lib/cartContext';
import { isForcedStepperPath, rememberPlanOrigin } from '../lib/routes';
import { scrollPageToTop } from '../lib/scrollPageToTop';
import { useIsMobile } from '../lib/useIsMobile';
import {
  ALL_CAROUSELS,
  PLAN_STEPS,
  getCarouselsForCategories,
  getCategoriesForStep,
  getPlanStep,
  getPlanStepIndex,
  getStepIdFromHash,
  type PlanStepId,
} from '../data/planCatalog';
import './PlanPage.css';

const LAST_STEP_INDEX = PLAN_STEPS.length - 1;

function getStepFromHash(): PlanStepId {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === 'overview') return 'pass';
  return getStepIdFromHash(hash);
}

function shouldOpenOverviewFromHash() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === 'overview';
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

function getScrollTargetEl(stepId: string) {
  const filter = document.querySelector<HTMLElement>('.planCarouselFilter');
  if (filter) return filter;
  const categories = getCategoriesForStep(stepId);
  const firstId = categories[0]?.id;
  const section = firstId ? document.getElementById(firstId) : null;
  if (!section) return document.getElementById(stepId);
  const firstTitle = section.querySelector<HTMLElement>('.categorySectionTitle, .groupCarouselTitle');
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

function scheduleActiveTabScroll(stepId: string) {
  let cancelled = false;
  let rafId = 0;

  const runOnce = () => {
    if (!isTabsBarStickyNow()) return;

    const targetEl = getScrollTargetEl(stepId);
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

function getPlanTabsScrollTop() {
  const nav = document.querySelector<HTMLElement>('.planStickyNav');
  const tabs = document.querySelector<HTMLElement>('.planTabsSlot');
  const anchor = document.querySelector<HTMLElement>('.planTabsScrollAnchor');
  const target = tabs ?? anchor;
  if (!target) return null;

  const navH = nav?.getBoundingClientRect().height ?? 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - navH);
}

function getTicketSectionScrollTop() {
  const fromTabs = getPlanTabsScrollTop();
  if (fromTabs != null) return fromTabs;

  const section = document.getElementById('acceso');
  if (!section) return null;
  const nav = document.querySelector<HTMLElement>('.planStickyNav');
  const navH = nav?.getBoundingClientRect().height ?? 0;
  return Math.max(0, section.getBoundingClientRect().top + window.scrollY - navH);
}

function focusPlanStep(stepId: string) {
  const stepButton = document.getElementById(`plan-step-${stepId}`);
  stepButton?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
  stepButton?.focus({ preventScroll: true });
}

function scheduleScrollToPlanStep(stepId: string) {
  let cancelled = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const run = () => {
    if (cancelled) return;
    const top = getPlanTabsScrollTop();
    if (top != null) {
      window.scrollTo({ top, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    focusPlanStep(stepId);
  };

  const rafId = requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
  const timeoutId = window.setTimeout(run, 120);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    window.clearTimeout(timeoutId);
  };
}

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

export function PlanPage({ guided = false }: { guided?: boolean }) {
  const location = useLocation();
  const { items } = useCart();
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<PlanStepId>(getStepFromHash);
  const [isOverviewOpen, setIsOverviewOpen] = useState(shouldOpenOverviewFromHash);
  const [activeCarouselId, setActiveCarouselId] = useState(ALL_CAROUSELS);
  const hasInitialTabScrollRef = useRef(false);
  const hasCart = items.length > 0;
  const stepIndex = getPlanStepIndex(activeStep);
  const stepCategories = getCategoriesForStep(activeStep);
  const stepCarousels = getCarouselsForCategories(stepCategories);
  const isLastStep = stepIndex >= LAST_STEP_INDEX;
  const showCategoryTitles = stepCategories.length > 1;

  useEffect(() => {
    rememberPlanOrigin(location.pathname);
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (location.pathname !== '/' && !isForcedStepperPath(location.pathname)) return;
    const hash = location.hash.replace(/^#/, '');
    if (hash) return;
    setIsOverviewOpen(false);
    return scrollPageToTop();
  }, [location.pathname, location.hash, location.key]);

  const goToStep = useCallback((stepId: PlanStepId, scrollToBar = false) => {
    const targetIndex = getPlanStepIndex(stepId);
    if (guided && targetIndex > stepIndex + 1) return;
    setIsOverviewOpen(false);
    setActiveStep(stepId);
    const nextHash = `#${stepId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    if (scrollToBar) scheduleScrollToPlanStep(stepId);
  }, [guided, stepIndex]);

  const handleStepChange = useCallback(
    (stepId: PlanStepId) => {
      if (stepId === activeStep) return;
      goToStep(stepId);
    },
    [activeStep, goToStep],
  );

  useEffect(() => {
    setActiveCarouselId(ALL_CAROUSELS);
  }, [activeStep]);

  const handleGoToTickets = useCallback(() => {
    setIsOverviewOpen(false);
    if (activeStep !== 'pass') {
      setActiveStep('pass');
      window.history.pushState(null, '', '#pass');
    } else {
      window.history.replaceState(null, '', '#pass');
    }
    scheduleScrollToTicketSection();
  }, [activeStep]);

  const handleOverviewToggle = useCallback(() => {
    setIsOverviewOpen((open) => !open);
  }, []);

  const goToNextStep = useCallback(() => {
    const next = PLAN_STEPS[stepIndex + 1];
    if (!next) return false;
    goToStep(next.id, true);
    return true;
  }, [goToStep, stepIndex]);

  const goToPrevStep = useCallback(() => {
    const prev = PLAN_STEPS[stepIndex - 1];
    if (!prev) return;
    goToStep(prev.id, true);
  }, [goToStep, stepIndex]);

  const handleCartContinue = useCallback(() => {
    if (isLastStep) return false;
    return goToNextStep();
  }, [goToNextStep, isLastStep]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash === 'overview') {
        setIsOverviewOpen(true);
        return;
      }
      const next = getStepFromHash();
      if (guided) {
        const nextIndex = getPlanStepIndex(next);
        if (nextIndex > stepIndex + 1) return;
      }
      setActiveStep(next);
    };

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, [guided, stepIndex]);

  useEffect(() => {
    if (!isOverviewOpen) return;
    return scheduleOverviewScroll();
  }, [isOverviewOpen]);

  useEffect(() => {
    if (!hasInitialTabScrollRef.current) {
      hasInitialTabScrollRef.current = true;
      const hash = window.location.hash.replace(/^#/, '');
      if ((activeStep === 'pass' && !hash) || hash === 'overview') {
        return;
      }
    }

    return scheduleActiveTabScroll(activeStep);
  }, [activeStep]);

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

          {guided ? (
            <p className="planIntroHandoff">
              Ready to book? Start with an entry pass, then add stays, bus, and extras one step at a
              time.
            </p>
          ) : null}
        </div>

        <div className="planTabsScrollAnchor" aria-hidden="true" />
        <div className={`planTabsSlot${guided ? ' planTabsSlot--forced' : ''}`}>
          {guided ? (
            <ForcedPlanProgress activeStep={activeStep} />
          ) : (
            <PlanStepper activeStep={activeStep} onStepChange={handleStepChange} />
          )}
        </div>

        <div className="planMainShell">
          <div className="planMainColumn">
            <div className="planContentColumn">
              <PlanCarouselFilter
                value={activeCarouselId}
                options={stepCarousels}
                onChange={setActiveCarouselId}
              />
              {stepCategories.map((category) => (
                <PlanCategorySection
                  key={category.id}
                  category={category}
                  isActive
                  visibleGroupId={activeCarouselId}
                  showTitle={
                    guided
                      ? showCategoryTitles && category.title !== getPlanStep(activeStep)?.title
                      : showCategoryTitles
                  }
                  footer={
                    !guided && category.id === 'acceso' ? (
                      <PlanCrossSellStrip onSelectTab={(id) => goToStep(getStepIdFromHash(id), true)} />
                    ) : null
                  }
                />
              ))}

              <div className="planStepActions">
                {stepIndex > 0 ? (
                  <button type="button" className="planStepBack" onClick={goToPrevStep}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {!isLastStep ? (
                  <button type="button" className="planStepContinue" onClick={goToNextStep}>
                    {guided && PLAN_STEPS[stepIndex + 1]
                      ? `Continue to ${PLAN_STEPS[stepIndex + 1].title}`
                      : 'Continue'}
                  </button>
                ) : null}
              </div>
            </div>
            {isMobile ? <AddToCartToast variant="mobile" /> : null}
          </div>
        </div>

        {isMobile && hasCart ? (
          <CartPanel
            mode="mobile"
            continueInsteadOfCheckout={!isLastStep}
            onContinue={handleCartContinue}
            onBack={stepIndex > 0 ? goToPrevStep : undefined}
          />
        ) : null}
        {!isMobile ? (
          <CartPanel
            mode="desktop"
            continueInsteadOfCheckout={!isLastStep}
            onContinue={handleCartContinue}
            onBack={stepIndex > 0 ? goToPrevStep : undefined}
          />
        ) : null}
      </div>
    </div>
  );
}
