import ThemedWrapper from '../../../components/ui/ThemedWrapper.jsx';
import CinematicHeader from '../../../components/ui/CinematicHeader.jsx';
import TrailerBlock from '../../../components/ui/TrailerBlock.jsx';
import GddBlock from '../../../components/ui/GddBlock.jsx';
import ConceptBlock from '../../../components/ui/ConceptBlock.jsx';
import { loadLocalConceptMedia } from '../../../utils/autoLoader.js';
import LoreBlock from '../../../components/ui/LoreBlock.jsx';
import CharactersBlock from '../../../components/ui/CharactersBlock.jsx';
import FeaturesBlock from '../../../components/ui/FeaturesBlock.jsx';
import { games } from '../../../data/games.js';

const gameData = games["red-one"];
const themeName = "red-one";

export default function GameRedOne() {
  const conceptMedia = loadLocalConceptMedia(
    import.meta.glob('../../../assets/games/red01/concept_art/*.{jpg,jpeg,png,webp,mp4,webm,mov}', { eager: true })
  );
  return (
    <ThemedWrapper themeName={themeName}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <CinematicHeader
            title={gameData.title}
            subtitle={gameData.tagline}
            themeName={themeName}
          />

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '80px',
            padding: '60px 0'
          }}>
            <TrailerBlock 
              trailerUrl={gameData.trailer} 
              title="Trailer" 
              themeName={themeName}
            />
            
            <GddBlock 
              gddFiles={gameData.gdd} 
              gameTitle={gameData.title}
            />
            
            <section className="concept-art-section">
              <h2 className="subsection-title">Concept Art</h2>

              {conceptMedia.length === 0 ? (
                <p className="empty-text">No concept art available yet.</p>
              ) : (
                <div className="concept-art-grid">
                  {conceptMedia.map((item, idx) => (
                    item.type === 'image' ? (
                      <img
                        key={idx}
                        src={item.src}
                        alt={item.name}
                        className="concept-art-image"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        key={idx}
                        src={item.src}
                        className="concept-art-video"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    )
                  ))}
                </div>
              )}
            </section>
            
            <LoreBlock 
              story={gameData.story} 
              title="Lore & Story"
            />
            
            <CharactersBlock 
              characters={gameData.characters} 
              title="Characters"
            />
            
            <FeaturesBlock 
              features={gameData.features} 
              title="Gameplay Features"
            />
          </div>
        </div>
      </ThemedWrapper>
  );
}

