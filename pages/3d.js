// src/pages/TownPage.js

'use client';

import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Edges } from '@react-three/drei';
import * as THREE from 'three';
import Porsche911 from '../components/Porsche911';
import { TextureLoader } from 'three';
import PathTrail from '../components/PathTrail';
import { Stars } from '@react-three/drei';
import styles from '../styles/TownPage.module.css';
import TreesGroup from '../components/TreesGroup';
import Image from 'next/image';

// Constants
const GRID_SIZE = 20; // Increased grid size to make the city larger
const ROAD_WIDTH = 2; // Roads are now twice as wide
const NUM_PLAZAS_PER_SIDE = 3; // Keeping the number of plazas/buildings the same
const BUILDING_PADDING = 0.75;
const MAX_BUILDING_HEIGHT = 5;
const SIDEWALK_WIDTH = 0.15;
const LOGO_HEIGHT = 2.5; // Configurable logo height
const TREE_SCALE_RANGE = [0.05, 0.12];

// Calculate plaza size based on grid size and road width
const PLAZA_SIZE = (GRID_SIZE - (NUM_PLAZAS_PER_SIDE + 1) * ROAD_WIDTH) / NUM_PLAZAS_PER_SIDE;
const BLOCK_SIZE_TOTAL = ROAD_WIDTH + PLAZA_SIZE; // Total size of one block (road + plaza)

// Building Descriptions
const buildingDescriptions = [
    {
        name: 'Github',
        externalUrl: 'https://github.com/yu-jeffy',
        description: 'Check out my open source projects on GitHub.',
        imageUrl: '/logos/github.png',
        color: '#C0C0C0',
    },
    {
        name: 'LinkedIn',
        externalUrl: 'https://www.linkedin.com/in/jeffyyu/',
        description: 'Connect with me on LinkedIn for professional updates.',
        imageUrl: '/logos/linkedin.png',
        color: '#B3D9FF',
    },
    {
        name: 'Mirror.xyz',
        externalUrl: 'https://mirror.xyz/jyu.eth',
        description: 'Read my blog posts and publications on Mirror.xyz.',
        imageUrl: '/logos/mirrorxyz.png',
        color: '#F5F5DC',
    },
    {
        name: 'Parallel Polis',
        externalUrl: 'https://parallelpolis.llc',
        description: 'Discover my connection to Parallel Polis.',
        imageUrl: '/logos/parallelpolis.png',
        color: '#E6E6FA',
    },
    {
        name: 'X',
        externalUrl: 'https://x.com/jyu_eth',
        description: 'Follow me on X (formerly Twitter) for updates.',
        imageUrl: '/logos/x.png',
        color: '#ADD8E6',
    },
    {
        name: 'Foundation',
        externalUrl: 'https://foundation.app/@jeffy',
        description: 'Explore my digital art on Foundation.',
        imageUrl: '/logos/foundation.png',
        color: '#FFC0CB',
    },
    {
        name: 'Soundcloud',
        externalUrl: 'https://soundcloud.com/korinayu',
        description: 'Listen to my latest tracks on Soundcloud.',
        imageUrl: '/logos/soundcloud.png',
        color: '#FFDAB9',
    }
];

