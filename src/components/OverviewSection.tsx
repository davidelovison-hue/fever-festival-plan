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
          Awakenings Festival is one of Europe&apos;s leading electronic music festivals — three days of
          world-class techno and house in an open-air setting near Amsterdam. Expect iconic stages,
          immersive production, and a global crowd of dance music fans.{' '}
          <strong className="introBold">Get your tickets now for the 2026 edition!</strong>
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
            <li className="infoListItem">
              <span className="infoIcon" aria-hidden="true">
                👤
              </span>
              <span>
                <strong className="infoLabel">Minors:</strong> Under 18 must be accompanied by an adult
                for camping and festival access where required by local regulations.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <div className="narrow">
        <section className="block" aria-labelledby="overview-description">
          <h2 id="overview-description" className="heading">
            Description
          </h2>
          <p className="bodyText">
            Awakenings transforms Houtrak into a multi-stage electronic music destination with dedicated
            areas and spectacular productions. Browse tickets, camping, parking, and merch in the tabs above.
            Tickets are personalized before the event. By continuing, you agree to our{' '}
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
            Visit the official FAQ at{' '}
            <a href="https://www.awakenings.com" className="link" target="_blank" rel="noopener noreferrer">
              awakenings.com
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
              <h3 className="subheading">Houtrak — Spaarnwoude</h3>
              <p className="bodyText">
                The festival takes place at Houtrak in the Spaarnwoude recreation area — open parkland near
                Amsterdam with excellent road and public transport connections from the city.
              </p>
              <a
                href="https://www.awakenings.com"
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
              <h3 className="subheading">Houtrak</h3>
              <p className="addressLines">
                {`Spaarnwoude recreation area\nNear Amsterdam\nNetherlands`}
              </p>
            </div>
            <div className="mapWrap">
              <iframe
                title="Venue location map"
                className="mapIframe"
                src="https://maps.google.com/maps?q=Houtrak+Spaarnwoude+Netherlands&z=12&output=embed&hl=en"
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
