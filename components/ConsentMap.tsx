"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/site";

/**
 * DSGVO-freundliche Zwei-Klick-Einbindung von Google Maps: Die Karte (und
 * damit jede Verbindung zu Google-Servern) wird erst geladen, nachdem die
 * Besucherin aktiv eingewilligt hat. Alternativ steht ein direkter Link zu
 * Google Maps bereit, der die Seite gar nicht erst einbettet.
 */
export default function ConsentMap() {
  const [loaded, setLoaded] = useState(false);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

  if (loaded) {
    return (
      <div className="map-wrap">
        <iframe
          title="Anfahrt zur Praxis Simone Rammelt"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="map-wrap map-consent">
      <span className="map-consent__icon" aria-hidden>
        <Icon name="pin" />
      </span>
      <h3>Anfahrt &amp; Karte</h3>
      <p className="map-consent__text">
        Aus Datenschutzgründen laden wir Google Maps erst nach Ihrem Klick. Beim
        Laden der Karte werden Daten (u.&nbsp;a. Ihre IP-Adresse) an Google
        übertragen. Mehr dazu in unserer{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <p className="map-consent__address">
        <Icon name="pin" /> {site.address.street}, {site.address.city}
      </p>
      <div className="map-consent__actions">
        <button type="button" className="btn btn--primary" onClick={() => setLoaded(true)}>
          Karte laden &amp; einverstanden
        </button>
        <a className="btn btn--ghost" href={mapsLink} target="_blank" rel="noopener noreferrer">
          In Google Maps öffnen
        </a>
      </div>
    </div>
  );
}
