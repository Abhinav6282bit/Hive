import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSlider } from './components/HeroSlider'
import { ProductSection } from './components/ProductSection'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#000' }}>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar onSearch={setSearchQuery} />
      <HeroSlider />
      <div id="shop">
        <ProductSection searchQuery={searchQuery} />
      </div>
      
      {/* About Section */}
      <section id="about-us" style={{ padding: '100px 60px', background: '#070707', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', marginBottom: '30px' }}>Our Story</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.7, lineHeight: '1.8', fontSize: '1.1rem' }}>
          HIVE was founded on the belief that every memory deserves a perfect frame. 
          We combine traditional craftsmanship with modern design to bring your moments to life.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '100px 60px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', marginBottom: '50px', textAlign: 'center' }}>Premium Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Custom Framing</h3>
              <p style={{ opacity: 0.6 }}>Bespoke solutions for art, photos, and memorabilia.</p>
            </div>
            <div style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Global Shipping</h3>
              <p style={{ opacity: 0.6 }}>Carefully packaged and delivered to your doorstep worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
