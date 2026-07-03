"use client";

import { Suspense, useRef, useState } from "react";
import { MOUSE } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SensationLayer } from "./SensationLayer";
import { CogitativeZone, MemoryZone } from "./MiddleZones";
import { ConceptualSpaceLayer } from "./ConceptualSpaceLayer";
import { IntellectLayer } from "./IntellectLayer";
import { FlowParticles } from "./FlowParticles";
import { LayerBoundaries } from "./LayerBoundaries";
import { FlowArrow } from "./FlowArrow";
import { CameraFocusController } from "./CameraFocusController";
import { ActiveFocusIndicator } from "./ActiveFocusIndicator";
import { PIPELINE_STATIONS } from "@/lib/cognitive-model";
import type { SceneFocus } from "@/lib/camera-focus";
import { CameraControlBar } from "@/components/ui/CameraControlBar";
import { WebGLCanvas } from "./WebGLCanvas";

export type CameraControlMode = "orbit" | "pan";

const MOUSE_BINDINGS: Record<
  CameraControlMode,
  { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE }
> = {
  orbit: {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.PAN,
  },
  pan: {
    LEFT: MOUSE.PAN,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.ROTATE,
  },
};

function InterLayerArrows() {
  const imagination = PIPELINE_STATIONS.find((s) => s.id === "imagination")!;
  const cogitative = PIPELINE_STATIONS.find((s) => s.id === "cogitative")!;
  const conceptual = PIPELINE_STATIONS.find((s) => s.id === "conceptual-space")!;
  const memory = PIPELINE_STATIONS.find((s) => s.id === "memory")!;
  const intellect = PIPELINE_STATIONS.find((s) => s.id === "intellect")!;

  return (
    <>
      <FlowArrow start={imagination.position} end={cogitative.position} color="#3d8b8b" />
      <FlowArrow
        start={cogitative.position}
        end={conceptual.position}
        color="#4a9eff"
        opacity={0.35}
      />
      <FlowArrow
        start={conceptual.position}
        end={memory.position}
        color="#7b6b9e"
        opacity={0.35}
      />
      <FlowArrow start={conceptual.position} end={intellect.position} color="#e8c547" />
    </>
  );
}

function SceneContent({
  controlMode,
  focus,
  tourPlaying,
  controlsRef,
}: {
  controlMode: CameraControlMode;
  focus: SceneFocus;
  tourPlaying: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 10, 6]} intensity={0.9} color="#fff5e6" />
      <directionalLight position={[-6, 4, -4]} intensity={0.25} color="#4a9eff" />
      <pointLight position={[0, 5.5, 0]} intensity={0.5} color="#e8c547" />
      <pointLight position={[0, -4, 0]} intensity={0.35} color="#c45c26" />

      <Stars radius={80} depth={40} count={600} factor={2} saturation={0.15} fade speed={0.2} />

      <LayerBoundaries />
      <SensationLayer />
      <CogitativeZone />
      <ConceptualSpaceLayer />
      <MemoryZone />
      <IntellectLayer />
      <InterLayerArrows />
      <FlowParticles />

      <ActiveFocusIndicator focus={focus} tourPlaying={tourPlaying} />

      <CameraFocusController
        focus={focus}
        controlsRef={controlsRef}
        tourOrbiting={tourPlaying}
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        enableZoom
        enableDamping
        dampingFactor={0.08}
        screenSpacePanning
        panSpeed={1}
        minDistance={8}
        maxDistance={30}
        target={[0, 0.5, 0]}
        maxPolarAngle={Math.PI * 0.88}
        mouseButtons={MOUSE_BINDINGS[controlMode]}
      />
    </>
  );
}

export function CognitiveScene({
  focus,
  tourPlaying = false,
}: {
  focus: SceneFocus;
  tourPlaying?: boolean;
}) {
  const [controlMode, setControlMode] = useState<CameraControlMode>("orbit");
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative h-full w-full">
      <WebGLCanvas
        camera={{ position: [0, 2, 14], fov: 48, near: 0.1, far: 100 }}
        style={{
          background: "linear-gradient(180deg, #080c16 0%, #0d1526 45%, #080c16 100%)",
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            controlMode={controlMode}
            focus={focus}
            tourPlaying={tourPlaying}
            controlsRef={controlsRef}
          />
        </Suspense>
      </WebGLCanvas>
      <CameraControlBar mode={controlMode} onModeChange={setControlMode} />
    </div>
  );
}
