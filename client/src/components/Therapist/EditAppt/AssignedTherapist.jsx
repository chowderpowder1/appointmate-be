import React from 'react'
import AssignedStyles from './AssignedTherapist.module.css'
import { IoPersonCircle } from "react-icons/io5";
import MockTherapist from '../../../assets/mock-therapist.jpg'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const AssignedTherapist = () => {
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
                <p className={AssignedStyles.ptName}>PT Lee Ji-eun</p>
                <p className={AssignedStyles.ptSpecialization}>Physical Therapy - Sport Rehabilitation</p>
                <p className={AssignedStyles.ptId}>PT-982345</p>
                <div className={AssignedStyles.ptContactContainer}>
                    <div className={AssignedStyles.ptContactItem}>
                        <FaPhoneAlt/>
                        <p>1235546</p>
                    </div>
                    <div className={AssignedStyles.ptContactItem}>
                        <MdEmail/>
                        <p>niello@gmail.com</p>
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
