import { useEffect, useState } from 'react'

const Hexagon = ({ cx, cy, stroke, className }) => {
  const r = 22;
  const halfW = 19.05; // 22 * sqrt(3) / 2
  const d = `M ${cx} ${cy - r} L ${cx + halfW} ${cy - r/2} L ${cx + halfW} ${cy + r/2} L ${cx} ${cy + r} L ${cx - halfW} ${cy + r/2} L ${cx - halfW} ${cy - r/2} Z`;
  return <path d={d} pathLength="100" fill="none" stroke={stroke || "rgba(255,255,255,0.3)"} strokeWidth="1.5" className={className} />
}

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

    // Hold briefly after 100%, then fade out
    const fadeTimer = setTimeout(() => {
      setOpacity(0)
    }, 5000)

    // Remove from DOM entirely
    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 6000)

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
      <div style={{ position: 'relative', width: '220px', height: '240px' }}>
        <svg viewBox="0 0 200 220" style={{ width: '100%', height: '100%' }}>
          
          {/* Top Hexagon (Reddish/Copper) */}
          <Hexagon cx={100} cy={48} stroke="rgba(212, 115, 85, 0.7)" className="hex hex-top" />
          
          {/* Center Hexagon */}
          <Hexagon cx={100} cy={70} className="hex hex-center" />
          
          {/* Left Hexagon */}
          <Hexagon cx={61.9} cy={70} className="hex hex-left" />
          
          {/* Right Hexagon */}
          <Hexagon cx={138.1} cy={70} className="hex hex-right" />
          
          {/* Bottom-Left Hexagon */}
          <Hexagon cx={80.95} cy={103} className="hex hex-bottom" />

          {/* Left Hook Drip */}
          <path d="M 42.85 81 L 42.85 150 A 7 7 0 0 1 28.85 150 L 28.85 125" 
                pathLength="100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="drip-line drip-left" />

          {/* Right Hook Drip */}
          <path d="M 157.15 81 L 157.15 150 A 7 7 0 0 0 171.15 150 L 171.15 125" 
                pathLength="100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="drip-line drip-right" />

          {/* Bottom-Left Straight Drip */}
          <path d="M 80.95 125 L 80.95 160" 
                pathLength="100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="drip-line drip-center" />

          {/* Hollow Circle */}
          <circle cx="80.95" cy="166" r="4" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="hollow-circle" />

          {/* Solid Gold Dot */}
          <circle cx="80.95" cy="178" r="2" fill="#D4AF37" className="solid-dot" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="brand-text" style={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.2rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>Frame</span>
        <span style={{ fontSize: '2.2rem', color: '#D4AF37', margin: '0 4px', lineHeight: '1' }}>.</span>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>Hive</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-container" style={{ marginTop: '40px', width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'rgba(212, 175, 55, 0.8)', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ marginTop: '15px', fontFamily: '"Inter", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>
          {progress}%
        </span>
      </div>

      <style>{`
        .hex {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawPath 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hex-top { animation-delay: 0.1s; }
        .hex-center { animation-delay: 0.4s; }
        .hex-left { animation-delay: 0.7s; }
        .hex-right { animation-delay: 0.7s; }
        .hex-bottom { animation-delay: 1.0s; }

        .drip-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawPath 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .drip-left { animation-delay: 1.4s; }
        .drip-right { animation-delay: 1.4s; }
        .drip-center { animation-delay: 1.6s; }

        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }

        .hollow-circle {
          opacity: 0;
          transform: scale(0);
          transform-origin: 80.95px 166px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.2s forwards;
        }

        .solid-dot {
          opacity: 0;
          transform: scale(0);
          transform-origin: 80.95px 178px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s forwards;
        }

        @keyframes popIn {
          to { opacity: 1; transform: scale(1); }
        }

        .brand-text {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 1s ease 2.8s forwards;
        }

        .progress-container {
          opacity: 0;
          animation: fadeIn 1s ease 3.0s forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
