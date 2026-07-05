"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Billboard, Text } from "@react-three/drei";
import { TYPICALITY_SPACE, typicalityScore } from "@/lib/gardenfors-figures";
import { LAYOUT, PIPELINE_STATIONS } from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { SegmentLine } from "./SegmentLine";
import { ConceptRegionsPlane } from "./ConceptRegionsPlane";

const { x: PX, y: PY, z: PZ } = LAYOUT.conceptual;
const { rx, ry, rz, concept, prototypeLabel, instances } = TYPICALITY_SPACE;
const REGION_COLOR = "#4a9eff";

function EllipsoidShell({
  scale,
  opacity,
  segments = 36,
}: {
  scale: [number, number, number];
  opacity: number;
  segments?: number;
}) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, segments, segments * 0.75]} />
      <meshStandardMaterial
        color={REGION_COLOR}
        wireframe
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

function EllipsoidFill({ scale }: { scale: [number, number, number] }) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 48, 36]} />
      <meshStandardMaterial
        color={REGION_COLOR}
        transparent
        opacity={0.07}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TypicalityFigure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.12 + 0.28;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.18, 0.28, 0]}>
      <EllipsoidFill scale={[rx, ry, rz]} />
      {[0.38, 0.68, 1].map((s, i) => (
        <EllipsoidShell
          key={s}
          scale={[rx * s, ry * s, rz * s]}
          opacity={0.14 + i * 0.1}
        />
      ))}

      <Billboard position={[rx + 0.28, ry * 0.35, 0]}>
        <Text
          fontSize={0.13}
          color={REGION_COLOR}
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.018}
          outlineColor="#000000"
        >
          {concept}
        </Text>
      </Billboard>

      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#e8c547" emissive="#e8c547" emissiveIntensity={0.65} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#4a9eff" wireframe transparent opacity={0.55} />
      </mesh>
      <Billboard position={[0.22, 0.12, 0.08]}>
        <Text fontSize={0.085} color="#e8c547" anchorX="left" anchorY="middle">
          {prototypeLabel} · prototype
        </Text>
      </Billboard>

      {instances.map((bird) => {
        const score = typicalityScore(bird.x, bird.y, bird.z, rx, ry, rz);
        const sphereR = 0.045 + score * 0.04;
        const emissive = 0.2 + score * 0.6;
        const labelPos: [number, number, number] = [
          bird.x,
          bird.y + sphereR + 0.14,
          bird.z,
        ];

        return (
          <group key={bird.label}>
            <SegmentLine
              start={[bird.x, bird.y, bird.z]}
              end={[0, 0, 0]}
              color={REGION_COLOR}
              opacity={0.2 + score * 0.4}
            />
            <mesh position={[bird.x, bird.y, bird.z]}>
              <sphereGeometry args={[sphereR, 16, 16]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive={REGION_COLOR}
                emissiveIntensity={emissive}
                roughness={0.35}
                metalness={0.15}
              />
            </mesh>
            <Billboard position={labelPos}>
              <Text
                fontSize={0.075}
                color="#ffffff"
                fillOpacity={0.8 + score * 0.15}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.012}
                outlineColor="#000000"
              >
                {bird.label}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

export function ConceptualSpaceLayer() {
  const station = PIPELINE_STATIONS.find((s) => s.id === "conceptual-space")!;

  return (
    <group position={[PX, PY, PZ]}>
      <AnnotationLabel
        position={[0, 1.35, 0.3]}
        step={station.step}
        title={station.label}
        subtitle="The cogitative phantasm, organized geometrically"
        color={station.color}
        fontSize={0.14}
      />

      <TypicalityFigure />

      {/* Genus/species regions flat on the middle platform below the ellipsoid */}
      <group position={[0, -0.94, 0]}>
        <ConceptRegionsPlane />
      </group>

      <AnnotationLabel
        position={[-2.0, 0.45, 0.6]}
        title="Distance from prototype"
        subtitle="Closer to the core = more typical member"
        color="#ffffff"
        fontSize={0.075}
      />
    </group>
  );
}
