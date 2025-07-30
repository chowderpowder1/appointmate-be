import React from 'react'
import AppointmentStyles from './AppointmentDetails.module.css'
import MockupPt from '../../assets/mockup-pt.jpg'
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BsCalendarMinusFill } from "react-icons/bs";

const AppointmentDetails = () => {
  return (
    <div className={AppointmentStyles.appointmentContainer}>
        <div className={AppointmentStyles.appointmentTitleContainer}>
            <BsCalendarMinusFill className={AppointmentStyles.titleIcon}/>
            <h2 className={AppointmentStyles.appointmentTitle}>Your Appointment Details</h2>
        </div>
      
      <div className={AppointmentStyles.mainContainer}>
        <div className={AppointmentStyles.columnOne}>
            <h4 className={AppointmentStyles.therapistLabel}>Your Physical Therapist</h4>
            <div className={AppointmentStyles.therapistProfile}>
                <img src={MockupPt} alt="" />
            </div>
            <h1 className={AppointmentStyles.therapistName}>PT Lee Ji-eun</h1>
            <p>Physical Therapy – Sports Rehabilitation</p>
            <p className={AppointmentStyles.therapistId}>PT-982345</p>
            <div className={AppointmentStyles.contactInfo}>
                <h5 className={AppointmentStyles.contactTitle}>Contact Information</h5>
                <div className='divider'></div>
                <div className={AppointmentStyles.contactItem}>
                    <FaPhoneAlt/>
                    <p>+63 911 111 1111</p>
                </div>
                <div className={AppointmentStyles.contactItem}>
                    <IoIosMail/>
                    <p>iu-official@daum.net</p>
                </div>
            </div>
        </div>
        
        <div className={AppointmentStyles.columnTwo}>
            <div className={AppointmentStyles.rowTop}>
                 <div className={AppointmentStyles.contentLeft}>
                     <div className={AppointmentStyles.contentContainer}>
                        <p className={AppointmentStyles.appointmentDataTitle}>Session ID:</p>
                        <p className={AppointmentStyles.appointmentData}>#21ABB</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Selected Branch:</p>
                        <p className={AppointmentStyles.appointmentData}>Zabarte Road Quezon City</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Payment Method:</p>
                        <p className={AppointmentStyles.appointmentData}>HMO, Maxicare</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Date & Time:</p>
                        <p className={AppointmentStyles.appointmentData}>22 MAY 2025, 09:30 - 10:00 AM</p>
                     </div>
                 </div>
                 <div className={AppointmentStyles.contentRight}>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Status:</p>
                        <p className={AppointmentStyles.appointmentData}>REQUEST FOR RESCHEDULE</p>
                     </div>

                 </div>
            </div>
            <div className={AppointmentStyles.rowBottom}>
            <p>Chief Complaint</p>
            <div className={AppointmentStyles.pxComplaintContainer}>
                <p className={AppointmentStyles.pxComplaint}>Hi po! I’ve been feeling some mild lower back discomfort lately, baka dahil sa matagal na upo during tapings and shoots. Also po, I had a previous ankle injury na minsan umaalalay pa rin. Hoping to get this checked po, thank you!</p>
            </div>
            <div className={AppointmentStyles.btnContainer}>

                <button className={AppointmentStyles.rescheduleBtn}>Reschedule Appointment
                </button>

                <button className={AppointmentStyles.cancelBtn}>Cancel Appointment
                </button>

            </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails
