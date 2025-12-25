// ASURAX: Video page - Rainforest theme
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Correct particles imports
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import DocumentButton from "../../components/DocumentButton.jsx";
import PageHeaderLogo from "../../components/PageHeaderLogo.jsx";
import videoRealmVideo from "../../assets/vedio-realm.mp4";
import "./Video.css";

// ASURAX: Rainforest particle options
const getRainforestParticleOptions = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  return {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
      number: { value: isMobile ? 0 : 8 },
    size: {
      value: { min: 1, max: 3 },
      animation: {
        enable: true,
        speed: 1,
        size_min: 0.5,
      },
    },
    shape: { type: "circle" },
    move: {
      enable: true,
      speed: 0.5,
      direction: "bottom",
      random: true,
      straight: false,
      out_mode: "out",
    },
    color: {
      value: ["#6CC68F", "#4A9B6E", "#8FBC8F", "#90EE90"],
    },
    opacity: {
      value: 0.4,
      animation: {
        enable: true,
        speed: 0.3,
      },
    },
    links: { enable: false },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
    },
  },
  };
};

export default function Video() {
  const [viewerItem, setViewerItem] = useState(null);
  const videoRef = useRef(null);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

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

  const categories = [
    { title: "Cinematic Edits", icon: "🎬", driveLink: "https://drive.google.com/..." },
    { title: "Short Reels", icon: "📱", driveLink: "https://drive.google.com/..." },
    { title: "Game Trailers", icon: "🎮", driveLink: "https://drive.google.com/..." },
    { title: "AI Motion Graphics", icon: "✨", driveLink: "https://drive.google.com/..." },
    { title: "Behind The Scenes", icon: "🎥", driveLink: "https://drive.google.com/..." },
  ];

  

  const downloadLinks = [
    { title: "Full Reel Folder (Drive)", driveLink: "https://drive.google.com/..." },
    { title: "Behind The Scenes", driveLink: "https://drive.google.com/..." },
    { title: "Project Files (optional)", driveLink: "https://drive.google.com/..." },
  ];

  return (
    <div className="video-page" style={{ position: 'relative', zIndex: 5 }}>
      {/* Background */}
      <div className="video-bg">
        <video
          ref={videoRef}
          className="bg-video video-bg-video background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src={videoRealmVideo} type="video/mp4" />
        </video>
        <div className="video-bg-video-overlay" />
        <div className="rainforest-bg-image" />

        <Particles
          id="tsparticles-video"
          init={particlesInit}
          options={getRainforestParticleOptions()}
          className="video-particles"
        />

        <div className="video-gradient-overlay" />
        <div className="video-neon-glow" />
      </div>

      <PageHeaderLogo />

      {/* HERO */}
      <section className="video-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="video-hero-content"
        >
          <h1 className="video-hero-title">ASURAX — VIDEO REALM</h1>
          <p className="video-hero-subtitle">Motion. Rhythm. Emotion.</p>

          <div className="video-hero-buttons">
            {["Watch Reels", "Show Edits", "Full Portfolio"].map((label) => (
              <motion.button
                key={label}
                className="video-hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="video-section">
        <div className="video-container">
          <h2 className="video-section-title">Categories</h2>

          <div className="video-categories-grid">
            {categories.map((c) => (
              <motion.div
                key={c.title}
                className="video-category-card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="category-icon">{c.icon}</div>
                <div className="category-title">{c.title}</div>
                <DocumentButton link={c.driveLink}>View</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* GALLERY */}
      <section className="video-section">
        <div className="video-container">
          <h2 className="video-section-title">Video Gallery</h2>

          <div className="video-gallery-grid">
            {Array.from({ length: 5 }).map((_, idx) => (
              <motion.button
                key={idx}
                className="video-gallery-card"
                onClick={() => setViewerItem({ index: idx })}
                whileHover={{ scale: 1.05 }}
              >
                <div className="gallery-card-image" />
                <div className="gallery-card-overlay">
                  <span className="gallery-play-icon">▶</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="video-section">
        <div className="video-container">
          <h2 className="video-section-title">Editing Process</h2>

          <div className="video-process-grid">
            {["Raw Clip", "AI Enhancement / Color Grade", "Final Edit"].map((step) => (
              <motion.div
                key={step}
                className="video-process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="process-card-image" />
                <div className="process-card-title">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="video-section">
        <div className="video-container">
          <h2 className="video-section-title">Download Packs / Drive Links</h2>

          <div className="video-download-grid">
            {downloadLinks.map((d) => (
              <motion.div
                key={d.title}
                className="video-download-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="download-card-image" />
                <div className="download-card-title">{d.title}</div>
                <DocumentButton link={d.driveLink}>Download</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="video-section video-contact">
        <div className="video-container">
          <motion.div
            className="video-contact-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-title">Work with Asurax Video Team</h3>

            <div className="contact-buttons">
              <DocumentButton link="https://www.instagram.com/asurax_studios">Instagram</DocumentButton>
              <DocumentButton link="mailto:asurax1983@gmail.com">Email</DocumentButton>
              <DocumentButton link="https://wa.me/918433365787">WhatsApp</DocumentButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VIEWER OVERLAY */}
      <AnimatePresence>
        {viewerItem && (
          <motion.div
            className="video-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewerItem(null)}
          >
            <motion.div
              className="video-viewer-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="viewer-video-placeholder">
                <div className="viewer-placeholder-text">Video Player</div>

                {viewerItem?.title && (
                  <div className="viewer-title">{viewerItem.title}</div>
                )}
              </div>

              <div
                className="viewer-close"
                onClick={() => setViewerItem(null)}
              >
                ×
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
