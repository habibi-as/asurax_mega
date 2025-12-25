import { motion } from 'framer-motion';
import './gaming-blocks.css';

export default function FeaturesBlock({ features = [], title = "Gameplay Features" }) {
  if (!features || features.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="features-block empty"
      >
        <h3 className="features-block-title">{title}</h3>
        <p>No features available yet. Add gameplay features to display them here.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="features-block"
    >
      <h3 className="features-block-title">{title}</h3>
      <ul className="features-block-list">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="features-block-item"
          >
            <span className="features-block-bullet">▶</span>
            <span>{typeof feature === 'string' ? feature : feature.text || feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

