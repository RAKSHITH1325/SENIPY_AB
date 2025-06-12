"use client"

import type React from "react"

import { useRef } from "react"

// Since we can't install GSAP in Next.js, I'll create a simplified version using CSS animations
export const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 1,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  const demo = [
    {
      image: "/images/team-member-1.jpeg",
      title: "Alex Rivera",
      subtitle: "Lead Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "AI Specialist",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      subtitle: "UX Designer",
      handle: "@morganblake",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://dribbble.com/",
    },
  ]

  const data = items?.length ? items : demo

  const handleMove = (e: React.MouseEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return

    const x = e.clientX - r.left
    const y = e.clientY - r.top

    if (rootRef.current) {
      rootRef.current.style.setProperty("--x", `${x}px`)
      rootRef.current.style.setProperty("--y", `${y}px`)
    }

    if (fadeRef.current) {
      fadeRef.current.style.opacity = "0"
    }
  }

  const handleLeave = () => {
    if (fadeRef.current) {
      fadeRef.current.style.opacity = "1"
    }
  }

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const handleCardMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              "--card-gradient": c.gradient,
              cursor: c.url ? "pointer" : "default",
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            <img src={c.image || "/placeholder.svg"} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />

      <style jsx>{`
        .chroma-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(var(--cols), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
          gap: 2rem;
          width: 100%;
          height: 100%;
          padding: 2rem;
          overflow: hidden;
        }

        .chroma-card {
          position: relative;
          background: var(--card-gradient);
          border: 2px solid var(--card-border);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .chroma-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .chroma-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .chroma-card:hover::before {
          opacity: 1;
        }

        .chroma-img-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid var(--card-border);
        }

        .chroma-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chroma-info {
          text-align: center;
          color: white;
        }

        .chroma-info .name {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0 0 0.5rem 0;
        }

        .chroma-info .handle {
          font-size: 0.875rem;
          color: var(--card-border);
          display: block;
          margin-bottom: 0.5rem;
        }

        .chroma-info .role {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .chroma-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle var(--r) at var(--x) var(--y),
            transparent 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .chroma-grid:hover .chroma-overlay {
          opacity: 1;
        }

        .chroma-fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          pointer-events: none;
          transition: opacity 0.6s ease;
        }

        @media (max-width: 768px) {
          .chroma-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
            gap: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ChromaGrid
