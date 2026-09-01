import type { ReactNode } from 'react';
import { ALL_CAROUSELS, type PlanCategory, type PlanGroup } from '../data/planCatalog';
import { EntityCard } from './EntityCard';
import { GroupCarousel } from './GroupCarousel';
import { OverviewSection } from './OverviewSection';
import './PlanCategorySection.css';

type PlanCategorySectionProps = {
  category: PlanCategory;
  isActive?: boolean;
  /** Carry the category name in each carousel title instead of a heading row. */
  prefixCarouselTitles?: boolean;
  visibleGroupId?: string;
  footer?: ReactNode;
};

export function PlanCategorySection({
  category,
  isActive = true,
  prefixCarouselTitles = false,
  visibleGroupId = ALL_CAROUSELS,
  footer,
}: PlanCategorySectionProps) {
  const groups = category.groups.filter((group) => group.entities.length > 0);
  const equalRow = category.cardLayout === 'equalRow';
  const isFiltered = visibleGroupId !== ALL_CAROUSELS;
  const selectedGroup = isFiltered
    ? groups.find((group) => group.id === visibleGroupId) ?? null
    : null;
  const hideSection = isFiltered && !selectedGroup;
  const groupsToShow = selectedGroup ? [selectedGroup] : groups;
  const showCarouselTitle = prefixCarouselTitles || groups.length > 1 || Boolean(selectedGroup);
  const mobileGroupLayout = isFiltered ? 'filtered' : 'all';

  const carouselTitle = (group: PlanGroup) =>
    prefixCarouselTitles && group.title !== category.title
      ? `${category.title} - ${group.title}`
      : group.title;

  const sectionVisible = isActive && !hideSection;
  const sectionClassName = sectionVisible
    ? 'categorySection'
    : 'categorySection categorySectionHidden';

  if (category.contentMode === 'overview' || category.id === 'overview') {
    return (
      <section
        id={category.id}
        className={sectionClassName}
        aria-label={category.title}
        aria-hidden={!isActive}
        hidden={!isActive}
      >
        <OverviewSection />
      </section>
    );
  }

  if (groups.length === 0) {
    return (
      <section
        id={category.id}
        className={sectionClassName}
        aria-label={category.title}
        aria-hidden={!isActive}
        hidden={!isActive}
      />
    );
  }

  const renderGroup = (group: PlanGroup, withTitle: boolean) => (
    <div key={group.id} className="groupBlock">
      {withTitle ? <h3 className="groupCarouselTitle">{carouselTitle(group)}</h3> : null}
      <GroupCarousel
        mobileGroupLayout={mobileGroupLayout}
        layout={equalRow ? 'equalRow' : 'default'}
        itemCount={group.entities.length}
        ariaLabel={carouselTitle(group)}
      >
        {group.entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </GroupCarousel>
    </div>
  );

  return (
    <section
      id={category.id}
      className={sectionClassName}
      aria-label={category.title}
      aria-hidden={!sectionVisible}
      hidden={!sectionVisible}
    >
      {groupsToShow.length > 1 ? (
        <div className="groupStackAll">{groupsToShow.map((group) => renderGroup(group, true))}</div>
      ) : groupsToShow[0] ? (
        renderGroup(groupsToShow[0], showCarouselTitle)
      ) : null}
      {footer}
    </section>
  );
}