const InfoPanel = ({ building }) => {
    if (!building) return null;

    return (
        <div className={styles.infoPanel}>
            <Image src={building.imageUrl} alt={building.name} className={styles.image} width={100} height={100} />
            <h2>{building.name.toUpperCase()}</h2>
            <a href={building.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
                VISIT SITE
            </a>
        </div>
    );
};

const InstructionsPanel = () => {
    return (
        <div className={styles.instructionsPanel}>
            <h1 className={styles.heading}>
                Welcome To My Site!<br />
                built w/ {'<'}3, Jeffy Yu
            </h1>
            <h2 className={styles.title}>CONTROLS</h2>
            <ul className={styles.controlsList}>
                <li><span className={styles.key}>W</span> Forward</li>
                <li><span className={styles.key}>A</span> Left</li>
                <li><span className={styles.key}>S</span> Backward</li>
                <li><span className={styles.key}>D</span> Right</li>
                <li><span className={styles.key}>Drag</span> to Rotate</li>
            </ul>
            <p className={styles.hint}>Drive up to a building to visit the site.</p>
        </div>
    );
};

// Logo Component
const Logo = ({ texture, position, rotation }) => {
    const LOGO_DEPTH = 0; // Depth of the extrusion

    // Create a box geometry with minimal depth to simulate extrusion
    const geometry = useMemo(() => new THREE.BoxGeometry(0.75, 0.75, LOGO_DEPTH), [LOGO_DEPTH]);

    // Conditionally apply the texture if it exists
    const materials = useMemo(() => {
        return [
            new THREE.MeshBasicMaterial({ color: 'grey' }), // Right
            new THREE.MeshBasicMaterial({ color: 'grey' }), // Left
            new THREE.MeshBasicMaterial({ color: 'grey' }), // Top
            new THREE.MeshBasicMaterial({ color: 'grey' }), // Bottom
            texture
                ? new THREE.MeshBasicMaterial({ map: texture, transparent: true }) // Front
                : new THREE.MeshBasicMaterial({ color: 'grey' }), // Front fallback
            new THREE.MeshBasicMaterial({ color: 'grey' }), // Back
        ];
    }, [texture]);

    return (
        <mesh position={position} rotation={rotation} geometry={geometry} material={materials} />
    );
};

// BuildingWindows Component
const BuildingWindows = ({ buildingPosition, buildingSize, buildingHeight, face }) => {
    const windowSize = 0.2;
    const windowSpacing = 0.3;
    const windowChance = 0.3; // 30% chance for each window slot to have a window

    // Calculate the number of window columns and rows based on building dimensions
    const columns = Math.floor((buildingSize - windowSpacing * 2) / (windowSize + windowSpacing));
    const rows = Math.floor((buildingHeight - LOGO_HEIGHT - windowSpacing * 2) / (windowSize + windowSpacing));

    const windows = [];

    const halfSize = buildingSize / 2;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (Math.random() < windowChance) {
                let x = 0, y = 0, z = 0;
                let rotation = [0, 0, 0];
                switch (face) {
                    case 'front':
                        x = -halfSize + windowSpacing + i * (windowSize + windowSpacing) + windowSize / 2;
                        y = windowSpacing + j * (windowSize + windowSpacing) + windowSize / 2;
                        z = halfSize + 0.01; // Slightly offset to prevent z-fighting
                        break;
                    case 'back':
                        x = -halfSize + windowSpacing + i * (windowSize + windowSpacing) + windowSize / 2;
                        y = windowSpacing + j * (windowSize + windowSpacing) + windowSize / 2;
                        z = -halfSize - 0.01;
                        rotation = [0, Math.PI, 0];
                        break;
                    case 'left':
                        x = -halfSize - 0.01;
                        y = windowSpacing + j * (windowSize + windowSpacing) + windowSize / 2;
                        z = -halfSize + windowSpacing + i * (windowSize + windowSpacing) + windowSize / 2;
                        rotation = [0, Math.PI / 2, 0];
                        break;
                    case 'right':
                        x = halfSize + 0.01;
                        y = windowSpacing + j * (windowSize + windowSpacing) + windowSize / 2;
                        z = -halfSize + windowSpacing + i * (windowSize + windowSpacing) + windowSize / 2;
                        rotation = [0, -Math.PI / 2, 0];
                        break;
                    default:
                        break;
                }

                windows.push(
                    <mesh
                        key={`window-${face}-${i}-${j}`}
                        position={[
                            buildingPosition[0] + x,
                            LOGO_HEIGHT + y + .25,
                            buildingPosition[2] + z
                        ]}
                        rotation={rotation}
                    >
                        <planeGeometry args={[windowSize, windowSize]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#ffffe0"
                            emissiveIntensity={0.5}
                            side={THREE.FrontSide}
                        />
                    </mesh>
                );
            }
        }
    }

    return <group>{windows}</group>;
};

