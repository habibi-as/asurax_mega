import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './gaming-blocks.css';

export default function ConceptBlock({ images = [], title = "Concept Art" }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="concept-block empty"
      >
        <h3 className="concept-block-title">{title}</h3>
        <p>No concept art available yet. Add image URLs to display them here.</p>
      </motion.div>
    );
  }

  const convertDriveUrl = (url) => {
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    return url;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="concept-block"
      >
        <h3 className="concept-block-title">{title}</h3>
        <div className="concept-block-grid masonry">
          {images.map((imageUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="concept-block-item"
              onClick={() => setSelectedImage(imageUrl)}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={convertDriveUrl(imageUrl)}
                alt={`Concept art ${index + 1}`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="concept-block-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="concept-block-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="concept-block-lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img
                src={convertDriveUrl(selectedImage)}
                alt="Concept art full view"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

