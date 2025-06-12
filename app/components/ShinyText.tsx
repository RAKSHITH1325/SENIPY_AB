"use client"

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }: ShinyTextProps) => {
  const animationDuration = `${speed}s`

  return (
    <div className={`shiny-text ${disabled ? "disabled" : ""} ${className}`} style={{ animationDuration }}>
      {text}
      <style jsx>{`
        .shiny-text {
          color: #b5b5b5a4;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0) 60%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          display: inline-block;
          animation: shine ${speed}s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: -100%;
          }
        }

        .shiny-text.disabled {
          animation: none;
        }

        .hero-shiny {
          color: #ffffff;
          background: linear-gradient(
            120deg,
            rgba(168, 85, 247, 0) 30%,
            rgba(236, 72, 153, 0.9) 50%,
            rgba(59, 130, 246, 0.8) 70%,
            rgba(168, 85, 247, 0) 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          font-weight: bold;
        }

        .feature-shiny {
          color: #e2e8f0;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(168, 85, 247, 0.6) 65%,
            rgba(255, 255, 255, 0) 80%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
        }

        .game-shiny {
          color: #fbbf24;
          background: linear-gradient(
            120deg,
            rgba(251, 191, 36, 0) 30%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(251, 191, 36, 0.8) 70%,
            rgba(251, 191, 36, 0) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
        }

        .footer-shiny {
          color: #94a3b8;
          background: linear-gradient(
            120deg,
            rgba(148, 163, 184, 0) 40%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(148, 163, 184, 0) 60%
          );
          background-size: 180% 100%;
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}

export default ShinyText