// Town Component
const Town = React.memo(({ buildingsRef, logoHeight }) => {
    const townRef = useRef();

    // Preload all textures with error handling
    const textures = useMemo(() => {
        const loader = new TextureLoader();
        return buildingDescriptions.reduce((acc, building) => {
            acc[building.name] = loader.load(
                building.imageUrl,
                undefined,
                undefined,
                (err) => {
                    console.error(`Error loading texture: ${building.imageUrl}`, err);
                    // Assign a default texture or null
                    acc[building.name] = null; // Or assign a default texture
                }
            );
            return acc;
        }, {});
    }, []);

    const blocks = useMemo(() => {
        buildingsRef.current = []; // Reset buildings array
        const blocksArray = [];

        // Adjusted isRoad function to handle wider roads
        const isRoad = (x, z) => (
            (x % BLOCK_SIZE_TOTAL) < ROAD_WIDTH ||
            (z % BLOCK_SIZE_TOTAL) < ROAD_WIDTH
        );

        // Adjust edgeOffset to align sidewalk edges precisely around the town
        const edgeOffset = GRID_SIZE / 2 - 0.5; // For GRID_SIZE=20, edgeOffset=9.5

        // 1. Render Roads First
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let z = 0; z < GRID_SIZE; z++) {
                if (isRoad(x, z)) {
                    const roadX = x - GRID_SIZE / 2;
                    const roadZ = z - GRID_SIZE / 2;
                    blocksArray.push(
                        <mesh key={`road-${x}-${z}`} position={[roadX, -0.05, roadZ]}>
                            <boxGeometry args={[1, 0.1, 1]} />
                            <meshStandardMaterial color="#555555" />
                        </mesh>
                    );
                }
            }
        }

        // 2. Render Edge Sidewalks (no changes needed)

        blocksArray.push(
            // Top Edge Sidewalk
            <mesh key="sidewalk-edge-top" position={[-0.5, -0.04, edgeOffset + SIDEWALK_WIDTH / 2]}>
                <boxGeometry args={[GRID_SIZE, 0.12, SIDEWALK_WIDTH]} />
                <meshStandardMaterial color="#CCCCCC" />
            </mesh>
        );
        blocksArray.push(
            // Bottom Edge Sidewalk
            <mesh key="sidewalk-edge-bottom" position={[-0.5, -0.04, -edgeOffset - SIDEWALK_WIDTH / 2 - 1]}>
                <boxGeometry args={[GRID_SIZE, 0.12, SIDEWALK_WIDTH]} />
                <meshStandardMaterial color="#CCCCCC" />
            </mesh>
        );
        blocksArray.push(
            // Left Edge Sidewalk
            <mesh key="sidewalk-edge-left" position={[-edgeOffset - SIDEWALK_WIDTH / 2 - 1, -0.04, -0.5]}>
                <boxGeometry args={[SIDEWALK_WIDTH, 0.12, GRID_SIZE]} />
                <meshStandardMaterial color="#CCCCCC" />
            </mesh>
        );
        blocksArray.push(
            // Right Edge Sidewalk
            <mesh key="sidewalk-edge-right" position={[edgeOffset + SIDEWALK_WIDTH / 2, -0.04, -0.5]}>
                <boxGeometry args={[SIDEWALK_WIDTH, 0.12, GRID_SIZE]} />
                <meshStandardMaterial color="#CCCCCC" />
            </mesh>
        );

        // 3. Render Buildings and Building Sidewalks
        // Adjusted Loop to handle the new grid and road widths
        let plazaIndex = 0; // To keep track of building descriptions
        for (let x = ROAD_WIDTH; x < GRID_SIZE; x += BLOCK_SIZE_TOTAL) {
            for (let z = ROAD_WIDTH; z < GRID_SIZE; z += BLOCK_SIZE_TOTAL) {
                if (plazaIndex >= buildingDescriptions.length) break; // Ensure only 9 buildings
                const buildingInfo = buildingDescriptions[plazaIndex % buildingDescriptions.length];

                // Determine the building's center position
                const buildingCenterX = x + PLAZA_SIZE / 2 - GRID_SIZE / 2 - 0.5;
                const buildingCenterZ = z + PLAZA_SIZE / 2 - GRID_SIZE / 2 - 0.5;

                // Building
                const buildingSize = PLAZA_SIZE - BUILDING_PADDING * 2;
                const buildingHeight = Math.random() * MAX_BUILDING_HEIGHT + 4;
                const buildingColor = new THREE.Color(buildingInfo.color);
                const buildingPosition = [buildingCenterX, buildingHeight / 2, buildingCenterZ];

                blocksArray.push(
                    <mesh
                        key={`building-${x}-${z}`}
                        position={buildingPosition}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[buildingSize, buildingHeight, buildingSize]} />
                        <meshStandardMaterial color={buildingColor} />
                        {/* Add Edges to define the borders */}
                        <Edges
                            color="#000000"
                            threshold={15}
                        />
                    </mesh>
                );

                // Calculate building bounding box for collision detection
                const halfSize = buildingSize / 2;
                const min = new THREE.Vector3(buildingPosition[0] - halfSize, 0, buildingPosition[2] - halfSize);
                const max = new THREE.Vector3(buildingPosition[0] + halfSize, buildingHeight, buildingPosition[2] + halfSize);
                const boundingBox = new THREE.Box3(min, max);
                buildingsRef.current.push({ boundingBox, buildingInfo });

                // Sidewalk under the building
                blocksArray.push(
                    <mesh key={`sidewalk-under-${x}-${z}`} position={[buildingPosition[0], 0.06, buildingPosition[2]]}>
                        <boxGeometry args={[PLAZA_SIZE, 0.12, PLAZA_SIZE]} />
                        <meshStandardMaterial color="#CCCCCC" />
                    </mesh>
                );

                // Add Logos on All Four Sides
                const logoY = logoHeight; // Use the passed logoHeight
                const logoOffset = buildingSize / 2 + 0.05; // Slight offset to prevent z-fighting

                // Front Side
                blocksArray.push(
                    <Logo
                        key={`logo-front-${x}-${z}`}
                        texture={textures[buildingInfo.name]}
                        position={[buildingPosition[0], logoY, buildingPosition[2] + logoOffset]}
                        rotation={[0, 0, 0]}
                    />
                );

                // Back Side
                blocksArray.push(
                    <Logo
                        key={`logo-back-${x}-${z}`}
                        texture={textures[buildingInfo.name]}
                        position={[buildingPosition[0], logoY, buildingPosition[2] - logoOffset]}
                        rotation={[0, Math.PI, 0]}
                    />
                );

                // Left Side
                blocksArray.push(
                    <Logo
                        key={`logo-left-${x}-${z}`}
                        texture={textures[buildingInfo.name]}
                        position={[buildingPosition[0] + logoOffset, logoY, buildingPosition[2]]}
                        rotation={[0, Math.PI / 2, 0]}
                    />
                );

                // Right Side
                blocksArray.push(
                    <Logo
                        key={`logo-right-${x}-${z}`}
                        texture={textures[buildingInfo.name]}
                        position={[buildingPosition[0] - logoOffset, logoY, buildingPosition[2]]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                );

                // Add Windows on All Four Sides
                blocksArray.push(
                    <BuildingWindows
                        key={`windows-front-${x}-${z}`}
                        buildingPosition={buildingPosition}
                        buildingSize={buildingSize}
                        buildingHeight={buildingHeight}
                        face="front"
                    />
                );
                blocksArray.push(
                    <BuildingWindows
                        key={`windows-back-${x}-${z}`}
                        buildingPosition={buildingPosition}
                        buildingSize={buildingSize}
                        buildingHeight={buildingHeight}
                        face="back"
                    />
                );
                blocksArray.push(
                    <BuildingWindows
                        key={`windows-left-${x}-${z}`}
                        buildingPosition={buildingPosition}
                        buildingSize={buildingSize}
                        buildingHeight={buildingHeight}
                        face="left"
                    />
                );
                blocksArray.push(
                    <BuildingWindows
                        key={`windows-right-${x}-${z}`}
                        buildingPosition={buildingPosition}
                        buildingSize={buildingSize}
                        buildingHeight={buildingHeight}
                        face="right"
                    />
                );

                plazaIndex++;
            }
        }

        return blocksArray;
    }, [buildingsRef, textures, logoHeight]);

    return <group ref={townRef}>{blocks}</group>;
});

