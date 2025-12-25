import React from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./FlowingMenuHorizontal.css";

export default function AsuraxMenuHorizontal() {
  const navigate = useNavigate();

  const pages = [
    // 1️⃣ HOME
    { 
      link: "/home", 
      text: "Home", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(162,76,255,0.25), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(75,215,255,0.25), transparent 60%), linear-gradient(180deg, #0a0a12, #05030C)' 
    },

    // 2️⃣ ABOUT — moved to second position
    { 
      link: "/about", 
      text: "About", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(162,76,255,0.22), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(75,215,255,0.20), transparent 60%), linear-gradient(180deg, #0a0a12, #05030C)' 
    },

    // 3️⃣ GAMING - routes to intro first
    { 
      link: "/gaming-intro", 
      text: "Gaming", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(215,0,46,0.25), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(75,215,255,0.15), transparent 60%), linear-gradient(180deg, #0b0b0f, #05030C)' 
    },

    // 4️⃣ VIDEO
    { 
      link: "/video", 
      text: "Video", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(66,148,255,0.22), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(162,76,255,0.18), transparent 60%), linear-gradient(180deg, #0a0a12, #060513)' 
    },

    // 5️⃣ SOUND
    { 
      link: "/sound", 
      text: "Sound", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(162,76,255,0.25), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(34,211,238,0.22), transparent 60%), linear-gradient(180deg, #0a0a12, #05030C)' 
    },

    // 6️⃣ PHOTO
    { 
      link: "/photo", 
      text: "Photo", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(196,164,106,0.18), transparent 60%), linear-gradient(180deg, #0a0a12, #05030C)' 
    },

    // 7️⃣ DOCS
    { 
      link: "/docs", 
      text: "Docs", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(196,164,106,0.22), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(162,76,255,0.14), transparent 60%), linear-gradient(180deg, #0a0a12, #060513)' 
    },

    // 8️⃣ WEBSITE
    { 
      link: "/website", 
      text: "Website", 
      bg: 'radial-gradient(800px circle at 30% 20%, rgba(34,211,238,0.25), transparent 60%), radial-gradient(800px circle at 70% 80%, rgba(162,76,255,0.18), transparent 60%), linear-gradient(180deg, #0a0a12, #05030C)' 
    },

  ];

  return (
    <div className="menuX-container">
      <div className="menuX-track">
        {pages.map((item, i) => (
          <MenuXItem key={i} {...item} onNavigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function MenuXItem({ link, text, bg, onNavigate }) {
  const wrapRef = React.useRef(null);
  const textRef = React.useRef(null);
  const imgRef = React.useRef(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, { opacity: 1, y: -10, duration: 0.4, ease: "power3.out" });
    gsap.to(textRef.current, { color: "#4BD7FF", letterSpacing: "2px", duration: 0.3 });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, { opacity: 0, y: 10, duration: 0.4, ease: "power3.out" });
    gsap.to(textRef.current, { color: "#ffffff", letterSpacing: "0px", duration: 0.3 });
  };

  return (
    <div
      ref={wrapRef}
      className="menuX-item"
      onClick={() => onNavigate(link)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="menuX-text" ref={textRef}>{text}</div>
      <div className="menuX-image" ref={imgRef} style={{ backgroundImage: bg }} />
    </div>
  );
}
