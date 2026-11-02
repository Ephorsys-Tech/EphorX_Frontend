import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />

       <FloatingContactButtons/>
    </div>
  )
}

export default MainLayout
