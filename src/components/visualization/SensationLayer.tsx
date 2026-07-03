"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  SENSE_ORGANS,
  SENSE_RING,
  PIPELINE_STATIONS,
} from "@/lib/cognitive-model";
import { AnnotationLabel } from "./AnnotationLabel";
import { FlowArrow } from "./FlowArrow";
import { SegmentLine } from "./SegmentLine";
import { SenseDomainMesh } from "./SenseDomainMesh";

function SenseOnLine({
  position,
  label,
  domainLabel,
  domainShape,
  labelOffset,
}: {
  position: [number, number, number];
  label: string;
  domainLabel: string;
  domainShape: (typeof SENSE_ORGANS)[number]["domainShape"];
  labelOffset: [number, number, number];
}) {
  return (
    <group position={position}>
      <SenseDomainMesh shape={domainShape} />
      <AnnotationLabel
        position={labelOffset}
        title={label}
        subtitle={domainLabel}
        color="#e07a3a"
        fontSize={0.09}
        subtitleGap={1.8}
      />
    </group>
  );
}

export function SensationLayer() {
  const commonSenseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (commonSenseRef.current) {
      commonSenseRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  const [reality, , commonSense, imagination] = PIPELINE_STATIONS;
  const hub: [number, number, number] = [0, SENSE_RING.commonY, 0];

  const senseNodes = useMemo(
    () =>
      SENSE_ORGANS.map((s) => {
        const x = Math.cos(s.angle) * SENSE_RING.radius;
        const z = Math.sin(s.angle) * SENSE_RING.radius;
        const outward = new THREE.Vector3(x, 0, z).normalize();
        return {
          ...s,
          position: [x, SENSE_RING.y, z] as [number, number, number],
          labelOffset: [
            outward.x * 0.75,
            0.42,
            outward.z * 0.75,
          ] as [number, number, number],
        };
      }),
    [],
  );

  return (
    <group>
      <group position={reality.position}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
          <circleGeometry args={[2.8, 48]} />
          <meshStandardMaterial color="#3d2e0a" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
          <ringGeometry args={[2.3, 2.8, 48]} />
          <meshStandardMaterial color="#8b6914" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {[
          [-1, 0, 0.8],
          [0.9, 0, -0.6],
          [0.2, 0, 1.1],
        ].map(([x, , z], i) => (
          <mesh key={i} position={[x, 0.15, z]}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshStandardMaterial color="#c9a227" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}
        <AnnotationLabel
          position={[0, 1.5, 0]}
          step={reality.step}
          title={reality.label}
          subtitle={reality.subtitle}
          color={reality.color}
          subtitleGap={1.8}
        />
      </group>

      <FlowArrow start={reality.position} end={senseNodes[0].position} color="#c45c26" opacity={0.3} />

      <AnnotationLabel
        position={[-3.8, SENSE_RING.y + 0.7, 2.2]}
        step={2}
        title="External Senses"
        subtitle="Each shape = quality domain"
        color="#c45c26"
        fontSize={0.13}
        anchorX="left"
        subtitleGap={1.8}
      />

      {senseNodes.map((s) => (
        <group key={s.id}>
          <SegmentLine start={s.position} end={hub} color="#d4845c" opacity={0.55} />
          <SenseOnLine
            position={s.position}
            label={s.label}
            domainLabel={s.domainLabel}
            domainShape={s.domainShape}
            labelOffset={s.labelOffset}
          />
        </group>
      ))}

      <group position={hub}>
        <mesh ref={commonSenseRef}>
          <torusGeometry args={[0.45, 0.09, 16, 32]} />
          <meshStandardMaterial color="#d4845c" emissive="#d4845c" emissiveIntensity={0.5} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#f0c4a0" emissive="#d4845c" emissiveIntensity={0.3} />
        </mesh>
        <AnnotationLabel
          position={[0, 1.25, 0]}
          step={commonSense.step}
          title={commonSense.label}
          subtitle={commonSense.subtitle}
          color={commonSense.color}
          subtitleGap={1.8}
        />
      </group>

      <FlowArrow start={hub} end={imagination.position} color="#5b8a72" />

      <group position={imagination.position}>
        <mesh>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshStandardMaterial
            color="#7ab89a"
            emissive="#5b8a72"
            emissiveIntensity={0.35}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#5b8a72" transparent opacity={0.2} wireframe />
        </mesh>
        <AnnotationLabel
          position={[0, 1.15, 0]}
          step={imagination.step}
          title={imagination.label}
          subtitle={imagination.subtitle}
          color={imagination.color}
          subtitleGap={1.8}
        />
      </group>
    </group>
  );
}
