"use client";

import { Component, ReactNode } from "react";
import dynamic from "next/dynamic";

const DnaScene = dynamic(() => import("./DnaScene"), { ssr: false, loading: () => null });

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
 * Hero-3D: das DNA-Modell ist auf der Landing Page in JEDEM Theme präsent –
 * in Warm/Cinematic in ihren Tönen, in Blüte/Cozy in warmen, femininen Farben
 * plus zart schwebende Blütenblätter. Fällt bei WebGL-Fehlern sauber weg.
 */
export default function DnaHero() {
  return (
    <div className="dna-canvas" aria-hidden>
      <WebGLBoundary>
        <DnaScene />
      </WebGLBoundary>
    </div>
  );
}
