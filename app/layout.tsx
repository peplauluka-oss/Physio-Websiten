import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/lib/site";

// Lokal gehostete Schriften (DSGVO-konform, keine Anfragen an Google Fonts).
// Variable Fonts (WOFF2, Latin-Subset) liegen in app/fonts/ und werden von
// Next.js beim Build mit ausgeliefert.
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-var.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-italic-var.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const nunitoSans = localFont({
  src: [{ path: "./fonts/nunito-sans-latin-var.woff2", weight: "200 1000", style: "normal" }],
  variable: "--font-nunito-sans",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const caveat = localFont({
  src: [{ path: "./fonts/caveat-latin-var.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-caveat",
  display: "swap",
  fallback: ["Segoe Script", "cursive"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.shortName}`,
  },
  description:
    "Physiotherapie Simone Rammelt – Ihre Frauen-Praxis in Berlin Prenzlauer Berg. Sanfte, herzliche Behandlung in wohltuender Wellness-Atmosphäre. Jetzt Termin vereinbaren.",
  keywords: [
    "Physiotherapie",
    "Wellness",
    "Frauenpraxis",
    "Massage",
    "Lymphdrainage",
    "Prenzlauer Berg",
    "Berlin",
  ],
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: "Sanfte, herzliche Physiotherapie in Prenzlauer Berg.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      data-theme="blossom"
      className={`${fraunces.variable} ${nunitoSans.variable} ${caveat.variable}`}
    >
      <head>
        {/* Ohne JavaScript sollen die per Scroll eingeblendeten Inhalte sichtbar sein */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
