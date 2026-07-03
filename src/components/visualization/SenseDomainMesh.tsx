"use client";

/** Gärdenfors quality-domain geometry per sense */
export type SenseDomainShape =
  | "bicone" // Color: hue × brightness × intensity (integral)
  | "tetrahedron" // Taste: 4 basic dimensions
  | "cylinder" // Sound: pitch × loudness × timbre
  | "hypersphere" // Smell: high-dimensional odor space
  | "orthotope"; // Touch: separable heat / moisture / pressure

export function SenseDomainMesh({
  shape,
  color = "#e07a3a",
}: {
  shape: SenseDomainShape;
  color?: string;
}) {
  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.35}
      transparent
      opacity={0.8}
      wireframe
    />
  );

  switch (shape) {
    case "bicone":
      // Color spindle — double cone (Gärdenfors color domain)
      return (
        <group scale={0.22}>
          <mesh position={[0, 0.35, 0]}>
            <coneGeometry args={[0.5, 0.7, 16, 1, true]} />
            {mat}
          </mesh>
          <mesh position={[0, -0.35, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.5, 0.7, 16, 1, true]} />
            {mat}
          </mesh>
        </group>
      );

    case "tetrahedron":
      // 4D taste space (sweet, sour, salty, bitter) → 3D tetrahedron
      return (
        <mesh scale={0.28}>
          <tetrahedronGeometry args={[1, 0]} />
          {mat}
        </mesh>
      );

    case "cylinder":
      // Pitch × loudness × timbre — cylindrical tonal space
      return (
        <mesh scale={[0.18, 0.32, 0.18]}>
          <cylinderGeometry args={[1, 1, 1, 20, 1, true]} />
          {mat}
        </mesh>
      );

    case "hypersphere":
      // High-dimensional odor domain — projected as sphere
      return (
        <mesh scale={0.26}>
          <icosahedronGeometry args={[1, 1]} />
          {mat}
        </mesh>
      );

    case "orthotope":
      // Separable touch dimensions (heat, moisture, pressure)
      return (
        <mesh scale={[0.32, 0.24, 0.2]}>
          <boxGeometry args={[1, 1, 1]} />
          {mat}
        </mesh>
      );

    default:
      return null;
  }
}
