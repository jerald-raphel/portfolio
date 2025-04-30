"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

export default function CanvasReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!canvasRef.current || !ref.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = (canvas.width = ref.current.offsetWidth)
    const height = (canvas.height = ref.current.offsetHeight)

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    // Set initial state
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(0, 0, width, height)

    // Animation variables
    const particleCount = 100
    const particles: { x: number; y: number; radius: number; vx: number; vy: number }[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
      })
    }

    // Animation function
    let animationFrame: number
    let progress = 0
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw reveal effect
      if (progress < width + height) {
        progress += 15

        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(width, 0)
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.lineTo(0, 0)

        // Create diagonal reveal
        ctx.moveTo(0, 0)
        ctx.lineTo(progress, 0)
        ctx.lineTo(0, progress)
        ctx.lineTo(0, 0)

        ctx.moveTo(width, height)
        ctx.lineTo(width - progress, height)
        ctx.lineTo(width, height - progress)
        ctx.lineTo(width, height)

        ctx.fill("evenodd")
      }

      // Draw particles
      ctx.fillStyle = gradient
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1
      })

      if (progress < width + height + 100) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Fade out canvas when animation completes
        canvas.style.opacity = "0"
        setTimeout(() => {
          if (canvas.parentNode) {
            canvas.style.display = "none"
          }
        }, 500)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: 1 }}
      />
      <div className="relative z-0">{children}</div>
    </motion.div>
  )
}

