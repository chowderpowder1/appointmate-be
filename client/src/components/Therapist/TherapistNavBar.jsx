import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const TherapistNavBar = () => {
  return (
    <div className={NavStyles.main}>
      <h1>Appointment and Patient Record Management System</h1>
      <div>
        <ul className={NavStyles.navItems}>
            <li><IoIosNotifications/></li>
            <li><CgProfile/></li>
            <p>PT - Juan Dela Cruz</p>
        </ul>
      </div>

    </div>
  )
}

export default TherapistNavBar
