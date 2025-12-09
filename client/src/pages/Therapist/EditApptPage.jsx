import React from 'react'
import EditStyles from './EditApptPage.module.css'
import AssignedPt from '../../components/Therapist/EditAppt/AssignedTherapist'
import ApptDetails from '../../components/Therapist/EditAppt/ApptDetails'
import PaymentMethod from '../../components/Therapist/EditAppt/PaymentMethod'
import PxAttachment from '../../components/Therapist/EditAppt/PatientAttachments'
import UpdateApptStatus from '../../components/Therapist/EditAppt/UpdateApptStatus'
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { useParams } from "react-router";

const EditAppt = () => {
  const { id } = useParams();
  
  return (
    <div className={EditStyles.mainContainer}>
      <div className={EditStyles.directoryContainer}> <IoCalendarClear/> <p>Appointments</p> <IoIosArrowForward/> <p>Edit Appointments</p></div>
      <div className={EditStyles.rowOne}>

        <div className={EditStyles.headercontainer}>
          <div className={EditStyles.dirContainer}>
            <IoIosArrowBack/>
            <h2>Edit appointment</h2>
          </div>
          {/* <div className={EditStyles.sessionIdContainer}>
            <p><b>Session ID:</b> Approval Needed for a Session ID to be assigned</p>
          </div> */}
        </div>
        <AssignedPt apptID={id}/>

        <div className={EditStyles.apptDetailsContainer}>
          <ApptDetails apptID={id}/>
          <PaymentMethod/>
          {/* <PxAttachment/> */}
        </div>

        <button className={EditStyles.applyBtn}> Apply Changes</button>
      </div>
      {/* <div className={EditStyles.rowTwo}>
        <UpdateApptStatus/>
      </div> */}

    </div>
  )
}

export default EditAppt
