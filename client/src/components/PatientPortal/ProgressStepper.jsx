import React from 'react'
import ProgressStyles from './ProgressStepper.module.css'

import { Link } from 'react-router'
import { FaExclamation } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import '../../index.css'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { FaExternalLinkAlt } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css';
import RedHeader from '../../components/Ui/RedHeader'
import SessionBg from '../../assets/runningPersonBg.png'
import RescheduleStatus from '../../components/PatientPortal/RescheduleStatus'
import { FaCheck } from "react-icons/fa";

const ProgressStepper = ({isHome}) => {

      const treatmentData = [
     {
      treatmentType : 'Neurological Treatment',
      sessionNumber: '63A04',
      sessionLength: 10,
      sessionData : [
      {
        AppointmentId: 1,
        sessionNumber : 1,
        date : '08 MAY 2025',
        time : '09:30 AM - 10:00 AM',
        pt : 'Sung Jin Wo',
        hmo : 'CocoLife',
        status : 'Completed',
      },
      {
        AppointmentId: 2,
        sessionNumber : 2,
        date : '18 MAY 2025',
        time : '09:30 AM - 10:00 AM',
        pt : 'Sung Jin Wo',
        hmo : 'CocoLife',
        status : 'Missed',
      },
      {
        AppointmentId: 3,
        sessionNumber : 3,
        date : '30 MAY 2025',
        time : '09:30 AM - 10:00 AM',
        pt : 'Sung Jin Wo',
        hmo : 'CocoLife',
        status : 'Upcoming',
      },
    ] 
    }
  ]

  return (

          <div
          className={ProgressStyles.stepperContainer}>
            <div className={ProgressStyles.linkBtnContainer}>
            {isHome && <Link to='/patient/treatment-progress'><FaExternalLinkAlt style={{color:'var(--aw-gray)'}}/></Link>}</div>
            <div className={ProgressStyles.tabs}>
              <ul>
                <li className={ProgressStyles.tabActive}>All Appointments</li>
                <li>Upcoming</li>
                <li>Completed</li>
              </ul>
            </div>
            <div style={{
            height: isHome ? '80%' : '90%',
          }}
          className={ProgressStyles.stepperSection}>
                <div className={ProgressStyles.stepperSubSection}>
                {treatmentData.map((treatment, index)=>
                  (<>
                   { treatment.sessionData.map((data, child)=>(
                     <div className={ProgressStyles.row}>
                  <div className={ProgressStyles.progressCircle} style={{backgroundColor:'#1976D5', color:'white'}}><FaCheck />
                  </div>
                  <div className={ProgressStyles.detailsContainer}>
                      <span>
                        <p className={ProgressStyles.rowTitle}>{data.date}</p>
                        <p className={ProgressStyles.rowSubText}>Appointment Date</p>
                      </span>
                      <div className={ProgressStyles.verticalDivider}/>
                      <span>
                      <p className={ProgressStyles.rowTitle}>{data.time}</p>
                      <p className={ProgressStyles.rowSubText}>Appointment Time</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>{data.pt}</p>
                      <p className={ProgressStyles.rowSubText}>Assigned Therapist</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>{data.hmo}</p>
                      <p className={ProgressStyles.rowSubText}>Payment Method</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <div className={ProgressStyles.appointmentNotesContainer}>
                      <FaNoteSticky />
                      <Link to={`appointment-details/${data.AppointmentId}`}>Notes</Link>
                    </div>
                    </div>
                  </div>
                  ))}
                  {(treatment.sessionData.length < treatment.sessionLength) ? [...Array(treatment.sessionLength - treatment.sessionData.length)].map((_,y)=>(
                  <div className={ProgressStyles.row}>
                  <div className={ProgressStyles.progressCircle}></div>
                  <div className={ProgressStyles.detailsContainer}>
                      <span>
                        <p className={ProgressStyles.rowTitle}>TBD</p>
                        <p className={ProgressStyles.rowSubText}>Appointment Date</p>
                      </span>
                      <div className={ProgressStyles.verticalDivider}/>
                      <span>
                      <p className={ProgressStyles.rowTitle}>TBD</p>
                      <p className={ProgressStyles.rowSubText}>Appointment Time</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>TBD</p>
                      <p className={ProgressStyles.rowSubText}>Assigned Therapist</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>TBD</p>
                      <p className={ProgressStyles.rowSubText}>Payment Method</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <div className={ProgressStyles.appointmentNotesContainer}>
                      <FaNoteSticky />
                      <Link to=''>Notes</Link>
                    </div>
                    </div>
                  </div>
                  )) : 'hell no'}
          
              </>))}
            </div>
            </div>
          </div>

  )
}

export default ProgressStepper
