import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import alulaImg from './photos/Alula.jpg'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin() {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={styles.container}>

      <div style={styles.left}>
        <div style={styles.leftOverlay}>
          <div style={styles.brand} onClick={() => navigate('/')}>
            <span style={styles.brandLogo}>🌴</span>
            <span style={styles.brandName}>AlUla Trip</span>
          </div>
          <div style={styles.leftContent}>
            <h2 style={styles.leftTitle}>Your Journey<br />Begins Here</h2>
            <p style={styles.leftSub}>Plan your perfect trip to Saudi Arabia's most breathtaking destination</p>
            <div style={styles.features}>
              <div style={styles.feature}>✈️ Book flights from any city</div>
              <div style={styles.feature}>🏨 Find perfect hotels</div>
              <div style={styles.feature}>🗺 Interactive map</div>
              <div style={styles.feature}>🌤 Live weather updates</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Welcome Back 👋</h2>
          <p style={styles.subtitle}>Sign in to continue planning your AlUla adventure</p>

          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button style={styles.btn} onClick={handleLogin}>
            Sign In →
          </button>

          <p style={styles.link}>
            Don't have an account? <Link to="/register" style={styles.linkA}>Create one free</Link>
          </p>
        </div>
      </div>

    </div>
  )
}

const styles = {
  container: {
    display: 'flex', minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },

  left: {
    flex: 1,
    background: `linear-gradient(160deg, rgba(139,99,64,0.7) 0%, rgba(90,62,27,0.85) 100%), url(${alulaImg}) center/cover no-repeat`,
  },
  leftOverlay: {
    height: '100%', padding: '40px 48px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: '10px',
    cursor: 'pointer',
  },
  brandLogo: { fontSize: '32px' },
  brandName: { fontSize: '22px', fontWeight: '700', color: 'white' },
  leftContent: { paddingBottom: '60px' },
  leftTitle: {
    fontSize: '44px', fontWeight: '900', color: 'white',
    lineHeight: 1.2, margin: '0 0 16px',
  },
  leftSub: {
    fontSize: '16px', color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.7, margin: '0 0 32px', maxWidth: '340px',
  },
  features: { display: 'flex', flexDirection: 'column', gap: '12px' },
  feature: {
    fontSize: '15px', color: 'rgba(255,255,255,0.9)',
    background: 'rgba(255,255,255,0.12)',
    padding: '10px 16px', borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.15)',
    maxWidth: '260px',
  },

  right: {
    width: '460px', background: '#fdf8f3',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '48px',
  },
  formBox: { width: '100%' },
  title: { fontSize: '28px', fontWeight: '800', color: '#5a3e1b', margin: '0 0 8px' },
  subtitle: { fontSize: '14px', color: '#aaa', margin: '0 0 32px', lineHeight: 1.6 },

  errorBox: {
    background: '#fff3f3', border: '1px solid #ffcdd2',
    color: '#c62828', padding: '12px 16px', borderRadius: '10px',
    fontSize: '13px', marginBottom: '20px',
  },

  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#5a3e1b', marginBottom: '8px' },
  input: {
    width: '100%', padding: '12px 16px',
    border: '1px solid #e0d5c5', borderRadius: '10px',
    fontSize: '14px', color: '#333', background: 'white',
    boxSizing: 'border-box', outline: 'none',
  },

  btn: {
    width: '100%', padding: '14px',
    background: 'linear-gradient(135deg, #c8a97e, #8B6340)',
    color: 'white', border: 'none', borderRadius: '12px',
    fontSize: '16px', cursor: 'pointer', fontWeight: '700',
    marginBottom: '20px', marginTop: '8px',
    boxShadow: '0 4px 16px rgba(139,99,64,0.3)',
  },

  link: { textAlign: 'center', fontSize: '13px', color: '#888', margin: 0 },
  linkA: { color: '#8B6340', fontWeight: '600', textDecoration: 'none' },
}

export default Login