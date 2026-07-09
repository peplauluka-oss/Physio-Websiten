import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SceneBackground from "@/components/SceneBackground";
import { services, images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leistungen – Physiotherapie, Massage & mehr",
  description:
    "Alle Behandlungsmethoden im Überblick: Manuelle Therapie, Krankengymnastik, Marnitz-Therapie, Lymphdrainage, Hot-Stone- & klassische Massage, Dorn, Brügger, Bobath, Wärme- und Elektrotherapie sowie Hausbesuche in Berlin Prenzlauer Berg.",
};

/** Strukturierte Daten (JSON-LD): jede Behandlungsmethode als eigene
 *  Therapie-Position – hilft Suchmaschinen, das Angebot zu verstehen. */
function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    telephone: site.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Berlin",
      postalCode: site.address.city.split(" ")[0],
      addressCountry: "DE",
    },
    openingHours: ["Mo-Th 08:00-19:00", "Fr 08:00-14:00"],
    availableService: services.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.title,
      description: s.short,
    })),
  };
}

export default function ServicesPage() {
  return (
    <div className="subpage">
      <SceneBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd()) }}
      />
      <section className="page-header">
        <span className="orb orb--rose" />
        <span className="orb orb--sage" />
        <div className="container">
          <span className="eyebrow">Unsere Leistungen</span>
          <h1>Sanfte Wege zu mehr Wohlbefinden</h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Ein liebevoll ausgewähltes Spektrum aus Physiotherapie, manuellen
            Techniken und wohltuenden Anwendungen – individuell auf Sie abgestimmt
            und nach ärztlicher Verordnung.
          </p>
        </div>
      </section>

      {/* Sprungmarken: direkt zur gewünschten Behandlung */}
      <nav className="service-nav" aria-label="Direkt zu einer Behandlungsmethode">
        <div className="container service-nav__inner">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="service-nav__chip">
              <Icon name={s.icon} /> {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Jede Behandlungsmethode als eigene Sektion */}
      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`section service-section ${i % 2 ? "section--blush" : "section--cream"}`}
        >
          <div className={`container split ${i % 2 ? "split--reverse" : ""}`}>
            <div className="service-section__media" aria-hidden>
              <Reveal>
                <div className="service-section__icon">
                  <Icon name={s.icon} />
                </div>
              </Reveal>
            </div>
            <div className="split__body">
              <Reveal>
                <span className="eyebrow">Behandlungsmethode</span>
                <h2>{s.title}</h2>
                <p className="service-section__short">{s.short}</p>
                <p>{s.description}</p>
                <div className="service-section__actions">
                  <Link href="/kontakt" className="btn btn--primary">
                    Termin anfragen
                  </Link>
                  <a href={`tel:${site.phoneHref}`} className="btn btn--ghost">
                    <Icon name="phone" /> {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section section--blush">
        <div className="container split">
          <div className="split__media">
            <Reveal>
              <Photo
                src={images.massage}
                alt="Wohltuende Massage in der Praxis Rammelt"
                icon="spa"
                ratio="4 / 3"
              />
            </Reveal>
          </div>
          <div className="split__body">
            <span className="eyebrow">Gut zu wissen</span>
            <h2>Für alle Kassen &amp; privat</h2>
            <ul className="check-list">
              <li>Wir behandeln nach ärztlicher Verordnung (Rezept).</li>
              <li>Gesetzliche und private Krankenkassen sowie Selbstzahler:innen.</li>
              <li>Barrierefreier Zugang zur Praxis.</li>
              <li>Hausbesuche im näheren Umkreis nach Vereinbarung.</li>
            </ul>
            <Link href="/kontakt" className="btn btn--primary">
              Termin anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--sage">
        <div className="container center">
          <h2>Nicht sicher, welche Behandlung passt?</h2>
          <p className="lead" style={{ margin: "0 auto 1.5rem" }}>
            Rufen Sie uns an – wir beraten Sie gern und finden gemeinsam die richtige
            Therapie für Sie.
          </p>
          <a href={`tel:${site.phoneHref}`} className="btn btn--primary">
            <Icon name="phone" /> {site.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
