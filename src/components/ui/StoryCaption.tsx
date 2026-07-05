"use client";

import { STORY_STEPS, type StoryStep } from "@/lib/story";

export function StoryCaption({
  step,
  index,
  playing,
  onNext,
  onBack,
  onTogglePlay,
  onClose,
}: {
  step: StoryStep;
  index: number;
  playing: boolean;
  onNext: () => void;
  onBack: () => void;
  onTogglePlay: () => void;
  onClose: () => void;
}) {
  const total = STORY_STEPS.length;

  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-4 z-20 flex justify-center">
      <div className="pointer-events-auto w-full max-w-[560px] rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-md">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Story · {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            title="Exit story"
            className="rounded px-1.5 text-sm leading-none text-white/40 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
        <h2 className="mt-1 text-base font-semibold text-white">{step.title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-white/65">{step.narration}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={index === 0}
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15 disabled:opacity-30"
          >
            ‹ Back
          </button>
          <button
            type="button"
            onClick={onTogglePlay}
            title={playing ? "Pause auto-advance" : "Resume auto-advance"}
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15 disabled:opacity-30"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
