"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type SpineModelProps = {
  /** Anzahl der Wirbel */
  segments?: number;
  /** Vertikaler Abstand der Wirbel */
  pitch?: number;
  /** Stärke der natürlichen S-Krümmung (Lordose/Kyphose) */
  curveAmp?: number;
  /** Knochen-Grundfarbe (leuchtendes Elfenbeinweiß) */
  color?: string;
  /** Farbe der Bandscheiben (sichtbarer Kontrast wie beim Anatomie-Modell) */
  disc?: string;
  /** Leucht-/Emissive-Ton (passt sich der Theme-Atmosphäre an) */
  glow?: string;
  /** Emissive-Intensität */
  emissive?: number;
  /** Dezente Rippenpaare im Brustbereich zeigen */
  ribs?: boolean;
};

/**
 * Stilisierte Wirbelsäule nach Vorbild klassischer Anatomie-Modelle:
 * kräftige, rundliche Wirbelkörper (abgeflachte Kugeln) mit deutlich
 * sichtbaren, kontrastierenden Bandscheiben dazwischen, dazu weiche,
 * knubbelige Dorn- und Querfortsatz-Höcker statt spitzer Stacheln und
 * ein angedeutetes Kreuzbein am unteren Ende. Kompakte, "wohlfühlsame"
 * Knochenstruktur – bewusst dicker und kürzer proportioniert. Die Säule
 * folgt einer sanften anatomischen S-Krümmung und verjüngt sich nur
 * leicht nach oben. Keine Eigenanimation – die Szene bewegt die Gruppe.
 */
