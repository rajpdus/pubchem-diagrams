import React, { useState } from 'react';

interface CompoundSearchProps {
  onSearch: (compoundName: string) => void;
  isLoading: boolean;
}

const CompoundSearch: React.FC<CompoundSearchProps> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Example compounds for suggestions
  const exampleCompounds = [
    'Water',
    'Methane',
    'Ethanol',
    'Glucose',
    'Caffeine',
    'Aspirin',
    'Benzene',
  ];
  
  const handleExampleClick = (compound: string) => {
    setSearchTerm(compound);
    onSearch(compound);
  };
  
  return (
    <div style={{ marginBottom: '24px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter chemical compound name..."
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading || !searchTerm.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !searchTerm.trim() ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: '16px' }}>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
          Try these examples:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {exampleCompounds.map(compound => (
            <button
              key={compound}
              onClick={() => handleExampleClick(compound)}
              disabled={isLoading}
              style={{
                padding: '8px 12px',
                backgroundColor: '#f1f1f1',
                border: '1px solid #ddd',
                borderRadius: '20px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              {compound}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompoundSearch; 