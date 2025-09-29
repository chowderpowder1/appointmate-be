import React from 'react'
import BeltStyles from './NotificationBelt.module.css'
import TotalIcon from '../../assets/apptDashboard/Book_check.png'
import ServedIcon from '../../assets/apptDashboard/Done.png'
import PendingIcon from '../../assets/apptDashboard/Pending.png'
import CancelledIcon from '../../assets/apptDashboard/close_ring.png'
import RescheduledIcon from '../../assets/apptDashboard/Reschedule.png'
import { FaListAlt } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";

const NotificationBelt = () => {
  return (
    <div className={BeltStyles.beltContainer}>
      <div className={`${BeltStyles.totalApptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <FaListAlt className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>26</p>
            <p className={BeltStyles.apptTitle}>Total Appointments</p>
          </div>
      </div>
      <div className={`${BeltStyles.dailyApptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <FaCheck className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>5</p>
            <p className={BeltStyles.apptTitle}>Appointments Served Today</p>
          </div>
      </div>
      <div className={`${BeltStyles.pendingAptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <FaEllipsisH className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>7</p>
            <p className={BeltStyles.apptTitle}>Appointments Pending</p>
          </div>
      </div>
      <div className={`${BeltStyles.cancelledAptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <ImCross className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>8</p>
            <p className={BeltStyles.apptTitle}>Appointments Cancelled </p>
          </div>
      </div>
      <div className={`${BeltStyles.rescheduledAptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <FaPhoneAlt className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>6</p>
            <p className={BeltStyles.apptTitle}>Appointments Rescheduled </p>
          </div>
      </div>

      {/* <div className={`${BeltStyles.todayApptContainer} ${BeltStyles.apptContainer}`}>
        <h4 className={BeltStyles.apptTitle}>Appointments Served Today</h4>
        <p className={BeltStyles.apptSubtext}>02</p>
        <img className={BeltStyles.containerIcon} src={ServedIcon} alt="" />
      </div>

      <div className={`${BeltStyles.pendingApptContainer} ${BeltStyles.apptContainer}`}>
        <h4 className={BeltStyles.apptTitle}>Appointments Pending</h4>
        <p className={BeltStyles.apptSubtext}>12</p>
        <img className={BeltStyles.containerIcon} src={PendingIcon} alt="" />
      </div>

      <div className={`${BeltStyles.cancelledApptContainer} ${BeltStyles.apptContainer}`}>
        <h4 className={BeltStyles.apptTitle}>Appointments Cancelled</h4>
        <p className={BeltStyles.apptSubtext}>
            17
        </p>
        <img className={BeltStyles.containerIcon} src={CancelledIcon} alt="" />
      </div>

      <div className={`${BeltStyles.rescheduledApptContainer} ${BeltStyles.apptContainer}`}>
        <h4 className={BeltStyles.apptTitle}>Appointments Rescheduled</h4>
        <p className={BeltStyles.apptSubtext}>
            8
        </p>
        <img className={BeltStyles.containerIcon} src={RescheduledIcon} alt="" />
      </div> */}

    </div>
  )
}

export default NotificationBelt
