import { Atom } from '../types';
import { ViewAngle } from '../types';

/**
 * Projects a 3D point to 2D coordinates based on rotation angles
 */
export const project3DTo2D = (
  atom: Atom,
  viewAngle: ViewAngle,
  centerX: number,
  centerY: number,
  scale: number = 1
): { x: number; y: number; z: number } => {
  // Apply rotations
  const { x, y, z } = rotatePoint(
    atom.x,
    atom.y,
    atom.z,
    viewAngle.rotationX,
    viewAngle.rotationY,
    viewAngle.rotationZ
  );

  // Apply scaling factor - larger molecules need more scaling
  const scaleFactor = scale * 50; // Adjust this value based on molecule size

  // Simple projection (orthographic)
  return {
    x: centerX + x * scaleFactor,
    y: centerY + y * scaleFactor,
    z: z, // Keep z for depth sorting
  };
};

/**
 * Rotates a point in 3D space
 */
export const rotatePoint = (
  x: number,
  y: number,
  z: number,
  rotationX: number,
  rotationY: number,
  rotationZ: number
): { x: number; y: number; z: number } => {
  // Convert degrees to radians
  const radX = (rotationX * Math.PI) / 180;
  const radY = (rotationY * Math.PI) / 180;
  const radZ = (rotationZ * Math.PI) / 180;

  // Rotate around X axis
  let x1 = x;
  let y1 = y * Math.cos(radX) - z * Math.sin(radX);
  let z1 = y * Math.sin(radX) + z * Math.cos(radX);

  // Rotate around Y axis
  let x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
  let y2 = y1;
  let z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);

  // Rotate around Z axis
  let x3 = x2 * Math.cos(radZ) - y2 * Math.sin(radZ);
  let y3 = x2 * Math.sin(radZ) + y2 * Math.cos(radZ);
  let z3 = z2;

  return { x: x3, y: y3, z: z3 };
};

/**
 * Generates a set of view angles for rotation
 */
export const generateViewAngles = (totalAngles: number): ViewAngle[] => {
  const viewAngles: ViewAngle[] = [];
  
  for (let i = 0; i < totalAngles; i++) {
    const angle = (i * 360) / totalAngles;
    viewAngles.push({
      id: i,
      rotationX: 15, // Slight tilt for better 3D perspective
      rotationY: angle,
      rotationZ: 0,
    });
  }
  
  return viewAngles;
};

/**
 * Calculates depth for atoms to determine rendering order
 */
export const calculateDepth = (atoms: Atom[], viewAngle: ViewAngle): Atom[] => {
  const rotatedAtoms = atoms.map(atom => {
    const { z } = rotatePoint(
      atom.x,
      atom.y,
      atom.z,
      viewAngle.rotationX,
      viewAngle.rotationY,
      viewAngle.rotationZ
    );
    
    return {
      ...atom,
      depth: z, // Add depth property for sorting
    };
  });
  
  // Sort by depth (z-coordinate) to render back-to-front
  return rotatedAtoms.sort((a, b) => (a as any).depth - (b as any).depth);
}; 