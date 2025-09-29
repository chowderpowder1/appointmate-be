import React from 'react'
import {Outlet} from 'react-router'
import TherapistSideNav from '../components/Therapist/TherapistSideBar'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'

const TherapistLayout = () => {
  return (
    <div style={{display:'flex', backgroundColor:'#F5F5F5'}}>
        <TherapistSideNav/>
        <div style={{width:'100%'}}>
            <TherapistTopNav/>
          <Outlet/>
        </div>
    </div>
  )
}

export default TherapistLayout
