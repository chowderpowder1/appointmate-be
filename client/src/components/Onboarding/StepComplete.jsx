import React, { useState, useContext } from 'react'
import CompleteStyles from './StepComplete.module.css'
import { BsFileEarmarkMedical } from "react-icons/bs";
import { Button } from '@mui/material';
import { useAppContext } from './AppContext.jsx';
import { NavLink } from "react-router";

import {postUserData} from '../../api/postUserData.js'

import { useUsers } from '../../queries/users.js'


const StepComplete = () => {
  const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();

  const {formData} = useAppContext();

  const payload = {
  id : userData.id,
  middleName: formData.personalInfo.middleName,
  gender: formData.personalInfo.gender,
  dob: formData.personalInfo.dob,
  contactNumber: formData.contactInfo.contactNumber,
  employer: formData.contactInfo.employer,
  street: formData.contactInfo.street,
  city: formData.contactInfo.city,
  religion: formData.contactInfo.religion,
  unit: formData.contactInfo.unit,
  barangay: formData.contactInfo.barangay,
  zipcode: formData.contactInfo.zipcode,
  idType: formData.identification.Id.type,
  idNumber: formData.identification.Id.number,
  hmoName:formData.identification.Hmo.name,
  hmoNumber:formData.identification.Hmo.cardNumber,
  emergencyContactInfo:{
    contactPerson:formData.emergencyInfo.contactPerson,
    relationship:formData.emergencyInfo.relationship,
    emergencyContactNumber:formData.emergencyInfo.contactNumber,
    altNumber:formData.emergencyInfo.altNumber,
  },
  };
console.log(payload)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    try {

      const res = await postUserData(payload);
      setMessage('Profile saved successfully');
      setLoading(false);
      console.log('Profile saved result:', res);
    } catch (err) {
      setMessage('Error saving profile');
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className={CompleteStyles.container}>
        <div className={CompleteStyles.iconContainer}>
            <BsFileEarmarkMedical className={CompleteStyles.docIcon}/>
        </div>
      <p className={CompleteStyles.header}>Profile Completed Successfully!</p>
      <p className={CompleteStyles.textBody}>Thank you for completing your profile. You’re all set to start booking your appointments with Accelerated Wellness & Pain Clinic.</p>
      <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
        <Button variant='contained' onClick={handleSaveProfile} disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</Button>
        <Button variant='contained'> <NavLink style={{color:'white'}} to='/Appointment'>Book an Appointment</NavLink></Button>
        
      <Button variant='contained' ><NavLink style={{color:'white'}}to='/'>Go to homepage</NavLink></Button>
      </div>
      {message && <p style={{marginTop:'10px'}}>{message}</p>}
    </div>
  )
}

export default StepComplete
