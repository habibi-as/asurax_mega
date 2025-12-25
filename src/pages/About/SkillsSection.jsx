// src/pages/About/SkillsSection.jsx
import { motion } from "framer-motion";
import { Shield, Code, Palette, Gamepad2, Brain, Users, Cpu, Layers, Database, Smartphone, Globe, Zap } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    {
      title: "Cyber Security",
      icon: Shield,
      color: "linear-gradient(90deg, #34d399, #059669)",
      skills: [
        { name: "Network Security", level: 90 },
        { name: "Vulnerability Assessment", level: 85 },
        { name: "Threat Analysis", level: 80 },
        { name: "Penetration Testing", level: 75 },
      ],
    },
    {
      title: "Web Development",
      icon: Code,
      color: "linear-gradient(90deg, #3b82f6, #06b6d4)",
      skills: [
        { name: "React", level: 95 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 90 },
      ],
    },
    {
      title: "Game Design",
      icon: Gamepad2,
      color: "linear-gradient(90deg, #a855f7, #ec4899)",
      skills: [
        { name: "Unity", level: 85 },
        { name: "Blender", level: 80 },
        { name: "C#", level: 90 },
        { name: "Game Mechanics", level: 85 },
      ],
    },
    {
      title: "AI / Machine Learning",
      icon: Brain,
      color: "linear-gradient(90deg, #f43f5e, #fb7185)",
      skills: [
        { name: "Python", level: 90 },
        { name: "TensorFlow", level: 80 },
        { name: "Neural Networks", level: 75 },
        { name: "Machine Learning", level: 85 },
      ],
    },
  ];

  return (
    <section className="skills-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="skills-title"
      >
        Skills & Expertise
      </motion.h2>

      <div className="skills-grid">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={i}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="skill-card-head" style={{ background: cat.color }}>
                <Icon size={26} color="#fff" />
                <h3>{cat.title}</h3>
              </div>

              <div className="skill-card-body">
                {cat.skills.map((s, idx) => (
                  <div key={idx} className="skill-line">
                    <div className="skill-label">
                      {s.name} <span>{s.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
