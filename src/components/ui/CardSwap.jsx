import { motion } from 'framer-motion';
import './CardSwap.css';

export default function CardSwap({ items, active, onSelect }) {
  const getItemTheme = (itemId) => {
    if (itemId === "red-one") return "cyberpunk";
    if (itemId === "the-last-signal") return "ashore";
    if (itemId === "oath-hunt") return "oath";
    if (itemId === "seventh-choir") return "choir";
    if (itemId === "fear-around") return "fear";
    return "parchment";
  };

  return (
    <div className="card-swap-container">
      {items.map((item, index) => {
        const isActive = active === item.id;
        const itemTheme = getItemTheme(item.id);
        return (
          <motion.div
            key={item.id}
            className={`card-swap-item ${isActive ? 'active' : ''} card-theme-${itemTheme}`}
            onClick={() => onSelect(item.id)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              zIndex: isActive ? 10 : 1
            }}
            transition={{
              scale: { duration: 0.2 },
              y: { duration: 0.2 }
            }}
          >
            <div className="card-swap-inner">
              <span className="card-swap-label">{item.label}</span>
              {isActive && <div className="card-swap-indicator" />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

