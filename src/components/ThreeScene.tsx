import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = t * 0.08;
    const scale = 1.0 + 0.05 * Math.sin(t * 1.2);
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.38, 200, 32]} />
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.1}
        metalness={0.9}
        emissive="#00F5FF"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#00F5FF" size={0.015} transparent opacity={0.7} />
    </points>
  );
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial
        color="#00F5FF"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

function CameraController({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 0.3 - camera.position.y) * 0.05;
    camera.position.z = 8;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ThreeScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      className="anim-canvas"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight color="#ffffff" intensity={0.1} />
        <pointLight color="#00F5FF" position={[5, 5, 5]} intensity={2} />
        <pointLight color="#7C3AED" position={[-5, -3, 5]} intensity={1.5} />
        <TorusKnot />
        <ParticleField />
        <GridPlane />
        <CameraController mouse={mouse} />
      </Canvas>
    </div>
  );
}
