"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SpineModel from "./SpineModel";
import { useThemeMode } from "./useThemeMode";

const SEG = 40;
const PITCH = 0.62;
const TOP = (SEG * PITCH) / 2;

const PALETTES: Record<string, { a: string; b: string; rung: string; l1: string; l2: string; bg: string }> = {
  warm: { a: "#e6a48f", b: "#e0c07f", rung: "#f4e6d2", l1: "#e6947f", l2: "#d9b783", bg: "#0b0908" },
  cinematic: { a: "#a855f7", b: "#4f7bff", rung: "#7dd3fc", l1: "#a855f7", l2: "#4f7bff", bg: "#08080f" },
  blossom: { a: "#f48fb1", b: "#c9a7e8", rung: "#ffe1ec", l1: "#f48fb1", l2: "#c9a7e8", bg: "#160b12" },
  cozy: { a: "#d98c74", b: "#c99a63", rung: "#f3ded0", l1: "#d98c74", l2: "#c99a63", bg: "#130d08" },
};

function Traveller({ colorRung }: { colorRung: string }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const max =
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight || 1
        : 1;
    const target = typeof window !== "undefined" ? window.scrollY / max : 0;
    scroll.current += (target - scroll.current) * Math.min(delta * 2.2, 1);
    const p = scroll.current;
    group.current.position.y = -TOP + p * (2 * TOP);
    group.current.rotation.y = p * Math.PI * 2 + state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={group}>
      <SpineModel segments={SEG} pitch={PITCH} curveAmp={0.6} glow={colorRung} emissive={0.75} ribs />
    </group>
  );
}

export default function DnaJourneyScene() {
  const mode = useThemeMode();
  const p = PALETTES[mode] ?? PALETTES.warm;

  return (
    <Canvas key={mode} dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 46 }} gl={{ antialias: true }}>
      <color attach="background" args={[p.bg]} />
      <fog attach="fog" args={[p.bg, 6, 15]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 6]} intensity={0.8} color="#ffe9d0" />
      <pointLight position={[-4, 0, 4]} intensity={55} color={p.l1} />
      <pointLight position={[4, 2, -2]} intensity={40} color={p.l2} />
      <Traveller colorRung={p.rung} />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
