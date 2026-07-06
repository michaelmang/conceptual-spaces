"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LegendPanel } from "@/components/ui/LegendPanel";
import { FacultyTourBar } from "@/components/ui/FacultyTourBar";
import { StoryCaption } from "@/components/ui/StoryCaption";
import { MobileInfoSheet } from "@/components/ui/MobileInfoSheet";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import {
  parseFocus,
  serializeFocus,
  type SceneFocus,
} from "@/lib/camera-focus";
import { STORY_STEPS, STORY_STEP_MS } from "@/lib/story";
import { parseStepParam } from "@/lib/site";

const INTRO_SEEN_KEY = "cs-intro-seen";

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

export function HomeClient() {
  const [focus, setFocus] = useState<SceneFocus>({ kind: "overview" });
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

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

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    try {
      window.localStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // private mode — showing the intro again next visit is fine
    }
  }, []);

  // Auto-advance while playing; gotoStep stops playback at the final step
  useEffect(() => {
    if (!storyPlaying || storyIndex === null) return;
    const timer = window.setTimeout(() => gotoStep(storyIndex + 1, true), STORY_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [storyPlaying, storyIndex, gotoStep]);

  // Deep links: read ?step= / ?focus= once after mount, keep them in sync afterwards.
  // First-time visitors landing on the bare URL get the intro overlay instead.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const step = parseStepParam(params.get("step"));
    const initial = parseFocus(params.get("focus"));
    if (step !== null) {
      const timer = window.setTimeout(() => gotoStep(step, false), 0);
      return () => window.clearTimeout(timer);
    }
    if (initial) {
      const timer = window.setTimeout(() => setFocus(initial), 0);
      return () => window.clearTimeout(timer);
    }
    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      // ignore
    }
    if (seen) return;
    const timer = window.setTimeout(() => setShowIntro(true), 0);
    return () => window.clearTimeout(timer);
  }, [gotoStep]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (storyIndex !== null) {
      url.searchParams.set("step", String(storyIndex + 1));
      url.searchParams.delete("focus");
    } else {
      url.searchParams.delete("step");
      if (focus.kind === "overview") {
        url.searchParams.delete("focus");
      } else {
        url.searchParams.set("focus", serializeFocus(focus));
      }
    }
    window.history.replaceState(null, "", url);
  }, [focus, storyIndex]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <main className="relative min-w-0 flex-1">
        <CognitiveScene focus={focus} tourPlaying={storyPlaying} />
        {showIntro && (
          <IntroOverlay
            onPlayStory={() => {
              dismissIntro();
              gotoStep(0, true);
            }}
            onExplore={dismissIntro}
          />
        )}
        {!storyActive && !showIntro && <MobileInfoSheet focus={focus} />}
        {!storyActive && !showIntro && (
          <FacultyTourBar
            focus={focus}
            onTogglePlay={() => gotoStep(0, true)}
            onOverview={() => handleFocusChange({ kind: "overview" })}
          />
        )}
        {storyIndex !== null && !showIntro && (
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
