import React from 'react'
import NotificationStyles from './AppointmentNotification.module.css'
import { BiSolidAlarm } from "react-icons/bi";

const AppointmentNotification = () => {
  return (
    <div className={NotificationStyles.notificationContainer}>
        <div className={NotificationStyles.notificationIconContainer}>
          <BiSolidAlarm className={NotificationStyles.notificationIcon}/>
        </div>

        <div className={NotificationStyles.notificationSubContainer}>
          <h1 className={NotificationStyles.notificationTitle}>Your Appointment Is Coming Up!</h1>
          <p>Please check your SMS and email for confirmation and pre-appointment reminders.</p>
          <p>If you haven’t received a notification within 24 hours of your session, kindly contact us.</p>
        </div>
   </div>
  )
}

export default AppointmentNotification
