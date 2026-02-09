import {useState, useEffect, React} from 'react'
import AssignedStyles from './AssignedTherapist.module.css'
import { IoPersonCircle } from "react-icons/io5";
import MockTherapist from '../../../assets/aw_mock-px.png'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import dayjs from "dayjs";
import {useGetAvatar} from '../../../queries/users.js'
 
import {UseGetAnAppointmentsDetails} from '../../../queries/apptData.js'
const AssignedTherapist = (apptData, apptID) => {
    const data = apptData.apptData

    const { data: avatar, isLoading: avatarIsLoading, error: avatarError} = useGetAvatar(data.therapistID);

    if(avatarIsLoading) return <p>...Loading</p>
    if(avatarError) return <p>Error</p>

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
                {avatar ? <img className={AssignedStyles.PtPhoto} src={avatar} alt="" /> : <div className={AssignedStyles.generatedAvatar}>{data.assignedTherapist.charAt(0).toUpperCase()}</div>}

            </div>
            <div className={AssignedStyles.ptDataContainer}>
                <p className={AssignedStyles.ptName}>PT {data.assignedTherapist.toUpperCase().slice(0,1) + data.assignedTherapist.slice(1)}</p>
                <p className={AssignedStyles.ptSpecialization}>Physical Therapy - {data.therapistSpecialization}</p>
                <p className={AssignedStyles.ptId}>PT-{data.therapistID}</p>
                <div className={AssignedStyles.ptContactContainer}>
                    <div className={AssignedStyles.ptContactItem}>
                        <FaPhoneAlt/>
                        <p>{data.therapistContactNumber}</p>
                    </div>
                    <div className={AssignedStyles.ptContactItem}>
                        <MdEmail/>
                        <p>{data.therapistEmail}</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default AssignedTherapist
