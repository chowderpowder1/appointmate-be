import React from 'react'
import EvalStyles from './InitialEval.module.css'

const InitialEval = () => {
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
            <p className={EvalStyles.evalData}>UNDER OBSERVATION</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>CHIEF COMPLAINT:</p>
            <p className={EvalStyles.evalData}>FELT STABBING PAIN IN THE LOWER BACK FOR 2 WEEKS, PAIN DOUBLES AT NIGHT WHEN LAYING BACK.</p>
          </div>
        </div>

        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>LOCALIZED ON AREA:</p>
            <p className={EvalStyles.evalData}>LOWER BACK</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p>THROBBING</p>

          </div>
        </div>

        <div className={EvalStyles.evalDataRow}>
          <div className={EvalStyles.evalContentLeft}>
            <p className={EvalStyles.evalDataTitle}>ELICITED BY:</p>
            <p className={EvalStyles.evalData}>TENDERNESS ELICITED BY LIGHT PRESSURE</p>
          </div>

          <div className={EvalStyles.evalContentRight}>
            <p className={EvalStyles.evalDataTitle}>RELIEF BY:</p>
            <p className={EvalStyles.evalData}>CHANGE IN POSITION</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default InitialEval
