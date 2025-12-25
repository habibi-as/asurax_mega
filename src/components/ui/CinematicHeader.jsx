import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { gameThemes } from '../../lib/gameThemes.js';

export default function CinematicHeader({ title, subtitle, themeName = "ashore", backgroundImage = null }) {
  const theme = gameThemes[themeName] || gameThemes.ashore;
  
  const particleOptions = {
    fpsLimit: 60,
    particles: {
      number: { value: 30 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.5 },
      opacity: { value: { min: 0.1, max: 0.4 } },
      color: { value: theme.colors.primary }
    },
    background: { transparent: true }
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cinematic-header"
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 20px',
        background: backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgroundImage})`
          : theme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Particle Layer */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        opacity: 0.6, 
        filter: 'blur(1px)',
        zIndex: 1
      }}>
        <Particles id={`tsparticles-header-${themeName}`} init={particlesInit} options={particleOptions} />
      </div>

      {/* Blurred overlay if background image */}
      {backgroundImage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(2px)',
          zIndex: 1
        }} />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 20px'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            color: theme.colors.primary,
            marginBottom: '20px',
            textShadow: theme.neon
              ? `0 0 30px ${theme.colors.primary}, 0 0 60px ${theme.colors.primary}, 2px 2px 4px rgba(0,0,0,0.8)`
              : `2px 2px 8px rgba(0,0,0,0.8), 0 0 20px ${theme.colors.overlay}`,
            fontFamily: theme.neon ? 'monospace' : 'Georgia, serif',
            letterSpacing: theme.neon ? '4px' : '2px',
            textTransform: theme.neon ? 'uppercase' : 'none'
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            color: theme.colors.secondary || theme.colors.primary,
            fontStyle: 'italic',
            textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
            lineHeight: '1.6'
          }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

