import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gaming-about-section"
      style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        color: '#EAF6FF',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* Name & Identity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px', textAlign: 'center' }}
      >
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#EAF6FF',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(76, 201, 240, 0.55)'
        }}>
          Shivendra (Habibi)
        </h1>
        <div style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          color: '#67E8F9',
          fontStyle: 'italic'
        }}>
          B.Tech Cyber Security • Game Designer • Script Writer • Character Designer • Narrative Designer • Market Analyst • Production Strategy Specialist • Gameplay Systems Designer
        </div>
      </motion.div>

      {/* Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          marginBottom: '40px',
          padding: '30px',
          background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.08) 0%, rgba(30, 58, 138, 0.12) 100%)',
          border: '2px solid rgba(76, 201, 240, 0.35)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 40px rgba(76, 201, 240, 0.25)'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 600,
          color: '#4CC9F0',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 15px rgba(76, 201, 240, 0.45)'
        }}>
          Philosophy
        </h2>
        <div style={{ lineHeight: '1.8', fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}>
          <p>"I build worlds where survival, emotion, and truth collide."</p>
          <p>"My focus is psychological tension, player agency, and cinematic experience."</p>
          <p>"I design games that challenge players to face fear, consequence, and hope."</p>
          <p>"Every mechanic serves the narrative; every choice has weight."</p>
          <p>"I create experiences that linger long after the screen fades to black."</p>
          <p>"Games are not just entertainment—they are vessels for human stories."</p>
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: '40px' }}
      >
        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 600,
          color: '#4CC9F0',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 15px rgba(76, 201, 240, 0.45)'
        }}>
          Skills & Expertise
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* Game Design Skills */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.08) 0%, rgba(30, 58, 138, 0.12) 100%)',
            border: '2px solid rgba(76, 201, 240, 0.35)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#EAF6FF',
              marginBottom: '15px'
            }}>
              Game Design Skills
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
              <li>• GDD creation</li>
              <li>• Worldbuilding</li>
              <li>• Character arcs</li>
              <li>• Narrative branching</li>
              <li>• Gameplay loops</li>
              <li>• Economy design</li>
              <li>• Combat system blueprinting</li>
              <li>• Level progression design</li>
            </ul>
          </div>

          {/* Production / Business Skills */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.08) 0%, rgba(30, 58, 138, 0.12) 100%)',
            border: '2px solid rgba(76, 201, 240, 0.35)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#EAF6FF',
              marginBottom: '15px'
            }}>
              Production / Business Skills
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
              <li>• Release strategies</li>
              <li>• Community building</li>
              <li>• Market research</li>
              <li>• Pricing models</li>
              <li>• Retention systems</li>
              <li>• Monetization planning</li>
            </ul>
          </div>

          {/* Tools */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(234, 221, 200, 0.1) 0%, rgba(139, 94, 60, 0.05) 100%)',
            border: '2px solid rgba(196, 164, 106, 0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#F7F2E4',
              marginBottom: '15px'
            }}>
              Tools
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
              <li>• Unity (basic design)</li>
              <li>• Figma / Miro</li>
              <li>• Notion</li>
              <li>• Trello / Jira</li>
              <li>• Photoshop / Krita (concept docs)</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* My Game Worlds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          padding: '30px',
          background: 'linear-gradient(135deg, rgba(234, 221, 200, 0.15) 0%, rgba(139, 94, 60, 0.1) 100%)',
          border: '2px solid rgba(196, 164, 106, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          marginTop: '40px'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 600,
          color: '#C4A46A',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          My Game Worlds
        </h2>
        <div style={{
          lineHeight: '1.8',
          fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
          textAlign: 'justify'
        }}>
          <p>
            ASURAX Studios creates worlds where humanity stands on the edge of survival, courage, and truth. 
            Each game is a carefully crafted narrative experience that challenges players to confront their fears, 
            make meaningful choices, and discover hope in the darkest moments. From the silent shores where signals 
            fade, to neon-lit futures where co-operation is survival, to medieval realms where honor is tested—every 
            world tells a story that resonates beyond the screen.
          </p>
          <p style={{ marginTop: '15px' }}>
            These are not just games—they are worlds waiting to be explored, stories waiting to be told, 
            and experiences that will leave an indelible mark on those who dare to enter.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

