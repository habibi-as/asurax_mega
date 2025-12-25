import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import DocumentButton from '../../components/DocumentButton.jsx'
import PageHeaderLogo from '../../components/PageHeaderLogo.jsx'
import soundRealmVideo from '../../assets/sound-realm.mp4'
import './Sound.css'

export default function Sound() {
  const accent = '#4BD7FF'
  const audioRef = useRef(null)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const tracks = [
    { title: 'Ethereal Drift', src: '', driveLink: 'https://drive.google.com/file/d/1A6GyhEv7SAKPCN4rSpuTmMh33qw4TI38/view?usp=drive_link' },
    { title: 'Nebula Pulse', src: '', driveLink: 'https://drive.google.com/file/d/19HaVGW8cVG9MD6MQjeNnSsOQV_aP30T2/view?usp=drive_link' },
    { title: 'Cosmic Echo', src: '', driveLink: 'https://drive.google.com/file/d/1UYC-ZgsS4Jw-Aa2xMg_xRd_tTBiaEUKE/view?usp=drive_link' }
  ]

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const particleOptions = {
    fpsLimit: 60,
    background: { color: '#000000' },
    particles: {
      number: { value: isMobile ? 0 : 8 },
      size: { value: 2 },
      move: { enable: true, speed: 0.5 },
      color: { value: accent },
      links: { enable: false }
    }
  }

  const categories = [
    { title: 'Ambient Music', icon: '🎧', driveLink: 'https://drive.google.com/drive/folders/13zh-uYvyW3hMZGk--IliaX2vHJ5Se8cw?usp=drive_link' },
    { title: 'Game SFX', icon: '🔊', driveLink: 'https://drive.google.com/drive/folders/1L-D00yNZc1bNEpWmuIPk3XYQ8RK_dFlV?usp=drive_link' },
    { title: 'Cinematic Atmospheres', icon: '🎵', driveLink: 'https://drive.google.com/drive/folders/1C08FgWViMElDXCQh84AnFVjlU5PQ2Xpx?usp=drive_link' },
    { title: 'Voice FX / Dialogue', icon: '🎙️', driveLink: 'https://drive.google.com/...' },
    { title: 'AI Sound Experiments', icon: '🧪', driveLink: 'https://drive.google.com/drive/folders/1OGDLoWOYWu70O6WlCbVk5C777HmzeCFl?usp=drive_link' }
  ]

  const packs = [
    { title: 'Horror Sound Pack', icon: '🔊', driveLink: 'https://drive.google.com/drive/folders/12R_wB2DnelVQ_2eVPGkq17InfaLBa3fl?usp=drive_link' },
    { title: 'Ocean Ambience Pack', icon: '🎧', driveLink: 'https://drive.google.com/drive/folders/1j8_67lS0ZNG2GHrRIMznnQi8MORTbPaf?usp=drive_link' },
    { title: 'Futuristic UI SFX Pack', icon: '🎵', driveLink: 'https://drive.google.com/drive/folders/1oT5ip4nkfsKjBU68riEqHcmR3ArmIauL?usp=drive_link' },
    { title: 'Cinematic Trailer Sounds', icon: '🎬', driveLink: 'https://drive.google.com/drive/folders/176e56VAbybZ-0BfokSGVFMd41lxXcKl7?usp=drive_link' }
  ]

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!tracks[currentIndex].src) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const selectTrack = (idx) => {
    setCurrentIndex(idx)
    const audio = audioRef.current
    if (!audio) return
    if (tracks[idx].src) {
      audio.pause()
      audio.load()
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="sound-page" style={{ position: 'relative', zIndex: 5 }}>
      {/* Blue neon studio background */}
      <div className="sound-bg">
        <video
          ref={videoRef}
          className="bg-video sound-bg-video background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src={soundRealmVideo} type="video/mp4" />
        </video>
        <div className="sound-bg-video-overlay" />
        <div className="sound-particles">
          <Particles id="tsparticles-sound" init={particlesInit} options={particleOptions} />
        </div>
        <div className="sound-wave-overlay" />
        <div className="sound-neon-glow" />
      </div>

      <PageHeaderLogo />

      <section className="sound-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="sound-hero-content"
        >
          <div className="sound-hero-title-wrapper">
            <h1 className="sound-hero-title">
              ASURAX — SOUND REALM
            </h1>
            <div className="sound-hero-glow" />
          </div>
          <p className="sound-hero-subtitle">
            Vibrations. Atmosphere. Identity.
          </p>

          <div className="sound-hero-visualizer">
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="sound-hero-circle"
            />
          </div>

          <div className="sound-hero-buttons">
            {['Listen Now', 'Sound Packs', 'Voice SFX'].map((label) => (
              <motion.button
                key={label}
                className="sound-hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="sound-section">
        <div className="sound-container">
          <h2 className="sound-section-title">Audio Categories</h2>
          <div className="sound-categories-grid">
            {categories.map((c) => (
              <motion.div
                key={c.title}
                className="sound-category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="category-icon">{c.icon}</div>
                <div className="category-title">{c.title}</div>
                <DocumentButton link={c.driveLink} className="category-button">Explore</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sound-section">
        <div className="sound-container">
          <h2 className="sound-section-title">Featured Audio</h2>
          <motion.div
            className="sound-featured-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="featured-audio-content">
              <div className="audio-visualizer-circle" />
              <div className="audio-controls">
                <div className="audio-track-title">{tracks[currentIndex].title}</div>
                <div className="audio-waveform">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="waveform-bar"
                      animate={isPlaying ? { height: [8, 24, 10] } : { height: 8 }}
                      transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0, delay: (i % 7) * 0.05 }}
                    />
                  ))}
                </div>
                <div className="audio-buttons">
                  <button onClick={togglePlay} className="audio-play-button">
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  {tracks.map((t, idx) => (
                    <button
                      key={t.title}
                      onClick={() => selectTrack(idx)}
                      className={`audio-track-button ${idx === currentIndex ? 'active' : ''}`}
                    >
                      {t.title}
                    </button>
                  ))}
                  <audio ref={audioRef} src={tracks[currentIndex].src} />
                </div>
                <DocumentButton link={tracks[currentIndex].driveLink} className="audio-download-button">
                  Download Track
                </DocumentButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sound-section">
        <div className="sound-container">
          <h2 className="sound-section-title">Sound Packs</h2>
          <div className="sound-packs-grid">
            {packs.map((p) => (
              <motion.div
                key={p.title}
                className="sound-pack-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="pack-icon">{p.icon}</div>
                <div className="pack-title">{p.title}</div>
                <DocumentButton link={p.driveLink} className="pack-button">Download</DocumentButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sound-section">
        <div className="sound-container">
          <h2 className="sound-section-title">Soundwave Wall</h2>
          <motion.div
            className="soundwave-wall"
            animate={{ backgroundPositionX: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </section>

      <section className="sound-section sound-contact">
        <div className="sound-container">
          <motion.div
            className="sound-contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Work with Asurax Sound Team</h3>
            <div className="contact-buttons">
              <DocumentButton link="https://www.instagram.com/asurax_studios">Instagram</DocumentButton>
              <DocumentButton link="mailto:asurax1983@gmail.com">Email</DocumentButton>
              <DocumentButton link="https://wa.me/918433365787">WhatsApp</DocumentButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
