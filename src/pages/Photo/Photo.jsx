import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import DocumentButton from '../../components/DocumentButton.jsx'
import PageHeaderLogo from '../../components/PageHeaderLogo.jsx'
import photoRealmVideo from '../../assets/photo-realm.mp4'
import {
  loadAssets,
  loadTextFile,
  directImage,
  driveImage,
} from '../../utils/autoLoader.js'
import photosDriveRaw from '../../assets/photos/drive_images.txt?raw'
import photosInternetRaw from '../../assets/photos/internet_images.txt?raw'
import './Photo.css'

export default function Photo() {
  const [viewerItem, setViewerItem] = useState(null)
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX1 = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY1 = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const springX2 = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY2 = useSpring(mouseY, { stiffness: 30, damping: 20 })
  const springX3 = useSpring(mouseX, { stiffness: 20, damping: 20 })
  const springY3 = useSpring(mouseY, { stiffness: 20, damping: 20 })

  const localImages = loadAssets(() =>
    import.meta.glob('../../assets/photos/gallery/*.{jpg,jpeg,png,webp,gif}', {
      eager: true,
    })
  )

  const driveRaw = loadTextFile(() => photosDriveRaw)
  const driveImages = driveRaw
    ? driveRaw
        .split('\n')
        .filter(Boolean)
        .map((url) => ({
          src: driveImage(url),
        }))
    : []

  const internetRaw = loadTextFile(() => photosInternetRaw)
  const internetImages = internetRaw
    ? internetRaw
        .split('\n')
        .filter(Boolean)
        .map((url) => ({
          src: directImage(url),
        }))
    : []

  const finalGallery = [
    ...localImages,
    ...driveImages,
    ...internetImages,
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x * 20)
      mouseY.set(y * 20)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const categories = [
    { title: 'AI Portraits', driveLink: 'https://drive.google.com/...' },
    { title: 'Posters / Cover Art', driveLink: 'https://drive.google.com/...' },
    { title: 'Cinematic Shots', driveLink: 'https://drive.google.com/...' },
    { title: 'Environment Scenes', driveLink: 'https://drive.google.com/drive/folders/1_HiVpwBgqMQDlCgVsOWGrlQGsytQTIfS?usp=drive_link' },
    { title: 'Game Concept Visuals', driveLink: 'https://drive.google.com/...' }
  ]

  

  const downloadPacks = [
    { title: 'Wallpapers', driveLink: 'https://drive.google.com/...' },
    { title: 'Posters', driveLink: '../../assets/photos/portraits' },
    { title: 'Character Shots', driveLink: 'https://drive.google.com/...' },
    { title: 'Art Themes', driveLink: 'https://drive.google.com/...' }
  ]

  const videoRef = useRef(null);

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

  return (
    <div className="photo-page" ref={containerRef} style={{ position: 'relative', zIndex: 5 }}>
      {/* Cinematic background with video */}
      <div className="photo-bg">
        <video
          ref={videoRef}
          className="bg-video photo-bg-video background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src={photoRealmVideo} type="video/mp4" />
        </video>
        <div className="photo-bg-video-overlay" />
        <motion.div 
          className="photo-bg-layer photo-bg-layer-1"
          style={{ x: springX1, y: springY1 }}
        />
        <motion.div 
          className="photo-bg-layer photo-bg-layer-2"
          style={{ x: springX2, y: springY2 }}
        />
        <motion.div 
          className="photo-bg-layer photo-bg-layer-3"
          style={{ x: springX3, y: springY3 }}
        />
        <div className="photo-bg-bokeh" />
        <div className="photo-bg-grain" />
      </div>

      <PageHeaderLogo />

      <section className="photo-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="photo-hero-content"
        >
          <h1 className="photo-hero-title">
            ASURAX — PHOTO REALM
          </h1>
          <div className="photo-hero-neon-line" />
          <p className="photo-hero-subtitle">
            Frames. Light. Story. Composition.
          </p>
          <div className="photo-hero-buttons">
            {['View Gallery', 'Portraits', 'Posters'].map((label) => (
              <motion.button
                key={label}
                className="photo-hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="photo-section">
        <div className="photo-container">
          <h2 className="photo-section-title">Categories</h2>
          <div className="photo-categories-grid">
            {categories.map((c) => (
              <motion.div
                key={c.title}
                className="photo-category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="category-image" />
                <div className="category-title">{c.title}</div>
                <DocumentButton link={c.driveLink} className="category-button">View</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-section">
        <div className="photo-container">
          <h2 className="photo-section-title">Gallery</h2>
          {finalGallery.length === 0 ? (
            <p className="empty-message">No images available.</p>
          ) : (
            <div className="gallery-grid">
              {finalGallery.map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  className="gallery-image"
                  loading="lazy"
                  alt=""
                />
            ))}
          </div>
          )}
        </div>
      </section>

      

      <section className="photo-section">
        <div className="photo-container">
          <h2 className="photo-section-title">Process</h2>
          <div className="photo-process-grid">
            {Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="photo-process-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="process-grid">
                  <div className="process-image" />
                  <div className="process-image" />
                </div>
                <div className="process-label">Before vs After</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-section">
        <div className="photo-container">
          <h2 className="photo-section-title">Download Packs</h2>
          <div className="photo-download-grid">
            {downloadPacks.map((d) => (
              <motion.div
                key={d.title}
                className="photo-download-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="download-card-image" />
                <div className="download-card-title">{d.title}</div>
                <DocumentButton link={d.driveLink} className="download-button">Download</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-section photo-contact">
        <div className="photo-container">
          <motion.div
            className="photo-contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Work with Asurax Photo Team</h3>
            <div className="contact-buttons">
              <DocumentButton link="https://www.instagram.com/asurax_studios">Instagram</DocumentButton>
              <DocumentButton link="mailto:asurax1983@gmail.com">Email</DocumentButton>
              <DocumentButton link="https://wa.me/918433365787">WhatsApp</DocumentButton>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {viewerItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="photo-viewer-overlay"
            onClick={() => setViewerItem(null)}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="photo-viewer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="viewer-image-placeholder" />
              <div className="viewer-close" onClick={() => setViewerItem(null)}>×</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
