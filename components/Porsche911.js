// components/Porsche911.jsx
import React, { forwardRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const Porsche911 = forwardRef(({ position = [0, 0, 0], scale = 1 }, ref) => {
  const { scene } = useGLTF('porsche.glb') // Ensure the correct path

  useEffect(() => {
    // Rotate the model 90 degrees to the left around the Y-axis
    scene.rotation.y = Math.PI / 2
  }, [scene])

  return (
    <group
      ref={ref}
      position={position}
      scale={scale}
      // Removed the rotation here
    >
      <primitive object={scene} />
    </group>
  )
})

export default Porsche911;
