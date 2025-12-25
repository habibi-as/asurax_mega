import { Canvas } from '@react-three/fiber'
import { Center, Float, Text3D } from '@react-three/drei'
import { motion } from 'framer-motion'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json?url'

export default function FearAroundSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[80vh] md:min-h-screen overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0.2, y: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.25], y: [-10, 10, -5] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(20,20,20,0.8) 0%, rgba(0,0,0,1) 60%), repeating-linear-gradient(120deg, rgba(255,0,32,0.04) 0px, rgba(255,0,32,0.04) 2px, transparent 3px, transparent 6px)'
        }}
      />
      <motion.div
        initial={{ opacity: 0.15, y: 0 }}
        animate={{ opacity: [0.15, 0.3, 0.2], y: [10, -10, 5] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(255,0,64,0.06) 0%, transparent 35%), radial-gradient(ellipse at 70% 80%, rgba(255,0,64,0.06) 0%, transparent 35%)'
        }}
      />

      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 9], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} color="#111111" />
        <pointLight position={[6, 6, 6]} intensity={1.2} color="#ff0022" />

        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6}>
          <mesh position={[0, 0.5, -2]}>
            <torusGeometry args={[3.5, 0.08, 32, 100]} />
            <meshStandardMaterial color="#330000" emissive="#ff0022" emissiveIntensity={1.7} />
          </mesh>
        </Float>

        <Center position={[0, 0.5, 0]}>
          <Text3D font={helvetiker} size={0.9} height={0.08} bevelEnabled bevelSize={0.006} bevelThickness={0.006}>
            FEAR AROUND
            <meshStandardMaterial color="#ffffff" emissive="#ff0022" emissiveIntensity={2.8} />
          </Text3D>
        </Center>
      </Canvas>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-red-200/90 text-base md:text-lg"
        >
          In the dark, evolution is the enemy.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-3 max-w-3xl text-gray-300/90 text-sm md:text-base"
        >
          An open-world survival horror where creatures evolve based on player behavior—learning, mutating, and hunting smarter every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="px-5 py-2 rounded-md bg-black/60 border border-red-600 text-red-200 hover:bg-red-600/20 shadow-lg shadow-red-600/30">
            Posters
          </button>
          <button className="px-5 py-2 rounded-md bg-black/60 border border-red-600 text-red-200 hover:bg-red-600/20 shadow-lg shadow-red-600/30">
            Trailer
          </button>
          <a
            href="https://drive.google.com/file/d/1bux1NR5ruGjemXVUySnBenui5eMm_c5N/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-md bg-black/60 border border-red-600 text-red-200 hover:bg-red-600/20 shadow-lg shadow-red-600/30"
          >
            Open GDD
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}