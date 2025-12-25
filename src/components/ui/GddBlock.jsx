import { motion } from 'framer-motion';
import DocumentButton from '../DocumentButton.jsx';
import './gaming-blocks.css';

export default function GddBlock({ gddFiles = [], gameTitle = "Game" }) {
  if (!gddFiles || gddFiles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="gdd-block empty"
      >
        <h3 className="gdd-block-title">Game Design Documents</h3>
        <p>No GDD documents available yet. Add PDF links to display them here.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="gdd-block"
    >
      <h3 className="gdd-block-title">Game Design Documents</h3>
      <div className="gdd-block-list">
        {gddFiles.map((file, index) => {
          const fileName = typeof file === 'string' ? file.split('/').pop() : file.name || `GDD Document ${index + 1}`;
          const fileUrl = typeof file === 'string' ? file : file.url;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="gdd-block-item"
            >
              <DocumentButton link={fileUrl}>
                📜 {fileName}
              </DocumentButton>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

