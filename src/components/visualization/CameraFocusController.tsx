"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getCameraFrame, type CameraFrame, type SceneFocus } from "@/lib/camera-focus";

const LERP = 0.09;
const SNAP_EPSILON = 0.04;
const ORBIT_SPEED = 0.42;

function beginOrbitFromFrame(
  frame: CameraFrame,
  center: THREE.Vector3,
  orbit: { radius: number; height: number; angle: number },
) {
  const [px, py, pz] = frame.position;
  const [tx, ty, tz] = frame.target;
  const dx = px - tx;
  const dy = py - ty;
  const dz = pz - tz;

  center.set(tx, ty, tz);
  orbit.radius = Math.hypot(dx, dz) || 8;
  orbit.height = dy;
  orbit.angle = Math.atan2(dx, dz);
}

function applyOrbit(
  camera: THREE.Camera,
  controls: OrbitControlsImpl,
  center: THREE.Vector3,
  orbit: { radius: number; height: number; angle: number },
) {
  camera.position.set(
    center.x + Math.sin(orbit.angle) * orbit.radius,
    center.y + orbit.height,
    center.z + Math.cos(orbit.angle) * orbit.radius,
  );
  controls.target.copy(center);
  controls.update();
}

export function CameraFocusController({
  focus,
  controlsRef,
  tourOrbiting,
}: {
  focus: SceneFocus;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  tourOrbiting: boolean;
}) {
  const { camera } = useThree();
  const desiredPosition = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const animating = useRef(false);
  const orbitCenter = useRef(new THREE.Vector3());
  const orbit = useRef({ radius: 8, height: 2, angle: 0 });
  const orbitActive = useRef(false);
  const currentFrame = useRef<CameraFrame>(getCameraFrame(focus));

  const startOrbit = () => {
    beginOrbitFromFrame(currentFrame.current, orbitCenter.current, orbit.current);
    orbitActive.current = true;
  };

  useEffect(() => {
    const frame = getCameraFrame(focus);
    currentFrame.current = frame;
    desiredPosition.current.set(...frame.position);
    desiredTarget.current.set(...frame.target);
    orbitActive.current = false;
    animating.current = true;
  }, [focus]);

  useEffect(() => {
    if (!tourOrbiting) {
      orbitActive.current = false;
      return;
    }
    if (!animating.current) {
      startOrbit();
    }
  }, [tourOrbiting, focus]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (animating.current) {
      camera.position.lerp(desiredPosition.current, LERP);
      controls.target.lerp(desiredTarget.current, LERP);
      controls.update();

      const posDone = camera.position.distanceTo(desiredPosition.current) < SNAP_EPSILON;
      const targetDone = controls.target.distanceTo(desiredTarget.current) < SNAP_EPSILON;
      if (posDone && targetDone) {
        camera.position.copy(desiredPosition.current);
        controls.target.copy(desiredTarget.current);
        controls.update();
        animating.current = false;
        if (tourOrbiting) startOrbit();
      }
      return;
    }

    if (!tourOrbiting || !orbitActive.current) return;

    orbit.current.angle += delta * ORBIT_SPEED;
    applyOrbit(camera, controls, orbitCenter.current, orbit.current);
  });

  return null;
}
