import React from 'react'
import ScheduledStyles from './ScheduledPxNotification.module.css'
import { FaCalendar } from "react-icons/fa";
import MockPatient from '../../assets/yutao.jpg'
import { FiExternalLink } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

const ScheduledPxNotification = () => {
  return (
    <div className={ScheduledStyles.container}>
        <div className={ScheduledStyles.row}>
            <div className={ScheduledStyles.notificationHeader}>
                <FaCalendar/>
                <p>Next Patient</p>
            </div>
        </div>
        
        <div className={`${ScheduledStyles.row} ${ScheduledStyles.rowTwo}`}>
            <div className={ScheduledStyles.rowTwoColumOne}>
                <div className={ScheduledStyles.pxImage}><img src={MockPatient} alt="" /></div>
                <div className={ScheduledStyles.pxInfo}>
                    <p className={ScheduledStyles.pxName}>Yu Tao</p>
                    <p className={ScheduledStyles.pxId}>#A2023141814</p>
                </div>
            </div>
            {/* <div className={ScheduledStyles.vl}/> */}
            <div className={ScheduledStyles.rowTwoColumTwo}>
                <p className={ScheduledStyles.serviceTypeText}>Manual therapy</p>
                <div className={ScheduledStyles.pxScheduleContainer}>
                    <div className={ScheduledStyles.pxScheduleText}>
                        <FaCalendar/>
                        <p>Today</p>
                    </div>
                    <div className={ScheduledStyles.vl}/>
                    <div className={ScheduledStyles.pxScheduleText}>
                        <FaClock/>
                        <p>9:30AM</p>
                    </div>
                </div>
            </div>
        </div>

        <div className={`${ScheduledStyles.row} ${ScheduledStyles.rowThree}`}>
            <button className={ScheduledStyles.pxBtn}>
                <FiExternalLink className={ScheduledStyles.linkIcon}/>
                <p>Patient Record</p>
                </button>
            <button className={ScheduledStyles.pxBtn}>
                <FiExternalLink className={ScheduledStyles.linkIcon}/>
                <p>Appointment Details</p>
                </button>
        </div>

    </div>
  )
}

export default ScheduledPxNotification
