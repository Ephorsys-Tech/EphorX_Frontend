
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('adminToken')
  )

  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminDetails')) || null
    } catch {
      return null
    }
  })

  const login = (token, adminDetails) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminDetails', JSON.stringify(adminDetails))
    setAdmin(adminDetails)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminDetails')
    setAdmin(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
