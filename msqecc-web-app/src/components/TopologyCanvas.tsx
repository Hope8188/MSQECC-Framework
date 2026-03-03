import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/msqeccStore';

const NUM_PARTICLES = 1500;

const NetworkMesh = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const k = useStore(state => state.constants.k);
    const isGlitching = useStore(state => state.isGlitching);

    // Create torus geometry distribution (The Holographic Boundary mimic)
    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(NUM_PARTICLES * 3);
        const scales = new Float32Array(NUM_PARTICLES);

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;

            // Major radius R, Minor radius r
            const R = 8;
            const r = 3 + (Math.random() * 1.5 - 0.75);

            const x = (R + r * Math.cos(v)) * Math.cos(u);
            const y = (R + r * Math.cos(v)) * Math.sin(u);
            const z = r * Math.sin(v);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            scales[i] = Math.random() * 0.04 + 0.01;
        }
        return { positions, scales };
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Spin the global topology
        meshRef.current.rotation.y += delta * 0.05;
        meshRef.current.rotation.z += delta * 0.02;

        // Entanglement stress driven by constant k
        // If user brings k too low (<1), universe collapses. If k too high, it explodes.
        const expansion = Math.max(0.1, k / 9.575);

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            const z = positions[i * 3 + 2];

            let currentExp = expansion;
            if (isGlitching) {
                currentExp += (Math.random() - 0.5) * 4.0;
            }

            // Distort the torus continuously based on time & position
            const timeOffset = state.clock.elapsedTime * 0.5 + i * 0.01;
            const wave = Math.sin(timeOffset + x) * 0.5;

            dummy.position.set(
                (x + wave) * currentExp,
                (y - wave) * currentExp,
                (z + wave * 2) * currentExp
            );

            const s = scales[i] * (1 + Math.sin(timeOffset * 4) * 0.5);
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_PARTICLES]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </instancedMesh>
    );
};

export const TopologyCanvas = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }} frameloop="always">
                <color attach="background" args={['#050505']} />
                <NetworkMesh />
            </Canvas>
        </div>
    );
};
