import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="brand" style={{ marginBottom: "1rem" }}>
              <span className="brand__mark" aria-hidden>
                ✚
              </span>
              {site.name}
            </div>
            <p>{site.tagline}. Ihre Praxis für moderne Physiotherapie in Berlin.</p>
          </div>

          <div>
            <h4>Navigation</h4>
            <ul className="footer__links">
              <li><Link href="/">Start</Link></li>
              <li><Link href="/leistungen">Leistungen</Link></li>
              <li><Link href="/ueber-uns">Über uns</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul className="footer__links">
              <li>{site.address.street}</li>
              <li>{site.address.city}</li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} {site.name} · Alle Rechte vorbehalten ·{" "}
          <Link href="/kontakt">Impressum</Link>
        </div>
      </div>
    </footer>
  );
}
