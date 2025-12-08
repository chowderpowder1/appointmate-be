import React from 'react'
import { Link } from 'react-router'
import AppointmentStyles from './PxAppointmentDetailsPage.module.css'
import AppointmentNotification from '../../components/PatientPortal/AppointmentNotification'
import DatePicker from '../../components/PatientPortal/DatePicker'
import CheckList from '../../components/PatientPortal/CheckList'
import AppointmentDetails from '../../components/PatientPortal/AppointmentDetails'
import RescheduleStatus from '../../components/PatientPortal/RescheduleStatus'
import PxSupport from '../../components/PatientPortal/PxSupport'
import ClinicLocation from '../../components/PatientPortal/ClinicLocation'
import Attachments from '../../components/PatientPortal/Attachments'
import Modal from '../../components/Ui/Modal'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import { useParams } from "react-router";

const PxAppointmentDetailsPage = () => {
   const { id } = useParams();
  return (
    <div className={AppointmentStyles.appointmentContainer}>
      
      <div className={AppointmentStyles.backBtnContainer}>
        <FaLongArrowAltLeft/>
        <Link className={AppointmentStyles.backBtn} to='/patient/treatment-progress/'>Appointment</Link>
        <IoIosArrowForward />
        <p>View Appointment Details</p>
      </div>

      <div className={AppointmentStyles.columnOne}>
        <AppointmentNotification/>
        <AppointmentDetails apptID={id}/>
        <ClinicLocation/>
        {/* <Attachments/> */}
      </div>

      <div className={AppointmentStyles.columnTwo}>
        <RescheduleStatus/>
        <DatePicker/>
        <CheckList/>
        <PxSupport/>
        
      </div>      
    </div>
  )
}

export default PxAppointmentDetailsPage
