import React from 'react'
import MockUser from '../../assets/zoey.png'
import DashboardStyles from './DashboardBasicInfo.module.css'

const DashboardBasicInfo = () => {
  return (
    
    <div className={PDStyles.profileContainer}>
    
        <div className={PDStyles.profileLeft}>
          <div className={PDStyles.patientPhoto}>
            <img src={MockUser} alt="" />
          </div>
          <h2 className={PDStyles.PatientName}>Zoey Min</h2>
          <p className={PDStyles.patientId}>PID #A2023141814</p>
          <p className={PDStyles.patientPhone}>+63 911 222 1111</p>
          <p className={PDStyles.patientEmail}>zoey.min@demon-hunters.com</p>
        </div>
        <div className={PDStyles.profileRight}>
          <h2>Basic Information</h2>
          <div className={PDStyles.basicInfoContainer}>
            <div className={PDStyles.basicInfoOne}>
              <p>Gender:</p>
              <p>Female</p>
              <div className={PDStyles.divider}></div>
              <p>Birthdate:</p>
              <p>06-10-2002</p>
              <div className={PDStyles.divider}></div>
              <p>City:</p>
              <p>Caloocan City</p>
              <div className={PDStyles.divider}></div>
              <p>HMO Card presented:</p>
              <p>MediCard</p>
            </div>
            <div className={PDStyles.basicInfoTwo}>
              
              <p>Gender:</p>
              <p>Female</p>
              <div className={PDStyles.divider}></div>
              <p>Birthdate:</p>
              <p>06-10-2002</p>
              <div className={PDStyles.divider}></div>
              <p>City:</p>
              <p>Caloocan City</p>
              <div className={PDStyles.divider}></div>
              <p>HMO Card presented:</p>
              <p>MediCard</p>
            </div>
          </div>
        </div>
    
    </div>
  )
}

export default DashboardBasicInfo
