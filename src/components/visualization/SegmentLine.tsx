"use client";

import { Line } from "@react-three/drei";
import type { Vector3Tuple } from "three";

export function SegmentLine({
  start,
  end,
  color,
  opacity = 1,
}: {
  start: Vector3Tuple;
  end: Vector3Tuple;
  color: string;
  opacity?: number;
}) {
  return (
    <Line
      points={[start, end]}
      color={color}
      transparent
      opacity={opacity}
      lineWidth={1}
    />
  );
}
