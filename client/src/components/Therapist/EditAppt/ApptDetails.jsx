import React from 'react'
import DetailStyles from './ApptDetails.module.css'
import { IoPersonCircle } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import Button from '@mui/material/Button';
import MockPxPhoto from '../../../assets/aw_mock-px.png'
import DatePicker from '../../../components/PatientPortal/DatePicker'
import {UseGetAnAppointmentsDetails} from '../../../queries/apptData.js'
import { IoMailSharp } from "react-icons/io5";

import {useGetPatientEval} from '../../../queries/useEmployees.js'
import {timeSlots} from '../../../features/timeSlots.js'

const ApptDetails = ({apptID, userData}) => {
    console.log(timeSlots)
    const { data: apptDetails, isLoading: apptDetailsLoading, error: apptDetailsError} = UseGetAnAppointmentsDetails(apptID);

    const { data: evalData, isLoading: evalDataIsLoading, error: evalDataError} = useGetPatientEval(apptDetails?.patientUserID);

    if (apptDetailsLoading ||evalDataIsLoading ) return <div>Loading...</div>;
    if (apptDetailsError || evalDataError ) return <div>Error: {apptDetailsError.error}</div>;
console.log(apptDetails)
    //  const timeSlots = [
    //   { id: 1, time: '08:00', display: '9:00 AM', available: true },
    //   { id: 2, time: '08:30', display: '9:30 AM', available: true },
    //   { id: 3, time: '9:00', display: '10:00 AM', available: false },
    //   { id: 4, time: '9:30', display: '10:30 AM', available: true },
    //   { id: 5, time: '10:00', display: '11:00 AM', available: true },
    //   { id: 6, time: '10:30', display: '11:30 AM', available: false },
    //   { id: 7, time: '11:00', display: '2:00 PM', available: true },
    //   { id: 8, time: '11:30', display: '2:30 PM', available: true },
    //   { id: 9, time: '12:00', display: '3:00 PM', available: true },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false },
    //   { id: 10, time: '12:30', display: '3:30 PM', available: false }
    // ];
    console.log(userData)
  return (
    <div className={DetailStyles.container}>
        <div className={DetailStyles.assignedPtHeader}>
            <IoPersonCircle className={DetailStyles.icon}/>
            <p>Appointment Details</p>
            <div className={DetailStyles.pxIdContainer}>
                <div style={{display:'flex', flexFlow:'row', gap:'1rem'}}>
                    <p className={DetailStyles.pxDataHeader}>Patient ID: {apptDetails.patientID}</p>
                    <p className={DetailStyles.pxDataHeader}>Session ID: 023</p>
                </div>
            </div>            
        </div>
        <div className={DetailStyles.subContainer}>

            <div className={DetailStyles.rowTwo}>
                <div className={DetailStyles.rowTwo}>
                    <div className={DetailStyles.pxHeaderContainer}>
                        <div className={DetailStyles.pxPhotoContainer}>
                            <img src={MockPxPhoto} className={DetailStyles.pxPhoto} alt="" />
                        </div>
                        <div className={DetailStyles.pxDataContainer}>
                            <p className={DetailStyles.pxName}>{apptDetails.patientFName.charAt(0).toUpperCase() + apptDetails.patientFName.slice(1)} {apptDetails.patientLName}</p>
                            <span style={{display:'flex',alignItems:'center', gap:'.5rem'}}><IoMailSharp/>{apptDetails.patientEmail}</span>
                        </div>
                    </div>



                    <div className={DetailStyles.complaintContainer}>
                        <p>Chief Complaint:</p>
                        <div className={DetailStyles.complaintData}>
                            <p>{evalData.complaint ? evalData :'No Complaint Provided'}</p>
                        </div>
                    </div>

                </div>
            </div>
            <Button
              disabled={userData?.userRoleId === 4}
              sx={{
                fontWeight: '500',
                position: 'absolute',
                right: 0,
                bottom: 0,
                backgroundColor: '#1565C0',
                color: 'white',
                borderRadius: '10px',
                padding: '0.2rem 1rem',
                '&.Mui-disabled': {
                  backgroundColor: '#ccc',
                  color: '#666',
                }
              }}
            >
              View Patient Record
            </Button>
        </div>
        <div className={DetailStyles.apptDetailsContainer}>
            { apptDetails.apptStatus=='reschedule' && <div className={DetailStyles.apptStatusContainer}>
                <FaCalendarPlus className={DetailStyles.apptStatusIcon}/>
                <div className={DetailStyles.apptStatusSubcontainer}>
                    <p style={{fontWeight:'600'}}>Reschedule Requested by Patient</p>
                    <p>Patient {apptDetails.patientFName.charAt(0).toUpperCase() + apptDetails.patientFName.slice(1)} {apptDetails.patientLName} has requested to reschedule this appointment to <br/> <b>{apptDetails.appt_date} {apptDetails.appt_start} </b></p>
                    {/* <div className={DetailStyles.btnContainer}>
                        <button className={`${DetailStyles.actionBtn} ${DetailStyles.approveBtn}`}>Approve Request</button>
                        <button className={DetailStyles.actionBtn}>View Request</button>
                        <button className={DetailStyles.actionBtn}>Dismiss</button>
                    </div> */}
                </div>
            </div>}

            <div className={DetailStyles.rescheduleContainer}>
                <p className={DetailStyles.rescheduleHeader}>Appointment Date & Time</p>
                <div className={DetailStyles.apptDataContainer}>
                    <span>
                        <p className={DetailStyles.apptDataHeader}>Date:</p>
                        <p>{apptDetails.appt_date}</p>
                    </span>
                    <span>
                        <p className={DetailStyles.apptDataHeader}>Time:</p>
                        <p>{apptDetails.appt_start} to {apptDetails.appt_end}</p>
                    </span>
                    
                </div>
            </div>
            <div className={DetailStyles.columnTwo}>
                <DatePicker/>
                <div className={DetailStyles.colTwoSubContainer}>
                        <div>
                            <h3 className={DetailStyles.headerText}>SELECT DATE AND TIME</h3>
                            <div className={DetailStyles.timeSlotContainer}>
                                {timeSlots.map((slide, index)=>(
                                <span style={{backgroundColor: slide.label == apptDetails.appt_start ? '#FFFDDC' : ''}}>{slide.label}</span>
                                ))}
                            </div>
                            <div className={DetailStyles.apptIndicator}>
                                <span> 
                                    <div className={DetailStyles.bookedIndicator}></div>
                                    <p>Booked</p>
                                </span>
                                <span> 
                                    <div className={DetailStyles.availableIndicator}></div>
                                    <p>Available</p>
                                </span>
                                <span> 
                                    <div className={DetailStyles.unavailableIndicator}></div>
                                    <p>Unavailable</p>
                                </span>
                                <span> 
                                    <div className={DetailStyles.requestedIndicator}></div>
                                    <p>Requested Time</p>
                                </span>
                                {/* <button className={`blue-btn ${DetailStyles.editBtn}`}>
                                    <MdOutlineModeEdit className='btn-icon'/>
                                    <p>Edit</p>
                                </button> */}
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ApptDetails
