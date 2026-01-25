import React from 'react'
import HistoryStyles from './PastMedicalHistory.module.css'

import {useGetMyRecords} from '../../queries/users'

const PastMedicalHistory = () => {
   const {data : myRecords, isLoading: myRecordsIsLoading, error: myRecordsError} = useGetMyRecords();
  
    if (  myRecordsIsLoading ) return <div>Loading...</div>;
    if (  myRecordsError ) return <div>Error: {myRecordsError.message}</div>;
        const {
          diagnosis,
          complaint,
          otherNotes,
          specNotes,
              
          hypertension,
          diabetesMellitus,
          MRI,
          XRay,
          CTScan,
              
          cardioPulmoDSE,
          cancer,
          hospitalization,
          allergies,
              
          edemaOn,
          edemaNotes,
          nodulesOn,
          nodulesNotes,
          musclesOn,
          musclesNotes,
          tautBandsOn,
          tautBandNotes,
          jtEffusionOn,
          jtEffusionNotes,
          lomOn,
          lomNotes,
          tendernessOn,
          tendernessNotes,
              
          // Pain
          localizedOnArea,
          reliefBy,
          elicitedBy,
              
          // Pain Details
          painScale,
              
          // Pain Description
          intermittent,
          constant,
          dull,
          deep,
          burning,
          numbing,
          tingling,
          radiating,
          sharp,
          throbbing,
          shooting,
          stabbing,
          cramping,
          nagging,
          heavy,
              
          // OI
          ambulatory,
          deformity,
          erythemaOn,
          erythemaNotes,
          swellingOn,
          swellingNotes,
          atrophy,
          posturalDeviation,
          othersOi,
              
          therapyService
        }= myRecords;
  return (
    <div className={HistoryStyles.historyContainer}>
        <div className={HistoryStyles.historyTitleContainer}>
          <p className={HistoryStyles.historyTitle}>Past Medical History</p>
        </div>
        <div className="divider"></div>
        <div className={HistoryStyles.medicalHistoryDataContainer}>
          <div className={HistoryStyles.historyDataRow}>
            
            <div className={HistoryStyles.historyDataItem}>
            <p className={HistoryStyles.historyDataTitle}>HYPERTENSION:</p>  
            <p className={HistoryStyles.historyData}>{hypertension.toUpperCase() ?? ''}</p>  
            </div>

            <div className={HistoryStyles.historyDataItem}>
            <p className={HistoryStyles.historyDataTitle}>ALLERGIES:</p>  
            <p className={HistoryStyles.historyData}>{allergies ? 'Yes': ''}</p>  
            </div>

          </div>

          <div className={HistoryStyles.historyDataRow}>
            
            <div className={HistoryStyles.historyDataItem}>
              <p className={HistoryStyles.historyDataTitle}>DIABETES MELLITUS:</p>  
              <p className={HistoryStyles.historyData}>{diabetesMellitus ? 'Yes': ''}</p>  
            </div>

            <div className={HistoryStyles.historyDataItem}>
              <p className={HistoryStyles.historyDataTitle}>DOBUTAMINE STRESS ECHO CARDIOGRAM (DSE):</p>  
              <p className={HistoryStyles.historyData}>{cardioPulmoDSE ? 'Yes': ''}</p>  
            </div>

          </div>

          <div className={HistoryStyles.historyDataRow}>
            
            <div className={HistoryStyles.historyDataItem}>
              <p className={HistoryStyles.historyDataTitle}>CANCER:</p>  
              <p className={HistoryStyles.historyData}>{cardioPulmoDSE ? 'Yes': ''}</p>  

              <p className={HistoryStyles.historyDataTitle}>HOSPITALIZATION:</p>  
              <p className={HistoryStyles.historyData}>{hospitalization ? 'Yes': ''}</p>  
            </div>

            <div className={HistoryStyles.historyDataItem}>
              <p className={HistoryStyles.historyDataTitle}>LABORATORIES::</p>  
              <p className={HistoryStyles.historyData}>SALBUTAMOL</p> 
            </div>

          </div>
          
          <div className="divider"></div>
          
          <div className={HistoryStyles.onInspectionContainer}>
            <h4 className={HistoryStyles.historyTitle}>On Inspection (OI)</h4>
            
            <div className={HistoryStyles.onInspectionDataContainer}>
              
              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>AMBULATORY:</p>
                <p className={HistoryStyles.historyData}>{ambulatory ? 'Yes': ''}</p>
              </div>
              
              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>DEFORMITY:</p>
                <p className={HistoryStyles.historyData}>{deformity ? 'Yes': ''}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>SWELLING ON:</p>
                <p className={HistoryStyles.historyData}>{swellingNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>ERYTHMA ON:</p>
                <p className={HistoryStyles.historyData}>{erythemaNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>ATROPHY:</p>
                <p className={HistoryStyles.historyData}>{atrophy ? 'Yes' : 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>POSTURAL DEVIATION:</p>
                <p className={HistoryStyles.historyData}>{posturalDeviation ? 'Yes' : 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>OTHERS:</p>
                <p className={HistoryStyles.historyData}>{othersOi ? 'Yes' : 'N/A'}</p>
              </div>

            </div>
          </div>
          <div className="divider"></div>
          <div className={HistoryStyles.onInspectionContainer}>
            <h4 className={HistoryStyles.historyTitle}>Palpation</h4>
            
            <div className={HistoryStyles.onInspectionDataContainer}>
              
              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>EDEMA ON:</p>
                <p className={HistoryStyles.historyData}>{edemaNotes || 'N/A'}</p>
              </div>
              
              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>NODULE/S ON:</p>
                <p className={HistoryStyles.historyData}>{nodulesNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>MUSCLES ON:</p>
                <p className={HistoryStyles.historyData}>{musclesNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>TAUT BAND/S ON:</p>
                <p className={HistoryStyles.historyData}>{tautBandNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>JT EFFUSION ON:</p>
                <p className={HistoryStyles.historyData}>{jtEffusionNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>LOM ON:</p>
                <p className={HistoryStyles.historyData}>{lomNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>TENDERNESS ON:</p>
                <p className={HistoryStyles.historyData}>{tendernessNotes || 'N/A'}</p>
              </div>

            </div>
          </div>
          <div className="divider"></div>
<div className={HistoryStyles.onInspectionContainer}>
            <h4 className={HistoryStyles.historyTitle}>PT MX</h4>
            
            <div className={HistoryStyles.onInspectionDataContainer}>
              
              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>TREATMENT:</p>
                <p className={HistoryStyles.historyData}>{therapyService || 'N/A'}</p>
              </div>


              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>OTHER NOTES:</p>
                <p className={HistoryStyles.historyData}>{otherNotes || 'N/A'}</p>
              </div>

              <div className={HistoryStyles.onInspectionItem}>
                <p className={HistoryStyles.historyDataTitle}>SPECIAL NOTES:</p>
                <p className={HistoryStyles.historyData}>{specNotes || 'N/A'}</p>
              </div>

            </div>
          </div>

        </div>
    </div>
  )
}

export default PastMedicalHistory
