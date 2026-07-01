export const site = {
  name: "PhysioVital",
  tagline: "Physiotherapie mit Herz und Kompetenz",
  phone: "+49 30 123 456 78",
  email: "termin@physiovital.de",
  address: {
    street: "Gesundheitsstraße 12",
    city: "10115 Berlin",
  },
  hours: [
    { day: "Montag – Donnerstag", time: "08:00 – 19:00 Uhr" },
    { day: "Freitag", time: "08:00 – 16:00 Uhr" },
    { day: "Samstag", time: "Nach Vereinbarung" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "manuelle-therapie",
    title: "Manuelle Therapie",
    short: "Gezielte Handgrifftechniken zur Behandlung von Gelenk- und Muskelbeschwerden.",
    description:
      "Mit sanften, spezialisierten Handgriffen lösen wir Blockaden, verbessern die Beweglichkeit Ihrer Gelenke und lindern Schmerzen an Muskeln und Nerven.",
    icon: "🤲",
  },
  {
    slug: "krankengymnastik",
    title: "Krankengymnastik",
    short: "Aktive und passive Übungen zur Wiederherstellung Ihrer Bewegungsfreiheit.",
    description:
      "Individuell abgestimmte Übungsprogramme stärken Ihre Muskulatur, verbessern die Koordination und helfen Ihnen zurück in einen schmerzfreien Alltag.",
    icon: "🧘",
  },
  {
    slug: "massage",
    title: "Klassische Massage",
    short: "Entspannende und lösende Massagetechniken für Muskeln und Bindegewebe.",
    description:
      "Unsere Massagen lösen Verspannungen, fördern die Durchblutung und sorgen für tiefe Entspannung – ideal als Ergänzung zu Ihrer Therapie.",
    icon: "💆",
  },
  {
    slug: "lymphdrainage",
    title: "Manuelle Lymphdrainage",
    short: "Sanfte Technik zur Entstauung und Reduktion von Schwellungen.",
    description:
      "Durch rhythmische, sanfte Grifftechniken regen wir den Lymphfluss an und unterstützen den Abbau von Schwellungen, etwa nach Operationen oder Verletzungen.",
    icon: "🌿",
  },
  {
    slug: "sportphysiotherapie",
    title: "Sportphysiotherapie",
    short: "Prävention, Behandlung und Rehabilitation für aktive Menschen.",
    description:
      "Ob Freizeit- oder Leistungssport: Wir behandeln Sportverletzungen, beugen ihnen vor und begleiten Sie zurück zu Ihrer vollen Leistungsfähigkeit.",
    icon: "🏃",
  },
  {
    slug: "wärmetherapie",
    title: "Wärme- & Kältetherapie",
    short: "Thermische Anwendungen zur Schmerzlinderung und Regeneration.",
    description:
      "Fango, Heißluft oder Kälteanwendungen unterstützen gezielt die Durchblutung, entspannen die Muskulatur und lindern akute wie chronische Beschwerden.",
    icon: "♨️",
  },
];

export const team = [
  {
    name: "Dr. Anna Berger",
    role: "Praxisleitung & Physiotherapeutin",
    bio: "Über 15 Jahre Erfahrung in manueller Therapie und Sportphysiotherapie.",
  },
  {
    name: "Markus Klein",
    role: "Physiotherapeut",
    bio: "Spezialist für Krankengymnastik und Rückenschulen.",
  },
  {
    name: "Sofia Rossi",
    role: "Masseurin & Lymphtherapeutin",
    bio: "Expertin für Massage und manuelle Lymphdrainage.",
  },
];
