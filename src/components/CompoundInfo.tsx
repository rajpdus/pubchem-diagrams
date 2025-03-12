import React from 'react';
import { Compound } from '../types';

interface CompoundInfoProps {
  compound: Compound | null;
}

const CompoundInfo: React.FC<CompoundInfoProps> = ({ compound }) => {
  if (!compound) {
    return null;
  }
  
  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '24px' }}>
      <h2 style={{ marginTop: 0 }}>{compound.name}</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h3>Basic Information</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                  Formula:
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {formatFormula(compound.formula)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                  PubChem ID:
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {compound.id}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                  Atoms:
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {compound.atoms.length}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                  Bonds:
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {compound.bonds.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h3>Element Composition</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {getElementCounts(compound).map(({ element, count, color }) => (
              <div 
                key={element}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  backgroundColor: color,
                  color: isLightColor(color) ? '#000' : '#fff',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                {element}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <a 
          href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          View on PubChem
        </a>
      </div>
    </div>
  );
};

// Helper function to format chemical formula with subscripts
const formatFormula = (formula: string): React.ReactElement => {
  // Split the formula into parts (elements and numbers)
  const parts = formula.split(/([A-Z][a-z]*)(\d*)/g).filter(Boolean);
  
  return (
    <>
      {parts.map((part, index) => {
        // If the part is a number, render it as a subscript
        if (/^\d+$/.test(part)) {
          return <sub key={index}>{part}</sub>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

// Helper function to count elements in a compound
const getElementCounts = (compound: Compound) => {
  const elementCounts: Record<string, number> = {};
  const elementColors: Record<string, string> = {};
  
  compound.atoms.forEach(atom => {
    elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
    elementColors[atom.element] = atom.color;
  });
  
  return Object.entries(elementCounts).map(([element, count]) => ({
    element,
    count,
    color: elementColors[element] || '#ccc',
  }));
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128;
};

export default CompoundInfo; 