import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Wait for 1.5 seconds, then start fading out
    const fadeTimer = setTimeout(() => {
      setOpacity(0)
    }, 1500)

    // Remove from DOM entirely after fade transition finishes
    const removeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 0.5s ease-out',
      pointerEvents: opacity === 0 ? 'none' : 'all'
    }}>
      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '3.5rem',
        letterSpacing: '0.15em',
        fontWeight: 400,
        color: '#fff',
        margin: 0,
        animation: 'pulseLogo 1.5s ease-in-out infinite alternate'
      }}>
        HIVE
      </h1>
      
      {/* Subtle glowing loading bar */}
      <div style={{
        marginTop: '30px',
        width: '120px',
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '40%',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px #fff',
          animation: 'slideBar 1.5s ease-in-out infinite'
        }} />
      </div>

      <style>{`
        @keyframes pulseLogo {
          0% { opacity: 0.6; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideBar {
          0% { left: -50%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  )
}
