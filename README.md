# PubChem Diagrams

An interactive web application for visualizing chemical compounds in 3D using SVG rendering. This tool allows users to search for chemical compounds by name and view their molecular structure with interactive controls.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Search for Compounds**: Enter the name of any chemical compound to visualize its structure
- **Interactive 3D Visualization**: View compounds from multiple angles with smooth rotation
- **Customizable Display**: Toggle element labels, adjust rotation speed, and zoom level
- **Export Options**: Download visualizations as SVG or PNG files
- **Compound Information**: View basic information and element composition

## Demo

[Add a screenshot or GIF of your application here]

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pubchem-diagrams.git
   cd pubchem-diagrams
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Search for a Compound**:
   - Enter a chemical compound name in the search box (e.g., "Water", "Glucose", "Caffeine")
   - Click "Search" or press Enter

2. **View the 3D Structure**:
   - The compound will be displayed in the visualization area
   - The structure automatically rotates to show different angles

3. **Customize the View**:
   - Use the control panel to:
     - Toggle rotation on/off
     - Show/hide element labels
     - Change label type (symbol, name, or atomic number)
     - Adjust rotation speed
     - Zoom in/out

4. **Export the Visualization**:
   - Click "Take Screenshot" to download a PNG image
   - Click "Download SVG" to save the vector graphic

## Architecture

The project follows a modular architecture:

```
pubchem-diagrams/
├── public/             # Static files
├── src/                # Source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
```

### Key Components

- **Compound Search**: Interfaces with PubChem API to fetch compound data
- **SVG Renderer**: Converts molecular data into interactive SVG visualizations
- **Control Panel**: Manages user interactions and visualization settings
- **Export Module**: Handles saving and downloading of visualizations

## Technologies Used

- React with TypeScript for the frontend
- SVG for rendering molecular structures
- PubChem API for chemical compound data
- Jest and React Testing Library for testing

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by [PubChem](https://pubchem.ncbi.nlm.nih.gov/)
- Inspired by molecular visualization tools like Jmol and PyMOL

## Support

If you encounter any issues or have questions:
1. Check the [existing issues](https://github.com/yourusername/pubchem-diagrams/issues)
2. Create a new issue if your problem isn't already reported

## Authors

- Initial work - [Your Name]

## Roadmap

Future improvements planned:
- Support for more complex molecular structures
- Additional export formats
- Integration with more chemical databases
- Performance optimizations for large molecules
- Mobile-responsive design improvements
