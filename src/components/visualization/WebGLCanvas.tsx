"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import type { CanvasProps } from "@react-three/fiber";

type WebGLCanvasProps = Omit<CanvasProps, "onCreated"> & {
  children: ReactNode;
  onContextLost?: () => void;
  onContextRestored?: () => void;
};

function WebGLContextGuard({
  onLost,
  onRestored,
}: {
  onLost: () => void;
  onRestored: () => void;
}) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };

    const handleRestored = () => {
      onRestored();
    };

    canvas.addEventListener("webglcontextlost", handleLost, false);
    canvas.addEventListener("webglcontextrestored", handleRestored, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
      const ext = gl.getContext().getExtension("WEBGL_lose_context");
      ext?.loseContext();
      gl.dispose();
    };
  }, [gl, onLost, onRestored]);

  return null;
}

export function WebGLCanvas({
  children,
  onContextLost,
  onContextRestored,
  ...canvasProps
}: WebGLCanvasProps) {
  const [canvasKey, setCanvasKey] = useState(0);
  const [contextLost, setContextLost] = useState(false);

  const handleLost = useCallback(() => {
    setContextLost(true);
    onContextLost?.();
  }, [onContextLost]);

  const handleRestored = useCallback(() => {
    setContextLost(false);
    onContextRestored?.();
  }, [onContextRestored]);

  const reloadScene = useCallback(() => {
    setContextLost(false);
    setCanvasKey((key) => key + 1);
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        key={canvasKey}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        {...canvasProps}
      >
        <WebGLContextGuard onLost={handleLost} onRestored={handleRestored} />
        {children}
      </Canvas>

      {contextLost && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#080c16]/90 backdrop-blur-sm">
          <div className="max-w-sm rounded-xl border border-white/10 bg-black/80 px-6 py-5 text-center">
            <p className="text-sm font-medium text-white">WebGL context lost</p>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              The GPU released this 3D view — common after hot reload or heavy GPU use.
            </p>
            <button
              type="button"
              onClick={reloadScene}
              className="mt-4 rounded-lg bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25"
            >
              Reload visualization
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
