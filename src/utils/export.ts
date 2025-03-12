/**
 * Exports the SVG element as an SVG file
 */
export const exportSvg = (svgElement: SVGSVGElement, fileName: string): void => {
  if (!svgElement) return;
  
  // Clone the SVG element to avoid modifying the original
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Add XML namespace
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  
  // Convert SVG to string
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  
  // Create a Blob with the SVG data
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.svg`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Takes a screenshot of the SVG element and downloads it as a PNG
 */
export const takeScreenshot = (svgElement: SVGSVGElement, fileName: string): void => {
  if (!svgElement) return;
  
  // Clone the SVG element to avoid modifying the original
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Add XML namespace
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  
  // Convert SVG to string
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  
  // Create a Blob with the SVG data
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  
  // Create an Image element
  const img = new Image();
  
  img.onload = () => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;
    
    // Draw the image on the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to PNG
      const pngUrl = canvas.toDataURL('image/png');
      
      // Create a download link
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `${fileName}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
    }
    
    // Clean up
    URL.revokeObjectURL(url);
  };
  
  // Set the image source to the SVG URL
  img.src = url;
}; 