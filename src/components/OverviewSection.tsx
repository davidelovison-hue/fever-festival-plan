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
          Bahidorá is a boutique music festival on the rivers of Las Estacas, Morelos — three days of
          electronic, live and tropical sounds in an open-air nature park. Swim by day, dance at
          Sonorama, El Cubo and La Estación by night.{' '}
          <strong className="introBold">Get your tickets now for the 2027 edition!</strong>
        </p>

        <section className="block" aria-labelledby="overview-general">
          <h2 id="overview-general" className="heading">
            General Info
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
            Description
          </h2>
          <p className="bodyText">
            Browse Entry pass, Bundles, Camping, Glamping & Hotel, Bus & Parking, and Extra in
            the tabs above. Tickets are personalized before the event. Payment issues:{' '}
            <a href="mailto:boletaje@volveraflotar.com" className="link">
              boletaje@volveraflotar.com
            </a>
            . By continuing, you agree to our{' '}
            <a href="https://feverup.com" className="link" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="block" aria-labelledby="overview-help">
          <h2 id="overview-help" className="headingWithIcon">
            <HelpIcon />
            Need help?
          </h2>
          <p className="bodyText">
            Visit the official site at{' '}
            <a href="https://bahidora.com/" className="link" target="_blank" rel="noopener noreferrer">
              bahidora.com
            </a>{' '}
            or contact support via your client area.
          </p>
        </section>

        <section className="block" aria-labelledby="overview-venue">
          <h2 id="overview-venue" className="headingWithIcon">
            <VenueIcon />
            About the venue
          </h2>
          <div className="venueGrid venueGrid--textOnly">
            <div className="venueText">
              <h3 className="subheading">Parque Las Estacas</h3>
              <p className="bodyText">
                A natural park of rivers, springs and jungle in Tlaltizapán, Morelos — about 90 minutes
                from Mexico City. Stages sit among swimming holes, camping and glamping.
              </p>
              <a
                href="https://bahidora.com/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
        </section>

        <section className="block" aria-labelledby="overview-getting">
          <h2 id="overview-getting" className="headingWithIcon">
            <LocationIcon />
            Getting there
          </h2>
          <div className="gettingGrid">
            <div className="gettingAddress">
              <h3 className="subheading">Las Estacas</h3>
              <p className="addressLines">
                {`Parque Las Estacas\nTlaltizapán, Morelos\nMexico`}
              </p>
            </div>
            <div className="mapWrap">
              <iframe
                title="Venue location map"
                className="mapIframe"
                src="https://maps.google.com/maps?q=Parque+Las+Estacas+Tlaltizapan+Morelos&z=13&output=embed&hl=en"
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
