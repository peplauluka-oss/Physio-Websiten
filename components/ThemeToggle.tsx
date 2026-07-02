"use client";

import { useEffect, useState } from "react";
import { THEMES, type ThemeMode } from "./useThemeMode";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("warm");

  useEffect(() => {
    const t = document.documentElement.dataset.theme as ThemeMode | undefined;
    setMode(t && THEMES.some((x) => x.id === t) ? t : "warm");
  }, []);

  function next() {
    const idx = THEMES.findIndex((t) => t.id === mode);
    const nextTheme = THEMES[(idx + 1) % THEMES.length].id;
    const el = document.documentElement;
    el.classList.add("theme-anim");
    el.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}
    setMode(nextTheme);
    window.setTimeout(() => el.classList.remove("theme-anim"), 700);
  }

  const label = THEMES.find((t) => t.id === mode)?.label ?? "Warm";

  return (
    <button
      className="theme-toggle"
      onClick={next}
      aria-label="Design wechseln"
      title="Design wechseln (4 Varianten)"
    >
      <span className="theme-toggle__dot" />
      {label}
    </button>
  );
}
