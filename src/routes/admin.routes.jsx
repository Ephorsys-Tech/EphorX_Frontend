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
import Job from '../admin/pages/job/Job'
import AddJob from '../admin/pages/job/AddJob'
import EditJob from '../admin/pages/job/EditJob'
import ViewJob from '../admin/pages/job/ViewJob'
import JobApplications from '../admin/pages/jobApplications/JobApplications'
import ViewJobApplication from '../admin/pages/jobApplications/ViewJobApplication'
import EditJobApplication from '../admin/pages/jobApplications/EditJobApplication'
import AddJobApplication from '../admin/pages/jobApplications/AddJobApplication'
import DemoSessions from '../admin/pages/demoSession/DemoSessions'
import AddDemoSession from '../admin/pages/demoSession/AddDemoSession'
import ViewDemoSession from '../admin/pages/demoSession/ViewDemoSession'
import EditDemoSession from '../admin/pages/demoSession/EditDemoSession'
import ViewSyllabusLead from '../admin/pages/syllabusLead/viewSyllabusLead'
import SyllabusLeads from '../admin/pages/syllabusLead/SyllabusLead'
import EditSyllabusLead from '../admin/pages/syllabusLead/EditSyllabusLead'
import CollegeTieUp from '../admin/pages/CollegeTieUp'
import CampaignManagement from '../admin/pages/Campaign'

const AdminRoutes = (
  <Route path='/admin'>
    {/* Public Route */}
    <Route index element={<AdminLogin />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path='dashboard' element={<AdminDashboard />} />

        <Route path='category' element={<Category />} />
        <Route path="category-details/:id" element={<CategoryDetails />} />

        <Route path='course' element={<Course />} />
        <Route path='add-course' element={<AddCourse />} />
        <Route path='edit-course/:id' element={<EditCourse />} />
        <Route path='view-course/:id' element={<ViewCourse />} />

        <Route path='contacts' element={<Contacts />} />
        <Route path='edit-contact' element={<EditContactModal />} />

        <Route path='webinars' element={<Webinar />} />
        <Route path='view-webinar/:id' element={<ViewWebinar />} />
        <Route path='edit-webinar/:id' element={<EditWebinar />} />
        <Route path='add-webinar' element={<AddWebinar />} />

        <Route path='trainers' element={<Trainer />} />
        <Route path='add-trainer' element={<AddTrainer />} />
        <Route path='edit-trainer/:id' element={<EditTrainer />} />
        <Route path='view-trainer/:id' element={<ViewTrainer />} />

        <Route path='enrollments' element={<Enrollment />} />

        <Route path='jobs' element={<Job />} />
        <Route path='add-job' element={<AddJob />} />
        <Route path='view-job/:id' element={<ViewJob />} />
        <Route path='edit-job/:id' element={<EditJob />} />

        <Route path='apply-jobs' element={<JobApplications />} />
        <Route path='add-job-application' element={<AddJobApplication />} />
        <Route path='view-job-application/:id' element={<ViewJobApplication />} />
        <Route path='edit-job-application/:id' element={<EditJobApplication />} />

        <Route path='book-demo' element={<DemoSessions/>}/>
        <Route path='add-demo' element={<AddDemoSession/>}/>
        <Route path='view-demo/:id' element={<ViewDemoSession/>}/>
        <Route path='edit-demo/:id' element={<EditDemoSession/>}/>

        <Route path='syllabus-lead' element={<SyllabusLeads/>}/>
        <Route path='view-lead/:id' element={<ViewSyllabusLead/>}/>
        <Route path='edit-lead/:id' element={<EditSyllabusLead/>}/>

        <Route path='college-tie-ups' element={<CollegeTieUp/>}/>

        <Route path='campaigns' element={<CampaignManagement/>}/>
      </Route>
    </Route>
  </Route>
)

export default AdminRoutes
