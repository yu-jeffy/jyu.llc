// src/components/PathTrail.js

'use client';

import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const PathTrail = ({ positions }) => {
    // Early return if there are no positions to render
    if (positions.length === 0) return null;

    // Generate a flat array of RGB values with fading effect based on position age
    const vertexColors = useMemo(() => {
        const currentTime = Date.now();
        const colorArray = [];

        positions.forEach(pos => {
            const age = (currentTime - pos.timestamp) / 1000; // Age in seconds
            const alpha = THREE.MathUtils.clamp(1 - age / 4, 0, 1); // Fade out over 4 seconds

            // Define the base color (e.g., red)
            const baseColor = new THREE.Color(1, 0, 0).convertSRGBToLinear();

            // Optional: Modify color based on alpha for fading effect
            // Note: Three.js handles transparency differently; vertex colors typically do not include alpha
            // Therefore, we'll only use RGB values here

            colorArray.push(baseColor.r, baseColor.g, baseColor.b);
        });

        return colorArray;
    }, [positions]);

    // Flatten the positions into a single array of numbers
    const points = useMemo(() => {
        const flattened = [];
        positions.forEach(pos => {
            const [x, y, z] = pos.position;
            // Validate the position values to prevent NaN or undefined
            if (
                typeof x === 'number' &&
                typeof y === 'number' &&
                typeof z === 'number' &&
                isFinite(x) &&
                isFinite(y) &&
                isFinite(z)
            ) {
                flattened.push(x, y, z);
            }
        });
        return flattened;
    }, [positions]);

    // Ensure that the number of color entries matches the number of vertex entries
    if (vertexColors.length !== (points.length / 3) * 3) {
        console.warn(
            `Mismatch between points and vertexColors lengths. Points length: ${points.length}, vertexColors length: ${vertexColors.length}`
        );
        // Optionally, handle this mismatch appropriately
        return null;
    }

    return (
        <Line
            points={points}
            vertexColors={vertexColors} // Pass colors directly to vertexColors
            lineWidth={20}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            // Slightly above the ground to prevent z-fighting
            position={[0, 0.01, 0]}
        />
    );
};

PathTrail.propTypes = {
    positions: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.arrayOf(PropTypes.number).isRequired,
            timestamp: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default PathTrail;
