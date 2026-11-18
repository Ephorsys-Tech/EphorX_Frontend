import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>Checking authentication...</p>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/admin' replace />
}

export default ProtectedRoute
