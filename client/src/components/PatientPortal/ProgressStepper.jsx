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
import { FaCircleDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

//  Axios imports YEAAAHHHH
import {useGetMyAppointments} from '../../queries/apptData'

import dayjs from "dayjs";

const ProgressStepper = ({isHome}) => {

  const { data: myAppointmentsData, isLoading: myAppointmentsDataIsLoading, error: myAppointmentsDataError } = useGetMyAppointments();

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

  // Errur Chiking ba
  if (  myAppointmentsDataIsLoading ) return <div>Loading...</div>;
  if (  myAppointmentsDataError ) return <div>Error: {myAppointmentsDataError.message}</div>;

  const mappedApptData = myAppointmentsData.userAppointments;
  // console.log(mappedApptData.appt_date)
  // console.log(dayjs(mappedApptData[0].appt_date).format('YYYY MM DD'))
  // console.log(mappedApptData[0].appt_status)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid orange', backgroundColor:'orange'}}><FaCircleDot style={{color:'white', fontSize:'1.2rem'}}/></div></>;
      case 'reschedule':
        return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid orange', backgroundColor:'orange'}}><FaCircleDot style={{color:'white', fontSize:'1.2rem'}}/></div></>;
      case 'scheduled':
        return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid #388E3C', backgroundColor:'#388E3C'}}><FaClock style={{color:'white', fontSize:'1.5rem'}}/></div></>;
      case 'completed':
        return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid #1976D5', backgroundColor:'#1976D5'}}><FaCheck style={{color:'white', fontSize:'1rem'}}/></div></>;
      case 'approved':
        return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid #388E3C', backgroundColor:'#388E3C'}}><FaClock style={{color:'white', fontSize:'1.5rem'}}/></div></>;
      case 'cancelled':   
      return <> <div className={ProgressStyles.progressCircle} style={{border: '1px solid #D32F2F', backgroundColor:'#D32F2F',}}><TiCancel style={{color:'white', fontSize:'2rem'}}/></div></>; 
    }
  }

  const getStatusIndicatorStyles = (status) => {
    switch (status) {
      case 'pending':
        return {"--apptStatusColor":'orange'};
      case 'reschedule':
        return {"--apptStatusColor":'orange'};
      case 'scheduled':
        return {"--apptStatusColor":'#388E3C'};
      case 'completed':
        return {"--apptStatusColor":'#1976D5'};
      case 'approved':
        return {"--apptStatusColor":'#388E3C'};
      case 'cancelled':   
      return {"--apptStatusColor":'#D32F2F'};
    }
  }

  return (

          <div
          className={ProgressStyles.stepperContainer}>
            <div className={ProgressStyles.linkBtnContainer}>
            {isHome && <Link to='/patient/treatment-progress'><FaExternalLinkAlt style={{color:'var(--aw-gray)'}}/></Link>}</div>
            <div className={ProgressStyles.tabs}>
              <ul>
                <li className={ProgressStyles.tabActive}>Appointments</li>
                <li>Sessions</li>
                <li>Archived</li>
              </ul>
            </div>
            <div style={{
            height: isHome ? '80%' : '90%',
          }}
          className={ProgressStyles.stepperSection}>
                <div className={ProgressStyles.stepperSubSection}>
                {mappedApptData.map((apptData, index)=>
                  (<>
                   
                     <div className={ProgressStyles.row}>
                      {getStatusStyle(apptData?.appt_status)}
                  {/* { apptData.appt_status == 'scheduled' && <><div className={ProgressStyles.progressCircle} style={{backgroundColor:'#1976D5', color:'white'}}><FaCheck/></div></>}

                  { apptData.appt_status == 'pending' && <>  <div className={ProgressStyles.progressCircle} style={{border: '1px solid orange', backgroundColor:'white', color:'orange'}}><FaCircleDot/></div></>}
                   */}
                  <div className={ProgressStyles.detailsContainer} style={getStatusIndicatorStyles(apptData?.appt_status)}>
                  {/* <div className={ProgressStyles.detailsContainer} style={{     "--apptStatusColor": apptData.appt_status === "scheduled" ? "#1976D5" : "orange",}}> */}
                      <span>
                        <p className={ProgressStyles.rowTitle}>{apptData.appt_date}</p>
                        <p className={ProgressStyles.rowSubText}>Appointment Date</p>
                      </span>
                      <div className={ProgressStyles.verticalDivider}/>
                      <span>
                      <p className={ProgressStyles.rowTitle}>{apptData.appt_start} - {apptData.appt_end}</p>
                      <p className={ProgressStyles.rowSubText}>Appointment Time</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>{apptData.therapist_name}</p>
                      <p className={ProgressStyles.rowSubText}>Assigned Therapist</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <span>
                      <p className={ProgressStyles.rowTitle}>{apptData.mode_of_payment}</p>
                      <p className={ProgressStyles.rowSubText}>Payment Method</p>
                    </span>
                    <div className={ProgressStyles.verticalDivider}/>
                    <div className={ProgressStyles.appointmentNotesContainer}>
                      <FaNoteSticky />
                      <Link to={`appointment-details/${apptData.appt_id}`}>Notes</Link>
                    </div>
                    </div>
                  </div>

                   {/* { treatment.sessionData.map((data, child)=>(
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
                  ))} */}
                  {/* {(treatment.sessionData.length < treatment.sessionLength) ? [...Array(treatment.sessionLength - treatment.sessionData.length)].map((_,y)=>(
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
                  )) : 'hell no'} */}
          
              </>))}
            </div>
            </div>
          </div>

  )
}

export default ProgressStepper
