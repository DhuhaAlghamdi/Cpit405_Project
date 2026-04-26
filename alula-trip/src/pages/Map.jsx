import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const places = [
  { id: 1, name: "Hegra (Mada'in Saleh)", lat: 26.796, lng: 37.952, desc: "Saudi Arabia's first UNESCO World Heritage Site", emoji: '🗿', color: '#8B6340' },
  { id: 2, name: 'AlUla Old Town', lat: 26.623, lng: 37.921, desc: 'Ancient mud-brick city with 900 years of history', emoji: '🏛', color: '#5a3e1b' },
  { id: 3, name: 'Elephant Rock', lat: 26.583, lng: 37.883, desc: 'Iconic natural rock formation', emoji: '🪨', color: '#7a6040' },
  { id: 4, name: 'Dadan Ancient Kingdom', lat: 26.641, lng: 37.930, desc: 'Ruins of the Dadanite kingdom', emoji: '⛰', color: '#8B6340' },
  { id: 5, name: 'Jabal Ikmah', lat: 26.710, lng: 37.940, desc: 'Open-air library with ancient inscriptions', emoji: '📜', color: '#5a3e1b' },
  { id: 6, name: 'AlUla Oasis', lat: 26.620, lng: 37.915, desc: 'Lush palm groves in the desert', emoji: '🌴', color: '#2e7d32' },
  { id: 7, name: 'Sharaan Nature Reserve', lat: 26.550, lng: 37.860, desc: 'Stunning canyon landscapes', emoji: '🏜', color: '#7a6040' },
]

function Map() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(places[1])

  function getMapUrl(place) {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.05}%2C${place.lat - 0.05}%2C${place.lng + 0.05}%2C${place.lat + 0.05}&layer=mapnik&marker=${place.lat}%2C${place.lng}`
  }

  return (
    <div style={styles.container}>

      <nav style={styles.nav}>
        <div style={styles.navBrand} onClick={() => navigate('/')}>
          <span style={styles.navLogo}>🌴</span>
          <span style={styles.navTitle}>AlUla Trip</span>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/')}>Home</button>
          <button style={styles.navBtn} onClick={() => navigate('/explore')}>Explore</button>
          <button style={styles.navBtn} onClick={() => navigate('/weather')}>Weather</button>
          <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
          <button style={styles.navBtn} onClick={() => navigate('/booking')}>Book a Trip</button>
        </div>
      </nav>

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>AlUla Interactive Map 🗺</h1>
          <p style={styles.headerSub}>Click on any location below to explore it on the map</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.mapWrapper}>
          <iframe
            key={selected.id}
            title="AlUla Map"
            src={getMapUrl(selected)}
            style={styles.iframe}
          />
          <div style={styles.mapBadge}>
            <span style={styles.badgeEmoji}>{selected.emoji}</span>
            <span style={styles.badgeName}>{selected.name}</span>
          </div>
        </div>

        <div style={styles.placesSection}>
          <h3 style={styles.placesTitle}>Select a Location</h3>
          <div style={styles.grid}>
            {places.map((place) => (
              <div
                key={place.id}
                style={{
                  ...styles.card,
                  border: selected.id === place.id ? `2px solid ${place.color}` : '2px solid transparent',
                  boxShadow: selected.id === place.id ? `0 4px 20px ${place.color}30` : '0 2px 12px rgba(0,0,0,0.06)',
                }}
                onClick={() => setSelected(place)}
              >
                <div style={{ ...styles.cardTop, background: `linear-gradient(135deg, ${place.color}cc, ${place.color}77)` }}>
                  <span style={styles.cardEmoji}>{place.emoji}</span>
                </div>
                <div style={styles.cardBody}>
                  <h4 style={styles.cardTitle}>{place.name}</h4>
                  <p style={styles.cardDesc}>{place.desc}</p>
                  <div style={styles.cardCoords}>
                    📍 {place.lat}°N, {place.lng}°E
                  </div>
                  <button
                    style={styles.cardBtn}
                    onClick={(e) => { e.stopPropagation(); navigate('/booking') }}
                  >
                    Plan Visit →
                  </button>
                </div>
              </div>
            ))}
          </div>
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
  headerSub: { fontSize: '16px', color: 'rgba(255,255,255,0.8)', margin: 0 },

  content: { padding: '40px 48px', maxWidth: '1060px', margin: '0 auto' },

  mapWrapper: {
    position: 'relative', marginBottom: '48px',
    borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  },
  iframe: { width: '100%', height: '460px', border: 'none', display: 'block' },
  mapBadge: {
    position: 'absolute', bottom: '20px', left: '20px',
    background: 'white', borderRadius: '12px',
    padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
  badgeEmoji: { fontSize: '20px' },
  badgeName: { fontSize: '14px', fontWeight: '700', color: '#5a3e1b' },

  placesSection: { },
  placesTitle: { fontSize: '22px', color: '#5a3e1b', margin: '0 0 20px', fontWeight: '700' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },

  card: {
    background: 'white', borderRadius: '16px',
    overflow: 'hidden', cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  cardTop: {
    height: '100px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: '36px' },
  cardBody: { padding: '14px' },
  cardTitle: { fontSize: '13px', color: '#5a3e1b', margin: '0 0 6px', fontWeight: '700' },
  cardDesc: { fontSize: '11px', color: '#888', margin: '0 0 8px', lineHeight: 1.5 },
  cardCoords: { fontSize: '10px', color: '#bbb', margin: '0 0 10px' },
  cardBtn: {
    width: '100%', padding: '7px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '12px', cursor: 'pointer', fontWeight: '600',
  },

  footer: { background: '#2c1f10', padding: '24px', textAlign: 'center', marginTop: '40px' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Map