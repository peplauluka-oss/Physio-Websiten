"use client";

import { Component, ReactNode } from "react";
import dynamic from "next/dynamic";

const DnaJourneyScene = dynamic(() => import("./DnaJourneyScene"), {
  ssr: false,
  loading: () => null,
});

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Fixe 3D-Ebene, durch die die Journey-Seite scrollt. */
export default function DnaJourney() {
  return (
    <div className="journey__canvas" aria-hidden>
      <WebGLBoundary>
        <DnaJourneyScene />
      </WebGLBoundary>
    </div>
  );
}
