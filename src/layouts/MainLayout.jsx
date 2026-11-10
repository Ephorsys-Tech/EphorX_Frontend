import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'

const MainLayout = () => {
  const { pathname } = useLocation()

  // Home hero already has its own top spacing
  const isHome = pathname === '/'

  return (
    <div>
      <Navbar />

      <main className={`min-h-screen ${isHome ? '' : 'pt-16 lg:pt-28'}`}>
        <Outlet />
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  )
}

export default MainLayout
