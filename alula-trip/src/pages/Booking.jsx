import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const EXCHANGE_KEY = import.meta.env.VITE_EXCHANGE_KEY

const flights = [
  { id: 1, from: 'Riyadh', price: 350, duration: '1h 10m', airline: 'Saudia', emoji: '🛫' },
  { id: 2, from: 'Jeddah', price: 400, duration: '1h 25m', airline: 'flynas', emoji: '🛫' },
  { id: 3, from: 'Dammam', price: 500, duration: '1h 50m', airline: 'Saudia', emoji: '🛫' },
  { id: 4, from: 'Dubai', price: 800, duration: '2h 10m', airline: 'flydubai', emoji: '🌍' },
  { id: 5, from: 'Cairo', price: 1200, duration: '3h 20m', airline: 'EgyptAir', emoji: '🌍' },
]

const hotels = [
  { id: 1, name: 'Shaden Resort AlUla', stars: 5, price: 1200, type: 'Resort' },
  { id: 2, name: 'Dar Tantora AlUla', stars: 5, price: 950, type: 'Boutique Hotel' },
  { id: 3, name: 'AlUla Moon Resort', stars: 4, price: 650, type: 'Resort' },
  { id: 4, name: 'Caravan by Habitas', stars: 4, price: 800, type: 'Eco Resort' },
  { id: 5, name: 'AlUla Guest House', stars: 3, price: 300, type: 'Guest House' },
]

const activities = [
  { id: 1, name: 'Hegra Archaeological Tour', duration: '3h', price: 200, emoji: '🗿' },
  { id: 2, name: 'Hot Air Balloon Ride', duration: '1h', price: 850, emoji: '🎈' },
  { id: 3, name: 'Desert Safari', duration: '4h', price: 350, emoji: '🏜' },
  { id: 4, name: 'AlUla Old Town Walk', duration: '2h', price: 120, emoji: '🏛' },
  { id: 5, name: 'Stargazing Night Tour', duration: '3h', price: 280, emoji: '🌌' },
]

const currencies = [
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
]

