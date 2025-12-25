import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import DocumentButton from '../../components/DocumentButton.jsx'
import PageHeaderLogo from '../../components/PageHeaderLogo.jsx'
import './Website.css'

function RotatingCube() {
  const ref = useRef()
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.2 * d
    ref.current.rotation.y += 0.3 * d
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#D7002E" metalness={0.2} roughness={0.3} />
    </mesh>
  )
}

function ShapesRow() {
  const cube = useRef()
  const sphere = useRef()
  const ring = useRef()
  useFrame((_, d) => {
    if (cube.current) cube.current.rotation.y += 0.4 * d
    if (sphere.current) sphere.current.rotation.x += 0.25 * d
    if (ring.current) ring.current.rotation.z += 0.3 * d
  })
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <mesh ref={cube} position={[-3, 0, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#D7002E" emissive="#D7002E" emissiveIntensity={0.8} />
        </mesh>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#0B0B0B" emissive="#D7002E" emissiveIntensity={0.6} />
        </mesh>
        <mesh ref={ring} position={[3, 0, 0]}>
          <torusGeometry args={[0.9, 0.12, 32, 64]} />
          <meshStandardMaterial color="#F8F1E5" emissive="#D7002E" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

// Sakura Petal Component
function SakuraPetal({ delay = 0 }) {
  return (
    <motion.div
      className="sakura-petal"
      initial={{ 
        y: -100,
        x: Math.random() * 100,
        rotate: 0,
        opacity: 0
      }}
      animate={{
        y: window.innerHeight + 100,
        x: Math.random() * 100 - 50,
        rotate: 360,
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
      }}
    />
  )
}

export default function Website() {
  const red = '#D7002E'
  const beige = '#F8F1E5'
  const ink = '#0B0B0B'
  const videoRef = useRef(null)
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(err => console.error("Video autoplay failed:", err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  
  const [hoverSound] = useState(() => {
    if (typeof Audio !== 'undefined') {
      return new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURAJR6Hh8sBtJAUwgM/y2IU4CBxqu+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACxRetOnrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lREAlHoeHywG0kBTCAz/LYhTgIHGq77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEALFF606euoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVEQCUeh4fLAbSQF')
    }
    return null
  })

  const services = [
    { title: 'Frontend Development', driveLink: 'https://drive.google.com/...' },
    { title: 'Backend Development', driveLink: 'https://drive.google.com/...' },
    { title: 'Fullstack Websites', driveLink: 'https://drive.google.com/...' },
    { title: 'Game Tools / Dashboards', driveLink: 'https://drive.google.com/...' },
    { title: 'API & Database Systems', driveLink: 'https://drive.google.com/...' },
    { title: 'AI-Integrated Apps', driveLink: 'https://drive.google.com/...' }
  ]

  const projects = [
    { title: 'Website clones', driveLink: 'https://drive.google.com/...' },
    { title: 'Dashboard UI', driveLink: 'https://drive.google.com/...' },
    { title: 'Portfolio layouts', driveLink: 'https://drive.google.com/...' },
    { title: 'Animations', driveLink: 'https://drive.google.com/...' },
    { title: 'React apps', driveLink: 'https://drive.google.com/...' },
    { title: 'Mobile responsive designs', driveLink: 'https://drive.google.com/...' }
  ]

  const tech = [
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'Tailwind',
    'Firebase',
    'Three.js',
    'AI Tools'
  ]

  const playHoverSound = () => {
    if (hoverSound) {
      hoverSound.currentTime = 0
      hoverSound.volume = 0.1
      hoverSound.play().catch(() => {})
    }
  }

  return (
    <div className="website-page">
      {/* Japanese Background */}
      <div className="website-bg">
        <div className="torii-gate-silhouette" />
        <div className="sakura-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <SakuraPetal key={i} delay={i * 0.5} />
          ))}
        </div>
        <div className="japanese-pattern" />
      </div>

      <PageHeaderLogo />

      <section className="website-hero">
        {/* Optional looping background video */}
        <div className="website-hero-video-container">
          <video
            ref={videoRef}
            className="bg-video website-hero-video background-video"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          >
            <source src="/src/assets/japanese-video.mp4" type="video/mp4" />
          </video>
          <div className="website-hero-video-overlay" />
        </div>
        <motion.div
          animate={{ backgroundPositionX: ['0%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="hero-pattern-overlay"
        />
        <div className="hero-glow" />
        <Canvas className="hero-canvas" camera={{ position: [0, 0, 7], fov: 60 }}>
          <color attach="background" args={[ink]} />
          <ambientLight intensity={0.5} color={beige} />
          <pointLight position={[6, 6, 6]} intensity={1.2} color={red} />
          <RotatingCube />
        </Canvas>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="website-hero-content"
        >
          <h1 className="website-hero-title">
            ASURAX — WEBSITE DEV REALM
          </h1>
          <p className="website-hero-subtitle">
            Precision. Logic. Art.
          </p>
          <div className="kanji-accent">開発</div>
          <div className="japanese-symbol-subtitle">ウェブ開発</div>
          <div className="hero-buttons">
            {['View Projects', 'UI Concepts', 'Hire Developer'].map((label) => (
              <motion.button
                key={label}
                className="hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={playHoverSound}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="website-section">
        <div className="website-container">
          <h2 className="website-section-title">Services</h2>
          <div className="services-grid">
            {services.map((s) => (
              <motion.div
                key={s.title}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={playHoverSound}
              >
                <div className="service-title">{s.title}</div>
                <DocumentButton link={s.driveLink} className="service-button">View Details</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="website-section website-3d">
        <div className="website-container">
          <div className="featured-3d-card">
            <div className="featured-3d-title">Featured 3D</div>
            <div className="featured-3d-canvas">
              <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <color attach="background" args={[ink]} />
                <ambientLight intensity={0.5} color={beige} />
                <pointLight position={[6, 6, 6]} intensity={1.1} color={red} />
                <ShapesRow />
              </Canvas>
            </div>
            <div className="featured-3d-labels">
              <div className="label-item"><span className="label-dot" /> Frontend</div>
              <div className="label-item"><span className="label-dot" /> Backend</div>
              <div className="label-item"><span className="label-dot" /> Fullstack</div>
            </div>
          </div>
        </div>
      </section>

      <section className="website-section">
        <div className="website-container">
          <h2 className="website-section-title">Project Highlights</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <motion.div
                key={p.title}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={playHoverSound}
              >
                <div className="project-image" />
                <div className="project-title">{p.title}</div>
                <DocumentButton link={p.driveLink} className="project-button">View Project</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="website-section">
        <div className="website-container">
          <h2 className="website-section-title">Tech Stack</h2>
          <div className="tech-grid">
            {tech.map((t) => (
              <motion.div
                key={t}
                className="tech-card"
                whileHover={{ scale: 1.1, y: -5 }}
                onHoverStart={playHoverSound}
              >
                <span className="tech-dot" />
                <span className="tech-name">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="website-section website-contact">
        <div className="website-container">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Build with Asurax Development.</h3>
            <div className="contact-buttons">
              <DocumentButton link="https://github.com/asurax1983">GitHub</DocumentButton>
              <DocumentButton link="mailto:asurax1983@gmail.com">Email</DocumentButton>
              <DocumentButton link="https://wa.me/918433365787">WhatsApp</DocumentButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
