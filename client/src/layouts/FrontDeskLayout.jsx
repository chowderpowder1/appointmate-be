import React from 'react'
import {Outlet} from 'react-router'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'
import FrontDeskSideNav from '../components/FrontDesk/FdSideBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
              <ToastContainer
                position="top-right"
                newestOnTop
                closeOnClick
                pauseOnHover
              />
    </div>
  )
}

export default FrontDeskLayout
