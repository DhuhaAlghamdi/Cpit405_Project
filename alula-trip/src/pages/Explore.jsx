import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY

const allPlaces = [
  { id: 1, name: "Hegra (Mada'in Saleh)", category: 'historic', emoji: '🗿', desc: "Saudi Arabia's first UNESCO World Heritage Site with Nabataean tombs.", search: 'ancient ruins desert Saudi Arabia' },
  { id: 2, name: 'AlUla Old Town', category: 'historic', emoji: '🏛', desc: 'Ancient mud-brick city with over 900 years of history.', search: 'ancient mud brick village desert' },
  { id: 3, name: 'Dadan Ancient Kingdom', category: 'historic', emoji: '⛰', desc: 'Ruins of the Dadanite and Lihyanite kingdoms carved into rock.', search: 'ancient rock carved ruins desert' },
  { id: 4, name: 'Jabal Ikmah', category: 'historic', emoji: '📜', desc: 'Open-air library with thousands of ancient inscriptions.', search: 'ancient rock inscriptions archaeological' },
  { id: 5, name: 'Elephant Rock', category: 'nature', emoji: '🪨', desc: 'Iconic natural rock formation resembling an elephant.', search: 'elephant rock AlUla formation' },
  { id: 6, name: 'AlUla Oasis', category: 'nature', emoji: '🌴', desc: 'Lush palm groves and farms in the heart of the desert.', search: 'oasis palm trees desert green' },
  { id: 7, name: 'Sharaan Nature Reserve', category: 'nature', emoji: '🏜', desc: 'Stunning canyon landscapes and diverse wildlife.', search: 'canyon desert landscape nature reserve' },
  { id: 8, name: 'Harrat Uwayrid', category: 'nature', emoji: '🌋', desc: 'Volcanic landscape with dramatic black lava fields.', search: 'volcanic lava field landscape' },
  { id: 9, name: 'AlUla Museum', category: 'museums', emoji: '🏺', desc: "Showcases AlUla's rich history from prehistoric times to today.", search: 'museum ancient artifacts exhibition' },
  { id: 10, name: 'Rashid Mall', category: 'museums', emoji: '🛍', desc: 'Modern shopping and cultural hub in AlUla city.', search: 'modern mall shopping center architecture' },
  { id: 11, name: 'Winter at Tantora', category: 'events', emoji: '🎭', desc: 'Annual international arts and culture festival in AlUla.', search: 'outdoor music festival desert night' },
  { id: 12, name: 'Hot Air Balloon', category: 'events', emoji: '🎈', desc: "Scenic balloon rides over AlUla's breathtaking landscape.", search: 'hot air balloon desert sunrise' },
]

const categories = [
  { label: 'All', value: 'all', emoji: '🌍' },
  { label: 'Historic', value: 'historic', emoji: '🏛' },
  { label: 'Nature', value: 'nature', emoji: '🌿' },
  { label: 'Museums', value: 'museums', emoji: '🏺' },
  { label: 'Events', value: 'events', emoji: '🎭' },
]

