import { BrowserRouter, Routes, useLocation } from 'react-router-dom'
import PublicRoutes from './public.routes'
import AdminRoutes from './admin.routes'
import ScrollToTop from '../components/ScrollToTop'
import CampaignPopup from '../admin/components/CampaignPopUp'

const AppContent = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <CampaignPopup/>}

      <Routes>
        {PublicRoutes}
        {AdminRoutes}
      </Routes>
    </>
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default AppRoutes
