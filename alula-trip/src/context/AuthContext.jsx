import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('alula_user')) || null
  )

  // Register
  function register(name, email, password) {
    const newUser = { name, email, password }
    localStorage.setItem('alula_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  // Login
  function login(email, password) {
    const savedUser = JSON.parse(localStorage.getItem('alula_user'))
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUser(savedUser)
      return true
    }
    return false
  }

  // Logout
  function logout() {
    localStorage.removeItem('alula_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext)
}