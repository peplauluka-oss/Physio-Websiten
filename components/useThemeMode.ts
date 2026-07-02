"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "warm" | "cinematic" | "blossom" | "cozy";

export const THEMES: { id: ThemeMode; label: string }[] = [
  { id: "warm", label: "Warm" },
  { id: "cinematic", label: "Cinematic" },
  { id: "blossom", label: "Blüte" },
  { id: "cozy", label: "Cozy" },
];

const KNOWN = new Set<ThemeMode>(["warm", "cinematic", "blossom", "cozy"]);

function readTheme(): ThemeMode {
  const t = document.documentElement.dataset.theme as ThemeMode | undefined;
  return t && KNOWN.has(t) ? t : "warm";
}

/** Liest das aktuelle Theme von <html data-theme> und aktualisiert bei Wechsel. */
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>("warm");

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setMode(readTheme());
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return mode;
}
