import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WEATHER_KEY = '2bc4dccdaae98c73832b7515103e064a'

function Weather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function fetchWeather() {
    setLoading(true)
    setError('')
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=AlUla&appid=${WEATHER_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=AlUla&appid=${WEATHER_KEY}&units=metric&cnt=40`)
      ])
      const currentData = await currentRes.json()
      const forecastData = await forecastRes.json()
      if (currentData.cod !== 200) { setError(`Error: ${currentData.message}`); return }
      setWeather(currentData)
      const dailyMap = {}
      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0]
        if (!dailyMap[date]) dailyMap[date] = item
      })
      setForecast(Object.values(dailyMap).slice(1, 6))
    } catch { setError('Failed to load weather. Please try again.') }
    finally { setLoading(false) }
  }

  function getTripAdvice(temp, description) {
    const tips = []
    if (temp <= 20) tips.push({ text: 'Cold weather — wear warm layers 🧥', color: '#1565C0' })
    else if (temp <= 30) tips.push({ text: 'Great time to visit AlUla! ✅', color: '#2e7d32' })
    else if (temp <= 38) tips.push({ text: 'Hot — visit early morning or evening 🌅', color: '#f57c00' })
    else tips.push({ text: 'Very hot — stay hydrated and plan indoor activities 🏛', color: '#c62828' })
    if (description.includes('rain')) tips.push({ text: "Don't forget your umbrella! ☂️", color: '#1976D2' })
    if (description.includes('sand') || description.includes('dust')) tips.push({ text: 'Dusty — wear a face mask 😷', color: '#795548' })
    if (description.includes('storm')) tips.push({ text: 'Storm expected — stay indoors ⛈', color: '#B71C1C' })
    if (temp >= 38) tips.push({ text: 'Drink plenty of water 💧', color: '#0277BD' })
    if (temp <= 15) tips.push({ text: 'Very cold — bring a heavy jacket 🧤', color: '#283593' })
    return tips
  }

  function getDayName(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  function getWeatherEmoji(description) {
    if (description.includes('clear')) return '☀️'
    if (description.includes('cloud')) return '⛅'
    if (description.includes('rain')) return '🌧'
    if (description.includes('storm')) return '⛈'
    if (description.includes('snow')) return '❄️'
    if (description.includes('sand') || description.includes('dust')) return '🌪'
    return '🌤'
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
          <button style={styles.navBtn} onClick={() => navigate('/map')}>Map</button>
          <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
          <button style={styles.navBtn} onClick={() => navigate('/booking')}>Book a Trip</button>
        </div>
      </nav>

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>AlUla Weather 🌤</h1>
          <p style={styles.headerSub}>Check current weather & 5-day forecast before planning your trip</p>
          <button style={styles.fetchBtn} onClick={fetchWeather} disabled={loading}>
            {loading ? '⏳ Loading...' : '🌡 Get Weather & Forecast'}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        {weather && (
          <>
            <div style={styles.currentCard}>
              <div style={styles.currentLeft}>
                <h2 style={styles.cityName}>AlUla, Saudi Arabia</h2>
                <p style={styles.weatherDesc}>
                  {getWeatherEmoji(weather.weather[0].description)} {weather.weather[0].description}
                </p>
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>FEELS LIKE</span>
                    <span style={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>HUMIDITY</span>
                    <span style={styles.detailValue}>{weather.main.humidity}%</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>WIND</span>
                    <span style={styles.detailValue}>{weather.wind.speed} m/s</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>MAX TEMP</span>
                    <span style={styles.detailValue}>{Math.round(weather.main.temp_max)}°C</span>
                  </div>
                </div>
              </div>
              <div style={styles.currentRight}>
                <span style={styles.bigTemp}>{Math.round(weather.main.temp)}°</span>
                <span style={styles.bigUnit}>C</span>
              </div>
            </div>

            <div style={styles.tipsSection}>
              <h3 style={styles.tipsTitle}>Travel Tips</h3>
              <div style={styles.tipsGrid}>
                {getTripAdvice(weather.main.temp, weather.weather[0].description).map((tip, i) => (
                  <div key={i} style={{ ...styles.tipCard, borderLeft: `4px solid ${tip.color}`, background: tip.color + '10' }}>
                    <p style={{ color: tip.color, margin: 0, fontWeight: '600', fontSize: '14px' }}>{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {forecast.length > 0 && (
              <div style={styles.forecastSection}>
                <h3 style={styles.forecastTitle}>5-Day Forecast</h3>
                <div style={styles.forecastGrid}>
                  {forecast.map((day) => (
                    <div key={day.dt} style={styles.forecastCard}>
                      <p style={styles.forecastDay}>{getDayName(day.dt_txt)}</p>
                      <span style={styles.forecastEmoji}>{getWeatherEmoji(day.weather[0].description)}</span>
                      <p style={styles.forecastTemp}>{Math.round(day.main.temp)}°C</p>
                      <p style={styles.forecastDesc}>{day.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!weather && !loading && !error && (
          <div style={styles.emptyState}>
            <span style={styles.emptyEmoji}>🌤</span>
            <p style={styles.emptyText}>Press the button above to get AlUla's current weather</p>
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
    padding: '56px 48px',
  },
  headerContent: { maxWidth: '960px', margin: '0 auto' },
  headerTitle: { fontSize: '40px', color: 'white', margin: '0 0 12px', fontWeight: '800' },
  headerSub: { fontSize: '16px', color: 'rgba(255,255,255,0.8)', margin: '0 0 28px' },
  fetchBtn: {
    padding: '14px 28px', background: 'white',
    color: '#8B6340', border: 'none', borderRadius: '12px',
    fontSize: '15px', cursor: 'pointer', fontWeight: '700',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },

  content: { padding: '40px 48px', maxWidth: '960px', margin: '0 auto' },
  errorBox: {
    background: '#fff3f3', border: '1px solid #ffcdd2',
    color: '#c62828', padding: '14px 18px', borderRadius: '12px',
    fontSize: '14px', marginBottom: '24px',
  },

  currentCard: {
    background: 'white', borderRadius: '20px',
    padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '24px',
  },
  currentLeft: { flex: 1 },
  cityName: { fontSize: '24px', color: '#5a3e1b', margin: '0 0 6px', fontWeight: '800' },
  weatherDesc: { fontSize: '16px', color: '#888', margin: '0 0 24px', textTransform: 'capitalize' },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  detailItem: {
    background: '#fdf8f3', borderRadius: '12px',
    padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px',
  },
  detailLabel: { fontSize: '11px', color: '#aaa', fontWeight: '700', letterSpacing: '0.5px' },
  detailValue: { fontSize: '20px', fontWeight: '800', color: '#5a3e1b' },
  currentRight: { display: 'flex', alignItems: 'flex-start', paddingLeft: '40px' },
  bigTemp: { fontSize: '96px', fontWeight: '900', color: '#8B6340', lineHeight: 1 },
  bigUnit: { fontSize: '32px', fontWeight: '700', color: '#8B6340', marginTop: '16px' },

  tipsSection: { marginBottom: '32px' },
  tipsTitle: { fontSize: '20px', color: '#5a3e1b', margin: '0 0 16px', fontWeight: '700' },
  tipsGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  tipCard: { padding: '14px 18px', borderRadius: '12px' },

  forecastSection: { },
  forecastTitle: { fontSize: '20px', color: '#5a3e1b', margin: '0 0 16px', fontWeight: '700' },
  forecastGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' },
  forecastCard: {
    background: 'white', borderRadius: '16px',
    padding: '20px', textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  forecastDay: { fontSize: '12px', color: '#888', margin: '0 0 10px', fontWeight: '600' },
  forecastEmoji: { fontSize: '32px', display: 'block', margin: '0 0 10px' },
  forecastTemp: { fontSize: '22px', fontWeight: '800', color: '#8B6340', margin: '0 0 4px' },
  forecastDesc: { fontSize: '11px', color: '#aaa', margin: 0, textTransform: 'capitalize' },

  emptyState: {
    textAlign: 'center', padding: '80px 0',
  },
  emptyEmoji: { fontSize: '64px', display: 'block', marginBottom: '16px' },
  emptyText: { fontSize: '16px', color: '#aaa' },

  footer: { background: '#2c1f10', padding: '24px', textAlign: 'center', marginTop: '40px' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
}

export default Weather