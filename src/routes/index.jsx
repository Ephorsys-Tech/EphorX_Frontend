import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './public.routes'
import AdminRoutes from './admin.routes'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
