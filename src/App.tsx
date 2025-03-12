import React, { useState, useRef } from 'react';
import './App.css';
import CompoundSearch from './components/CompoundSearch';
import MoleculeViewer from './components/MoleculeViewer';
import ControlPanel from './components/ControlPanel';
import CompoundInfo from './components/CompoundInfo';
import { Compound, VisualizationSettings } from './types';
import { fetchCompoundByName } from './services/compoundService';
import { exportSvg, takeScreenshot } from './utils/export';
import { DEFAULT_ROTATION_SPEED } from './utils/constants';

function App() {
  const [compound, setCompound] = useState<Compound | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<VisualizationSettings>({
    showLabels: true,
    labelType: 'symbol',
    rotationSpeed: DEFAULT_ROTATION_SPEED,
    isRotating: true,
    currentViewAngle: 0,
    zoomLevel: 1,
  });
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  const handleSearch = async (compoundName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchCompoundByName(compoundName);
      
      if (result) {
        setCompound(result);
      } else {
        setError(`Could not find compound: ${compoundName}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSettingsChange = (newSettings: Partial<VisualizationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  const handleScreenshot = () => {
    if (svgRef.current && compound) {
      takeScreenshot(svgRef.current, compound.name.replace(/\s+/g, '_'));
    }
  };
  
  const handleDownloadSvg = () => {
    if (svgRef.current && compound) {
      exportSvg(svgRef.current, compound.name.replace(/\s+/g, '_'));
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chemical Compound Visualizer</h1>
        <p>Enter a chemical compound name to visualize its 3D structure</p>
      </header>
      
      <main className="App-main">
        <CompoundSearch onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {compound && (
          <>
            <CompoundInfo compound={compound} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="molecule-container">
                <MoleculeViewer 
                  compound={compound} 
                  settings={settings} 
                  onSettingsChange={handleSettingsChange} 
                  ref={svgRef}
                />
              </div>
              
              <ControlPanel 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
                onScreenshot={handleScreenshot}
                onDownloadSvg={handleDownloadSvg}
              />
            </div>
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>Data provided by PubChem</p>
      </footer>
    </div>
  );
}

export default App;
