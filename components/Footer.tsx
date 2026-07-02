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
            <p>{site.tagline}. Herzliche Physiotherapie in {site.address.district}, Berlin.</p>
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
            <h4>Kontakt</h4>
            <ul className="footer__links">
              <li>{site.address.street}</li>
              <li>{site.address.city}</li>
              <li><a href={`tel:${site.phoneHref}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} {site.name} · Behandlung nach ärztlicher
          Verordnung · barrierefreier Zugang ·{" "}
          <Link href="/kontakt">Impressum</Link>
        </div>

        <div className="footer__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(images.logo)} alt="Praxis für Physiotherapie Simone Rammelt" />
        </div>
      </div>
    </footer>
  );
}
