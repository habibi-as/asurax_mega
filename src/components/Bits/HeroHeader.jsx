export default function HeroHeader({ title, subtitle, accent = '#4BD7FF' }) {
  return (
    <div className="text-center px-6 py-20">
      <h1 className="text-[clamp(2rem,5.6vw,4rem)] font-semibold tracking-wide" style={{ color: '#E7E2F9', textShadow: `0 0 24px ${accent}55` }}>{title}</h1>
      {subtitle && (
        <p className="mt-3 text-[clamp(1rem,2.6vw,1.4rem)]" style={{ color: '#c6d7ff' }}>{subtitle}</p>
      )}
    </div>
  )
}