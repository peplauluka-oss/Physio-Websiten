import type { ReactNode } from "react";

/**
 * Einheitliches Vektor-Icon-Set (ersetzt alle Emojis).
 * Feiner Linien-Stil, currentColor, skalierbar. Einzelne gefüllte Formen
 * setzen fill/stroke selbst; das <svg> ist standardmäßig nur Kontur.
 */

const P: Record<string, ReactNode> = {
  // — Marke / UI —
  bloom: (
    <>
      <circle cx="12" cy="7" r="3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="3" fill="currentColor" stroke="none" />
      <circle cx="7" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M5 12.5 10 17 19 7" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,

  // — Kontakt —
  phone: (
    <path d="M4 5.2C4 4.3 4.8 3.5 5.7 3.5h1.9c.8 0 1.5.6 1.7 1.4l.7 2.9c.1.6-.1 1.2-.6 1.6L9.6 10.9a12 12 0 0 0 4.9 4.9l1.5-1.5c.4-.4 1-.6 1.6-.5l2.9.7c.8.2 1.4.9 1.4 1.7v1.9c0 .9-.8 1.7-1.7 1.7C11.4 20 4 12.6 4 5.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.6 1.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.6 6.6 8.4 6 8.4-6" />
    </>
  ),
  fax: (
    <>
      <path d="M7 9V4h10v5" />
      <rect x="4" y="9" width="16" height="7" rx="1.6" />
      <path d="M8 16h8v4H8z" />
      <circle cx="16.6" cy="12" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="4" width="12" height="12" rx="3" />
      <path d="M6 11h12" />
      <circle cx="9.2" cy="13.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="13.6" r="1" fill="currentColor" stroke="none" />
      <path d="M8.5 16 6.5 20M15.5 16l2 4M9 20h6" />
    </>
  ),
  tag: (
    <>
      <path d="M12.6 3.4 20.6 11.4a2 2 0 0 1 0 2.8l-6.4 6.4a2 2 0 0 1-2.8 0L3.4 12.6V4a.6.6 0 0 1 .6-.6h8.6Z" />
      <circle cx="7.6" cy="7.6" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),

  // — Natur / feminin —
  flower: (
    <>
      <g>
        <ellipse cx="12" cy="6.5" rx="2.3" ry="4" />
        <ellipse cx="12" cy="6.5" rx="2.3" ry="4" transform="rotate(72 12 12)" />
        <ellipse cx="12" cy="6.5" rx="2.3" ry="4" transform="rotate(144 12 12)" />
        <ellipse cx="12" cy="6.5" rx="2.3" ry="4" transform="rotate(216 12 12)" />
        <ellipse cx="12" cy="6.5" rx="2.3" ry="4" transform="rotate(288 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  tulip: (
    <>
      <path d="M12 20c-3-2-5-5-5-9 1.6.5 3.6 1.5 5 4 1.4-2.5 3.4-3.5 5-4 0 4-2 7-5 9Z" />
      <path d="M12 12v8" />
    </>
  ),
  leaf: (
    <>
      <path d="M4.5 19.5C4.5 11.5 10 5.5 20 4c-1.5 10-7.5 15.5-15.5 15.5Z" />
      <path d="M5 19C9 14 12.5 11 17 9" />
    </>
  ),
  droplet: <path d="M12 3.5s6 6.4 6 10.4a6 6 0 1 1-12 0C6 9.9 12 3.5 12 3.5Z" />,
  sprout: (
    <>
      <path d="M12 20v-6.5" />
      <path d="M12 13.5c0-3 2.4-5 5.4-5 0 3-2.4 5-5.4 5Z" />
      <path d="M12 14.5c0-3-2.4-5-5.4-5 0 3 2.4 5 5.4 5Z" />
    </>
  ),
  spa: (
    <>
      <path d="M12 20c-4 0-7-2.6-7-6.2 2 0 3.8 1 5 2.6-.4-3.6 1-6 2-7.9 1 1.9 2.4 4.3 2 7.9 1.2-1.6 3-2.6 5-2.6 0 3.6-3 6.2-7 6.2Z" />
    </>
  ),
  heart: <path d="M12 20s-6.3-4.2-8.6-8C1.7 8.7 3.2 5.3 6.2 5.3c1.8 0 3 .9 5.8 3.6 2.8-2.7 4-3.6 5.8-3.6 3 0 4.5 3.4 2.8 6.7C18.3 15.8 12 20 12 20Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </>
  ),
  sunrise: (
    <>
      <path d="M12 4v3M5.5 8.5 7 10M18.5 8.5 17 10M2.5 14.5h3.5M18 14.5h3.5" />
      <path d="M8 14.5a4 4 0 0 1 8 0" />
      <path d="M2 18.5h20" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6 1.2A3.5 3.5 0 0 1 16.8 18Z" />,
  flame: <path d="M12 3c1.2 3.2 4 4.2 4 7.8a4 4 0 0 1-8 0c0-1.6.8-2.7 1.6-3.4C10.2 6.8 11.2 5 12 3Z" />,

  // — Behandlungen / Fach —
  hands: (
    <path d="M8 11.5V6.3a1.5 1.5 0 0 1 3 0v3.7M11 9.7V5a1.5 1.5 0 0 1 3 0v5M14 10.2V6.6a1.5 1.5 0 0 1 3 0v6.4a6 6 0 0 1-6 6h-.7a5 5 0 0 1-3.8-1.8l-2.6-3a1.6 1.6 0 0 1 2.4-2.1L8 12.6" />
  ),
  activity: (
    <>
      <circle cx="12" cy="4.8" r="2" />
      <path d="M12 7v4.5M12 11.5 8 18M12 11.5 16 18M8.5 9.5l3.5 2 3.5-2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="4.8" r="2" />
      <path d="M12 7v8M12 15l-2 5M12 15l2 5M9.3 10.5h5.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  spine: (
    <>
      <path d="M12 3v18" />
      <path d="M9.2 6h5.6M9 10h6M9 14h6M9.2 18h5.6" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 5.8A2.5 2.5 0 0 0 7 8.3a2.6 2.6 0 0 0-1 4.2 2.5 2.5 0 0 0 1.8 3.9A2.4 2.4 0 0 0 11 18V6.6a.8.8 0 0 0-1.5-.8Z" />
      <path d="M14.5 5.8A2.5 2.5 0 0 1 17 8.3a2.6 2.6 0 0 1 1 4.2 2.5 2.5 0 0 1-1.8 3.9A2.4 2.4 0 0 1 13 18V6.6a.8.8 0 0 1 1.5-.8Z" />
    </>
  ),
  bolt: <path d="M13 2.5 5 13.5h5.2l-1.2 8 8-11H11l2-8Z" />,
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10.2V19h12v-8.8" />
      <path d="M10 19v-4.5h4V19" />
    </>
  ),

  // — Karriere-Vorteile —
  euro: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M15 8.6a4 4 0 1 0 0 6.8M7.5 11h5.5M7.5 13h4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8.5 3v4M15.5 3v4" />
    </>
  ),
  book: (
    <>
      <path d="M6.5 4H16a1 1 0 0 1 1 1v13.5a1 1 0 0 0-1-1H6.5A1.5 1.5 0 0 1 5 15V5.5A1.5 1.5 0 0 1 6.5 4Z" />
      <path d="M9 4v13.5" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5V9.5M9.8 3h4.4M18.5 6l1.5-1.5" />
    </>
  ),
  star: (
    <path
      d="M12 3.5l2.55 5.17 5.7.83-4.12 4.02.97 5.68L12 16.5l-5.1 2.7.97-5.68L3.75 9.5l5.7-.83L12 3.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  sparkle: (
    <>
      <path
        d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3 3 0 0 1 0 5.6M16.2 15.4A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  door: (
    <>
      <path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h7A1.5 1.5 0 0 1 16 4.5V21" />
      <path d="M4 21h16" />
      <circle cx="13.2" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  accessible: (
    <>
      <circle cx="12" cy="4.6" r="1.7" />
      <path d="M8 8.4h5l.6 4.6H12" />
      <path d="M11 13a5 5 0 1 0 4.6 3" />
    </>
  ),
};

export type IconName = keyof typeof P;

export default function Icon({
  name,
  size = "1em",
  className = "",
  strokeWidth = 1.7,
  title,
}: {
  name: IconName | string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  const glyph = P[name as string] ?? P.flower;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  );
}
