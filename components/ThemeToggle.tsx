"use client";

import { useEffect, useState } from "react";
import type { ThemeMode } from "./useThemeMode";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("warm");

  useEffect(() => {
    setMode(document.documentElement.dataset.theme === "cinematic" ? "cinematic" : "warm");
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "cinematic" ? "warm" : "cinematic";
    const el = document.documentElement;
    el.classList.add("theme-anim");
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setMode(next);
    window.setTimeout(() => el.classList.remove("theme-anim"), 700);
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={mode === "cinematic" ? "Zu warmem Design wechseln" : "Zu cinematischem Design wechseln"}
      title="Design wechseln"
    >
      <span className="theme-toggle__dot" />
      {mode === "cinematic" ? "Cinematic" : "Warm"}
    </button>
  );
}
