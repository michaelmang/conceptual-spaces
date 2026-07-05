"use client";

import { Line, Text } from "@react-three/drei";
import { LAYER_ZONES } from "@/lib/cognitive-model";
import { LayerPlatform } from "./LayerPlatform";

/**
 * The paper's thesis: Gärdenfors' framework leaves a gap below (how geometry
 * connects to reality) and above (necessity beyond typicality) — and the
 * Aristotelian account fills both. So each seam is a dashed "gap" line with a
 * glowing bridge ring where the cognitive flow crosses it.
 */
const GAP_SEAMS = [
  {
    y: -2.5,
    gap: "Gap below Gärdenfors' framework",
    fill: "Filled by formal reception in the senses",
    color: "#6ecf8a",
  },
  {
    y: 2.8,
    gap: "Gap above Gärdenfors' framework",
    fill: "Filled by the immaterial intellect",
    color: "#e8c547",
  },
];

export function LayerBoundaries() {
  return (
    <group>
      <LayerPlatform
        position={[0, -5.6, 0]}
        width={7}
        depth={7}
        color={LAYER_ZONES.below.color}
        label={LAYER_ZONES.below.label}
        summary={LAYER_ZONES.below.summary}
        labelPlacement="below"
      />
      <LayerPlatform
        position={[0, 0.2, 0]}
        width={14}
        depth={10}
        color={LAYER_ZONES.middle.color}
        label={LAYER_ZONES.middle.label}
        summary={LAYER_ZONES.middle.summary}
        labelPlacement="front-left"
      />
      <LayerPlatform
        position={[0, 4.6, 0]}
        width={8}
        depth={8}
        color={LAYER_ZONES.above.color}
        label={LAYER_ZONES.above.label}
        summary={LAYER_ZONES.above.summary}
        labelPlacement="front-right"
      />

      {/* Gap seams — dashed gap line, bridged where the flow crosses */}
      {GAP_SEAMS.map((seam) => (
        <group key={seam.y} position={[0, seam.y, 0]}>
          <Line
            points={[
              [-6.25, 0, 0],
              [6.25, 0, 0],
            ]}
            color="#ff6b6b"
            lineWidth={1}
            dashed
            dashSize={0.2}
            gapSize={0.14}
            transparent
            opacity={0.3}
          />

          {/* Bridge ring the flow particles pass through at x=0 */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.035, 12, 48]} />
            <meshStandardMaterial
              color={seam.color}
              emissive={seam.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>

          <Text
            position={[2.4, 0.34, 0]}
            fontSize={0.08}
            color="#ff9b9b"
            fillOpacity={0.6}
            anchorX="left"
            anchorY="middle"
            outlineWidth={0.012}
            outlineColor="#000000"
          >
            {seam.gap}
          </Text>
          <Text
            position={[2.4, 0.16, 0]}
            fontSize={0.1}
            color={seam.color}
            anchorX="left"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            {seam.fill}
          </Text>
        </group>
      ))}
    </group>
  );
}
