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
import Webinar from '../admin/pages/webinar/Webinar'
import Trainer from '../admin/pages/trainer/Trainers'
import AddTrainer from '../admin/pages/trainer/AddTrainer'
import EditTrainer from '../admin/pages/trainer/EditTrainer'
import ViewTrainer from '../admin/pages/trainer/ViewTrainer'
import ViewWebinar from '../admin/pages/webinar/ViewWebinar'
import EditWebinar from '../admin/pages/webinar/EditWebinar'
import AddWebinar from '../admin/pages/webinar/AddWebinar'
import Enrollment from '../admin/pages/Enrollment/Enrollment'

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

        <Route path='webinars' element={<Webinar/>}/>
        <Route path='view-webinar/:id' element={<ViewWebinar/>} />
        <Route path='edit-webinar/:id' element={<EditWebinar/>} />
        <Route path='add-webinar' element={<AddWebinar/>} />

        <Route path='trainers' element={<Trainer/>}/>
        <Route path='add-trainer' element={<AddTrainer/>}/>
        <Route path='edit-trainer/:id' element={<EditTrainer/>}/>
        <Route path='view-trainer/:id' element={<ViewTrainer/>}/>

        <Route path='enrollments' element={<Enrollment/>}/>
      </Route>
    </Route>
  </Route>
)

export default AdminRoutes
