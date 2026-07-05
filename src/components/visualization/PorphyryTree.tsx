"use client";

import { Line, Text } from "@react-three/drei";
import {
  CONCEPT_REGIONS,
  LAYOUT,
  PORPHYRY_TREE,
  type PorphyryNode,
} from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { SegmentLine } from "./SegmentLine";

const TREE_Z = LAYOUT.porphyry.z;
const NODE_COLOR_FALLBACK = "#8fa3bf";

/** World y of the concept-region discs on the middle platform */
const REGION_PLANE_Y = 0.3;

function nodeY(level: number): number {
  return 2.5 - level * 0.65;
}

function nodeColor(node: PorphyryNode): string {
  if (node.id === "substance") return "#e8c547";
  return CONCEPT_REGIONS.find((r) => r.id === node.id)?.color ?? NODE_COLOR_FALLBACK;
}

function TreeNode({ node }: { node: PorphyryNode }) {
  const color = nodeColor(node);
  const isLeaf = node.level === 3;

  return (
    <group position={[node.x, nodeY(node.level), 0]}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={isLeaf ? [0, -0.15, 0] : [0.15, 0.04, 0]}
        fontSize={0.1}
        color={color}
        anchorX={isLeaf ? "center" : "left"}
        anchorY={isLeaf ? "top" : "middle"}
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
    </group>
  );
}

/**
 * Porphyry tree: Aristotle's discrete genus/species divisions, standing behind
 * the conceptual space. Dotted links tie each tree node to its counterpart
 * convex region — the discrete structure and the continuous geometry are the
 * same classification.
 */
export function PorphyryTree() {
  return (
    <>
      <group position={[LAYOUT.porphyry.x, 0, TREE_Z]}>
        <AnnotationLabel
          position={[0, 2.95, 0]}
          title="Porphyry Tree"
          subtitle="Discrete divisions ↔ nested regions (dotted links)"
          color="#c9d6ea"
          fontSize={0.12}
        />

        {PORPHYRY_TREE.filter((n) => n.parent).map((node) => {
          const parent = PORPHYRY_TREE.find((p) => p.id === node.parent)!;
          return (
            <SegmentLine
              key={`edge-${node.id}`}
              start={[parent.x, nodeY(parent.level), 0]}
              end={[node.x, nodeY(node.level), 0]}
              color={NODE_COLOR_FALLBACK}
              opacity={0.35}
            />
          );
        })}

        {PORPHYRY_TREE.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </group>

      {/* Correspondence: tree node → convex region on the conceptual-space plane */}
      {PORPHYRY_TREE.map((node) => {
        const region = CONCEPT_REGIONS.find((r) => r.id === node.id);
        if (!region) return null;
        return (
          <Line
            key={`link-${node.id}`}
            points={[
              [node.x + LAYOUT.porphyry.x, nodeY(node.level), TREE_Z],
              [region.x, REGION_PLANE_Y, region.z],
            ]}
            color={region.color}
            lineWidth={1}
            dashed
            dashSize={0.14}
            gapSize={0.1}
            transparent
            opacity={0.28}
          />
        );
      })}
    </>
  );
}
