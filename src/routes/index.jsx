import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './public.routes'
import AdminRoutes from './admin.routes'
import ScrollToTop from '../components/ScrollToTop'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {PublicRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
