"use client";

import Link from "next/link";
import {
  FACULTIES,
  PREDICABLES,
  PERCEPT_TYPES,
  LAYER_ZONES,
  PIPELINE_STATIONS,
} from "@/lib/cognitive-model";
import { GUIDE_PATH, GUIDED_FACULTY_IDS } from "@/lib/reading-guide";
import { TYPICALITY_LEGEND } from "@/lib/gardenfors-figures";
import type { LayerZoneId, SceneFocus } from "@/lib/camera-focus";
import { PAPER_AUTHOR, PAPER_URL } from "@/lib/site";

const LAYER_IDS = Object.keys(LAYER_ZONES) as LayerZoneId[];

function isLayerSelected(focus: SceneFocus, id: LayerZoneId) {
  return focus.kind === "layer" && focus.id === id;
}

function isFacultySelected(focus: SceneFocus, id: string) {
  return focus.kind === "faculty" && focus.id === id;
}

export function LegendPanel({
  focus,
  onFocusChange,
}: {
  focus: SceneFocus;
  onFocusChange: (focus: SceneFocus) => void;
}) {
  const faculty =
    focus.kind === "faculty" ? FACULTIES.find((f) => f.id === focus.id) : undefined;
  const layer =
    focus.kind === "layer" ? LAYER_ZONES[focus.id] : undefined;

  return (
    <aside className="flex h-full w-full max-w-md flex-col overflow-hidden border-l border-white/10 bg-[#0a0e1a]/95 backdrop-blur-md">
      <header className="border-b border-white/10 px-5 py-4">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          Aristotelian-Thomistic Cognitive Architecture
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          Geometric visualization of faculty psychology unified with Gärdenfors&apos;
          conceptual spaces
        </p>
        <div className="mt-2 flex items-center gap-3">
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#4a9eff] transition-colors hover:text-[#7ab8ff]"
          >
            Read the paper ↗
          </a>
          <Link
            href={GUIDE_PATH}
            className="text-xs font-medium text-[#6ecf8a] transition-colors hover:text-[#8fdfa8]"
          >
            Reading guide →
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Overview */}
        <section className="mb-4">
          <button
            type="button"
            onClick={() => onFocusChange({ kind: "overview" })}
            className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
              focus.kind === "overview"
                ? "border-white/20 bg-white/10 ring-1 ring-white/20"
                : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <p className="text-sm text-white/90">⌂ Overview</p>
            <p className="mt-0.5 text-xs text-white/40">
              Frame the whole three-layer architecture at once
            </p>
          </button>
        </section>

        {/* Layer zones */}
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Cognitive Layers
          </h2>
          <div className="space-y-2">
            {LAYER_IDS.map((id) => {
              const zone = LAYER_ZONES[id];
              const selected = isLayerSelected(focus, id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onFocusChange({ kind: "layer", id })}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                    selected
                      ? "border-white/20 bg-white/10 ring-1 ring-white/20"
                      : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <p className="text-sm text-white/90">{zone.label}</p>
                  <p className="mt-0.5 text-xs text-white/40">{zone.summary}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Reading guide */}
        <section className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
            How to Read the Scene
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Follow the numbered stations bottom to top. White particles trace the
            main pipeline. The middle layer spreads left-to-right: cogitative
            percepts, conceptual geometry, and memory — then rises from
            conceptual space to intellect.
          </p>
          <ol className="mt-3 space-y-1 text-xs text-white/50">
            {PIPELINE_STATIONS.map((s) => (
              <li key={s.id}>
                <span style={{ color: s.color }}>{s.step}.</span> {s.label}
              </li>
            ))}
          </ol>
        </section>

        {/* Stations */}
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Stations
          </h2>
          <div className="space-y-1">
            {FACULTIES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onFocusChange({ kind: "faculty", id: f.id })}
                className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                  isFacultySelected(focus, f.id)
                    ? "bg-white/10 ring-1 ring-white/20"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="text-sm font-medium text-white">{f.label}</span>
                </div>
                <p className="mt-0.5 pl-4 text-xs text-white/40">{f.subtitle}</p>
                {f.id === "conceptual-space" && (
                  <p className="mt-0.5 pl-4 text-[10px] italic text-[#4a9eff]/70">
                    A representation, not a faculty — the cogitative phantasm,
                    organized geometrically
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Selected layer detail */}
        {layer && (
          <section className="mb-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-sm font-semibold text-[#4a9eff]">{layer.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{layer.summary}</p>
          </section>
        )}

        {/* Selected faculty detail */}
        {faculty && (
          <section className="mb-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-sm font-semibold" style={{ color: faculty.color }}>
              {faculty.label}
            </h3>
            <p className="mt-1 text-xs text-white/50">{faculty.subtitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {faculty.description}
            </p>
            {GUIDED_FACULTY_IDS.has(faculty.id) && (
              <Link
                href={`${GUIDE_PATH}#${faculty.id}`}
                className="mt-2 inline-block text-xs font-medium text-[#6ecf8a] transition-colors hover:text-[#8fdfa8]"
              >
                Sources for this station →
              </Link>
            )}
          </section>
        )}

        {/* Percept types */}
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Gestalt Percepts (Cogitative)
          </h2>
          <div className="space-y-2">
            {PERCEPT_TYPES.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-white/5 px-3 py-2"
                style={{ borderLeftColor: p.color, borderLeftWidth: 3 }}
              >
                <p className="text-sm font-medium text-white">{p.label}</p>
                <p className="text-xs italic text-white/40">{p.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conceptual space — typicality */}
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Conceptual Space · Typicality
          </h2>
          <div className="rounded-lg border border-white/5 px-3 py-2">
            <p className="text-sm font-medium text-[#4a9eff]">{TYPICALITY_LEGEND.title}</p>
            <p className="mt-1 text-xs text-white/50">{TYPICALITY_LEGEND.summary}</p>
            <ul className="mt-2 space-y-1 text-xs text-white/40">
              {TYPICALITY_LEGEND.points.map((point) => (
                <li key={point}>· {point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Predicables */}
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Five Predicables ↔ Gärdenfors
          </h2>
          <div className="space-y-2">
            {PREDICABLES.map((p) => (
              <div key={p.id} className="rounded-lg border border-white/5 px-3 py-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-[#e8c547]">{p.label}</span>
                  <span className="text-xs text-white/30">{p.gardenfors}</span>
                </div>
                <p className="mt-1 text-xs text-white/50">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key insight */}
        <section className="rounded-xl border border-[#e8c547]/20 bg-[#e8c547]/5 p-4">
          <h2 className="text-xs font-medium uppercase tracking-wider text-[#e8c547]/70">
            Unifying Insight
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Conceptual spaces geometrically formalize the cogitative power&apos;s
            non-logical categorical perception. The intellect fills the gap above —
            grasping universals necessarily — while formal sensory reception fills
            the gap below, grounding geometry in reality.
          </p>
        </section>
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-[10px] text-white/30">
        <span>Use Orbit / Pan controls (bottom-left) · Scroll to zoom</span>
        <a
          href={PAPER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-white/40 transition-colors hover:text-white/70"
          title={`Beyond and Below Cognitive Space — ${PAPER_AUTHOR}`}
        >
          Paper ↗
        </a>
      </footer>
    </aside>
  );
}
