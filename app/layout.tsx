import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "PhysioVital – Ihre Physiotherapie-Praxis in Berlin. Manuelle Therapie, Krankengymnastik, Massage, Lymphdrainage und mehr. Jetzt Termin vereinbaren.",
  keywords: [
    "Physiotherapie",
    "Krankengymnastik",
    "Manuelle Therapie",
    "Massage",
    "Berlin",
    "Praxis",
  ],
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: "Ihre Physiotherapie-Praxis in Berlin.",
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
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
