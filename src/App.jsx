import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSlider } from './components/HeroSlider'
import { ProductSection } from './components/ProductSection'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#000' }}>
      <Navbar />
      <HeroSlider />
      <ProductSection />
      <Footer />
    </div>
  )
}

export default App
