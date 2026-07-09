"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Start" },
  { href: "/erlebnis", label: "Erlebnis" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/karriere", label: "Karriere" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      {/* Schnell-Infos: Standort & Öffnungszeiten immer griffbereit */}
      <div className="topbar">
        <div className="container topbar__inner">
          <a
            className="topbar__item"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="pin" /> {site.address.street}, {site.address.city}
          </a>
          <span className="topbar__item">
            <Icon name="clock" /> Mo–Do 08–19 Uhr · Fr 08–14 Uhr
          </span>
          <a className="topbar__item" href={`tel:${site.phoneHref}`}>
            <Icon name="phone" /> {site.phone}
          </a>
        </div>
      </div>
      <div className="container header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden>
            <Icon name="bloom" />
          </span>
          <span className="brand__text">
            Praxis <strong>Rammelt</strong>
          </span>
        </Link>

        <button
          className="nav__toggle"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>

        <nav className={`nav ${open ? "nav--open" : ""}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/kontakt" className="btn btn--primary" onClick={() => setOpen(false)}>
            Termin buchen
          </Link>
        </nav>
      </div>
    </header>
  );
}
