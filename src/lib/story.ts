import type { SceneFocus } from "./camera-focus";

export interface StoryStep {
  focus: SceneFocus;
  title: string;
  narration: string;
}

/** Auto-advance interval — sized for reading the narration, not just the camera move */
export const STORY_STEP_MS = 12000;

/** The paper's argument as a walkable arc: gap below → reception → … → gap above */
export const STORY_STEPS: StoryStep[] = [
  {
    focus: { kind: "overview" },
    title: "One architecture, three layers",
    narration:
      "Gärdenfors' conceptual spaces — a geometric theory of concepts — occupy the middle layer. Below sits Aristotelian sense perception; above, the intellect. The claim: the old psychology fills the two gaps the modern framework leaves open.",
  },
  {
    focus: { kind: "faculty", id: "reality" },
    title: "It starts in things",
    narration:
      "Real things act on the sense organs, transmitting their sensible forms. This formal reception is what connects all the later geometry to reality — the gap below the framework, filled.",
  },
  {
    focus: { kind: "faculty", id: "senses" },
    title: "Five senses, five geometries",
    narration:
      "Each sense receives only its proper object — color, sound, savor, odor, heat. Each object is a quality domain with its own shape: color a spindle of hue, saturation, and brightness; taste a tetrahedron of sweet, sour, salty, bitter.",
  },
  {
    focus: { kind: "faculty", id: "common-sense" },
    title: "One world from five streams",
    narration:
      "The common sense binds the separate qualities into a single sensible gestalt — and perceives what no single sense can: shape, number, movement, magnitude.",
  },
  {
    focus: { kind: "faculty", id: "imagination" },
    title: "The image that stays",
    narration:
      "Imagination holds the gestalt as a phantasm — an image that persists after the thing is gone, ready to be worked on by the higher powers.",
  },
  {
    focus: { kind: "faculty", id: "cogitative" },
    title: "Perceiving things as things",
    narration:
      "The cogitative power registers what a thing looks like (aspectual), what it does (actional), and what it means for me (affectional) — each percept building on the last, converging in one gestalt percept of the individual thing.",
  },
  {
    focus: { kind: "faculty", id: "conceptual-space" },
    title: "The phantasm, organized geometrically",
    narration:
      "A conceptual space is that cogitative phantasm laid out as geometry: quality dimensions form domains, concepts are convex regions, the prototype sits at the core, and typicality is distance from it — robin near the center, penguin at the shell.",
  },
  {
    focus: { kind: "layer", id: "middle" },
    title: "Aristotle's tree, Gärdenfors' regions",
    narration:
      "The Porphyry tree divides genus into species by differentia — discrete cuts. The nested regions are the same classification made continuous: BIRD and MAMMAL sit side by side inside ANIMAL, separated by their differentiae.",
  },
  {
    focus: { kind: "faculty", id: "memory" },
    title: "Experience accumulates",
    narration:
      "Memory retains gestalt percepts with their temporal index. It sits beside the flow rather than on the rise: repeated encounters gradually carve the regions of the space.",
  },
  {
    focus: { kind: "faculty", id: "intellect" },
    title: "Beyond typicality: necessity",
    narration:
      "The intellect abstracts the intelligible species — essence without matter. Its predicables and categories classify necessarily and universally, where the space below classifies by degree. The gap above the framework, filled.",
  },
];
