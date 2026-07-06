"use client";

import { BRAND } from "@/lib/brand";
import { HOOK, PAPER_AUTHOR, PAPER_URL } from "@/lib/site";

/** First-visit hero: states the claim, then routes to story / free explore / paper */
export function IntroOverlay({
  onPlayStory,
  onExplore,
}: {
  onPlayStory: () => void;
  onExplore: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[3px]">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0a0e1a]/95 p-6 shadow-2xl sm:p-8">
        <div className="flex gap-2">
          {BRAND.gradientStops.map((color) => (
            <span
              key={color}
              className="h-1 w-8 rounded-full"
              style={{ background: color }}
            />
          ))}
        </div>

        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
          An interactive 3D map of the mind
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-[28px]">
          {HOOK}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Modern cognitive science models concepts as geometry — Gärdenfors&apos;{" "}
          <em>conceptual spaces</em>. This visualization shows where that geometry
          sits in the classical map of the mind: sensation below it, intellect
          above it — and the two gaps it leaves open, filled.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onPlayStory}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-white/90"
          >
            ▶ Play the 2-minute story
          </button>
          <button
            type="button"
            onClick={onExplore}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Explore freely
          </button>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 py-2 text-sm font-medium text-[#4a9eff] transition-colors hover:text-[#7ab8ff] sm:ml-auto"
          >
            Read the paper ↗
          </a>
        </div>

        <p className="mt-5 border-t border-white/10 pt-3 text-[11px] text-white/30">
          Companion to “Beyond and Below Cognitive Space” by {PAPER_AUTHOR}
        </p>
      </div>
    </div>
  );
}
