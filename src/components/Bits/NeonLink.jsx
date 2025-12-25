export default function NeonLink({ children, href = '#', variant = 'cyan', className = '' }) {
  const colors = {
    cyan: { underline: '#22d3ee', glow: 'rgba(34,211,238,0.35)', text: '#E7E2F9' },
    gold: { underline: '#C4A46A', glow: 'rgba(196,164,106,0.35)', text: '#F8F1E5' },
    purple: { underline: '#A24CFF', glow: 'rgba(162,76,255,0.35)', text: '#E7E2F9' },
    white: { underline: '#e5e7eb', glow: 'rgba(255,255,255,0.30)', text: '#ffffff' }
  }
  const c = colors[variant] || colors.cyan
  return (
    <a href={href} className={`font-medium ${className}`} style={{ color: c.text, textDecorationColor: c.underline, textDecorationThickness: '2px', textDecorationLine: 'underline', textUnderlineOffset: '4px', filter: 'drop-shadow(0 0 12px ' + c.glow + ')' }}>
      {children}
    </a>
  )
}