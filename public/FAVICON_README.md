# Favicon Generation Instructions

The favicon files need to be generated from `src/assets/lasurax-metallic.png`.

## Required Files:
- favicon.ico (16x16, 32x32, 48x48 multi-size ICO)
- favicon-16x16.png
- favicon-32x32.png
- favicon-180x180.png (for Apple touch icon)
- favicon-192x192.png
- favicon-512x512.png
- apple-touch-icon.png (180x180)

## Tools to Generate:
1. Use an online tool like https://realfavicongenerator.net/
2. Or use ImageMagick: `convert lasurax-metallic.png -resize 16x16 favicon-16x16.png`
3. For .ico file, use: `convert lasurax-metallic.png -define icon:auto-resize=16,32,48 favicon.ico`

All files should be placed in the `/public` directory.

The HTML and manifest files are already configured and ready to use once the image files are generated.

