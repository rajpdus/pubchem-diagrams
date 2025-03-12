// CPK coloring scheme for elements
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#FFFFFF', // White
  C: '#909090', // Gray
  N: '#3050F8', // Blue
  O: '#FF0D0D', // Red
  F: '#90E050', // Light Green
  P: '#FF8000', // Orange
  S: '#FFFF30', // Yellow
  Cl: '#1FF01F', // Green
  Br: '#A62929', // Brown
  I: '#940094', // Dark Purple
  He: '#D9FFFF',
  Li: '#CC80FF',
  Be: '#C2FF00',
  B: '#FFB5B5',
  Ne: '#B3E3F5',
  Na: '#AB5CF2',
  Mg: '#8AFF00',
  Al: '#BFA6A6',
  Si: '#F0C8A0',
  Ar: '#80D1E3',
  K: '#8F40D4',
  Ca: '#3DFF00',
  // Add more elements as needed
};

// Default element for unknown elements
export const DEFAULT_ELEMENT_COLOR = '#808080';

// Atom radius in SVG units - adjusted for better visibility
export const ATOM_RADIUS = 15;

// Bond length multiplier
export const BOND_LENGTH_MULTIPLIER = 1.5;

// Animation settings
export const DEFAULT_ROTATION_SPEED = 3; // seconds per view
export const TOTAL_VIEW_ANGLES = 12; // More angles for smoother rotation

// Label settings
export const LABEL_OFFSET = 8;
export const LABEL_FONT_SIZE = 10; // Smaller font size for better fit 