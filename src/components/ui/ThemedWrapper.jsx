import { motion } from 'framer-motion';
import { gameThemes } from '../../lib/gameThemes.js';

export default function ThemedWrapper({ themeName = "ashore", children }) {
  const theme = gameThemes[themeName] || gameThemes.ashore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="themed-wrapper"
      style={{
        background: theme.background,
        color: theme.colors.primary,
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        borderRadius: '8px'
      }}
    >
      {/* Optional theme overlay effects */}
      {theme.neon && (
        <div
          className="themed-wrapper-neon-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, ${theme.colors.overlay} 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}

