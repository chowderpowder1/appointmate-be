import React from 'react'
import ProfileStyles from './PatientProfile.module.css'
import patientDefaultBg from '../../assets/patientProfileBg.png'
import MockUser from '../../assets/aw_mock-px.png'
import { FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router'

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// axios fetch user data 
import { useUsers, usePatientData } from '../../queries/users.js'

const PatientProfile = () => {
    const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    const {data : patientData, isLoading: patientDataIsLoading, error: patientDataError} = usePatientData();

    if (userDataIsLoading || patientDataIsLoading) return <div>Loading...</div>;
    if (userDataError || patientDataError) return <div>Error: {error.message}</div>;
  return (
    <div className={ProfileStyles.profileContainer}>
      <div className={ProfileStyles.profileBanner}>
        <img className={ProfileStyles.profileBg} src={patientDefaultBg} alt="" />

        <div className={ProfileStyles.userContainer}>

            <img src={MockUser} className={ProfileStyles.userPhoto} alt="" />
            <div className={ProfileStyles.userInfo}>
                <p className={ProfileStyles.userName}>{userData.firstName} {userData.lastName}</p>
                <p className={ProfileStyles.patientId}>Patient ID #A2023141814</p>
            </div>
        </div>
        <div className={ProfileStyles.editBtn}> 
            <FaPencilAlt/>
            <Link to='update-my-info' style={{color:'white'}}>Edit Profile</Link>
        </div>
      </div>

        <div className={ProfileStyles.infoContainer}>

            <div className={ProfileStyles.infoColumnOne}>
                <div className={ProfileStyles.coverageContainer}>
                    <div>
                        <p className='data'>Coverage & Identification</p>
                        <div className='divider'></div>
                    </div>

                    <div>
                        <p className='dataTitle'>HMO Card Represented</p>
                        <p className='data'>{patientData.hmoCardPresented}</p>
                    </div>
                    <div>
                        <p className='dataTitle'>HMO ID Number</p>
                        <p className='data'>{patientData.hmoNumber}</p>
                    </div>
                    <div>
                        <p className='dataTitle'>Valid ID Presented</p>
                        <p className='data'>{patientData.id}</p>
                    </div>
                    <div>
                        <p className='dataTitle'>Valid ID Number</p>
                        <p className='data'>{patientData.idNumber}</p>
                    </div>
                </div>
                <div className={ProfileStyles.personalInfoContainer}>
                    <div>
                        <p className='data'>Personal Information</p>
                        <div className='divider'></div>
                    </div>
                    <div className={ProfileStyles.infoGrid}>
                        <div>
                            <p className='dataTitle'>Last Name</p>
                            <p className='data'>{userData.lastName}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>First Name</p>
                            <p className='data'>{userData.firstName}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Middle Initial</p>
                            <p className='data'>{userData.firstName}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Age</p>
                            <p className='data'>{patientData.age}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Birthdate</p>
                            <p className='data'>{patientData.dob}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Company</p>
                            <p className='data'>{patientData.employer}</p>
                        </div>
                    </div>

                </div>  
                
            </div>

            <div className={ProfileStyles.infoColumnTwo}>
                
                <div className={ProfileStyles.emergencyInfoContainer}>
                    <div>
                        <p className='data'>Emergency Info</p>
                        <div className='divider'></div>
                    </div>

                     <div>
                        <p className='dataTitle'>Emergency Contact Person</p>
                        <p className='data'>{patientData.econtact}</p>
                    </div>

                     <div>
                        <p className='dataTitle'>Emergency Contact Number</p>
                        <p className='data'>{patientData.enumber}</p>
                    </div>
                </div>

                <div className={ProfileStyles.contactInfoContainer}>
                    <div>
                        <p className='data'>Contact & Address</p>
                        <div className='divider'></div>
                    </div>
                    <div className={ProfileStyles.contactInfoGrid}>

                        <div>
                            <p className='dataTitle'>Home Address</p>
                            <p className='data'>{patientData.unit} {patientData.street} {patientData.city} {patientData.barangay}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Phone Number</p>
                            <p className='data'>{userData.contact_number}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>City</p>
                            <p className='data'>{patientData.city}</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Personal Email</p>
                            <p className='data'>{userData.email}</p>
                        </div>

                    </div>
                </div>  
                
            </div>

        </div>
    </div>
  )
}

export default PatientProfile
