/** Typicality-based conceptual space (Gärdenfors Fig. 4–5 unified) */

export interface ConceptInstance {
  label: string;
  /** Position inside the 3D convex region (ellipsoid axes) */
  x: number;
  y: number;
  z: number;
}

/** Single concept region: 3D ellipsoid; distance from prototype ∝ typicality */
export const TYPICALITY_SPACE = {
  concept: "BIRD",
  rx: 1.45,
  ry: 0.72,
  rz: 0.82,
  prototypeLabel: "p",
  instances: [
    { label: "ROBIN", x: 0.06, y: 0.04, z: 0.05 },
    { label: "VULTURE", x: -0.58, y: -0.22, z: -0.34 },
    { label: "EMU", x: -0.32, y: 0.38, z: 0.48 },
    { label: "OSTRICH", x: 0.12, y: 0.3, z: 0.55 },
    { label: "PENGUIN", x: 1.05, y: -0.1, z: 0.08 },
  ] satisfies ConceptInstance[],
} as const;

export function typicalityScore(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
): number {
  const d = Math.sqrt((x / rx) ** 2 + (y / ry) ** 2 + (z / rz) ** 2);
  return Math.max(0, 1 - d);
}

export const TYPICALITY_LEGEND = {
  title: "Typicality",
  summary:
    "A concept is a convex 3D region. The prototype sits at the center; Euclidean distance from it measures how typical each instance is.",
  points: [
    "Convex ellipsoid = category (e.g. BIRD)",
    "Prototype = most typical member at the core",
    "Near center → robin-like; toward the shell → penguin-like",
    "Nested property regions inherit graded typicality (d₁, d₂)",
  ],
} as const;
