import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './GalaxyBackground.css';

const RealisticGalaxy = () => {
  const points = useRef();

  const starPositions = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const spiral = radius * 0.5;

      positions[i3] = Math.cos(angle + spiral) * radius + (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 2;
      positions[i3 + 2] = Math.sin(angle + spiral) * radius + (Math.random() - 0.5) * 2;

      const mixedColor = new THREE.Color();
      mixedColor.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.positions.length / 3}
          array={starPositions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starPositions.colors.length / 3}
          array={starPositions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

const Planet = ({ position, size, color, speed, offset }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    mesh.current.position.x = position[0] + Math.cos(t) * 2;
    mesh.current.position.z = position[2] + Math.sin(t) * 2;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
        <pointLight intensity={2} distance={10} color={color} />
      </mesh>
    </Float>
  );
};


const Scene = () => {
  const { viewport } = useThree();
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <RealisticGalaxy />
      
      <Suspense fallback={null}>
        <Planet position={[-10, 5, -5]} size={1.5} color="#5b3df5" speed={0.2} offset={0} />
        <Planet position={[12, -6, -2]} size={1.2} color="#00d4ff" speed={0.15} offset={2} />
        <Planet position={[5, 8, -10]} size={2.5} color="#32b44a" speed={0.1} offset={4} />
      </Suspense>
    </>
  );
};

const GalaxyBackground = () => {
  return (
    <div className="galaxy-container">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 20], fov: 50 }}
      >
        <Scene />
      </Canvas>
      <div className="galaxy-overlay" />
    </div>
  );
};

export default GalaxyBackground;
