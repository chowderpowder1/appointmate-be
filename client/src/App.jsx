import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/ClinicWebsite/Homepage'
import AboutPage from './pages/ClinicWebsite/Aboutpage'
import HmoPage from './pages/ClinicWebsite/HmoPage'
import AppointmentPage from './pages/ClinicWebsite/AppointmentPage'
import WelcomePage from './pages/PatientPortal/WelcomePage'
import PatientDashboardLayout from './layouts/PatientDashboardLayout'
import PatientDashboard from './pages/PatientPortal/PatientDashboard'
import PatientProfile from './pages/PatientPortal/PatientProfile'
import PatientTreatmentProgress from './pages/PatientPortal/PatientTreatmentProgress'
import PatientAppointmentDetails from './pages/PatientPortal/PxAppointmentDetailsPage'
import './App.css'
import MyDocuments from './pages/PatientPortal/MyDocumentsPage'
import PatientRecord from './pages/PatientPortal/PatientRecordPage'
import Reports from './pages/PatientPortal/ReportsPage'
import TesTest from './pages/TesTest'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Homepage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/services' element=''/>
      <Route path='/HMOs' element={<HmoPage/>}/>
      <Route path='/FAQs' element=''/>
      <Route path='/Contact-Us' element=''/>
      <Route path='/Appointment' element={<AppointmentPage/>}/>
    </Route>

    <Route path='/patient' element={<PatientDashboardLayout/>}>
      <Route path='dashboard' element={<PatientDashboard/>}/>
      <Route path='profile' element={<PatientProfile/>}/>
      <Route path='treatment-progress' element={<PatientTreatmentProgress/>}/>
      <Route path='treatment-progress/appointment-details/:id' element={<PatientAppointmentDetails/>}/>
      <Route path='patient-record' element={<PatientRecord/>}/>
      <Route path='documents' element={<MyDocuments/>}/>
      <Route path='reports' element={<Reports/>}/>
      <Route path='test' element={<TesTest/>}/>
    </Route>

    <Route path='/Welcome' element={<WelcomePage/>}/>
  </>
  ))
  
  return ( <RouterProvider router={router}/>)
}

export default App
