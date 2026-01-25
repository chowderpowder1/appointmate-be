import React from 'react'
import EvalStyles from './InitialEval.module.css'

import {useGetMyRecords} from '../../queries/users'

const InitialEval = () => {

  const {data : myRecords, isLoading: myRecordsIsLoading, error: myRecordsError} = useGetMyRecords();

  if (  myRecordsIsLoading ) return <div>Loading...</div>;
  if (  myRecordsError ) return <div>Error: {myRecordsError.message}</div>;
      const {
    diagnosis = '',
    complaint = '',
    otherNotes = '',
    specialNotes = '',
    
    // Med History - Conditions
    hypertension = false,
    diabetesMellitus = false,
    MRI = false,
    XRay = false,
    CTScan = false,
    
    cardioPulmoDSE = false,
    cancer = false,
    hospitalization = '',
    allergies = false,
    
    // Palpation
    edemaOn = '',
    edemaNotes = '',
    nodulesOn = '',
    nodulesNotes = '',
    musclesOn = '',
    musclesNotes = '',
    tautBandsOn = '',
    tautBandNotes = '',
    jtEffusionOn = '',
    jtEffusionNotes = '',
    lomOn = '',
    lomNotes = '',
    tendernessOn = '',
    tendernessNotes = '',
    
    // Pain
    localizedOnArea = '',
    reliefBy = '',
    elicitedBy = '',
    
    // Pain Details
    painScale = 0,
    
    // Pain Description
    intermittent = false,
    constant = false,
    dull = false,
    deep = false,
    burning = false,
    numbing = false,
    tingling = false,
    radiating = false,
    sharp = false,
    throbbing = false,
    shooting = false,
    stabbing = false,
    cramping = false,
    nagging = false,
    heavy = false,
    
    // OI (Objective Information)
    ambulatory = '',
    deformity = '',
    erythemaOn = '',
    erythemaNotes = '',
    swellingOn = '',
    swellingNotes = '',
    atrophy = '',
    posturalDeviation = '',
    othersOi = '',
    
    therapyService = ''
} = myRecords || {};
 
  return (
    <div className={EvalStyles.evalContainer}>
      <h1 className={EvalStyles.evalTitle}>INITIAL EVALUATION</h1>
      <div className="divider"></div>
      <div className={EvalStyles.evalDataContainer}>

        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>PATIENT NO.</p>
            <p className={EvalStyles.evalData}>P-05</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>DATE CONSULTED:</p>
            <p className={EvalStyles.evalData}>05-21-2025</p>
          </div>
        </div>
        
        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>PHYSICAL THERAPIST ASSIGNED</p>
            <p className={EvalStyles.evalData}>JANE MENDOZA</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>COVERAGE EXPIRATION:</p>
            <p className={EvalStyles.evalData}>07-05-2025</p>
          </div>
        </div>
        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>DIAGNOSIS</p>
            <p className={EvalStyles.evalData}>{diagnosis ?? ''}</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>CHIEF COMPLAINT:</p>
            <p className={EvalStyles.evalData}>{complaint ?? ''}</p>
          </div>
        </div>

        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>LOCALIZED ON AREA:</p>
            <p className={EvalStyles.evalData}>LOWER BACK</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>Pain Description:</p>
            <p>THROBBING</p>

          </div>
        </div>

        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>ELICITED BY:</p>
            <p className={EvalStyles.evalData}>{elicitedBy ?? ''}</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>RELIEF BY:</p>
            <p className={EvalStyles.evalData}>{reliefBy ?? ''}</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default InitialEval
