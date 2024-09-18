import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Tree = forwardRef(({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }, ref) => {
  const { scene } = useGLTF('tree1.glb', (error) => {
    if (error) {
      console.error('Error loading GLTF model:', error);
    }
  });

  if (!scene) {
    console.warn('GLTF model not loaded yet.');
    return null;
  }

  return (
    <group ref={ref} position={position} scale={[scale, scale, scale]} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
});

Tree.displayName = 'Tree';

export default Tree;
