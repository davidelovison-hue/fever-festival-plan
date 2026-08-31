import { useState, type ReactNode } from 'react';
import type { PlanCategory } from '../data/planCatalog';
import { EntityCard } from './EntityCard';
import { GroupCarousel } from './GroupCarousel';
import { OverviewSection } from './OverviewSection';
import './PlanCategorySection.css';

const ALL_GROUPS = '__all__';

type PlanCategorySectionProps = {
  category: PlanCategory;
  isActive?: boolean;
  showTitle?: boolean;
  footer?: ReactNode;
};

export function PlanCategorySection({
  category,
  isActive = true,
  showTitle = false,
  footer,
}: PlanCategorySectionProps) {
  const groups = category.groups;
  const equalRow = category.cardLayout === 'equalRow';
  const hasSingleGroupEntityFilters =
    !equalRow && groups.length === 1 && (groups[0]?.entities.length ?? 0) > 1;
  const [activeGroupId, setActiveGroupId] = useState<string>(
    groups.length > 1 ? ALL_GROUPS : groups[0]?.id ?? '',
  );
  const [activeEntityId, setActiveEntityId] = useState<string>(ALL_GROUPS);

  const sectionClassName = isActive ? 'categorySection' : 'categorySection categorySectionHidden';

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

  const showGroupFilter = groups.length > 1 || hasSingleGroupEntityFilters;
  const activeGroup =
    activeGroupId === ALL_GROUPS ? null : groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const filterValue = hasSingleGroupEntityFilters ? activeEntityId : activeGroupId;
  const filterOptions = hasSingleGroupEntityFilters
    ? [
        { id: ALL_GROUPS, label: 'All' },
        ...groups[0].entities.map((entity) => ({ id: entity.id, label: entity.name })),
      ]
    : [
        { id: ALL_GROUPS, label: 'All' },
        ...groups.map((group) => ({ id: group.id, label: group.title })),
      ];

  return (
    <section
      id={category.id}
      className={sectionClassName}
      aria-labelledby={showTitle ? `${category.id}-heading` : undefined}
      aria-label={showTitle ? undefined : category.title}
      aria-hidden={!isActive}
      hidden={!isActive}
    >
      {showTitle ? (
        <h3 className="categorySectionTitle" id={`${category.id}-heading`}>
          {category.title}
        </h3>
      ) : null}
      {showGroupFilter ? (
        <div className="groupChipsWrap">
          <label className="groupFilterLabel">
            <span className="sr-only">{category.title} filters</span>
            <select
              className="groupFilterSelect"
              value={filterValue}
              aria-label={`${category.title} filters`}
              onChange={(event) => {
                const next = event.target.value;
                if (hasSingleGroupEntityFilters) setActiveEntityId(next);
                else setActiveGroupId(next);
              }}
            >
              {filterOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      {hasSingleGroupEntityFilters ? (
        <div className="groupBlock">
          <GroupCarousel
            mobileGroupLayout="filtered"
            layout={equalRow ? 'equalRow' : 'default'}
            itemCount={
              activeEntityId === ALL_GROUPS ? groups[0].entities.length : 1
            }
            ariaLabel={groups[0].title}
          >
            {(activeEntityId === ALL_GROUPS
              ? groups[0].entities
              : groups[0].entities.filter((entity) => entity.id === activeEntityId)
            ).map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </GroupCarousel>
        </div>
      ) : activeGroupId === ALL_GROUPS && showGroupFilter ? (
        <div className="groupStackAll">
          {groups.map((group) =>
            group.entities.length === 0 ? null : (
              <div key={group.id} className="groupBlock">
                <h3 className="groupCarouselTitle">{group.title}</h3>
                <GroupCarousel
                  mobileGroupLayout="all"
                  layout={equalRow ? 'equalRow' : 'default'}
                  itemCount={group.entities.length}
                  ariaLabel={group.title}
                >
                  {group.entities.map((entity) => (
                    <EntityCard key={entity.id} entity={entity} />
                  ))}
                </GroupCarousel>
              </div>
            ),
          )}
        </div>
      ) : activeGroup ? (
        <div className="groupBlock">
          <h3 className="groupCarouselTitle">{activeGroup.title}</h3>
          <GroupCarousel
            mobileGroupLayout="filtered"
            layout={equalRow ? 'equalRow' : 'default'}
            itemCount={activeGroup.entities.length}
            ariaLabel={activeGroup.title}
          >
            {activeGroup.entities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </GroupCarousel>
        </div>
      ) : null}
      {footer}
    </section>
  );
}
