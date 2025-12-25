import { motion } from 'framer-motion'

const palettes = {
  cyan: { border: '#22d3ee', bg: 'rgba(255,255,255,0.06)', text: '#ffffff', glow: 'rgba(34,211,238,0.35)' },
  purple: { border: '#A24CFF', bg: 'rgba(255,255,255,0.06)', text: '#ffffff', glow: 'rgba(162,76,255,0.35)' },
  gold: { border: '#C4A46A', bg: 'rgba(255,255,255,0.06)', text: '#0B0B0B', glow: 'rgba(196,164,106,0.35)' },
  white: { border: '#e5e7eb', bg: 'rgba(255,255,255,0.10)', text: '#111827', glow: 'rgba(255,255,255,0.30)' }
}

export default function NeonButton({ children, href, onClick, variant = 'cyan', className = '' }) {
  const p = palettes[variant] || palettes.cyan
  const common = {
    border: `1px solid ${p.border}`,
    background: p.bg,
    color: p.text,
    boxShadow: `0 12px 34px ${p.glow}`
  }
  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center px-5 py-2 rounded-md ${className}`}
      style={common}
    >
      {children}
    </motion.span>
  )
  if (href) {
    return (
      <a href={href} onClick={onClick} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }
  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick} className={`px-5 py-2 rounded-md ${className}`} style={common}>
      {children}
    </motion.button>
  )
}