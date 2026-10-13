import { Menu, User, Maximize, Minimize } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const TopBar = ({ setSidebarOpen }) => {
  const dropdownRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Static admin details (replace when needed)
  const admin = {
    name: 'Admin',
    role: 'Administrator'
  }

  // Toggle Fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error)
    }
  }

  // Detect Fullscreen Changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Close Dropdown When Clicking Outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const initials = admin.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className='relative z-10 bg-white border-b border-slate-200 px-6 h-15 flex items-center justify-between shrink-0'>
      {/* Left */}
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition'
          onClick={() => setSidebarOpen(true)}
          aria-label='Open sidebar'
        >
          <Menu size={18} />
        </button>

        <span className='text-[15px] font-medium tracking-widest text-slate-800'>
          SAVERA
        </span>
      </div>

      {/* Right */}
      <div className='flex items-center gap-3'>
        {/* Fullscreen Button */}
        <button
          type='button'
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className='w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer'
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Profile Dropdown */}
        <div className='relative' ref={dropdownRef}>
          <button
            type='button'
            className='flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 transition cursor-pointer'
          >
            <div className='hidden sm:block text-right'>
              <p className='text-[13px] font-medium text-slate-800 leading-tight'>
                {admin.name}
              </p>

              <p className='text-[11px] uppercase tracking-wider text-slate-400 leading-tight'>
                {admin.role}
              </p>
            </div>

            <div className='w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[13px] font-medium text-blue-700'>
              <User size={18} />
            </div>
          </button>

        </div>
      </div>
    </header>
  )
}

export default TopBar
