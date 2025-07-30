import { React, useState } from 'react'
import RecordStyles from './PatientRecordPage.module.css'
import PersonalInfo from '../../components/PatientPortal/PersonalInfo'
import InitialEval from '../../components/PatientPortal/InitialEval'
import PastMedicalHistory from '../../components/PatientPortal/PastMedicalHistory'

const PatientRecordPage = () => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = ( index ) => setToggleState(index);

  return (
    <div className={RecordStyles.recordContainer}>
        <div className={RecordStyles.columnOne}>
            <PersonalInfo/>
        </div>
        <div className={RecordStyles.columnTwo}>
            
            { toggleState == 1 &&(
                <> 
                <InitialEval/>
                <button onClick={()=> toggleTab(2)} className={RecordStyles.nextBtn}>Next</button>
                    <div className={RecordStyles.slideIndicator}>
                        <div className={ toggleState === 2 ? `${RecordStyles.circle}` : `${RecordStyles.circle} ${RecordStyles.active}` }></div>
                        <div className={ toggleState === 1 ? `${RecordStyles.circle}` : `${RecordStyles.circle} ${RecordStyles.active}` }></div>
                    </div>       

                </>
            )}
            { toggleState == 2 &&( 
                <> 
                <PastMedicalHistory/>
                <button onClick={()=> toggleTab(1)} className={RecordStyles.prevBtn}>Previous</button>
                <div className={RecordStyles.slideIndicator}>
                        <div className={ toggleState === 2 ? `${RecordStyles.circle}` : `${RecordStyles.circle} ${RecordStyles.active}` }></div>
                        <div className={ toggleState === 1 ? `${RecordStyles.circle}` : `${RecordStyles.circle} ${RecordStyles.active}` }></div>
                    </div>      
                </>
            )}
        </div>

    </div>
  )
}

export default PatientRecordPage
