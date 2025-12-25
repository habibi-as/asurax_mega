// src/pages/About/About.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import {
  Shield,
  Code,
  Gamepad2,
  Brain,
  Palette,
  Users,
  Smartphone,
  Globe,
  Zap,
  Database
} from "lucide-react";

import AchievementsSection from "./AchievementsSection.jsx";
import SkillsSection from "./SkillsSection.jsx";

import "./About.css";


/* ----------------------------------------
   MAIN ABOUT COMPONENT
----------------------------------------- */
export default function About() {

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div className="about-root">
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-left">
          <div className="jp-mark">アスラックス</div>

          <h1 className="hero-title">
            Asurax Studios
            <span className="subline">— Multiverse of Creation</span>
          </h1>

          <p className="hero-lead">
            We build bold interactive experiences — games, soundscapes, visuals and interfaces that feel alive.
            From cyber-hack nights to community game jams, Asurax crafts work that sparks obsession.
          </p>

          <div className="hero-actions">
            <a className="cta-ghost" href="/gaming">Our Games</a>
            <a className="cta-primary" href="/about#founders">Meet the Founders</a>
          </div>
        </div>

        <div className="hero-right">
          <motion.div
            className="neon-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="np-row"><strong>Founded</strong><span>2022</span></div>
            <div className="np-row"><strong>Base</strong><span>Pune & Remote</span></div>
            <div className="np-row"><strong>Focus</strong><span>Games · Audio · Design</span></div>
            <div className="np-row"><strong>Events</strong><span>Game Jams · Hackathons</span></div>
          </motion.div>
        </div>
      </section>



      {/* LORE */}
      <section className="about-lore">
        <motion.div
          className="lore-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3>Our Myth — Overhyped, but true</h3>

          <p>
            Asurax started as three friends and one stubborn obsession: to make work that feels like home to lonely players,
            and like a spark to creators. We ran late-night hackathons in cramped rooms with ramen and bad coffee,
            then turned prototypes into playable worlds. We don't chase trends — we remix them into stories people remember.
          </p>

          <div className="lore-features">
            <div className="feature">
              <Zap className="feat-ico" />
              <strong>Quick Rituals</strong>
              <div className="feat-sub">48-hour game jams that breed wild prototypes</div>
            </div>

            <div className="feature">
              <Globe className="feat-ico" />
              <strong>Community</strong>
              <div className="feat-sub">Open streams, workshops and asset swaps</div>
            </div>

            <div className="feature">
              <Smartphone className="feat-ico" />
              <strong>Cross-Platform</strong>
              <div className="feat-sub">Playables for web, mobile, and native builds</div>
            </div>
          </div>
        </motion.div>
      </section>



      {/* FOUNDERS */}
      <section id="founders" className="about-founders">
        <div className="section-head">
          <h3>Founders</h3>
          <p className="muted">Three makers with different superpowers — one shared obsession.</p>
        </div>

        <div className="founder-grid">
          <FounderCard
            name="SHIVENDRA MISHRA"
            title="Founder — Lead Game Designer"
            glow="rgba(162,76,255,0.14)"
            desc="Game designer, B.Tech (Cyber Security), sound engineer and full-stack creative. Shivendra crafts systems that tell stories through mechanics and audio."
          />

          <FounderCard
            name="PUNEET DWIVEDI"
            title="Co-Founder — Audio & Video"
            glow="rgba(75,215,255,0.12)"
            desc="Video editor and music composer. Puneet masters atmospheres — from score to mix-down — making every scene sing."
          />

          <FounderCard
            name="PRACHI AMODE"
            title="Co-Founder — Product & Visuals"
            glow="rgba(196,164,106,0.12)"
            desc="Web & product designer, illustrator and visual system builder. Prachi brings clarity and character to interface and art direction."
          />
        </div>
      </section>



      {/* NEW – ACHIEVEMENTS */}
      <AchievementsSection />

      {/* NEW – SKILLS */}
      <SkillsSection />



      {/* VISION */}
      <section className="about-vision" ref={ref}>
        <div className="vision-grid">
          <VisionCard title="Game Jams" text="Monthly internal jams where wild ideas are tried, broken, rebuilt — winners get funding & mentorship." />
          <VisionCard title="Hackathons" text="Cybersec + dev + art hack nights producing playable demos in 48 hours." />
          <VisionCard title="Community Nights" text="Open streams, playtests, post-mortems — we learn loud and share tools." />
        </div>
      </section>



      {/* CTA */}
      <section className="about-cta">
        <div className="cta-inner">
          <h3>Ready to collaborate?</h3>

          <p className="muted">
            We take on ambitious collabs, jams and small-scale AAA prototypes.
          </p>

          <div className="cta-actions">
            <a className="cta-primary" href="mailto:contact@asurax.studio">Work with us</a>
            <a className="cta-ghost" href="/gaming">Explore games</a>
          </div>
        </div>
      </section>
    </div>
  );
}



/* ----------------------------------------
   SUB COMPONENTS
----------------------------------------- */

function FounderCard({ name, title, desc, glow }) {
  return (
    <motion.div
      className="founder-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="founder-media" style={{ boxShadow: `0 20px 60px ${glow}` }}>
        <div className="founder-avatar">
          {name.split(" ").map(n => n[0]).join("")}
        </div>
      </div>

      <div className="founder-meta">
        <h4 className="founder-name">{name}</h4>
        <div className="founder-title">{title}</div>
        <p className="founder-desc">{desc}</p>
      </div>
    </motion.div>
  );
}


function VisionCard({ title, text }) {
  return (
    <motion.div
      className="vision-card"
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 16, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h4>{title}</h4>
      <p>{text}</p>
    </motion.div>
  );
}
