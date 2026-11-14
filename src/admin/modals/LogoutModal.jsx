import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { LogOut, X, LoaderCircle } from 'lucide-react'
import { logoutAdmin } from '../api/authApi'


const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogout = async () => {
    if (loading) return

    setLoading(true)
    setError('')

    try {
      // Call centralized logout API
      await logoutAdmin()

      // Clear local authentication data
      localStorage.removeItem('token')

      // Close modal and redirect
      onClose()
      navigate('/admin', { replace: true })
    } catch (err) {
      console.error('Logout Error:', err)

      setError(err.message || 'Logout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div
      className='fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4'
      onMouseDown={event => {
        if (event.target === event.currentTarget && !loading) {
          onClose()
        }
      }}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='logout-modal-title'
        className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'
      >
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            disabled={loading}
            aria-label='Close logout dialog'
            className='rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50'
          >
            <X size={20} />
          </button>
        </div>

        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600'>
            <LogOut size={26} />
          </div>

          <h2
            id='logout-modal-title'
            className='text-lg font-semibold text-slate-800'
          >
            Logout Account
          </h2>

          <p className='mt-2 text-sm leading-relaxed text-slate-500'>
            Are you sure you want to logout from your account?
          </p>

          {error && (
            <p role='alert' className='mt-4 text-sm text-red-600'>
              {error}
            </p>
          )}
        </div>

        <div className='mt-6 grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={loading}
            className='flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type='button'
            onClick={handleLogout}
            disabled={loading}
            className='flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-70'
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className='animate-spin' />
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LogoutModal
