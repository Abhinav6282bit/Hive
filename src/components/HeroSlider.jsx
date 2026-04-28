import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  {
    image: `${import.meta.env.BASE_URL}assets/hero-gallery.png`,
    subtitle: 'MUSEUM QUALITY & SUSTAINABLE',
    title: 'FRAME YOUR PHOTOS',
    button: 'BESTSELLING FRAMES',
    align: 'left'
  },
  {
    image: `${import.meta.env.BASE_URL}assets/hero-gift.png`,
    subtitle: '',
    title: 'THE MOST PERSONALISED GIFT',
    button: 'GIFT NOW',
    align: 'left'
  },
  {
    image: `${import.meta.env.BASE_URL}assets/hero-modern.png`,
    subtitle: 'MINIMALIST ELEGANCE',
    title: 'STATEMENT ART PIECES',
    button: 'SHOP THE LOOK',
    align: 'left'
  },
  {
    image: `${import.meta.env.BASE_URL}assets/hero-shelf.png`,
    subtitle: 'CURATE YOUR MEMORIES',
    title: 'BEAUTIFUL GALLERY SHELVES',
    button: 'EXPLORE COLLECTIONS',
    align: 'left'
  }
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.scrollY === 0) {
        nextSlide()
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  // Scroll/Wheel to slide
  useEffect(() => {
    const handleWheel = (e) => {
      // If we're scrolled down into the footer, let the browser handle scrolling naturally
      if (window.scrollY > 50) return
      
      if (isAnimating) {
        e.preventDefault()
        return
      }
      
      // Capture any scroll direction regardless of magnitude
      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (currentSlide === SLIDES.length - 1) {
          // We are at the last slide, let the browser scroll down to the footer
          return 
        }
        e.preventDefault() // Hijack scroll to change slide
        nextSlide()
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (currentSlide === 0) {
          // We are at the first slide, do nothing (don't wrap around to the end)
          // Let the browser handle the native "bounce" at the top of the page
          return 
        }
        e.preventDefault() // Hijack scroll to change slide backwards
        prevSlide()
      }
    }
    
    // Use non-passive listener to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    // --- Touch Support ---
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      // Prevent native scrolling if we are not on the last slide, 
      // or if we are animating, to allow the swipe to trigger the slider instead
      if (currentSlide < SLIDES.length - 1 || isAnimating) {
        // Only prevent default if we are at the top of the page
        if (window.scrollY <= 50) {
          e.preventDefault()
        }
      }
    }
    const handleTouchEnd = (e) => {
      if (window.scrollY > 50 || isAnimating) return
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      
      if (deltaY > 40) { // Swiped up (scrolling down)
        if (currentSlide === SLIDES.length - 1) return
        nextSlide()
      } else if (deltaY < -40) { // Swiped down (scrolling up)
        if (currentSlide === 0) return
        prevSlide()
      }
    }
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    // --- Keyboard Support ---
    const handleKeyDown = (e) => {
      if (window.scrollY > 50 || isAnimating) return
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (currentSlide === SLIDES.length - 1) return
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentSlide === 0) return
        e.preventDefault()
        prevSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAnimating, currentSlide])

  const nextSlide = () => {
    if (isAnimating || currentSlide === SLIDES.length - 1) return
    setIsAnimating(true)
    setCurrentSlide(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 1200) // Match transition duration
  }

  const prevSlide = () => {
    if (isAnimating || currentSlide === 0) return
    setIsAnimating(true)
    setCurrentSlide(prev => prev - 1)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000'
    }}>
      {SLIDES.map((slide, i) => (
        <div 
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: currentSlide === i ? 1 : 0,
            transform: currentSlide === i ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.2s ease, transform 4s ease-out',
            zIndex: currentSlide === i ? 10 : 0
          }}
        >
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          
          {/* Text Content Layer Removed based on user request */}
        </div>
      ))}
      
      {/* Pagination Dots */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        right: '60px',
        display: 'flex',
        gap: '12px',
        zIndex: 20
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(i)
                setTimeout(() => setIsAnimating(false), 1200)
              }
            }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: currentSlide === i ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  )
}
