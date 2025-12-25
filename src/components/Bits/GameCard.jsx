import { motion } from 'framer-motion'
import NeonButton from './NeonButton.jsx'

export default function GameCard({ title, tagline, genre, theme = '#4BD7FF', poster, links = {} }) {
  const border = `${theme}`
  const glow = `${theme}33`
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(10,8,20,0.9), rgba(5,3,12,0.95))', border: `1px solid ${border}`, boxShadow: `0 18px 60px ${glow}` }}
    >
      <div className="aspect-[16/9] w-full">
        {poster ? (
          <img src={poster} alt={`${title} poster`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: `radial-gradient(600px circle at 20% 20%, ${theme}22 0%, #0a0a12 50%, #07070d 100%)` }} />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-slate-100 font-semibold text-[clamp(1rem,2.6vw,1.4rem)]">{title}</div>
          <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${theme}22`, color: '#e7e2f9', border: `1px solid ${theme}66` }}>{genre}</span>
        </div>
        <div className="mt-2 text-slate-300/90">{tagline}</div>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.details && <NeonButton href={links.details} variant={theme === '#A24CFF' ? 'purple' : theme === '#C4A46A' ? 'gold' : 'cyan'}>View Details</NeonButton>}
          {links.trailer && <NeonButton href={links.trailer} variant={theme === '#A24CFF' ? 'purple' : theme === '#C4A46A' ? 'gold' : 'cyan'}>Trailer</NeonButton>}
          {links.gdd && <NeonButton href={links.gdd} variant={theme === '#A24CFF' ? 'purple' : theme === '#C4A46A' ? 'gold' : 'cyan'}>Open GDD</NeonButton>}
        </div>
      </div>
    </motion.div>
  )
}