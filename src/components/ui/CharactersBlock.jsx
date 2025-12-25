import { motion } from 'framer-motion';
import './gaming-blocks.css';

export default function CharactersBlock({ characters = [], title = "Characters" }) {
  if (!characters || characters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="characters-block empty"
      >
        <h3 className="characters-block-title">{title}</h3>
        <p>No characters available yet. Add character information to display them here.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="characters-block"
    >
      <h3 className="characters-block-title">{title}</h3>
      <div className="characters-block-grid">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="characters-block-card"
          >
            <h4 className="characters-block-name">
              {character.name || `Character ${index + 1}`}
            </h4>
            {character.role && (
              <span className="characters-block-role">{character.role}</span>
            )}
            {character.description && (
              <p className="characters-block-description">{character.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

