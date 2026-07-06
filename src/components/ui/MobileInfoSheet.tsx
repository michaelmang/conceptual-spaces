"use client";

import { useState } from "react";
import Link from "next/link";
import { FACULTIES, LAYER_ZONES } from "@/lib/cognitive-model";
import type { SceneFocus } from "@/lib/camera-focus";
import { GUIDE_PATH } from "@/lib/reading-guide";
import { PAPER_URL } from "@/lib/site";

function focusInfo(focus: SceneFocus): { title: string; body: string } {
  if (focus.kind === "overview") {
    return {
      title: "Aristotelian-Thomistic Cognitive Architecture",
      body: "Gärdenfors' conceptual spaces in the middle; Aristotelian sense perception below and the intellect above fill the gaps the geometric framework leaves open. Tap ▶ Story for a guided walkthrough.",
    };
  }
  if (focus.kind === "layer") {
    const zone = LAYER_ZONES[focus.id];
    return { title: zone.label, body: zone.summary };
  }
  const faculty = FACULTIES.find((f) => f.id === focus.id)!;
  return { title: faculty.label, body: faculty.description };
}

/** Compact top banner for < lg screens, where the sidebar legend is hidden */
export function MobileInfoSheet({ focus }: { focus: SceneFocus }) {
  const [collapsed, setCollapsed] = useState(false);
  const { title, body } = focusInfo(focus);

  return (
    <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-md lg:hidden">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="block w-full px-4 pt-2.5 pb-1 text-left"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <span aria-hidden className="text-xs text-white/40">
            {collapsed ? "▾" : "▴"}
          </span>
        </div>
        {!collapsed && (
          <p className="mt-1 text-xs leading-relaxed text-white/55">{body}</p>
        )}
      </button>
      {!collapsed ? (
        <div className="flex items-center gap-4 px-4 pb-2.5">
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#4a9eff]"
          >
            Read the paper ↗
          </a>
          <Link
            href={GUIDE_PATH}
            className="text-xs font-medium text-[#6ecf8a]"
          >
            Reading guide →
          </Link>
        </div>
      ) : (
        <div className="pb-1.5" />
      )}
    </div>
  );
}
