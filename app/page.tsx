import Link from "next/link";
import { services, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">{site.tagline}</span>
            <h1>Beweglich, schmerzfrei und voller Energie durchs Leben</h1>
            <p className="lead">
              In der Praxis {site.name} verbinden wir moderne Therapiemethoden mit
              persönlicher Betreuung. Gemeinsam bringen wir Sie zurück in Bewegung –
              individuell, einfühlsam und wirksam.
            </p>
            <div className="hero__actions">
              <Link href="/kontakt" className="btn btn--primary">
                Termin vereinbaren
              </Link>
              <Link href="/leistungen" className="btn btn--ghost">
                Unsere Leistungen
              </Link>
            </div>
          </div>

          <div className="hero__card">
            <h3>Öffnungszeiten</h3>
            <ul className="hours-list">
              {site.hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.25rem" }}>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                📞 {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <div className="stat__num">15+</div>
              <div className="stat__label">Jahre Erfahrung</div>
            </div>
            <div className="stat">
              <div className="stat__num">6</div>
              <div className="stat__label">Therapiebereiche</div>
            </div>
            <div className="stat">
              <div className="stat__num">4.9★</div>
              <div className="stat__label">Patientenbewertung</div>
            </div>
            <div className="stat">
              <div className="stat__num">100%</div>
              <div className="stat__label">Individuelle Betreuung</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__head center">
            <span className="eyebrow">Unsere Leistungen</span>
            <h2>Therapie, die zu Ihnen passt</h2>
            <p className="lead">
              Von manueller Therapie bis Sportphysiotherapie – wir bieten das
              passende Behandlungskonzept für Ihre Beschwerden.
            </p>
          </div>
          <div className="grid grid--3">
            {services.slice(0, 6).map((s) => (
              <article className="card" key={s.slug}>
                <div className="card__icon" aria-hidden>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
              </article>
            ))}
          </div>
          <div className="center" style={{ marginTop: "2.5rem" }}>
            <Link href="/leistungen" className="btn btn--primary">
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <div className="section__head center">
            <span className="eyebrow">Warum {site.name}</span>
            <h2>Ihre Gesundheit in besten Händen</h2>
          </div>
          <div className="grid grid--3">
            <article className="card">
              <div className="card__icon" aria-hidden>🎯</div>
              <h3>Individuelle Behandlung</h3>
              <p>
                Jeder Therapieplan wird genau auf Ihre Beschwerden, Ziele und Ihren
                Alltag abgestimmt.
              </p>
            </article>
            <article className="card">
              <div className="card__icon" aria-hidden>🎓</div>
              <h3>Erfahrenes Team</h3>
              <p>
                Zertifizierte Physiotherapeutinnen und Therapeuten mit langjähriger
                Praxiserfahrung.
              </p>
            </article>
            <article className="card">
              <div className="card__icon" aria-hidden>🕒</div>
              <h3>Flexible Termine</h3>
              <p>
                Kurze Wartezeiten und flexible Terminvergabe – auch am frühen Morgen
                und Abend.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Bereit für den ersten Schritt?</h2>
            <p className="lead" style={{ margin: "0 auto 1.5rem", color: "rgba(255,255,255,0.85)" }}>
              Vereinbaren Sie jetzt Ihren Termin und starten Sie in ein
              beschwerdefreieres Leben.
            </p>
            <Link href="/kontakt" className="btn btn--primary">
              Jetzt Termin buchen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
