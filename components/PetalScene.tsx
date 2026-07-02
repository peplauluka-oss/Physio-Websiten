"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useThemeMode } from "./useThemeMode";

const PALS: Record<string, { colors: string[]; sparkle: string; light: string }> = {
  blossom: { colors: ["#f8b5cf", "#e7b3ef", "#ffd1e0", "#c9a7e8", "#ffc2d6"], sparkle: "#ffd6ea", light: "#ffe3ef" },
  cozy: { colors: ["#e8b79c", "#d99a7f", "#f0d9c0", "#e6c48f", "#e9b98f"], sparkle: "#f4dcb8", light: "#ffe9cf" },
};

const COUNT = 64;

function Petals({ colors }: { colors: string[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const scroll = useRef(0);

  const data = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 13,
        z: (Math.random() - 0.5) * 6,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        s: 0.14 + Math.random() * 0.24,
        spin: (Math.random() - 0.5) * 0.7,
        rise: 0.25 + Math.random() * 0.55,
        sway: Math.random() * Math.PI * 2,
      })),
    []
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
    // sanfter Scroll-Einfluss
    const target = typeof window !== "undefined" ? window.scrollY / (window.innerHeight || 1) : 0;
    scroll.current += (target - scroll.current) * Math.min(delta * 3, 1);
    data.forEach((d, i) => {
      d.y += (d.rise + scroll.current * 0.6) * delta;
      if (d.y > 7.5) d.y = -7.5;
      const x = d.x + Math.sin(t * 0.4 + d.sway) * 0.7;
      dummy.position.set(x, d.y, d.z);
      dummy.rotation.set(d.rx + t * d.spin, d.ry + t * d.spin * 0.7, d.rz + t * d.spin * 0.4);
      dummy.scale.set(d.s, d.s * 0.36, d.s * 0.72);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 14, 14]} />
      <meshStandardMaterial roughness={0.5} metalness={0.05} transparent opacity={0.82} />
    </instancedMesh>
  );
}

export default function PetalScene() {
  const mode = useThemeMode();
  const p = PALS[mode] ?? PALS.blossom;

  return (
    <Canvas
      key={mode}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 8], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 5, 5]} intensity={0.9} color={p.light} />
      <pointLight position={[-4, -2, 4]} intensity={22} color={p.light} />
      <Petals colors={p.colors} />
      <Sparkles count={70} scale={[12, 9, 6]} size={4} speed={0.25} color={p.sparkle} opacity={0.8} />
    </Canvas>
  );
}
