import React from 'react'
import RescheduleStyles from './RescheduleStatus.module.css'
import { FaExclamation } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

const RescheduleStatus = () => {
  return (
    <div className={RescheduleStyles.rescheduleContainer}>
        <FaExclamation className={RescheduleStyles.statusIcon}/>

        <div className={RescheduleStyles.statusTextContainer}>
          <h5 className={RescheduleStyles.statusTitle}>Your Reschedule Request Is Under Review</h5>
          <p className={RescheduleStyles.statusText}>You've requested to move your appointment to 22 MAY 2025, 01:00 PM. </p>
          <p>This request is currently under review by the assigned therapist.</p>

          <div className={RescheduleStyles.statusReminder}>
            <div className={RescheduleStyles.statusReminderItem}>
                <FaExclamationCircle />
                <p>Approval may take some time, depending on your therapist’s availability.</p>
            </div>
            <div className={RescheduleStyles.statusReminderItem}>
                <FaExclamationCircle />
                <p>You’ll receive a notification once your new schedule is confirmed.</p>
            </div>
            <div className={RescheduleStyles.statusReminderItem}>
                <FaExclamationCircle />
                <p>For urgent concerns or assistance, feel free to contact the clinic directly.</p>
            </div>
          </div>

        </div>
        
        <div className={RescheduleStyles.statusBtnContainer}>
          <button className={RescheduleStyles.statusCancelBtn}>Cancel Request</button>
          <button className={RescheduleStyles.statusViewBtn}>View</button>
        </div>        

    </div>
  )
}

export default RescheduleStatus
