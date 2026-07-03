import {
  FACULTIES,
  LAYER_ZONES,
  PIPELINE_STATIONS,
  type FacultyId,
} from "@/lib/cognitive-model";

export type LayerZoneId = keyof typeof LAYER_ZONES;

export type SceneFocus =
  | { kind: "layer"; id: LayerZoneId }
  | { kind: "faculty"; id: FacultyId };

/** Pipeline order for guided faculty tour */
export const FACULTY_TOUR_ORDER = PIPELINE_STATIONS.map((s) => s.id as FacultyId);

export const FACULTY_TOUR_STEP_MS = 5500;

export interface CameraFrame {
  position: [number, number, number];
  target: [number, number, number];
}

function layerCenterY(id: LayerZoneId): number {
  const zone = LAYER_ZONES[id];
  return (zone.min + zone.max) / 2;
}

const LAYER_FRAMES: Record<LayerZoneId, CameraFrame> = {
  below: {
    target: [0, layerCenterY("below"), 0],
    position: [2.2, -3.2, 9.5],
  },
  middle: {
    target: [0, layerCenterY("middle"), 0],
    position: [0, 2.2, 12],
  },
  above: {
    target: [0, layerCenterY("above"), 0],
    position: [0, 6.8, 9.5],
  },
};

const FACULTY_FRAMES: Partial<Record<FacultyId, CameraFrame>> = {
  reality: {
    target: [0, -7, 0],
    position: [1.5, -5.5, 9],
  },
  senses: {
    target: [0, -5.2, 0],
    position: [0, -3.5, 11],
  },
  "common-sense": {
    target: [0, -3, 0],
    position: [0, -1.2, 10],
  },
  imagination: {
    target: [0, -1, 0],
    position: [0, 0.8, 10],
  },
  cogitative: {
    target: [-4.2, 0.8, 0],
    position: [-1.2, 2.4, 9.5],
  },
  "conceptual-space": {
    target: [0, 1.2, 0],
    position: [0, 2.8, 9],
  },
  memory: {
    target: [4.2, 0.8, 0],
    position: [7, 2.4, 9.5],
  },
  intellect: {
    target: [0, 5.5, 0],
    position: [0, 7.2, 9],
  },
};

export function getCameraFrame(focus: SceneFocus): CameraFrame {
  if (focus.kind === "layer") {
    return LAYER_FRAMES[focus.id];
  }

  const preset = FACULTY_FRAMES[focus.id];
  if (preset) return preset;

  const faculty = FACULTIES.find((f) => f.id === focus.id)!;
  const [tx, ty, tz] = faculty.position;
  return {
    target: [tx, ty, tz],
    position: [tx, ty + 2, tz + 9],
  };
}

export interface FocusAnchor {
  position: [number, number, number];
  color: string;
  scale: number;
  label?: string;
  step?: number;
}

export function getFocusAnchor(focus: SceneFocus): FocusAnchor {
  if (focus.kind === "layer") {
    const zone = LAYER_ZONES[focus.id];
    const layerScale = focus.id === "middle" ? 1.5 : focus.id === "below" ? 1.25 : 1.2;
    return {
      position: [0, layerCenterY(focus.id), 0],
      color: zone.color,
      scale: layerScale,
      label: zone.label,
    };
  }

  const station = PIPELINE_STATIONS.find((s) => s.id === focus.id)!;
  return {
    position: station.position,
    color: station.color,
    scale: 1,
    label: station.label,
    step: station.step,
  };
}
