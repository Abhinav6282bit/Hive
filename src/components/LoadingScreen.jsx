import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 4500
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
    }, 5200)

    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 6200)

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
      backgroundColor: '#070707',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 1s ease-in-out',
      pointerEvents: opacity === 0 ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', width: '250px', height: '250px' }}>
        <svg viewBox="0 0 200 220" style={{ width: '100%', height: '100%' }}>
          {/* Hexagon 1: Top (Reddish/Copper) */}
          <path d="M 100 26 L 119.05 37 L 119.05 59 L 100 70 L 80.95 59 L 80.95 37 Z" 
                pathLength="1" fill="none" stroke="rgba(212, 115, 85, 0.8)" strokeWidth="1.8" className="hex hex-1" />
          
          {/* Hexagon 2: Center */}
          <path d="M 100 48 L 119.05 59 L 119.05 81 L 100 92 L 80.95 81 L 80.95 59 Z" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="hex hex-2" />
          
          {/* Hexagon 3: Left */}
          <path d="M 61.9 48 L 80.95 59 L 80.95 81 L 61.9 92 L 42.85 81 L 42.85 59 Z" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="hex hex-3" />
          
          {/* Hexagon 4: Right */}
          <path d="M 138.1 48 L 157.15 59 L 157.15 81 L 138.1 92 L 119.05 81 L 119.05 59 Z" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="hex hex-4" />
          
          {/* Hexagon 5: Bottom-Left */}
          <path d="M 80.95 81 L 100 92 L 100 114 L 80.95 125 L 61.9 114 L 61.9 92 Z" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="hex hex-5" />

          {/* Left Hook Drip */}
          <path d="M 42.85 81 L 42.85 150 A 7 7 0 0 1 28.85 150 L 28.85 125" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="drip drip-l" />

          {/* Right Hook Drip */}
          <path d="M 157.15 81 L 157.15 150 A 7 7 0 0 0 171.15 150 L 171.15 125" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="drip drip-r" />

          {/* Center Straight Drip */}
          <path d="M 80.95 125 L 80.95 160" 
                pathLength="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" className="drip drip-c" />

          {/* Hollow Circle */}
          <circle cx="80.95" cy="166" r="4" fill="none" stroke="#D4AF37" strokeWidth="1.8" className="hollow" />

          {/* Solid Gold Dot */}
          <circle cx="80.95" cy="178" r="2" fill="#D4AF37" className="solid" />
        </svg>
      </div>

      <div className="brand" style={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.4rem', fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>Frame</span>
        <span style={{ fontSize: '2.4rem', color: '#D4AF37', margin: '0 4px', lineHeight: '1' }}>.</span>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.4rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em' }}>Hive</span>
      </div>

      <div className="prog" style={{ marginTop: '40px', width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', position: 'relative' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'rgba(212, 175, 55, 0.9)', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ marginTop: '15px', fontFamily: '"Inter", sans-serif', fontSize: '0.7rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.25)' }}>
          {progress}%
        </span>
      </div>

      <style>{`
        .hex {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hex-1 { animation-delay: 0.1s; }
        .hex-2 { animation-delay: 0.4s; }
        .hex-3 { animation-delay: 0.7s; }
        .hex-4 { animation-delay: 0.7s; }
        .hex-5 { animation-delay: 1.0s; }

        .drip {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .drip-l { animation-delay: 1.4s; }
        .drip-r { animation-delay: 1.4s; }
        .drip-c { animation-delay: 1.6s; }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        .hollow {
          opacity: 0;
          transform: scale(0);
          transform-origin: 80.95px 166px;
          animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.2s forwards;
        }

        .solid {
          opacity: 0;
          transform: scale(0);
          transform-origin: 80.95px 178px;
          animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s forwards;
        }

        @keyframes pop {
          to { opacity: 1; transform: scale(1); }
        }

        .brand {
          opacity: 0;
          transform: translateY(10px);
          animation: up 1s ease 2.8s forwards;
        }

        .prog {
          opacity: 0;
          animation: in 1s ease 3.0s forwards;
        }

        @keyframes up {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
