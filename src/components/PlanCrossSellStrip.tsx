import './PlanCrossSellStrip.css';

type PlanCrossSellStripProps = {
  onSelectTab: (tabId: string) => void;
};

const CROSS_SELL_LINKS = [
  { id: 'accommodation', label: 'Camping & stays' },
  { id: 'bus', label: 'Bus & Parking' },
  { id: 'extra', label: 'Extras' },
] as const;

export function PlanCrossSellStrip({ onSelectTab }: PlanCrossSellStripProps) {
  return (
    <nav className="planCrossSell" aria-label="Also available">
      <p className="planCrossSellLabel">Also available:</p>
      <ul className="planCrossSellList">
        {CROSS_SELL_LINKS.map((item, index) => (
          <li key={item.id} className="planCrossSellItem">
            {index > 0 ? (
              <span className="planCrossSellDot" aria-hidden="true">
                ·
              </span>
            ) : null}
            <button
              type="button"
              className="planCrossSellChip"
              onClick={() => onSelectTab(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
