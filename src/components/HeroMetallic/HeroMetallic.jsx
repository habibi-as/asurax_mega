import React, { useEffect, useRef, useState } from "react";
import MetallicPaint, { parseLogoImage } from "../Bits/MetallicPaint"; // adjust path if needed
import LiquidEther from "../Bits/LiquidEther"; // your existing background (keeps liquid ether)
import "./HeroMetallic.css";

// Use the local asset path you provided (adjust filename if necessary)
import logoPath from "../../assets/lasurax-metallic.svg";

/**
 * Helper: load image from url and draw onto a canvas
 * returns {canvas, ctx, img}
 */
async function loadImageToCanvas(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // we'll draw large so parseLogoImage has good input resolution (if SVG, it scales fine)
      const size = Math.max(img.naturalWidth, img.naturalHeight, 1000);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      // center the image and preserve aspect
      const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h);
      resolve({ canvas, ctx, img, drawBox: { x, y, w, h } });
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Helper: find connected components by simple flood-fill on opaque pixels.
 * Returns bbox array for components: {x,y,w,h,area,centroid}
 *
 * This is intentionally conservative and tuned to pick out the top emblem (the symbol),
 * not the large text at bottom.
 */
function findComponentsFromImageData(imageData, canvasW, canvasH) {
  const data = imageData.data;
  const w = canvasW;
  const h = canvasH;
  const visited = new Uint8Array(w * h);
  const components = [];

  function idx(x, y) { return (y * w + x); }
  function pixelAlpha(x, y) { return data[idx(x, y) * 4 + 3]; }
  // treat alpha > 16 as non-empty OR RGB not white
  function isFilled(x, y) {
    const base = idx(x, y) * 4;
    const r = data[base], g = data[base+1], b = data[base+2], a = data[base+3];
    // black/colored shapes are non-white; the check helps with white backgrounds
    return a > 16 && !(r > 250 && g > 250 && b > 250 && a > 250);
  }

  const stack = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const id = idx(x, y);
      if (visited[id]) continue;
      if (!isFilled(x, y)) { visited[id] = 1; continue; }

      // flood
      let minX = x, minY = y, maxX = x, maxY = y;
      let area = 0;
      let sumX = 0, sumY = 0;
      stack.push([x, y]);
      visited[id] = 1;
      while (stack.length) {
        const [sx, sy] = stack.pop();
        const sid = idx(sx, sy);
        area++;
        sumX += sx; sumY += sy;
        if (sx < minX) minX = sx;
        if (sx > maxX) maxX = sx;
        if (sy < minY) minY = sy;
        if (sy > maxY) maxY = sy;

        // neighbours
        const nbs = [
          [sx+1, sy], [sx-1, sy], [sx, sy+1], [sx, sy-1]
        ];
        for (let nb of nbs) {
          const nx = nb[0], ny = nb[1];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const nid = idx(nx, ny);
          if (visited[nid]) continue;
          if (isFilled(nx, ny)) {
            visited[nid] = 1;
            stack.push([nx, ny]);
          } else {
            visited[nid] = 1; // mark background visited
          }
        }
      } // end flood
      const comp = {
        x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1,
        area, centroid: { x: sumX/area, y: sumY/area }
      };
      // ignore very tiny speckles
      if (comp.area > 40) components.push(comp);
    }
  }
  return components;
}

/**
 * Crop to the top-most meaningful component (symbol), return new ImageData
 */
