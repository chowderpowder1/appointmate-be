import React from 'react'
import PersonalStyles from './PxPersonalInfoTab.module.css'
import { useParams } from 'react-router';

import {useGetPatientData, useGetUserPersonalData} from '../../../queries/useEmployees'

const PxPersonalInfoTab = () => {
    const { id } = useParams();
    const { data: patientDataRaw, isLoading: patientDataRawIsLoading, error: patientDataRawError } = useGetPatientData(id);
    const { data: userData, isLoading: userDataIsLoading, error: userDataError } = useGetUserPersonalData(id);

    if (patientDataRawIsLoading || userDataIsLoading ) return <div>Loading...</div>;
    if (patientDataRawError || userDataError ) return <div>Error:</div>;

    const patientData = patientDataRaw.patientData
     console.log(userData)
    return (
    <div className={PersonalStyles.personalContainer}>
        <h2 className={PersonalStyles.personalTitle}>PERSONAL INFORMATION</h2>
        <div className={PersonalStyles.lastNameContainer}>
            <p className={PersonalStyles.dataTitle}>Last Name</p>
            <p className={PersonalStyles.data}>{userData.lastName}</p>
        </div>

        <div className={PersonalStyles.firstNameContainer}>
            <p className={PersonalStyles.dataTitle}>Firt Name</p>
            <p className={PersonalStyles.data}>{userData.firstName}</p>
        </div>

        <div className={PersonalStyles.middleInitialContainer}>
            <p className={PersonalStyles.dataTitle}>Middle Initial</p>
            <p className={PersonalStyles.data}>{userData.middleName}</p>
        </div>

        <div className={PersonalStyles.ageContainer}>
            <p className={PersonalStyles.dataTitle}>Age</p>
            <p className={PersonalStyles.data}>{patientData.age}</p>
        </div>

        <div className={PersonalStyles.birthContainer}>
            <p className={PersonalStyles.dataTitle}>Birthdate</p>
            <p className={PersonalStyles.data}>{patientData.dob}</p>
        </div>

        <div className={PersonalStyles.addressContainer}>
            <p className={PersonalStyles.dataTitle}>Home Address</p>
            <p className={PersonalStyles.data}>{patientData.unit}, {patientData.street}, Barangay {patientData.barangay}, {patientData.city}, {patientData.zipcode}</p>
        </div>

        <div className={PersonalStyles.cityContainer}>
            <p className={PersonalStyles.dataTitle}>City</p>
            <p className={PersonalStyles.data}>{patientData.city}</p>
        </div>

        <div className={PersonalStyles.phoneContainer}>
            <p className={PersonalStyles.dataTitle}>Phone Number</p>
            <p className={PersonalStyles.data}>{userData.contact_number}</p>
        </div>

        <div className={PersonalStyles.hmoContainer}>
            <p className={PersonalStyles.dataTitle}>HMO Card Represented</p>
            <p className={PersonalStyles.data}>{patientData?.hmoCardPresented.toUpperCase() ?? 'None'}</p>
        </div>

        <div className={PersonalStyles.hmoIdContainer}>
            <p className={PersonalStyles.dataTitle}>HMO ID Number</p>
            <p className={PersonalStyles.data}>{patientData?.hmoNumber ?? 'None'}</p>
        </div>

        <div className={PersonalStyles.validIdContainer}>
            <p className={PersonalStyles.dataTitle}>Valid ID Presented</p>
            <p className={PersonalStyles.data}>{patientData.id.toUpperCase()}</p>
        </div>

        <div className={PersonalStyles.validIdNoContainer}>
            <p className={PersonalStyles.dataTitle}>Valid ID Number</p>
            <p className={PersonalStyles.data}>{patientData.idNumber}</p>
        </div>

        <div className={PersonalStyles.companyContainer}>
            <p className={PersonalStyles.dataTitle}>Company</p>
            <p className={PersonalStyles.data}>{patientData.employer}</p>
        </div>

        <div className={PersonalStyles.emailContainer}>
            <p className={PersonalStyles.dataTitle}>Personal Email Address</p>
            <p className={PersonalStyles.data}>{userData.email}</p>
        </div>

        <div className={PersonalStyles.emergencyPersonContainer}>
            <p className={PersonalStyles.dataTitle}>Emergency Contact Person</p>
            <p className={PersonalStyles.data}>{patientData.econtact}</p>
        </div>

        <div className={PersonalStyles.emergencyNumberContainer}>
            <p className={PersonalStyles.dataTitle}>Emeregency Contact Number</p>
            <p className={PersonalStyles.data}>{patientData.enumber}</p>
        </div>
{/* 
        <div className={PersonalStyles.feedbackContainer}>
            <p className={PersonalStyles.dataTitle}>How did you hear about us?</p>
            <p className={PersonalStyles.data}>Facebook</p>
        </div> */}

    </div>
  )
}


export default PxPersonalInfoTab
