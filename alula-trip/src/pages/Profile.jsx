import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const bookings = JSON.parse(localStorage.getItem('alula_bookings') || '[]')

  function handleLogout() {
    logout()
    navigate('/')
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
          <button style={styles.navBtn} onClick={() => navigate('/map')}>Map</button>
          <button style={styles.navBtn} onClick={() => navigate('/booking')}>Book a Trip</button>
          <button style={{ ...styles.navBtn, color: '#8B6340' }} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.avatarRow}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={styles.headerName}>{user?.name}</h1>
              <p style={styles.headerEmail}>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{bookings.length}</span>
            <span style={styles.statLabel}>Total Trips</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>
              {bookings.reduce((sum, b) => sum + b.days, 0)}
            </span>
            <span style={styles.statLabel}>Total Days</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>
              {bookings.reduce((sum, b) => sum + b.activities.length, 0)}
            </span>
            <span style={styles.statLabel}>Activities</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>🌴</span>
            <span style={styles.statLabel}>AlUla Explorer</span>
          </div>
        </div>

        <div style={styles.tripsHeader}>
          <h2 style={styles.tripsTitle}>My Trips ({bookings.length})</h2>
          <button style={styles.newTripBtn} onClick={() => navigate('/booking')}>
            + Plan New Trip
          </button>
        </div>

        {bookings.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyEmoji}>🗺</span>
            <h3 style={styles.emptyTitle}>No trips yet!</h3>
            <p style={styles.emptyText}>Start planning your AlUla adventure</p>
            <button style={styles.emptyBtn} onClick={() => navigate('/booking')}>
              Book Your First Trip 🌴
            </button>
          </div>
        ) : (
          <div style={styles.tripsList}>
            {bookings.map((booking) => (
              <div key={booking.id} style={styles.tripCard}>
                <div style={styles.tripCardHeader}>
                  <div style={styles.tripRoute}>
                    <span style={styles.tripEmoji}>✈️</span>
                    <div>
                      <h4 style={styles.tripTitle}>From {booking.flight.from} → AlUla</h4>
                      <p style={styles.tripAirline}>{booking.flight.airline}</p>
                    </div>
                  </div>
                  <span style={styles.tripDate}>{booking.date}</span>
                </div>

                <div style={styles.tripDetails}>
                  <div style={styles.tripDetail}>
                    <span style={styles.tripDetailIcon}>✈️</span>
                    <div>
                      <span style={styles.tripDetailLabel}>Flight</span>
                      <span style={styles.tripDetailValue}>{booking.flight.price}</span>
                    </div>
                  </div>
                  <div style={styles.tripDetail}>
                    <span style={styles.tripDetailIcon}>🏨</span>
                    <div>
                      <span style={styles.tripDetailLabel}>Hotel</span>
                      <span style={styles.tripDetailValue}>{booking.hotel.name}</span>
                    </div>
                  </div>
                  <div style={styles.tripDetail}>
                    <span style={styles.tripDetailIcon}>📅</span>
                    <div>
                      <span style={styles.tripDetailLabel}>Duration</span>
                      <span style={styles.tripDetailValue}>{booking.days} days</span>
                    </div>
                  </div>
                  {booking.activities.length > 0 && (
                    <div style={styles.tripDetail}>
                      <span style={styles.tripDetailIcon}>🎯</span>
                      <div>
                        <span style={styles.tripDetailLabel}>Activities</span>
                        <span style={styles.tripDetailValue}>
                          {booking.activities.map((a) => a.name).join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
    padding: '48px',
  },
  headerContent: { maxWidth: '960px', margin: '0 auto' },
  avatarRow: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)', color: 'white',
    fontSize: '28px', fontWeight: '800',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid rgba(255,255,255,0.4)',
  },
  headerName: { fontSize: '28px', color: 'white', margin: '0 0 4px', fontWeight: '800' },
  headerEmail: { fontSize: '14px', color: 'rgba(255,255,255,0.75)', margin: 0 },

  content: { padding: '40px 48px', maxWidth: '960px', margin: '0 auto' },

  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' },
  statCard: {
    background: 'white', borderRadius: '16px', padding: '24px',
    textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: '6px',
  },
  statNum: { fontSize: '32px', fontWeight: '900', color: '#8B6340' },
  statLabel: { fontSize: '12px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' },

  tripsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  tripsTitle: { fontSize: '22px', color: '#5a3e1b', margin: 0, fontWeight: '700' },
  newTripBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '13px', cursor: 'pointer', fontWeight: '600',
  },

  emptyState: {
    background: 'white', borderRadius: '20px', padding: '60px',
    textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  emptyEmoji: { fontSize: '56px', display: 'block', marginBottom: '16px' },
  emptyTitle: { fontSize: '22px', color: '#5a3e1b', margin: '0 0 8px', fontWeight: '700' },
  emptyText: { fontSize: '14px', color: '#aaa', margin: '0 0 28px' },
  emptyBtn: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '12px',
    fontSize: '15px', cursor: 'pointer', fontWeight: '700',
  },

  tripsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  tripCard: {
    background: 'white', borderRadius: '18px', padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  tripCardHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '20px', paddingBottom: '20px',
    borderBottom: '1px solid #f0e8dc',
  },
  tripRoute: { display: 'flex', alignItems: 'center', gap: '14px' },
  tripEmoji: { fontSize: '28px' },
  tripTitle: { fontSize: '16px', color: '#5a3e1b', margin: '0 0 4px', fontWeight: '700' },
  tripAirline: { fontSize: '12px', color: '#aaa', margin: 0 },
  tripDate: {
    fontSize: '12px', color: '#aaa',
    background: '#f5f0ea', padding: '4px 12px', borderRadius: '8px',
  },

  tripDetails: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  tripDetail: { display: 'flex', alignItems: 'flex-start', gap: '10px' },
  tripDetailIcon: { fontSize: '18px', marginTop: '2px' },
  tripDetailLabel: { display: 'block', fontSize: '11px', color: '#aaa', textTransform: 'uppercase', marginBottom: '2px' },
  tripDetailValue: { display: 'block', fontSize: '14px', color: '#5a3e1b', fontWeight: '600' },

  footer: { background: '#2c1f10', padding: '24px', textAlign: 'center', marginTop: '40px' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Profile