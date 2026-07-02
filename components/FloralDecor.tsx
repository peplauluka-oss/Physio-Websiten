/**
 * Zarte florale Linien-Deko – nur in den femininen Themes (Blüte/Cozy)
 * sichtbar (per CSS gesteuert). Rein dekorativ.
 */
function Flower({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
      <g strokeLinecap="round">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="50" cy="28" rx="10" ry="20" transform={`rotate(${deg} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="7" fill="currentColor" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M50 95 C50 60 50 40 50 10" />
      <path d="M50 70 C35 64 28 52 30 40 C44 44 50 56 50 70Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M50 55 C65 49 72 37 70 25 C56 29 50 41 50 55Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M50 40 C38 35 33 26 34 17 C45 20 50 29 50 40Z" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

export default function FloralDecor() {
  return (
    <div className="floral-decor" style={{ color: "var(--rose)" }}>
      <Flower className="fl-1" />
      <Sprig className="fl-2" />
      <Flower className="fl-3" />
    </div>
  );
}
