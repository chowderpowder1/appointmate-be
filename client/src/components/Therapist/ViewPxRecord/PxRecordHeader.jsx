import React from 'react'
import HeaderStyles from './PxRecordHeader.module.css'
import {useGetPatientData, useGetUserPersonalData} from '../../../queries/useEmployees'
import { useParams } from 'react-router';

const PxRecordHeader = () => {
    const { id } = useParams();
    const { data: patientDataRaw, isLoading: patientDataRawIsLoading, error: patientDataRawError } = useGetPatientData(id);
    const { data: userData, isLoading: userDataIsLoading, error: userDataError } = useGetUserPersonalData(id);

    if (patientDataRawIsLoading || userDataIsLoading ) return <div>Loading...</div>;
    if (patientDataRawError || userDataError ) return <div>Error:</div>;
console.log(patientDataRaw)
  return (
        <div className={HeaderStyles.headerContainer}>
          <div className={HeaderStyles.pxNameContainer}>
            <div className={HeaderStyles.lineStyle}/>
            <p className={HeaderStyles.pxDataHeader}>Patient Name:</p>
            <p>{userData.firstName} {userData.lastName}</p>               
          </div>
          <div className={HeaderStyles.pxNumberContainer}>
            <div className={HeaderStyles.lineStyle}/>
            <p className={HeaderStyles.pxDataHeader}>Patient Number:</p>
            <p>P-{patientDataRaw.patientData.patientId}</p>               
          </div>
        </div>    
  )
}

export default PxRecordHeader
