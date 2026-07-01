import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Unsere physiotherapeutischen Leistungen: Manuelle Therapie, Krankengymnastik, Massage, Lymphdrainage, Sportphysiotherapie und Wärmetherapie.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Unsere Leistungen</span>
          <h1>Behandlungen &amp; Therapien</h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Ein umfassendes Angebot für Ihre Gesundheit – abgestimmt auf Ihre
            individuellen Bedürfnisse.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {services.map((s) => (
              <article className="card" key={s.slug} id={s.slug}>
                <div className="card__icon" aria-hidden>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--teal">
        <div className="container center">
          <h2>Nicht sicher, welche Behandlung passt?</h2>
          <p className="lead" style={{ margin: "0 auto 1.5rem" }}>
            In einem persönlichen Erstgespräch finden wir gemeinsam die richtige
            Therapie für Sie.
          </p>
          <Link href="/kontakt" className="btn btn--primary">
            Beratungstermin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
