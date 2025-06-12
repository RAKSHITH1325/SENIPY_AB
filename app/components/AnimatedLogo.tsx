"use client"

import { useEffect, useRef } from "react"

export function AnimatedLogo() {
  const logoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const initializeAnimations = () => {
      // Initialize path animation
      if (pathRef.current) {
        const path = pathRef.current
        const pathLength = path.getTotalLength()

        // Set up the stroke dash array and offset
        path.style.strokeDasharray = `${pathLength}`
        path.style.strokeDashoffset = `${pathLength}`

        // Start the animation
        path.style.animation = `drawPath 6s ease-in-out infinite alternate`
      }

      // Initialize logo floating animation
      if (logoRef.current) {
        logoRef.current.style.animation = `logoFloat 3s ease-in-out infinite alternate, logoGlow 4s ease-in-out infinite alternate`
      }
    }

    // Delay to ensure DOM is ready
    const timer = setTimeout(initializeAnimations, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Background SVG Path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 220 70"
        style={{ width: "220px", height: "70px" }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
            <stop offset="25%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="75%" stopColor="rgba(16, 185, 129, 0.6)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M15,35 Q60,20 110,35 Q160,50 205,35"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
          filter="url(#glow)"
        />
      </svg>

      {/* Animated SENIPY Text */}
      <div
        ref={logoRef}
        className="relative z-10 text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-110 select-none"
        style={{
          background: "linear-gradient(45deg, #ffffff 0%, #a855f7 25%, #ec4899 50%, #3b82f6 75%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundSize: "200% 200%",
        }}
      >
        SENIPY
      </div>

      <style jsx>{`
        @keyframes logoFloat {
          0% { 
            transform: translateY(-8px); 
          }
          100% { 
            transform: translateY(8px); 
          }
        }
        
        @keyframes logoGlow {
          0% { 
            text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
            background-position: 0% 50%;
          }
          50% {
            text-shadow: 0 0 25px rgba(168, 85, 247, 0.9), 0 0 35px rgba(236, 72, 153, 0.7);
            background-position: 100% 50%;
          }
          100% { 
            text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
            background-position: 0% 50%;
          }
        }
        
        @keyframes drawPath {
          0% { 
            stroke-dashoffset: ${pathRef.current?.getTotalLength() || 400}; 
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% { 
            stroke-dashoffset: 0; 
            opacity: 0.8;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          div[ref] {
            animation: none !important;
          }
          path[ref] {
            animation: none !important;
            stroke-dasharray: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
