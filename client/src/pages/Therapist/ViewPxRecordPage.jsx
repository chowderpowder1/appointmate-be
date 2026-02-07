import { useState, React} from 'react'
import ViewStyles from './ViewPatientRecordPage.module.css'
import Header from '../../components/Therapist/ViewPxRecord/PxRecordHeader'
import PersonalInfoTab from '../../components/Therapist/ViewPxRecord/PxPersonalInfoTab'
import InitialEvalTab from '../../components/Therapist/ViewPxRecord/InitialEvalTab'
import PxMedicalHistoryTab from '../../components/Therapist/ViewPxRecord/PxMedicalHistory'
import PxAttendanceTab from '../../components/Therapist/ViewPxRecord/PxAttendanceTab'
import { useParams } from 'react-router';
import { IoIosArrowForward   } from "react-icons/io";

const ViewPatientRecordPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const { id } = useParams();
  const toggleTab = ( index ) => {
    setToggleState((toggleState+index) === 4  ? 1 : ((toggleState+index)===0 ? 3 : toggleState+index) );
  }
  return (
    <div className={ViewStyles.container}>
        <div className={ViewStyles.directoryContainer}>
          <p>Dashboard</p>
          <IoIosArrowForward/>
          <p>Patient Profile</p>
          <IoIosArrowForward/>
          <p>View</p>
        </div>
        <Header/>
        <div className={ViewStyles.dataBodyContainer}>
          <div className={ViewStyles.pxPersonalInfoContainer}>
            <PersonalInfoTab/>
          </div>
        
          <div className={ViewStyles.pxInitialEvalContainer}>
             { toggleState == 1 &&(
                <> 
                <InitialEvalTab/>
                {/* <button onClick={()=> toggleTab(2)} className={ViewStyles.nextBtn}>Next</button>
                    <div className={ViewStyles.slideIndicator}>
                        <div className={ toggleState === 2 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                        <div className={ toggleState === 1 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                    </div>        */}
                </>
            )}
            { toggleState == 2 &&( 
                <> 
                <PxMedicalHistoryTab/>
                
                {/* <button onClick={()=> toggleTab(1)} className={ViewStyles.prevBtn}>Previous</button>
                <div className={ViewStyles.slideIndicator}>
                        <div className={ toggleState === 2 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                        <div className={ toggleState === 1 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                    </div>       */}
                </>
            )}
            { toggleState == 3 &&( 
                <> 
                  <PxAttendanceTab/>
                

                </>
            )}
           
                <button onClick={()=> toggleTab(1)} className={ViewStyles.nextBtn}>Next</button>
                    {/* <div className={ViewStyles.slideIndicator}>
                        <div className={ toggleState === 2 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                        <div className={ toggleState === 1 ? `${ViewStyles.circle}` : `${ViewStyles.circle} ${ViewStyles.active}` }></div>
                    </div>   */}
                     <button onClick={()=> toggleTab(-1)} className={ViewStyles.prevBtn}>Previous</button>
                <div className={ViewStyles.slideIndicator}>
                        <div className={ toggleState === 1 ? `${ViewStyles.circle} ${ViewStyles.active}` : `${ViewStyles.circle}` }></div>
                        <div className={ toggleState === 2 ? `${ViewStyles.circle} ${ViewStyles.active}` : `${ViewStyles.circle}` }></div>
                        <div className={ toggleState === 3 ? `${ViewStyles.circle} ${ViewStyles.active}` : `${ViewStyles.circle}` }></div>
                    </div>      
          </div>
            <div className={ViewStyles.sessionSelectionContainer}>
            <h4 className={ViewStyles.sessionTitle}>Service Plans</h4>
            <div className={ViewStyles.sessionTable}>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                  <div className={ViewStyles.arrowBtn}>
                    <IoIosArrowForward/>
                  </div>
                               
                </div>                                        
              </div>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                </div>                         
              </div>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                </div>                                        
              </div>
            </div>
          </div>
            <div className={ViewStyles.sessionSelectionContainer}>
            <h4 className={ViewStyles.sessionTitle}>Service Plans</h4>
            <div className={ViewStyles.sessionTable}>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                  <div className={ViewStyles.arrowBtn}>
                    <IoIosArrowForward/>
                  </div>
                               
                </div>                                        
              </div>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                </div>                         
              </div>
              <div className={ViewStyles.sessionItem}>
                <div className={ViewStyles.sessionText}>
                  <p>Manual Therapy</p>        
                  <p>Sessions: 6</p>
                  <p>Remaining: 5</p>
                </div>                                        
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default ViewPatientRecordPage
