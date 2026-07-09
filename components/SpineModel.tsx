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
  /** Farbe der Bandscheiben */
  disc?: string;
  /** Leucht-/Emissive-Ton (passt sich der Theme-Atmosphäre an) */
  glow?: string;
  /** Emissive-Intensität */
  emissive?: number;
  /** Brustkorb-Rippen im Thoraxbereich zeigen */
  ribs?: boolean;
};

const UP = new THREE.Vector3(0, 1, 0);

/**
 * Prozedurale, stilisierte Wirbelsäule: gestapelte Wirbel (Wirbelkörper +
 * Bandscheiben), nach hinten gerichtete Dornfortsätze, seitliche Querfortsätze
 * und – im mittleren (thorakalen) Bereich – nach vorn schwingende Rippen. Die
 * Säule folgt einer sanften anatomischen S-Krümmung und verjüngt sich nach oben
 * (unten lumbal kräftig, oben zervikal fein). Keine Eigenanimation – die Szene
 * rotiert/bewegt die Gruppe.
 */
export default function SpineModel({
  segments = 22,
  pitch = 0.5,
  curveAmp = 0.45,
  color = "#f6efe4",
  disc = "#f3dfe6",
  glow = "#fff2f7",
  emissive = 0.5,
  ribs = true,
}: SpineModelProps) {
  // ---- Geometrie & Transforme berechnen -------------------------------
  const model = useMemo(() => {
    const zAt = (f: number) => curveAmp * Math.sin(f * Math.PI * 2.2 + 0.3);

    type Vert = {
      pos: THREE.Vector3;
      bodyR: number;
      bodyH: number;
      region: "lumbar" | "thoracic" | "cervical";
    };

    const verts: Vert[] = [];
    const lumbarEnd = Math.round(segments * 0.24); // unten
    const thoracicEnd = Math.round(segments * 0.74); // mitte

    for (let i = 0; i < segments; i++) {
      const f = segments > 1 ? i / (segments - 1) : 0;
      const y = (i - (segments - 1) / 2) * pitch;
      const z = zAt(f);
      const bodyR = 0.6 - 0.29 * f;
      const bodyH = pitch * (0.72 - 0.18 * f);
      const region = i < lumbarEnd ? "lumbar" : i < thoracicEnd ? "thoracic" : "cervical";
      verts.push({ pos: new THREE.Vector3(0, y, z), bodyR, bodyH, region });
    }

    // Bandscheiben zwischen den Wirbelkörpern
    const discs = verts.slice(0, -1).map((v, i) => {
      const a = v.pos;
      const b = verts[i + 1].pos;
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dir = b.clone().sub(a);
      const len = dir.length();
      const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
      const r = Math.max(v.bodyR, verts[i + 1].bodyR) * 0.98;
      return { pos: mid, quat: q, r, len };
    });

    // Dornfortsätze (nach hinten-unten) und Querfortsätze (seitlich-hinten)
    const spinousDir = new THREE.Vector3(0, -0.42, -1).normalize();
    const spinousQuat = new THREE.Quaternion().setFromUnitVectors(UP, spinousDir);
    const tvLeftDir = new THREE.Vector3(-1, 0.02, -0.32).normalize();
    const tvRightDir = new THREE.Vector3(1, 0.02, -0.32).normalize();
    const tvLeftQuat = new THREE.Quaternion().setFromUnitVectors(UP, tvLeftDir);
    const tvRightQuat = new THREE.Quaternion().setFromUnitVectors(UP, tvRightDir);

    // Rippen (Thoraxbereich): sanft nach außen, vorn und unten schwingende Röhren
    const ribGeoms: THREE.TubeGeometry[] = [];
    if (ribs) {
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        if (v.region !== "thoracic") continue;
        // wie weit die Rippe nach vorn schließt (obere Rippen weiter)
        const tf = (thoracicEnd - i) / Math.max(1, thoracicEnd - lumbarEnd); // ~1 oben .. 0 unten
        const reach = 1.1 + tf * 0.9;
        for (const s of [-1, 1]) {
          const base = v.pos.clone().add(new THREE.Vector3(s * v.bodyR * 0.9, 0.02, -v.bodyR * 0.2));
          const p1 = v.pos.clone().add(new THREE.Vector3(s * (v.bodyR + 0.85), -0.28, v.pos.z * 0 + 0.15));
          const p2 = v.pos.clone().add(new THREE.Vector3(s * (v.bodyR + 1.15) * reach * 0.7, -0.8, 0.85 * reach));
          const p3 = v.pos.clone().add(new THREE.Vector3(s * 0.55 * reach, -1.25, 1.5 * reach));
          const curve = new THREE.CatmullRomCurve3([base, p1, p2, p3]);
          ribGeoms.push(new THREE.TubeGeometry(curve, 26, 0.05, 7, false));
        }
      }
    }

    return { verts, discs, spinousQuat, tvLeftQuat, tvRightQuat, ribGeoms };
  }, [segments, pitch, curveAmp, ribs]);

  // ---- Materialien ----------------------------------------------------
  const boneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.42,
        metalness: 0.08,
        emissive: new THREE.Color(glow),
        emissiveIntensity: emissive,
      }),
    [color, glow, emissive]
  );
  const discMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: disc,
        roughness: 0.7,
        metalness: 0.02,
        emissive: new THREE.Color(glow),
        emissiveIntensity: emissive * 0.35,
        transparent: true,
        opacity: 0.9,
      }),
    [disc, glow, emissive]
  );

  // ---- Instanz-Matrizen setzen ---------------------------------------
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const discRef = useRef<THREE.InstancedMesh>(null);
  const spinRef = useRef<THREE.InstancedMesh>(null);
  const tvRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const d = new THREE.Object3D();
    const noRot = new THREE.Quaternion();

    if (bodyRef.current) {
      model.verts.forEach((v, i) => {
        d.position.copy(v.pos);
        d.quaternion.copy(noRot);
        d.scale.set(v.bodyR, v.bodyH, v.bodyR);
        d.updateMatrix();
        bodyRef.current!.setMatrixAt(i, d.matrix);
      });
      bodyRef.current.instanceMatrix.needsUpdate = true;
    }

    if (discRef.current) {
      model.discs.forEach((dc, i) => {
        d.position.copy(dc.pos);
        d.quaternion.copy(dc.quat);
        d.scale.set(dc.r, dc.len, dc.r);
        d.updateMatrix();
        discRef.current!.setMatrixAt(i, d.matrix);
      });
      discRef.current.instanceMatrix.needsUpdate = true;
    }

    if (spinRef.current) {
      model.verts.forEach((v, i) => {
        const len = v.bodyR * 1.7;
        const offset = new THREE.Vector3(0, -0.42, -1).normalize().multiplyScalar(len * 0.5);
        d.position.copy(v.pos).add(offset).add(new THREE.Vector3(0, 0, -v.bodyR * 0.7));
        d.quaternion.copy(model.spinousQuat);
        d.scale.set(v.bodyR * 0.34, len, v.bodyR * 0.34);
        d.updateMatrix();
        spinRef.current!.setMatrixAt(i, d.matrix);
      });
      spinRef.current.instanceMatrix.needsUpdate = true;
    }

    if (tvRef.current) {
      let k = 0;
      const dirs = [
        { q: model.tvLeftQuat, v: new THREE.Vector3(-1, 0.02, -0.32).normalize() },
        { q: model.tvRightQuat, v: new THREE.Vector3(1, 0.02, -0.32).normalize() },
      ];
      model.verts.forEach((v) => {
        const len = v.bodyR * 1.15;
        for (const dir of dirs) {
          const offset = dir.v.clone().multiplyScalar(v.bodyR * 0.6 + len * 0.5);
          d.position.copy(v.pos).add(offset);
          d.quaternion.copy(dir.q);
          d.scale.set(v.bodyR * 0.26, len, v.bodyR * 0.26);
          d.updateMatrix();
          tvRef.current!.setMatrixAt(k++, d.matrix);
        }
      });
      tvRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [model]);

  return (
    <group>
      {/* Wirbelkörper */}
      <instancedMesh ref={bodyRef} args={[undefined, undefined, model.verts.length]} material={boneMat}>
        <cylinderGeometry args={[1, 1, 1, 22]} />
      </instancedMesh>
      {/* Bandscheiben */}
      <instancedMesh ref={discRef} args={[undefined, undefined, Math.max(1, model.discs.length)]} material={discMat}>
        <cylinderGeometry args={[1, 1, 1, 22]} />
      </instancedMesh>
      {/* Dornfortsätze */}
      <instancedMesh ref={spinRef} args={[undefined, undefined, model.verts.length]} material={boneMat}>
        <coneGeometry args={[1, 1, 10]} />
      </instancedMesh>
      {/* Querfortsätze */}
      <instancedMesh ref={tvRef} args={[undefined, undefined, model.verts.length * 2]} material={boneMat}>
        <coneGeometry args={[1, 1, 8]} />
      </instancedMesh>
      {/* Rippen */}
      {model.ribGeoms.map((g, i) => (
        <mesh key={i} geometry={g} material={boneMat} />
      ))}
    </group>
  );
}
