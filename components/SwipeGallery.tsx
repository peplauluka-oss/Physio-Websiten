"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/Photo";

export type SwipeItem = {
  src: string;
  label: string;
  icon: string;
};

/**
 * Endlos schwebende „Swipe"-Galerie. Die Items werden doppelt gerendert, damit
 * der Lauf nahtlos wirkt. Zusätzlich zum automatischen Schweben kann man die
 * Bilder selbst durchblättern – per Touch-Wisch, Maus-Drag („greifen & ziehen")
 * oder Mausrad. Während der Interaktion (und kurz danach) pausiert das
 * automatische Schweben, damit man sich die Bilder in Ruhe ansehen kann.
 */
export default function SwipeGallery({
  items,
  onSand = false,
}: {
  items: SwipeItem[];
  onSand?: boolean;
}) {
  const loop = [...items, ...items];
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let acc = 0; // Sub-Pixel-Akkumulator für gleichmäßiges Schweben
    let pausedUntil = 0;
    let hovering = false;
    let dragging = false;
    const SPEED = 0.7; // px pro Frame

    const half = () => el.scrollWidth / 2;

    // Hält die Scrollposition im ersten „Halbsatz" der doppelten Items,
    // sodass in beide Richtungen endlos geblättert werden kann.
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (el.scrollLeft >= h) el.scrollLeft -= h;
      else if (el.scrollLeft <= 0) el.scrollLeft += h;
    };

    const tick = () => {
      if (!reduce && !hovering && !dragging && Date.now() > pausedUntil) {
        acc += SPEED;
        const whole = Math.trunc(acc);
        if (whole !== 0) {
          el.scrollLeft += whole;
          acc -= whole;
        }
      }
      wrap();
      raf = requestAnimationFrame(tick);
    };

    el.scrollLeft = 1;
    raf = requestAnimationFrame(tick);

    const pause = (ms = 2000) => {
      pausedUntil = Date.now() + ms;
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onWheel = () => pause();
    const onScroll = () => wrap();
    const onTouchStart = () => pause(4000);
    const onTouchEnd = () => pause(1500);

    // Maus-Drag: greifen und ziehen
    let startX = 0;
    let startScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // Touch nutzt natives Scrollen
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.classList.add("is-dragging");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
      pause(1500);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, [items]);

  return (
    <div className={`swipe ${onSand ? "swipe--onsand" : ""}`}>
      <div
        className="swipe__viewport"
        ref={viewportRef}
        role="group"
        aria-label="Impressionen aus der Praxis – zum Ansehen wischen, ziehen oder scrollen"
        tabIndex={0}
      >
        <div className="swipe__track">
          {loop.map((it, i) => (
            <figure className="swipe__item" key={i}>
              <Photo src={it.src} alt={it.label} icon={it.icon} ratio="3 / 4" />
              <figcaption className="swipe__label">{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
