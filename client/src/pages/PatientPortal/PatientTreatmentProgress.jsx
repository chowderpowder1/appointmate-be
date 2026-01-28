import { React, useState} from 'react'
import { Link } from 'react-router'
import TreatmentStyles from './PatientTreatmentProgress.module.css'
import { FaExclamation } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import '../../index.css'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { FaExternalLinkAlt } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css';
import RedHeader from '../../components/Ui/RedHeader'
import CircularStepper from '../../components/PatientPortal/CircularStepper'
import ProgressStepper from '../../components/PatientPortal/ProgressStepper'
import SessionBg from '../../assets/runningPersonBg.png'
import RescheduleStatus from '../../components/PatientPortal/RescheduleStatus'
import { FaCheck } from "react-icons/fa";

// Query imports

import {useGetMyAppointments} from '../../queries/apptData'

const PatientAppointment = () => {

    const { data: myAppointmentsData, isLoading: myAppointmentsDataIsLoading, error: myAppointmentsDataError } = useGetMyAppointments();
  
  const percentage = 10;
  
  const [ treatmentLength, setTreatmentLength] = useState(0);
  const changeTreatmentLength = (data) => {
    setTreatmentLength(data);
  }

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
  if (  myAppointmentsDataIsLoading ) return <div>Loading...</div>;
  if (  myAppointmentsDataError ) return <div>Error: {myAppointmentsDataError.message}</div>;
  const apptData = myAppointmentsData.userAppointments[0]
  console.log(apptData)
  const nextApptData =myAppointmentsData.userAppointments[0];
  return (
    <div className={TreatmentStyles.container}>
      {/* <div className={TreatmentStyles.stepperContainer}>
        <div className={TreatmentStyles.tabs}>
          <ul>
            <li className={TreatmentStyles.tabActive}>All Appointments</li>
            <li>Upcoming</li>
            <li>Completed</li>
          </ul>
        </div>
        <div className={TreatmentStyles.stepperSection}>
   
            <div className={TreatmentStyles.stepperSubSection}> 

            {treatmentData.map((treatment, index)=>

              (<>
               { treatment.sessionData.map((data, child)=>(

                 <div className={TreatmentStyles.row}>            
              <div className={TreatmentStyles.progressCircle} style={{backgroundColor:'#1976D5', color:'white'}}><FaCheck />
              </div>
              <div className={TreatmentStyles.detailsContainer}>              
                  <span>
                    <p className={TreatmentStyles.rowTitle}>{data.date}</p>
                    <p className={TreatmentStyles.rowSubText}>Appointment Date</p>
                  </span>
                  <div className={TreatmentStyles.verticalDivider}/>
                  <span>
                  <p className={TreatmentStyles.rowTitle}>{data.time}</p>
                  <p className={TreatmentStyles.rowSubText}>Appointment Time</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <span>
                  <p className={TreatmentStyles.rowTitle}>{data.pt}</p>
                  <p className={TreatmentStyles.rowSubText}>Assigned Therapist</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <span>
                  <p className={TreatmentStyles.rowTitle}>{data.hmo}</p>
                  <p className={TreatmentStyles.rowSubText}>Payment Method</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <div className={TreatmentStyles.appointmentNotesContainer}>
                  <FaNoteSticky />
                  <Link to={`appointment-details/${data.AppointmentId}`}>Notes</Link>
                </div>
                </div>
              </div>

              ))}

              {(treatment.sessionData.length < treatment.sessionLength) ? [...Array(treatment.sessionLength - treatment.sessionData.length)].map((_,y)=>(

              <div className={TreatmentStyles.row}>            
              <div className={TreatmentStyles.progressCircle}></div>
              <div className={TreatmentStyles.detailsContainer}>              
                  <span>
                    <p className={TreatmentStyles.rowTitle}>TBD</p>
                    <p className={TreatmentStyles.rowSubText}>Appointment Date</p>
                  </span>
                  <div className={TreatmentStyles.verticalDivider}/>
                  <span>
                  <p className={TreatmentStyles.rowTitle}>TBD</p>
                  <p className={TreatmentStyles.rowSubText}>Appointment Time</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <span>
                  <p className={TreatmentStyles.rowTitle}>TBD</p>
                  <p className={TreatmentStyles.rowSubText}>Assigned Therapist</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <span>
                  <p className={TreatmentStyles.rowTitle}>TBD</p>
                  <p className={TreatmentStyles.rowSubText}>Payment Method</p>
                </span>
                <div className={TreatmentStyles.verticalDivider}/>
                <div className={TreatmentStyles.appointmentNotesContainer}>
                  <FaNoteSticky />
                  <Link to=''>Notes</Link>
                </div>
                </div>
              </div>

              )) : 'hell no'}
              
          </>))}
              </div>              
        </div>
      </div> */}
      <div className={TreatmentStyles.columnOne}>
        <ProgressStepper isHome={false}/>
      </div>
      <div className={TreatmentStyles.columnTwo}>
        {/* <CircularStepper/> */}
        <div className={TreatmentStyles.scheduledSessionContainer}>
              <div className={TreatmentStyles.sessionData}>
                <div className={TreatmentStyles.sessionBackground}>
                  <img src={SessionBg} alt="" />
                </div>
                <h2 className={TreatmentStyles.sessionDataTitle}>Your Next Session</h2>
                <div>
                  <p className={TreatmentStyles.sessionText}>Date</p>
                  <h4 className={TreatmentStyles.sessionText}>{nextApptData?.appt_date}</h4>
                  <p className={TreatmentStyles.sessionText}>{nextApptData?.appt_day_of_week}</p>
                </div>

                <div>
                  <p className={TreatmentStyles.sessionText}>Time & Location</p>
                  <h4 className={TreatmentStyles.sessionText}>{nextApptData?.appt_start} - {nextApptData?.appt_end}</h4>
                  <p className={TreatmentStyles.sessionText}>Accelerated Wellness Zabarte Road QC </p>
                </div>

                <div>
                  <p className={TreatmentStyles.sessionText}>Therapist</p>
                  <h4 className={TreatmentStyles.sessionText}>{nextApptData?.therapist_name}</h4>
                </div>

                <Link to={`appointment-details/${apptData?.appt_id}`} className={TreatmentStyles.viewBtn}> <FaExternalLinkAlt/> View Appointment Details</Link>
              </div>
        </div>
              {/* <RescheduleStatus/> */}
      </div>
    </div>
  )
}

export default PatientAppointment
