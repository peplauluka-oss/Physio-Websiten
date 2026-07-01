# Physio-Websiten

Website für eine Physiotherapie-Praxis (**PhysioVital**), gebaut mit
[Next.js](https://nextjs.org/) (App Router) und TypeScript.

## Features

- 🏠 **Startseite** – Hero, Öffnungszeiten, Leistungsübersicht und Call-to-Action
- 💆 **Leistungen** – Detailseite mit allen Therapieangeboten
- 👥 **Über uns** – Praxis-Philosophie und Team
- 📅 **Kontakt & Termin** – Kontaktdaten und Terminanfrage-Formular
- 📱 Vollständig responsive (mobile Navigation inklusive)
- 🎨 Eigenes CSS-Design ohne externe UI-Bibliotheken

## Projektstruktur

```
app/
  layout.tsx        # Grundgerüst mit Header & Footer
  page.tsx          # Startseite
  globals.css       # Globales Styling
  leistungen/       # Leistungen-Seite
  ueber-uns/        # Über-uns-Seite
  kontakt/          # Kontakt- & Terminseite
components/
  Header.tsx        # Navigation (mit mobilem Menü)
  Footer.tsx        # Fußzeile
  BookingForm.tsx   # Terminanfrage-Formular
lib/
  site.ts           # Zentrale Inhalte (Praxisdaten, Leistungen, Team)
```

## Entwicklung

Voraussetzung: Node.js 18.17 oder neuer.

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Seite ist anschließend unter [http://localhost:3000](http://localhost:3000)
erreichbar.

## Build

```bash
npm run build
npm run start
```

## Anpassen

Praxisname, Kontaktdaten, Öffnungszeiten, Leistungen und Team werden zentral in
[`lib/site.ts`](lib/site.ts) gepflegt – hier lassen sich Inhalte ohne Eingriff in
die einzelnen Seiten ändern.

> **Hinweis:** Das Terminformular ist aktuell ohne Backend umgesetzt und
> simuliert den Versand. Für den Produktivbetrieb sollte eine API-Route oder ein
> E-Mail-Dienst angebunden werden.
