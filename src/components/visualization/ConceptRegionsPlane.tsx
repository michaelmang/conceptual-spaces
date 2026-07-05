"use client";

import { Text } from "@react-three/drei";
import { CONCEPT_REGIONS, type ConceptRegion } from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { SegmentLine } from "./SegmentLine";

/** Tilt labels toward the front camera while keeping them near the plane */
const LABEL_TILT: [number, number, number] = [-Math.PI / 3, 0, 0];

/** Per-region label offsets chosen to avoid covering nested child regions */
const LABEL_POSITIONS: Record<string, [number, number]> = {
  animal: [0, 1.35],
  mammal: [-0.65, -0.15],
  bird: [0.35, -0.85],
  dog: [-0.9, 1.18],
  robin: [1.05, 0.0],
};

function RegionDisc({ region, depth }: { region: ConceptRegion; depth: number }) {
  const y = 0.015 + depth * 0.015;
  const [lx, lz] = LABEL_POSITIONS[region.id] ?? [region.x, region.z];
  const sublabel = region.isPrototype
    ? "prototype region"
    : region.differentia
      ? `differentia: ${region.differentia}`
      : region.genus === "Substance"
        ? "genus"
        : undefined;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[region.x, y, region.z]}>
        <circleGeometry args={[region.radius, 64]} />
        <meshBasicMaterial color={region.color} transparent opacity={0.09} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[region.x, y + 0.002, region.z]}>
        <ringGeometry args={[region.radius - 0.018, region.radius, 96]} />
        <meshBasicMaterial color={region.color} transparent opacity={0.55} depthWrite={false} />
      </mesh>

      {region.isPrototype && (
        <mesh position={[region.x, y + 0.05, region.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#e8c547" emissive="#e8c547" emissiveIntensity={0.7} />
        </mesh>
      )}

      <group position={[lx, y + 0.03, lz]} rotation={LABEL_TILT}>
        <Text
          fontSize={0.11}
          color={region.color}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          {region.label}
        </Text>
        {sublabel && (
          <Text
            position={[0, -0.03, 0]}
            fontSize={0.062}
            color="#ffffff"
            fillOpacity={0.5}
            anchorX="center"
            anchorY="top"
          >
            {sublabel}
          </Text>
        )}
      </group>
    </group>
  );
}

/** Depth = nesting level, so inner regions stack above their genus without z-fighting */
function nestingDepth(region: ConceptRegion): number {
  let depth = 0;
  let genus = region.genus;
  while (depth < 4) {
    const parent = CONCEPT_REGIONS.find((r) => r.label === genus);
    if (!parent) break;
    genus = parent.genus;
    depth += 1;
  }
  return depth;
}

/**
 * Diagnosticity (paper §II): typicality within the species over typicality
 * within the genus — Robin's distance into BIRD (d₁) vs into ANIMAL (d₂).
 */
function DiagnosticityOverlay() {
  const robin = CONCEPT_REGIONS.find((r) => r.id === "robin")!;
  const bird = CONCEPT_REGIONS.find((r) => r.id === "bird")!;
  const animal = CONCEPT_REGIONS.find((r) => r.id === "animal")!;
  const y = 0.09;

  const midLabel = (
    a: ConceptRegion,
    b: ConceptRegion,
  ): [number, number, number] => [(a.x + b.x) / 2, y + 0.06, (a.z + b.z) / 2];

  return (
    <group>
      <SegmentLine
        start={[robin.x, y, robin.z]}
        end={[bird.x, y, bird.z]}
        color={robin.color}
        opacity={0.85}
      />
      <SegmentLine
        start={[robin.x, y, robin.z]}
        end={[animal.x, y, animal.z]}
        color={animal.color}
        opacity={0.5}
      />
      <Text position={midLabel(robin, bird)} fontSize={0.06} color={robin.color} anchorX="center" anchorY="bottom" outlineWidth={0.01} outlineColor="#000000">
        d₁
      </Text>
      <Text position={midLabel(robin, animal)} fontSize={0.06} color={animal.color} anchorX="center" anchorY="bottom" outlineWidth={0.01} outlineColor="#000000">
        d₂
      </Text>

      <group position={[1.55, 0.03, 0.6]} rotation={LABEL_TILT}>
        <Text
          fontSize={0.08}
          color="#ffffff"
          fillOpacity={0.75}
          anchorX="left"
          anchorY="bottom"
          outlineWidth={0.012}
          outlineColor="#000000"
        >
          Diagnosticity = d₁ ÷ d₂
        </Text>
        <Text
          position={[0, -0.03, 0]}
          fontSize={0.055}
          color="#ffffff"
          fillOpacity={0.45}
          anchorX="left"
          anchorY="top"
        >
          Robin&apos;s distance into BIRD vs into ANIMAL
        </Text>
      </group>
    </group>
  );
}

/**
 * Genus ⊃ species as nested convex regions, flat on the conceptual-space plane.
 * The BIRD sub-region is the same concept expanded above as the 3D typicality
 * ellipsoid; a connector line makes that identity explicit.
 */
export function ConceptRegionsPlane() {
  return (
    <group>
      {CONCEPT_REGIONS.map((region) => (
        <RegionDisc key={region.id} region={region} depth={nestingDepth(region)} />
      ))}

      <DiagnosticityOverlay />

      <SegmentLine start={[0.8, 0.06, -0.32]} end={[0.4, 0.6, -0.15]} color="#4a9eff" opacity={0.5} />
      <Text
        position={[0.95, 0.55, -0.25]}
        fontSize={0.07}
        color="#4a9eff"
        fillOpacity={0.75}
        anchorX="left"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#000000"
      >
        same BIRD region, expanded in 3D ↑
      </Text>

      <AnnotationLabel
        position={[-1.85, 0.4, 1.45]}
        title="Genus ⊃ Species"
        subtitle="Nested convex regions · differentia separates siblings"
        color="#38bdf8"
        fontSize={0.11}
        anchorX="right"
      />
    </group>
  );
}
