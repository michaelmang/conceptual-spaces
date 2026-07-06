import { FACULTIES, LAYER_ZONES } from "@/lib/cognitive-model";
import { parseFocus, serializeFocus, type SceneFocus } from "@/lib/camera-focus";
import { STORY_STEPS } from "@/lib/story";

/** Production URL — override with NEXT_PUBLIC_SITE_URL for previews/custom domains */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://conceptual-spaces.vercel.app";

export const SITE_NAME = "Conceptual Spaces";

export const PAPER_URL =
  "https://michaelmangialardi.substack.com/p/beyond-and-below-conceptual-spaces";

export const PAPER_TITLE =
  "Beyond and Below Cognitive Space: A Framework for Perfecting Conceptual Spaces";

export const PAPER_AUTHOR = "Michael Mangialardi";

/** The one-line hook used across metadata, intro, and share text */
export const HOOK =
  "Aristotle mapped the mind 2,300 years before cognitive science.";

export const SITE_TITLE = "Conceptual Spaces — A 3D Map of the Mind";

export const SITE_DESCRIPTION =
  "Modern cognitive science models concepts as geometry. Aristotle drew the rest of the map 2,300 years ago. Climb an interactive 3D tower of the mind — sensation below, concept spaces in the middle, intellect above.";

export interface ViewMeta {
  title: string;
  description: string;
}

/** Human-readable metadata for a scene focus (deep links, OG cards) */
export function describeFocus(focus: SceneFocus): ViewMeta {
  if (focus.kind === "layer") {
    const zone = LAYER_ZONES[focus.id];
    return {
      title: `${zone.label} — ${SITE_NAME}`,
      description: `${zone.summary}. One layer of an interactive 3D map of the mind uniting Aristotle with Gärdenfors' conceptual spaces.`,
    };
  }
  if (focus.kind === "faculty") {
    const faculty = FACULTIES.find((f) => f.id === focus.id);
    if (faculty) {
      return {
        title: `${faculty.label} — ${SITE_NAME}`,
        description: faculty.description,
      };
    }
  }
  return { title: SITE_TITLE, description: SITE_DESCRIPTION };
}

/** Metadata for a story step deep link (?step=N, 1-based in the URL) */
export function describeStep(index: number): ViewMeta {
  const step = STORY_STEPS[index];
  return {
    title: `${step.title} — ${SITE_NAME}`,
    description: step.narration,
  };
}

/** Parse a 1-based ?step= URL param into a valid story index, or null */
export function parseStepParam(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  if (!Number.isInteger(n) || n < 1 || n > STORY_STEPS.length) return null;
  return n - 1;
}

/** Resolve view metadata from raw URL params (step wins over focus) */
export function describeParams(params: {
  focus?: string | string[];
  step?: string | string[];
}): ViewMeta & { focus: SceneFocus; stepIndex: number | null } {
  const rawStep = Array.isArray(params.step) ? params.step[0] : params.step;
  const rawFocus = Array.isArray(params.focus) ? params.focus[0] : params.focus;
  const stepIndex = parseStepParam(rawStep);
  if (stepIndex !== null) {
    return {
      ...describeStep(stepIndex),
      focus: STORY_STEPS[stepIndex].focus,
      stepIndex,
    };
  }
  const focus = parseFocus(rawFocus ?? null) ?? ({ kind: "overview" } as const);
  return { ...describeFocus(focus), focus, stepIndex: null };
}

/** Canonical share URL for the current view */
export function shareUrl(focus: SceneFocus, stepIndex: number | null): string {
  const url = new URL(SITE_URL);
  if (stepIndex !== null) {
    url.searchParams.set("step", String(stepIndex + 1));
  } else if (focus.kind !== "overview") {
    url.searchParams.set("focus", serializeFocus(focus));
  }
  return url.toString();
}

/** Pre-written share text, view-aware so every shared link reads bespoke */
export function shareText(focus: SceneFocus, stepIndex: number | null): string {
  if (stepIndex !== null) {
    return `"${STORY_STEPS[stepIndex].title}" — step ${stepIndex + 1} of a guided 3D tour of the mind, from Aristotle to Gärdenfors' conceptual spaces.`;
  }
  if (focus.kind === "faculty") {
    const faculty = FACULTIES.find((f) => f.id === focus.id);
    if (faculty) {
      return `${faculty.label}: ${faculty.subtitle}. One station in an interactive 3D map of the mind — Aristotle meets modern cognitive science.`;
    }
  }
  if (focus.kind === "layer") {
    return `${LAYER_ZONES[focus.id].label} — one layer of an interactive 3D map of the mind, uniting Aristotle with modern cognitive science.`;
  }
  return `${HOOK} An interactive 3D tower of the mind — sensation below, concept spaces in the middle, intellect above.`;
}
