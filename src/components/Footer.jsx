export function Footer() {
  return (
    <footer className="footer-container" style={{
      width: '100%',
      backgroundColor: '#111',
      color: '#fff',
      padding: '80px 60px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
      fontFamily: '"Inter", sans-serif'
    }}>
      <div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '20px' }}>HIVE</h3>
        <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>
          Museum quality, sustainable frames. Beautifully crafted to make your memories last a lifetime.
        </p>
      </div>
      
      <div>
        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '20px' }}>SHOP</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888', fontSize: '0.85rem', lineHeight: 2 }}>
          <li style={{ cursor: 'pointer' }}>Bestselling Frames</li>
          <li style={{ cursor: 'pointer' }}>Gallery Walls</li>
          <li style={{ cursor: 'pointer' }}>Personalised Gifts</li>
          <li style={{ cursor: 'pointer' }}>Gift Cards</li>
        </ul>
      </div>

      <div>
        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '20px' }}>SUPPORT</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888', fontSize: '0.85rem', lineHeight: 2 }}>
          <li style={{ cursor: 'pointer' }}>FAQ</li>
          <li style={{ cursor: 'pointer' }}>Shipping & Returns</li>
          <li style={{ cursor: 'pointer' }}>Contact Us</li>
          <li style={{ cursor: 'pointer' }}>Trade Program</li>
        </ul>
      </div>

      <div>
        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '20px' }}>CONNECT</h4>
        <div style={{ display: 'flex', gap: '15px', color: '#888' }}>
          <span style={{ cursor: 'pointer' }}>Instagram</span>
          <span style={{ cursor: 'pointer' }}>Pinterest</span>
          <span style={{ cursor: 'pointer' }}>Facebook</span>
        </div>
      </div>
      
      <div className="footer-bottom" style={{ gridColumn: '1 / -1', borderTop: '1px solid #333', marginTop: '40px', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.75rem' }}>
        <span>© 2026 HIVE Frames. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
