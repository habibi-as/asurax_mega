import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gameThemes } from '../../lib/gameThemes.js';
import './gaming-blocks.css';

export default function TrailerBlock({ trailerUrl, title = "Trailer", themeName = "ashore" }) {
  const theme = gameThemes[themeName] || gameThemes.ashore;
  const [embedUrl, setEmbedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!trailerUrl) return;

    setIsLoading(true);
    
    // Check if it's a YouTube URL
    if (trailerUrl.includes('youtube.com') || trailerUrl.includes('youtu.be')) {
      let videoId = '';
      if (trailerUrl.includes('youtube.com/watch?v=')) {
        videoId = trailerUrl.split('v=')[1]?.split('&')[0];
      } else if (trailerUrl.includes('youtu.be/')) {
        videoId = trailerUrl.split('youtu.be/')[1]?.split('?')[0];
      }
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      }
    }
    // Check if it's a Google Drive URL
    else if (trailerUrl.includes('drive.google.com')) {
      // Convert Google Drive link to embeddable preview
      const fileId = trailerUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId) {
        setEmbedUrl(`https://drive.google.com/file/d/${fileId}/preview`);
      }
    }
    // Assume it's already an embed URL or direct video link
    else {
      setEmbedUrl(trailerUrl);
    }
    
    setIsLoading(false);
  }, [trailerUrl]);

  if (!trailerUrl) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="trailer-block empty"
      >
        <p>No trailer available yet. Add a YouTube or Google Drive URL to display the trailer.</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="trailer-block loading"
      >
        <p>Loading trailer...</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="trailer-block-enhanced"
      style={{
        marginBottom: '60px',
        padding: '40px',
        background: `linear-gradient(135deg, ${theme.colors.overlay} 0%, rgba(0,0,0,0.3) 100%)`,
        border: `2px solid ${theme.colors.border}`,
        borderRadius: '16px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${theme.colors.overlay}`
      }}
    >
      <h3 className="trailer-block-title" style={{ 
        color: theme.colors.primary,
        marginBottom: '30px',
        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)'
      }}>
        🎬 {title}
      </h3>
      <div className="trailer-block-video-wrapper" style={{
        position: 'relative',
        paddingTop: '56.25%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `3px solid ${theme.colors.border}`,
        boxShadow: theme.neon 
          ? `0 0 30px ${theme.colors.overlay}, inset 0 0 20px rgba(0,0,0,0.5)`
          : `0 8px 24px rgba(0,0,0,0.5)`
      }}>
        <iframe
          src={embedUrl}
          loading="lazy"
          title={title}
          className="trailer-block-video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.section>
  );
}

