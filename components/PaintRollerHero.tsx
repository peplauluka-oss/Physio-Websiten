"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-gesteuertes Intro (wie Referenzvideo – läuft NUR beim Runterwischen):
 *   Fortschritt 0→1 über eine hohe Sektion, die Bühne bleibt sticky/vollbild.
 *     0.05–0.42  Farbrolle streicht Terrakotta von oben nach unten auf
 *     0.40–0.52  Fläche wird zu Vorhängen
 *     0.50–0.85  Vorhänge öffnen sich → warmer Raum (mit Push-in)
 *     0.84–1.00  Hero-Text erscheint
 * Kein Autoplay. Respektiert prefers-reduced-motion (zeigt sofort den Raum).
 */
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const map = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function PaintRollerHero({ children }: { children: ReactNode }) {
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const stage = stageRef.current;
    if (!sec || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setVars = (v: Record<string, string>) => {
      for (const k in v) stage.style.setProperty(k, v[k]);
    };

    const finalState = () => {
      setVars({
        "--paintCut": "0%", "--rollerTop": "108%", "--rollerOpacity": "0", "--edgeOpacity": "0",
        "--curtainOpacity": "1", "--wallOpacity": "0", "--roomOpacity": "1", "--roomScale": "1",
        "--openL": "-104%", "--openR": "104%", "--capOpacity": "0", "--textOpacity": "1", "--textY": "0px",
      });
    };

    if (reduce) {
      sec.style.height = "100svh";
      finalState();
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - vh; // Scroll-Strecke, in der die Bühne gepinnt ist
      const p = total > 0 ? clamp01(-rect.top / total) : 0;

      const paint = smooth(map(p, 0.05, 0.42));
      const curtainOpacity = map(p, 0.4, 0.52);
      const wallOpacity = 1 - map(p, 0.42, 0.52);
      const roomOpacity = map(p, 0.5, 0.6);
      const open = smooth(map(p, 0.52, 0.85));
      const roller = 1 - map(p, 0.42, 0.48);
      const cap = Math.min(map(p, 0.56, 0.64), 1 - map(p, 0.74, 0.82));
      const text = map(p, 0.85, 1);

      setVars({
        "--paintCut": (100 - paint * 100).toFixed(2) + "%",
        "--rollerTop": (paint * 108).toFixed(2) + "%",
        "--rollerOpacity": roller.toFixed(3),
        "--edgeOpacity": roller.toFixed(3),
        "--curtainOpacity": curtainOpacity.toFixed(3),
        "--wallOpacity": wallOpacity.toFixed(3),
        "--roomOpacity": roomOpacity.toFixed(3),
        "--roomScale": (1.12 - 0.12 * open).toFixed(3),
        "--openL": (-104 * open).toFixed(2) + "%",
        "--openR": (104 * open).toFixed(2) + "%",
        "--capOpacity": clamp01(cap).toFixed(3),
        "--textOpacity": text.toFixed(3),
        "--textY": (24 - 24 * text).toFixed(1) + "px",
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="heroscroll" id="start" ref={secRef}>
      <div className="herostage" data-panel ref={stageRef}>
        <div className="rhero" aria-hidden>
          {/* warmer Raum hinter den Vorhängen */}
          <div className="rhero__room">
            <span className="room__wall" />
            <span className="room__light" />
            <span className="room__window">
              <span className="room__mullion room__mullion--v" />
              <span className="room__mullion room__mullion--h" />
            </span>
            <span className="room__sun" />
            <span className="room__frame" />
            <span className="room__lamp"><span className="lamp__glow" /><span className="lamp__shade" /><span className="lamp__stand" /></span>
            <span className="room__plant">
              <span className="leaf leaf--1" />
              <span className="leaf leaf--2" />
              <span className="leaf leaf--3" />
              <span className="pot" />
            </span>
            <span className="room__chair"><span className="chair__arm chair__arm--l" /><span className="chair__arm chair__arm--r" /><span className="chair__cushion" /></span>
            <span className="room__base" />
            <span className="room__floor"><span className="room__rug" /></span>
          </div>

          {/* Vorhänge */}
          <div className="rhero__curtains">
            <span className="curtain__rod" />
            <span className="curtain curtain--l" />
            <span className="curtain curtain--r" />
          </div>

          {/* kahle Wand + aufgerollte Farbe */}
          <div className="rhero__wall"><span className="rhero__paint" /></div>

          {/* nasse Farbkante + Tropfen */}
          <div className="rhero__edge">
            <span className="rhero__drip rhero__drip--1" />
            <span className="rhero__drip rhero__drip--2" />
            <span className="rhero__drip rhero__drip--3" />
            <span className="rhero__drip rhero__drip--4" />
          </div>

          {/* die (kleine, mittige) Rolle */}
          <div className="rhero__roller">
            <svg viewBox="0 0 200 150" width="200" height="150" role="img" aria-label="Farbrolle">
              <path d="M133 78 L133 118 Q133 128 123 128 L100 128" fill="none" stroke="#3b2c1c" strokeWidth="8" strokeLinecap="round" />
              <path d="M40 40 L133 40 L133 78" fill="none" stroke="#8a7d6b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="12" y="20" width="112" height="34" rx="17" fill="var(--copper)" />
              <rect x="12" y="20" width="112" height="34" rx="17" fill="url(#rg)" opacity="0.5" />
              <rect x="12" y="20" width="112" height="10" rx="5" fill="#ffffff" opacity="0.2" />
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#000000" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="rhero__caption">Wärme, die man sehen kann.</span>
        </div>

        <div className="container rhero__content">{children}</div>
        <span className="scroll-hint" aria-hidden>Runterwischen <span>↓</span></span>
      </div>
    </section>
  );
}
