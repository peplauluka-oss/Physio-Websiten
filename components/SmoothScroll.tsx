"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Aktiviert weiches „Momentum"-Scrolling (wie bei Apple/Studio-Seiten).
 * Deaktiviert sich bei prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.documentElement.classList.add("lenis");

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
