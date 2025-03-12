import axios from 'axios';
import { Atom, Bond, Compound } from '../types';
import { ELEMENT_COLORS, DEFAULT_ELEMENT_COLOR } from '../utils/constants';

// PubChem API base URL
const PUBCHEM_API_BASE_URL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';

/**
 * Fetches compound information by name from PubChem API
 */
export const fetchCompoundByName = async (name: string): Promise<Compound | null> => {
  try {
    // First, get the compound CID by name
    const cidResponse = await axios.get(
      `${PUBCHEM_API_BASE_URL}/compound/name/${encodeURIComponent(name)}/cids/JSON`
    );
    
    if (!cidResponse.data.IdentifierList?.CID || cidResponse.data.IdentifierList.CID.length === 0) {
      throw new Error('Compound not found');
    }
    
    const cid = cidResponse.data.IdentifierList.CID[0];
    
    // Get compound properties
    const propertiesResponse = await axios.get(
      `${PUBCHEM_API_BASE_URL}/compound/cid/${cid}/property/MolecularFormula,Title/JSON`
    );
    
    const properties = propertiesResponse.data.PropertyTable.Properties[0];
    
    // Get 3D structure
    const structureResponse = await axios.get(
      `${PUBCHEM_API_BASE_URL}/compound/cid/${cid}/record/JSON?record_type=3d`
    );
    
    const conformers = structureResponse.data.PC_Compounds[0].coords?.[0]?.conformers?.[0];
    
    if (!conformers) {
      throw new Error('3D structure not available for this compound');
    }
    
    const atoms: Atom[] = [];
    const bonds: Bond[] = [];
    
    // Process atoms
    const atomsData = structureResponse.data.PC_Compounds[0].atoms;
    const atomCoords = conformers.x.map((x: number, i: number) => ({
      x,
      y: conformers.y[i],
      z: conformers.z[i],
    }));
    
    atomsData.aid.forEach((id: number, index: number) => {
      const element = atomsData.element[index];
      const elementSymbol = getElementSymbol(element);
      
      atoms.push({
        id: id.toString(),
        element: elementSymbol,
        symbol: elementSymbol,
        atomicNumber: element,
        x: atomCoords[index].x,
        y: atomCoords[index].y,
        z: atomCoords[index].z,
        color: ELEMENT_COLORS[elementSymbol] || DEFAULT_ELEMENT_COLOR,
      });
    });
    
    // Process bonds
    const bondsData = structureResponse.data.PC_Compounds[0].bonds;
    
    if (bondsData) {
      bondsData.aid1.forEach((aid1: number, index: number) => {
        const aid2 = bondsData.aid2[index];
        const order = bondsData.order[index];
        
        bonds.push({
          id: `${aid1}-${aid2}`,
          atomId1: aid1.toString(),
          atomId2: aid2.toString(),
          bondType: getBondType(order),
        });
      });
    }
    
    return {
      id: cid.toString(),
      name: properties.Title,
      formula: properties.MolecularFormula,
      atoms,
      bonds,
    };
    
  } catch (error) {
    console.error('Error fetching compound:', error);
    return null;
  }
};

/**
 * Maps atomic number to element symbol
 */
const getElementSymbol = (atomicNumber: number): string => {
  const elements: Record<number, string> = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O', 9: 'F', 10: 'Ne',
    11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P', 16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca',
    // Add more elements as needed
  };
  
  return elements[atomicNumber] || `Element${atomicNumber}`;
};

/**
 * Maps bond order to bond type
 */
const getBondType = (order: number): 'single' | 'double' | 'triple' | 'aromatic' => {
  switch (order) {
    case 1:
      return 'single';
    case 2:
      return 'double';
    case 3:
      return 'triple';
    case 4:
      return 'aromatic';
    default:
      return 'single';
  }
}; 