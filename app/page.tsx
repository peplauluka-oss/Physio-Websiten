import Link from "next/link";
import Photo from "@/components/Photo";
import Stars from "@/components/Stars";
import Reveal from "@/components/Reveal";
import SwipeGallery from "@/components/SwipeGallery";
import DnaHero from "@/components/DnaHero";
import FloralDecor from "@/components/FloralDecor";
import { FadeUp, Parallax } from "@/components/Motion";
import { services, site, testimonials, images, gallery } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Cinematic 3D Hero */}
      <section className="hero3d">
        <DnaHero />
        <FloralDecor />
        <span className="orb orb--rose" />
        <span className="orb orb--gold" />
        <div className="container hero3d__inner">
          <FadeUp className="hero3d__badge">
            <span className="badge">
              <Stars rating={site.rating} count={site.reviewCount} />
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="hero3d__title">
              In Bewegung.<br />
              <span className="accent">Ganz bei sich.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="lead hero3d__lead">
              Die Frauen-Praxis von {site.owner} in {site.address.district} –
              wirksame Physiotherapie in einer warmen, wohltuenden Atmosphäre.
              Spür den Unterschied vom ersten Atemzug an.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="hero__actions" style={{ justifyContent: "center" }}>
              <Link href="/kontakt" className="btn btn--primary">
                Termin vereinbaren
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn--ghost">
                📞 {site.phone}
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.32}>
            <ul className="trust-row trust-row--center">
              <li>🌸 Reines Frauen-Team</li>
              <li>🤍 Zeit &amp; Zuwendung</li>
              <li>♿ Barrierefrei</li>
            </ul>
          </FadeUp>
        </div>
        <div className="scroll-hint" aria-hidden>
          <span>Scrollen</span>
          <span className="scroll-hint__line" />
        </div>
      </section>

      {/* Info bar */}
      <div className="container">
        <div className="infobar">
          <div className="infobar__grid">
            <div className="infobar__item">
              <span aria-hidden>📍</span>
              <div>
                <strong>{site.address.street}</strong>
                <span>{site.address.city}</span>
              </div>
            </div>
            <div className="infobar__item">
              <span aria-hidden>🕒</span>
              <div>
                <strong>Mo – Do 08 – 19 Uhr</strong>
                <span>Fr bis 14 Uhr</span>
              </div>
            </div>
            <div className="infobar__item">
              <span aria-hidden>📞</span>
              <div>
                <strong>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </strong>
                <span>Wir sind gern für Sie da</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impressionen – Swipe-Galerie */}
      <section className="section section--cream" style={{ paddingBottom: "1rem" }}>
        <div className="container center">
          <Reveal>
            <span className="eyebrow">Einblicke</span>
            <h2>Ein Ort zum Aufatmen</h2>
            <p className="lead" style={{ marginBottom: "2rem" }}>
              Gedämpftes Licht, warme Töne, echte Ruhe – tauchen Sie ein in die
              Atmosphäre unserer Praxis.
            </p>
          </Reveal>
        </div>
        <SwipeGallery items={gallery} />
      </section>

      {/* Leistungen */}
      <section className="section section--blush">
        <div className="container">
          <Reveal>
            <div className="section__head center">
              <span className="eyebrow">Unsere Leistungen</span>
              <h2>Behandlung, die guttut</h2>
              <p className="lead">
                Von sanfter manueller Therapie über Lymphdrainage bis zur wohligen
                Hot-Stone-Massage – wir finden den Weg, der sich für Sie richtig anfühlt.
              </p>
            </div>
          </Reveal>
          <div className="grid grid--3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <article className="card">
                  <div className="card__icon" aria-hidden>
                    {s.icon}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: "2.75rem" }}>
            <Link href="/leistungen" className="btn btn--primary">
              Alle Leistungen entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Value / split */}
      <section className="section">
        <div className="container split split--wide-media">
          <div className="split__media">
            <Parallax amount={50}>
              <Photo
                src={images.treatment}
                alt="Sanfte manuelle Therapie in der Praxis Simone Rammelt"
                icon="🤲"
                ratio="5 / 4"
              />
            </Parallax>
          </div>
          <div className="split__body">
            <Reveal>
              <span className="eyebrow">Warum Praxis Rammelt</span>
              <h2>Zuwendung, die man spürt</h2>
              <ul className="check-list">
                <li>
                  <strong>Wir nehmen uns Zeit.</strong> Keine Hektik, kein Fließband –
                  sondern echte Aufmerksamkeit für Sie.
                </li>
                <li>
                  <strong>Sanft &amp; wirksam.</strong> Behandlungen, die Beweglichkeit
                  und Kraft nachhaltig zurückbringen.
                </li>
                <li>
                  <strong>Ein herzliches Frauen-Team.</strong> Bianca, Tina, Dorrit,
                  Dana und Simone – mit guter Laune und viel Feingefühl.
                </li>
                <li>
                  <strong>Unkomplizierte Termine.</strong> Flexibel, kurzfristig, auf
                  Wunsch als Hausbesuch.
                </li>
              </ul>
              <Link href="/ueber-uns" className="btn btn--ghost">
                Lernen Sie uns kennen
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section section--sage">
        <div className="container">
          <Reveal>
            <div className="section__head center">
              <span className="eyebrow">So einfach geht's</span>
              <h2>In drei Schritten zu Ihrem Termin</h2>
            </div>
          </Reveal>
          <div className="grid grid--3 steps">
            {[
              { n: 1, t: "Melden Sie sich", d: "Telefonisch oder über unser Formular – ganz unkompliziert und schnell." },
              { n: 2, t: "Termin erhalten", d: "Wir finden gemeinsam einen passenden, oft kurzfristigen Termin." },
              { n: 3, t: "Aufatmen", d: "Sie starten Ihre Behandlung – sanft, professionell und wohltuend." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="step">
                  <span className="step__num">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section__head center">
              <span className="eyebrow">Herzensstimmen</span>
              <h2>Das sagen unsere Patientinnen</h2>
              <div className="center-stars">
                <Stars rating={site.rating} count={site.reviewCount} />
              </div>
            </div>
          </Reveal>
          <div className="grid grid--3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="quote-card">
                  <div className="quote-card__mark" aria-hidden>
                    &ldquo;
                  </div>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <strong>{t.author}</strong>
                    <span>{t.source}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring banner */}
      <section className="section section--cream">
        <div className="container">
          <Reveal>
            <div className="hiring-banner">
              <div className="hiring-banner__body">
                <span className="eyebrow eyebrow--light">Wir wachsen 🌱</span>
                <h2>Werde Teil unseres Teams</h2>
                <p>
                  Du bist Physiotherapeutin und suchst einen Ort, an dem Wertschätzung,
                  gute Laune und Zeit für Menschen keine Floskeln sind? Dann sollten
                  wir uns kennenlernen.
                </p>
              </div>
              <div className="hiring-banner__cta">
                <Link href="/karriere" className="btn btn--primary">
                  Zu den Vorteilen &amp; zur Bewerbung
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Schenken Sie sich einen Moment Fürsorge</h2>
              <p className="lead" style={{ margin: "0 auto 1.75rem", color: "rgba(255,255,255,0.9)" }}>
                Vereinbaren Sie jetzt Ihren Termin – wir freuen uns von Herzen auf Sie.
              </p>
              <div className="hero__actions" style={{ justifyContent: "center" }}>
                <Link href="/kontakt" className="btn btn--primary">
                  Termin buchen
                </Link>
                <a href={`tel:${site.phoneHref}`} className="btn btn--ghost btn--ghost-light">
                  📞 {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
