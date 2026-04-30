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
      <section id="about-us" style={{ padding: '120px 60px', background: '#070707', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', marginBottom: '40px', fontWeight: 400, letterSpacing: '0.02em' }}>Our Heritage</h2>
          <p style={{ opacity: 0.8, lineHeight: '2', fontSize: '1.2rem', fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>
            At HIVE, we believe that every photograph, every artwork, and every memory is a story waiting to be told. 
            Founded on a passion for impeccable craftsmanship and minimalist aesthetics, we curate the world's 
            finest materials to protect and elevate your most precious moments. 
            Our mission is to transform your artifacts into timeless gallery pieces for your home.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '120px 60px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', marginBottom: '60px', textAlign: 'center', fontWeight: 400 }}>Exquisite Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
            <div style={{ padding: '50px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: '"Playfair Display", serif' }}>Artisanal Framing</h3>
              <p style={{ opacity: 0.6, lineHeight: '1.7', fontSize: '1rem' }}>
                Exquisite, handcrafted frames tailored to your unique style. From minimalist oak to luxury museum-grade glass, 
                we provide the perfect surround for your art.
              </p>
            </div>
            <div style={{ padding: '50px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: '"Playfair Display", serif' }}>Curated Gifting</h3>
              <p style={{ opacity: 0.6, lineHeight: '1.7', fontSize: '1rem' }}>
                Bespoke gift solutions that combine elegance with emotion. Our signature premium packaging ensures your 
                gift makes an unforgettable impression.
              </p>
            </div>
            <div style={{ padding: '50px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: '"Playfair Display", serif' }}>Global Logistics</h3>
              <p style={{ opacity: 0.6, lineHeight: '1.7', fontSize: '1rem' }}>
                White-glove delivery across the globe. Each piece is meticulously secured and tracked until it 
                reaches its new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
