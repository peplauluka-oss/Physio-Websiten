import Icon from "./Icon";

type Props = {
  rating: number;
  count?: number;
};

/** Sternebewertung als reines, zugängliches SVG (0–5, halbe Sterne möglich). */
export default function Stars({ rating, count }: Props) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const label = count
    ? `${rating.toFixed(1)} von 5 Sternen bei ${count} Bewertungen`
    : `${rating.toFixed(1)} von 5 Sternen`;

  const row = (
    <span className="stars__row" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" />
      ))}
    </span>
  );

  return (
    <span className="stars" role="img" aria-label={label}>
      <span className="stars__track" aria-hidden>
        {row}
        <span className="stars__fill" style={{ width: `${pct}%` }}>
          {row}
        </span>
      </span>
      <span className="stars__meta">
        <strong>{rating.toFixed(1)}</strong>
        {count ? ` · ${count} Google-Bewertungen` : ""}
      </span>
    </span>
  );
}
