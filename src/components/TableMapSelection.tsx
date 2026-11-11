import { useCallback, useEffect, useRef, useState } from 'react';
import { TABLE_INTRO, TABLE_ZONES, type TableZoneId } from '../data/tableZones';
import { TableZoneCard } from './TableZoneCard';
import { VenueMap } from './VenueMap';
import './TableMapSelection.css';

type TableMapSelectionProps = {
  isActive?: boolean;
};

export function TableMapSelection({ isActive = true }: TableMapSelectionProps) {
  const [activeZoneId, setActiveZoneId] = useState<TableZoneId | null>(null);
  const cardRefs = useRef<Partial<Record<TableZoneId, HTMLElement | null>>>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToZone = useCallback((zoneId: TableZoneId) => {
    const card = cardRefs.current[zoneId];
    const carousel = carouselRef.current;
    if (!card || !carousel) return;
    const cardLeft = card.offsetLeft;
    const target = Math.max(0, cardLeft - 12);
    carousel.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const handleSelectZone = useCallback(
    (zoneId: TableZoneId) => {
      setActiveZoneId((current) => {
        const next = current === zoneId ? null : zoneId;
        if (next) {
          requestAnimationFrame(() => scrollToZone(next));
        }
        return next;
      });
    },
    [scrollToZone],
  );

  const scrollByCard = (direction: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.max(260, el.clientWidth * 0.75) * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!isActive) return null;

  return (
    <section
      id="mesas"
      className="tableMapSelection"
      aria-label="Selección de mesas"
    >
      <p className="tableMapSelection__intro">{TABLE_INTRO}</p>

      <VenueMap activeZoneId={activeZoneId} onSelectZone={handleSelectZone} />

      <div className="tableMapSelection__cardsHeader">
        <h3 className="tableMapSelection__cardsTitle">Elige tu mesa</h3>
        {activeZoneId ? (
          <button
            type="button"
            className="tableMapSelection__clear"
            onClick={() => setActiveZoneId(null)}
          >
            Ver todas
          </button>
        ) : null}
      </div>

      <div className="tableMapSelection__carouselWrap">
        <button
          type="button"
          className="tableMapSelection__nav tableMapSelection__nav--prev"
          aria-label="Mesas anteriores"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
        >
          ‹
        </button>

        <div
          ref={carouselRef}
          className="tableMapSelection__carousel"
          role="list"
          aria-label="Categorías de mesa"
        >
          {TABLE_ZONES.map((zone) => {
            const highlighted = activeZoneId === zone.id;
            const dimmed = activeZoneId != null && !highlighted;
            return (
              <div
                key={zone.id}
                role="listitem"
                className={
                  dimmed
                    ? 'tableMapSelection__slide tableMapSelection__slide--dimmed'
                    : 'tableMapSelection__slide'
                }
              >
                <TableZoneCard
                  zone={zone}
                  highlighted={highlighted}
                  cardRef={(node) => {
                    cardRefs.current[zone.id] = node;
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="tableMapSelection__nav tableMapSelection__nav--next"
          aria-label="Mesas siguientes"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
        >
          ›
        </button>
      </div>

      <div className="tableMapSelection__dots" aria-hidden="true">
        {TABLE_ZONES.map((zone) => (
          <span
            key={zone.id}
            className={
              activeZoneId === zone.id
                ? 'tableMapSelection__dot tableMapSelection__dot--active'
                : 'tableMapSelection__dot'
            }
          />
        ))}
      </div>
    </section>
  );
}
