"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type DnaModelProps = {
  steps?: number;
  radius?: number;
  gap?: number;
  angleStep?: number;
  tube?: number;
  colorA?: string;
  colorB?: string;
  colorRung?: string;
  emissive?: number;
};

/**
 * Realistische DNA-Doppelhelix: zwei durchgehende Backbone-Stränge
 * (TubeGeometry entlang einer Helix-Kurve), Nukleotid-Kugeln und
 * Basenpaar-Sprossen. Keine Animation – die Szene animiert die Gruppe.
 */
export default function DnaModel({
  steps = 90,
  radius = 1.7,
  gap = 0.5,
  angleStep = 0.34,
  tube = 0.075,
  colorA = "#e0a99a",
  colorB = "#d9b783",
  colorRung = "#f0e2d0",
  emissive = 0.35,
}: DnaModelProps) {
  const { tubeA, tubeB, count, positions } = useMemo(() => {
    const ptsA: THREE.Vector3[] = [];
    const ptsB: THREE.Vector3[] = [];
    const positions: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < steps; i++) {
      const y = (i - steps / 2) * gap;
      const angle = i * angleStep;
      const a = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const b = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      ptsA.push(a);
      ptsB.push(b);
      positions.push({ a, b });
    }
    const curveA = new THREE.CatmullRomCurve3(ptsA);
    const curveB = new THREE.CatmullRomCurve3(ptsB);
    const tubeA = new THREE.TubeGeometry(curveA, steps * 4, tube, 10, false);
    const tubeB = new THREE.TubeGeometry(curveB, steps * 4, tube, 10, false);
    return { tubeA, tubeB, count: steps, positions };
  }, [steps, radius, gap, angleStep, tube]);

  const matA = useMemo(() => new THREE.MeshStandardMaterial({ color: colorA, roughness: 0.35, metalness: 0.4, emissive: colorA, emissiveIntensity: emissive }), [colorA, emissive]);
  const matB = useMemo(() => new THREE.MeshStandardMaterial({ color: colorB, roughness: 0.32, metalness: 0.5, emissive: colorB, emissiveIntensity: emissive }), [colorB, emissive]);
  const matNode = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.25, metalness: 0.3, emissive: colorRung, emissiveIntensity: emissive * 0.9 }), [colorRung, emissive]);
  const matRung = useMemo(() => new THREE.MeshStandardMaterial({ color: colorRung, roughness: 0.5, metalness: 0.15, emissive: colorRung, emissiveIntensity: emissive * 0.5 }), [colorRung, emissive]);

  const nodeRef = useRef<THREE.InstancedMesh>(null);
  const rungRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    // Nukleotid-Kugeln an beiden Strängen
    if (nodeRef.current) {
      let k = 0;
      for (const { a, b } of positions) {
        for (const pt of [a, b]) {
          dummy.position.copy(pt);
          dummy.scale.setScalar(1);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          nodeRef.current.setMatrixAt(k++, dummy.matrix);
        }
      }
      nodeRef.current.instanceMatrix.needsUpdate = true;
    }
    // Basenpaar-Sprossen (Zylinder zwischen den Strängen)
    if (rungRef.current) {
      let k = 0;
      for (const { a, b } of positions) {
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const dir = b.clone().sub(a);
        const len = dir.length();
        dummy.position.copy(mid);
        dummy.quaternion.setFromUnitVectors(up, dir.clone().normalize());
        dummy.scale.set(1, len, 1);
        dummy.updateMatrix();
        rungRef.current.setMatrixAt(k++, dummy.matrix);
      }
      rungRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions]);

  return (
    <group>
      <mesh geometry={tubeA} material={matA} />
      <mesh geometry={tubeB} material={matB} />
      <instancedMesh ref={nodeRef} args={[undefined, undefined, count * 2]} material={matNode}>
        <sphereGeometry args={[0.16, 16, 16]} />
      </instancedMesh>
      <instancedMesh ref={rungRef} args={[undefined, undefined, count]} material={matRung}>
        <cylinderGeometry args={[0.035, 0.035, 1, 8]} />
      </instancedMesh>
    </group>
  );
}
