"use client"

import { useEffect, useRef, useState } from "react"

interface OrbProps {
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const orb = orbRef.current
    if (!orb) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = orb.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      setMousePosition({ x: 0, y: 0 })
    }

    orb.addEventListener("mousemove", handleMouseMove)
    orb.addEventListener("mouseenter", handleMouseEnter)
    orb.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      orb.removeEventListener("mousemove", handleMouseMove)
      orb.removeEventListener("mouseenter", handleMouseEnter)
      orb.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const effectiveHover = forceHoverState || isHovered
  const distortionX = effectiveHover ? mousePosition.x * hoverIntensity * 20 : 0
  const distortionY = effectiveHover ? mousePosition.y * hoverIntensity * 20 : 0

  return (
    <div className="orb-container w-full h-full flex items-center justify-center">
      <div
        ref={orbRef}
        className="orb-main relative cursor-pointer"
        style={{
          width: "300px",
          height: "300px",
          transform: `translate(${distortionX}px, ${distortionY}px) ${rotateOnHover && effectiveHover ? "rotate(45deg)" : "rotate(0deg)"}`,
          transition: effectiveHover ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Main Orb */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                hsl(${hue + 280}, 80%, 70%) 0%,
                hsl(${hue + 200}, 70%, 60%) 30%,
                hsl(${hue + 240}, 90%, 40%) 70%,
                hsl(${hue + 260}, 60%, 20%) 100%
              )
            `,
            filter: `blur(${effectiveHover ? 2 : 0}px) brightness(${effectiveHover ? 1.2 : 1})`,
            transform: `scale(${effectiveHover ? 1.1 : 1})`,
            transition: "all 0.3s ease-out",
            animation: "orbPulse 4s ease-in-out infinite alternate",
          }}
        />

        {/* Inner Glow */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 40% 40%, 
                hsl(${hue + 300}, 90%, 80%) 0%,
                hsl(${hue + 220}, 80%, 70%) 40%,
                transparent 70%
              )
            `,
            opacity: effectiveHover ? 0.8 : 0.6,
            animation: "orbInnerGlow 3s ease-in-out infinite alternate",
          }}
        />

        {/* Outer Glow */}
        <div
          className="absolute -inset-8 rounded-full"
          style={{
            background: `
              radial-gradient(circle, 
                hsl(${hue + 280}, 70%, 60%) 0%,
                hsl(${hue + 240}, 60%, 50%) 30%,
                transparent 70%
              )
            `,
            opacity: effectiveHover ? 0.4 : 0.2,
            filter: "blur(20px)",
            animation: "orbOuterGlow 5s ease-in-out infinite alternate",
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `hsl(${hue + 200 + i * 20}, 80%, 70%)`,
              top: `${20 + Math.sin(i * 1.2) * 30}%`,
              left: `${20 + Math.cos(i * 1.2) * 30}%`,
              opacity: effectiveHover ? 0.8 : 0.4,
              animation: `orbParticle${i} ${3 + i * 0.5}s ease-in-out infinite alternate`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes orbPulse {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1.05) rotate(5deg); }
        }
        
        @keyframes orbInnerGlow {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.1); }
        }
        
        @keyframes orbOuterGlow {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(1.2); }
        }
        
        @keyframes orbParticle0 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(10px, -15px) scale(1.2); }
        }
        
        @keyframes orbParticle1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-8px, 12px) scale(0.8); }
        }
        
        @keyframes orbParticle2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(15px, 8px) scale(1.1); }
        }
        
        @keyframes orbParticle3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-12px, -10px) scale(0.9); }
        }
        
        @keyframes orbParticle4 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(8px, 18px) scale(1.3); }
        }
        
        @keyframes orbParticle5 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-15px, 5px) scale(0.7); }
        }
      `}</style>
    </div>
  )
}
