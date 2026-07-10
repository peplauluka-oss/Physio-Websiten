"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Intro nach Referenzvideo, in 3 scroll-GESTARTETEN Abschnitten:
 *   Phase 1  Die kleine Farbrolle streicht eine rollenbreite BAHN
 *            in der Bildschirmmitte von oben nach unten (Wand bleibt
 *            drumherum sichtbar – wie im Video).
 *   Phase 2  Weiches Morphen: die Bahn weitet sich zur vollen Breite,
 *            Stofffalten wachsen sanft ein, oben blendet die
 *            Vorhangstange ein.
 *   Phase 3  Die Vorhänge gleiten zur Seite und geben den warmen,
 *            illustrierten Raum frei; danach erscheint der Hero-Text.
 *
 * Steuerung: Runterwischen überschreitet eine Schwelle und STARTET den
 * jeweils nächsten Abschnitt – der läuft dann von selbst flüssig zu Ende
 * (CSS-Transitions mit fester Dauer, dadurch auch sauber rückwärts).
 * prefers-reduced-motion zeigt sofort den fertigen Zustand.
 */

const THRESHOLDS = [0.1, 0.42, 0.72];
const HYST = 0.05;

export default function PaintRollerHero({ children }: { children: ReactNode }) {
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const sec = secRef.current;
    const stage = stageRef.current;
    if (!sec || !stage) return;

    const setPhase = (ph: number) => {
      if (ph === phaseRef.current) return;
      phaseRef.current = ph;
      ph >= 1 ? stage.setAttribute("data-p1", "") : stage.removeAttribute("data-p1");
      ph >= 2 ? stage.setAttribute("data-p2", "") : stage.removeAttribute("data-p2");
      ph >= 3 ? stage.setAttribute("data-p3", "") : stage.removeAttribute("data-p3");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sec.style.height = "100svh";
      setPhase(3);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const total = sec.offsetHeight - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / total)) : 1;
      let ph = phaseRef.current;
      while (ph < 3 && p >= THRESHOLDS[ph]) ph++;
      while (ph > 0 && p < THRESHOLDS[ph - 1] - HYST) ph--;
      setPhase(ph);
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
          {/* warmer, illustrierter Raum hinter allem */}
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

          {/* kahle Wand – bleibt um die Farbbahn herum sichtbar */}
          <div className="rhero__wall" />

          {/* Farbbahn (Phase 1) → Vorhang (Phase 2) → öffnet sich (Phase 3) */}
          <div className="band">
            <div className="bandclip">
              <span className="half half--l" />
              <span className="half half--r" />
            </div>
            <div className="bandedge">
              <span className="drip drip--1" />
              <span className="drip drip--2" />
              <span className="drip drip--3" />
            </div>
          </div>

          {/* Vorhangstange (blendet am Ende von Phase 2 ein) */}
          <div className="curtainrod" />

          {/* die kleine Farbrolle */}
          <div className="rroller">
            <svg viewBox="0 0 230 170" role="img" aria-label="Farbrolle">
              <defs>
                <linearGradient id="rsleeve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e2854f" />
                  <stop offset="0.45" stopColor="#c65d30" />
                  <stop offset="1" stopColor="#96401c" />
                </linearGradient>
                <linearGradient id="rgrip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e8a668" />
                  <stop offset="1" stopColor="#b06c33" />
                </linearGradient>
              </defs>
              <rect x="18" y="16" width="150" height="46" rx="23" fill="url(#rsleeve)" />
              <rect x="26" y="21" width="134" height="11" rx="5.5" fill="#ffffff" opacity="0.22" />
              <ellipse cx="162" cy="39" rx="7" ry="21" fill="#7c3312" opacity="0.45" />
              <path d="M166 39 h24 c9 0 13 6 13 13 v36 c0 8 -6 13 -13 13 h-1" fill="none" stroke="#9aa0a6" strokeWidth="7" strokeLinecap="round" />
              <rect x="180" y="103" width="18" height="9" rx="4" fill="#6d7276" />
              <rect x="178" y="111" width="22" height="48" rx="10" fill="url(#rgrip)" />
              <rect x="183" y="121" width="12" height="3" rx="1.5" fill="#8a5426" opacity="0.55" />
              <rect x="183" y="129" width="12" height="3" rx="1.5" fill="#8a5426" opacity="0.55" />
              <rect x="183" y="137" width="12" height="3" rx="1.5" fill="#8a5426" opacity="0.55" />
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
