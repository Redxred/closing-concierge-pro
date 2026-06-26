import { Suspense, lazy, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment, ContactShadows } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Mesh } from "three";

function ContractCard({ idle }: { idle: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current || !idle) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y += (x * 0.4 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-y * 0.3 - ref.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={idle ? 1.4 : 0} rotationIntensity={idle ? 0.4 : 0} floatIntensity={idle ? 0.8 : 0}>
      <group>
        {/* back card */}
        <RoundedBox args={[2.3, 3.1, 0.08]} radius={0.12} smoothness={6} position={[-0.35, -0.2, -0.2]}>
          <meshStandardMaterial color="#FFE9DD" roughness={0.4} metalness={0.05} />
        </RoundedBox>
        {/* front card */}
        <RoundedBox ref={ref} args={[2.4, 3.2, 0.1]} radius={0.14} smoothness={6}>
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} metalness={0.08} />
        </RoundedBox>
        {/* accent stripe */}
        <mesh position={[0, 1.2, 0.06]}>
          <planeGeometry args={[1.6, 0.18]} />
          <meshStandardMaterial color="#FF7A45" />
        </mesh>
        {/* document lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.6 - i * 0.32, 0.06]}>
            <planeGeometry args={[1.7, 0.07]} />
            <meshStandardMaterial color="#E8E8E8" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  const reduce = useReducedMotion();
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#FF7A45" />
      <ContractCard idle={!reduce} />
      <ContactShadows position={[0, -2, 0]} opacity={0.25} scale={8} blur={2.4} far={3} />
      <Environment preset="city" />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default Hero3D;