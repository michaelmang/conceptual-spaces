"use client";

import { Text } from "@react-three/drei";

export function AnnotationLabel({
  position,
  title,
  subtitle,
  color = "#ffffff",
  step,
  fontSize = 0.18,
  anchorX = "center" as const,
  subtitleGap = 1.5,
}: {
  position: [number, number, number];
  title: string;
  subtitle?: string;
  color?: string;
  step?: number;
  fontSize?: number;
  anchorX?: "left" | "center" | "right";
  /** Multiplier for gap between title and subtitle (default 1.5× fontSize) */
  subtitleGap?: number;
}) {
  const label = step ? `${step}. ${title}` : title;
  const subOffset = fontSize * subtitleGap;

  return (
    <group position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX={anchorX}
        anchorY="bottom"
        maxWidth={2.8}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      {subtitle && (
        <Text
          position={[0, -subOffset, 0]}
          fontSize={fontSize * 0.6}
          color="#ffffff"
          fillOpacity={0.5}
          anchorX={anchorX}
          anchorY="top"
          maxWidth={2.8}
        >
          {subtitle}
        </Text>
      )}
    </group>
  );
}