function Explore() {
  const [selected, setSelected] = useState('all')
  const [photos, setPhotos] = useState({})
  const navigate = useNavigate()

  const filtered = selected === 'all'
    ? allPlaces
    : allPlaces.filter((p) => p.category === selected)

  useEffect(() => {
    async function fetchPhotos() {
      const newPhotos = {}
      for (const place of allPlaces) {
        try {
          const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(place.search)}&per_page=1&client_id=${UNSPLASH_KEY}`
          )
          const data = await res.json()
          if (data.results && data.results.length > 0) {
            newPhotos[place.id] = data.results[0].urls.regular
          }
        } catch {
          newPhotos[place.id] = null
        }
      }
      setPhotos(newPhotos)
    }
    fetchPhotos()
  }, [])

  return (
    <div style={styles.container}>

      <nav style={styles.nav}>
        <div style={styles.navBrand} onClick={() => navigate('/')}>
          <span style={styles.navLogo}>🌴</span>
          <span style={styles.navTitle}>AlUla Trip</span>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/')}>Home</button>
          <button style={styles.navBtn} onClick={() => navigate('/weather')}>Weather</button>
          <button style={styles.navBtn} onClick={() => navigate('/map')}>Map</button>
          <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
          <button style={styles.navBtn} onClick={() => navigate('/booking')}>Book a Trip</button>
        </div>
      </nav>

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Explore AlUla 🗺</h1>
          <p style={styles.headerSub}>Discover the best places to visit in Saudi Arabia's most breathtaking destination</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              style={selected === cat.value ? styles.catBtnActive : styles.catBtn}
              onClick={() => setSelected(cat.value)}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <p style={styles.resultsCount}>{filtered.length} places found</p>

        <div style={styles.grid}>
          {filtered.map((place) => (
            <div
              key={place.id}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                ...styles.cardTop,
                backgroundImage: photos[place.id] ? `url(${photos[place.id]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                background: photos[place.id]
                  ? `url(${photos[place.id]}) center/cover no-repeat`
                  : `linear-gradient(135deg, #c8a97ecc, #8B6340aa)`,
              }}>
                {!photos[place.id] && <span style={styles.cardEmoji}>{place.emoji}</span>}
                <div style={styles.cardOverlay}>
                  <span style={styles.cardCategory}>{place.category}</span>
                </div>
              </div>
              <div style={styles.cardBody}>
                <h4 style={styles.cardTitle}>{place.name}</h4>
                <p style={styles.cardDesc}>{place.desc}</p>
                <button style={styles.cardBtn} onClick={() => navigate('/booking')}>
                  Plan Visit →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 AlUla Trip — CPIT 405 Project · KAU</p>
      </footer>

    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#fdf8f3', fontFamily: "'Segoe UI', sans-serif" },

  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 48px', background: 'white', height: '60px',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  navLogo: { fontSize: '24px' },
  navTitle: { fontSize: '18px', fontWeight: '700', color: '#8B6340' },
  navLinks: {
    display: 'flex', alignItems: 'stretch',
    border: '1px solid #e0d5c5', borderRadius: '12px',
    overflow: 'hidden', height: '38px',
  },
  navBtn: {
    padding: '0 16px', background: 'transparent',
    border: 'none', borderRight: '1px solid #e0d5c5',
    cursor: 'pointer', fontSize: '13px', color: '#5a3e1b',
    fontWeight: '500', whiteSpace: 'nowrap',
  },

  header: {
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    padding: '56px 48px',
  },
  headerContent: { maxWidth: '960px', margin: '0 auto' },
  headerTitle: { fontSize: '40px', color: 'white', margin: '0 0 12px', fontWeight: '800' },
  headerSub: { fontSize: '16px', color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: '500px' },

  content: { padding: '40px 48px', maxWidth: '1060px', margin: '0 auto' },

  categories: { display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  catBtn: {
    padding: '10px 20px', background: 'white',
    border: '1px solid #e0d5c5', borderRadius: '24px',
    cursor: 'pointer', fontSize: '13px', color: '#5a3e1b', fontWeight: '500',
  },
  catBtnActive: {
    padding: '10px 20px', background: '#8B6340',
    border: '1px solid #8B6340', borderRadius: '24px',
    cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: '600',
  },

  resultsCount: { fontSize: '13px', color: '#aaa', margin: '0 0 24px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },

  card: {
    background: 'white', borderRadius: '18px',
    overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    transition: 'transform 0.25s ease', cursor: 'pointer',
  },
  cardTop: {
    height: '180px', position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: '44px', zIndex: 1 },
  cardOverlay: {
    position: 'absolute', bottom: '10px', right: '10px',
  },
  cardCategory: {
    background: 'rgba(0,0,0,0.4)', color: 'white',
    padding: '3px 10px', borderRadius: '10px',
    fontSize: '11px', fontWeight: '600', textTransform: 'capitalize',
    backdropFilter: 'blur(4px)',
  },
  cardBody: { padding: '20px' },
  cardTitle: { fontSize: '15px', color: '#5a3e1b', margin: '0 0 8px', fontWeight: '700' },
  cardDesc: { fontSize: '13px', color: '#888', margin: '0 0 16px', lineHeight: 1.6 },
  cardBtn: {
    padding: '9px 20px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '13px', cursor: 'pointer', fontWeight: '600',
  },

  footer: { background: '#2c1f10', padding: '24px', textAlign: 'center', marginTop: '40px' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Explore