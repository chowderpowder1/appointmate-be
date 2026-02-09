import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/ClinicWebsite/Homepage'
import AboutPage from './pages/ClinicWebsite/Aboutpage'
import HmoPage from './pages/ClinicWebsite/HmoPage'
import AppointmentPage from './pages/ClinicWebsite/AppointmentPage'
import WelcomePage from './pages/PatientPortal/WelcomePage'
import PasswordResetPage from './pages/ClinicWebsite/PasswordResetPage'
import PatientDashboardLayout from './layouts/PatientDashboardLayout'
import PatientDashboard from './pages/PatientPortal/PatientDashboard'
import PatientProfile from './pages/PatientPortal/PatientProfile'
import UpdatePatientInfo from './pages/PatientPortal/UpdatePatientInfo'
import PatientTreatmentProgress from './pages/PatientPortal/PatientTreatmentProgress'
import PatientAppointmentDetails from './pages/PatientPortal/PxAppointmentDetailsPage'
import './App.css'
import MyDocuments from './pages/PatientPortal/MyDocumentsPage'
import PatientRecord from './pages/PatientPortal/PatientRecordPage'
import Reports from './pages/PatientPortal/ReportsPage'
import TesTest from './pages/TesTest'

import TherapistLayout from './layouts/TherapistLayout'
import TherapistDashboard from './pages/Therapist/TherapistDashboard'
import ManageAppointments from './pages/Therapist/ManageAppointments'
import EditAppointments from './pages/Therapist/EditApptPage'
import PatientRecordsOverview from './pages/Therapist/PatientRecordsOverviewPage'
import AddPatientRecord from './pages/Therapist/AddPatientRecordPage'
import EditPatientRecord from './pages/Therapist/EditPatientRecordPage'
import ViewPatientRecord from './pages/Therapist/ViewPxRecordPage'
import TherapistDocuments from './pages/Therapist/TherapistDocumentsPage'
import OnboardingPage from './pages/OnBoarding/OnboardingPage'

import FrontDeskLayout from './layouts/FrontDeskLayout'
import FdDashboard from './pages/FrontDeskPortal/FdDashboard'
import FdManageAppt from './pages/FrontDeskPortal/FdManageAppt'
import FdManageDocuments from './pages/FrontDeskPortal/FdManageDocuments'

import AdminLayout from './layouts/AdminLayout'
import RBAC from './pages/AdminPortal/RbacPage'
import InvalidToken from './pages/InvalidToken'

import NotFound from './pages/NotFound'



import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Homepage/>}/>
      <Route path='about' element={<AboutPage/>}/>
      <Route path='services' element=''/>
      <Route path='/HMOs' element={<HmoPage/>}/>
      <Route path='/FAQs' element=''/>
      <Route path='/Contact-Us' element=''/>
      <Route path='/Appointment' element={<AppointmentPage/>}/>
      <Route path='/reset-password/' element={<PasswordResetPage/>}/>
    </Route>

    <Route path='/patient' element={<PatientDashboardLayout/>}>
      <Route path='dashboard' element={<PatientDashboard/>}/>
      <Route path='profile' element={<PatientProfile/>}/>
      <Route path='profile/update-my-info' element={<UpdatePatientInfo/>}/>
      <Route path='treatment-progress' element={<PatientTreatmentProgress/>}/>
      <Route path='treatment-progress/appointment-details/:id' element={<PatientAppointmentDetails/>}/>
      <Route path='patient-record' element={<PatientRecord/>}/>
      <Route path='documents' element={<MyDocuments/>}/>
      <Route path='reports' element={<Reports/>}/>
      <Route path='test' element={<OnboardingPage/>}/>
    </Route>

    <Route path='/therapist' element={<TherapistLayout/>}>
      <Route path='dashboard' element={<TherapistDashboard/>}/>
      <Route path='manage-appointments' element={<ManageAppointments/>}/>
      <Route path='manage-appointments/edit-appointment/:id' element={<EditAppointments/>}/>
      <Route path='patient-records' element={<PatientRecordsOverview/>}/>
      <Route path='patient-records/add-patient-record' element={<AddPatientRecord/>}/>
      <Route path='patient-records/initial-eval/:id' element={<EditPatientRecord/>}/>
      <Route path='patient-records/view-patient-record/:id' element={<ViewPatientRecord/>}/>
      <Route path='my-documents' element={<TherapistDocuments/>}/>
    </Route>

    <Route path='/front-desk' element={<FrontDeskLayout/>}>
      <Route path='dashboard' element={<FdDashboard/>}/>
      <Route path='manage-appointments' element={<FdManageAppt/>}/>
      <Route path='manage-appointments/edit-appointment/:id' element={<EditAppointments/>}/>
      <Route path='patient-records' element={<PatientRecordsOverview/>}/>
      <Route path='patient-records/add-patient-record' element={<AddPatientRecord/>}/>
      <Route path='patient-records/view-patient-record/:id' element={<ViewPatientRecord/>}/>
      <Route path='manage-documents' element={<FdManageDocuments/>}/>
      <Route path='manage-documents/view-patient-document/:id' element={<FdManageDocuments/>}/>
    </Route>

    <Route path='/admin' element={<AdminLayout/>}>
      <Route path='manage-roles' element={<RBAC/>}/>
    </Route>

    <Route path='/login' element={<WelcomePage/>}/>

    <Route path='/' element={<MainLayout/>}>
      <Route path='/expired-link' element={<InvalidToken/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Route>

  </>
  ))
  
  return ( 
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
)
}

export default App
