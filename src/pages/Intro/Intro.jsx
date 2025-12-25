import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingLines from "../../components/Bits/FloatingLines";
import BlurText from "../../components/Bits/BlurText";
import SplashCursor from "../../components/Bits/SplashCursor";

import { gsap } from "gsap";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const titleRef = useRef(null);
  const subRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }
    );
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      hintRef.current,
      { opacity: 0 },
      { opacity: 0.7, delay: 0.6, duration: 1 }
    );
  }, []);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate("/home"), 600);
  };

  return (
    <motion.div
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onClick={handleEnter}
    >
      {/* FULLSCREEN WAVES BACKGROUND */}
      <div className="intro-lines-bg">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[18, 12, 10]}
          lineDistance={[6, 4, 2]}
          topWavePosition={{ x: 14, y: 0.6, rotate: -0.5 }}
          middleWavePosition={{ x: 6, y: 0.2, rotate: 0.2 }}
          bottomWavePosition={{ x: 2, y: -0.6, rotate: 0.5 }}
          animationSpeed={1}
          interactive={true}
          parallax={true}
          parallaxStrength={0.12}
          linesGradient={["#7ef9ff", "#6a5cff", "#d66bff"]}
          bendRadius={4.0}
          bendStrength={-0.35}
          mouseDamping={0.05}
          mixBlendMode="screen"
        />
      </div>

      {/* GRAIN OVERLAY */}
      <div className="intro-grain" />

      {/* CURSOR SPLASH */}
      <SplashCursor />

      {/* CONTENT */}
      <div className="intro-center">
        <div className="intro-text">
          <div className="pulse-circle" />

          <BlurText
            text="WELCOME TO ASURAX STUDIOS"
            animateBy="words"
            direction="top"
            delay={160}
            className="intro-title"
          />

          <div ref={subRef} className="intro-subtitle">
            A multiverse of creativity — games, visuals, sound & experiments.
          </div>

          <div ref={hintRef} className="intro-hint">
            Tap anywhere to enter
          </div>
        </div>
      </div>

      {exiting && <div className="intro-fadeout" />}
    </motion.div>
  );
}
