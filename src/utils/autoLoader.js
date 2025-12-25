// ASURAX: Universal auto-asset loader utilities

// Generic loader for Vite import.meta.glob results
export function loadAssets(glob) {
  try {
    const modules = glob();
    return Object.entries(modules).map(([path, mod]) => ({
      name: path.split("/").pop(),
      src: mod.default || mod,
    }));
  } catch {
    return [];
  }
}

// Load raw text file content.
// Supports both direct string returns and dynamic imports.
export function loadTextFile(importFn) {
  try {
    const result = importFn(); 
  } catch {
    return "";
  }
}

// Derive YouTube thumbnail from URL
export function youtubeThumb(url) {
  const id =
    url.match(/v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)/)?.[1] ||
    "";
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

// SAFEST: Only allow secure Drive VIEW links
export function driveToView(url) {
  try {
    const id =
      url.match(/\/d\/([^/]+)/)?.[1] ||
      url.match(/id=([^&]+)/)?.[1];
    if (!id) return url;
    return `https://drive.google.com/file/d/${id}/view?usp=sharing`;
  } catch {
    return url;
  }
}

// Convert Google Drive link → direct image view
export function driveImage(url) {
  try {
    const match = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    const id = match && match[1];
    if (!id) return url;
    return `https://drive.google.com/uc?export=view&id=${id}`;
  } catch {
    return url;
  }
}

// Generic internet image link (Cloudinary, Imgur, Pinterest, etc.)
export function directImage(url) {
  // If it's already a normal image link, return as-is
  if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) return url;

  // Cloudinary style auto-format fix
  if (url.includes("cloudinary.com")) return url;

  return url;
}

// Load local images from import.meta.glob object
export function loadLocalImages(globFn) {
  try {
    const keys = Object.keys(globFn);
    return keys.map((key) => ({
      name: key.split("/").pop(),
      src: globFn[key].default,
    }));
  } catch {
    return [];
  }
}

// Load local concept media (images and videos)
export function loadLocalConceptMedia(globFn) {
  try {
    const keys = Object.keys(globFn);
    return keys.map((key) => {
      const file = globFn[key].default;
      const name = key.split("/").pop();
      const isImage = /\.(jpg|jpeg|png|webp)$/i.test(name);
      const isVideo = /\.(mp4|webm|mov)$/i.test(name);
      return {
        name,
        src: file,
        type: isImage ? "image" : isVideo ? "video" : "unknown",
      };
    });
  } catch {
    return [];
  }
}
