"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";

export function FlowArrow({
  start,
  end,
  color = "#ffffff",
  opacity = 0.4,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const { tip1, tip2 } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const dir = e.clone().sub(s).normalize();
    const tipBase = e.clone().sub(dir.clone().multiplyScalar(0.25));
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(0.12);
    return {
      tip1: tipBase.clone().add(perp).toArray() as [number, number, number],
      tip2: tipBase.clone().sub(perp).toArray() as [number, number, number],
    };
  }, [start, end]);

  return (
    <group>
      <Line points={[start, end]} color={color} transparent opacity={opacity} lineWidth={1.5} />
      <Line points={[end, tip1]} color={color} transparent opacity={opacity} lineWidth={1.5} />
      <Line points={[end, tip2]} color={color} transparent opacity={opacity} lineWidth={1.5} />
    </group>
  );
}
