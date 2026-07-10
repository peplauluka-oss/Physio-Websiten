import type { Metadata } from "next";
import Link from "next/link";
import SceneBackground from "@/components/SceneBackground";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung der ${site.name} – Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.`,
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="subpage">
      <SceneBackground />
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container legal">
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            {site.name}, Inhaberin: {site.owner}
            <br />
            {site.address.street}, {site.address.city}
            <br />
            Telefon: <a href={`tel:${site.phoneHref}`}>{site.phone}</a> · E-Mail:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>

          <h2>2. Das Wichtigste in Kürze</h2>
          <ul>
            <li>Diese Website setzt <strong>keine Cookies</strong> ein.</li>
            <li>Es findet <strong>kein Tracking</strong> und keine Web-Analyse statt.</li>
            <li>
              Alle Schriftarten sind <strong>lokal eingebunden</strong> – es wird
              keine Verbindung zu Google Fonts oder anderen Font-Diensten aufgebaut.
            </li>
            <li>
              Google Maps wird erst nach Ihrer <strong>aktiven Einwilligung</strong>{" "}
              (Klick) geladen.
            </li>
          </ul>

          <h2>3. Hosting (GitHub Pages)</h2>
          <p>
            Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub
            Inc., 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA (in der EU
            vertreten durch GitHub B.V., Niederlande). Beim Aufruf der Website
            verarbeitet GitHub technisch notwendige Daten wie Ihre IP-Adresse,
            Datum und Uhrzeit des Zugriffs, Browsertyp und Betriebssystem
            (Server-Logfiles), um die Website auszuliefern und die Sicherheit und
            Stabilität des Dienstes zu gewährleisten.
          </p>
          <p>
            Rechtsgrundlage ist unser berechtigtes Interesse an der sicheren und
            effizienten Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
            GitHub ist unter dem EU-U.S. Data Privacy Framework zertifiziert;
            insoweit besteht für Übermittlungen in die USA ein
            Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere
            Informationen:{" "}
            <a
              href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Privacy Statement
            </a>
            .
          </p>

          <h2>4. Schriftarten (lokal)</h2>
          <p>
            Zur einheitlichen Darstellung verwenden wir Schriftarten, die lokal auf
            unserem Webspace gespeichert sind. Beim Aufruf der Website wird dabei
            keine Verbindung zu Servern von Google oder anderen Drittanbietern
            hergestellt; es werden keine personenbezogenen Daten an Dritte
            übertragen.
          </p>

          <h2>5. Google Maps (Zwei-Klick-Lösung)</h2>
          <p>
            Auf unserer Kontaktseite bieten wir eine Anfahrtskarte von Google Maps
            an (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland). Die Karte wird <strong>erst geladen, wenn Sie aktiv auf
            „Karte laden“ klicken</strong>. Vorher findet keine Datenübertragung an
            Google statt.
          </p>
          <p>
            Mit dem Klick willigen Sie ein (Art. 6 Abs. 1 lit. a DSGVO), dass Ihre
            IP-Adresse und ggf. weitere Geräteinformationen an Google übertragen
            werden; dabei können Daten auch in die USA übermittelt werden. Die
            Einwilligung gilt für den jeweiligen Seitenaufruf und kann durch
            Neuladen der Seite „widerrufen“ werden. Weitere Informationen:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung von Google
            </a>
            .
          </p>

          <h2>6. Kontaktaufnahme (Telefon, E-Mail)</h2>
          <p>
            Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir die
            von Ihnen mitgeteilten Daten (z. B. Name, Kontaktdaten, Anliegen) zur
            Bearbeitung Ihrer Anfrage und zur Terminvereinbarung. Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw. Vertragsanbahnung) sowie
            bei Gesundheitsdaten Ihre Einwilligung bzw. Art. 9 Abs. 2 lit. h DSGVO
            (Gesundheitsversorgung). Wir löschen die Daten, sobald sie für die
            Zwecke nicht mehr erforderlich sind und keine gesetzlichen
            Aufbewahrungspflichten (z. B. Patientendokumentation) entgegenstehen.
          </p>

          <h2>7. Formulare auf dieser Website</h2>
          <p>
            Die auf dieser Website eingebundenen Formulare (Terminanfrage,
            Bewerbung) übertragen derzeit <strong>keine Daten an uns oder an
            Dritte</strong>; Eingaben verbleiben in Ihrem Browser. Für verbindliche
            Anfragen nutzen Sie bitte Telefon oder E-Mail. Sollte künftig ein
            Formularversand eingerichtet werden, aktualisieren wir diese
            Datenschutzerklärung entsprechend.
          </p>

          <h2>8. Ihre Rechte</h2>
          <p>
            Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft
            (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
            (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage
            berechtigter Interessen (Art. 21 DSGVO). Erteilte Einwilligungen können
            Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3
            DSGVO).
          </p>
          <p>
            Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
            zu beschweren (Art. 77 DSGVO). Zuständig für Berlin: Berliner
            Beauftragte für Datenschutz und Informationsfreiheit,{" "}
            <a
              href="https://www.datenschutz-berlin.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              datenschutz-berlin.de
            </a>
            .
          </p>

          <h2>9. Aktualität</h2>
          <p>
            Stand dieser Datenschutzerklärung: Juli 2026. Wir passen sie an, sobald
            sich die Datenverarbeitung auf dieser Website ändert.
          </p>

          <p>
            Siehe auch: <Link href="/impressum">Impressum</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
