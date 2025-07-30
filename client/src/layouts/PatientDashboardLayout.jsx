import React from 'react'
import {Outlet} from 'react-router'
import Navbar from '../components/Ui/Navbar'
import PatientSideBar from '../components/PatientPortal/PatientSideBar'

const PatientDashboardLayout = () => {
  return (
    <div>
        <Navbar/>
        <div style={{display:'flex'}}>
          <PatientSideBar/>
          <Outlet/>
        </div>    
    </div>
  )
}

export default PatientDashboardLayout

