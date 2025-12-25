// ASURAX: Gaming Intro Page - Cinematic Preloader
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import "./GamingIntro.css";

/* ------------------------------
   PARTICLE OPTIONS
--------------------------------*/
const particleOptions = {
  fpsLimit: 60,
  background: { color: "#000000" },
  particles: {
    number: { value: 150 },
    size: {
      value: { min: 2, max: 4 },
      animation: { enable: true, speed: 2, size_min: 0.5 }
    },
    shape: { type: "circle" },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    },
    color: {
      value: ["#4BD7FF", "#A24CFF", "#FF9FFC", "#5227FF"]
    },
    opacity: {
      value: 0.8,
      animation: { enable: true, speed: 0.5 }
    },
    links: { enable: false }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { quantity: 4 }
    }
  }
};

export default function GamingIntro() {
  const navigate = useNavigate();
  const [particlesReady, setParticlesReady] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);

  /* ------------------------------
      INIT PARTICLES (CORRECT WAY)
  --------------------------------*/
  const particlesInit = async (engine) => {
    await loadSlim(engine);
    setParticlesReady(true);
  };

  /* ------------------------------
     AUTO REDIRECT + SKIP TIMER
  --------------------------------*/
  useEffect(() => {
    const timer = setTimeout(() => navigate("/gaming"), 5500);
    const skipTimer = setTimeout(() => setSkipVisible(true), 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(skipTimer);
    };
  }, [navigate]);

  return (
    <div className="gaming-intro-page">

      {/* BACKGROUND WITH PARTICLES */}
      <div className="gaming-intro-bg">
        <Particles
          id="tsparticles-gaming-intro"
          init={particlesInit}
          options={particleOptions}
          className="gaming-intro-particles"
        />

        <div className="gaming-intro-gradient-overlay" />

        <div className="gaming-intro-light-streaks">
          <div className="streak streak-1" />
          <div className="streak streak-2" />
          <div className="streak streak-3" />
        </div>
      </div>

      {/* CONTENT */}
      <motion.div
        className="gaming-intro-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="gaming-intro-headline"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          ENTER THE GAMEVERSE
        </motion.h1>

        <motion.div
          className="gaming-intro-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            className="gaming-intro-cta"
            onClick={() => navigate("/gaming")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(75, 215, 255, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Enter
          </motion.button>
        </motion.div>
      </motion.div>

      {/* SKIP BUTTON */}
      {skipVisible && (
        <motion.button
          className="gaming-intro-skip"
          onClick={() => navigate("/gaming")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Skip
        </motion.button>
      )}
    </div>
  );
}
