import { useState } from 'react'

export default function LogoMark({ src = '/assets/asurax-logo.png', size = 120 }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[0_0_24px_rgba(162,76,255,0.5)]">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#A24CFF" strokeWidth="2" />
        <path d="M50 20 L60 50 L50 80 L40 50 Z" fill="#A24CFF" opacity="0.8" />
      </svg>
    )
  }
  return (
    <img
      src={src}
      alt="Asurax Logo"
      width={size}
      height={size}
      onError={() => setError(true)}
      className="select-none"
      style={{ filter: 'drop-shadow(0 0 22px rgba(75,215,255,0.45))', opacity: 0.9 }}
    />
  )
}