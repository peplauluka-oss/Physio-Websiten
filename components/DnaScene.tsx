"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SpineModel from "./SpineModel";
import { useThemeMode, type ThemeMode } from "./useThemeMode";

type Pal = {
  a: string; b: string; rung: string; emissive: number;
  spark: string; l1: string; l2: string; key: string; bg: string;
  dark?: boolean; feminine?: boolean; petals?: string[];
};

const PALETTES: Record<ThemeMode, Pal> = {
  warm: { a: "#e0a99a", b: "#d9b783", rung: "#f0e2d0", emissive: 0.32, spark: "#e6c9a8", l1: "#d99e90", l2: "#cbab7f", key: "#fff3e6", bg: "#fbf6f0" },
  cinematic: { a: "#a855f7", b: "#4f7bff", rung: "#7dd3fc", emissive: 0.7, spark: "#8bd6ff", l1: "#a855f7", l2: "#4f7bff", key: "#dfe7ff", bg: "#0a0a16", dark: true },
  blossom: { a: "#f2a3c4", b: "#c9a7e8", rung: "#ffe1ec", emissive: 0.34, spark: "#ffd6ea", l1: "#f4a6c4", l2: "#c9a7e8", key: "#ffe9f2", bg: "#fff5f8", feminine: true, petals: ["#f8b5cf", "#e7b3ef", "#ffd1e0", "#c9a7e8"] },
  cozy: { a: "#e0a58c", b: "#e6c48f", rung: "#f4e6d2", emissive: 0.32, spark: "#f4dcb8", l1: "#e0a58c", l2: "#e6c48f", key: "#ffe9cf", bg: "#f7efe4", feminine: true, petals: ["#e8b79c", "#d99a7f", "#f0d9c0", "#e6c48f"] },
};

/** Zarte, treibende Blütenblätter (nur in den femininen Themes). */
function PetalField({ colors }: { colors: string[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 26;
  const data = useMemo(
    () => Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 11, z: (Math.random() - 0.5) * 4,
      r: Math.random() * Math.PI, s: 0.13 + Math.random() * 0.2, spin: (Math.random() - 0.5) * 0.6,
      rise: 0.2 + Math.random() * 0.4, sway: Math.random() * Math.PI * 2,
    })), []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const c = new THREE.Color();
    data.forEach((_, i) => ref.current!.setColorAt(i, c.set(colors[i % colors.length])));
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [data, colors]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      d.y += d.rise * delta; if (d.y > 6.5) d.y = -6.5;
      dummy.position.set(d.x + Math.sin(t * 0.4 + d.sway) * 0.6, d.y, d.z);
      dummy.rotation.set(d.r + t * d.spin, d.r + t * d.spin * 0.6, d.r);
      dummy.scale.set(d.s, d.s * 0.36, d.s * 0.72);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial roughness={0.5} metalness={0.05} transparent opacity={0.8} />
    </instancedMesh>
  );
}

function Helix({ p }: { p: Pal }) {
  const group = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  useFrame((state, delta) => {
    if (!group.current) return;
    const target = typeof window !== "undefined" ? Math.min(window.scrollY / (window.innerHeight || 1), 1.2) : 0;
    scrollRef.current += (target - scrollRef.current) * Math.min(delta * 4, 1);
    const s = scrollRef.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.16 + s * Math.PI * 1.3;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.04 + 0.16;
    group.current.position.y = s * 2.2;
    group.current.scale.setScalar(1 - s * 0.12);
  });
  return (
    <group ref={group} rotation={[0, 0, 0.16]}>
      <group scale={0.68}>
        <SpineModel
          segments={12}
          pitch={0.64}
          curveAmp={0.4}
          color={p.dark ? "#fffdf8" : "#f9efdf"}
          disc={p.dark ? "#f2a8c4" : "#dc7fa6"}
          glow={p.key}
          emissive={p.dark ? 0.9 : 0.3}
          ribs
        />
      </group>
      <Sparkles count={50} scale={[7, 9, 7]} size={3} speed={0.3} color={p.spark} opacity={0.7} />
      {p.feminine && p.petals && <PetalField colors={p.petals} />}
    </group>
  );
}

export default function DnaScene() {
  const mode = useThemeMode();
  const p = PALETTES[mode] ?? PALETTES.warm;

  return (
    <Canvas
      key={mode}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: !p.dark }}
      style={{ pointerEvents: "none" }}
    >
      {p.dark && <color attach="background" args={[p.bg]} />}
      <fog attach="fog" args={[p.bg, 10, 20]} />
      <ambientLight intensity={p.dark ? 0.35 : 0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.0} color={p.key} />
      <pointLight position={[-5, -2, 3]} intensity={p.dark ? 60 : 40} color={p.l1} />
      <pointLight position={[5, 3, -4]} intensity={p.dark ? 45 : 30} color={p.l2} />
      <Helix p={p} />
      <EffectComposer>
        <Bloom
          intensity={p.dark ? 0.85 : 0.3}
          luminanceThreshold={p.dark ? 0.15 : 0.78}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </Canvas>
  );
}
