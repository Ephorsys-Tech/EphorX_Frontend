import {
  LayoutDashboard,
  Package,
  X,
  ShoppingBag,
  Users,
  Images
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/lead', label: 'Leads', icon: Users },
  { path: '/admin/category', label: 'Category', icon: Package },
  { path: '/admin/product', label: 'Product', icon: ShoppingBag },
  { path: '/admin/jobs', label: 'Jobs', icon: ShoppingBag },
  { path: '/admin/applicants', label: 'Applicants', icon: Users },
  { path: '/admin/gallery', label: 'Gallery', icon: Images }
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col
          transition-transform duration-300
          lg:relative lg:translate-x-0 lg:shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className='flex items-center justify-between px-6 py-1 border-b border-white/10'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden'>
              <img
                src='/mylogo.png'
                alt='Savera Logo'
                className='w-full h-full object-contain'
                onError={e => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            <div>
              <p className='text-md font-extrabold tracking-tight leading-tight'>
                SAVERA
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type='button'
            aria-label='Close sidebar'
            className='lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition'
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-1'>
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
