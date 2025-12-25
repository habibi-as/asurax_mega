export default function Card({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-xl p-6 backdrop-blur-md ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(12,8,20,0.55), rgba(7,5,14,0.7))',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 24px 60px rgba(75,215,255,0.15)'
      }}
    >
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#A24CFF]/15 via-[#4BD7FF]/10 to-transparent blur-xl" />
      <div className="relative">{children}</div>
    </div>
  )
}