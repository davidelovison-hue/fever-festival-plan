import { useCart } from '../lib/cartContext';
import { formatPrice } from '../lib/formatPrice';
import type { TableZone } from '../data/tableZones';
import './TableZoneCard.css';

type TableZoneCardProps = {
  zone: TableZone;
  highlighted?: boolean;
  cardRef?: (node: HTMLElement | null) => void;
};

function listingClass(tag?: string) {
  if (tag === 'SELLING FAST') return 'tableZoneCard__tag tableZoneCard__tag--fast';
  if (tag === 'LIMITED') return 'tableZoneCard__tag tableZoneCard__tag--limited';
  if (tag === 'SOLD OUT') return 'tableZoneCard__tag tableZoneCard__tag--sold';
  return 'tableZoneCard__tag';
}

export function TableZoneCard({ zone, highlighted = false, cardRef }: TableZoneCardProps) {
  const { getQuantity, setQuantity } = useCart();
  const quantity = getQuantity(zone.entity.id, {});
  const inCart = quantity > 0;
  const includes = zone.entity.includedItems ?? zone.entity.cardPreviewBullets ?? [];

  const handleSelect = () => {
    if (inCart) {
      setQuantity(zone.entity, 0, {});
      return;
    }
    setQuantity(zone.entity, 1, {});
  };

  return (
    <article
      ref={cardRef}
      id={`table-zone-${zone.id}`}
      className={
        highlighted
          ? 'tableZoneCard tableZoneCard--highlighted'
          : inCart
            ? 'tableZoneCard tableZoneCard--inCart'
            : 'tableZoneCard'
      }
      aria-labelledby={`table-zone-title-${zone.id}`}
    >
      <div className="tableZoneCard__media">
        <img
          className="tableZoneCard__image"
          src={zone.image}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = `${import.meta.env.BASE_URL}entity-ticket.jpg`;
          }}
        />
        {zone.entity.listingTag ? (
          <span className={listingClass(zone.entity.listingTag)}>{zone.entity.listingTag}</span>
        ) : null}
      </div>

      <div className="tableZoneCard__body">
        <div className="tableZoneCard__copy">
          <h3 id={`table-zone-title-${zone.id}`} className="tableZoneCard__title">
            {zone.entity.name}
          </h3>
          <p className="tableZoneCard__capacity">Para {zone.capacity} personas</p>
          {zone.entity.description ? (
            <p className="tableZoneCard__description">{zone.entity.description}</p>
          ) : null}

          {includes.length > 0 ? (
            <div className="tableZoneCard__includes">
              <p className="tableZoneCard__includesLabel">Incluye</p>
              <ul className="tableZoneCard__includesList">
                {includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="tableZoneCard__footer">
          <p className="tableZoneCard__price">
            <span className="tableZoneCard__priceFrom">desde</span>{' '}
            <span className="tableZoneCard__priceAmount">{formatPrice(zone.entity.price)}</span>
          </p>
          <button
            type="button"
            className={inCart ? 'tableZoneCard__select tableZoneCard__select--active' : 'tableZoneCard__select'}
            onClick={handleSelect}
            aria-pressed={inCart}
          >
            {inCart ? 'En el carrito' : 'Seleccionar'}
          </button>
        </div>
      </div>
    </article>
  );
}
