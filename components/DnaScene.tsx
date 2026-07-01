"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import DnaModel from "./DnaModel";

function Helix() {
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
      <DnaModel steps={30} radius={1.9} gap={0.42} angleStep={0.42} tube={0.08} emissive={0.3} />
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
