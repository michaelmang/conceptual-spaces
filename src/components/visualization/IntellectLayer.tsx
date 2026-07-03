"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import {
  PREDICABLES,
  ARISTOTELIAN_CATEGORIES,
  PIPELINE_STATIONS,
} from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { SegmentLine } from "./SegmentLine";

const INTELLECT_Y = 5.5;
const PREDICABLE_RADIUS = 1.6;
const CATEGORY_RADIUS = 2.6;

const PREDICABLE_COLORS = ["#e8c547", "#f0d878", "#c9a227", "#d4b84a", "#b8941f"];

function PredicableNode({
  angle,
  label,
  gardenfors,
  color,
}: {
  angle: number;
  label: string;
  gardenfors: string;
  color: string;
}) {
  const x = Math.cos(angle) * PREDICABLE_RADIUS;
  const z = Math.sin(angle) * PREDICABLE_RADIUS;

  return (
    <group position={[x, INTELLECT_Y, z]}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <SegmentLine start={[0, 0, 0]} end={[-x * 0.3, 0, -z * 0.3]} color={color} opacity={0.4} />
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.11}
        color={color}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {label}
      </Text>
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.07}
        color="#ffffff"
        fillOpacity={0.45}
        anchorX="center"
        anchorY="bottom"
      >
        {gardenfors}
      </Text>
    </group>
  );
}

function CategoryNode({
  angle,
  label,
  maps,
}: {
  angle: number;
  label: string;
  maps: string;
}) {
  const x = Math.cos(angle) * CATEGORY_RADIUS;
  const z = Math.sin(angle) * CATEGORY_RADIUS;

  return (
    <group position={[x, INTELLECT_Y, z]}>
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#e8c547" emissive="#e8c547" emissiveIntensity={0.35} />
      </mesh>
      <Text
        position={[Math.cos(angle) * 0.35, 0.2, Math.sin(angle) * 0.35]}
        fontSize={0.1}
        color="#e8c547"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {label}
      </Text>
      <Text
        position={[Math.cos(angle) * 0.35, 0.08, Math.sin(angle) * 0.35]}
        fontSize={0.06}
        color="#ffffff"
        fillOpacity={0.4}
        anchorX="center"
        anchorY="bottom"
      >
        {maps}
      </Text>
    </group>
  );
}

export function IntellectLayer() {
  const innerRef = useRef<THREE.Group>(null);
  const station = PIPELINE_STATIONS.find((s) => s.id === "intellect")!;

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group>
      <AnnotationLabel
        position={[0, INTELLECT_Y + 1.5, 0]}
        step={station.step}
        title={station.label}
        subtitle="Necessary · Universal · Immaterial"
        color={station.color}
        fontSize={0.22}
      />

      <mesh position={[0, INTELLECT_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[CATEGORY_RADIUS, 0.015, 8, 64]} />
        <meshStandardMaterial color="#e8c547" transparent opacity={0.25} />
      </mesh>
      <Text
        position={[0, INTELLECT_Y, CATEGORY_RADIUS + 0.4]}
        fontSize={0.1}
        color="#e8c547"
        fillOpacity={0.6}
        anchorX="center"
      >
        Aristotelian Categories
      </Text>
      {ARISTOTELIAN_CATEGORIES.map((c) => (
        <CategoryNode key={c.id} angle={c.angle} label={c.label} maps={c.maps} />
      ))}

      <mesh position={[0, INTELLECT_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[PREDICABLE_RADIUS, 0.012, 8, 48]} />
        <meshStandardMaterial color="#f0d878" transparent opacity={0.3} />
      </mesh>
      <Text
        position={[0, INTELLECT_Y, PREDICABLE_RADIUS + 0.35]}
        fontSize={0.09}
        color="#f0d878"
        fillOpacity={0.55}
        anchorX="center"
      >
        Five Predicables
      </Text>
      {PREDICABLES.map((p, i) => (
        <PredicableNode
          key={p.id}
          angle={p.angle}
          label={p.label}
          gardenfors={p.gardenfors}
          color={PREDICABLE_COLORS[i]}
        />
      ))}

      <group ref={innerRef} position={[0, INTELLECT_Y, 0]}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color="#fff8dc"
            emissive="#e8c547"
            emissiveIntensity={0.7}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#e8c547" transparent opacity={0.5} />
        </mesh>
      </group>
      <AnnotationLabel
        position={[0, INTELLECT_Y - 0.7, 0]}
        title="Intelligible Species"
        subtitle="Essence without matter"
        color="#fff8dc"
        fontSize={0.1}
      />
    </group>
  );
}
