import { User, Search, ShoppingBag } from 'lucide-react'

export function Navbar({ onSearch }) {
  return (
    <nav className="nav-container" style={{
      position: 'fixed',
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      color: '#fff'
    }}>
      {/* Left side: Logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <h1 className="nav-logo" style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '2.5rem',
          letterSpacing: '0.05em',
          fontWeight: 600,
          margin: 0,
          color: '#fff',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)',
          cursor: 'pointer'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          HIVE
        </h1>
      </div>

      {/* Center: Search Bar */}
      <div className="search-wrapper" style={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          padding: '8px 20px',
          width: '100%',
          maxWidth: '300px'
        }}>
          <Search size={16} color="#ccc" style={{ marginRight: '10px' }} />
          <input 
            className="search-input"
            type="text" 
            placeholder="Search frames, gifts..." 
            onChange={(e) => onSearch && onSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              width: '100%',
              fontSize: '0.8rem',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.05em'
            }}
          />
        </div>
      </div>

      {/* Right side: Navigation Links & Icons */}
      <div style={{ flex: 1.5, display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
        <div className="desktop-only" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {[
            { label: 'SHOP', href: '#shop' },
            { label: 'ABOUT US', href: '#about-us' },
            { label: 'SERVICES', href: '#services' }
          ].map((link) => (
            <a key={link.label} href={link.href} style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              fontWeight: 500,
              transition: 'opacity 0.3s ease',
              opacity: 0.8
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(link.href);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: '10px' }}>
          <ShoppingBag size={20} strokeWidth={1.5} style={{ cursor: 'pointer', color: '#fff', opacity: 0.9 }} />
          <User size={20} strokeWidth={1.5} style={{ cursor: 'pointer', color: '#fff', opacity: 0.9 }} />
        </div>
      </div>
    </nav>
  )
}
