import React from 'react'
import {Outlet} from 'react-router'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'
import FrontDeskSideNav from '../components/FrontDesk/FdSideBar'

const FrontDeskLayout = () => {
  return (
    <div style={{display:'flex', backgroundColor:'#F5F5F5'}}>
        <FrontDeskSideNav/>
        <div style={{width:'100%'}}>
            <TherapistTopNav/>
          <Outlet/>
        </div>
    </div>
  )
}

export default FrontDeskLayout
