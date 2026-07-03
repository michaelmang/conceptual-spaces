"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LegendPanel } from "@/components/ui/LegendPanel";
import { FacultyTourBar } from "@/components/ui/FacultyTourBar";
import {
  FACULTY_TOUR_ORDER,
  FACULTY_TOUR_STEP_MS,
  type SceneFocus,
} from "@/lib/camera-focus";

const CognitiveScene = dynamic(
  () =>
    import("@/components/visualization/CognitiveScene").then((m) => m.CognitiveScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#0a0e1a]">
        <p className="text-sm text-white/40">Loading cognitive architecture…</p>
      </div>
    ),
  },
);

export default function Home() {
  const [focus, setFocus] = useState<SceneFocus>({
    kind: "faculty",
    id: "cogitative",
  });
  const [tourPlaying, setTourPlaying] = useState(false);

  const handleFocusChange = useCallback((next: SceneFocus) => {
    setTourPlaying(false);
    setFocus(next);
  }, []);

  const toggleTour = useCallback(() => {
    setTourPlaying((playing) => {
      if (playing) return false;

      setFocus((current) => {
        if (current.kind === "faculty") return current;
        return { kind: "faculty", id: FACULTY_TOUR_ORDER[0] };
      });
      return true;
    });
  }, []);

  useEffect(() => {
    if (!tourPlaying) return;

    const timer = window.setInterval(() => {
      setFocus((current) => {
        const index =
          current.kind === "faculty"
            ? FACULTY_TOUR_ORDER.indexOf(current.id)
            : -1;
        const nextIndex = index < 0 ? 0 : (index + 1) % FACULTY_TOUR_ORDER.length;
        return { kind: "faculty", id: FACULTY_TOUR_ORDER[nextIndex] };
      });
    }, FACULTY_TOUR_STEP_MS);

    return () => window.clearInterval(timer);
  }, [tourPlaying]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <main className="relative min-w-0 flex-1">
        <CognitiveScene focus={focus} tourPlaying={tourPlaying} />
        <FacultyTourBar focus={focus} playing={tourPlaying} onTogglePlay={toggleTour} />
      </main>
      <div className="hidden w-[380px] shrink-0 lg:block">
        <LegendPanel focus={focus} onFocusChange={handleFocusChange} />
      </div>
    </div>
  );
}
