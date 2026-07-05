export type FacultyId =
  | "reality"
  | "senses"
  | "common-sense"
  | "imagination"
  | "cogitative"
  | "memory"
  | "conceptual-space"
  | "intellect";

export type PerceptType = "aspectual" | "actional" | "affectional";

export type Predicable =
  | "genus"
  | "species"
  | "differentia"
  | "proprium"
  | "accidens";

export type AristotelianCategory =
  | "substance"
  | "quality"
  | "quantity"
  | "relation";

export interface FacultyNode {
  id: FacultyId;
  label: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  color: string;
}

export interface SenseOrgan {
  id: string;
  label: string;
  properObject: string;
  angle: number;
  /** Gärdenfors quality-domain geometry */
  domainShape: "bicone" | "tetrahedron" | "cylinder" | "hypersphere" | "orthotope";
  domainLabel: string;
}

export interface PipelineStation {
  id: string;
  step: number;
  label: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
}

export interface ConceptRegion {
  id: string;
  label: string;
  genus: string;
  /** 2D position on the conceptual-space plane */
  x: number;
  z: number;
  radius: number;
  color: string;
  differentia?: string;
  proprium?: string;
  isPrototype?: boolean;
}

export interface PorphyryNode {
  id: string;
  label: string;
  level: number;
  x: number;
  parent?: string;
}

/** Scene layout constants */
export const LAYOUT = {
  below: { y: -4.8, platformY: -5.2 },
  middle: { y: 0.8, platformY: 0.2 },
  above: { y: 5.2, platformY: 4.6 },
  cogitative: { x: -4.2, y: 0.8, z: 0 },
  conceptual: { x: 0, y: 1.2, z: 0 },
  memory: { x: 4.2, y: 0.8, z: 0 },
  porphyry: { x: 0, y: 0.8, z: -3.8 },
} as const;

/** Hub-and-spoke layout: senses sit on lines converging to common sense */
export const SENSE_RING = {
  radius: 2.9,
  y: -5.2,
  commonY: -3.0,
} as const;

export const LAYER_ZONES = {
  below: {
    min: -7,
    max: -2.5,
    label: "Below: Formal Reception",
    summary: "Reality → Senses → Common Sense → Phantasm",
    color: "#c9a227",
  },
  middle: {
    min: -2.5,
    max: 2.8,
    label: "Middle: Cogitative / Conceptual Spaces",
    summary: "Gestalt percepts → Geometric categories → Memory",
    color: "#4a9eff",
  },
  above: {
    min: 2.8,
    max: 7.5,
    label: "Above: Intellect",
    summary: "Universal, necessary grasp of essences",
    color: "#e8c547",
  },
} as const;

export const PIPELINE_STATIONS: PipelineStation[] = [
  {
    id: "reality",
    step: 1,
    label: "Sensible Reality",
    subtitle: "Formal species from things",
    position: [0, -7.0, 0],
    color: "#8b6914",
  },
  {
    id: "senses",
    step: 2,
    label: "External Senses",
    subtitle: "Per se sensibles (color, sound…)",
    position: [0, SENSE_RING.y, 0],
    color: "#c45c26",
  },
  {
    id: "common-sense",
    step: 3,
    label: "Common Sense",
    subtitle: "Unified sensible gestalt",
    position: [0, SENSE_RING.commonY, 0],
    color: "#d4845c",
  },
  {
    id: "imagination",
    step: 4,
    label: "Imagination",
    subtitle: "Persistable phantasm",
    position: [0, -1.0, 0],
    color: "#5b8a72",
  },
  {
    id: "cogitative",
    step: 5,
    label: "Cogitative Power",
    subtitle: "Thing-as-such perception",
    position: [LAYOUT.cogitative.x, LAYOUT.cogitative.y, LAYOUT.cogitative.z],
    color: "#3d8b8b",
  },
  {
    id: "conceptual-space",
    step: 6,
    label: "Conceptual Space",
    subtitle: "Convex regions · prototype · typicality",
    position: [LAYOUT.conceptual.x, LAYOUT.conceptual.y, LAYOUT.conceptual.z],
    color: "#4a9eff",
  },
  {
    id: "memory",
    step: 7,
    label: "Memory",
    subtitle: "Temporal retention of percepts",
    position: [LAYOUT.memory.x, LAYOUT.memory.y, LAYOUT.memory.z],
    color: "#7b6b9e",
  },
  {
    id: "intellect",
    step: 8,
    label: "Intellect",
    subtitle: "Immaterial universal abstraction",
    position: [0, 5.5, 0],
    color: "#e8c547",
  },
];

