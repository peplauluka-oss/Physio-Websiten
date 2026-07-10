import Link from "next/link";
import Icon from "./Icon";
import { site, images } from "@/lib/site";
import { asset } from "@/lib/asset";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="brand" style={{ marginBottom: "1rem" }}>
              <span className="brand__mark" aria-hidden>
                <Icon name="bloom" />
              </span>
              <span className="brand__text">Praxis Rammelt</span>
            </div>
            <p>{site.tagline} – wirksame Behandlungen, ein herzliches Team und Zeit für Sie.</p>
          </div>

          <div>
            <h4>Navigation</h4>
            <ul className="footer__links">
              <li><Link href="/">Start</Link></li>
              <li><Link href="/leistungen">Leistungen</Link></li>
              <li><Link href="/ueber-uns">Über uns</Link></li>
              <li><Link href="/karriere">Karriere</Link></li>
              <li><Link href="/kontakt">Kontakt &amp; Termin</Link></li>
            </ul>
          </div>

          <div>
            <h4>Standort &amp; Kontakt</h4>
            <ul className="footer__links">
              <li>{site.address.street}, {site.address.city}</li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Route planen (Google Maps)
                </a>
              </li>
              <li><a href={`tel:${site.phoneHref}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>

          <div>
            <h4>Öffnungszeiten</h4>
            <ul className="footer__links footer__hours">
              {site.hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <strong>{h.time}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} {site.name} · Behandlung nach ärztlicher
          Verordnung · barrierefreier Zugang ·{" "}
          <Link href="/impressum">Impressum</Link> ·{" "}
          <Link href="/datenschutz">Datenschutz</Link>
        </div>

        <div className="footer__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(images.logo)} alt="Praxis für Physiotherapie Simone Rammelt" />
        </div>
      </div>
    </footer>
  );
}
