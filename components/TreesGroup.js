// components/TreesGroup.js
import React, { useMemo } from 'react';
import { Suspense } from 'react';
import Tree from './Tree';

const TreesGroup = React.memo(({
    numberOfTrees = 100,
    cityRadius = 16,
    groundSize = 100,
    treeScaleRange = [0.3, 0.5],
  }) => {
    const trees = useMemo(() => {
      const positions = [];
      for (let i = 0; i < numberOfTrees; i++) {
        let x, z;
        let attempts = 0;
        const maxAttempts = 20;
  
        do {
          x = Math.random() * groundSize - groundSize / 2;
          z = Math.random() * groundSize - groundSize / 2;
          attempts++;
        } while (Math.sqrt(x * x + z * z) < cityRadius && attempts < maxAttempts);
  
        if (attempts < maxAttempts) {
          const scale = Math.random() * (treeScaleRange[1] - treeScaleRange[0]) + treeScaleRange[0];
          const rotationY = Math.random() * Math.PI * 2;
          positions.push({ position: [x, 0, z], scale, rotation: [0, rotationY, 0] });
        }
      }
      console.log('Tree positions:', positions);
      return positions;
    }, [numberOfTrees, cityRadius, groundSize, treeScaleRange]);
  
    return (
      <group>
        {trees.map((tree, index) => (
          <Suspense fallback={null} key={`tree-suspense-${index}`}>
            <Tree
              position={tree.position}
              scale={tree.scale}
              rotation={tree.rotation}
            />
          </Suspense>
        ))}
      </group>
    );
  });

TreesGroup.displayName = 'TreesGroup';
  
export default TreesGroup;