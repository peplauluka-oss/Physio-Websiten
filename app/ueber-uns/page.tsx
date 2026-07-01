import type { Metadata } from "next";
import Link from "next/link";
import { team, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Lernen Sie das Team von PhysioVital kennen – erfahrene Physiotherapeutinnen und Therapeuten für Ihre Gesundheit in Berlin.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(-2)
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Über uns</span>
          <h1>Menschen, die sich um Sie kümmern</h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Seit über 15 Jahren stehen wir für einfühlsame, kompetente
            Physiotherapie mitten in Berlin.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "center" }}>
            <div>
              <span className="eyebrow">Unsere Philosophie</span>
              <h2>Der Mensch im Mittelpunkt</h2>
              <p>
                Bei {site.name} behandeln wir nicht nur Symptome, sondern den ganzen
                Menschen. Wir nehmen uns Zeit, hören zu und entwickeln ein
                Therapiekonzept, das wirklich zu Ihnen passt.
              </p>
              <p>
                Moderne Behandlungsmethoden, kontinuierliche Fortbildung und ein
                herzlicher Umgang – das ist unser Versprechen an Sie. Ihr Wohlbefinden
                und Ihre Beweglichkeit sind unser gemeinsames Ziel.
              </p>
            </div>
            <div className="hero__card">
              <h3>Das zeichnet uns aus</h3>
              <ul className="info-list">
                <li><span className="ic">✅</span> Ganzheitliche Betrachtung Ihrer Beschwerden</li>
                <li><span className="ic">✅</span> Zertifizierte Fachtherapeuten</li>
                <li><span className="ic">✅</span> Modern ausgestattete Behandlungsräume</li>
                <li><span className="ic">✅</span> Alle gesetzlichen &amp; privaten Kassen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section__head center">
            <span className="eyebrow">Unser Team</span>
            <h2>Ihre Therapeutinnen &amp; Therapeuten</h2>
          </div>
          <div className="grid grid--3">
            {team.map((member) => (
              <article className="card team-card" key={member.name}>
                <div className="avatar" aria-hidden>
                  {initials(member.name)}
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Lernen Sie uns persönlich kennen</h2>
            <p className="lead" style={{ margin: "0 auto 1.5rem", color: "rgba(255,255,255,0.85)" }}>
              Wir freuen uns darauf, Sie in unserer Praxis begrüßen zu dürfen.
            </p>
            <Link href="/kontakt" className="btn btn--primary">
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
