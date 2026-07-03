"use client";

import { FACULTIES } from "@/lib/cognitive-model";
import {
  FACULTY_TOUR_ORDER,
  type SceneFocus,
} from "@/lib/camera-focus";

export function FacultyTourBar({
  focus,
  playing,
  onTogglePlay,
}: {
  focus: SceneFocus;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  const facultyIndex =
    focus.kind === "faculty" ? FACULTY_TOUR_ORDER.indexOf(focus.id) : -1;
  const faculty =
    facultyIndex >= 0 ? FACULTIES.find((f) => f.id === focus.id) : undefined;

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
      <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 p-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={onTogglePlay}
          title={playing ? "Pause faculty tour" : "Play faculty tour"}
          className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
        >
          <span aria-hidden className="text-sm leading-none">
            {playing ? "⏸" : "▶"}
          </span>
          {playing ? "Pause tour" : "Play tour"}
        </button>
        {faculty && (
          <div className="hidden border-l border-white/10 pl-2 sm:block">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {facultyIndex + 1} / {FACULTY_TOUR_ORDER.length}
            </p>
            <p className="text-xs font-medium text-white/90">{faculty.label}</p>
          </div>
        )}
      </div>
      {playing && (
        <p className="rounded-lg bg-black/50 px-3 py-1.5 text-[11px] text-white/50 backdrop-blur-sm">
          Walking through each faculty · camera orbits each stop
        </p>
      )}
    </div>
  );
}
