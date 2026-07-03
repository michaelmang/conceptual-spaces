import { ImageResponse } from "next/og";
import { BACKDROP_BLOBS, BRAND, GradientOrb } from "@/lib/brand";

export const alt = "Conceptual Spaces — Cognitive Architecture Visualization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
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
              background: `radial-gradient(circle, ${blob.color}88 0%, ${blob.color}22 42%, transparent 72%)`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 72,
            right: 88,
            display: "flex",
          }}
        >
          <GradientOrb size={220} />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 760,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {BRAND.gradientStops.map((color) => (
              <div
                key={color}
                style={{
                  width: 48,
                  height: 6,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${color}, ${color}88)`,
                }}
              />
            ))}
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: BRAND.foreground,
            }}
          >
            Conceptual Spaces
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 1.35,
              color: BRAND.muted,
            }}
          >
            Cognitive Architecture Visualization
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 22,
              lineHeight: 1.45,
              color: "#71717a",
              maxWidth: 680,
            }}
          >
            Aristotelian-Thomistic faculty psychology unified with Gärdenfors&apos;
            conceptual spaces
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
