import type { Metadata } from "next";
import Link from "next/link";
import SceneBackground from "@/components/SceneBackground";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum der ${site.name}, ${site.address.street}, ${site.address.city}.`,
  robots: { index: false },
};

export default function ImprintPage() {
  return (
    <div className="subpage">
      <SceneBackground />
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Impressum</h1>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container legal">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {site.name}
            <br />
            Inhaberin: {site.owner}
            <br />
            {site.address.street}
            <br />
            {site.address.city}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <br />
            Fax: {site.fax}
            <br />
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>

          <h2>Berufsbezeichnung &amp; berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung: Physiotherapeutin (verliehen in der Bundesrepublik
            Deutschland).
            <br />
            Es gelten die berufsrechtlichen Regelungen des
            Masseur-&nbsp;und&nbsp;Physiotherapeutengesetzes (MPhG), einsehbar unter{" "}
            <a
              href="https://www.gesetze-im-internet.de/mphg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              gesetze-im-internet.de/mphg
            </a>
            .
            <br />
            Zuständige Aufsichtsbehörde: Gesundheitsamt des Bezirksamts Pankow von
            Berlin. <em>[Bitte prüfen und ggf. anpassen.]</em>
          </p>

          <h2>Umsatzsteuer</h2>
          <p>
            Die physiotherapeutischen Heilbehandlungen sind gemäß
            §&nbsp;4&nbsp;Nr.&nbsp;14 UStG von der Umsatzsteuer befreit.{" "}
            <em>[Bitte prüfen; falls eine USt-IdNr. vorhanden ist, hier ergänzen.]</em>
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            {site.owner}
            <br />
            {site.address.street}, {site.address.city}
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
            keine Gewähr übernehmen. Die Inhalte dienen der allgemeinen Information
            und ersetzen keine individuelle medizinische Beratung, Diagnose oder
            Behandlung.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unsere Website enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten
            ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der
            Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf dieser
            Website unterliegen dem deutschen Urheberrecht. Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.
          </p>

          <p>
            Siehe auch: <Link href="/datenschutz">Datenschutzerklärung</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
