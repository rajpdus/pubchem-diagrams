import React from 'react';
import { VisualizationSettings } from '../types';

interface ControlPanelProps {
  settings: VisualizationSettings;
  onSettingsChange: (settings: Partial<VisualizationSettings>) => void;
  onScreenshot: () => void;
  onDownloadSvg: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onSettingsChange,
  onScreenshot,
  onDownloadSvg,
}) => {
  const handleToggleRotation = () => {
    onSettingsChange({ isRotating: !settings.isRotating });
  };

  const handleToggleLabels = () => {
    onSettingsChange({ showLabels: !settings.showLabels });
  };

  const handleLabelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ labelType: e.target.value as 'symbol' | 'name' | 'atomicNumber' });
  };

  const handleRotationSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ rotationSpeed: parseFloat(e.target.value) });
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ zoomLevel: parseFloat(e.target.value) });
  };

  return (
    <div className="control-panel" style={{ padding: '16px' }}>
      <h3 style={{ marginTop: 0 }}>Visualization Controls</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={handleToggleRotation}
          style={{ 
            padding: '8px 16px',
            backgroundColor: settings.isRotating ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          {settings.isRotating ? 'Pause Rotation' : 'Start Rotation'}
        </button>
        
        <button 
          onClick={onScreenshot}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          Take Screenshot
        </button>
        
        <button 
          onClick={onDownloadSvg}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Download SVG
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            <input
              type="checkbox"
              checked={settings.showLabels}
              onChange={handleToggleLabels}
              style={{ marginRight: '8px' }}
            />
            Show Labels
          </label>
          
          {settings.showLabels && (
            <div style={{ marginLeft: '24px', marginTop: '8px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>Label Type:</label>
              <select 
                value={settings.labelType} 
                onChange={handleLabelTypeChange}
                style={{ padding: '4px 8px', borderRadius: '4px', width: '100%' }}
              >
                <option value="symbol">Element Symbol</option>
                <option value="name">Element Name</option>
                <option value="atomicNumber">Atomic Number</option>
              </select>
            </div>
          )}
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Rotation Speed: {settings.rotationSpeed}s per view
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={settings.rotationSpeed}
            onChange={handleRotationSpeedChange}
            style={{ width: '100%' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Zoom Level: {settings.zoomLevel.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.zoomLevel}
            onChange={handleZoomChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel; 