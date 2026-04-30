import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Hold until full logo animation completes (~4.5s), then fade out
    const fadeTimer = setTimeout(() => {
      setOpacity(0)
    }, 4500)

    // Remove from DOM entirely after fade transition
    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 5500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 1s ease-out',
      pointerEvents: opacity === 0 ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          {/* Honeycomb 1 (Top) */}
          <polygon points="50,15 65,25 65,40 50,50 35,40 35,25" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" className="hex hex-1" />
          
          {/* Honeycomb 2 (Bottom Right) */}
          <polygon points="65,40 80,50 80,65 65,75 50,65 50,50" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" className="hex hex-2" />
          
          {/* Honeycomb 3 (Bottom Left) */}
          <polygon points="35,40 50,50 50,65 35,75 20,65 20,50" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" className="hex hex-3" />
          
          {/* Gold accent dot */}
          <circle cx="50" cy="50" r="2.5" fill="#D4AF37" className="gold-dot" />
          
          {/* Honey drip */}
          <path d="M50,65 C53,65 53,75 50,80 C47,75 47,65 50,65" fill="#D4AF37" className="honey-drip" />
        </svg>
      </div>

      <h1 className="logo-text" style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '1.2rem',
        letterSpacing: '0.4em',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.7)',
        marginTop: '10px'
      }}>
        FRAME.HIVE
      </h1>

      <style>{`
        .hex {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawHex 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hex-1 { animation-delay: 0.2s; }
        .hex-2 { animation-delay: 0.6s; }
        .hex-3 { animation-delay: 1.0s; }

        @keyframes drawHex {
          to { stroke-dashoffset: 0; }
        }

        .gold-dot {
          opacity: 0;
          transform: scale(0);
          transform-origin: 50px 50px;
          animation: popDot 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.2s forwards;
        }

        @keyframes popDot {
          to { opacity: 1; transform: scale(1); }
        }

        .honey-drip {
          transform-origin: 50px 65px;
          transform: scaleY(0);
          opacity: 0;
          animation: dripDrop 2s ease-in-out 2.8s forwards;
        }

        @keyframes dripDrop {
          0% { transform: scaleY(0); opacity: 1; }
          40% { transform: scaleY(1.2); opacity: 1; }
          70% { transform: scaleY(1.5) translateY(5px); opacity: 0.8; }
          100% { transform: scaleY(2) translateY(15px); opacity: 0; }
        }

        .logo-text {
          opacity: 0;
          animation: fadeInText 1s ease 1.8s forwards;
        }

        @keyframes fadeInText {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
