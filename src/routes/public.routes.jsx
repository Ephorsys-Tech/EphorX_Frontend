import { Route } from 'react-router-dom'
import NotFound from '../common/NotFound'
import HomePage from '../web/pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import FAQ from '../web/pages/Faq'
import Contact from '../web/pages/Contact'
import About from '../web/pages/About'
import Courses from '../web/pages/Courses'
import CourseDetails from '../components/course/CourseDetails'

const PublicRoutes = (
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path='/faq' element={<FAQ />} />
    <Route path='/Courses' element={<Courses />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/about' element={<About />} />
    <Route path="/CourseDetails" element={<CourseDetails />} />
    <Route path='*' element={<NotFound />} />
  </Route>
)

export default PublicRoutes