function cropTopSymbolFromCanvas(canvas, ctx) {
  const w = canvas.width, h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const comps = findComponentsFromImageData(imgData, w, h);
  if (!comps || comps.length === 0) return imgData;

  // choose the component with smallest centroid.y (top-most), but also ensure it has decent area
  comps.sort((a,b) => a.centroid.y - b.centroid.y || b.area - a.area);

  // pick first component that is not extremely small
  const chosen = comps.find(c => c.area > 200) || comps[0];

  // expand bounding box a bit to avoid clipping
  const pad = Math.round(Math.max(chosen.w, chosen.h) * 0.12);
  const sx = Math.max(0, chosen.x - pad);
  const sy = Math.max(0, chosen.y - pad);
  const sw = Math.min(w - sx, chosen.w + pad*2);
  const sh = Math.min(h - sy, chosen.h + pad*2);

  // create output canvas and copy
  const out = document.createElement("canvas");
  out.width = sw; out.height = sh;
  const outCtx = out.getContext("2d");
  outCtx.clearRect(0,0,sw,sh);
  outCtx.putImageData(ctx.getImageData(sx, sy, sw, sh), 0, 0);

  // ensure proper opaque background where needed (parseLogoImage expects dark/white conventions)
  const outImgData = outCtx.getImageData(0,0,sw,sh);
  return outImgData;
}

export default function HeroMetallic() {
  const [symbolImageData, setSymbolImageData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function prepare() {
      try {
        // load original logo into canvas
        const { canvas, ctx } = await loadImageToCanvas(logoPath);

        // crop top symbol
        const symbolData = cropTopSymbolFromCanvas(canvas, ctx);

        // optionally run parseLogoImage for edge extraction (parseLogoImage returns imageData+pngBlob)
        // If parseLogoImage expects a File, we can convert our cropped canvas to blob -> file and reuse parseLogoImage
        // but your parseLogoImage already does a sophisticated shape/edge process; to keep it consistent we'll
        // convert to a blob file then call parseLogoImage if parseLogoImage accepts File.
        try {
          const blob = await new Promise(res => canvasToBlob(symbolData, res));
          // create a File from blob (name doesn't matter)
          const file = new File([blob], "symbol.png", { type: blob.type || "image/png" });
          // If parseLogoImage is available & expects File, use it -- otherwise send raw imageData
          if (typeof parseLogoImage === "function") {
            const parsed = await parseLogoImage(file);
            // parsed.imageData is compatible with your MetallicPaint
            if (parsed && parsed.imageData) {
              if (mounted) setSymbolImageData(parsed.imageData);
              setLoaded(true);
              return;
            }
          }
        } catch (e) {
          // fallback: use the raw imageData we already have
        }

        if (mounted) {
          setSymbolImageData(symbolData);
          setLoaded(true);
        }
      } catch (err) {
        console.error("HeroMetallic prepare error:", err);
      }
    }

    prepare();

    return () => { mounted = false; };
  }, []);

  // helper: convert ImageData to Blob (PNG)
  function canvasToBlob(imageData, cb) {
    const c = document.createElement("canvas");
    c.width = imageData.width;
    c.height = imageData.height;
    const ctx = c.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
    c.toBlob(cb, "image/png");
  }

  return (
    <section className="hero-metallic-root" ref={containerRef}>
      {/* Liquid Ether background kept as base (z-index: 0) */}
      <div className="hero-bg">
        <LiquidEther />
      </div>

      {/* metallic symbol (center) */}
      <div className="hero-center">
        {loaded && symbolImageData ? (
          <div className="metallic-wrap">
            <div className="metallic-logo">
              <MetallicPaint imageData={symbolImageData} params={{
                edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07
              }} />
            </div>
            {/* Big sci-fi title (no 'WELCOME' - just ASURAX STUDIOS) */}
            <h1 className="hero-title">ASURAX STUDIOS</h1>

            {/* subtitle — subtle */}
            <p className="hero-sub">A multiverse of creativity — games, visuals, sound & experiments.</p>
          </div>
        ) : (
          <div className="metallic-loading">Loading visual…</div>
        )}
      </div>

      {/* floating subtle particles / cyberpunk accents layer (keeps text readable) */}
      <div className="hero-accents">
        {/* small particle overlay or subtle lens flares — you can swap this out with your particle component */}
        <div className="accent-flares" />
      </div>
    </section>
  );
}
