import { motion } from 'framer-motion'

export default function TeamCard({ name, role, lines = [], glow = '#A24CFF' }) {
  const shadow = `0 22px 60px ${glow}33`
  return (
    <motion.div
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      className="relative rounded-xl p-6 backdrop-blur-md"
      style={{
        background: 'linear-gradient(180deg, rgba(12,8,20,0.55), rgba(7,5,14,0.7))',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: shadow
      }}
    >
      <div className="absolute -inset-2 rounded-2xl blur-2xl" style={{ background: `linear-gradient(135deg, ${glow}33, transparent)` }} />
      <div className="relative">
        <div className="text-xs tracking-wider" style={{ color: glow }}>{role}</div>
        <div className="mt-1 text-[clamp(1rem,2.5vw,1.4rem)] font-semibold text-slate-100">{name}</div>
        <div className="mt-4 space-y-1 text-slate-300/90">
          {lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}