import React from 'react'
import CompleteStyles from './StepComplete.module.css'
import { BsFileEarmarkMedical } from "react-icons/bs";
import { Button } from '@mui/material';
import { NavLink } from "react-router";

const StepComplete = () => {
  return (
    <div className={CompleteStyles.container}>
        <div className={CompleteStyles.iconContainer}>
            <BsFileEarmarkMedical className={CompleteStyles.docIcon}/>
        </div>
      <p className={CompleteStyles.header}>Profile Completed Successfully!</p>
      <p className={CompleteStyles.textBody}>Thank you for completing your profile. You’re all set to start booking your appointments with Accelerated Wellness & Pain Clinic.</p>
      <Button variant='contained'> <NavLink style={{color:'white'}} to='/Appointment'>Book an Appointment</NavLink></Button>
      <p ><NavLink to='/'>Go to homepage</NavLink></p>
    </div>
  )
}

export default StepComplete