export const FACULTIES: FacultyNode[] = PIPELINE_STATIONS.map((s) => ({
  id: s.id as FacultyId,
  label: s.label,
  subtitle: s.subtitle,
  description: getFacultyDescription(s.id),
  position: s.position,
  color: s.color,
}));

function getFacultyDescription(id: string): string {
  const descriptions: Record<string, string> = {
    reality:
      "Real things act upon sense organs, transmitting formal sensible species. This grounds geometric cognition in contact with reality.",
    senses:
      "Particular sense-objects: color (sight), sound (hearing), savor (taste), heat/moisture (touch). Each sense receives only its proper object.",
    "common-sense":
      "Unifies disparate sensory inputs into a single coherent sensible gestalt. Also perceives common sensibles: movement, shape, number, dimension.",
    imagination:
      "Forms persistable images (phantasms) from the sensible gestalt. Like a light that lets us see what was once sensed, even after contact ends.",
    cogitative:
      "Perceives incidental sense-objects — individual things as such. Registers aspectual, actional, and affectional percepts as a unified gestalt percept.",
    "conceptual-space":
      "Not a faculty but the cogitative power's product: the cogitative phantasm organized geometrically. Quality dimensions form domains, convex regions are concepts, points are substances. Similarity = distance; prototype = maximal typicality.",
    memory:
      "Retains the temporal index of gestalt percepts. Working with cogitative phantasms, repeated encounters build geometrically categorized experience.",
    intellect:
      "Abstracts intelligible species universally and immaterially — rising from geometric, typicality-based cognition (conceptual space) to necessary essences beyond defeasible categories.",
  };
  return descriptions[id] ?? "";
}

export const SENSE_ORGANS: SenseOrgan[] = [
  {
    id: "sight",
    label: "Sight",
    properObject: "Color",
    angle: 0,
    domainShape: "bicone",
    domainLabel: "Hue · Saturation · Brightness",
  },
  {
    id: "smell",
    label: "Smell",
    properObject: "Odor",
    angle: (2 * Math.PI) / 5,
    domainShape: "hypersphere",
    domainLabel: "High-D odor space",
  },
  {
    id: "hearing",
    label: "Hearing",
    properObject: "Sound",
    angle: (4 * Math.PI) / 5,
    domainShape: "cylinder",
    domainLabel: "Pitch · Loudness · Timbre",
  },
  {
    id: "taste",
    label: "Taste",
    properObject: "Savor",
    angle: (6 * Math.PI) / 5,
    domainShape: "tetrahedron",
    domainLabel: "Sweet · Sour · Salty · Bitter",
  },
  {
    id: "touch",
    label: "Touch",
    properObject: "Heat",
    angle: (8 * Math.PI) / 5,
    domainShape: "orthotope",
    domainLabel: "Heat · Moisture · Pressure",
  },
];

export const PERCEPT_TYPES: {
  id: PerceptType;
  label: string;
  example: string;
  color: string;
  offset: [number, number, number];
}[] = [
  {
    id: "aspectual",
    label: "Aspectual",
    example: '"Red & round"',
    color: "#5ec4d4",
    offset: [0, 0.9, 0],
  },
  {
    id: "actional",
    label: "Actional",
    example: '"Edible"',
    color: "#6ecf8a",
    offset: [-0.85, -0.5, 0.5],
  },
  {
    id: "affectional",
    label: "Affectional",
    example: '"Beneficial"',
    color: "#e8a87c",
    offset: [0.85, -0.5, 0.5],
  },
];

