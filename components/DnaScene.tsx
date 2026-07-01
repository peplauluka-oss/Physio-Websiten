"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const STEPS = 34;
const RADIUS = 1.9;
const GAP = 0.42;
const ANGLE_STEP = 0.42;

type Node = {
  y: number;
  angle: number;
  a: [number, number, number];
  b: [number, number, number];
};

function Helix() {
  const group = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  const nodes = useMemo<Node[]>(() => {
    const arr: Node[] = [];
    for (let i = 0; i < STEPS; i++) {
      const y = (i - STEPS / 2) * GAP;
      const angle = i * ANGLE_STEP;
      arr.push({
        y,
        angle,
        a: [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS],
        b: [Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS],
      });
    }
    return arr;
  }, []);

  // Warme Materialien passend zum Wellness-Look
  const matA = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d99e90", roughness: 0.3, metalness: 0.35, emissive: "#c67c6b", emissiveIntensity: 0.25 }),
    []
  );
  const matB = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#cbab7f", roughness: 0.28, metalness: 0.45, emissive: "#b08a55", emissiveIntensity: 0.25 }),
    []
  );
  const matRung = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f3e7d9", roughness: 0.5, metalness: 0.1 }),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // Ziel: Scroll-Fortschritt über das erste Viewport
    const target =
      typeof window !== "undefined"
        ? Math.min(window.scrollY / (window.innerHeight || 1), 1.2)
        : 0;
    // sanft nachziehen
    scrollRef.current += (target - scrollRef.current) * Math.min(delta * 4, 1);
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18 + p * Math.PI * 1.4;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.04 + 0.16;
    group.current.position.y = p * 2.2;
    const s = 1 - p * 0.12;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group} rotation={[0, 0, 0.16]}>
      {nodes.map((n, i) => (
        <group key={i}>
          <mesh position={n.a} material={matA} castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
          </mesh>
          <mesh position={n.b} material={matB} castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
          </mesh>
          <mesh position={[0, n.y, 0]} rotation={[0, -n.angle, 0]} material={matRung}>
            <boxGeometry args={[RADIUS * 2, 0.055, 0.055]} />
          </mesh>
        </group>
      ))}
      <Sparkles count={50} scale={[7, 9, 7]} size={3} speed={0.3} color="#e6c9a8" opacity={0.7} />
    </group>
  );
}

export default function DnaScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#fff3e6" />
      <pointLight position={[-5, -2, 3]} intensity={40} color="#d99e90" />
      <pointLight position={[5, 3, -4]} intensity={30} color="#cbab7f" />
      <Helix />
      <fog attach="fog" args={["#fbf6f0", 10, 20]} />
    </Canvas>
  );
}
