import React from 'react'
import AssignedStyles from './AssignedTherapist.module.css'
import { IoPersonCircle } from "react-icons/io5";
import MockTherapist from '../../../assets/aw_mock-px.png'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import {UseGetAnAppointmentsDetails} from '../../../queries/apptData.js'
const AssignedTherapist = (apptID) => {
    const { data: apptDetails, isLoading: apptDetailsLoading, error: apptDetailsError} = UseGetAnAppointmentsDetails(apptID);
    if (apptDetailsLoading) return <div>Loading...</div>;
    if (apptDetailsError) return <div>Error: {apptDetailsError.error}</div>;
  return (
    <div>
      <h4 className={AssignedStyles.header}>Main Appointment Details</h4>
      <div className={AssignedStyles.assignedPtContainer}>
        {/* Assigned PT Header div should be placed in the page */}
        <div className={AssignedStyles.assignedPtHeader}>
            <IoPersonCircle className={AssignedStyles.icon}/>
            <p>Assigned Physical Therapist</p> 
        </div>

        <div className={AssignedStyles.assignedPtSubcontainer}>
            <div className={AssignedStyles.PtPhotoContainer}>
                <img className={AssignedStyles.PtPhoto} src={MockTherapist} alt="" />
            </div>
            <div className={AssignedStyles.ptDataContainer}>
                <p className={AssignedStyles.ptName}>PT {apptDetails.assignedTherapist}</p>
                <p className={AssignedStyles.ptSpecialization}>Physical Therapy - {apptDetails.therapistSpecialization}</p>
                <p className={AssignedStyles.ptId}>PT-{apptDetails.therapistID}</p>
                <div className={AssignedStyles.ptContactContainer}>
                    <div className={AssignedStyles.ptContactItem}>
                        <FaPhoneAlt/>
                        <p>{apptDetails.therapistContactNumber}</p>
                    </div>
                    <div className={AssignedStyles.ptContactItem}>
                        <MdEmail/>
                        <p>{apptDetails.therapistEmail}</p>
                    </div>
                </div>
            </div>

            <div className={AssignedStyles.changePtBtnContainer}>
                <MdOutlineModeEdit className={AssignedStyles.changePtBtnIcon}/>
                Change Therapist
            </div>
        </div>

      </div>
    </div>
  )
}

export default AssignedTherapist
