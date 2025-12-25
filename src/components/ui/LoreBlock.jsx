import { motion } from 'framer-motion';
import './gaming-blocks.css';

export default function LoreBlock({ story = "", title = "Lore & Story" }) {
  if (!story || story.trim() === '') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lore-block empty"
      >
        <h3 className="lore-block-title">{title}</h3>
        <p>No story/lore available yet. Add the game's story and world description here.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lore-block"
    >
      <h3 className="lore-block-title">{title}</h3>
      <div className="lore-block-content">
        {story.split('\n\n').map((paragraph, index) => (
          <p key={index} className="lore-block-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

