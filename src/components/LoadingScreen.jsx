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
    }, 4500)

    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 5500)

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
      backgroundColor: '#fff', // White background based on the new image
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 0.8s ease-in-out',
      pointerEvents: opacity === 0 ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          {/* Top Hexagon (Reddish) */}
          <path d="M 120 40 L 135 50 L 135 65 L 120 75 L 105 65 L 105 50 Z" 
                pathLength="1" fill="none" stroke="rgba(212, 115, 85, 0.4)" strokeWidth="1.2" className="hex hex-1" />
          
          {/* Middle Cluster */}
          <path d="M 100 60 L 115 70 L 115 85 L 100 95 L 85 85 L 85 70 Z" 
                pathLength="1" fill="none" stroke="rgba(100, 100, 100, 0.3)" strokeWidth="1.2" className="hex hex-2" />
          <path d="M 130 70 L 145 80 L 145 95 L 130 105 L 115 95 L 115 80 Z" 
                pathLength="1" fill="none" stroke="rgba(100, 100, 100, 0.3)" strokeWidth="1.2" className="hex hex-3" />
          
          {/* Organic Honey Drips */}
          {/* Left Drip */}
          <path d="M 85 85 C 85 105 80 115 85 120 C 90 125 95 115 95 105" 
                pathLength="1" fill="none" stroke="rgba(150, 150, 150, 0.4)" strokeWidth="1.2" className="drip drip-1" />
          
          {/* Center Main Drip (with bubble) */}
          <path d="M 100 95 C 100 125 105 145 115 150 C 125 155 135 145 135 125" 
                pathLength="1" fill="none" stroke="rgba(120, 130, 160, 0.5)" strokeWidth="1.5" className="drip drip-2" />
          <circle cx="118" cy="138" r="4" fill="none" stroke="rgba(120, 130, 160, 0.5)" strokeWidth="1" className="bubble" />
          <circle cx="112" cy="148" r="2" fill="rgba(120, 130, 160, 0.6)" className="bubble-dot" />
          
          {/* Right Drip */}
          <path d="M 145 95 C 145 115 155 135 145 140 C 135 145 135 125 135 105" 
                pathLength="1" fill="none" stroke="rgba(140, 150, 170, 0.4)" strokeWidth="1.2" className="drip drip-3" />
        </svg>

        {/* Serif Text Overlaid */}
        <div className="brand-overlay" style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          fontFamily: '"Lora", "Georgia", serif',
          fontSize: '2.8rem',
          color: 'rgba(50, 50, 50, 0.85)',
          letterSpacing: '-0.02em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          Frame.Hive
        </div>
      </div>

      <div className="loader-container" style={{ marginTop: '20px', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.05)', position: 'relative' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'rgba(50,50,50,0.4)', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ marginTop: '10px', fontFamily: 'serif', fontSize: '0.7rem', color: 'rgba(0,0,0,0.2)' }}>
          {progress}%
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500&display=swap');

        .hex {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw 2s ease forwards;
        }
        .hex-1 { animation-delay: 0.1s; }
        .hex-2 { animation-delay: 0.4s; }
        .hex-3 { animation-delay: 0.6s; }

        .drip {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw 2.5s ease-out forwards;
        }
        .drip-1 { animation-delay: 0.8s; }
        .drip-2 { animation-delay: 1.1s; }
        .drip-3 { animation-delay: 1.3s; }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        .bubble {
          opacity: 0;
          transform: scale(0);
          transform-origin: 118px 138px;
          animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s forwards;
        }

        .bubble-dot {
          opacity: 0;
          transform: translateY(-5px);
          animation: drop 1.5s ease 2.5s infinite;
        }

        @keyframes pop {
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes drop {
          0% { opacity: 0; transform: translateY(-5px); }
          50% { opacity: 1; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(20px); }
        }

        .brand-overlay {
          opacity: 0;
          transform: scale(0.95);
          animation: fadeIn 1.5s ease 0.5s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; transform: scale(1); }
        }

        .loader-container {
          opacity: 0;
          animation: simpleFade 1s ease 1s forwards;
        }

        @keyframes simpleFade {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
