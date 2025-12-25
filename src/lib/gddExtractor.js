// GDD.zip extraction and mapping utility
// This utility helps map GDD.zip contents to games

/**
 * Maps GDD file names to game slugs based on keywords
 */
export function mapGddToGame(filename) {
  const lowerName = filename.toLowerCase();
  
  if (lowerName.includes('ashore')) {
    return 'the-last-signal';
  }
  if (lowerName.includes('red01') || lowerName.includes('red-one') || lowerName.includes('red_one')) {
    return 'red-one';
  }
  if (lowerName.includes('oath')) {
    return 'oath-hunt';
  }
  if (lowerName.includes('choir') || lowerName.includes('seventh')) {
    return 'seventh-choir';
  }
  if (lowerName.includes('fear')) {
    return 'fear-around';
  }
  
  return null;
}

/**
 * Lists potential GDD.zip locations
 */
export const gddLocations = [
  '/mnt/data/GDD.zip',
  'src/assets/gdd/GDD.zip',
  'public/assets/gdd/GDD.zip',
  'GDD.zip'
];

/**
 * Instructions for manual GDD.zip handling
 */
export const gddInstructions = `
GDD.ZIP HANDLING INSTRUCTIONS
==============================

The GDD.zip file has been found at: src/assets/gdd/GDD.zip

To extract and map the PDFs:

1. Extract GDD.zip manually to: src/assets/gdd/

2. Organize PDFs by game:
   - ashore_*.pdf → src/assets/gdd/the-last-signal/
   - red01_*.pdf or red-one_*.pdf → src/assets/gdd/red-one/
   - oath_*.pdf → src/assets/gdd/oath-hunt/
   - choir_*.pdf or seventh_*.pdf → src/assets/gdd/seventh-choir/
   - fear_*.pdf → src/assets/gdd/fear-around/

3. Update src/data/games.js with the PDF links:
   - Add file paths to the gdd array for each game
   - Example: gdd: ['/assets/gdd/the-last-signal/ashore_gdd.pdf']

Note: The extraction needs to be done manually as the browser environment
does not support zip file extraction. Once extracted, update games.js accordingly.
`;

