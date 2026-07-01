import Photo from "@/components/Photo";

export type SwipeItem = {
  src: string;
  label: string;
  icon: string;
};

/**
 * Endlos laufende „Swipe"-Galerie (CSS-Marquee). Die Items werden doppelt
 * gerendert, damit der Lauf nahtlos wirkt. Pause bei Hover (siehe CSS).
 */
export default function SwipeGallery({
  items,
  onSand = false,
}: {
  items: SwipeItem[];
  onSand?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`swipe ${onSand ? "swipe--onsand" : ""}`} aria-hidden>
      <div className="swipe__track">
        {loop.map((it, i) => (
          <figure className="swipe__item" key={i}>
            <Photo src={it.src} alt={it.label} icon={it.icon} ratio="3 / 4" />
            <figcaption className="swipe__label">{it.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
