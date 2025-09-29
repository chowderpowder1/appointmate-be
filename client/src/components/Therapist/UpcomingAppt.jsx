import React from 'react'
import UpcomingStyles from './UpcomingAppt.module.css'
import MockPxPhoto from '../../assets/mockPx.jpg'
import { FiExternalLink } from "react-icons/fi";

const UpcomingAppt = () => {
  return (
    <div className={UpcomingStyles.container}>
      <h3 className={UpcomingStyles.header}>Upcoming Appointments</h3>
      <div className={UpcomingStyles.table}>
        
        <div className={UpcomingStyles.row}>
          <div className={UpcomingStyles.rowsubContainer}>
            <div className={UpcomingStyles.pxPhotoContainer}>
              <img className={UpcomingStyles.pxPhoto} src={MockPxPhoto} alt="" />
            </div>
            <div className={UpcomingStyles.apptDetailsContainer}>
              <p className={UpcomingStyles.pxName}>Maya Angelou</p>
              <div className={UpcomingStyles.apptDetails}>
                <p className={UpcomingStyles.apptDate}>Monday, May 22, 2025</p>
                <p className={UpcomingStyles.apptTime}>9:30 AM</p>
              </div>
            </div>
          </div>

          <button className={UpcomingStyles.apptBtn}>
            <FiExternalLink className={UpcomingStyles.linkIcon}/>
            <p>Patient Record</p>
          </button>
        </div>
        <div className={UpcomingStyles.row}>
          <div className={UpcomingStyles.rowsubContainer}>
            <div className={UpcomingStyles.pxPhotoContainer}>
              <img className={UpcomingStyles.pxPhoto} src={MockPxPhoto} alt="" />
            </div>
            <div className={UpcomingStyles.apptDetailsContainer}>
              <p className={UpcomingStyles.pxName}>Maya Angelou</p>
              <div className={UpcomingStyles.apptDetails}>
                <p className={UpcomingStyles.apptDate}>Monday, May 22, 2025</p>
                <p className={UpcomingStyles.apptTime}>9:30AM</p>
              </div>
            </div>
          </div>

          <button className={UpcomingStyles.apptBtn}>
            <FiExternalLink className={UpcomingStyles.linkIcon}/>
            <p>Patient Record</p>
          </button>
        </div>


      </div>
    </div>
  )
}

export default UpcomingAppt
