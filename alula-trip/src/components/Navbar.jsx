import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand} onClick={() => navigate('/')}>
        <span>🌴</span>
        <span style={styles.navTitle}>AlUla Trip</span>
      </div>
      <div style={styles.navLinks}>
        <button style={styles.navBtn} onClick={() => navigate('/explore')}>Explore</button>
        <button style={styles.navBtn} onClick={() => navigate('/weather')}>Weather</button>
        <button style={styles.navBtn} onClick={() => navigate('/map')}>Map</button>
        {user ? (
          <>
            <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
            <button style={styles.navBtn} onClick={() => navigate('/booking')}>Book a Trip</button>
            <button style={{...styles.navBtn, color: '#8B6340'}} onClick={logout}>Logout</button>
          </>
        ) : (
          <button style={{...styles.navBtn, background: '#8B6340', color: 'white'}} onClick={() => navigate('/login')}>Sign In</button>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 48px', background: 'white', height: '60px',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
  },
  navBrand: {
    display: 'flex', alignItems: 'center', gap: '8px',
    cursor: 'pointer', fontSize: '24px',
  },
  navTitle: { fontSize: '18px', fontWeight: '700', color: '#8B6340' },
  navLinks: {
    display: 'flex', alignItems: 'center', height: '36px',
    border: '1px solid #e0d5c5', borderRadius: '10px', overflow: 'hidden',
  },
  navBtn: {
    height: '100%', padding: '0 18px',
    background: 'transparent', border: 'none',
    borderRight: '1px solid #e0d5c5',
    cursor: 'pointer', fontSize: '13px',
    color: '#5a3e1b', fontWeight: '500',
    whiteSpace: 'nowrap',
  },
}

export default Navbar