import React from 'react'
import {Outlet} from 'react-router'
import AdminSideNav from '../components/AdminPortal/AdminSideBar'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'

const TherapistLayout = () => {
  return (
    <div style={{display:'flex', backgroundColor:'#F5F5F5'}}>
      
        <AdminSideNav/>
        <div style={{width:'100%'}}>
            <TherapistTopNav/>
          <Outlet/>
        </div>
    </div>
  )
}

export default TherapistLayout
