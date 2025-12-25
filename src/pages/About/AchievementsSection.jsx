// src/pages/About/AchievementsSection.jsx
import { motion } from "framer-motion";
import { Trophy, Brain, Code, Star, Shield, Gamepad2, Zap, Target } from "lucide-react";

export default function AchievementsSection() {
  const achievements = [
    {
      title: "Smart India Hackathon Leadership",
      description:
        "Led a team in the prestigious Smart India Hackathon, demonstrating exceptional leadership and technical expertise.",
      icon: Trophy,
      color: "linear-gradient(90deg, #facc15, #f97316)",
      year: "2024",
      category: "Leadership",
      details: [
        "Team lead for national-level hackathon",
        "Managed 5+ team members",
        "Delivered innovative solution on time",
        "Received recognition for leadership",
      ],
    },
    {
      title: "Vortex AI Memory System",
      description:
        "Built an experimental AI project with layered memory architecture for predictive capabilities.",
      icon: Brain,
      color: "linear-gradient(90deg, #a855f7, #ec4899)",
      year: "2024",
      category: "AI Innovation",
      details: [
        "Developed advanced memory architecture",
        "Implemented predictive algorithms",
        "Created experimental AI system",
        "Pioneered new AI techniques",
      ],
    },
    {
      title: "Real AI Model Development",
      description:
        "Successfully built and deployed a production-grade AI model demonstrating ML proficiency.",
      icon: Code,
      color: "linear-gradient(90deg, #4ade80, #60a5fa)",
      year: "2024",
      category: "AI Development",
      details: [
        "Built production-ready AI model",
        "Implemented ML algorithms",
        "Deployed model successfully",
        "Achieved measurable results",
      ],
    },
    {
      title: "Major Graphics Design Projects",
      description:
        "Completed high-impact design projects including posters, UI/UX systems, and branding.",
      icon: Star,
      color: "linear-gradient(90deg, #fb7185, #f43f5e)",
      year: "2023-2024",
      category: "Design",
      details: [
        "Professional poster design",
        "Complete UI design systems",
        "Brand identity development",
        "High-quality creative work",
      ],
    },
    {
      title: "Cyber Security Expertise",
      description:
        "Developed strong cyber security skills including network security and threat analysis.",
      icon: Shield,
      color: "linear-gradient(90deg, #22d3ee, #3b82f6)",
      year: "2023-2024",
      category: "Security",
      details: [
        "Mastered network security",
        "Performed vulnerability assessments",
        "Conducted threat analysis",
        "Implemented security solutions",
      ],
    },
    {
      title: "Game Design Portfolio",
      description:
        "Created a deep game design portfolio including Unity, Blender and system mechanics.",
      icon: Gamepad2,
      color: "linear-gradient(90deg, #818cf8, #a855f7)",
      year: "2023-2024",
      category: "Game Development",
      details: [
        "Developed Unity games",
        "Created Blender 3D models",
        "Designed game mechanics",
        "Built complete prototypes",
      ],
    },
  ];

  return (
    <section className="achievements-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="achievements-title"
      >
        Achievements
      </motion.h2>

      <div className="achievements-grid">
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className="achievement-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="achievement-header" style={{ background: item.color }}>
                <div className="achievement-icon">
                  <Icon size={24} color="#fff" />
                </div>
                <div className="achievement-meta">
                  <div className="achievement-year">{item.year}</div>
                  <div className="achievement-category">{item.category}</div>
                </div>
              </div>

              <div className="achievement-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <ul className="achievement-details">
                  {item.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        className="achievements-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a href="#contact" className="achievements-cta-btn">
          <Target size={18} />
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
}
