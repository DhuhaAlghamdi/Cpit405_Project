import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import alulaImg from './photos/Alula.jpg'

const cities = [
  { name: 'AlUla Old Town', description: 'Explore the ancient mud-brick city', emoji: '🏛', color: '#8B6340' },
  { name: 'Hegra', description: "Saudi Arabia's first UNESCO World Heritage Site", emoji: '🗿', color: '#5a3e1b' },
  { name: 'Elephant Rock', description: 'Iconic natural rock formation', emoji: '🪨', color: '#7a6040' },
  { name: 'Dadan', description: 'Ancient Dadanite and Lihyanite kingdom', emoji: '⛰', color: '#6b5030' },
  { name: 'AlUla Oasis', description: 'Lush palm groves in the desert', emoji: '🌴', color: '#2e7d32' },
  { name: 'Sharaan Nature Reserve', description: 'Stunning canyon landscapes', emoji: '🏜', color: '#8B6340' },
]

function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={styles.container}>

      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={styles.navLogo}>🌴</span>
          <span style={styles.navTitle}>AlUla Trip</span>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/explore')}>Explore</button>
          <button style={styles.navBtn} onClick={() => navigate('/weather')}>Weather</button>
          <button style={styles.navBtn} onClick={() => navigate('/map')}>Map</button>
          {user ? (
            <>
              <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
              <button style={styles.navBtnOutline} onClick={logout}>Logout</button>
            </>
          ) : (
            <button style={styles.navBtnPrimary} onClick={() => navigate('/login')}>Sign In</button>
          )}
        </div>
      </nav>

      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroTag}>🇸🇦 Saudi Arabia's Hidden Gem</div>
          <h1 style={styles.heroTitle}>Discover<br />AlUla</h1>
          <p style={styles.heroSub}>
            Plan your perfect trip to Saudi Arabia's most breathtaking destination —
            ancient history, stunning landscapes, and unforgettable experiences await.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.heroBtnPrimary} onClick={() => navigate('/explore')}>
              Start Exploring →
            </button>
            <button style={styles.heroBtnSecondary} onClick={() => navigate('/map')}>
              View Map 🗺
            </button>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>DESTINATIONS</span>
          <h2 style={styles.sectionTitle}>Top Places to Visit</h2>
          <p style={styles.sectionSub}>From ancient archaeological sites to breathtaking natural wonders</p>
        </div>
        <div style={styles.grid}>
          {cities.map((city) => (
            <div
              key={city.name}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ ...styles.cardTop, background: `linear-gradient(135deg, ${city.color}dd, ${city.color}88)` }}>
                <span style={styles.cardEmoji}>{city.emoji}</span>
              </div>
              <div style={styles.cardBody}>
                <h4 style={styles.cardTitle}>{city.name}</h4>
                <p style={styles.cardDesc}>{city.description}</p>
                <button
                  style={styles.cardBtn}
                  onClick={() => user ? navigate('/booking') : navigate('/login')}
                >
                  {user ? 'Book Now →' : 'Sign in to Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Plan Your AlUla Adventure?</h2>
          <p style={styles.ctaSub}>Book flights, hotels, and activities — all in one place</p>
          <button
            style={styles.ctaBtn}
            onClick={() => user ? navigate('/booking') : navigate('/register')}
          >
            {user ? 'Plan My Trip 🌴' : 'Get Started Free'}
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <button style={styles.footerBtn} onClick={() => navigate('/explore')}>Explore</button>
          <button style={styles.footerBtn} onClick={() => navigate('/weather')}>Weather</button>
          <button style={styles.footerBtn} onClick={() => navigate('/map')}>Map</button>
          <button style={styles.footerBtn} onClick={() => navigate('/booking')}>Book</button>
        </div>
        <p style={styles.footerText}>© 2026 AlUla Trip — CPIT 405 Project · KAU</p>
      </footer>

    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#fdf8f3', fontFamily: "'Segoe UI', sans-serif" },

  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 48px', background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 1px 20px rgba(0,0,0,0.08)',
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: '10px' },
  navLogo: { fontSize: '28px' },
  navTitle: { fontSize: '20px', fontWeight: '700', color: '#8B6340' },


  navLinks: {
  display: 'flex', alignItems: 'stretch',
  border: '1px solid #e0d5c5', borderRadius: '12px',
  overflow: 'hidden', height: '42px',
},
navBtn: {
  padding: '0 22px', background: 'transparent',
  border: 'none', borderRight: '1px solid #e0d5c5',
  cursor: 'pointer', fontSize: '15px', color: '#5a3e1b',
  fontWeight: '500', whiteSpace: 'nowrap',
},
navBtnPrimary: {
  padding: '0 22px', background: '#8B6340',
  border: 'none', cursor: 'pointer',
  fontSize: '15px', color: 'white', fontWeight: '600',
},
navBtnOutline: {
  padding: '0 22px', background: 'transparent',
  border: 'none', borderLeft: '1px solid #e0d5c5',
  cursor: 'pointer', fontSize: '15px', color: '#8B6340', fontWeight: '500',
},
  hero: {
    height: '90vh', minHeight: '600px',
    background: `linear-gradient(160deg, rgba(139,99,64,0.35) 0%, rgba(90,62,27,0.45) 100%), url(${alulaImg}) center/cover no-repeat`,
    display: 'flex', alignItems: 'center',
    position: 'relative', overflow: 'hidden',
  },
  heroOverlay: {
    padding: '0 80px', maxWidth: '700px', position: 'relative', zIndex: 2,
  },
  heroTag: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.9)',
    padding: '6px 16px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '500',
    marginBottom: '24px', border: '1px solid rgba(255,255,255,0.2)',
  },
  heroTitle: {
    fontSize: '72px', fontWeight: '900', color: 'white',
    lineHeight: 1.1, margin: '0 0 20px',
    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
  },
  heroSub: {
    fontSize: '18px', color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.7, margin: '0 0 36px', maxWidth: '520px',
  },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  heroBtnPrimary: {
    padding: '16px 36px', background: 'white',
    color: '#8B6340', border: 'none', borderRadius: '12px',
    fontSize: '16px', cursor: 'pointer', fontWeight: '700',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  heroBtnSecondary: {
    padding: '16px 28px', background: 'rgba(255,255,255,0.15)',
    color: 'white', border: '2px solid rgba(255,255,255,0.4)',
    borderRadius: '12px', fontSize: '16px', cursor: 'pointer', fontWeight: '600',
  },

  section: { padding: '80px 48px' },
  sectionHeader: { textAlign: 'center', marginBottom: '48px' },
  sectionTag: {
    fontSize: '11px', fontWeight: '700', letterSpacing: '2px',
    color: '#8B6340', textTransform: 'uppercase',
  },
  sectionTitle: { fontSize: '36px', color: '#5a3e1b', margin: '8px 0', fontWeight: '800' },
  sectionSub: { fontSize: '16px', color: '#aaa', margin: 0 },

  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px', maxWidth: '1000px', margin: '0 auto',
  },
  card: {
    background: 'white', borderRadius: '20px',
    overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardTop: {
    height: '140px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: '48px' },
  cardBody: { padding: '20px' },
  cardTitle: { fontSize: '16px', color: '#5a3e1b', margin: '0 0 8px', fontWeight: '700' },
  cardDesc: { fontSize: '13px', color: '#888', margin: '0 0 16px', lineHeight: 1.6 },
  cardBtn: {
    width: '100%', padding: '10px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '13px', cursor: 'pointer', fontWeight: '600',
  },

  ctaSection: {
    background: 'linear-gradient(135deg, #8B6340, #5a3e1b)',
    padding: '80px 48px', textAlign: 'center',
  },
  ctaContent: { maxWidth: '600px', margin: '0 auto' },
  ctaTitle: { fontSize: '36px', color: 'white', margin: '0 0 16px', fontWeight: '800' },
  ctaSub: { fontSize: '16px', color: 'rgba(255,255,255,0.75)', margin: '0 0 36px' },
  ctaBtn: {
    padding: '16px 40px', background: 'white',
    color: '#8B6340', border: 'none', borderRadius: '12px',
    fontSize: '16px', cursor: 'pointer', fontWeight: '700',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },

  footer: {
    background: '#2c1f10', padding: '32px 48px', textAlign: 'center',
  },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' },
  footerBtn: {
    background: 'transparent', border: 'none',
    color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '14px',
  },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Home