// Ground Component
const Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#F6DCBD" />
        </mesh>
    );
};

// Main Scene Component with Camera Drag Rotation
const Scene = ({ onCollision }) => {
    const carPositionRef = useRef(new THREE.Vector3(-10, 0.15, 0));
    const carRotationRef = useRef(new THREE.Euler(0, 0, 0));
    const carRotationAngleRef = useRef(Math.PI / 2); // Start rotated 90 degrees
    const keysPressed = useRef({});
    const buildingsRef = useRef([]);
    const carRef = useRef();
    const { camera, gl } = useThree();

    // Trail State: Array of { position: [x, y, z], timestamp: number }
    const [trailPositions, setTrailPositions] = useState([]);

    // Refs for smooth camera movement
    const smoothedCameraAngleRef = useRef(carRotationAngleRef.current);
    const cameraLerpFactor = 0.1; // Adjust for smoothing speed
    const cameraDistance = 5;
    const cameraHeight = 2.5; // Increased camera height from 1.5 to 2.5
    const lookAtYOffset = 2; // Y-offset for lookAt target

    // Refs for camera drag rotation
    const isDragging = useRef(false);
    const previousMousePosition = useRef({ x: 0, y: 0 });
    const rotationOffset = useRef(0); // In radians
    const returnSpeed = 0.05; // Speed to return to default rotation

    // Event Handlers for Pointer Events (unchanged)
    useEffect(() => {
        const handlePointerDown = (event) => {
            isDragging.current = true;
            previousMousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handlePointerMove = (event) => {
            if (!isDragging.current) return;
            const deltaX = event.clientX - previousMousePosition.current.x;
            previousMousePosition.current = { x: event.clientX, y: event.clientY };
            // Update rotation offset based on deltaX (horizontal movement)
            rotationOffset.current += deltaX * 0.005; // Adjust sensitivity as needed
        };

        const handlePointerUp = () => {
            isDragging.current = false;
        };

        // Attach event listeners to the WebGL canvas
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerleave', handlePointerUp); // Handle case when pointer leaves the canvas

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerleave', handlePointerUp);
        };
    }, [gl.domElement]);

    // Handle Key Presses for Car Movement (unchanged)
    useEffect(() => {
        const handleKeyDown = (e) => {
            keysPressed.current[e.key.toLowerCase()] = true;
        };
        const handleKeyUp = (e) => {
            keysPressed.current[e.key.toLowerCase()] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Update Loop
    useFrame(() => {
        const rotationSpeed = 0.05;
        const moveSpeed = 0.075;

        // Update car rotation based on A and D keys
        if (keysPressed.current['a']) {
            carRotationAngleRef.current += rotationSpeed; // Rotate left (A key)
        }
        if (keysPressed.current['d']) {
            carRotationAngleRef.current -= rotationSpeed; // Rotate right (D key)
        }

        // Move the car forward or backward based on W and S keys
        let moveDistance = 0;
        if (keysPressed.current['w']) moveDistance += moveSpeed;
        if (keysPressed.current['s']) moveDistance -= moveSpeed;

        if (moveDistance !== 0) {
            const dx = Math.sin(carRotationAngleRef.current) * moveDistance;
            const dz = Math.cos(carRotationAngleRef.current) * moveDistance;

            const newX = carPositionRef.current.x + dx;
            const newZ = carPositionRef.current.z + dz;

            // Collision detection logic (unchanged)
            const carWidth = 0.25 * 0.5; // Adjusted for scale 0.25
            const carLength = 1.0 * 0.25;
            const halfWidth = carWidth / 2;
            const halfLength = carLength / 2;

            const carMin = new THREE.Vector3(newX - halfWidth, 0, newZ - halfLength);
            const carMax = new THREE.Vector3(newX + halfWidth, 0.75, newZ + halfLength);
            const carBox = new THREE.Box3(carMin, carMax);

            let collision = false;
            let collidedBuilding = null;
            for (let i = 0; i < buildingsRef.current.length; i++) {
                const { boundingBox, buildingInfo } = buildingsRef.current[i];
                if (carBox.intersectsBox(boundingBox)) {
                    collision = true;
                    collidedBuilding = buildingInfo;
                    break;
                }
            }

            if (!collision) {
                carPositionRef.current.set(newX, 0.15, newZ);
                if (onCollision) onCollision(null);

                // Update trail positions
                setTrailPositions(prev => [
                    ...prev,
                    { position: [newX, 0.25, newZ], timestamp: Date.now() }, // Slightly above ground
                ]);
            } else {
                if (onCollision) onCollision(collidedBuilding);
            }
        }

        // Remove trail positions older than 1 second
        setTrailPositions(prev => prev.filter(pos => Date.now() - pos.timestamp <= 1000));

        // Update the car's rotation
        carRotationRef.current.set(0, carRotationAngleRef.current, 0);

        // Update the car's position and rotation in the scene
        if (carRef.current) {
            carRef.current.position.copy(carPositionRef.current);
            carRef.current.rotation.copy(carRotationRef.current);
        }

        // Smoothly update the camera angle with rotation offset
        if (!isDragging.current) {
            // When not dragging, interpolate rotationOffset back to zero
            rotationOffset.current = THREE.MathUtils.lerp(rotationOffset.current, 0, returnSpeed);
        }

        // Combine car rotation with user rotation offset
        const totalCameraAngle = carRotationAngleRef.current + rotationOffset.current;

        // Compute desired camera position based on the total angle
        const desiredCameraOffsetX = Math.sin(totalCameraAngle) * cameraDistance;
        const desiredCameraOffsetZ = Math.cos(totalCameraAngle) * cameraDistance;

        const desiredCameraPosition = new THREE.Vector3(
            carPositionRef.current.x - desiredCameraOffsetX,
            cameraHeight, // Updated cameraHeight
            carPositionRef.current.z - desiredCameraOffsetZ
        );

        // Smoothly interpolate the camera's position towards the desired position
        camera.position.lerp(desiredCameraPosition, cameraLerpFactor);

        // Define the lookAt target with an upward offset
        const lookAtOffset = new THREE.Vector3(0, lookAtYOffset, 0); // Adjust as needed
        const lookAtTarget = carPositionRef.current.clone().add(lookAtOffset);

        // Make the camera look at the adjusted target
        camera.lookAt(lookAtTarget);
    });

    return (
        <>
            {/* Set the background color to dark for night */}
            <color attach="background" args={['#0a0a0a']} />

            {/* Add Stars to the sky */}
            <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
            />

            {/* Camera */}
            <PerspectiveCamera makeDefault fov={60} position={[10, 10, 10]} />

            {/* Ambient Light: Reduced intensity and cooler color */}
            <ambientLight intensity={0.2} color="#a0c4ff" />

            {/* Directional Light to simulate moonlight */}
            <directionalLight
                position={[10, 20, -10]}
                intensity={1}
                color="#a0c4ff" // Cool bluish color for moonlight
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />

            {/* Optional: Add a subtle point light to simulate street lights */}
            <pointLight
                position={[0, 10, 0]}
                intensity={0.5}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
            />

            {/* Optional: Fog for depth */}
            <fog attach="fog" args={['#0a0a0a', 10, 50]} />

            {/* Render the Ground */}
            <Ground />f

            {/* Render the Town */}
            <Town buildingsRef={buildingsRef} logoHeight={LOGO_HEIGHT} />

            {/* Render the PathTrail */}
            <PathTrail positions={trailPositions} />

            {/* Render the Car */}
            <Suspense fallback={null}>
                <Porsche911
                    ref={carRef}
                    position={carPositionRef.current.toArray()}
                    scale={0.15}
                // Rotation is handled internally
                />
            </Suspense>

        </>
    );
};

// Main Page Component
const TownPage = () => {
    const [focusedBuilding, setFocusedBuilding] = useState(null);

    return (
        <div className={styles.canvasWrapper}>
            <Canvas shadows>
                <Scene onCollision={setFocusedBuilding} />
            </Canvas>
            {focusedBuilding && <InfoPanel building={focusedBuilding} />}
            <InstructionsPanel />
        </div>
    );
};



export default TownPage;