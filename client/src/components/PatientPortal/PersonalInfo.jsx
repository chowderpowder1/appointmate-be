import React from 'react'
import PersonalStyles from './PersonalInfo.module.css'

const PersonalInfo = () => {
  return (
    <div className={PersonalStyles.personalContainer}>
    <h2 className={PersonalStyles.personalTitle}>PERSONAL INFORMATION</h2>
    <div className={PersonalStyles.lastNameContainer}>
        <p className={PersonalStyles.dataTitle}>Last Name</p>
        <p className={PersonalStyles.data}>Mariano</p>
    </div>

    <div className={PersonalStyles.firstNameContainer}>
        <p className={PersonalStyles.dataTitle}>Firt Name</p>
        <p className={PersonalStyles.data}>Belle</p>
    </div>

    <div className={PersonalStyles.middleInitialContainer}>
        <p className={PersonalStyles.dataTitle}>Middle Initial</p>
        <p className={PersonalStyles.data}>A.</p>
    </div>

    <div className={PersonalStyles.ageContainer}>
        <p className={PersonalStyles.dataTitle}>Age</p>
        <p className={PersonalStyles.data}>22</p>
    </div>

    <div className={PersonalStyles.birthContainer}>
        <p className={PersonalStyles.dataTitle}>Birthdate</p>
        <p className={PersonalStyles.data}>06-10-2002</p>
    </div>

    <div className={PersonalStyles.addressContainer}>
        <p className={PersonalStyles.dataTitle}>Home Address</p>
        <p className={PersonalStyles.data}>Brgy, Sample Address Blk 2</p>
    </div>

    <div className={PersonalStyles.cityContainer}>
        <p className={PersonalStyles.dataTitle}>City</p>
        <p className={PersonalStyles.data}>Caloocan City</p>
    </div>

    <div className={PersonalStyles.phoneContainer}>
        <p className={PersonalStyles.dataTitle}>Phone Number</p>
        <p className={PersonalStyles.data}>+63 911 222 1111</p>
    </div>

    <div className={PersonalStyles.hmoContainer}>
        <p className={PersonalStyles.dataTitle}>HMO Card Represented</p>
        <p className={PersonalStyles.data}>MaxiCare</p>
    </div>

    <div className={PersonalStyles.hmoIdContainer}>
        <p className={PersonalStyles.dataTitle}>HMO ID Number</p>
        <p className={PersonalStyles.data}>12348059</p>
    </div>

    <div className={PersonalStyles.validIdContainer}>
        <p className={PersonalStyles.dataTitle}>Valid ID Presented</p>
        <p className={PersonalStyles.data}>SSS</p>
    </div>

    <div className={PersonalStyles.validIdNoContainer}>
        <p className={PersonalStyles.dataTitle}>Valid ID Number</p>
        <p className={PersonalStyles.data}>1234456</p>
    </div>

    <div className={PersonalStyles.companyContainer}>
        <p className={PersonalStyles.dataTitle}>Company</p>
        <p className={PersonalStyles.data}>ABS-CBN / Star Magic</p>
    </div>

    <div className={PersonalStyles.emailContainer}>
        <p className={PersonalStyles.dataTitle}>Personal Email Address</p>
        <p className={PersonalStyles.data}>belle.mariano@abs-cbn.com</p>
    </div>

    <div className={PersonalStyles.emergencyPersonContainer}>
        <p className={PersonalStyles.dataTitle}>Emergency Contact Person</p>
        <p className={PersonalStyles.data}>Maribel Mariano</p>
    </div>

    <div className={PersonalStyles.emergencyNumberContainer}>
        <p className={PersonalStyles.dataTitle}>Emeregency Contact Number</p>
        <p className={PersonalStyles.data}>+63 911 222 3210</p>
    </div>

    <div className={PersonalStyles.feedbackContainer}>
        <p className={PersonalStyles.dataTitle}>How did you hear about us?</p>
        <p className={PersonalStyles.data}>Facebook</p>
    </div>

    </div>
  )
}

export default PersonalInfo
