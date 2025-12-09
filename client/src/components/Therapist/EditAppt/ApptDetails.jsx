import React from 'react'
import DetailStyles from './ApptDetails.module.css'
import { IoPersonCircle } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";

import MockPxPhoto from '../../../assets/aw_mock-px.png'
import DatePicker from '../../../components/PatientPortal/DatePicker'
import {UseGetAnAppointmentsDetails} from '../../../queries/apptData.js'


const ApptDetails = (apptID) => {
      const { data: apptDetails, isLoading: apptDetailsLoading, error: apptDetailsError} = UseGetAnAppointmentsDetails(apptID);
        if (apptDetailsLoading) return <div>Loading...</div>;
        if (apptDetailsError) return <div>Error: {apptDetailsError.error}</div>;
      console.log(apptDetails)

     const timeSlots = [
      { id: 1, time: '08:00', display: '9:00 AM', available: true },
      { id: 2, time: '08:30', display: '9:30 AM', available: true },
      { id: 3, time: '9:00', display: '10:00 AM', available: false },
      { id: 4, time: '9:30', display: '10:30 AM', available: true },
      { id: 5, time: '10:00', display: '11:00 AM', available: true },
      { id: 6, time: '10:30', display: '11:30 AM', available: false },
      { id: 7, time: '11:00', display: '2:00 PM', available: true },
      { id: 8, time: '11:30', display: '2:30 PM', available: true },
      { id: 9, time: '12:00', display: '3:00 PM', available: true },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false },
      { id: 10, time: '12:30', display: '3:30 PM', available: false }
    ];


  return (
    <div className={DetailStyles.container}>
        <div className={DetailStyles.assignedPtHeader}>
            <IoPersonCircle className={DetailStyles.icon}/>
            <p>Appointment Details</p>
        </div>
        <div className={DetailStyles.subContainer}>
            <div className={DetailStyles.rowOne}>
                <p>Patient Information</p>
            </div>
            <div className={DetailStyles.rowTwo}>
                <div className={DetailStyles.rowTwo}>
                    <div className={DetailStyles.pxHeaderContainer}>
                        <div className={DetailStyles.pxPhotoContainer}>
                            <img src={MockPxPhoto} className={DetailStyles.pxPhoto} alt="" />
                        </div>
                        <div className={DetailStyles.pxDataContainer}>
                            <p>Patient Name: {apptDetails.patientFName} {apptDetails.patientLName}</p>
                            <span>Patient Email: {apptDetails.patientEmail}</span>
                        </div>
                    </div>
                    <div className={DetailStyles.pxIdContainer}>
                        <div>
                            <p>Patient ID #{apptDetails.patientID}</p>
                        </div>
                       
                    </div>
                    {/* <div>
                        <p>Chief Complaint:</p>
                        <div className={DetailStyles.complaintData}>
                            <p>Hi po! I’ve been feeling some mild lower back discomfort lately, baka dahil sa matagal na upo during tapings and shoots. Also po, I had a previous ankle injury na minsan umaalalay pa rin. Hoping to get this checked po, thank you!</p>
                        </div>
                    </div> */}

                </div>
            </div>
        {/* <button className={DetailStyles.viewPxBtn}>View Patient Record</button> */}
        </div>
        <div className={DetailStyles.apptDetailsContainer}>
            {/* <div className={DetailStyles.apptStatusContainer}>
                <FaCalendarPlus className={DetailStyles.apptStatusIcon}/>
                <div className={DetailStyles.apptStatusSubcontainer}>
                    <p>Reschedule Requested by Patient</p>
                    <p>Patient Belle Mariano has requested to reschedule this appointment to 22 MAY 2025, 01:00PM.</p>
                    <div className={DetailStyles.btnContainer}>
                        <button className={`${DetailStyles.actionBtn} ${DetailStyles.approveBtn}`}>Approve Request</button>
                        <button className={DetailStyles.actionBtn}>View Request</button>
                        <button className={DetailStyles.actionBtn}>Dismiss</button>
                    </div>
                </div>
            </div> */}

            {/* <div>
                <p>Appointment Date & Time</p>
                <div className={DetailStyles.apptDataContainer}>
                    <span>
                        <p>Date:</p>
                        <p>22 May 2025</p>
                    </span>
                    <span>
                        <p>Time:</p>
                        <p>9:30AM - 10:00AM</p>
                    </span>
                    <span>
                        <p>Branch:</p>
                        <p>Accelerated Wellness Zabarte Road QC</p>
                    </span>
                </div>
            </div> */}
            {/* <div className={DetailStyles.columnTwo}>
                <DatePicker/>
                <div className={DetailStyles.colTwoSubContainer}>
                        <div>
                            <h3 className={DetailStyles.headerText}>SELECT DATE AND TIME</h3>
                            <div className={DetailStyles.timeSlotContainer}>
                                {timeSlots.map((slide, index)=>(
                                <span>{slide.display}</span>
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
                                <button className={`blue-btn ${DetailStyles.editBtn}`}>
                                    <MdOutlineModeEdit className='btn-icon'/>
                                    <p>Edit</p>
                                </button>
                            </div>
                        </div>
                    
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default ApptDetails
