"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import DnaModel from "./DnaModel";
import { useThemeMode } from "./useThemeMode";

const PALETTES = {
  warm: { a: "#e0a99a", b: "#d9b783", rung: "#f0e2d0", emissive: 0.32, sparkle: "#e6c9a8", l1: "#d99e90", l2: "#cbab7f", key: "#fff3e6", bg: "#fbf6f0" },
  cinematic: { a: "#a855f7", b: "#4f7bff", rung: "#7dd3fc", emissive: 0.7, sparkle: "#8bd6ff", l1: "#a855f7", l2: "#4f7bff", key: "#dfe7ff", bg: "#0a0a16" },
};

function Helix({ colorA, colorB, colorRung, emissive, sparkle }: { colorA: string; colorB: string; colorRung: string; emissive: number; sparkle: string }) {
  const group = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const target =
      typeof window !== "undefined"
        ? Math.min(window.scrollY / (window.innerHeight || 1), 1.2)
        : 0;
    scrollRef.current += (target - scrollRef.current) * Math.min(delta * 4, 1);
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.16 + p * Math.PI * 1.3;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.04 + 0.16;
    group.current.position.y = p * 2.2;
    group.current.scale.setScalar(1 - p * 0.12);
  });

  return (
    <group ref={group} rotation={[0, 0, 0.16]}>
      <DnaModel steps={30} radius={1.9} gap={0.42} angleStep={0.42} tube={0.08} colorA={colorA} colorB={colorB} colorRung={colorRung} emissive={emissive} />
      <Sparkles count={50} scale={[7, 9, 7]} size={3} speed={0.3} color={sparkle} opacity={0.7} />
    </group>
  );
}

export default function DnaScene() {
  const mode = useThemeMode();
  const p = PALETTES[mode];
  const dark = mode === "cinematic";

  return (
    <Canvas
      key={mode}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: !dark }}
      style={{ pointerEvents: "none" }}
    >
      {dark && <color attach="background" args={[p.bg]} />}
      <fog attach="fog" args={[p.bg, 10, 20]} />
      <ambientLight intensity={dark ? 0.35 : 0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.0} color={p.key} />
      <pointLight position={[-5, -2, 3]} intensity={dark ? 60 : 40} color={p.l1} />
      <pointLight position={[5, 3, -4]} intensity={dark ? 45 : 30} color={p.l2} />
      <Helix colorA={p.a} colorB={p.b} colorRung={p.rung} emissive={p.emissive} sparkle={p.sparkle} />
      {dark && (
        <EffectComposer>
          <Bloom intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
