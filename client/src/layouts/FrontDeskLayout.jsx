import React from 'react'
import {Outlet} from 'react-router'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'
import FrontDeskSideNav from '../components/FrontDesk/FdSideBar'

// Tanstack
import { useUsers } from '../queries/users'

const FrontDeskLayout = () => {

  // const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
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
