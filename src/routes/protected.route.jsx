import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useAuth()

  if (authLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/admin' replace />
}

export default ProtectedRoute