export default function SpineModel({
  segments = 14,
  pitch = 0.62,
  curveAmp = 0.42,
  color = "#fffdf8",
  disc = "#f4b8cd",
  glow = "#fff2f7",
  emissive = 0.5,
  ribs = true,
}: SpineModelProps) {
  // ---- Aufbau berechnen ------------------------------------------------
  const model = useMemo(() => {
    const zAt = (f: number) => curveAmp * Math.sin(f * Math.PI * 2.0 + 0.4);

    type Vert = { pos: THREE.Vector3; r: number; h: number };
    const verts: Vert[] = [];

    for (let i = 0; i < segments; i++) {
      const f = segments > 1 ? i / (segments - 1) : 0;
      const y = (i - (segments - 1) / 2) * pitch;
      const z = zAt(f);
      // kräftig & kaum verjüngt: unten ~0.95, oben ~0.62
      const r = 0.95 - 0.33 * f;
      const h = pitch * 0.62;
      verts.push({ pos: new THREE.Vector3(0, y, z), r, h });
    }

    // Bandscheiben mittig zwischen den Wirbelkörpern
    const discs = verts.slice(0, -1).map((v, i) => {
      const next = verts[i + 1];
      const pos = v.pos.clone().add(next.pos).multiplyScalar(0.5);
      const r = Math.min(v.r, next.r) * 0.82;
      const h = pitch * 0.24;
      return { pos, r, h };
    });

    // Dezente Rippenbögen: drei Paare im mittleren (thorakalen) Bereich
    const ribGeoms: THREE.TubeGeometry[] = [];
    if (ribs) {
      const mid = Math.floor(segments * 0.55);
      const ribIdx = [mid - 2, mid, mid + 2].filter((i) => i > 0 && i < segments - 1);
      ribIdx.forEach((i, n) => {
        const v = verts[i];
        const reach = 1.35 - n * 0.12;
        for (const s of [-1, 1]) {
          const base = v.pos.clone().add(new THREE.Vector3(s * v.r * 0.85, 0, -v.r * 0.15));
          const p1 = v.pos.clone().add(new THREE.Vector3(s * (v.r + 0.75), -0.22, 0.25));
          const p2 = v.pos.clone().add(new THREE.Vector3(s * (v.r + 0.9) * reach * 0.62, -0.6, 0.85 * reach));
          const p3 = v.pos.clone().add(new THREE.Vector3(s * 0.5 * reach, -0.95, 1.3 * reach));
          const curve = new THREE.CatmullRomCurve3([base, p1, p2, p3]);
          ribGeoms.push(new THREE.TubeGeometry(curve, 24, 0.085, 8, false));
        }
      });
    }

    return { verts, discs, ribGeoms };
  }, [segments, pitch, curveAmp, ribs]);

  // ---- Materialien -----------------------------------------------------
  const boneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.48,
        metalness: 0.05,
        emissive: new THREE.Color(glow),
        emissiveIntensity: emissive,
      }),
    [color, glow, emissive]
  );
  const discMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: disc,
        roughness: 0.55,
        metalness: 0.02,
        emissive: new THREE.Color(disc),
        emissiveIntensity: emissive * 0.45,
      }),
    [disc, emissive]
  );

  // ---- Instanz-Matrizen ------------------------------------------------
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const discRef = useRef<THREE.InstancedMesh>(null);
  const spinRef = useRef<THREE.InstancedMesh>(null);
  const tvRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const d = new THREE.Object3D();
    d.quaternion.identity();

    // Wirbelkörper: abgeflachte Kugeln = rundlich-kräftige Knochenform
    if (bodyRef.current) {
      model.verts.forEach((v, i) => {
        d.position.copy(v.pos);
        d.scale.set(v.r, v.h, v.r * 0.92);
        d.updateMatrix();
        bodyRef.current!.setMatrixAt(i, d.matrix);
      });
      bodyRef.current.instanceMatrix.needsUpdate = true;
    }

    // Bandscheiben: flache, sichtbare Scheiben
    if (discRef.current) {
      model.discs.forEach((dc, i) => {
        d.position.copy(dc.pos);
        d.scale.set(dc.r, dc.h, dc.r * 0.92);
        d.updateMatrix();
        discRef.current!.setMatrixAt(i, d.matrix);
      });
      discRef.current.instanceMatrix.needsUpdate = true;
    }

    // Dornfortsatz-Höcker: weiche Knubbel nach hinten
    if (spinRef.current) {
      model.verts.forEach((v, i) => {
        d.position.copy(v.pos).add(new THREE.Vector3(0, -v.h * 0.15, -v.r * 1.12));
        d.scale.set(v.r * 0.34, v.r * 0.3, v.r * 0.62);
        d.updateMatrix();
        spinRef.current!.setMatrixAt(i, d.matrix);
      });
      spinRef.current.instanceMatrix.needsUpdate = true;
    }

    // Querfortsatz-Höcker: kleine seitliche Knubbel
    if (tvRef.current) {
      let k = 0;
      model.verts.forEach((v) => {
        for (const s of [-1, 1]) {
          d.position.copy(v.pos).add(new THREE.Vector3(s * v.r * 1.08, 0, -v.r * 0.28));
          d.scale.set(v.r * 0.42, v.r * 0.24, v.r * 0.3);
          d.updateMatrix();
          tvRef.current!.setMatrixAt(k++, d.matrix);
        }
      });
      tvRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [model]);

  const lowest = model.verts[0];

  return (
    <group>
      {/* Wirbelkörper */}
      <instancedMesh ref={bodyRef} args={[undefined, undefined, model.verts.length]} material={boneMat}>
        <sphereGeometry args={[1, 24, 18]} />
      </instancedMesh>
      {/* Bandscheiben */}
      <instancedMesh ref={discRef} args={[undefined, undefined, Math.max(1, model.discs.length)]} material={discMat}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
      </instancedMesh>
      {/* Dornfortsatz-Höcker */}
      <instancedMesh ref={spinRef} args={[undefined, undefined, model.verts.length]} material={boneMat}>
        <sphereGeometry args={[1, 14, 12]} />
      </instancedMesh>
      {/* Querfortsatz-Höcker */}
      <instancedMesh ref={tvRef} args={[undefined, undefined, model.verts.length * 2]} material={boneMat}>
        <sphereGeometry args={[1, 14, 12]} />
      </instancedMesh>
      {/* Angedeutetes Kreuzbein unten */}
      <mesh
        position={[lowest.pos.x, lowest.pos.y - pitch * 0.95, lowest.pos.z + 0.08]}
        rotation={[Math.PI, 0, 0]}
        material={boneMat}
      >
        <coneGeometry args={[lowest.r * 1.12, pitch * 1.5, 18]} />
      </mesh>
      {/* Rippenbögen */}
      {model.ribGeoms.map((g, i) => (
        <mesh key={i} geometry={g} material={boneMat} />
      ))}
    </group>
  );
}
