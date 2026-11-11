import { OVERVIEW_INFO } from '../data/festivalConfig';
import './OverviewSection.css';

function HelpIcon() {
  return (
    <svg className="headingIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 14v3a2 2 0 0 0 2 2h1M20 14v3a2 2 0 0 1-2 2h-1M4 14a8 8 0 0 1 16 0M9 18v2M15 18v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8 14h.01M16 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VenueIcon() {
  return (
    <svg className="headingIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 11h.01M12 11h.01M15 11h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="headingIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

export function OverviewSection() {
  return (
    <div className="overview">
      <div className="narrow">
        <p className="intro">
          Reserva una mesa en la sala principal y vive la noche con acceso preferente, servicio en
          mesa y zonas exclusivas. Elige tu categoría en el mapa — pista, palco, VIP, DJ booth o
          backstage — y completa el pago en el mismo funnel.{' '}
          <strong className="introBold">Prototipo local: no se procesan pagos reales.</strong>
        </p>

        <section className="block" aria-labelledby="overview-general">
          <h2 id="overview-general" className="heading">
            Información general
          </h2>
          <ul className="infoList">
            {OVERVIEW_INFO.map((item) => (
              <li key={item.label} className="infoListItem">
                <span className="infoIcon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>
                  <strong className="infoLabel">{item.label}:</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="narrow">
        <section className="block" aria-labelledby="overview-description">
          <h2 id="overview-description" className="heading">
            Descripción
          </h2>
          <p className="bodyText">
            Usa la pestaña Mesas para explorar el mapa y las cards por zona. Añade packs de botellas,
            parking u extras si lo necesitas. El carrito y el checkout reutilizan el flujo Gaerten
            del prototipo.
          </p>
        </section>

        <section className="block" aria-labelledby="overview-help">
          <h2 id="overview-help" className="headingWithIcon">
            <HelpIcon />
            ¿Necesitas ayuda?
          </h2>
          <p className="bodyText">
            Este es un prototipo de demostración. Para dudas de producto, contacta al equipo Fever
            / Davide.
          </p>
        </section>

        <section className="block" aria-labelledby="overview-venue">
          <h2 id="overview-venue" className="headingWithIcon">
            <VenueIcon />
            Sobre el venue
          </h2>
          <div className="venueGrid venueGrid--textOnly">
            <div className="venueText">
              <h3 className="subheading">Sala Principal</h3>
              <p className="bodyText">
                Club nocturno con pista, palcos elevados, zona VIP Cristal/Cielo, DJ booth y
                backstage. El mapa isométrico muestra las zonas reservables.
              </p>
            </div>
          </div>
        </section>

        <section className="block" aria-labelledby="overview-getting">
          <h2 id="overview-getting" className="headingWithIcon">
            <LocationIcon />
            Cómo llegar
          </h2>
          <div className="gettingGrid">
            <div className="gettingAddress">
              <h3 className="subheading">Madrid</h3>
              <p className="addressLines">{`Sala Principal\nMadrid\nEspaña`}</p>
            </div>
            <div className="mapWrap">
              <iframe
                title="Mapa del venue"
                className="mapIframe"
                src="https://maps.google.com/maps?q=Madrid+Spain&z=12&output=embed&hl=es"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
