// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from '@studio-freight/lenis';

// Import color system
import '../src/styles/colors.css';

import AsuraxMenuHorizontal from "./components/Bits/AsuraxMenuHorizontal.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Intro from "./pages/Intro/Intro.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Gaming from "./pages/Gaming/Gaming.jsx";
import GamingIntro from "./pages/Gaming/GamingIntro.jsx";
import Video from "./pages/Video/Video.jsx";
import Sound from "./pages/Sound/Sound.jsx";
import Music from "./pages/Music/Music.jsx";
import Photo from "./pages/Photo/Photo.jsx";
import Docs from "./pages/Docs/Docs.jsx";
import Website from "./pages/Website/Website.jsx";

// ASURAX: Page transition variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function App() {
  const location = useLocation();
  const lenis = useRef(null);

  // Initialize Lenis for smooth scrolling - optimized
  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      lenis.current = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1.0,
        normalizeWheel: true,
        lerp: 0.1,
      });

      function raf(time) {
        lenis.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup
      return () => {
        if (lenis.current) {
          lenis.current.destroy();
          lenis.current = null;
        }
      };
    }
  }, []);

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger on route change
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Hide footer on Intro page only
  const hideFooter = location.pathname === "/";

  return (
    <div>
      <ScrollToTop />
      <AsuraxMenuHorizontal />

      {/* ⭐ ADD LIQUID ETHER CURSOR EFFECT HERE */}

      {/* ASURAX: Smooth page transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gaming-intro" element={<GamingIntro />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/video" element={<Video />} />
            <Route path="/sound" element={<Sound />} />
            <Route path="/music" element={<Music />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/website" element={<Website />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!hideFooter && <Footer />}
    </div>
  );
}
