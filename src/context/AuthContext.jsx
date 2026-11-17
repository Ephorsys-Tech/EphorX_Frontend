import { createContext, useContext, useEffect, useState } from 'react'
import { getAdminProfile, logoutAdmin } from '../admin/api/authApi'


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  // Restore session
  const checkAuth = async () => {
    try {
      const data = await getAdminProfile()

      setAdmin(data.admin || data)
      setIsAuthenticated(true)
    } catch {
      setAdmin(null)
      setIsAuthenticated(false)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  // Login
  const login = async () => {
    await checkAuth()
  }

  // Logout
  const logout = async () => {
    try {
      await logoutAdmin()
    } finally {
      setAdmin(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        authLoading,
        login,
        logout,
        checkAuth
      }}
    >
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
