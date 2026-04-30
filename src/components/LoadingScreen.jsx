import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 4000
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const progressTimer = setInterval(() => {
      currentStep++
      const newProg = Math.min(100, Math.floor((currentStep / steps) * 100))
      setProgress(newProg)
      if (currentStep >= steps) {
        clearInterval(progressTimer)
      }
    }, interval)

    const fadeTimer = setTimeout(() => {
      setOpacity(0)
    }, 4800)

    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 5800)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#070707', // Dark mode background
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 1s ease-in-out',
      pointerEvents: opacity === 0 ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          {/* Top Hexagon (Copper Tint) */}
          <path d="M 100 30 L 115 40 L 115 60 L 100 70 L 85 60 L 85 40 Z" 
                pathLength="1" fill="none" stroke="rgba(212, 115, 85, 0.8)" strokeWidth="1.5" className="hex hex-1" />
          
          {/* Middle Cluster */}
          <path d="M 80 60 L 95 70 L 95 90 L 80 100 L 65 90 L 65 70 Z" 
                pathLength="1" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="hex hex-2" />
          <path d="M 120 60 L 135 70 L 135 90 L 120 100 L 105 90 L 105 70 Z" 
                pathLength="1" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="hex hex-3" />
          
          {/* Bottom Organic Honey Drips */}
          {/* Left Drip */}
          <path d="M 65 90 C 65 110 60 125 70 130 C 80 135 85 120 85 100" 
                pathLength="1" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="drip drip-1" />
          
          {/* Center Main Drip (with bubble) */}
          <path d="M 100 70 C 100 110 105 130 115 135 C 125 140 135 130 135 110" 
                pathLength="1" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.8" className="drip drip-2" />
          <circle cx="118" cy="118" r="4" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" className="bubble" />
          <circle cx="112" cy="128" r="2" fill="#D4AF37" className="bubble-dot" />
          
          {/* Right Drip */}
          <path d="M 135 90 C 135 110 145 125 135 130 C 125 135 125 120 125 100" 
                pathLength="1" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" className="drip drip-3" />
        </svg>

        {/* Serif Text Centered Under Logo */}
        <div className="brand-text" style={{
          marginTop: '-20px',
          fontFamily: '"Lora", "Georgia", serif',
          fontSize: '2.4rem',
          color: '#fff',
          letterSpacing: '-0.01em',
          pointerEvents: 'none'
        }}>
          Frame.Hive
        </div>
      </div>

      <div className="loader-box" style={{ marginTop: '30px', width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'rgba(212, 175, 55, 0.8)', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ marginTop: '15px', fontFamily: 'serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
          {progress}%
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500&display=swap');

        .hex {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLine 1.8s ease forwards;
        }
        .hex-1 { animation-delay: 0.1s; }
        .hex-2 { animation-delay: 0.4s; }
        .hex-3 { animation-delay: 0.4s; }

        .drip {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLine 2s ease-out forwards;
        }
        .drip-1 { animation-delay: 0.8s; }
        .drip-2 { animation-delay: 1.1s; }
        .drip-3 { animation-delay: 1.3s; }

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        .bubble {
          opacity: 0;
          transform: scale(0);
          transform-origin: 118px 118px;
          animation: popBubble 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.2s forwards;
        }

        .bubble-dot {
          opacity: 0;
          transform: translateY(-5px);
          animation: dripAnim 2s ease 2.8s infinite;
        }

        @keyframes popBubble {
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes dripAnim {
          0% { opacity: 0; transform: translateY(-5px); }
          50% { opacity: 1; transform: translateY(15px); }
          100% { opacity: 0; transform: translateY(30px); }
        }

        .brand-text {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInText 1s ease 2.5s forwards;
        }

        @keyframes fadeInText {
          to { opacity: 1; transform: translateY(0); }
        }

        .loader-box {
          opacity: 0;
          animation: fadeInLoader 1s ease 3s forwards;
        }

        @keyframes fadeInLoader {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
