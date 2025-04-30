"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Meteors({ number = 20 }: { number?: number }) {
  const [meteors, setMeteors] = useState<
    Array<{ id: number; size: number; duration: number; delay: number; x: number; y: number }>
  >([])

  useEffect(() => {
    const newMeteors = [...Array(number)].map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 30) + 10,
      duration: Math.floor(Math.random() * 5) + 5,
      delay: Math.random() * 10,
      x: Math.random() * 100,
      y: Math.random() * -100,
    }))

    setMeteors(newMeteors)
  }, [number])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute bg-gradient-to-b from-primary/40 to-transparent rounded-full pointer-events-none"
          style={{
            width: meteor.size,
            height: meteor.size * 10,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            boxShadow: `0 0 ${meteor.size / 5}px ${meteor.size / 10}px hsl(var(--primary)/30)`,
          }}
          animate={{
            x: `${meteor.x + 100}%`,
            y: `${meteor.y + 200}%`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 10 + 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

