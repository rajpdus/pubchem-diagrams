export interface Atom {
  id: string;
  element: string;
  symbol: string;
  atomicNumber: number;
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface Bond {
  id: string;
  atomId1: string;
  atomId2: string;
  bondType: 'single' | 'double' | 'triple' | 'aromatic';
}

export interface Compound {
  id: string;
  name: string;
  formula: string;
  atoms: Atom[];
  bonds: Bond[];
  description?: string;
}

export interface ViewAngle {
  id: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

export interface VisualizationSettings {
  showLabels: boolean;
  labelType: 'symbol' | 'name' | 'atomicNumber';
  rotationSpeed: number;
  isRotating: boolean;
  currentViewAngle: number;
  zoomLevel: number;
} 