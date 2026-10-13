import { Route } from 'react-router-dom'
import NotFound from '../common/NotFound'
import HomePage from '../web/pages/HomePage'
import MainLayout from '../layouts/MainLayout'

const PublicRoutes = (
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path='*' element={<NotFound />} />
  </Route>
)

export default PublicRoutes
