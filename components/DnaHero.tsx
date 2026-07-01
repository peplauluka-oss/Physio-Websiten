"use client";

import { Component, ReactNode } from "react";
import dynamic from "next/dynamic";

const DnaScene = dynamic(() => import("./DnaScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Fängt WebGL-/3D-Fehler ab und zeigt dann nur den warmen Hintergrund-
 * Verlauf – die Seite bleibt so immer intakt.
 */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function DnaHero() {
  return (
    <div className="dna-canvas" aria-hidden>
      <WebGLBoundary>
        <DnaScene />
      </WebGLBoundary>
    </div>
  );
}
