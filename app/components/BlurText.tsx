"use client"

import { useEffect, useRef, useState } from "react"

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  onAnimationComplete?: () => void
  stepDuration?: number
}

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current!)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDelay = (elements.length - 1) * delay + stepDuration * 1000
      const timer = setTimeout(onAnimationComplete, totalDelay)
      return () => clearTimeout(timer)
    }
  }, [inView, elements.length, delay, stepDuration, onAnimationComplete])

  return (
    <p ref={ref} className={`${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <span
          key={index}
          className={`inline-block will-change-transform transition-all duration-700 ease-out ${
            inView ? "blur-text-animate" : "blur-text-initial"
          }`}
          style={{
            animationDelay: `${index * delay}ms`,
            animationDirection: direction === "top" ? "normal" : "reverse",
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}

      <style jsx>{`
        .blur-text-initial {
          filter: blur(10px);
          opacity: 0;
          transform: translateY(${direction === "top" ? "-50px" : "50px"});
        }

        .blur-text-animate {
          animation: blurTextReveal ${stepDuration}s ease-out forwards;
        }

        @keyframes blurTextReveal {
          0% {
            filter: blur(10px);
            opacity: 0;
            transform: translateY(${direction === "top" ? "-50px" : "50px"});
          }
          50% {
            filter: blur(5px);
            opacity: 0.5;
            transform: translateY(${direction === "top" ? "5px" : "-5px"});
          }
          100% {
            filter: blur(0px);
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </p>
  )
}

export default BlurText
