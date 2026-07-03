"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FLOW_PATH } from "@/lib/cognitive-model";

const PARTICLE_COUNT = 40;

export function FlowParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(FLOW_PATH.map((p) => new THREE.Vector3(...p))),
    [],
  );

  const { positions, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const offsets = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      offsets[i] = i / PARTICLE_COUNT;
    }
    return { positions, offsets };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime * 0.06;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const progress = (offsets[i] + t) % 1;
      const point = curve.getPoint(progress);
      posAttr.setXYZ(i, point.x, point.y, point.z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
