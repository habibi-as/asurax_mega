import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'

function WavePlane() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const geom = ref.current.geometry
    const pos = geom.attributes.position
    const arr = pos.array
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]
      const y = arr[i + 1]
      arr[i + 1] = Math.sin(x * 1.4 + t * 1.2) * 0.15 + Math.cos(t * 0.6 + y * 0.5) * 0.05
    }
    pos.needsUpdate = true
  })
  return (
    <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref} position={[0, 0.6, -2]}>
        <planeGeometry args={[8, 1.2, 128, 16]} />
        <meshStandardMaterial color="#0f1e2a" emissive="#7fb3ff" emissiveIntensity={1.2} transparent opacity={0.85} />
      </mesh>
    </Float>
  )
}

export default function AshoreSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[80vh] md:min-h-screen overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(12,22,30,0.9) 0%, rgba(5,10,15,1) 60%), repeating-linear-gradient(90deg, rgba(200,220,255,0.03) 0px, rgba(200,220,255,0.03) 1px, transparent 2px, transparent 4px)'
        }}
      />
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.35, 0.2], y: [12, -12, 8] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(120,170,220,0.08) 0%, transparent 35%), radial-gradient(ellipse at 70% 80%, rgba(120,170,220,0.08) 0%, transparent 35%)'
        }}
      />

      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 9], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.35} color="#0b1722" />
        <pointLight position={[6, 6, 6]} intensity={1.0} color="#7fb3ff" />
        <WavePlane />
      </Canvas>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-wide text-blue-100 filter drop-shadow-[0_0_10px_rgba(127,179,255,0.6)]"
        >
          ASHORE: THE LAST SIGNAL
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2 text-blue-50/90 text-base md:text-lg"
        >
          Hope drifts… even when the ocean doesn’t.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-3 max-w-3xl text-gray-200/90 text-sm md:text-base"
        >
          A 1970s survival experience set on a silent shoreline, where a lone survivor searches for a final radio signal while storms, hunger, and the sea close in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="px-5 py-2 rounded-md bg-black/60 border border-blue-400 text-blue-100 hover:bg-blue-500/20 shadow-lg shadow-blue-400/25">
            Concept Art
          </button>
          <button className="px-5 py-2 rounded-md bg-black/60 border border-blue-400 text-blue-100 hover:bg-blue-500/20 shadow-lg shadow-blue-400/25">
            Atmosphere Clip
          </button>
          <a
            href="https://drive.google.com/file/d/1EPuJXPhxIRWyOHL7YhIC1AN8EXnvMICF/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-md bg-black/60 border border-blue-400 text-blue-100 hover:bg-blue-500/20 shadow-lg shadow-blue-400/25"
          >
            Open GDD
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}