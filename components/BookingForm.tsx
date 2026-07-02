"use client";

import { useState } from "react";
import Icon from "./Icon";
import { services } from "@/lib/site";

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Ohne Backend: Wir simulieren den Versand. Für den Produktivbetrieb
    // hier eine API-Route oder einen E-Mail-Dienst anbinden.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-success">
        <h3>Vielen Dank! <Icon name="sparkle" /></h3>
        <p>
          Ihre Terminanfrage ist bei uns eingegangen. Wir melden uns
          schnellstmöglich telefonisch oder per E-Mail bei Ihnen.
        </p>
        <button className="btn btn--ghost" onClick={() => setSent(false)}>
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" type="text" required placeholder="Ihr vollständiger Name" />
      </div>

      <div className="field">
        <label htmlFor="email">E-Mail *</label>
        <input id="email" name="email" type="email" required placeholder="name@beispiel.de" />
      </div>

      <div className="field">
        <label htmlFor="phone">Telefon</label>
        <input id="phone" name="phone" type="tel" placeholder="Optional für Rückruf" />
      </div>

      <div className="field">
        <label htmlFor="service">Gewünschte Leistung</label>
        <select id="service" name="service" defaultValue="">
          <option value="" disabled>
            Bitte auswählen
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="beratung">Erstberatung / Sonstiges</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Ihre Nachricht</label>
        <textarea
          id="message"
          name="message"
          placeholder="Beschreiben Sie kurz Ihr Anliegen oder Wunschtermine."
        />
      </div>

      <button type="submit" className="btn btn--primary">
        Terminanfrage senden
      </button>
      <p className="form-note">
        * Pflichtfelder. Ihre Daten werden vertraulich behandelt und
        ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
    </form>
  );
}
