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

//Tanstack Import
import { useGetApptOverview } from '../../queries/useEmployees'

const NotificationBelt = () => {

  const { data: apptOverviewData, isLoading: apptOverviewDataIsLoading, error: apptOverviewDataError} = useGetApptOverview();

  if (apptOverviewDataIsLoading) return <div>Loading...</div>;
  if (apptOverviewDataError) return <div>Error: {apptOverviewDataError.message}</div>
  console.log(apptOverviewData)
  return (
    <div className={BeltStyles.beltContainer}>
      <div className={`${BeltStyles.totalApptContainer} ${BeltStyles.apptContainer}`}>
          
          <div className={BeltStyles.iconContainer}>
            <FaListAlt className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>{apptOverviewData.totalAppt}</p>
            <p className={BeltStyles.apptTitle}>Total Appointments</p>
          </div>
      </div>
      <div className={`${BeltStyles.dailyApptContainer} ${BeltStyles.apptContainer}`}>
          <div className={BeltStyles.iconContainer}>
            <FaCheck className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>{apptOverviewData.servedAppt}</p>
            <p className={BeltStyles.apptTitle}>Appointments Served Today</p>
            

          </div>
      </div>
      <div className={`${BeltStyles.pendingAptContainer} ${BeltStyles.apptContainer}`}>
          <div className={BeltStyles.iconContainer}>
            <FaEllipsisH className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>{apptOverviewData.pendingAppt}</p>
            <p className={BeltStyles.apptTitle}>Appointments Pending</p>
            
          </div>
      </div>
      <div className={`${BeltStyles.cancelledAptContainer} ${BeltStyles.apptContainer}`}>
          <p className={BeltStyles.apptHelperText}>For the last 7 days </p>
          <div className={BeltStyles.iconContainer}>
            <ImCross className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>{apptOverviewData.cancelledAppt}</p>
            <p className={BeltStyles.apptTitle}>Appointments Cancelled </p>
            
          </div>
      </div>
      <div className={`${BeltStyles.rescheduledAptContainer} ${BeltStyles.apptContainer}`}>
          <p className={BeltStyles.apptHelperText}>For the last 7 days </p>
          <div className={BeltStyles.iconContainer}>
            <FaPhoneAlt className={BeltStyles.icon}/>
          </div>
          <div className={BeltStyles.textContainer}>
            <p className={BeltStyles.apptSubtext}>{apptOverviewData.rescheduledAppt}</p>
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
