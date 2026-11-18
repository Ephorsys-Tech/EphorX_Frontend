import { createContext, useContext, useEffect, useState } from 'react'
import { getAdminProfile, logoutAdmin } from '../admin/api/authApi'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session using HTTP-only cookie
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getAdminProfile()

        const adminData =
          response.admin || response.data?.admin || response.data || response

        setAdmin(adminData)
        setIsAuthenticated(true)
      } catch (error) {
        setAdmin(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  // Login
  const login = adminDetails => {
    setAdmin(adminDetails)
    setIsAuthenticated(true)
  }

  // Logout
  const logout = async () => {
    try {
      await logoutAdmin()
    } catch (error) {
      console.error('Logout error:', error.message)
    } finally {
      setAdmin(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        loading,
        login,
        logout
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
