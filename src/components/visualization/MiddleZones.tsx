"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import {
  PERCEPT_TYPES,
  LAYOUT,
  PIPELINE_STATIONS,
} from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { SegmentLine } from "./SegmentLine";

const { x: CX, y: CY, z: CZ } = LAYOUT.cogitative;
const { x: MX, y: MY, z: MZ } = LAYOUT.memory;

export function CogitativeZone() {
  const gestaltRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gestaltRef.current) {
      gestaltRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const station = PIPELINE_STATIONS.find((s) => s.id === "cogitative")!;

  return (
    <group position={[CX, CY, CZ]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshStandardMaterial
          color="#3d8b8b"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      <AnnotationLabel
        position={[-1.45, 2.1, -1.0]}
        step={station.step}
        title={station.label}
        subtitle="3 percept types → 1 gestalt"
        color={station.color}
        fontSize={0.13}
        anchorX="left"
        subtitleGap={1.8}
      />

      {PERCEPT_TYPES.map((p) => (
        <group key={p.id} position={p.offset}>
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.4} />
          </mesh>
          <Text
            position={[0, -0.38, 0]}
            fontSize={0.085}
            color={p.color}
            anchorX="center"
            anchorY="top"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            {p.label}
          </Text>
          <Text
            position={[0, -0.52, 0]}
            fontSize={0.06}
            color="#ffffff"
            fillOpacity={0.45}
            anchorX="center"
            anchorY="top"
          >
            {p.example}
          </Text>
          <SegmentLine
            start={[0, 0, 0]}
            end={[-p.offset[0], -0.1 - p.offset[1], -p.offset[2]]}
            color={p.color}
            opacity={0.5}
          />
        </group>
      ))}

      <mesh ref={gestaltRef} position={[0, -0.1, 0]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#3d8b8b"
          emissive="#3d8b8b"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#4ecdc4" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, -0.55, 0]}
        fontSize={0.085}
        color="#4ecdc4"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        Gestalt Percept
      </Text>
      <Text
        position={[0, -0.68, 0]}
        fontSize={0.06}
        color="#ffffff"
        fillOpacity={0.45}
        anchorX="center"
        anchorY="top"
      >
        Thing-as-such
      </Text>
    </group>
  );
}

export function MemoryZone() {
  const station = PIPELINE_STATIONS.find((s) => s.id === "memory")!;

  return (
    <group position={[MX, MY, MZ]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshStandardMaterial
          color="#7b6b9e"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      <AnnotationLabel
        position={[0, 1.85, -1.1]}
        step={station.step}
        title={station.label}
        subtitle={station.subtitle}
        color={station.color}
        fontSize={0.13}
        subtitleGap={1.8}
      />

      <SegmentLine start={[-1.2, 0, 0]} end={[1.2, 0, 0]} color="#7b6b9e" opacity={0.6} />
      {[-1, -0.5, 0, 0.5, 1].map((t, i) => (
        <group key={i} position={[t, 0, 0]}>
          <mesh>
            <sphereGeometry args={[i === 2 ? 0.14 : 0.09, 12, 12]} />
            <meshStandardMaterial
              color={i === 2 ? "#b8a8d8" : "#7b6b9e"}
              emissive="#7b6b9e"
              emissiveIntensity={i === 2 ? 0.6 : 0.3}
            />
          </mesh>
        </group>
      ))}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.08}
        color="#9b8bb8"
        anchorX="center"
        anchorY="top"
      >
        Past encounters
      </Text>
    </group>
  );
}
