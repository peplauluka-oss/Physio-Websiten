"use client";

import { Component, ReactNode } from "react";
import dynamic from "next/dynamic";
import { useThemeMode } from "./useThemeMode";

const DnaScene = dynamic(() => import("./DnaScene"), { ssr: false, loading: () => null });
const PetalScene = dynamic(() => import("./PetalScene"), { ssr: false, loading: () => null });

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Hero-3D je nach Theme: DNA-Helix (Warm/Cinematic) oder
 * schwebende Blüten/Bokeh (Blüte/Cozy). Fällt bei WebGL-Fehlern sauber weg.
 */
export default function DnaHero() {
  const mode = useThemeMode();
  const Scene = mode === "blossom" || mode === "cozy" ? PetalScene : DnaScene;
  return (
    <div className="dna-canvas" aria-hidden>
      <WebGLBoundary>
        <Scene />
      </WebGLBoundary>
    </div>
  );
}
