// src/pages/Home/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import logoFile from "../../assets/lasurax-metallic.png";
import "./Home.css";

// Static gradient overlay for better performance
function GradientOverlay() {
  return (
    <div className="gradient-overlay">
      <div className="gradient-1" />
      <div className="gradient-2" />
    </div>
  );
}

/* PURE SVG ICONS (colored) */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="url(#instagramGradient)">
      <defs>
        <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#instagramGradient)" fill="none" strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="3.1" stroke="url(#instagramGradient)" fill="none" strokeWidth="1.4"/>
      <circle cx="17.5" cy="6.5" r="0.6" fill="url(#instagramGradient)"/>
    </svg>
  );
}
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#ffffff' }}>
      <path
        d="M12 .5C5.73.5.75 5.5.75 11.8c0 4.75 3.07 8.78 7.33 10.2.54.1.74-.24.74-.52
        0-.26-.01-1-.02-1.96-2.98.64-3.61-1.43-3.61-1.43-.49-1.24-1.2-1.57-1.2-1.57-.98-.67.07-.66.07-.66
        1.08.08 1.65 1.12 1.65 1.12.96 1.64 2.52 1.17 3.13.9.1-.7.38-1.17.69-1.44-2.38-.27-4.88-1.19-4.88-5.28
        0-1.17.42-2.13 1.11-2.88-.11-.27-.48-1.37.11-2.85
        0 0 .9-.29 2.95 1.1 2-.68 4.7-.68 6.7 0 2.05-1.4 2.95-1.1 2.95-1.1.59 1.48.22 2.58.11 2.85.69.75 1.11 1.71 1.11 2.88
        0 4.09-2.51 5.01-4.9 5.27.39.34.73 1.02.73 2.06
        0 1.49-.01 2.69-.01 3.05 0 .29.2.63.75.52
        4.26-1.42 7.33-5.44 7.33-10.19C23.25 5.5 18.27.5 12 .5z"
      />
    </svg>
  );
}
function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#5865F2' }}>
      <path
        d="M20.5 3.5s-1.1-.4-2.6-.8c-.1 0-.2.1-.3.2-1.9.9-3.5 1.4-4.5 1.6-.1 0-.2.1-.3.1-.2 0-.3-.1-.4-.2
        C10.4 3 7.9 2.5 7.9 2.5 6.4 2.9 5.3 3.3 5.3 3.3 2.8 6.7 3.2 10 3.2 10c1.1.8 2 1.6 2.8 2.5
        -.4 1.1-.9 2.4-1 3.6 0 0 1.1.4 2.5.6 0 0 .4-.6.7-1.1
        1.3.4 2.6.6 3.9.6s2.6-.2 3.9-.6c.3.5.7 1.1.7 1.1
        1.4-.2 2.5-.6 2.5-.6-.1-1.2-.6-2.5-1-3.6.8-.9 1.7-1.7 2.8-2.5
        0 0 .5-3.3.1-6.7z"
      />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#FFD700' }}>
      <path d="M3 6.5v11A2.5 2.5 0 005.5 20h13A2.5 2.5 0 0021 17.5v-11A2.5 2.5 0 0018.5 4h-13A2.5 2.5 0 003 6.5z"
        fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 6.8L12 11.8l7.5-5"
        fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#25D366' }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#ffffff' }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const social = [
    { id: "instagram", href: "https://www.instagram.com/asurax_studios", icon: <IconInstagram /> },
    { id: "github", href: "https://github.com/asurax1983", icon: <IconGithub /> },
    { id: "discord", href: "https://discord.com/", icon: <IconDiscord /> },
    { id: "mail", href: "mailto:asurax1983@gmail.com", icon: <IconMail /> },
    { id: "whatsapp", href: "https://wa.me/918433365787", icon: <IconWhatsApp /> },
    { id: "phone", href: "tel:+918433365787", icon: <IconPhone /> }
  ];

  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Cinematic intro sequence - optimized timing
    const timer = setTimeout(() => setIntroComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="home-root">
      {/* Static Cinematic Background */}
      <div 
        className="cinematic-bg"
        style={{ 
          background: 'radial-gradient(circle at center, #0a0a14 0%, #050508 50%, #000000 100%)',
          position: 'fixed',
          inset: 0,
          zIndex: -25,
          pointerEvents: 'none'
        }}
      />
      <GradientOverlay />

      {/* Cinematic Intro Overlay */}
      {!introComplete && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
        />
      )}

      <main className="home-content">
        {/* HERO SECTION */}
        <section className="hero-section hero-large">
          <div className="hero-inner">
            {/* ASURAX: Logo - centered with static effect */}
            <motion.div
              className="hero-logo-wrap"
              style={{ y: logoY, rotateX: tilt }}
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ 
                opacity: introComplete ? 1 : 0,
                rotate: introComplete ? 0 : -180,
                scale: introComplete ? 1 : 0.5
              }}
              transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 40, damping: 15 }}
            >
              <div className="logo-container">
                <img 
                  src={logoFile}
                  alt="ASURAX Logo"
                  className="hero-center-logo"
                  loading="lazy"
                />
              </div>
              <div className="logo-glow" />
              <div className="logo-rim-light" />
            </motion.div>

            {/* ASURAX: Title with sci-fi styling and reflection */}
            <motion.h1
              className="hero-title cinematic"
              data-text="ASURAX STUDIOS"
              style={{ y: titleY }}
              initial={{ opacity: 0, scaleX: 0, filter: "blur(20px)" }}
              animate={{ 
                opacity: introComplete ? 1 : 0,
                scaleX: introComplete ? 1 : 0,
                filter: introComplete ? "blur(0px)" : "blur(20px)"
              }}
              transition={{ duration: 0.6, delay: 2, type: "spring", stiffness: 80, damping: 20 }}
            >
              ASURAX STUDIOS
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              A Multiverse of Creativity
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 3.2, type: "spring", stiffness: 80, damping: 20 }}
            >
              <motion.button
                className="cta-primary"
                onClick={() => navigate("/about")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter the Multiverse
              </motion.button>
              <motion.a
                className="cta-ghost"
                href="#work-with-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Work With Us
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ASURAX: LOGO MARQUEE - starts from LEFT with colored icons */}
        <section className="home-logos section-small" aria-hidden>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {Array.from({ length: 3 }).map((_, copy) =>
                social.map((s, idx) => (
                  <a 
                    key={`${s.id}-${copy}`} 
                    className="marquee-item" 
                    href={s.href} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-hidden={copy > 0 ? "true" : undefined}
                  >
                    <span className="marquee-icon">{s.icon}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="what-section section-medium">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              className="what-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="what-text">
                Asurax Studios blends game design, sound engineering,
                web development, video production, and creative arts
                into a unified futuristic multiverse.
              </div>
            </motion.div>
          </div>
        </section>

        {/* WORK WITH US */}
        <section id="work-with-us" className="work-section section-medium">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="work-panel"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Work With Asurax</h2>
              <div className="work-icons">
                {social.map(s => (
                  <motion.a
                    key={s.id}
                    className={`social-tile ${s.id}`}
                    href={s.href}
                    target="_blank"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`social-bg ${s.id}-bg`} />
                    <span className="social-svg">{s.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
