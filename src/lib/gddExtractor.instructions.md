# GDD.zip Auto-Extraction Instructions

## ⚠️ Browser Limitation
Browser-based JavaScript cannot extract ZIP files directly. Manual extraction is required, but this document provides automation guidance.

## 📦 GDD.zip Location
**Found at**: `src/assets/gdd/GDD.zip`

## 🎯 Extraction Steps

### Step 1: Extract ZIP File
Manually extract `GDD.zip` to: `src/assets/gdd/`

### Step 2: Organize by Game
Create folders and move PDFs based on filename patterns:

```
src/assets/gdd/
├── the-last-signal/
│   ├── ashore_gdd.pdf
│   ├── last_signal_gdd.pdf
│   └── ...
├── red-one/
│   ├── red01_gdd.pdf
│   ├── red_one_gdd.pdf
│   └── ...
├── oath-hunt/
│   ├── oath_gdd.pdf
│   ├── oath_hunt_gdd.pdf
│   └── ...
├── seventh-choir/
│   ├── choir_gdd.pdf
│   ├── seventh_choir_gdd.pdf
│   └── ...
└── fear-around/
    ├── fear_gdd.pdf
    ├── fear_around_gdd.pdf
    └── ...
```

### Step 3: Filename Pattern Matching

| Game | Keywords to Look For |
|------|---------------------|
| **The Last Signal** | `ashore`, `last signal`, `last-signal` |
| **RED01** | `red01`, `red-one`, `red_one`, `red01` |
| **Oath Hunt** | `oath`, `hunt`, `oath-hunt` |
| **Seventh Choir** | `choir`, `seventh`, `seventh-choir` |
| **Fear Around** | `fear`, `around`, `fear-around` |

### Step 4: Update games.js

After extraction, update `src/data/games.js` with PDF paths:

```javascript
export const games = {
  "the-last-signal": {
    // ...
    gdd: [
      '/assets/gdd/the-last-signal/ashore_gdd.pdf',
      '/assets/gdd/the-last-signal/last_signal_gdd.pdf'
    ],
    // ...
  },
  "red-one": {
    // ...
    gdd: [
      '/assets/gdd/red-one/red01_gdd.pdf'
    ],
    // ...
  },
  // ... etc
};
```

### Step 5: PDF Text Extraction (Optional)

For auto-populating story, characters, features:

1. Use a PDF parsing library (e.g., `pdf.js`, `pdf-parse`)
2. Extract text content from PDFs
3. Parse sections using keywords:
   - Story/Lore: Look for "Story", "Lore", "World" sections
   - Characters: Look for character names, roles, descriptions
   - Features: Look for gameplay mechanics, combat systems, etc.
4. Auto-update `games.js` with extracted content

### Example PDF Parsing Code (Node.js)

```javascript
// This would run in a build script, not in browser
const fs = require('fs');
const pdf = require('pdf-parse');

async function extractGddContent(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  
  // Parse text for story, characters, features
  const text = data.text;
  // ... parsing logic
}
```

## 🔄 Future Automation

For true auto-extraction, consider:
1. **Build-time script**: Node.js script that runs during build to extract and parse GDDs
2. **Server-side API**: Backend endpoint that handles ZIP extraction
3. **Manual workflow**: Documented process for content updates

## 📝 Current Status

- ✅ GDD.zip located at `src/assets/gdd/GDD.zip`
- ⏳ Extraction: Manual process required
- ⏳ Auto-population: Manual update to `games.js` required

