"use client";

import { motion } from "framer-motion";
import "./Music.css";

export default function Music() {
  const tracks = [
    {
      id: 1,
      title: "Ethereal Drift",
      artist: "ASURAX Studios",
      duration: "3:45",
      driveLink: "https://drive.google.com/file/d/your-file-id-1/view?usp=sharing"
    },
    {
      id: 2,
      title: "Nebula Pulse",
      artist: "ASURAX Studios",
      duration: "4:12",
      driveLink: "https://drive.google.com/file/d/your-file-id-2/view?usp=sharing"
    },
    {
      id: 3,
      title: "Cosmic Echo",
      artist: "ASURAX Studios",
      duration: "3:28",
      driveLink: "https://drive.google.com/file/d/your-file-id-3/view?usp=sharing"
    },
    {
      id: 4,
      title: "Digital Dreams",
      artist: "ASURAX Studios",
      duration: "5:01",
      driveLink: "https://drive.google.com/file/d/your-file-id-4/view?usp=sharing"
    },
    {
      id: 5,
      title: "Stellar Waves",
      artist: "ASURAX Studios",
      duration: "4:33",
      driveLink: "https://drive.google.com/file/d/your-file-id-5/view?usp=sharing"
    },
    {
      id: 6,
      title: "Quantum Flow",
      artist: "ASURAX Studios",
      duration: "3:56",
      driveLink: "https://drive.google.com/file/d/your-file-id-6/view?usp=sharing"
    }
  ];

  return (
    <div className="music-page">
      <div className="music-bg">
        <div className="music-gradient-overlay" />
      </div>

      <div className="music-container">
        {/* Header */}
        <motion.section
          className="music-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="music-title">Music</h1>
          <p className="music-subtitle">Original compositions by ASURAX Studios</p>
        </motion.section>

        {/* Tracks Grid */}
        <section className="music-tracks-section">
          <div className="music-tracks-grid">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className="music-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="music-card-artwork">
                  <div className="music-artwork-placeholder">
                    <span className="music-artwork-text">AS</span>
                  </div>
                </div>

                <div className="music-card-content">
                  <h3 className="music-track-title">{track.title}</h3>
                  <p className="music-track-artist">{track.artist}</p>
                  <p className="music-track-duration">{track.duration}</p>
                </div>

                <div className="music-card-actions">
                  <a
                    href={track.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-drive-button"
                  >
                    Drive Link
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