/** Flat 2D layout on the conceptual-space plane */
export const CONCEPT_REGIONS: ConceptRegion[] = [
  {
    id: "animal",
    label: "Animal",
    genus: "Substance",
    x: 0,
    z: 0,
    radius: 1.6,
    color: "#4a9eff",
  },
  {
    id: "mammal",
    label: "Mammal",
    genus: "Animal",
    x: -0.65,
    z: 0.45,
    radius: 0.8,
    color: "#38bdf8",
    differentia: "Warm-blooded",
  },
  {
    id: "bird",
    label: "Bird",
    genus: "Animal",
    x: 0.8,
    z: -0.32,
    radius: 0.7,
    color: "#818cf8",
    differentia: "Feathered",
  },
  {
    id: "dog",
    label: "Dog",
    genus: "Mammal",
    x: -0.9,
    z: 0.65,
    radius: 0.4,
    color: "#22d3ee",
    differentia: "Domesticated",
    proprium: "Social bonding",
  },
  {
    id: "robin",
    label: "Robin",
    genus: "Bird",
    x: 1.05,
    z: -0.5,
    radius: 0.3,
    color: "#f472b6",
    isPrototype: true,
    proprium: "Prototype of bird",
  },
];

export const DOMAIN_AXES = [
  { label: "Color", sub: "Hue · Sat · Light", color: "#ff6b6b", end: [-1.8, 1.6] as [number, number] },
  { label: "Taste", sub: "Sweet · Sour · Salty", color: "#ffd93d", end: [1.8, 1.6] as [number, number] },
  { label: "Shape", sub: "Round · Size", color: "#a78bfa", end: [0, -1.8] as [number, number] },
];

export const PORPHYRY_TREE: PorphyryNode[] = [
  { id: "substance", label: "Substance", level: 0, x: 0 },
  { id: "animal", label: "Animal", level: 1, x: 0, parent: "substance" },
  { id: "mammal", label: "Mammal", level: 2, x: -1.2, parent: "animal" },
  { id: "bird", label: "Bird", level: 2, x: 1.2, parent: "animal" },
  { id: "dog", label: "Dog", level: 3, x: -1.8, parent: "mammal" },
  { id: "cat", label: "Cat", level: 3, x: -0.6, parent: "mammal" },
  { id: "robin", label: "Robin", level: 3, x: 0.9, parent: "bird" },
  { id: "penguin", label: "Penguin", level: 3, x: 1.5, parent: "bird" },
];

export const PREDICABLES: {
  id: Predicable;
  label: string;
  gardenfors: string;
  description: string;
  angle: number;
}[] = [
  {
    id: "genus",
    label: "Genus",
    gardenfors: "Superordinate",
    description: "Broader category (e.g., mammal)",
    angle: 0,
  },
  {
    id: "species",
    label: "Species",
    gardenfors: "Subordinate",
    description: "Specific kind (e.g., dog)",
    angle: Math.PI * 0.4,
  },
  {
    id: "differentia",
    label: "Differentia",
    gardenfors: "Defining",
    description: "Distinguishes from siblings",
    angle: Math.PI * 0.8,
  },
  {
    id: "proprium",
    label: "Proprium",
    gardenfors: "Characteristic",
    description: "Non-essential but necessary",
    angle: Math.PI * 1.2,
  },
  {
    id: "accidens",
    label: "Accidens",
    gardenfors: "Accidental",
    description: "Variable circumstance",
    angle: Math.PI * 1.6,
  },
];

export const ARISTOTELIAN_CATEGORIES: {
  id: AristotelianCategory;
  label: string;
  maps: string;
  angle: number;
}[] = [
  { id: "substance", label: "Substance", maps: "Points & regions", angle: 0 },
  { id: "quality", label: "Quality", maps: "Dimensions", angle: Math.PI / 2 },
  { id: "quantity", label: "Quantity", maps: "Magnitude", angle: Math.PI },
  { id: "relation", label: "Relation", maps: "Distance", angle: (3 * Math.PI) / 2 },
];

/** Ordered path for animated flow particles (memory is lateral, not on the rise to intellect) */
export const FLOW_PATH: [number, number, number][] = [
  "reality",
  "senses",
  "common-sense",
  "imagination",
  "cogitative",
  "conceptual-space",
  "intellect",
].map((id) => PIPELINE_STATIONS.find((s) => s.id === id)!.position);
