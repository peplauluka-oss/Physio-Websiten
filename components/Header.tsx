"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden>
            ✚
          </span>
          {site.name}
        </Link>

        <button
          className="nav__toggle"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
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