function Booking() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [selectedActivities, setSelectedActivities] = useState([])
  const [days, setDays] = useState(3)
  const [booked, setBooked] = useState(false)
  const [currency, setCurrency] = useState('SAR')
  const [rates, setRates] = useState(null)

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/SAR`)
        const data = await res.json()
        setRates(data.conversion_rates)
      } catch {
        console.log('Exchange rate fetch failed')
      }
    }
    fetchRates()
  }, [])

  function convertPrice(sarAmount) {
    if (!rates || currency === 'SAR') {
      return `${sarAmount} SAR`
    }
    const converted = (sarAmount * rates[currency]).toFixed(0)
    const sym = currencies.find((c) => c.code === currency)?.symbol || currency
    return `${sym}${converted}`
  }

  function toggleActivity(activity) {
    setSelectedActivities((prev) =>
      prev.find((a) => a.id === activity.id)
        ? prev.filter((a) => a.id !== activity.id)
        : [...prev, activity]
    )
  }

  function handleBook() {
    if (!selectedFlight || !selectedHotel) {
      alert('Please select a flight and hotel')
      return
    }
    const booking = {
      id: Date.now(),
      flight: { ...selectedFlight, price: `${selectedFlight.price} SAR` },
      hotel: { ...selectedHotel, price: `${selectedHotel.price} SAR/night` },
      activities: selectedActivities.map((a) => ({ ...a, price: `${a.price} SAR` })),
      days,
      date: new Date().toLocaleDateString(),
    }
    const existing = JSON.parse(localStorage.getItem('alula_bookings') || '[]')
    localStorage.setItem('alula_bookings', JSON.stringify([...existing, booking]))
    setBooked(true)
  }

  if (booked) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <span style={styles.successIcon}>🎉</span>
          <h2 style={styles.successTitle}>Booking Confirmed!</h2>
          <p style={styles.successText}>Your AlUla trip has been saved successfully.</p>
          <button style={styles.successBtn} onClick={() => navigate('/profile')}>View My Trips</button>
          <button style={styles.successBtnOutline} onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    )
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
          <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </nav>

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Plan Your Trip ✈️</h1>
          <p style={styles.headerSub}>Welcome, {user?.name}! Build your perfect AlUla experience</p>
        </div>
      </div>

      <div style={styles.content}>

        <div style={styles.currencySection}>
          <h3 style={styles.sectionTitle}>💱 Display Currency</h3>
          <div style={styles.currencyRow}>
            {currencies.map((cur) => (
              <button
                key={cur.code}
                style={currency === cur.code ? styles.curBtnActive : styles.curBtn}
                onClick={() => setCurrency(cur.code)}
              >
                {cur.symbol} {cur.code}
              </button>
            ))}
          </div>
          {rates && currency !== 'SAR' && (
            <p style={styles.rateNote}>
              1 SAR = {rates[currency]?.toFixed(4)} {currency}
              {!rates && <span style={{ color: '#aaa' }}> (loading rates...)</span>}
            </p>
          )}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>✈️ Select Your Flight</h3>
            <p style={styles.sectionSub}>Choose your departure city</p>
          </div>
          <div style={styles.flightGrid}>
            {flights.map((flight) => (
              <div
                key={flight.id}
                style={selectedFlight?.id === flight.id ? styles.cardSelected : styles.card}
                onClick={() => setSelectedFlight(flight)}
              >
                <div style={styles.flightTop}>
                  <span style={styles.flightEmoji}>{flight.emoji}</span>
                  <div>
                    <p style={styles.flightFrom}>From {flight.from}</p>
                    <p style={styles.flightAirline}>{flight.airline}</p>
                  </div>
                </div>
                <div style={styles.flightBottom}>
                  <span style={styles.flightDuration}>⏱ {flight.duration}</span>
                  <span style={styles.flightPrice}>{convertPrice(flight.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>🏨 Select Your Hotel</h3>
            <p style={styles.sectionSub}>Find the perfect place to stay</p>
          </div>
          <div style={styles.hotelGrid}>
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                style={selectedHotel?.id === hotel.id ? styles.cardSelected : styles.card}
                onClick={() => setSelectedHotel(hotel)}
              >
                <div style={styles.hotelStars}>{'⭐'.repeat(hotel.stars)}</div>
                <h4 style={styles.hotelName}>{hotel.name}</h4>
                <p style={styles.hotelType}>{hotel.type}</p>
                <p style={styles.hotelPrice}>{convertPrice(hotel.price)}/night</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>🎯 Activities</h3>
            <p style={styles.sectionSub}>Optional — add exciting experiences</p>
          </div>
          <div style={styles.actGrid}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                style={selectedActivities.find((a) => a.id === activity.id) ? styles.cardSelected : styles.card}
                onClick={() => toggleActivity(activity)}
              >
                <span style={styles.actEmoji}>{activity.emoji}</span>
                <h4 style={styles.actName}>{activity.name}</h4>
                <p style={styles.actDetail}>⏱ {activity.duration}</p>
                <p style={styles.actPrice}>{convertPrice(activity.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>📅 Number of Days</h3>
          </div>
          <div style={styles.daysRow}>
            <button style={styles.dayBtn} onClick={() => setDays(Math.max(1, days - 1))}>−</button>
            <div style={styles.daysDisplay}>
              <span style={styles.daysNum}>{days}</span>
              <span style={styles.daysLabel}>days</span>
            </div>
            <button style={styles.dayBtn} onClick={() => setDays(days + 1)}>+</button>
          </div>
        </div>

        <button style={styles.bookBtn} onClick={handleBook}>
          Confirm Booking 🌴
        </button>

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
  headerTitle: { fontSize: '36px', color: 'white', margin: '0 0 8px', fontWeight: '800' },
  headerSub: { fontSize: '16px', color: 'rgba(255,255,255,0.8)', margin: 0 },

  content: { padding: '48px', maxWidth: '960px', margin: '0 auto' },

  currencySection: {
    background: 'white', borderRadius: '16px', padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '32px',
  },
  currencyRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px', marginBottom: '8px' },
  curBtn: {
    padding: '8px 18px', background: '#fdf8f3',
    border: '1px solid #e0d5c5', borderRadius: '20px',
    cursor: 'pointer', fontSize: '13px', color: '#5a3e1b', fontWeight: '500',
  },
  curBtnActive: {
    padding: '8px 18px', background: '#8B6340',
    border: '1px solid #8B6340', borderRadius: '20px',
    cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: '600',
  },
  rateNote: { fontSize: '12px', color: '#aaa', margin: '8px 0 0' },

  section: { marginBottom: '40px' },
  sectionHeader: { marginBottom: '20px' },
  sectionTitle: { fontSize: '20px', color: '#5a3e1b', margin: '0 0 4px', fontWeight: '700' },
  sectionSub: { fontSize: '13px', color: '#aaa', margin: 0 },

  flightGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  hotelGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  actGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },

  card: {
    background: 'white', borderRadius: '14px', padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
    border: '2px solid transparent', transition: 'all 0.2s',
  },
  cardSelected: {
    background: 'white', borderRadius: '14px', padding: '20px',
    boxShadow: '0 4px 20px rgba(139,99,64,0.2)', cursor: 'pointer',
    border: '2px solid #8B6340', transition: 'all 0.2s',
  },

  flightTop: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  flightEmoji: { fontSize: '28px' },
  flightFrom: { fontSize: '15px', fontWeight: '700', color: '#5a3e1b', margin: 0 },
  flightAirline: { fontSize: '12px', color: '#aaa', margin: 0 },
  flightBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  flightDuration: { fontSize: '12px', color: '#888' },
  flightPrice: { fontSize: '14px', fontWeight: '700', color: '#8B6340' },

  hotelStars: { fontSize: '14px', marginBottom: '8px' },
  hotelName: { fontSize: '14px', fontWeight: '700', color: '#5a3e1b', margin: '0 0 4px' },
  hotelType: { fontSize: '12px', color: '#aaa', margin: '0 0 8px' },
  hotelPrice: { fontSize: '14px', fontWeight: '700', color: '#8B6340', margin: 0 },

  actEmoji: { fontSize: '28px', display: 'block', marginBottom: '8px' },
  actName: { fontSize: '14px', fontWeight: '700', color: '#5a3e1b', margin: '0 0 6px' },
  actDetail: { fontSize: '12px', color: '#888', margin: '0 0 4px' },
  actPrice: { fontSize: '14px', fontWeight: '700', color: '#8B6340', margin: 0 },

  daysRow: { display: 'flex', alignItems: 'center', gap: '24px' },
  dayBtn: {
    width: '44px', height: '44px', borderRadius: '50%',
    background: '#8B6340', color: 'white', border: 'none',
    fontSize: '22px', cursor: 'pointer',
  },
  daysDisplay: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  daysNum: { fontSize: '36px', fontWeight: '800', color: '#5a3e1b', lineHeight: 1 },
  daysLabel: { fontSize: '12px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' },

  bookBtn: {
    width: '100%', padding: '18px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '14px',
    fontSize: '18px', cursor: 'pointer', fontWeight: '700',
    boxShadow: '0 4px 20px rgba(139,99,64,0.3)',
  },

  successContainer: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#fdf8f3', fontFamily: "'Segoe UI', sans-serif",
  },
  successCard: {
    background: 'white', borderRadius: '24px', padding: '56px',
    textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
    maxWidth: '400px', width: '90%',
  },
  successIcon: { fontSize: '72px', display: 'block', marginBottom: '20px' },
  successTitle: { fontSize: '28px', color: '#5a3e1b', margin: '0 0 12px', fontWeight: '800' },
  successText: { color: '#888', margin: '0 0 32px', fontSize: '15px' },
  successBtn: {
    display: 'block', width: '100%', padding: '14px',
    background: '#8B6340', color: 'white', border: 'none',
    borderRadius: '12px', fontSize: '15px', cursor: 'pointer',
    fontWeight: '600', marginBottom: '12px',
  },
  successBtnOutline: {
    display: 'block', width: '100%', padding: '14px',
    background: 'transparent', color: '#8B6340',
    border: '1px solid #8B6340', borderRadius: '12px',
    fontSize: '15px', cursor: 'pointer',
  },

  footer: { background: '#2c1f10', padding: '24px', textAlign: 'center' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Booking