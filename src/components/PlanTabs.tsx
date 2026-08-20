import { useEffect, useRef } from 'react';
import { PLAN_CATALOG } from '../data/planCatalog';
import './PlanTabs.css';

const TABBED_CATEGORIES = PLAN_CATALOG.filter((category) => category.id !== 'overview');
const CORE_TAB_IDS = new Set(['acceso', 'bundles']);

type PlanTabsProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

function TabButton({
  categoryId,
  title,
  isActive,
  group,
  onTabChange,
}: {
  categoryId: string;
  title: string;
  isActive: boolean;
  group: 'core' | 'addon';
  onTabChange: (tabId: string) => void;
}) {
  return (
    <li className={`tabsItem tabsItem${group === 'core' ? 'Core' : 'Addon'}`} role="none">
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        id={`plan-tab-${categoryId}`}
        className={`tabsLink ${isActive ? 'tabsLinkActive' : ''}`}
        onClick={() => onTabChange(categoryId)}
      >
        {title}
      </button>
    </li>
  );
}

export function PlanTabs({ activeTab, onTabChange }: PlanTabsProps) {
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabsBarInnerRef = useRef<HTMLDivElement>(null);
  const coreTabs = TABBED_CATEGORIES.filter((category) => CORE_TAB_IDS.has(category.id));
  const addonTabs = TABBED_CATEGORIES.filter((category) => !CORE_TAB_IDS.has(category.id));

  useEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;

    const update = () => {
      const canScroll = el.scrollWidth > el.clientWidth + 1;
      el.dataset.scrollable = canScroll ? 'true' : 'false';
      const syncDataset = (node: HTMLElement | null, start: string, end: string) => {
        if (!node) return;
        node.dataset.scrollable = canScroll ? 'true' : 'false';
        node.dataset.atStart = start;
        node.dataset.atEnd = end;
      };

      if (!canScroll) {
        syncDataset(el, 'true', 'true');
        syncDataset(tabsBarInnerRef.current, 'true', 'true');
        return;
      }
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      const start = atStart ? 'true' : 'false';
      const end = atEnd ? 'true' : 'false';
      syncDataset(el, start, end);
      syncDataset(tabsBarInnerRef.current, start, end);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const tabButton = document.getElementById(`plan-tab-${activeTab}`);
    const scrollContainer = tabsScrollRef.current;
    if (!tabButton || !scrollContainer) return;

    if (scrollContainer.scrollWidth <= scrollContainer.clientWidth + 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tabButton.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeTab]);

  return (
    <div className="stickyTabsBar">
      <nav className="tabsNav" aria-label="Plan categories">
        <div className="tabsBarInner" ref={tabsBarInnerRef}>
          <div className="tabsScroll" ref={tabsScrollRef}>
            <ul className="tabsList" role="tablist">
              {coreTabs.map((category) => (
                <TabButton
                  key={category.id}
                  categoryId={category.id}
                  title={category.title}
                  isActive={activeTab === category.id}
                  group="core"
                  onTabChange={onTabChange}
                />
              ))}
              <li className="tabsGroupDivider" role="separator" aria-label="Add-ons">
                |
              </li>
              {addonTabs.map((category) => (
                <TabButton
                  key={category.id}
                  categoryId={category.id}
                  title={category.title}
                  isActive={activeTab === category.id}
                  group="addon"
                  onTabChange={onTabChange}
                />
              ))}
            </ul>
          </div>
          <div className="tabsScrollCue" aria-hidden="true">
            <span className="tabsScrollCueIcon">›</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
