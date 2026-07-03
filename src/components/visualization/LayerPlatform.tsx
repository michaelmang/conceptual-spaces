"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

type LabelPlacement = "above" | "below" | "front-left" | "front-right";

function labelPositions(
  placement: LabelPlacement,
  width: number,
  depth: number,
): {
  title: [number, number, number];
  summary: [number, number, number];
  anchorX: "left" | "center" | "right";
} {
  const frontZ = depth / 2 + 0.25;
  const titleY = 1.72;
  const summaryY = 1.48;

  switch (placement) {
    case "front-left":
      return {
        title: [-width / 2 + 0.45, titleY, frontZ],
        summary: [-width / 2 + 0.45, summaryY, frontZ],
        anchorX: "left",
      };
    case "front-right":
      return {
        title: [width / 2 - 0.45, titleY, frontZ],
        summary: [width / 2 - 0.45, summaryY, frontZ],
        anchorX: "right",
      };
    case "below":
      return {
        title: [0, -0.5, frontZ],
        summary: [0, -0.72, frontZ],
        anchorX: "center",
      };
    case "above":
    default:
      return {
        title: [0, titleY, frontZ],
        summary: [0, summaryY, frontZ],
        anchorX: "center",
      };
  }
}

export function LayerPlatform({
  position,
  width,
  depth,
  color,
  label,
  summary,
  labelPlacement = "above",
}: {
  position: [number, number, number];
  width: number;
  depth: number;
  color: string;
  label: string;
  summary?: string;
  labelPlacement?: LabelPlacement;
}) {
  const edgeGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(width, depth)),
    [width, depth],
  );

  const { title, summary: summaryPos, anchorX } = labelPositions(
    labelPlacement,
    width,
    depth,
  );

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <lineSegments
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        geometry={edgeGeometry}
      >
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </lineSegments>

      <Text
        position={title}
        fontSize={0.16}
        color={color}
        anchorX={anchorX}
        anchorY="bottom"
        outlineWidth={0.015}
        outlineColor="#000000"
        maxWidth={width * 0.42}
        textAlign={anchorX === "center" ? "center" : anchorX}
      >
        {label}
      </Text>
      {summary && (
        <Text
          position={summaryPos}
          fontSize={0.095}
          color="#ffffff"
          fillOpacity={0.45}
          anchorX={anchorX}
          anchorY="top"
          maxWidth={width * 0.42}
          textAlign={anchorX === "center" ? "center" : anchorX}
        >
          {summary}
        </Text>
      )}
    </group>
  );
}
