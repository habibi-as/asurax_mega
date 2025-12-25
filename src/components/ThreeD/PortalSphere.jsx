// src/components/ThreeD/PortalSphere.jsx
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function PortalSphere({
  label = 'Realm',
  navigationTarget = '/',
  position = [0, 0, -3.4],
  color = '#0ea5ff',
  emissive = '#4BD7FF',
  size = 0.38,                 // now adjustable
  showLabelOnHover = true,
  showButtonOnHover = true,
  onActivate = null
}) {
  const ref = React.useRef()
  const hoverRef = React.useRef(false)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    // gentle float + rotation
    ref.current.position.y = position[1] + Math.sin(t * (0.6 + Math.abs(position[0]) * 0.02)) * 0.035
    ref.current.rotation.y = t * 0.18
    // slow pulse scale
    const pulse = 1 + Math.sin(t * 2 + (position[0] + position[1])) * 0.02
    ref.current.scale.setScalar(hoverRef.current ? 1.08 : pulse)
  })

  const [hover, setHover] = React.useState(false)

  const handleClick = () => {
    if (typeof onActivate === 'function') {
      onActivate()
    } else {
      window.location.href = navigationTarget
    }
  }

  return (
    <group ref={ref} position={position}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); hoverRef.current = true; setHover(true) }}
        onPointerOut={(e) => { e.stopPropagation(); hoverRef.current = false; setHover(false) }}
        onPointerDown={(e) => { e.stopPropagation(); handleClick() }}
      >
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.9} metalness={0.22} roughness={0.28} transparent opacity={0.96} />
      </mesh>

      {/* subtle outer ring */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[size * 1.26, size * 1.44, 64]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={hover ? 1.6 : 0.48} transparent opacity={0.22} side={2} />
      </mesh>

      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div style={{ transformStyle: 'preserve-3d' }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={hover ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.24 }} style={{ pointerEvents: 'auto', textAlign: 'center', minWidth: 120 }}>
            {showLabelOnHover && <div style={{ color: '#E7E2F9', fontWeight: 700, textShadow: '0 8px 28px rgba(0,0,0,0.55)' }}>{label}</div>}
            {showButtonOnHover && (
              <div style={{ marginTop: 8 }}>
                <button onPointerDown={(e) => { e.stopPropagation(); handleClick() }} style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${emissive}`, background: 'rgba(255,255,255,0.04)', color: '#E7E2F9', fontWeight: 600, cursor: 'pointer', boxShadow: `0 6px 18px ${emissive}22` }}>
                  Enter
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </Html>
    </group>
  )
}
