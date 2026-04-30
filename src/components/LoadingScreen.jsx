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

  const Hexagon = ({ cx, cy, className }) => {
    const r = 24;
    const w = 20.78; // r * sqrt(3) / 2 = 24 * 0.866
    const points = `
      ${cx},${cy - r}
      ${cx + w},${cy - r/2}
      ${cx + w},${cy + r/2}
      ${cx},${cy + r}
      ${cx - w},${cy + r/2}
      ${cx - w},${cy - r/2}
    `;
    return <polygon points={points} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className={className} />
  }

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
          {/* Hexagon Cluster */}
          <Hexagon cx={100} cy={60} className="hex hex-1" />
          <Hexagon cx={79.22} cy={96} className="hex hex-2" />
          <Hexagon cx={120.78} cy={96} className="hex hex-3" />
          <Hexagon cx={100} cy={132} className="hex hex-4" />

          {/* Left Hook Drip */}
          {/* Middle Left p5 = cx - w, cy + r/2 = 79.22 - 20.78, 96 + 12 = 58.44, 108 */}
          <path d="M 58.44 108 L 58.44 145 A 6 6 0 0 1 46.44 145 L 46.44 135" 
                fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className="drip-line drip-1" />

          {/* Right Hook Drip */}
          {/* Middle Right p3 = cx + w, cy + r/2 = 120.78 + 20.78, 96 + 12 = 141.56, 108 */}
          <path d="M 141.56 108 L 141.56 145 A 6 6 0 0 0 153.56 145 L 153.56 135" 
                fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className="drip-line drip-2" />

          {/* Center Straight Drip */}
          {/* Bottom p4 = cx, cy + r = 100, 132 + 24 = 156 */}
          <path d="M 100 156 L 100 176" 
                fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className="drip-line drip-3" />

          {/* Hollow Circle */}
          <circle cx="100" cy="183" r="3.5" fill="none" stroke="rgba(212, 175, 55, 0.7)" strokeWidth="1.5" className="hollow-circle" />

          {/* Solid Gold Dot */}
          <circle cx="100" cy="196" r="2" fill="#D4AF37" className="solid-dot" />
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
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawPath 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hex-1 { animation-delay: 0.2s; }
        .hex-2 { animation-delay: 0.5s; }
        .hex-3 { animation-delay: 0.5s; }
        .hex-4 { animation-delay: 0.8s; }

        .drip-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawPath 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .drip-1 { animation-delay: 1.2s; }
        .drip-2 { animation-delay: 1.2s; }
        .drip-3 { animation-delay: 1.5s; }

        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }

        .hollow-circle {
          opacity: 0;
          transform: scale(0);
          transform-origin: 100px 183px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.0s forwards;
        }

        .solid-dot {
          opacity: 0;
          transform: scale(0);
          transform-origin: 100px 196px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.3s forwards;
        }

        @keyframes popIn {
          to { opacity: 1; transform: scale(1); }
        }

        .brand-text {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 1s ease 2.5s forwards;
        }

        .progress-container {
          opacity: 0;
          animation: fadeIn 1s ease 2.8s forwards;
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
