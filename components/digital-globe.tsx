"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const TECH_LOGOS = [
  { name: "HTML", color: "#E34F26", position: [1, 0.5, 0.5] },
  { name: "CSS", color: "#1572B6", position: [-1, 0.3, 0.7] },
  { name: "React", color: "#61DAFB", position: [0.5, -1, 0.5] },
  { name: "JS", color: "#F7DF1E", position: [-0.5, -0.8, 0.8] },
  { name: "MongoDB", color: "#47A248", position: [0.8, 0.8, -0.5] },
  { name: "Express", color: "#000000", position: [-0.7, 0.7, -0.7] },
  { name: "Node", color: "#339933", position: [0.7, -0.7, -0.7] },
  { name: "React Native", color: "#61DAFB", position: [-0.5, -0.5, -1] },
]

export default function DigitalGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const logoRefs = useRef<THREE.Mesh[]>([])
  const frameId = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 2.5
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controlsRef.current = controls

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64)
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x333344,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.02, 64, 64)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6633aa,
      transparent: true,
      opacity: 0.1,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glow)

    // Add tech logos
    logoRefs.current = TECH_LOGOS.map((logo) => {
      const logoGeometry = new THREE.SphereGeometry(0.1, 32, 32)
      const logoMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(logo.color),
        transparent: true,
        opacity: 0.8,
      })
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial)

      // Position on globe surface
      logoMesh.position.set(...logo.position)
      logoMesh.userData = { name: logo.name, originalPosition: [...logo.position] }

      scene.add(logoMesh)
      return logoMesh
    })

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate)

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Animate logos
      logoRefs.current.forEach((logo, index) => {
        const time = Date.now() * 0.001 + index
        const originalPos = logo.userData.originalPosition

        // Make logos float slightly
        logo.position.x = originalPos[0] + Math.sin(time * 0.5) * 0.05
        logo.position.y = originalPos[1] + Math.cos(time * 0.7) * 0.05
        logo.position.z = originalPos[2] + Math.sin(time * 0.3) * 0.05
      })

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        rendererRef.current.setSize(width, height)
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current)
      }

      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {TECH_LOGOS.map((logo, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-bold bg-background/80 px-2 py-1 rounded-full shadow-lg"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, logo.position[0] * 100, logo.position[0] * 100, 0],
              y: [0, logo.position[1] * 100, logo.position[1] * 100, 0],
              z: [0, logo.position[2] * 10, logo.position[2] * 10, 0],
            }}
            transition={{
              duration: 8,
              delay: index * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: TECH_LOGOS.length * 1.5,
            }}
            style={{ color: logo.color }}
          >
            {logo.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

