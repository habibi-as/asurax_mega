import { motion } from 'framer-motion'
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import DocumentButton from '../../components/DocumentButton.jsx'
import PageHeaderLogo from '../../components/PageHeaderLogo.jsx'
import {
  loadAssets,
  loadTextFile,
  directImage,
  driveImage,
} from '../../utils/autoLoader.js'
import docsDriveRaw from '../../assets/docs/drive_images.txt?raw'
import docsInternetRaw from '../../assets/docs/internet_images.txt?raw'
import './Docs.css'

export default function Docs() {
  const sandstone = '#EADDC8'
  const parchment = '#F7F2E4'
  const gold = '#C4A46A'
  const royalBlue = '#1E3A5F'

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const categories = [
    { title: 'Game GDDs', icon: '📜', driveLink: 'https://drive.google.com/...' },
    { title: 'World Lore', icon: '📖', driveLink: 'https://drive.google.com/...' },
    { title: 'Character Documents', icon: '🪶', driveLink: 'https://drive.google.com/...' },
    { title: 'Story Notes', icon: '📝', driveLink: 'https://drive.google.com/...' },
    { title: 'Project Blueprints', icon: '📂', driveLink: 'https://drive.google.com/...' }
  ]

  const libraryDocs = [
    { title: 'Core Mechanics Draft', type: 'GDD', driveLink: 'https://drive.google.com/...' },
    { title: 'World Timeline Outline', type: 'Timeline', driveLink: 'https://drive.google.com/...' },
    { title: 'Character Sheets Index', type: 'Index', driveLink: 'https://drive.google.com/...' },
    { title: 'Narrative Threads', type: 'Narrative', driveLink: 'https://drive.google.com/...' },
    { title: 'Blueprint Repository', type: 'Blueprints', driveLink: 'https://drive.google.com/...' },
    { title: 'Field Notes Compilation', type: 'Notes', driveLink: 'https://drive.google.com/...' }
  ]

  const localImages = loadAssets(() =>
    import.meta.glob('../../assets/docs/projects/*.{jpg,jpeg,png,webp,gif}', {
      eager: true,
    })
  )

  const driveRaw = loadTextFile(() => docsDriveRaw)
  const driveImages = driveRaw
    ? driveRaw
        .split('\n')
        .filter(Boolean)
        .map((url) => ({
          src: driveImage(url),
        }))
    : []

  const internetRaw = loadTextFile(() => docsInternetRaw)
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const particleOptions = {
    fpsLimit: 60,
    background: { color: parchment },
    particles: {
      number: { value: isMobile ? 0 : 8 },
      size: { value: 1.5 },
      move: { enable: true, speed: 0.4 },
      color: { value: gold },
      opacity: { value: 0.5 },
      links: { enable: false }
    }
  }

  return (
    <div className="docs-page">
      {/* Egyptian Background */}
      <div className="docs-bg">
        <div className="pyramid-silhouette" />
        <div className="palm-leaves-left" />
        <div className="palm-leaves-right" />
        <div className="papyrus-texture" />
        <div className="fixed inset-0 -z-20">
          <Particles id="tsparticles-docs" init={particlesInit} options={particleOptions} />
        </div>
      </div>

      <PageHeaderLogo />

      <section className="docs-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="docs-hero-content"
        >
          <h1 className="docs-hero-title">
            ASURAX — DOCUMENT REALM
          </h1>
          <p className="docs-hero-subtitle">
            Knowledge. Lore. Archives.
          </p>
        </motion.div>
      </section>

      <section className="docs-section">
        <div className="docs-container">
          <h2 className="docs-title">Categories</h2>
          <div className="docs-categories-vertical">
            {categories.map((cat) => (
              <div className="docs-category-card" key={cat.title}>
                <div className="cat-left">
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-title">{cat.title}</span>
                </div>
                <DocumentButton link={cat.driveLink}>Open</DocumentButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-container">
          <h2 className="docs-title">Document Library</h2>
          <div className="docs-library-vertical">
            {libraryDocs.map((doc) => (
              <div className="docs-file-card" key={doc.title}>
                <div className="file-info">
                  <span className="file-title">{doc.title}</span>
                  <span className="file-type">{doc.type}</span>
                </div>
                <DocumentButton link={doc.driveLink}>View</DocumentButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      

      

      <section className="docs-section docs-contact">
        <div className="docs-container">
          <motion.div
            className="docs-contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Access the Asurax Knowledge Vault</h3>
            <div className="contact-buttons">
              <DocumentButton link="mailto:asurax1983@gmail.com">Email</DocumentButton>
              <DocumentButton link="https://wa.me/918433365787">WhatsApp</DocumentButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
