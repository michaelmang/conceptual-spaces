"use client";

import * as THREE from "three";
import { Text } from "@react-three/drei";
import { LAYER_ZONES } from "@/lib/cognitive-model";
import { LayerPlatform } from "./LayerPlatform";

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

      {/* Gap markers — dashed horizontal bands */}
      {[
        { y: -2.5, label: "Gap Below: sensory grounding of geometry" },
        { y: 2.8, label: "Gap Above: necessity beyond typicality" },
      ].map((gap) => (
        <group key={gap.y} position={[0, gap.y, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[12.5, 0.06]} />
            <meshBasicMaterial color="#ff6b6b" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <Text
            position={[6.4, 0.15, 0]}
            fontSize={0.11}
            color="#ff6b6b"
            anchorX="left"
            anchorY="middle"
            maxWidth={3}
          >
            {gap.label}
          </Text>
        </group>
      ))}
    </group>
  );
}
