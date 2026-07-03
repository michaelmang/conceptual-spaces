"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Billboard, Text } from "@react-three/drei";
import { getFocusAnchor, type SceneFocus } from "@/lib/camera-focus";

function PulsingRing({
  phaseOffset,
  speed,
  color,
  baseScale,
  intensity,
}: {
  phaseOffset: number;
  speed: number;
  color: string;
  baseScale: number;
  intensity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const phase = (state.clock.elapsedTime * speed * 0.55 + phaseOffset) % 1;
    const scale = baseScale * (0.55 + phase * 2.1);
    mesh.scale.set(scale, scale, 1);
    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = (1 - phase) * intensity;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.32, 0.4, 40]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function ActiveFocusIndicator({
  focus,
  tourPlaying,
}: {
  focus: SceneFocus;
  tourPlaying: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const targetPosition = useRef(new THREE.Vector3());

  const anchor = useMemo(() => getFocusAnchor(focus), [focus]);
  const pulseSpeed = tourPlaying ? 2.6 : 1.5;
  const pulseIntensity = tourPlaying ? 0.95 : 0.65;

  useEffect(() => {
    targetPosition.current.set(...anchor.position);
  }, [anchor.position]);

  useFrame((state) => {
    const group = groupRef.current;
    if (group) {
      group.position.lerp(targetPosition.current, 0.14);
    }

    const pulse = (Math.sin(state.clock.elapsedTime * pulseSpeed) + 1) / 2;

    if (coreRef.current) {
      const coreScale = anchor.scale * (1 + pulse * (tourPlaying ? 0.45 : 0.25));
      coreRef.current.scale.setScalar(coreScale);
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.45 + pulse * (tourPlaying ? 1.1 : 0.55);
    }

    if (beamRef.current) {
      const beamScale = 1 + pulse * 0.35;
      beamRef.current.scale.set(anchor.scale * 0.14 * beamScale, anchor.scale * 1.6, anchor.scale * 0.14 * beamScale);
      const material = beamRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.06 + pulse * (tourPlaying ? 0.14 : 0.08);
    }
  });

  return (
    <group ref={groupRef} position={anchor.position}>
      <PulsingRing
        phaseOffset={0}
        speed={pulseSpeed}
        color={anchor.color}
        baseScale={anchor.scale}
        intensity={pulseIntensity}
      />
      <PulsingRing
        phaseOffset={0.5}
        speed={pulseSpeed}
        color={anchor.color}
        baseScale={anchor.scale}
        intensity={pulseIntensity * 0.85}
      />

      <mesh ref={beamRef} position={[0, anchor.scale * 0.75, 0]}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshBasicMaterial color={anchor.color} transparent opacity={0.1} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial
          color={anchor.color}
          emissive={anchor.color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28 * anchor.scale, 0.34 * anchor.scale, 40]} />
        <meshBasicMaterial color={anchor.color} transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>

      <Billboard position={[0, anchor.scale * 0.55 + 0.35, 0]}>
        {anchor.step !== undefined ? (
          <Text
            fontSize={0.14}
            color={anchor.color}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {anchor.step}
          </Text>
        ) : (
          <Text
            fontSize={0.08}
            color={anchor.color}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.015}
            outlineColor="#000000"
            maxWidth={2.2}
            textAlign="center"
          >
            {anchor.label}
          </Text>
        )}
      </Billboard>
    </group>
  );
}
