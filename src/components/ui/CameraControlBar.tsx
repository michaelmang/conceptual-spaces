"use client";

import type { CameraControlMode } from "@/components/visualization/CognitiveScene";

export function CameraControlBar({
  mode,
  onModeChange,
}: {
  mode: CameraControlMode;
  onModeChange: (mode: CameraControlMode) => void;
}) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden flex-col gap-2 sm:flex">
      <div className="pointer-events-auto flex items-center gap-1 rounded-lg border border-white/10 bg-black/70 p-1 backdrop-blur-md">
        <ControlButton
          active={mode === "orbit"}
          onClick={() => onModeChange("orbit")}
          label="Orbit"
          title="Drag to rotate around the scene"
        />
        <ControlButton
          active={mode === "pan"}
          onClick={() => onModeChange("pan")}
          label="Pan"
          title="Drag to move the view sideways"
        />
      </div>
      <p className="rounded-lg bg-black/50 px-3 py-1.5 text-[11px] text-white/50 backdrop-blur-sm">
        {mode === "orbit" ? (
          <>
            <span className="text-white/70">Drag</span> rotate ·{" "}
            <span className="text-white/70">Right-drag</span> pan ·{" "}
            <span className="text-white/70">Scroll</span> zoom
          </>
        ) : (
          <>
            <span className="text-white/70">Drag</span> pan ·{" "}
            <span className="text-white/70">Right-drag</span> rotate ·{" "}
            <span className="text-white/70">Scroll</span> zoom
          </>
        )}
      </p>
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  label,
  title,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-white/15 text-white"
          : "text-white/50 hover:bg-white/5 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}
