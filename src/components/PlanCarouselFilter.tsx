import { ALL_CAROUSELS, type PlanCarouselOption } from '../data/planCatalog';
import './PlanCategorySection.css';

type PlanCarouselFilterProps = {
  value: string;
  options: PlanCarouselOption[];
  onChange: (id: string) => void;
};

export function PlanCarouselFilter({ value, options, onChange }: PlanCarouselFilterProps) {
  if (options.length <= 1) return null;

  return (
    <div className="groupChipsWrap planCarouselFilter">
      <label className="groupFilterLabel">
        <span className="groupFilterCaption">Filter</span>
        <select
          className="groupFilterSelect"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value={ALL_CAROUSELS}>All</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
