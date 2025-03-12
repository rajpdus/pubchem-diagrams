import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Compound, ViewAngle, VisualizationSettings } from '../types';
import { ATOM_RADIUS, LABEL_FONT_SIZE, TOTAL_VIEW_ANGLES } from '../utils/constants';
import { project3DTo2D, generateViewAngles, calculateDepth } from '../utils/projection';

interface MoleculeViewerProps {
  compound: Compound | null;
  settings: VisualizationSettings;
  onSettingsChange: (settings: Partial<VisualizationSettings>) => void;
}

const MoleculeViewer = forwardRef<SVGSVGElement, MoleculeViewerProps>(({ 
  compound, 
  settings, 
  onSettingsChange 
}, ref) => {
  const [viewAngles, setViewAngles] = useState<ViewAngle[]>([]);
  const [svgWidth, setSvgWidth] = useState(500);
  const [svgHeight, setSvgHeight] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  
  // Generate view angles on component mount
  useEffect(() => {
    setViewAngles(generateViewAngles(TOTAL_VIEW_ANGLES));
  }, []);
  
  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSvgWidth(width);
        setSvgHeight(height);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  
  // Handle animation
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastFrameTimeRef.current;
      
      // Update view angle based on rotation speed
      if (elapsed > (settings.rotationSpeed * 1000)) {
        lastFrameTimeRef.current = timestamp;
        onSettingsChange({
          currentViewAngle: (settings.currentViewAngle + 1) % TOTAL_VIEW_ANGLES
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (settings.isRotating && compound) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings.isRotating, settings.rotationSpeed, settings.currentViewAngle, compound, onSettingsChange]);
  
  // Handle user interaction
  const handleSvgClick = () => {
    // Pause rotation on click
    if (settings.isRotating) {
      onSettingsChange({ isRotating: false });
    }
  };
  
  const handleSvgMouseLeave = () => {
    // Resume rotation after mouse leaves
    if (!settings.isRotating) {
      onSettingsChange({ isRotating: true });
    }
  };
  
  // Render molecule
  const renderMolecule = () => {
    if (!compound || viewAngles.length === 0) {
      return null;
    }
    
    const currentViewAngle = viewAngles[settings.currentViewAngle];
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const scale = settings.zoomLevel;
    
    // Calculate the center of the molecule
    let sumX = 0, sumY = 0, sumZ = 0;
    compound.atoms.forEach(atom => {
      sumX += atom.x;
      sumY += atom.y;
      sumZ += atom.z;
    });
    
    const centerOffsetX = sumX / compound.atoms.length;
    const centerOffsetY = sumY / compound.atoms.length;
    const centerOffsetZ = sumZ / compound.atoms.length;
    
    // Create a normalized version of atoms centered around origin
    const normalizedAtoms = compound.atoms.map(atom => ({
      ...atom,
      x: atom.x - centerOffsetX,
      y: atom.y - centerOffsetY,
      z: atom.z - centerOffsetZ
    }));
    
    // Sort atoms by depth
    const sortedAtoms = calculateDepth(normalizedAtoms, currentViewAngle);
    
    // Define all gradients first to avoid SVG rendering issues
    const gradientDefs = sortedAtoms.map(atom => (
      <radialGradient 
        key={`gradient-${atom.id}`} 
        id={`gradient-${atom.id}`} 
        cx="30%" 
        cy="30%" 
        r="70%" 
        fx="30%" 
        fy="30%"
      >
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor={atom.color} />
      </radialGradient>
    ));
    
    // Render bonds
    const bonds = compound.bonds.map(bond => {
      const atom1 = normalizedAtoms.find(a => a.id === bond.atomId1);
      const atom2 = normalizedAtoms.find(a => a.id === bond.atomId2);
      
      if (!atom1 || !atom2) return null;
      
      const pos1 = project3DTo2D(atom1, currentViewAngle, centerX, centerY, scale);
      const pos2 = project3DTo2D(atom2, currentViewAngle, centerX, centerY, scale);
      
      // Determine bond style based on bond type
      let strokeWidth = 2;
      let strokeDasharray = '';
      
      switch (bond.bondType) {
        case 'double':
          strokeWidth = 4;
          break;
        case 'triple':
          strokeWidth = 6;
          break;
        case 'aromatic':
          strokeDasharray = '5,3';
          break;
        default:
          break;
      }
      
      return (
        <line
          key={bond.id}
          x1={pos1.x}
          y1={pos1.y}
          x2={pos2.x}
          y2={pos2.y}
          stroke="#444"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
      );
    });
    
    // Render atoms
    const atoms = sortedAtoms.map(atom => {
      const pos = project3DTo2D(atom, currentViewAngle, centerX, centerY, scale);
      
      return (
        <g key={atom.id}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={ATOM_RADIUS * scale}
            fill={`url(#gradient-${atom.id})`}
            stroke="#000"
            strokeWidth="1"
          />
          
          {/* Element label */}
          {settings.showLabels && (
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#000"
              fontSize={LABEL_FONT_SIZE * scale}
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              {settings.labelType === 'symbol' && atom.symbol}
              {settings.labelType === 'name' && atom.element}
              {settings.labelType === 'atomicNumber' && atom.atomicNumber}
            </text>
          )}
        </g>
      );
    });
    
    return (
      <>
        <defs>
          {gradientDefs}
        </defs>
        {bonds}
        {atoms}
      </>
    );
  };
  
  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}
    >
      <svg 
        ref={ref}
        width={svgWidth} 
        height={svgHeight}
        onClick={handleSvgClick}
        onMouseLeave={handleSvgMouseLeave}
        style={{ background: 'white' }}
      >
        {renderMolecule()}
      </svg>
    </div>
  );
});

// Display name for debugging
MoleculeViewer.displayName = 'MoleculeViewer';

export default MoleculeViewer; 