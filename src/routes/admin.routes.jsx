import { Route } from 'react-router-dom'

import AdminLogin from '../admin/pages/AdminLogin'

import AdminDashboard from '../admin/pages/AdminDashboard'

import ProtectedRoute from './protected.route'
import AdminLayout from '../layouts/AdminLayout'
import Category from '../admin/pages/Category'
import Course from '../admin/pages/Courses'
import AddCourse from '../admin/pages/AddCourse'
import EditCourse from '../admin/pages/EditCourse'
import ViewCourse from '../admin/pages/ViewCourse'
import CategoryDetails from '../admin/pages/CategoryDetails'
import Contacts from '../admin/pages/Contacts'
import EditContactModal from '../admin/modals/EditContactModal'

const AdminRoutes = (
  <Route path='/admin'>
    {/* Public Route */}
    <Route index element={<AdminLogin />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='category' element={<Category/>}/>
        <Route path="category-details/:id" element={<CategoryDetails/>}/>
        <Route path='course' element={<Course/>}/>
        <Route path='add-course' element={<AddCourse/>}/>
        <Route path='edit-course/:id' element={<EditCourse/>}/>
        <Route path='view-course/:id' element={<ViewCourse/>}/>

        <Route path='contacts' element={<Contacts/>}/>
        <Route path='edit-contact' element={<EditContactModal/>}/>
      </Route>
    </Route>
  </Route>
)

export default AdminRoutes
