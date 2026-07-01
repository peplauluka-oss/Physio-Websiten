import type { Metadata } from "next";
import Link from "next/link";
import DnaJourney from "@/components/DnaJourney";
import { FadeUp } from "@/components/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deine Reise · Das Erlebnis",
  description:
    "Eine immersive Reise durch Ihre Behandlung bei Physiotherapie Simone Rammelt – vom ersten Gespräch bis zurück in die Bewegung.",
};

const stations = [
  {
    num: "01",
    side: "left",
    eyebrow: "Ankommen",
    title: "Erst zuhören, dann behandeln",
    text: "Ihre Reise beginnt mit einem Gespräch. Wir nehmen uns Zeit, verstehen Ihre Beschwerden und Ihren Alltag – und finden gemeinsam den Weg, der sich für Sie richtig anfühlt.",
  },
  {
    num: "02",
    side: "right",
    eyebrow: "Behandeln",
    title: "Sanfte, wirksame Techniken",
    text: "Manuelle Therapie, Marnitz, Lymphdrainage, Hot-Stone-Massage – jede Technik gezielt eingesetzt. Schonend, aufmerksam und immer auf Sie abgestimmt.",
  },
  {
    num: "03",
    side: "left",
    eyebrow: "Bewegen",
    title: "Zurück in die Bewegung",
    text: "Mit Krankengymnastik und aktiver Rehabilitation bringen wir Kraft, Beweglichkeit und Vertrauen in den eigenen Körper zurück – Schritt für Schritt, nachhaltig.",
  },
  {
    num: "04",
    side: "right",
    eyebrow: "Begleiten",
    title: "Ein Team, das Sie trägt",
    text: "Simone, Bianca, Tina, Dorrit und Dana – ein herzliches Frauen-Team, das sich um Sie kümmert. „Gute Laune, von der ich mich anstecken lasse“, sagen unsere Patientinnen.",
  },
];

export default function JourneyPage() {
  return (
    <div className="journey">
      <DnaJourney />

      {/* Intro */}
      <section className="station station--center journey-hero">
        <div className="container">
          <FadeUp className="station__card station__card--hero">
            <span className="eyebrow">Deine Reise · Praxis Rammelt</span>
            <h1>
              Scrolle durch <span className="accent">deine Genesung</span>
            </h1>
            <p className="lead" style={{ margin: "0 auto" }}>
              Folge dem Verlauf – von den ersten Fragen bis zurück in ein
              beschwerdefreieres Leben. Jede Windung erzählt einen Teil deiner
              Behandlung.
            </p>
            <div className="scroll-hint scroll-hint--static" aria-hidden>
              <span>Scrollen</span>
              <span className="scroll-hint__line" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stationen */}
      {stations.map((s) => (
        <section key={s.num} className={`station station--${s.side}`}>
          <div className="container">
            <FadeUp className="station__card">
              <span className="station__num" aria-hidden>
                {s.num}
              </span>
              <span className="eyebrow">{s.eyebrow}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* Finale */}
      <section className="station station--center journey-final">
        <div className="container">
          <FadeUp className="station__card station__card--hero">
            <span className="eyebrow">Bereit?</span>
            <h2>Beginne deine Reise</h2>
            <p className="lead" style={{ margin: "0 auto 1.75rem" }}>
              Wir freuen uns von Herzen auf dich. Vereinbare jetzt deinen Termin.
            </p>
            <div className="hero__actions" style={{ justifyContent: "center" }}>
              <Link href="/kontakt" className="btn btn--primary">
                Termin vereinbaren
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn--ghost">
                📞 {site.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
