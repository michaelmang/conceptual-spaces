import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { BACKDROP_BLOBS, BRAND } from "@/lib/brand";
import { FACULTIES, LAYER_ZONES, PIPELINE_STATIONS } from "@/lib/cognitive-model";
import type { LayerZoneId } from "@/lib/camera-focus";
import { describeParams, PAPER_AUTHOR, SITE_URL } from "@/lib/site";
import { STORY_STEPS } from "@/lib/story";

const SIZE = { width: 1200, height: 630 };

/** Which tower layer each faculty belongs to, following the story's grouping */
const FACULTY_LAYER: Record<string, LayerZoneId> = {
  reality: "below",
  senses: "below",
  "common-sense": "below",
  imagination: "below",
  cogitative: "middle",
  "conceptual-space": "middle",
  memory: "middle",
  intellect: "above",
};

const TOWER: { id: LayerZoneId; name: string; word: string }[] = [
  { id: "above", name: "INTELLECT", word: "necessity" },
  { id: "middle", name: "CONCEPTUAL SPACE", word: "typicality" },
  { id: "below", name: "SENSES", word: "reception" },
];

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

interface CardView {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  activeLayer: LayerZoneId | null;
}

function resolveView(searchParams: URLSearchParams): CardView {
  if (searchParams.get("view") === "guide") {
    return {
      eyebrow: "THE READING GUIDE",
      title: "Read your way up the tower.",
      description:
        "Station-by-station sources for the paper — Aristotle and Aquinas below, Gärdenfors in the middle, the intellect above, GPT-2 as coda.",
      accent: "#6ecf8a",
      activeLayer: null,
    };
  }

  const view = describeParams({
    focus: searchParams.get("focus") ?? undefined,
    step: searchParams.get("step") ?? undefined,
  });

  if (view.stepIndex !== null) {
    const step = STORY_STEPS[view.stepIndex];
    const focus = step.focus;
    const accent =
      focus.kind === "faculty"
        ? (FACULTIES.find((f) => f.id === focus.id)?.color ?? BRAND.foreground)
        : focus.kind === "layer"
          ? LAYER_ZONES[focus.id].color
          : BRAND.foreground;
    return {
      eyebrow: `STORY · STEP ${view.stepIndex + 1} OF ${STORY_STEPS.length}`,
      title: step.title,
      description: clamp(step.narration, 170),
      accent,
      activeLayer:
        focus.kind === "faculty"
          ? FACULTY_LAYER[focus.id]
          : focus.kind === "layer"
            ? focus.id
            : null,
    };
  }

  if (view.focus.kind === "faculty") {
    const focusId = view.focus.id;
    const faculty = FACULTIES.find((f) => f.id === focusId)!;
    const station = PIPELINE_STATIONS.find((s) => s.id === faculty.id);
    return {
      eyebrow: station
        ? `STATION ${station.step} OF ${PIPELINE_STATIONS.length}`
        : "STATION",
      title: faculty.label,
      description: clamp(faculty.description, 170),
      accent: faculty.color,
      activeLayer: FACULTY_LAYER[faculty.id] ?? null,
    };
  }

  if (view.focus.kind === "layer") {
    const zone = LAYER_ZONES[view.focus.id];
    return {
      eyebrow: "COGNITIVE LAYER",
      title: zone.label,
      description: `${zone.summary}. One layer of an interactive 3D map of the mind.`,
      accent: zone.color,
      activeLayer: view.focus.id,
    };
  }

  return {
    eyebrow: "AN INTERACTIVE 3D MAP OF THE MIND",
    title: "Aristotle mapped the mind 2,300 years before cognitive science.",
    description:
      "Sensation below · concept spaces in the middle · intellect above. Gärdenfors' geometry of concepts, completed by Aristotle and Aquinas.",
    accent: BRAND.foreground,
    activeLayer: null,
  };
}

export async function GET(request: NextRequest) {
  const view = resolveView(request.nextUrl.searchParams);
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.background,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {BACKDROP_BLOBS.map((blob) => (
          <div
            key={`${blob.color}-${blob.x}`}
            style={{
              position: "absolute",
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${blob.color}55 0%, ${blob.color}18 42%, transparent 72%)`,
            }}
          />
        ))}

        {/* Left: copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 24px 48px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: view.accent,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: view.accent,
              }}
            />
            {view.eyebrow}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: view.title.length > 40 ? 52 : 64,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: BRAND.foreground,
                maxWidth: 720,
              }}
            >
              {view.title}
            </div>
            <div
              style={{
                fontSize: 25,
                lineHeight: 1.4,
                color: BRAND.muted,
                maxWidth: 680,
              }}
            >
              {view.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: "#71717a",
            }}
          >
            <span style={{ color: BRAND.foreground, fontWeight: 600 }}>{host}</span>
            <span>·</span>
            <span>companion to the paper by {PAPER_AUTHOR}</span>
          </div>
        </div>

        {/* Right: the three-layer tower */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 330,
            paddingRight: 72,
            gap: 0,
          }}
        >
          {TOWER.map((layer, i) => {
            const zone = LAYER_ZONES[layer.id];
            const active = view.activeLayer === null || view.activeLayer === layer.id;
            return (
              <div
                key={layer.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 3,
                      height: 26,
                      background: "rgba(255,255,255,0.22)",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 300,
                    height: 116,
                    borderRadius: 20,
                    border: `2px solid ${zone.color}${active ? "" : "44"}`,
                    background: `${zone.color}${active ? "2e" : "14"}`,
                    boxShadow: active ? `0 0 44px ${zone.color}44` : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: layer.name.length > 10 ? 22 : 26,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textAlign: "center",
                      padding: "0 16px",
                      color: active ? zone.color : `${zone.color}88`,
                    }}
                  >
                    {layer.name}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 19,
                      color: active ? BRAND.muted : "#52525b",
                    }}
                  >
                    {layer.word}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
