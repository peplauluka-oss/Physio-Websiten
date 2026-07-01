"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const STEPS = 120;
const RADIUS = 1.7;
const GAP = 0.5;
const ANGLE_STEP = 0.36;
const TOP = (STEPS / 2) * GAP;

type Node = { y: number; angle: number; a: [number, number, number]; b: [number, number, number] };

function Helix() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);

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

  const matA = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d99e90", roughness: 0.3, metalness: 0.35, emissive: "#c67c6b", emissiveIntensity: 0.3 }), []);
  const matB = useMemo(() => new THREE.MeshStandardMaterial({ color: "#cbab7f", roughness: 0.28, metalness: 0.45, emissive: "#b08a55", emissiveIntensity: 0.3 }), []);
  const matRung = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f3e7d9", roughness: 0.5, metalness: 0.1 }), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const max =
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight || 1
        : 1;
    const target = typeof window !== "undefined" ? window.scrollY / max : 0;
    scroll.current += (target - scroll.current) * Math.min(delta * 3.5, 1);
    const p = scroll.current;
    // Kamera „reist" von oben nach unten durch die Helix
    group.current.position.y = -TOP + p * (2 * TOP);
    group.current.rotation.y = p * Math.PI * 4 + state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <group key={i}>
          <mesh position={n.a} material={matA}>
            <sphereGeometry args={[0.19, 20, 20]} />
          </mesh>
          <mesh position={n.b} material={matB}>
            <sphereGeometry args={[0.19, 20, 20]} />
          </mesh>
          <mesh position={[0, n.y, 0]} rotation={[0, -n.angle, 0]} material={matRung}>
            <boxGeometry args={[RADIUS * 2, 0.05, 0.05]} />
          </mesh>
        </group>
      ))}
      <Sparkles count={120} scale={[6, TOP * 2, 6]} size={2.5} speed={0.25} color="#e6c9a8" opacity={0.6} />
    </group>
  );
}

export default function DnaJourneyScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} color="#fff3e6" />
      <pointLight position={[-5, 0, 4]} intensity={45} color="#d99e90" />
      <pointLight position={[5, 2, -3]} intensity={32} color="#cbab7f" />
      <Helix />
      <fog attach="fog" args={["#fbf6f0", 8, 16]} />
    </Canvas>
  );
}
