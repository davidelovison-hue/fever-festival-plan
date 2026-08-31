import { FESTIVAL_ARTISTS } from '../data/festivalArtists';
import { FestivalArtistsCarousel } from './FestivalArtistsCarousel';
import { OverviewSection } from './OverviewSection';
import './OverviewCollapsible.css';

type OverviewCollapsibleProps = {
  isOpen: boolean;
  onToggle: () => void;
  id?: string;
};

export function OverviewCollapsible({ isOpen, onToggle, id = 'overview' }: OverviewCollapsibleProps) {
  return (
    <section
      id={id}
      className={`planOverviewCollapsible ${isOpen ? 'planOverviewCollapsibleOpen' : ''}`}
      aria-label="Overview"
    >
      <div className="planOverviewLineup">
        <FestivalArtistsCarousel artists={FESTIVAL_ARTISTS} title="Lineup" hideDay />
      </div>

      <button
        type="button"
        className="planOverviewToggle"
        aria-expanded={isOpen}
        aria-controls="plan-overview-panel"
        onClick={onToggle}
      >
        <span className="planOverviewToggleBody">
          <span className="planOverviewToggleTop">
            <span className="planOverviewToggleLabel">Overview</span>
            <span className="planOverviewToggleAction">
              {isOpen ? 'Hide' : 'Show details'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d={isOpen ? 'M6 14.5L12 8.5L18 14.5' : 'M6 9.5L12 15.5L18 9.5'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <span className="planOverviewToggleHint">Festival info, venue & more</span>
        </span>
      </button>

      <div
        id="plan-overview-panel"
        className="planOverviewPanel"
        hidden={!isOpen}
      >
        <OverviewSection />
      </div>
    </section>
  );
}
