import React from 'react'
import ProfileStyles from './PatientProfile.module.css'
import patientDefaultBg from '../../assets/patientProfileBg.png'
import MockUser from '../../assets/zoey.png'
import { FaPencilAlt } from "react-icons/fa";

const PatientProfile = () => {
  return (
    <div className={ProfileStyles.profileContainer}>
      <div className={ProfileStyles.profileBanner}>
        <img className={ProfileStyles.profileBg} src={patientDefaultBg} alt="" />

        <div className={ProfileStyles.userContainer}>

            <img src={MockUser} className={ProfileStyles.userPhoto} alt="" />
            <div className={ProfileStyles.userInfo}>
                <p className={ProfileStyles.userName}>Zoey Min</p>
                <p className={ProfileStyles.patientId}>Patient ID #A2023141814</p>
            </div>
        </div>
        <div className={ProfileStyles.editBtn}> 
            <FaPencilAlt/>
            <p>Edit Profile</p>
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
                        <p className='data'>Maxicare</p>
                    </div>
                    <div>
                        <p className='dataTitle'>HMO ID Number</p>
                        <p className='data'>123482028</p>
                    </div>
                    <div>
                        <p className='dataTitle'>Valid ID Presented</p>
                        <p className='data'>SSS</p>
                    </div>
                    <div>
                        <p className='dataTitle'>Valid ID Number</p>
                        <p className='data'>123482028</p>
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
                            <p className='data'>Min</p>
                        </div>
                        <div>
                            <p className='dataTitle'>First Name</p>
                            <p className='data'>Zoey</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Middle Initial</p>
                            <p className='data'>K.</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Age</p>
                            <p className='data'>22</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Birthdate</p>
                            <p className='data'>06-20-2002</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Company</p>
                            <p className='data'>Huntrix</p>
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
                        <p className='data'>Maribel Mariano</p>
                    </div>

                     <div>
                        <p className='dataTitle'>Emergency Contact Number</p>
                        <p className='data'>+63 987 654 3210</p>
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
                            <p className='data'>Brgy. Sample Address Blk2 </p>
                        </div>
                        <div>
                            <p className='dataTitle'>Phone Number</p>
                            <p className='data'>+63 911 222 1111</p>
                        </div>
                        <div>
                            <p className='dataTitle'>City</p>
                            <p className='data'>Caloocan City</p>
                        </div>
                        <div>
                            <p className='dataTitle'>Personal Email</p>
                            <p className='data'>belle.mariano@abs-cbn.com</p>
                        </div>

                    </div>
                </div>  
                
            </div>

        </div>
    </div>
  )
}

export default PatientProfile
