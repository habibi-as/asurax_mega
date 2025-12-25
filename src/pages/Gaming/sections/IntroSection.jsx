import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particleOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    move: { enable: true, speed: 1 },
    opacity: { value: 0.3 },
    color: { value: '#4CC9F0' }
  }
};

export default function IntroSection({ onEnter }) {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gaming-intro-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '40px 20px',
        background: `
          linear-gradient(135deg, rgba(76, 201, 240, 0.08) 0%, rgba(30, 58, 138, 0.12) 50%, rgba(10, 15, 30, 0.95) 100%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(76, 201, 240, 0.05) 2px,
            rgba(76, 201, 240, 0.05) 4px
          )
        `,
        border: '2px solid rgba(76, 201, 240, 0.35)',
        borderRadius: '12px',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 40px rgba(76, 201, 240, 0.25)
        `
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: 0 }}>
        <Particles id="tsparticles-intro" init={particlesInit} options={particleOptions} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 800,
            color: '#EAF6FF',
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(76, 201, 240, 0.55)',
            marginBottom: '20px',
            letterSpacing: '2px'
          }}
        >
          ASURAX GAMING DIVISION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: '#CFEFFF',
            fontFamily: 'Georgia, serif',
            marginBottom: '40px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          Welcome to the worlds I create.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#EAF6FF',
            background: `
              linear-gradient(135deg, #4CC9F0 0%, #1E3A8A 100%)
            `,
            border: '2px solid rgba(76, 201, 240, 0.8)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            boxShadow: `
              0 8px 24px rgba(0, 0, 0, 0.4),
              0 0 20px rgba(76, 201, 240, 0.45)
            `,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = `
              0 12px 32px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(103, 232, 249, 0.7)
            `;
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = `
              0 8px 24px rgba(0, 0, 0, 0.4),
              0 0 20px rgba(76, 201, 240, 0.45)
            `;
          }}
        >
          ENTER GAMING PORTFOLIO
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

