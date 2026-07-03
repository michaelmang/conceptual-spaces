/** Shared palette for favicon and social preview assets */
export const BRAND = {
  background: "#0a0e1a",
  foreground: "#f4f4f5",
  muted: "#a1a1aa",
  gradientStops: [
    "#e8c547",
    "#4a9eff",
    "#818cf8",
    "#22d3ee",
    "#f472b6",
    "#6ecf8a",
  ] as const,
  orbGradient:
    "linear-gradient(135deg, #e8c547 0%, #4a9eff 22%, #818cf8 44%, #22d3ee 66%, #f472b6 82%, #6ecf8a 100%)",
  orbSheen:
    "linear-gradient(315deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%)",
} as const;

export const BACKDROP_BLOBS = [
  { color: "#4a9eff", x: -120, y: -80, size: 520 },
  { color: "#e8c547", x: 720, y: -100, size: 480 },
  { color: "#818cf8", x: 640, y: 280, size: 500 },
  { color: "#22d3ee", x: -80, y: 320, size: 460 },
  { color: "#f472b6", x: 380, y: 120, size: 420 },
] as const;

export function GradientOrb({ size }: { size: number }) {
  const inner = Math.round(size * 0.38);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: BRAND.orbGradient,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: BRAND.orbSheen,
        }}
      />
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: "50%",
          background: BRAND.background,
        }}
      />
    </div>
  );
}
