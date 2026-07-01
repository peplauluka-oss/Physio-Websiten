"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "warm" | "cinematic";

/** Liest das aktuelle Theme von <html data-theme> und aktualisiert bei Wechsel. */
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>("warm");

  useEffect(() => {
    const el = document.documentElement;
    const read = () =>
      setMode(el.dataset.theme === "cinematic" ? "cinematic" : "warm");
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return mode;
}
