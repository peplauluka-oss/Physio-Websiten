import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt & Termin",
  description:
    "Vereinbaren Sie einen Termin bei PhysioVital in Berlin. Kontaktieren Sie uns telefonisch, per E-Mail oder über unser Anfrageformular.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Kontakt</span>
          <h1>Termin vereinbaren</h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Schreiben Sie uns oder rufen Sie an – wir finden gemeinsam den passenden
            Termin für Sie.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2>So erreichen Sie uns</h2>
              <ul className="info-list">
                <li>
                  <span className="ic">📍</span>
                  <span>
                    <strong>Adresse</strong>
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </span>
                </li>
                <li>
                  <span className="ic">📞</span>
                  <span>
                    <strong>Telefon</strong>
                    <br />
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                  </span>
                </li>
                <li>
                  <span className="ic">✉️</span>
                  <span>
                    <strong>E-Mail</strong>
                    <br />
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                </li>
              </ul>

              <h3 style={{ marginTop: "1.5rem" }}>Öffnungszeiten</h3>
              <ul className="hours-list">
                {site.hours.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero__card">
              <h3>Terminanfrage</h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
