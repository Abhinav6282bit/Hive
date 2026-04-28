import { ShoppingBag } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'The Classic Black',
    price: '$120.00',
    image: '/assets/product_frame_black_1777394687615.png'
  },
  {
    id: 2,
    name: 'Natural Oak',
    price: '$140.00',
    image: '/assets/product_frame_oak_1777394702502.png'
  },
  {
    id: 3,
    name: 'Gallery Gold',
    price: '$160.00',
    image: '/assets/product_frame_gold_1777394717703.png'
  },
  {
    id: 4,
    name: 'Modern Silver',
    price: '$130.00',
    image: '/assets/product_frame_silver_1777394732264.png'
  }
]

export function ProductSection() {
  return (
    <section style={{
      width: '100%',
      padding: '100px 60px',
      backgroundColor: '#0a0a0a',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '2.5rem',
          fontWeight: 400,
          margin: 0,
          letterSpacing: '0.05em'
        }}>
          Featured Collections
        </h2>
        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          paddingBottom: '4px',
          transition: 'all 0.3s ease'
        }}>
          VIEW ALL
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            cursor: 'pointer',
            group: 'true' // using inline style isn't great for hover groups, we'll use standard css approaches or simple states
          }}>
            {/* Image Container */}
            <div 
              className="product-card"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: '#fff',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '20px',
                position: 'relative'
              }}
            >
              <img 
                className="product-image"
                src={product.image} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />
              
              {/* Quick Add Button overlay */}
              <div 
                className="quick-add-btn"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '85%',
                  padding: '12px 0',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  borderRadius: '30px',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShoppingBag size={14} /> QUICK ADD
              </div>
            </div>

            {/* Product Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{
                margin: 0,
                fontSize: '1rem',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.9)'
              }}>
                {product.name}
              </h3>
              <span style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.05em'
              }}>
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
