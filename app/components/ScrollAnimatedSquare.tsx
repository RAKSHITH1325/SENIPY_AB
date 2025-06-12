"use client"

import { useEffect, useRef, useState } from "react"

export function ScrollAnimatedSquare() {
  const squareRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const square = squareRef.current
    const container = containerRef.current
    if (!square || !container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="scroll-container w-full h-96 flex items-center justify-center bg-slate-800/30 rounded-lg my-8"
    >
      <div
        ref={squareRef}
        className={`square w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg transition-all duration-2000 ease-in-out ${
          isVisible
            ? "transform translate-x-60 rotate-[360deg] scale-110"
            : "transform translate-x-0 rotate-0 scale-100"
        }`}
        style={{
          animation: isVisible ? "squareAnimation 2s ease-in-out infinite alternate" : "none",
        }}
      />

      <style jsx>{`
        @keyframes squareAnimation {
          0% { 
            transform: translateX(15rem) rotate(360deg) scale(1);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          100% { 
            transform: translateX(15rem) rotate(720deg) scale(1.2);
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
          }
        }
      `}</style>
    </div>
  )
}
