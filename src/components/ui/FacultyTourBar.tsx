"use client";

import { FACULTIES } from "@/lib/cognitive-model";
import {
  FACULTY_TOUR_ORDER,
  type SceneFocus,
} from "@/lib/camera-focus";

export function FacultyTourBar({
  focus,
  onTogglePlay,
  onOverview,
}: {
  focus: SceneFocus;
  onTogglePlay: () => void;
  onOverview: () => void;
}) {
  const facultyId = focus.kind === "faculty" ? focus.id : undefined;
  const facultyIndex = facultyId ? FACULTY_TOUR_ORDER.indexOf(facultyId) : -1;
  const faculty =
    facultyIndex >= 0 ? FACULTIES.find((f) => f.id === facultyId) : undefined;

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
      <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 p-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={onOverview}
          title="Zoom out to frame all three layers"
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            focus.kind === "overview"
              ? "bg-white/15 text-white"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span aria-hidden className="text-sm leading-none">⌂</span>
          Overview
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          title="Play the narrated walkthrough of the whole architecture"
          className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
        >
          <span aria-hidden className="text-sm leading-none">▶</span>
          Story
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
    </div>
  );
}
