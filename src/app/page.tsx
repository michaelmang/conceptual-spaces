"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LegendPanel } from "@/components/ui/LegendPanel";
import { FacultyTourBar } from "@/components/ui/FacultyTourBar";
import { StoryCaption } from "@/components/ui/StoryCaption";
import { MobileInfoSheet } from "@/components/ui/MobileInfoSheet";
import {
  parseFocus,
  serializeFocus,
  type SceneFocus,
} from "@/lib/camera-focus";
import { STORY_STEPS, STORY_STEP_MS } from "@/lib/story";

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
  const [focus, setFocus] = useState<SceneFocus>({ kind: "overview" });
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [storyPlaying, setStoryPlaying] = useState(false);

  const storyActive = storyIndex !== null;

  const handleFocusChange = useCallback((next: SceneFocus) => {
    setStoryIndex(null);
    setStoryPlaying(false);
    setFocus(next);
  }, []);

  const gotoStep = useCallback((index: number, autoplay: boolean) => {
    const clamped = Math.max(0, Math.min(STORY_STEPS.length - 1, index));
    setStoryIndex(clamped);
    setStoryPlaying(autoplay && clamped < STORY_STEPS.length - 1);
    setFocus(STORY_STEPS[clamped].focus);
  }, []);

  const exitStory = useCallback(() => {
    setStoryIndex(null);
    setStoryPlaying(false);
  }, []);

  // Auto-advance while playing; gotoStep stops playback at the final step
  useEffect(() => {
    if (!storyPlaying || storyIndex === null) return;
    const timer = window.setTimeout(() => gotoStep(storyIndex + 1, true), STORY_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [storyPlaying, storyIndex, gotoStep]);

  // Deep links: read ?focus= once after mount, keep it in sync afterwards
  useEffect(() => {
    const initial = parseFocus(new URLSearchParams(window.location.search).get("focus"));
    if (!initial) return;
    const timer = window.setTimeout(() => setFocus(initial), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (focus.kind === "overview") {
      url.searchParams.delete("focus");
    } else {
      url.searchParams.set("focus", serializeFocus(focus));
    }
    window.history.replaceState(null, "", url);
  }, [focus]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <main className="relative min-w-0 flex-1">
        <CognitiveScene focus={focus} tourPlaying={storyPlaying} />
        {!storyActive && <MobileInfoSheet focus={focus} />}
        {!storyActive && (
          <FacultyTourBar
            focus={focus}
            onTogglePlay={() => gotoStep(0, true)}
            onOverview={() => handleFocusChange({ kind: "overview" })}
          />
        )}
        {storyIndex !== null && (
          <StoryCaption
            step={STORY_STEPS[storyIndex]}
            index={storyIndex}
            playing={storyPlaying}
            onNext={() => gotoStep(storyIndex + 1, false)}
            onBack={() => gotoStep(storyIndex - 1, false)}
            onTogglePlay={() => setStoryPlaying((p) => !p)}
            onClose={exitStory}
          />
        )}
      </main>
      <div className="hidden w-[380px] shrink-0 lg:block">
        <LegendPanel focus={focus} onFocusChange={handleFocusChange} />
      </div>
    </div>
  );
}
