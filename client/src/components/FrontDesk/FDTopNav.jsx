import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

// Tanstack
import { useUsers } from '../../queries/users'

const FDTopNav = () => {
  const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
  
  if (userDataIsLoading) return <div>Loading...</div>;
  if (userDataError) return <div>⚠ Error: {userDataError.message}</div>;
  return (
    <div className={NavStyles.main}>
      <h1>Appointment and Patient Record Management System</h1>
      <div>
        <ul className={NavStyles.navItems}>
            <li><IoIosNotifications/></li>
            <li><CgProfile/></li>
            <p>{userData.userRole}: {userData.firstName}</p>
        </ul>
      </div>

    </div>
  )
}

export default TherapistNavBar
