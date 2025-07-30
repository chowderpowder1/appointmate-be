import React from 'react'
import PDStyles from './PatientDashboard.module.css'
import MockUser from '../../assets/zoey.png'
import DatePicker from '../../components/PatientPortal/DatePicker'
import AppointmentNotification from '../../components/PatientPortal/AppointmentNotification'
import { BiSolidAlarm } from "react-icons/bi";

const PatientDashboard = () => {
  return (
    <div className={PDStyles.container}>
      <div className={`${PDStyles.columnOne} ${PDStyles.column}`}>
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

          <AppointmentNotification/>

      </div>

      <div className={`${PDStyles.columnTwo} ${PDStyles.column}`}>
        <DatePicker/>
        <div className={PDStyles.progressContainer}>
          <h1>Therapy Progress</h1>
          <p>Session Breakdown</p>
        </div>
      </div>

      <div className={`${PDStyles.columnThree} ${PDStyles.column}`}>
        <div className={PDStyles.progressContainer}>
          <h2>Notifications</h2>
        </div>
        <div className={PDStyles.progressContainer}>
          <h2>Files/Documents</h2>
        </div>
        <div className={PDStyles.progressContainer}>
          <h2>Session Notes</h2>
        </div>
      </div>

    </div>
  )
}

export default PatientDashboard
